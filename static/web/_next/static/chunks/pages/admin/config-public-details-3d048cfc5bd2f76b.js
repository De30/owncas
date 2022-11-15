(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4311],{86045:function(__unused_webpack_module,__unused_webpack_exports,__webpack_require__){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/config-public-details",function(){return __webpack_require__(53459)}])},87652:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{h:function(){return EditSocialLinks}});var jsx_runtime=__webpack_require__(85893),react=__webpack_require__(67294),typography=__webpack_require__(84485),es_button=__webpack_require__(71577),input=__webpack_require__(69677),table=__webpack_require__(93626),modal=__webpack_require__(85402),CaretUpOutlined=__webpack_require__(10010),CaretDownOutlined=__webpack_require__(39398),DeleteOutlined=__webpack_require__(48689),es_select=__webpack_require__(38939),config_constants=__webpack_require__(90745);let SocialDropdown=param=>{let{iconList,selectedOption,onSelected}=param,handleSelected=value=>{onSelected&&onSelected(value)},inititalSelected=""===selectedOption?null:selectedOption;return(0,jsx_runtime.jsxs)("div",{className:"social-dropdown-container",children:[(0,jsx_runtime.jsx)("p",{className:"description",children:"If you are looking for a platform name not on this list, please select Other and type in your own name. A logo will not be provided."}),(0,jsx_runtime.jsxs)("div",{className:"formfield-container",children:[(0,jsx_runtime.jsx)("div",{className:"label-side",children:(0,jsx_runtime.jsx)("span",{className:"formfield-label",children:"Social Platform"})}),(0,jsx_runtime.jsx)("div",{className:"input-side",children:(0,jsx_runtime.jsxs)(es_select.Z,{style:{width:240},className:"social-dropdown",placeholder:"Social platform...",defaultValue:inititalSelected,value:inititalSelected,onSelect:handleSelected,children:[iconList.map(item=>{let{platform,icon,key}=item;return(0,jsx_runtime.jsxs)(es_select.Z.Option,{className:"social-option",value:key,children:[(0,jsx_runtime.jsx)("span",{className:"option-icon",children:(0,jsx_runtime.jsx)("img",{src:icon,alt:"",className:"option-icon"})}),(0,jsx_runtime.jsx)("span",{className:"option-label",children:platform})]},"platform-".concat(key))}),(0,jsx_runtime.jsx)(es_select.Z.Option,{className:"social-option",value:config_constants.z_,children:"Other..."},"platform-".concat(config_constants.z_))]})})]})]})};var apis=__webpack_require__(64777),server_status_context=__webpack_require__(99519),urls=__webpack_require__(37174),TextField=__webpack_require__(40117),input_statuses=__webpack_require__(41983),FormStatusIndicator=__webpack_require__(39664);let{Title}=typography.Z,EditSocialLinks=()=>{let[availableIconsList,setAvailableIconsList]=(0,react.useState)([]),[currentSocialHandles,setCurrentSocialHandles]=(0,react.useState)([]),[displayModal,setDisplayModal]=(0,react.useState)(!1),[displayOther,setDisplayOther]=(0,react.useState)(!1),[modalProcessing,setModalProcessing]=(0,react.useState)(!1),[editId,setEditId]=(0,react.useState)(-1),[modalDataState,setModalDataState]=(0,react.useState)(config_constants.wC),[submitStatus,setSubmitStatus]=(0,react.useState)(null),serverStatusData=(0,react.useContext)(server_status_context.aC),{serverConfig,setFieldInConfigState}=serverStatusData||{},{instanceDetails}=serverConfig,{socialHandles:initialSocialHandles}=instanceDetails,getAvailableIcons=async()=>{try{let result=await (0,apis.rQ)(apis.$i,{auth:!1}),list=Object.keys(result).map(item=>({key:item,...result[item]}));setAvailableIconsList(list)}catch(error){console.log(error)}},isPredefinedSocial=platform=>availableIconsList.find(item=>item.key===platform)||!1,selectedOther=""!==modalDataState.platform&&!availableIconsList.find(item=>item.key===modalDataState.platform);(0,react.useEffect)(()=>{getAvailableIcons()},[]),(0,react.useEffect)(()=>{instanceDetails.socialHandles&&setCurrentSocialHandles(initialSocialHandles)},[instanceDetails]);let resetStates=()=>{setSubmitStatus(null),clearTimeout(null)},resetModal=()=>{setDisplayModal(!1),setEditId(-1),setDisplayOther(!1),setModalProcessing(!1),setModalDataState({...config_constants.wC})},handleModalCancel=()=>{resetModal()},updateModalState=(fieldName,value)=>{setModalDataState({...modalDataState,[fieldName]:value})},handleDropdownSelect=value=>{value===config_constants.z_?(setDisplayOther(!0),updateModalState("platform","")):(setDisplayOther(!1),updateModalState("platform",value))},handleOtherNameChange=event=>{let{value}=event.target;updateModalState("platform",value)},handleUrlChange=param=>{let{value}=param;updateModalState("url",value)},postUpdateToAPI=async postValue=>{await (0,config_constants.Si)({apiPath:config_constants.c9,data:{value:postValue},onSuccess(){setFieldInConfigState({fieldName:"socialHandles",value:postValue,path:"instanceDetails"}),setModalProcessing(!1),handleModalCancel(),setSubmitStatus((0,input_statuses.kg)(input_statuses.zv)),setTimeout(resetStates,config_constants.sI)},onError(message){setSubmitStatus((0,input_statuses.kg)(input_statuses.Un,"There was an error: ".concat(message))),setModalProcessing(!1),setTimeout(resetStates,config_constants.sI)}})},handleModalOk=()=>{setModalProcessing(!0);let postData=currentSocialHandles.length?[...currentSocialHandles]:[];-1===editId?postData.push(modalDataState):postData.splice(editId,1,modalDataState),postUpdateToAPI(postData)},handleDeleteItem=index=>{let postData=[...currentSocialHandles];postData.splice(index,1),postUpdateToAPI(postData)},handleMoveItemUp=index=>{if(index<=0||index>=currentSocialHandles.length)return;let postData=[...currentSocialHandles],tmp=postData[index-1];postData[index-1]=postData[index],postData[index]=tmp,postUpdateToAPI(postData)},handleMoveItemDown=index=>{if(index<0||index>=currentSocialHandles.length-1)return;let postData=[...currentSocialHandles],tmp=postData[index+1];postData[index+1]=postData[index],postData[index]=tmp,postUpdateToAPI(postData)},okButtonProps={disabled:!(0,urls.Z)(modalDataState.url)},otherField=(0,jsx_runtime.jsxs)("div",{className:"other-field-container formfield-container",children:[(0,jsx_runtime.jsx)("div",{className:"label-side"}),(0,jsx_runtime.jsx)("div",{className:"input-side",children:(0,jsx_runtime.jsx)(input.Z,{placeholder:"Other platform name",defaultValue:modalDataState.platform,onChange:handleOtherNameChange})})]});return(0,jsx_runtime.jsxs)("div",{className:"social-links-edit-container",children:[(0,jsx_runtime.jsx)(Title,{level:3,className:"section-title",children:"Your Social Handles"}),(0,jsx_runtime.jsx)("p",{className:"description",children:"Add all your social media handles and links to your other profiles here."}),(0,jsx_runtime.jsx)(FormStatusIndicator.E,{status:submitStatus}),(0,jsx_runtime.jsx)(table.Z,{className:"social-handles-table",pagination:!1,size:"small",rowKey:record=>"".concat(record.platform,"-").concat(record.url),columns:[{title:"Social Link",dataIndex:"",key:"combo",render(data,record){let{platform,url}=record,platformInfo=isPredefinedSocial(platform);if(!platformInfo)return(0,jsx_runtime.jsx)("div",{className:"social-handle-cell",children:(0,jsx_runtime.jsxs)("p",{className:"option-label",children:[(0,jsx_runtime.jsx)("strong",{children:platform}),(0,jsx_runtime.jsx)("span",{className:"handle-url",title:url,children:url})]})});let{icon,platform:platformName}=platformInfo;return(0,jsx_runtime.jsxs)("div",{className:"social-handle-cell",children:[(0,jsx_runtime.jsx)("span",{className:"option-icon",children:(0,jsx_runtime.jsx)("img",{src:icon,alt:"",className:"option-icon"})}),(0,jsx_runtime.jsxs)("p",{className:"option-label",children:[(0,jsx_runtime.jsx)("strong",{children:platformName}),(0,jsx_runtime.jsx)("span",{className:"handle-url",title:url,children:url})]})]})}},{title:"",dataIndex:"",key:"edit",render:(data,record,index)=>(0,jsx_runtime.jsxs)("div",{className:"actions",children:[(0,jsx_runtime.jsx)(es_button.Z,{size:"small",onClick(){let platformInfo=currentSocialHandles[index];setEditId(index),setModalDataState({...platformInfo}),setDisplayModal(!0),isPredefinedSocial(platformInfo.platform)||setDisplayOther(!0)},children:"Edit"}),(0,jsx_runtime.jsx)(es_button.Z,{icon:(0,jsx_runtime.jsx)(CaretUpOutlined.Z,{}),size:"small",hidden:0===index,onClick:()=>handleMoveItemUp(index)}),(0,jsx_runtime.jsx)(es_button.Z,{icon:(0,jsx_runtime.jsx)(CaretDownOutlined.Z,{}),size:"small",hidden:index===currentSocialHandles.length-1,onClick:()=>handleMoveItemDown(index)}),(0,jsx_runtime.jsx)(es_button.Z,{className:"delete-button",icon:(0,jsx_runtime.jsx)(DeleteOutlined.Z,{}),size:"small",onClick:()=>handleDeleteItem(index)})]})}],dataSource:currentSocialHandles}),(0,jsx_runtime.jsx)(modal.Z,{title:"Edit Social Handle",open:displayModal,onOk:handleModalOk,onCancel:handleModalCancel,confirmLoading:modalProcessing,okButtonProps:okButtonProps,children:(0,jsx_runtime.jsxs)("div",{className:"social-handle-modal-content",children:[(0,jsx_runtime.jsx)(SocialDropdown,{iconList:availableIconsList,selectedOption:selectedOther?config_constants.z_:modalDataState.platform,onSelected:handleDropdownSelect}),displayOther&&otherField,(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(TextField.nv,{fieldName:"social-url",label:"URL",placeholder:{mastodon:"https://mastodon.social/@username",twitter:"https://twitter.com/username"}[modalDataState.platform]||"Url to page",value:modalDataState.url,onChange:handleUrlChange,useTrim:!0,type:"url",pattern:urls.a}),(0,jsx_runtime.jsx)(FormStatusIndicator.E,{status:submitStatus})]})}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(es_button.Z,{type:"primary",onClick(){resetModal(),setDisplayModal(!0)},children:"Add a new social link"})]})}},80894:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Q:function(){return TAG_COLOR},Y:function(){return EditValueArray}});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(85893),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(67294),antd__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(84485),antd__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(20550),_TextField__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(40117),_FormStatusIndicator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(39664);let{Title}=antd__WEBPACK_IMPORTED_MODULE_4__.Z,TAG_COLOR="#5a67d8",EditValueArray=param=>{let{title,description,placeholder,maxLength,values,handleDeleteIndex,handleCreateString,submitStatus,continuousStatusMessage}=param,[newStringInput,setNewStringInput]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""),handleInputChange=param=>{let{value}=param;setNewStringInput(value)},handleSubmitNewString=()=>{let newString=newStringInput.trim();handleCreateString(newString),setNewStringInput("")};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"edit-string-array-container",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Title,{level:3,className:"section-title",children:title}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{className:"description",children:description}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"edit-current-strings",children:null==values?void 0:values.map((tag,index)=>{let handleClose=()=>{handleDeleteIndex(index)};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd__WEBPACK_IMPORTED_MODULE_5__.Z,{closable:!0,onClose:handleClose,color:TAG_COLOR,children:tag},"tag-".concat(tag,"-").concat(index))})}),continuousStatusMessage&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"continuous-status-section",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_FormStatusIndicator__WEBPACK_IMPORTED_MODULE_3__.E,{status:continuousStatusMessage})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"add-new-string-section",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TextField__WEBPACK_IMPORTED_MODULE_2__.nv,{fieldName:"string-input",value:newStringInput,onChange:handleInputChange,onPressEnter:handleSubmitNewString,maxLength:maxLength,placeholder:placeholder,status:submitStatus})})]})};EditValueArray.defaultProps={maxLength:50,description:null,submitStatus:null,continuousStatusMessage:null}},73706:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return ToggleSwitch}});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(85893),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(67294),antd__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(94594),_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(41983),_FormStatusIndicator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(39664),_utils_config_constants__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(90745),_utils_server_status_context__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(99519);let ToggleSwitch=param=>{let{apiPath,checked,reversed=!1,configPath="",disabled=!1,fieldName,label,tip,useSubmit,onChange}=param,[submitStatus,setSubmitStatus]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),resetTimer=null,serverStatusData=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_utils_server_status_context__WEBPACK_IMPORTED_MODULE_5__.aC),{setFieldInConfigState}=serverStatusData||{},resetStates=()=>{setSubmitStatus(null),clearTimeout(resetTimer),resetTimer=null},handleChange=async isChecked=>{if(useSubmit){setSubmitStatus((0,_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__.kg)(_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__.Jk));let isCheckedSend=reversed?!isChecked:isChecked;await (0,_utils_config_constants__WEBPACK_IMPORTED_MODULE_4__.Si)({apiPath,data:{value:isCheckedSend},onSuccess(){setFieldInConfigState({fieldName,value:isCheckedSend,path:configPath}),setSubmitStatus((0,_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__.kg)(_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__.zv))},onError(message){setSubmitStatus((0,_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__.kg)(_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__.Un,"There was an error: ".concat(message)))}}),resetTimer=setTimeout(resetStates,_utils_config_constants__WEBPACK_IMPORTED_MODULE_4__.sI)}onChange&&onChange(isChecked)},loading=null!==submitStatus&&submitStatus.type===_utils_input_statuses__WEBPACK_IMPORTED_MODULE_2__.Jk;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"formfield-container toggleswitch-container",children:[label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"label-side",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{className:"formfield-label",children:label})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"input-side",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"input-group",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd__WEBPACK_IMPORTED_MODULE_6__.Z,{className:"switch field-".concat(fieldName),loading:loading,onChange:handleChange,defaultChecked:checked,checked:checked,checkedChildren:"ON",unCheckedChildren:"OFF",disabled:disabled}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_FormStatusIndicator__WEBPACK_IMPORTED_MODULE_3__.E,{status:submitStatus})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{className:"field-tip",children:tip})]})]})};ToggleSwitch.defaultProps={apiPath:"",checked:!1,reversed:!1,configPath:"",disabled:!1,label:"",tip:"",useSubmit:!1,onChange:null}},53459:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return PublicFacingDetails}});var jsx_runtime=__webpack_require__(85893),react=__webpack_require__(67294),typography=__webpack_require__(84485),TextFieldWithSubmit=__webpack_require__(10135),server_status_context=__webpack_require__(99519),config_constants=__webpack_require__(90745),ToggleSwitch=__webpack_require__(73706),upload=__webpack_require__(77916),es_button=__webpack_require__(71577),LoadingOutlined=__webpack_require__(50888),UploadOutlined=__webpack_require__(88484),FormStatusIndicator=__webpack_require__(39664),input_statuses=__webpack_require__(41983),apis=__webpack_require__(64777);let ACCEPTED_FILE_TYPES=["image/png","image/jpeg","image/gif"],EditLogo=()=>{var ref;let[logoUrl,setlogoUrl]=(0,react.useState)(null),[loading,setLoading]=(0,react.useState)(!1),[logoCachedbuster,setLogoCacheBuster]=(0,react.useState)(0),serverStatusData=(0,react.useContext)(server_status_context.aC),{setFieldInConfigState,serverConfig}=serverStatusData||{},currentLogo=null==serverConfig?void 0:null===(ref=serverConfig.instanceDetails)||void 0===ref?void 0:ref.logo,[submitStatus,setSubmitStatus]=(0,react.useState)(null),resetTimer=null,{apiPath,tip}=config_constants.ZQ,resetStates=()=>{setSubmitStatus(null),clearTimeout(resetTimer),resetTimer=null},beforeUpload=file=>(setLoading(!0),new Promise((res,rej)=>{if(!ACCEPTED_FILE_TYPES.includes(file.type)){let msg="File type is not supported: ".concat(file.type);return setSubmitStatus((0,input_statuses.kg)(input_statuses.Un,"There was an error: ".concat(msg))),resetTimer=setTimeout(resetStates,config_constants.sI),setLoading(!1),rej()}!function(img,callback){let reader=new FileReader;reader.addEventListener("load",()=>callback(reader.result)),reader.readAsDataURL(img)}(file,url=>(setlogoUrl(url),res()))})),handleLogoUpdate=async()=>{logoUrl!==currentLogo&&(setSubmitStatus((0,input_statuses.kg)(input_statuses.Jk)),await (0,config_constants.Si)({apiPath,data:{value:logoUrl},onSuccess(){setFieldInConfigState({fieldName:"logo",value:logoUrl,path:""}),setSubmitStatus((0,input_statuses.kg)(input_statuses.zv)),setLoading(!1),setLogoCacheBuster(Math.floor(100*Math.random()))},onError(msg){setSubmitStatus((0,input_statuses.kg)(input_statuses.Un,"There was an error: ".concat(msg))),setLoading(!1)}}),resetTimer=setTimeout(resetStates,config_constants.sI))},logoDisplayUrl="".concat(apis.WB,"logo?random=").concat(logoCachedbuster);return(0,jsx_runtime.jsxs)("div",{className:"formfield-container logo-upload-container",children:[(0,jsx_runtime.jsx)("div",{className:"label-side",children:(0,jsx_runtime.jsx)("span",{className:"formfield-label",children:"Logo"})}),(0,jsx_runtime.jsxs)("div",{className:"input-side",children:[(0,jsx_runtime.jsxs)("div",{className:"input-group",children:[(0,jsx_runtime.jsx)("img",{src:logoDisplayUrl,alt:"avatar",className:"logo-preview"}),(0,jsx_runtime.jsx)(upload.Z,{name:"logo",listType:"picture",className:"avatar-uploader",showUploadList:!1,accept:ACCEPTED_FILE_TYPES.join(","),beforeUpload:beforeUpload,customRequest:handleLogoUpdate,disabled:loading,children:loading?(0,jsx_runtime.jsx)(LoadingOutlined.Z,{style:{color:"white"}}):(0,jsx_runtime.jsx)(es_button.Z,{icon:(0,jsx_runtime.jsx)(UploadOutlined.Z,{})})})]}),(0,jsx_runtime.jsx)(FormStatusIndicator.E,{status:submitStatus}),(0,jsx_runtime.jsx)("p",{className:"field-tip",children:tip})]})]})},{Title}=typography.Z,EditInstanceDetails=()=>{let[formDataValues,setFormDataValues]=(0,react.useState)(null),serverStatusData=(0,react.useContext)(server_status_context.aC),{serverConfig}=serverStatusData||{},{instanceDetails,yp}=serverConfig,{instanceUrl}=yp;if((0,react.useEffect)(()=>{setFormDataValues({...instanceDetails,...yp})},[instanceDetails,yp]),!formDataValues)return null;let handleSubmitInstanceUrl=()=>{""===formDataValues.instanceUrl&&!0===yp.enabled&&(0,config_constants.Si)({apiPath:config_constants.AP,data:{value:!1}})},handleFieldChange=param=>{let{fieldName,value}=param;setFormDataValues({...formDataValues,[fieldName]:value})},hasInstanceUrl=""!==instanceUrl;return(0,jsx_runtime.jsxs)("div",{className:"edit-general-settings",children:[(0,jsx_runtime.jsx)(Title,{level:3,className:"section-title",children:"Configure Instance Details"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(TextFieldWithSubmit.$7,{fieldName:"name",...config_constants.RE,value:formDataValues.name,initialValue:instanceDetails.name,onChange:handleFieldChange}),(0,jsx_runtime.jsx)(TextFieldWithSubmit.$7,{fieldName:"instanceUrl",...config_constants.cj,value:formDataValues.instanceUrl,initialValue:yp.instanceUrl,type:TextFieldWithSubmit.xA,onChange:handleFieldChange,onSubmit:handleSubmitInstanceUrl}),(0,jsx_runtime.jsx)(TextFieldWithSubmit.$7,{fieldName:"summary",...config_constants.rs,type:TextFieldWithSubmit.Sk,value:formDataValues.summary,initialValue:instanceDetails.summary,onChange:handleFieldChange}),(0,jsx_runtime.jsx)(TextFieldWithSubmit.$7,{fieldName:"offlineMessage",...config_constants.rd,type:TextFieldWithSubmit.Sk,value:formDataValues.offlineMessage,initialValue:instanceDetails.offlineMessage,onChange:handleFieldChange}),(0,jsx_runtime.jsx)(EditLogo,{}),(0,jsx_runtime.jsx)(ToggleSwitch.Z,{fieldName:"hideViewerCount",useSubmit:!0,...config_constants._X,checked:formDataValues.hideViewerCount,onChange:function(enabled){handleFieldChange({fieldName:"hideViewerCount",value:enabled})}}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsxs)("p",{className:"description",children:["Increase your audience by appearing in the"," ",(0,jsx_runtime.jsx)("a",{href:"https://directory.owncast.online",target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)("strong",{children:"Owncast Directory"})}),". This is an external service run by the Owncast project."," ",(0,jsx_runtime.jsx)("a",{href:"https://owncast.online/docs/directory/?source=admin",target:"_blank",rel:"noopener noreferrer",children:"Learn more"}),"."]}),!yp.instanceUrl&&(0,jsx_runtime.jsxs)("p",{className:"description",children:["You must set your ",(0,jsx_runtime.jsx)("strong",{children:"Server URL"})," above to enable the directory."]}),(0,jsx_runtime.jsxs)("div",{className:"config-yp-container",children:[(0,jsx_runtime.jsx)(ToggleSwitch.Z,{fieldName:"enabled",useSubmit:!0,...config_constants.P,checked:formDataValues.enabled,disabled:!hasInstanceUrl}),(0,jsx_runtime.jsx)(ToggleSwitch.Z,{fieldName:"nsfw",useSubmit:!0,...config_constants.EY,checked:formDataValues.nsfw,disabled:!hasInstanceUrl})]})]})};var es_tag=__webpack_require__(20550),TextField=__webpack_require__(40117),EditValueArray=__webpack_require__(80894);let{Title:EditInstanceTags_Title}=typography.Z,EditInstanceTags=()=>{let[newTagInput,setNewTagInput]=(0,react.useState)(""),[submitStatus,setSubmitStatus]=(0,react.useState)(null),serverStatusData=(0,react.useContext)(server_status_context.aC),{serverConfig,setFieldInConfigState}=serverStatusData||{},{instanceDetails}=serverConfig,{tags=[]}=instanceDetails,{apiPath,maxLength,placeholder,configPath}=config_constants.y_,resetTimer=null;(0,react.useEffect)(()=>()=>{clearTimeout(resetTimer)},[]);let resetStates=()=>{setSubmitStatus(null),clearTimeout(resetTimer=null)},postUpdateToAPI=async postValue=>{setSubmitStatus((0,input_statuses.kg)(input_statuses.Jk)),await (0,config_constants.Si)({apiPath,data:{value:postValue},onSuccess(){setFieldInConfigState({fieldName:"tags",value:postValue,path:configPath}),setSubmitStatus((0,input_statuses.kg)(input_statuses.zv,"Tags updated.")),setNewTagInput(""),resetTimer=setTimeout(resetStates,config_constants.sI)},onError(message){setSubmitStatus((0,input_statuses.kg)(input_statuses.Un,message)),resetTimer=setTimeout(resetStates,config_constants.sI)}})},handleInputChange=param=>{let{value}=param;submitStatus||setSubmitStatus(null),setNewTagInput(value)},handleSubmitNewTag=()=>{resetStates();let newTag=newTagInput.trim();if(""===newTag){setSubmitStatus((0,input_statuses.kg)(input_statuses.dG,"Please enter a tag"));return}if(tags.some(tag=>tag.toLowerCase()===newTag.toLowerCase())){setSubmitStatus((0,input_statuses.kg)(input_statuses.dG,"This tag is already used!"));return}let updatedTags=[...tags,newTag];postUpdateToAPI(updatedTags)},handleDeleteTag=index=>{resetStates();let updatedTags=[...tags];updatedTags.splice(index,1),postUpdateToAPI(updatedTags)};return(0,jsx_runtime.jsxs)("div",{className:"tag-editor-container",children:[(0,jsx_runtime.jsx)(EditInstanceTags_Title,{level:3,className:"section-title",children:"Add Tags"}),(0,jsx_runtime.jsx)("p",{className:"description",children:"This is a great way to categorize your Owncast server on the Directory!"}),(0,jsx_runtime.jsx)("div",{className:"edit-current-strings",children:tags.map((tag,index)=>{let handleClose=()=>{handleDeleteTag(index)};return(0,jsx_runtime.jsx)(es_tag.Z,{closable:!0,onClose:handleClose,color:EditValueArray.Q,children:tag},"tag-".concat(tag,"-").concat(index))})}),(0,jsx_runtime.jsx)("div",{className:"add-new-string-section",children:(0,jsx_runtime.jsx)(TextField.nv,{fieldName:"tag-input",value:newTagInput,className:"new-tag-input",onChange:handleInputChange,onPressEnter:handleSubmitNewTag,maxLength:maxLength,placeholder:placeholder,status:submitStatus})})]})};var EditSocialLinks=__webpack_require__(87652),esm=__webpack_require__(87685),codemirror_theme_bbedit_esm=__webpack_require__(58909),dist=__webpack_require__(48825),language_data_dist=__webpack_require__(76538);let{Title:EditPageContent_Title}=typography.Z,EditPageContent=()=>{let[content,setContent]=(0,react.useState)(""),[submitStatus,setSubmitStatus]=(0,react.useState)(null),[hasChanged,setHasChanged]=(0,react.useState)(!1),serverStatusData=(0,react.useContext)(server_status_context.aC),{serverConfig,setFieldInConfigState}=serverStatusData||{},{instanceDetails}=serverConfig,{extraPageContent:initialContent}=instanceDetails,resetTimer=null,resetStates=()=>{setSubmitStatus(null),setHasChanged(!1),clearTimeout(resetTimer),resetTimer=null};async function handleSave(){setSubmitStatus((0,input_statuses.kg)(input_statuses.Jk)),await (0,config_constants.Si)({apiPath:config_constants.AA,data:{value:content},onSuccess(message){setFieldInConfigState({fieldName:"extraPageContent",value:content,path:"instanceDetails"}),setSubmitStatus((0,input_statuses.kg)(input_statuses.zv,message))},onError(message){setSubmitStatus((0,input_statuses.kg)(input_statuses.Un,message))}}),resetTimer=setTimeout(resetStates,config_constants.sI)}return(0,react.useEffect)(()=>{setContent(initialContent)},[instanceDetails]),(0,jsx_runtime.jsxs)("div",{className:"edit-page-content",children:[(0,jsx_runtime.jsx)(EditPageContent_Title,{level:3,className:"section-title",children:"Custom Page Content"}),(0,jsx_runtime.jsxs)("p",{className:"description",children:["Edit the content of your page by using simple"," ",(0,jsx_runtime.jsx)("a",{href:"https://www.markdownguide.org/basic-syntax/",target:"_blank",rel:"noopener noreferrer",children:"Markdown syntax"}),"."]}),(0,jsx_runtime.jsx)(esm.ZP,{value:content,placeholder:"Enter your custom page content here...",theme:codemirror_theme_bbedit_esm.F,onChange:function(text){setContent(text),text===initialContent||hasChanged?text===initialContent&&hasChanged&&setHasChanged(!1):setHasChanged(!0)},extensions:[(0,dist.markdown)({base:dist.markdownLanguage,codeLanguages:language_data_dist.M})]}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsxs)("div",{className:"page-content-actions",children:[hasChanged&&(0,jsx_runtime.jsx)(es_button.Z,{type:"primary",onClick:handleSave,children:"Save"}),(0,jsx_runtime.jsx)(FormStatusIndicator.E,{status:submitStatus})]})]})},{Title:config_public_details_Title}=typography.Z;function PublicFacingDetails(){return(0,jsx_runtime.jsxs)("div",{className:"config-public-details-page",children:[(0,jsx_runtime.jsx)(config_public_details_Title,{children:"General Settings"}),(0,jsx_runtime.jsxs)("p",{className:"description",children:["The following are displayed on your site to describe your stream and its content."," ",(0,jsx_runtime.jsx)("a",{href:"https://owncast.online/docs/website/?source=admin",target:"_blank",rel:"noopener noreferrer",children:"Learn more."})]}),(0,jsx_runtime.jsxs)("div",{className:"top-container",children:[(0,jsx_runtime.jsx)("div",{className:"form-module instance-details-container",children:(0,jsx_runtime.jsx)(EditInstanceDetails,{})}),(0,jsx_runtime.jsxs)("div",{className:"form-module social-items-container ",children:[(0,jsx_runtime.jsx)("div",{className:"form-module tags-module",children:(0,jsx_runtime.jsx)(EditInstanceTags,{})}),(0,jsx_runtime.jsx)("div",{className:"form-module social-handles-container",children:(0,jsx_runtime.jsx)(EditSocialLinks.h,{})})]})]}),(0,jsx_runtime.jsx)("div",{className:"form-module page-content-module",children:(0,jsx_runtime.jsx)(EditPageContent,{})})]})}}},function(__webpack_require__){__webpack_require__.O(0,[5762,8939,3903,4267,3626,7910,1943,1043,9774,2888,179],function(){return __webpack_require__(__webpack_require__.s=86045)}),_N_E=__webpack_require__.O()}]);