import { FC, useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useSetRecoilState } from 'recoil';
import { useMachine } from '@xstate/react';
import { makeEmptyClientConfig, ClientConfig } from '../../interfaces/client-config.model';
import ClientConfigService from '../../services/client-config-service';
import ChatService from '../../services/chat-service';
import WebsocketService from '../../services/websocket-service';
import { ChatMessage } from '../../interfaces/chat-message.model';
import { ServerStatus, makeEmptyServerStatus } from '../../interfaces/server-status.model';
import appStateModel, {
  AppStateEvent,
  AppStateOptions,
  makeEmptyAppState,
} from './application-state';
import { setLocalStorage, getLocalStorage } from '../../utils/localStorage';
import {
  ConnectedClientInfoEvent,
  MessageType,
  ChatEvent,
  MessageVisibilityEvent,
  SocketEvent,
} from '../../interfaces/socket-events';

import handleConnectedClientInfoMessage from './eventhandlers/connected-client-info-handler';
import ServerStatusService from '../../services/status-service';
import handleNameChangeEvent from './eventhandlers/handleNameChangeEvent';
import { DisplayableError } from '../../types/displayable-error';

const SERVER_STATUS_POLL_DURATION = 5000;
const ACCESS_TOKEN_KEY = 'accessToken';

let serverStatusRefreshPoll: ReturnType<typeof setInterval>;

// Server status is what gets updated such as viewer count, durations,
// stream title, online/offline state, etc.
export const serverStatusState = atom<ServerStatus>({
  key: 'serverStatusState',
  default: makeEmptyServerStatus(),
});

// The config that comes from the API.
export const clientConfigStateAtom = atom({
  key: 'clientConfigState',
  default: makeEmptyClientConfig(),
});

export const chatDisplayNameAtom = atom<string>({
  key: 'chatDisplayName',
  default: null,
});

export const chatDisplayColorAtom = atom<number>({
  key: 'chatDisplayColor',
  default: null,
});

export const chatUserIdAtom = atom<string>({
  key: 'chatUserIdAtom',
  default: null,
});

export const isChatModeratorAtom = atom<boolean>({
  key: 'isModeratorAtom',
  default: false,
});

export const accessTokenAtom = atom<string>({
  key: 'accessTokenAtom',
  default: null,
});

export const chatMessagesAtom = atom<ChatMessage[]>({
  key: 'chatMessages',
  default: [] as ChatMessage[],
});

export const chatAuthenticatedAtom = atom<boolean>({
  key: 'chatAuthenticatedAtom',
  default: false,
});

export const websocketServiceAtom = atom<WebsocketService>({
  key: 'websocketServiceAtom',
  default: null,
});

export const appStateAtom = atom<AppStateOptions>({
  key: 'appState',
  default: makeEmptyAppState(),
});

export const isMobileAtom = atom<boolean | undefined>({
  key: 'isMobileAtom',
  default: undefined,
});

export const chatVisibleToggleAtom = atom<boolean>({
  key: 'chatVisibilityToggleAtom',
  default: true,
});

export const isVideoPlayingAtom = atom<boolean>({
  key: 'isVideoPlayingAtom',
  default: false,
});

export const fatalErrorStateAtom = atom<DisplayableError>({
  key: 'fatalErrorStateAtom',
  default: null,
});

export const clockSkewAtom = atom<Number>({
  key: 'clockSkewAtom',
  default: 0.0,
});

export const removedMessageIdsAtom = atom<string[]>({
  key: 'removedMessageIds',
  default: [],
});

// Chat is visible if the user wishes it to be visible AND the required
// chat state is set.
export const isChatVisibleSelector = selector({
  key: 'isChatVisibleSelector',
  get: ({ get }) => {
    const state: AppStateOptions = get(appStateAtom);
    const userVisibleToggle: boolean = get(chatVisibleToggleAtom);
    const accessToken: String = get(accessTokenAtom);
    return accessToken && state.chatAvailable && userVisibleToggle;
  },
});

export const isChatAvailableSelector = selector({
  key: 'isChatAvailableSelector',
  get: ({ get }) => {
    const state: AppStateOptions = get(appStateAtom);
    const accessToken: String = get(accessTokenAtom);
    return accessToken && state.chatAvailable;
  },
});

// We display in an "online/live" state as long as video is actively playing.
// Even during the time where technically the server has said it's no longer
// live, however the last few seconds of video playback is still taking place.
export const isOnlineSelector = selector({
  key: 'isOnlineSelector',
  get: ({ get }) => {
    const state: AppStateOptions = get(appStateAtom);
    const isVideoPlaying: boolean = get(isVideoPlayingAtom);
    return state.videoAvailable || isVideoPlaying;
  },
});

