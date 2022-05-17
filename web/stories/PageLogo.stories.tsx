import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OwncastLogo } from '../components/common';

export default {
  title: 'owncast/Components/Logo',
  component: OwncastLogo,
  parameters: {},
} as ComponentMeta<typeof OwncastLogo>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof OwncastLogo> = args => <OwncastLogo {...args} />;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Logo = Template.bind({});
Logo.args = {
  url: '/logo',
};

export const DemoServer = Template.bind({});
DemoServer.args = {
  url: 'https://watch.owncast.online/logo',
};
