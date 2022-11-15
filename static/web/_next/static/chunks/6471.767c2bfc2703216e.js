"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6471],{36471:function(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){var pluginName,type,curState,setStyle;function inBlock(style,terminator,returnTokenizer){return function(stream,state){for(;!stream.eol();){if(stream.match(terminator)){state.tokenize=inText;break}stream.next()}return returnTokenizer&&(state.tokenize=returnTokenizer),style}}function inLine(style){return function(stream,state){for(;!stream.eol();)stream.next();return state.tokenize=inText,style}}function inText(stream,state){function chain(parser){return state.tokenize=parser,parser(stream,state)}var sol=stream.sol(),ch=stream.next();switch(ch){case"{":return stream.eat("/"),stream.eatSpace(),stream.eatWhile(/[^\s\u00a0=\"\'\/?(}]/),state.tokenize=inPlugin,"tag";case"_":if(stream.eat("_"))return chain(inBlock("strong","__",inText));break;case"'":if(stream.eat("'"))return chain(inBlock("em","''",inText));break;case"(":if(stream.eat("("))return chain(inBlock("link","))",inText));break;case"[":return chain(inBlock("url","]",inText));case"|":if(stream.eat("|"))return chain(inBlock("comment","||"));break;case"-":if(stream.eat("="))return chain(inBlock("header string","=-",inText));if(stream.eat("-"))return chain(inBlock("error tw-deleted","--",inText));break;case"=":if(stream.match("=="))return chain(inBlock("tw-underline","===",inText));break;case":":if(stream.eat(":"))return chain(inBlock("comment","::"));break;case"^":return chain(inBlock("tw-box","^"));case"~":if(stream.match("np~"))return chain(inBlock("meta","~/np~"))}if(sol)switch(ch){case"!":if(stream.match("!!!!!")||stream.match("!!!!"))return chain(inLine("header string"));if(stream.match("!!!"))return chain(inLine("header string"));if(stream.match("!!"))return chain(inLine("header string"));else return chain(inLine("header string"));case"*":case"#":case"+":return chain(inLine("tw-listitem bracket"))}return null}function inPlugin(stream,state){var ch=stream.next(),peek=stream.peek();return"}"==ch?(state.tokenize=inText,"tag"):"("==ch||")"==ch?"bracket":"="==ch?(type="equals",">"==peek&&(stream.next(),peek=stream.peek()),/[\'\"]/.test(peek)||(state.tokenize=function(stream,state){for(;!stream.eol();){var ch=stream.next(),peek=stream.peek();if(" "==ch||","==ch||/[ )}]/.test(peek)){state.tokenize=inPlugin;break}}return"string"}),"operator"):/[\'\"]/.test(ch)?(state.tokenize=function(stream,state){for(;!stream.eol();)if(stream.next()==ch){state.tokenize=inPlugin;break}return"string"},state.tokenize(stream,state)):(stream.eatWhile(/[^\s\u00a0=\"\'\/?]/),"keyword")}function pass(){for(var i=arguments.length-1;i>=0;i--)curState.cc.push(arguments[i])}function cont(){return pass.apply(null,arguments),!0}function pushContext(pluginName,startOfLine){var noIndent=curState.context&&curState.context.noIndent;curState.context={prev:curState.context,pluginName:pluginName,indent:curState.indented,startOfLine:startOfLine,noIndent:noIndent}}function popContext(){curState.context&&(curState.context=curState.context.prev)}function element(type){if("openPlugin"==type){var startOfLine;return curState.pluginName=pluginName,cont(attributes,(startOfLine=curState.startOfLine,function(type){return"selfclosePlugin"==type||"endPlugin"==type||"endPlugin"==type&&pushContext(curState.pluginName,startOfLine),cont()}))}if("closePlugin"==type){var err,err1=!1;return curState.context?(err1=curState.context.pluginName!=pluginName,popContext()):err1=!0,err1&&(setStyle="error"),cont((err=err1,function(type){return(err&&(setStyle="error"),"endPlugin"==type)?cont():pass()}))}return"string"==type&&(curState.context&&"!cdata"==curState.context.name||pushContext("!cdata"),curState.tokenize==inText&&popContext()),cont()}function attributes(type){return"keyword"==type?(setStyle="attribute",cont(attributes)):"equals"==type?cont(attvalue,attributes):pass()}function attvalue(type){return"keyword"==type?(setStyle="string",cont()):"string"==type?cont(attvaluemaybe):pass()}function attvaluemaybe(type){return"string"==type?cont(attvaluemaybe):pass()}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{tiki:function(){return tiki}});let tiki={name:"tiki",startState:function(){return{tokenize:inText,cc:[],indented:0,startOfLine:!0,pluginName:null,context:null}},token:function(stream,state){if(stream.sol()&&(state.startOfLine=!0,state.indented=stream.indentation()),stream.eatSpace())return null;setStyle=type=pluginName=null;var style=state.tokenize(stream,state);if((style||type)&&"comment"!=style)for(curState=state;!(state.cc.pop()||element)(type||style););return state.startOfLine=!1,setStyle||style},indent:function(state,textAfter,cx){var context=state.context;if(context&&context.noIndent)return 0;for(context&&/^{\//.test(textAfter)&&(context=context.prev);context&&!context.startOfLine;)context=context.prev;return context?context.indent+cx.unit:0}}}}]);