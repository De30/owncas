"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[370],{70370:function(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){function wordRegexp(words){return RegExp("^(?:"+words.join("|")+")$","i")}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{sparql:function(){return sparql}});var curPunc,ops=wordRegexp(["str","lang","langmatches","datatype","bound","sameterm","isiri","isuri","iri","uri","bnode","count","sum","min","max","avg","sample","group_concat","rand","abs","ceil","floor","round","concat","substr","strlen","replace","ucase","lcase","encode_for_uri","contains","strstarts","strends","strbefore","strafter","year","month","day","hours","minutes","seconds","timezone","tz","now","uuid","struuid","md5","sha1","sha256","sha384","sha512","coalesce","if","strlang","strdt","isnumeric","regex","exists","isblank","isliteral","a","bind"]),keywords=wordRegexp(["base","prefix","select","distinct","reduced","construct","describe","ask","from","named","where","order","limit","offset","filter","optional","graph","by","asc","desc","as","having","undef","values","group","minus","in","not","service","silent","using","insert","delete","union","true","false","with","data","copy","to","move","add","create","drop","clear","load","into"]),operatorChars=/[*+\-<>=&|\^\/!\?]/;function tokenBase(stream,state){var ch=stream.next();if(curPunc=null,"$"==ch||"?"==ch)return"?"==ch&&stream.match(/\s/,!1)?"operator":(stream.match(/^[A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][A-Za-z0-9_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*/),"variableName.local");if("<"==ch&&!stream.match(/^[\s\u00a0=]/,!1))return stream.match(/^[^\s\u00a0>]*>?/),"atom";if('"'==ch||"'"==ch)return state.tokenize=function(stream,state){for(var ch1,escaped=!1;null!=(ch1=stream.next());){if(ch1==ch&&!escaped){state.tokenize=tokenBase;break}escaped=!escaped&&"\\"==ch1}return"string"},state.tokenize(stream,state);if(/[{}\(\),\.;\[\]]/.test(ch))return curPunc=ch,"bracket";if("#"==ch)return stream.skipToEnd(),"comment";if(operatorChars.test(ch))return"operator";if(":"==ch)return eatPnLocal(stream),"atom";if("@"==ch)return stream.eatWhile(/[a-z\d\-]/i),"meta";if(stream.eatWhile(/[_\w\d]/),stream.eat(":"))return eatPnLocal(stream),"atom";var word=stream.current();return ops.test(word)?"builtin":keywords.test(word)?"keyword":"variable"}function eatPnLocal(stream){stream.match(/(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/i)}function pushContext(state,type,col){state.context={prev:state.context,indent:state.indent,col:col,type:type}}function popContext(state){state.indent=state.context.indent,state.context=state.context.prev}let sparql={name:"sparql",startState:function(){return{tokenize:tokenBase,context:null,indent:0,col:0}},token:function(stream,state){if(stream.sol()&&(state.context&&null==state.context.align&&(state.context.align=!1),state.indent=stream.indentation()),stream.eatSpace())return null;var style=state.tokenize(stream,state);if("comment"!=style&&state.context&&null==state.context.align&&"pattern"!=state.context.type&&(state.context.align=!0),"("==curPunc)pushContext(state,")",stream.column());else if("["==curPunc)pushContext(state,"]",stream.column());else if("{"==curPunc)pushContext(state,"}",stream.column());else if(/[\]\}\)]/.test(curPunc)){for(;state.context&&"pattern"==state.context.type;)popContext(state);state.context&&curPunc==state.context.type&&(popContext(state),"}"==curPunc&&state.context&&"pattern"==state.context.type&&popContext(state))}else"."==curPunc&&state.context&&"pattern"==state.context.type?popContext(state):/atom|string|variable/.test(style)&&state.context&&(/[\}\]]/.test(state.context.type)?pushContext(state,"pattern",stream.column()):"pattern"!=state.context.type||state.context.align||(state.context.align=!0,state.context.col=stream.column()));return style},indent:function(state,textAfter,cx){var firstChar=textAfter&&textAfter.charAt(0),context=state.context;if(/[\]\}]/.test(firstChar))for(;context&&"pattern"==context.type;)context=context.prev;var closing=context&&firstChar==context.type;return context?"pattern"==context.type?context.col:context.align?context.col+(closing?0:1):context.indent+(closing?0:cx.unit):0},languageData:{commentTokens:{line:"#"}}}}}]);