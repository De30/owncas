(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7095],{62433:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/chat/messages",function(){return n(28599)}])},28599:function(e,t,n){"use strict";n.r(t),n.d(t,{OUTCOME_TIMEOUT:function(){return C},default:function(){return S}});var s=n(47568),r=n(26042),a=n(69396),i=n(29815),c=n(34051),u=n.n(c),o=n(85893),l=n(67294),d=n(84485),h=n(71577),m=n(10355),f=n(89739),p=n(21640),v=n(94184),x=n.n(v),g=n(58091),w=n(58827),y=n(2766),Z=n(94199),N=n(99611),b=n(90420),j=function(e){var t=e.isVisible,n=e.message,i=e.setMessage;if(!n||(0,y.Qr)(n))return null;var c=null,d=(0,l.useState)(0),m=d[0],v=d[1],x=(n||{}).id;(0,l.useEffect)((function(){return function(){clearTimeout(c)}}));var g=function(){var e=(0,s.Z)(u().mark((function e(){var s;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return clearTimeout(c),v(0),e.next=4,(0,w.rQ)(w.hn,{auth:!0,method:"POST",data:{visible:!t,idArray:[x]}});case 4:(s=e.sent).success&&"changed"===s.message?(i((0,a.Z)((0,r.Z)({},n),{visible:!t})),v(1)):(i((0,a.Z)((0,r.Z)({},n),{visible:t})),v(-1)),c=setTimeout((function(){v(0)}),C);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=(0,o.jsx)(f.Z,{style:{color:"transparent"}});m&&(j=m>0?(0,o.jsx)(f.Z,{style:{color:"var(--ant-success)"}}):(0,o.jsx)(p.Z,{style:{color:"var(--ant-warning)"}}));var k="Click to ".concat(t?"hide":"show"," this message");return(0,o.jsxs)("div",{className:"toggle-switch ".concat(t?"":"hidden"),children:[(0,o.jsx)("span",{className:"outcome-icon",children:j}),(0,o.jsx)(Z.Z,{title:k,placement:"topRight",children:(0,o.jsx)(h.Z,{shape:"circle",size:"small",type:"text",icon:t?(0,o.jsx)(N.Z,{}):(0,o.jsx)(b.Z,{}),onClick:g})})]})},k=n(11085),T=d.Z.Title;var C=3e3;function S(){var e=(0,l.useState)([]),t=e[0],n=e[1],c=(0,l.useState)([]),d=c[0],v=c[1],Z=(0,l.useState)(!1),N=Z[0],b=Z[1],S=(0,l.useState)(null),_=S[0],E=S[1],I=(0,l.useState)(""),M=I[0],O=I[1],P=null,z=null,A=function(){var e=(0,s.Z)(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,w.rQ)(w.WE,{auth:!0});case 3:t=e.sent,(0,y.Qr)(t)?n([]):n(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("==== error",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();(0,l.useEffect)((function(){return A(),z=setInterval((function(){A()}),w.NE),function(){clearTimeout(P),clearTimeout(z)}}),[]);var Q=function(e){return e.reduce((function(e,t){var n=t.user.id;return e.some((function(e){return e.text===n}))||e.push({text:n,value:n}),e}),[]).sort((function(e,t){var n=e.text.toUpperCase(),s=t.text.toUpperCase();return n<s?-1:n>s?1:0}))}(t),U={selectedRowKeys:d,onChange:function(e){v(e)}},D=function(e){var s=t.findIndex((function(t){return t.id===e.id}));t.splice(s,1,e),n((0,i.Z)(t))},H=function(){P=setTimeout((function(){E(null),O("")}),C)},V=function(){var e=(0,s.Z)(u().mark((function e(s){var c,l;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.next=3,(0,w.rQ)(w.hn,{auth:!0,method:"POST",data:{visible:s,idArray:d}});case 3:(c=e.sent).success&&"changed"===c.message?(E((0,o.jsx)(f.Z,{})),H(),l=(0,i.Z)(t),d.map((function(e){var n=l.findIndex((function(t){return t.id===e})),i=(0,a.Z)((0,r.Z)({},t[n]),{visible:s});return l.splice(n,1,i),null})),n(l),v([])):(E((0,o.jsx)(p.Z,{})),H()),b(!1);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=[{title:"Time",dataIndex:"timestamp",key:"timestamp",className:"timestamp-col",defaultSortOrder:"descend",render:function(e){var t=new Date(e);return(0,g.Z)(t,"PP pp")},sorter:function(e,t){return new Date(e.timestamp).getTime()-new Date(t.timestamp).getTime()},width:90},{title:"User",dataIndex:"user",key:"user",className:"name-col",filters:Q,onFilter:function(e,t){return t.user.id===e},sorter:function(e,t){return e.user.displayName.localeCompare(t.user.displayName)},sortDirections:["ascend","descend"],ellipsis:!0,render:function(e){var t=e.displayName;return(0,o.jsx)(k.Z,{user:e,children:t})},width:110},{title:"Message",dataIndex:"body",key:"body",className:"message-col",width:320,render:function(e){return(0,o.jsx)("div",{className:"message-contents",dangerouslySetInnerHTML:{__html:e}})}},{title:"",dataIndex:"hiddenAt",key:"hiddenAt",className:"toggle-col",filters:[{text:"Visible messages",value:!0},{text:"Hidden messages",value:!1}],onFilter:function(e,t){return t.visible===e},render:function(e,t){return(0,o.jsx)(j,{isVisible:!e,message:t,setMessage:D})},width:30}],K=x()({"bulk-editor":!0,active:d.length});return(0,o.jsxs)("div",{className:"chat-messages",children:[(0,o.jsx)(T,{children:"Chat Messages"}),(0,o.jsx)("p",{children:"Manage the messages from viewers that show up on your stream."}),(0,o.jsxs)("div",{className:K,children:[(0,o.jsx)("span",{className:"label",children:"Check multiple messages to change their visibility to: "}),(0,o.jsx)(h.Z,{type:"primary",size:"small",shape:"round",className:"button",loading:"show"===M&&N,icon:"show"===M&&_,disabled:!d.length||M&&"show"!==M,onClick:function(){O("show"),V(!0)},children:"Show"}),(0,o.jsx)(h.Z,{type:"primary",size:"small",shape:"round",className:"button",loading:"hide"===M&&N,icon:"hide"===M&&_,disabled:!d.length||M&&"hide"!==M,onClick:function(){O("hide"),V(!1)},children:"Hide"})]}),(0,o.jsx)(m.Z,{size:"small",className:"table-container",pagination:{defaultPageSize:100,showSizeChanger:!0},scroll:{y:540},rowClassName:function(e){return e.hiddenAt?"hidden":""},dataSource:t,columns:F,rowKey:function(e){return e.id},rowSelection:U})]})}}},function(e){e.O(0,[3662,7330,7266,355,8091,5938,9189,9640,9774,2888,179],(function(){return t=62433,e(e.s=t);var t}));var t=e.O();_N_E=t}]);