export const visibleChatMessagesSelector = selector<ChatMessage[]>({
  key: 'visibleChatMessagesSelector',
  get: ({ get }) => {
    const messages: ChatMessage[] = get(chatMessagesAtom);
    const removedIds: string[] = get(removedMessageIdsAtom);
    return messages.filter(message => !removedIds.includes(message.id));
  },
});

// Take a nested object of state metadata and merge it into
// a single flattened node.
function mergeMeta(meta) {
  return Object.keys(meta).reduce((acc, key) => {
    const value = meta[key];
    Object.assign(acc, value);

    return acc;
  }, {});
}

export const ClientConfigStore: FC = () => {
  const [appState, appStateSend, appStateService] = useMachine(appStateModel);

  const setChatDisplayName = useSetRecoilState<string>(chatDisplayNameAtom);
  const setChatDisplayColor = useSetRecoilState<Number>(chatDisplayColorAtom);
  const setChatUserId = useSetRecoilState<string>(chatUserIdAtom);
  const setChatAuthenticated = useSetRecoilState<boolean>(chatAuthenticatedAtom);
  const setIsChatModerator = useSetRecoilState<boolean>(isChatModeratorAtom);
  const [clientConfig, setClientConfig] = useRecoilState<ClientConfig>(clientConfigStateAtom);
  const setServerStatus = useSetRecoilState<ServerStatus>(serverStatusState);
  const setClockSkew = useSetRecoilState<Number>(clockSkewAtom);
  const [chatMessages, setChatMessages] = useRecoilState<ChatMessage[]>(chatMessagesAtom);
  const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenAtom);
  const setAppState = useSetRecoilState<AppStateOptions>(appStateAtom);
  const setGlobalFatalErrorMessage = useSetRecoilState<DisplayableError>(fatalErrorStateAtom);
  const setWebsocketService = useSetRecoilState<WebsocketService>(websocketServiceAtom);
  const [hiddenMessageIds, setHiddenMessageIds] = useRecoilState<string[]>(removedMessageIdsAtom);
  const [hasLoadedStatus, setHasLoadedStatus] = useState(false);
  const [hasLoadedConfig, setHasLoadedConfig] = useState(false);

  let ws: WebsocketService;

  const setGlobalFatalError = (title: string, message: string) => {
    setGlobalFatalErrorMessage({
      title,
      message,
    });
  };
  const sendEvent = (event: string) => {
    // console.log('---- sending event:', event);
    appStateSend({ type: event });
  };

  const updateClientConfig = async () => {
    try {
      const config = await ClientConfigService.getConfig();
      setClientConfig(config);
      setGlobalFatalErrorMessage(null);
      setHasLoadedConfig(true);
    } catch (error) {
      setGlobalFatalError(
        'Unable to reach Owncast server',
        `Owncast cannot launch. Please make sure the Owncast server is running.`,
      );
      console.error(`ClientConfigService -> getConfig() ERROR: \n${error}`);
    }
  };

  const updateServerStatus = async () => {
    try {
      const status = await ServerStatusService.getStatus();
      setServerStatus(status);
      setHasLoadedStatus(true);
      const { serverTime } = status;

      const clockSkew = new Date(serverTime).getTime() - Date.now();
      setClockSkew(clockSkew);

      if (status.online) {
        sendEvent(AppStateEvent.Online);
      } else if (!status.online) {
        sendEvent(AppStateEvent.Offline);
      }
      setGlobalFatalErrorMessage(null);
    } catch (error) {
      sendEvent(AppStateEvent.Fail);
      setGlobalFatalError(
        'Unable to reach Owncast server',
        `Owncast cannot launch. Please make sure the Owncast server is running. ${error}`,
      );
      console.error(`serverStatusState -> getStatus() ERROR: \n${error}`);
    }
    return null;
  };

  const handleUserRegistration = async (optionalDisplayName?: string) => {
    const savedAccessToken = getLocalStorage(ACCESS_TOKEN_KEY);
    if (savedAccessToken) {
      setAccessToken(savedAccessToken);
      return;
    }

    try {
      sendEvent(AppStateEvent.NeedsRegister);
      const response = await ChatService.registerUser(optionalDisplayName);
      console.log(`ChatService -> registerUser() response: \n${response}`);
      const { accessToken: newAccessToken, displayName: newDisplayName, displayColor } = response;
      if (!newAccessToken) {
        return;
      }

      console.log('setting access token', newAccessToken);
      setAccessToken(newAccessToken);
      setLocalStorage(ACCESS_TOKEN_KEY, newAccessToken);
      setChatDisplayName(newDisplayName);
      setChatDisplayColor(displayColor);
    } catch (e) {
      sendEvent(AppStateEvent.Fail);
      console.error(`ChatService -> registerUser() ERROR: \n${e}`);
    }
  };

  const resetAndReAuth = () => {
    setLocalStorage(ACCESS_TOKEN_KEY, '');
    setAccessToken('');
    handleUserRegistration();
  };

  const handleMessageVisibilityChange = (message: MessageVisibilityEvent) => {
    const { ids, visible } = message;
    if (visible) {
      const updatedIds = hiddenMessageIds.filter(id => !ids.includes(id));
      setHiddenMessageIds(updatedIds);
    } else {
      const updatedIds = [...hiddenMessageIds, ...ids];
      setHiddenMessageIds(updatedIds);
    }
  };

  const handleMessage = (message: SocketEvent) => {
    switch (message.type) {
      case MessageType.ERROR_NEEDS_REGISTRATION:
        resetAndReAuth();
        break;
      case MessageType.CONNECTED_USER_INFO:
        handleConnectedClientInfoMessage(
          message as ConnectedClientInfoEvent,
          setChatDisplayName,
          setChatDisplayColor,
          setChatUserId,
          setIsChatModerator,
          setChatAuthenticated,
        );
        setChatMessages(currentState => [...currentState, message as ChatEvent]);
        break;
      case MessageType.CHAT:
        setChatMessages(currentState => [...currentState, message as ChatEvent]);
        break;
      case MessageType.NAME_CHANGE:
        handleNameChangeEvent(message as ChatEvent, chatMessages, setChatMessages);
        break;
      case MessageType.USER_JOINED:
        setChatMessages(currentState => [...currentState, message as ChatEvent]);
        break;
      case MessageType.SYSTEM:
        setChatMessages(currentState => [...currentState, message as ChatEvent]);
        break;
      case MessageType.VISIBILITY_UPDATE:
        handleMessageVisibilityChange(message as MessageVisibilityEvent);
        break;
      default:
        console.error('Unknown socket message type: ', message.type);
    }
  };

  const getChatHistory = async () => {
    try {
      const messages = await ChatService.getChatHistory(accessToken);
      setChatMessages(currentState => [...currentState, ...messages]);
    } catch (error) {
      console.error(`ChatService -> getChatHistory() ERROR: \n${error}`);
    }
  };

  const startChat = async () => {
    try {
      ws = new WebsocketService(accessToken, '/ws');
      ws.handleMessage = handleMessage;
      setWebsocketService(ws);
    } catch (error) {
      console.error(`ChatService -> startChat() ERROR: \n${error}`);
    }
  };

  // Read the config and status on initial load from a JSON string that lives
  // in window. This is placed there server-side and allows for fast initial
  // load times because we don't have to wait for the API calls to complete.
  useEffect(() => {
    try {
      if ((window as any).configHydration) {
        const config = JSON.parse((window as any).configHydration);
        setClientConfig(config);
      }
    } catch (e) {
      // console.error('Error parsing config hydration', e);
    }

    try {
      if ((window as any).statusHydration) {
        const status = JSON.parse((window as any).statusHydration);
        setServerStatus(status);
      }
    } catch (e) {
      // console.error('error parsing status hydration', e);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedStatus && hasLoadedConfig) {
      sendEvent(AppStateEvent.Loaded);
    }
  }, [hasLoadedStatus, hasLoadedConfig]);

  useEffect(() => {
    if (!clientConfig.chatDisabled && accessToken && hasLoadedConfig) {
      startChat();
    }
  }, [hasLoadedConfig, accessToken]);

  useEffect(() => {
    updateClientConfig();
    handleUserRegistration();
    updateServerStatus();

    clearInterval(serverStatusRefreshPoll);
    serverStatusRefreshPoll = setInterval(() => {
      updateServerStatus();
    }, SERVER_STATUS_POLL_DURATION);
  }, [appState]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    getChatHistory();
  }, [accessToken]);

  useEffect(() => {
    appStateService.onTransition(state => {
      if (!state.changed) {
        return;
      }

      const metadata = mergeMeta(state.meta) as AppStateOptions;

      // console.debug('--- APP STATE: ', state.value);
      // console.debug('--- APP META: ', metadata);

      setAppState(metadata);
    });
  });

  return null;
};
