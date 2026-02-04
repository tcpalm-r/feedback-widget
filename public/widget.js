var eb=Object.defineProperty,tb=Object.defineProperties;var lb=Object.getOwnPropertyDescriptors;var Qi=Object.getOwnPropertySymbols;var yh=Object.prototype.hasOwnProperty,vh=Object.prototype.propertyIsEnumerable;var gh=(Ne,He,We)=>He in Ne?eb(Ne,He,{enumerable:!0,configurable:!0,writable:!0,value:We}):Ne[He]=We,pt=(Ne,He)=>{for(var We in He||(He={}))yh.call(He,We)&&gh(Ne,We,He[We]);if(Qi)for(var We of Qi(He))vh.call(He,We)&&gh(Ne,We,He[We]);return Ne},hn=(Ne,He)=>tb(Ne,lb(He));var bh=(Ne,He)=>{var We={};for(var Gt in Ne)yh.call(Ne,Gt)&&He.indexOf(Gt)<0&&(We[Gt]=Ne[Gt]);if(Ne!=null&&Qi)for(var Gt of Qi(Ne))He.indexOf(Gt)<0&&vh.call(Ne,Gt)&&(We[Gt]=Ne[Gt]);return We};(function(){"use strict";var Sr;var Ne={exports:{}},He={};var We;function Gt(){if(We)return He;We=1;var i=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function s(o,h,m){var p=null;if(m!==void 0&&(p=""+m),h.key!==void 0&&(p=""+h.key),"key"in h){m={};for(var b in h)b!=="key"&&(m[b]=h[b])}else m=h;return h=m.ref,{$$typeof:i,type:o,key:p,ref:h!==void 0?h:null,props:m}}return He.Fragment=f,He.jsx=s,He.jsxs=s,He}var Af;function ph(){return Af||(Af=1,Ne.exports=Gt()),Ne.exports}var Mf=ph(),Zi={exports:{}},mn={},Vi={exports:{}},Ki={};var _f;function Sh(){return _f||(_f=1,(function(i){function f(T,H){var F=T.length;T.push(H);e:for(;0<F;){var ge=F-1>>>1,me=T[ge];if(0<h(me,H))T[ge]=H,T[F]=me,F=ge;else break e}}function s(T){return T.length===0?null:T[0]}function o(T){if(T.length===0)return null;var H=T[0],F=T.pop();if(F!==H){T[0]=F;e:for(var ge=0,me=T.length,y=me>>>1;ge<y;){var C=2*(ge+1)-1,L=T[C],X=C+1,le=T[X];if(0>h(L,F))X<me&&0>h(le,L)?(T[ge]=le,T[X]=F,ge=X):(T[ge]=L,T[C]=F,ge=C);else if(X<me&&0>h(le,F))T[ge]=le,T[X]=F,ge=X;else break e}}return H}function h(T,H){var F=T.sortIndex-H.sortIndex;return F!==0?F:T.id-H.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var m=performance;i.unstable_now=function(){return m.now()}}else{var p=Date,b=p.now();i.unstable_now=function(){return p.now()-b}}var S=[],v=[],x=1,_=null,R=3,N=!1,B=!1,Y=!1,k=!1,j=typeof setTimeout=="function"?setTimeout:null,Z=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate!="undefined"?setImmediate:null;function G(T){for(var H=s(v);H!==null;){if(H.callback===null)o(v);else if(H.startTime<=T)o(v),H.sortIndex=H.expirationTime,f(S,H);else break;H=s(v)}}function J(T){if(Y=!1,G(T),!B)if(s(S)!==null)B=!0,$||($=!0,be());else{var H=s(v);H!==null&&ee(J,H.startTime-T)}}var $=!1,V=-1,te=5,Ee=-1;function Ye(){return k?!0:!(i.unstable_now()-Ee<te)}function Se(){if(k=!1,$){var T=i.unstable_now();Ee=T;var H=!0;try{e:{B=!1,Y&&(Y=!1,Z(V),V=-1),N=!0;var F=R;try{t:{for(G(T),_=s(S);_!==null&&!(_.expirationTime>T&&Ye());){var ge=_.callback;if(typeof ge=="function"){_.callback=null,R=_.priorityLevel;var me=ge(_.expirationTime<=T);if(T=i.unstable_now(),typeof me=="function"){_.callback=me,G(T),H=!0;break t}_===s(S)&&o(S),G(T)}else o(S);_=s(S)}if(_!==null)H=!0;else{var y=s(v);y!==null&&ee(J,y.startTime-T),H=!1}}break e}finally{_=null,R=F,N=!1}H=void 0}}finally{H?be():$=!1}}}var be;if(typeof q=="function")be=function(){q(Se)};else if(typeof MessageChannel!="undefined"){var Fe=new MessageChannel,Be=Fe.port2;Fe.port1.onmessage=Se,be=function(){Be.postMessage(null)}}else be=function(){j(Se,0)};function ee(T,H){V=j(function(){T(i.unstable_now())},H)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(T){T.callback=null},i.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<T?Math.floor(1e3/T):5},i.unstable_getCurrentPriorityLevel=function(){return R},i.unstable_next=function(T){switch(R){case 1:case 2:case 3:var H=3;break;default:H=R}var F=R;R=H;try{return T()}finally{R=F}},i.unstable_requestPaint=function(){k=!0},i.unstable_runWithPriority=function(T,H){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var F=R;R=T;try{return H()}finally{R=F}},i.unstable_scheduleCallback=function(T,H,F){var ge=i.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?ge+F:ge):F=ge,T){case 1:var me=-1;break;case 2:me=250;break;case 5:me=1073741823;break;case 4:me=1e4;break;default:me=5e3}return me=F+me,T={id:x++,callback:H,priorityLevel:T,startTime:F,expirationTime:me,sortIndex:-1},F>ge?(T.sortIndex=F,f(v,T),s(S)===null&&T===s(v)&&(Y?(Z(V),V=-1):Y=!0,ee(J,F-ge))):(T.sortIndex=me,f(S,T),B||N||(B=!0,$||($=!0,be()))),T},i.unstable_shouldYield=Ye,i.unstable_wrapCallback=function(T){var H=R;return function(){var F=R;R=H;try{return T.apply(this,arguments)}finally{R=F}}}})(Ki)),Ki}var Df;function Eh(){return Df||(Df=1,Vi.exports=Sh()),Vi.exports}var Ji={exports:{}},ae={};var Cf;function xh(){if(Cf)return ae;Cf=1;var i=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),h=Symbol.for("react.profiler"),m=Symbol.for("react.consumer"),p=Symbol.for("react.context"),b=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),R=Symbol.iterator;function N(y){return y===null||typeof y!="object"?null:(y=R&&y[R]||y["@@iterator"],typeof y=="function"?y:null)}var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Y=Object.assign,k={};function j(y,C,L){this.props=y,this.context=C,this.refs=k,this.updater=L||B}j.prototype.isReactComponent={},j.prototype.setState=function(y,C){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,C,"setState")},j.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};function Z(){}Z.prototype=j.prototype;function q(y,C,L){this.props=y,this.context=C,this.refs=k,this.updater=L||B}var G=q.prototype=new Z;G.constructor=q,Y(G,j.prototype),G.isPureReactComponent=!0;var J=Array.isArray;function $(){}var V={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function Ee(y,C,L){var X=L.ref;return{$$typeof:i,type:y,key:C,ref:X!==void 0?X:null,props:L}}function Ye(y,C){return Ee(y.type,C,y.props)}function Se(y){return typeof y=="object"&&y!==null&&y.$$typeof===i}function be(y){var C={"=":"=0",":":"=2"};return"$"+y.replace(/[=:]/g,function(L){return C[L]})}var Fe=/\/+/g;function Be(y,C){return typeof y=="object"&&y!==null&&y.key!=null?be(""+y.key):C.toString(36)}function ee(y){switch(y.status){case"fulfilled":return y.value;case"rejected":throw y.reason;default:switch(typeof y.status=="string"?y.then($,$):(y.status="pending",y.then(function(C){y.status==="pending"&&(y.status="fulfilled",y.value=C)},function(C){y.status==="pending"&&(y.status="rejected",y.reason=C)})),y.status){case"fulfilled":return y.value;case"rejected":throw y.reason}}throw y}function T(y,C,L,X,le){var ne=typeof y;(ne==="undefined"||ne==="boolean")&&(y=null);var oe=!1;if(y===null)oe=!0;else switch(ne){case"bigint":case"string":case"number":oe=!0;break;case"object":switch(y.$$typeof){case i:case f:oe=!0;break;case x:return oe=y._init,T(oe(y._payload),C,L,X,le)}}if(oe)return le=le(y),oe=X===""?"."+Be(y,0):X,J(le)?(L="",oe!=null&&(L=oe.replace(Fe,"$&/")+"/"),T(le,C,L,"",function(el){return el})):le!=null&&(Se(le)&&(le=Ye(le,L+(le.key==null||y&&y.key===le.key?"":(""+le.key).replace(Fe,"$&/")+"/")+oe)),C.push(le)),1;oe=0;var Ve=X===""?".":X+":";if(J(y))for(var Ce=0;Ce<y.length;Ce++)X=y[Ce],ne=Ve+Be(X,Ce),oe+=T(X,C,L,ne,le);else if(Ce=N(y),typeof Ce=="function")for(y=Ce.call(y),Ce=0;!(X=y.next()).done;)X=X.value,ne=Ve+Be(X,Ce++),oe+=T(X,C,L,ne,le);else if(ne==="object"){if(typeof y.then=="function")return T(ee(y),C,L,X,le);throw C=String(y),Error("Objects are not valid as a React child (found: "+(C==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":C)+"). If you meant to render a collection of children, use an array instead.")}return oe}function H(y,C,L){if(y==null)return y;var X=[],le=0;return T(y,X,"","",function(ne){return C.call(L,ne,le++)}),X}function F(y){if(y._status===-1){var C=y._result;C=C(),C.then(function(L){(y._status===0||y._status===-1)&&(y._status=1,y._result=L)},function(L){(y._status===0||y._status===-1)&&(y._status=2,y._result=L)}),y._status===-1&&(y._status=0,y._result=C)}if(y._status===1)return y._result.default;throw y._result}var ge=typeof reportError=="function"?reportError:function(y){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var C=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof y=="object"&&y!==null&&typeof y.message=="string"?String(y.message):String(y),error:y});if(!window.dispatchEvent(C))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",y);return}console.error(y)},me={map:H,forEach:function(y,C,L){H(y,function(){C.apply(this,arguments)},L)},count:function(y){var C=0;return H(y,function(){C++}),C},toArray:function(y){return H(y,function(C){return C})||[]},only:function(y){if(!Se(y))throw Error("React.Children.only expected to receive a single React element child.");return y}};return ae.Activity=_,ae.Children=me,ae.Component=j,ae.Fragment=s,ae.Profiler=h,ae.PureComponent=q,ae.StrictMode=o,ae.Suspense=S,ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=V,ae.__COMPILER_RUNTIME={__proto__:null,c:function(y){return V.H.useMemoCache(y)}},ae.cache=function(y){return function(){return y.apply(null,arguments)}},ae.cacheSignal=function(){return null},ae.cloneElement=function(y,C,L){if(y==null)throw Error("The argument must be a React element, but you passed "+y+".");var X=Y({},y.props),le=y.key;if(C!=null)for(ne in C.key!==void 0&&(le=""+C.key),C)!te.call(C,ne)||ne==="key"||ne==="__self"||ne==="__source"||ne==="ref"&&C.ref===void 0||(X[ne]=C[ne]);var ne=arguments.length-2;if(ne===1)X.children=L;else if(1<ne){for(var oe=Array(ne),Ve=0;Ve<ne;Ve++)oe[Ve]=arguments[Ve+2];X.children=oe}return Ee(y.type,le,X)},ae.createContext=function(y){return y={$$typeof:p,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null},y.Provider=y,y.Consumer={$$typeof:m,_context:y},y},ae.createElement=function(y,C,L){var X,le={},ne=null;if(C!=null)for(X in C.key!==void 0&&(ne=""+C.key),C)te.call(C,X)&&X!=="key"&&X!=="__self"&&X!=="__source"&&(le[X]=C[X]);var oe=arguments.length-2;if(oe===1)le.children=L;else if(1<oe){for(var Ve=Array(oe),Ce=0;Ce<oe;Ce++)Ve[Ce]=arguments[Ce+2];le.children=Ve}if(y&&y.defaultProps)for(X in oe=y.defaultProps,oe)le[X]===void 0&&(le[X]=oe[X]);return Ee(y,ne,le)},ae.createRef=function(){return{current:null}},ae.forwardRef=function(y){return{$$typeof:b,render:y}},ae.isValidElement=Se,ae.lazy=function(y){return{$$typeof:x,_payload:{_status:-1,_result:y},_init:F}},ae.memo=function(y,C){return{$$typeof:v,type:y,compare:C===void 0?null:C}},ae.startTransition=function(y){var C=V.T,L={};V.T=L;try{var X=y(),le=V.S;le!==null&&le(L,X),typeof X=="object"&&X!==null&&typeof X.then=="function"&&X.then($,ge)}catch(ne){ge(ne)}finally{C!==null&&L.types!==null&&(C.types=L.types),V.T=C}},ae.unstable_useCacheRefresh=function(){return V.H.useCacheRefresh()},ae.use=function(y){return V.H.use(y)},ae.useActionState=function(y,C,L){return V.H.useActionState(y,C,L)},ae.useCallback=function(y,C){return V.H.useCallback(y,C)},ae.useContext=function(y){return V.H.useContext(y)},ae.useDebugValue=function(){},ae.useDeferredValue=function(y,C){return V.H.useDeferredValue(y,C)},ae.useEffect=function(y,C){return V.H.useEffect(y,C)},ae.useEffectEvent=function(y){return V.H.useEffectEvent(y)},ae.useId=function(){return V.H.useId()},ae.useImperativeHandle=function(y,C,L){return V.H.useImperativeHandle(y,C,L)},ae.useInsertionEffect=function(y,C){return V.H.useInsertionEffect(y,C)},ae.useLayoutEffect=function(y,C){return V.H.useLayoutEffect(y,C)},ae.useMemo=function(y,C){return V.H.useMemo(y,C)},ae.useOptimistic=function(y,C){return V.H.useOptimistic(y,C)},ae.useReducer=function(y,C,L){return V.H.useReducer(y,C,L)},ae.useRef=function(y){return V.H.useRef(y)},ae.useState=function(y){return V.H.useState(y)},ae.useSyncExternalStore=function(y,C,L){return V.H.useSyncExternalStore(y,C,L)},ae.useTransition=function(){return V.H.useTransition()},ae.version="19.2.3",ae}var Of;function $i(){return Of||(Of=1,Ji.exports=xh()),Ji.exports}var Wi={exports:{}},at={};var Uf;function Th(){if(Uf)return at;Uf=1;var i=$i();function f(S){var v="https://react.dev/errors/"+S;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)v+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+S+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var o={d:{f:s,r:function(){throw Error(f(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},h=Symbol.for("react.portal");function m(S,v,x){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:h,key:_==null?null:""+_,children:S,containerInfo:v,implementation:x}}var p=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function b(S,v){if(S==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,at.createPortal=function(S,v){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(f(299));return m(S,v,null,x)},at.flushSync=function(S){var v=p.T,x=o.p;try{if(p.T=null,o.p=2,S)return S()}finally{p.T=v,o.p=x,o.d.f()}},at.preconnect=function(S,v){typeof S=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,o.d.C(S,v))},at.prefetchDNS=function(S){typeof S=="string"&&o.d.D(S)},at.preinit=function(S,v){if(typeof S=="string"&&v&&typeof v.as=="string"){var x=v.as,_=b(x,v.crossOrigin),R=typeof v.integrity=="string"?v.integrity:void 0,N=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;x==="style"?o.d.S(S,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:_,integrity:R,fetchPriority:N}):x==="script"&&o.d.X(S,{crossOrigin:_,integrity:R,fetchPriority:N,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},at.preinitModule=function(S,v){if(typeof S=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var x=b(v.as,v.crossOrigin);o.d.M(S,{crossOrigin:x,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&o.d.M(S)},at.preload=function(S,v){if(typeof S=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var x=v.as,_=b(x,v.crossOrigin);o.d.L(S,x,{crossOrigin:_,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},at.preloadModule=function(S,v){if(typeof S=="string")if(v){var x=b(v.as,v.crossOrigin);o.d.m(S,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:x,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else o.d.m(S)},at.requestFormReset=function(S){o.d.r(S)},at.unstable_batchedUpdates=function(S,v){return S(v)},at.useFormState=function(S,v,x){return p.H.useFormState(S,v,x)},at.useFormStatus=function(){return p.H.useHostTransitionStatus()},at.version="19.2.3",at}var Rf;function zh(){if(Rf)return Wi.exports;Rf=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(f){console.error(f)}}return i(),Wi.exports=Th(),Wi.exports}var Nf;function wh(){if(Nf)return mn;Nf=1;var i=Eh(),f=$i(),s=zh();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var l=2;l<arguments.length;l++)t+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function m(e){var t=e,l=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(l=t.return),e=t.return;while(e)}return t.tag===3?l:null}function p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function b(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function S(e){if(m(e)!==e)throw Error(o(188))}function v(e){var t=e.alternate;if(!t){if(t=m(e),t===null)throw Error(o(188));return t!==e?null:e}for(var l=e,a=t;;){var n=l.return;if(n===null)break;var u=n.alternate;if(u===null){if(a=n.return,a!==null){l=a;continue}break}if(n.child===u.child){for(u=n.child;u;){if(u===l)return S(n),e;if(u===a)return S(n),t;u=u.sibling}throw Error(o(188))}if(l.return!==a.return)l=n,a=u;else{for(var c=!1,r=n.child;r;){if(r===l){c=!0,l=n,a=u;break}if(r===a){c=!0,a=n,l=u;break}r=r.sibling}if(!c){for(r=u.child;r;){if(r===l){c=!0,l=u,a=n;break}if(r===a){c=!0,a=u,l=n;break}r=r.sibling}if(!c)throw Error(o(189))}}if(l.alternate!==a)throw Error(o(190))}if(l.tag!==3)throw Error(o(188));return l.stateNode.current===l?e:t}function x(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=x(e),t!==null)return t;e=e.sibling}return null}var _=Object.assign,R=Symbol.for("react.element"),N=Symbol.for("react.transitional.element"),B=Symbol.for("react.portal"),Y=Symbol.for("react.fragment"),k=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),Z=Symbol.for("react.consumer"),q=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),J=Symbol.for("react.suspense"),$=Symbol.for("react.suspense_list"),V=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),Ee=Symbol.for("react.activity"),Ye=Symbol.for("react.memo_cache_sentinel"),Se=Symbol.iterator;function be(e){return e===null||typeof e!="object"?null:(e=Se&&e[Se]||e["@@iterator"],typeof e=="function"?e:null)}var Fe=Symbol.for("react.client.reference");function Be(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Fe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Y:return"Fragment";case j:return"Profiler";case k:return"StrictMode";case J:return"Suspense";case $:return"SuspenseList";case Ee:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case B:return"Portal";case q:return e.displayName||"Context";case Z:return(e._context.displayName||"Context")+".Consumer";case G:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case V:return t=e.displayName||null,t!==null?t:Be(e.type)||"Memo";case te:t=e._payload,e=e._init;try{return Be(e(t))}catch(l){}}return null}var ee=Array.isArray,T=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F={pending:!1,data:null,method:null,action:null},ge=[],me=-1;function y(e){return{current:e}}function C(e){0>me||(e.current=ge[me],ge[me]=null,me--)}function L(e,t){me++,ge[me]=e.current,e.current=t}var X=y(null),le=y(null),ne=y(null),oe=y(null);function Ve(e,t){switch(L(ne,t),L(le,e),L(X,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?q0(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=q0(t),e=L0(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}C(X),L(X,e)}function Ce(){C(X),C(le),C(ne)}function el(e){e.memoizedState!==null&&L(oe,e);var t=X.current,l=L0(t,e.type);t!==l&&(L(le,e),L(X,l))}function Wl(e){le.current===e&&(C(X),C(le)),oe.current===e&&(C(oe),su._currentValue=F)}var Ta,En;function $t(e){if(Ta===void 0)try{throw Error()}catch(l){var t=l.stack.trim().match(/\n( *(at )?)/);Ta=t&&t[1]||"",En=-1<l.stack.indexOf(`
    at`)?" (<anonymous>)":-1<l.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ta+e+En}var za=!1;function wa(e,t){if(!e||za)return"";za=!0;var l=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var U=function(){throw Error()};if(Object.defineProperty(U.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(U,[])}catch(M){var A=M}Reflect.construct(e,[],U)}else{try{U.call()}catch(M){A=M}e.call(U.prototype)}}else{try{throw Error()}catch(M){A=M}(U=e())&&typeof U.catch=="function"&&U.catch(function(){})}}catch(M){if(M&&A&&typeof M.stack=="string")return[M.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=a.DetermineComponentFrameRoot(),c=u[0],r=u[1];if(c&&r){var d=c.split(`
`),w=r.split(`
`);for(n=a=0;a<d.length&&!d[a].includes("DetermineComponentFrameRoot");)a++;for(;n<w.length&&!w[n].includes("DetermineComponentFrameRoot");)n++;if(a===d.length||n===w.length)for(a=d.length-1,n=w.length-1;1<=a&&0<=n&&d[a]!==w[n];)n--;for(;1<=a&&0<=n;a--,n--)if(d[a]!==w[n]){if(a!==1||n!==1)do if(a--,n--,0>n||d[a]!==w[n]){var D=`
`+d[a].replace(" at new "," at ");return e.displayName&&D.includes("<anonymous>")&&(D=D.replace("<anonymous>",e.displayName)),D}while(1<=a&&0<=n);break}}}finally{za=!1,Error.prepareStackTrace=l}return(l=e?e.displayName||e.name:"")?$t(l):""}function zu(e,t){switch(e.tag){case 26:case 27:case 5:return $t(e.type);case 16:return $t("Lazy");case 13:return e.child!==t&&t!==null?$t("Suspense Fallback"):$t("Suspense");case 19:return $t("SuspenseList");case 0:case 15:return wa(e.type,!1);case 11:return wa(e.type.render,!1);case 1:return wa(e.type,!0);case 31:return $t("Activity");default:return""}}function xn(e){try{var t="",l=null;do t+=zu(e,l),l=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Aa=Object.prototype.hasOwnProperty,Fl=i.unstable_scheduleCallback,Il=i.unstable_cancelCallback,wu=i.unstable_shouldYield,Au=i.unstable_requestPaint,nt=i.unstable_now,Mu=i.unstable_getCurrentPriorityLevel,Tn=i.unstable_ImmediatePriority,ct=i.unstable_UserBlockingPriority,Pl=i.unstable_NormalPriority,_u=i.unstable_LowPriority,zn=i.unstable_IdlePriority,Du=i.log,dc=i.unstable_setDisableYieldValue,St=null,ot=null;function Xt(e){if(typeof Du=="function"&&dc(e),ot&&typeof ot.setStrictMode=="function")try{ot.setStrictMode(St,e)}catch(t){}}var ut=Math.clz32?Math.clz32:Qt,Ct=Math.log,Ot=Math.LN2;function Qt(e){return e>>>=0,e===0?32:31-(Ct(e)/Ot|0)|0}var it=256,xl=262144,Ke=4194304;function ke(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function tl(e,t,l){var a=e.pendingLanes;if(a===0)return 0;var n=0,u=e.suspendedLanes,c=e.pingedLanes;e=e.warmLanes;var r=a&134217727;return r!==0?(a=r&~u,a!==0?n=ke(a):(c&=r,c!==0?n=ke(c):l||(l=r&~e,l!==0&&(n=ke(l))))):(r=a&~u,r!==0?n=ke(r):c!==0?n=ke(c):l||(l=a&~e,l!==0&&(n=ke(l)))),n===0?0:t!==0&&t!==n&&(t&u)===0&&(u=n&-n,l=t&-t,u>=l||u===32&&(l&4194048)!==0)?t:n}function ea(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Cu(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wn(){var e=Ke;return Ke<<=1,(Ke&62914560)===0&&(Ke=4194304),e}function Ma(e){for(var t=[],l=0;31>l;l++)t.push(e);return t}function Tl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ou(e,t,l,a,n,u){var c=e.pendingLanes;e.pendingLanes=l,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=l,e.entangledLanes&=l,e.errorRecoveryDisabledLanes&=l,e.shellSuspendCounter=0;var r=e.entanglements,d=e.expirationTimes,w=e.hiddenUpdates;for(l=c&~l;0<l;){var D=31-ut(l),U=1<<D;r[D]=0,d[D]=-1;var A=w[D];if(A!==null)for(w[D]=null,D=0;D<A.length;D++){var M=A[D];M!==null&&(M.lane&=-536870913)}l&=~U}a!==0&&st(e,a,0),u!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=u&~(c&~t))}function st(e,t,l){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-ut(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|l&261930}function Er(e,t){var l=e.entangledLanes|=t;for(e=e.entanglements;l;){var a=31-ut(l),n=1<<a;n&t|e[a]&t&&(e[a]|=t),l&=~n}}function xr(e,t){var l=t&-t;return l=(l&42)!==0?1:hc(l),(l&(e.suspendedLanes|t))!==0?0:l}function hc(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function mc(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Tr(){var e=H.p;return e!==0?e:(e=window.event,e===void 0?32:oh(e.type))}function zr(e,t){var l=H.p;try{return H.p=e,t()}finally{H.p=l}}var zl=Math.random().toString(36).slice(2),Ie="__reactFiber$"+zl,dt="__reactProps$"+zl,_a="__reactContainer$"+zl,gc="__reactEvents$"+zl,Xg="__reactListeners$"+zl,Qg="__reactHandles$"+zl,wr="__reactResources$"+zl,An="__reactMarker$"+zl;function yc(e){delete e[Ie],delete e[dt],delete e[gc],delete e[Xg],delete e[Qg]}function Da(e){var t=e[Ie];if(t)return t;for(var l=e.parentNode;l;){if(t=l[_a]||l[Ie]){if(l=t.alternate,t.child!==null||l!==null&&l.child!==null)for(e=V0(e);e!==null;){if(l=e[Ie])return l;e=V0(e)}return t}e=l,l=e.parentNode}return null}function Ca(e){if(e=e[Ie]||e[_a]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Mn(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function Oa(e){var t=e[wr];return t||(t=e[wr]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Je(e){e[An]=!0}var Ar=new Set,Mr={};function ta(e,t){Ua(e,t),Ua(e+"Capture",t)}function Ua(e,t){for(Mr[e]=t,e=0;e<t.length;e++)Ar.add(t[e])}var Zg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),_r={},Dr={};function Vg(e){return Aa.call(Dr,e)?!0:Aa.call(_r,e)?!1:Zg.test(e)?Dr[e]=!0:(_r[e]=!0,!1)}function Uu(e,t,l){if(Vg(t))if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+l)}}function Ru(e,t,l){if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+l)}}function ll(e,t,l,a){if(a===null)e.removeAttribute(l);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(l);return}e.setAttributeNS(t,l,""+a)}}function Ut(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Cr(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Kg(e,t,l){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a!="undefined"&&typeof a.get=="function"&&typeof a.set=="function"){var n=a.get,u=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(c){l=""+c,u.call(this,c)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(c){l=""+c},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function vc(e){if(!e._valueTracker){var t=Cr(e)?"checked":"value";e._valueTracker=Kg(e,t,""+e[t])}}function Or(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var l=t.getValue(),a="";return e&&(a=Cr(e)?e.checked?"true":"false":e.value),e=a,e!==l?(t.setValue(e),!0):!1}function Nu(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch(t){return e.body}}var Jg=/[\n"\\]/g;function Rt(e){return e.replace(Jg,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function bc(e,t,l,a,n,u,c,r){e.name="",c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?e.type=c:e.removeAttribute("type"),t!=null?c==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Ut(t)):e.value!==""+Ut(t)&&(e.value=""+Ut(t)):c!=="submit"&&c!=="reset"||e.removeAttribute("value"),t!=null?pc(e,c,Ut(t)):l!=null?pc(e,c,Ut(l)):a!=null&&e.removeAttribute("value"),n==null&&u!=null&&(e.defaultChecked=!!u),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+Ut(r):e.removeAttribute("name")}function Ur(e,t,l,a,n,u,c,r){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.type=u),t!=null||l!=null){if(!(u!=="submit"&&u!=="reset"||t!=null)){vc(e);return}l=l!=null?""+Ut(l):"",t=t!=null?""+Ut(t):l,r||t===e.value||(e.value=t),e.defaultValue=t}a=a!=null?a:n,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=r?e.checked:!!a,e.defaultChecked=!!a,c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(e.name=c),vc(e)}function pc(e,t,l){t==="number"&&Nu(e.ownerDocument)===e||e.defaultValue===""+l||(e.defaultValue=""+l)}function Ra(e,t,l,a){if(e=e.options,t){t={};for(var n=0;n<l.length;n++)t["$"+l[n]]=!0;for(l=0;l<e.length;l++)n=t.hasOwnProperty("$"+e[l].value),e[l].selected!==n&&(e[l].selected=n),n&&a&&(e[l].defaultSelected=!0)}else{for(l=""+Ut(l),t=null,n=0;n<e.length;n++){if(e[n].value===l){e[n].selected=!0,a&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function Rr(e,t,l){if(t!=null&&(t=""+Ut(t),t!==e.value&&(e.value=t),l==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=l!=null?""+Ut(l):""}function Nr(e,t,l,a){if(t==null){if(a!=null){if(l!=null)throw Error(o(92));if(ee(a)){if(1<a.length)throw Error(o(93));a=a[0]}l=a}l==null&&(l=""),t=l}l=Ut(t),e.defaultValue=l,a=e.textContent,a===l&&a!==""&&a!==null&&(e.value=a),vc(e)}function Na(e,t){if(t){var l=e.firstChild;if(l&&l===e.lastChild&&l.nodeType===3){l.nodeValue=t;return}}e.textContent=t}var $g=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Hr(e,t,l){var a=t.indexOf("--")===0;l==null||typeof l=="boolean"||l===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,l):typeof l!="number"||l===0||$g.has(t)?t==="float"?e.cssFloat=l:e[t]=(""+l).trim():e[t]=l+"px"}function Br(e,t,l){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,l!=null){for(var a in l)!l.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var n in t)a=t[n],t.hasOwnProperty(n)&&l[n]!==a&&Hr(e,n,a)}else for(var u in t)t.hasOwnProperty(u)&&Hr(e,u,t[u])}function Sc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wg=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Fg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Hu(e){return Fg.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function al(){}var Ec=null;function xc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ha=null,Ba=null;function kr(e){var t=Ca(e);if(t&&(e=t.stateNode)){var l=e[dt]||null;e:switch(e=t.stateNode,t.type){case"input":if(bc(e,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name),t=l.name,l.type==="radio"&&t!=null){for(l=e;l.parentNode;)l=l.parentNode;for(l=l.querySelectorAll('input[name="'+Rt(""+t)+'"][type="radio"]'),t=0;t<l.length;t++){var a=l[t];if(a!==e&&a.form===e.form){var n=a[dt]||null;if(!n)throw Error(o(90));bc(a,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<l.length;t++)a=l[t],a.form===e.form&&Or(a)}break e;case"textarea":Rr(e,l.value,l.defaultValue);break e;case"select":t=l.value,t!=null&&Ra(e,!!l.multiple,t,!1)}}}var Tc=!1;function qr(e,t,l){if(Tc)return e(t,l);Tc=!0;try{var a=e(t);return a}finally{if(Tc=!1,(Ha!==null||Ba!==null)&&(xi(),Ha&&(t=Ha,e=Ba,Ba=Ha=null,kr(t),e)))for(t=0;t<e.length;t++)kr(e[t])}}function _n(e,t){var l=e.stateNode;if(l===null)return null;var a=l[dt]||null;if(a===null)return null;l=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(l&&typeof l!="function")throw Error(o(231,t,typeof l));return l}var nl=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),zc=!1;if(nl)try{var Dn={};Object.defineProperty(Dn,"passive",{get:function(){zc=!0}}),window.addEventListener("test",Dn,Dn),window.removeEventListener("test",Dn,Dn)}catch(e){zc=!1}var wl=null,wc=null,Bu=null;function Lr(){if(Bu)return Bu;var e,t=wc,l=t.length,a,n="value"in wl?wl.value:wl.textContent,u=n.length;for(e=0;e<l&&t[e]===n[e];e++);var c=l-e;for(a=1;a<=c&&t[l-a]===n[u-a];a++);return Bu=n.slice(e,1<a?1-a:void 0)}function ku(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function qu(){return!0}function Yr(){return!1}function ht(e){function t(l,a,n,u,c){this._reactName=l,this._targetInst=n,this.type=a,this.nativeEvent=u,this.target=c,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(l=e[r],this[r]=l?l(u):u[r]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?qu:Yr,this.isPropagationStopped=Yr,this}return _(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var l=this.nativeEvent;l&&(l.preventDefault?l.preventDefault():typeof l.returnValue!="unknown"&&(l.returnValue=!1),this.isDefaultPrevented=qu)},stopPropagation:function(){var l=this.nativeEvent;l&&(l.stopPropagation?l.stopPropagation():typeof l.cancelBubble!="unknown"&&(l.cancelBubble=!0),this.isPropagationStopped=qu)},persist:function(){},isPersistent:qu}),t}var la={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Lu=ht(la),Cn=_({},la,{view:0,detail:0}),Ig=ht(Cn),Ac,Mc,On,Yu=_({},Cn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Dc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==On&&(On&&e.type==="mousemove"?(Ac=e.screenX-On.screenX,Mc=e.screenY-On.screenY):Mc=Ac=0,On=e),Ac)},movementY:function(e){return"movementY"in e?e.movementY:Mc}}),jr=ht(Yu),Pg=_({},Yu,{dataTransfer:0}),ey=ht(Pg),ty=_({},Cn,{relatedTarget:0}),_c=ht(ty),ly=_({},la,{animationName:0,elapsedTime:0,pseudoElement:0}),ay=ht(ly),ny=_({},la,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),uy=ht(ny),iy=_({},la,{data:0}),Gr=ht(iy),cy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},oy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ry(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=fy[e])?!!t[e]:!1}function Dc(){return ry}var sy=_({},Cn,{key:function(e){if(e.key){var t=cy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ku(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?oy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Dc,charCode:function(e){return e.type==="keypress"?ku(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ku(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),dy=ht(sy),hy=_({},Yu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xr=ht(hy),my=_({},Cn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Dc}),gy=ht(my),yy=_({},la,{propertyName:0,elapsedTime:0,pseudoElement:0}),vy=ht(yy),by=_({},Yu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),py=ht(by),Sy=_({},la,{newState:0,oldState:0}),Ey=ht(Sy),xy=[9,13,27,32],Cc=nl&&"CompositionEvent"in window,Un=null;nl&&"documentMode"in document&&(Un=document.documentMode);var Ty=nl&&"TextEvent"in window&&!Un,Qr=nl&&(!Cc||Un&&8<Un&&11>=Un),Zr=" ",Vr=!1;function Kr(e,t){switch(e){case"keyup":return xy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jr(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ka=!1;function zy(e,t){switch(e){case"compositionend":return Jr(t);case"keypress":return t.which!==32?null:(Vr=!0,Zr);case"textInput":return e=t.data,e===Zr&&Vr?null:e;default:return null}}function wy(e,t){if(ka)return e==="compositionend"||!Cc&&Kr(e,t)?(e=Lr(),Bu=wc=wl=null,ka=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Qr&&t.locale!=="ko"?null:t.data;default:return null}}var Ay={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $r(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ay[e.type]:t==="textarea"}function Wr(e,t,l,a){Ha?Ba?Ba.push(a):Ba=[a]:Ha=a,t=Di(t,"onChange"),0<t.length&&(l=new Lu("onChange","change",null,l,a),e.push({event:l,listeners:t}))}var Rn=null,Nn=null;function My(e){U0(e,0)}function ju(e){var t=Mn(e);if(Or(t))return e}function Fr(e,t){if(e==="change")return t}var Ir=!1;if(nl){var Oc;if(nl){var Uc="oninput"in document;if(!Uc){var Pr=document.createElement("div");Pr.setAttribute("oninput","return;"),Uc=typeof Pr.oninput=="function"}Oc=Uc}else Oc=!1;Ir=Oc&&(!document.documentMode||9<document.documentMode)}function es(){Rn&&(Rn.detachEvent("onpropertychange",ts),Nn=Rn=null)}function ts(e){if(e.propertyName==="value"&&ju(Nn)){var t=[];Wr(t,Nn,e,xc(e)),qr(My,t)}}function _y(e,t,l){e==="focusin"?(es(),Rn=t,Nn=l,Rn.attachEvent("onpropertychange",ts)):e==="focusout"&&es()}function Dy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ju(Nn)}function Cy(e,t){if(e==="click")return ju(t)}function Oy(e,t){if(e==="input"||e==="change")return ju(t)}function Uy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Et=typeof Object.is=="function"?Object.is:Uy;function Hn(e,t){if(Et(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var l=Object.keys(e),a=Object.keys(t);if(l.length!==a.length)return!1;for(a=0;a<l.length;a++){var n=l[a];if(!Aa.call(t,n)||!Et(e[n],t[n]))return!1}return!0}function ls(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function as(e,t){var l=ls(e);e=0;for(var a;l;){if(l.nodeType===3){if(a=e+l.textContent.length,e<=t&&a>=t)return{node:l,offset:t-e};e=a}e:{for(;l;){if(l.nextSibling){l=l.nextSibling;break e}l=l.parentNode}l=void 0}l=ls(l)}}function ns(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ns(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function us(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Nu(e.document);t instanceof e.HTMLIFrameElement;){try{var l=typeof t.contentWindow.location.href=="string"}catch(a){l=!1}if(l)e=t.contentWindow;else break;t=Nu(e.document)}return t}function Rc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Ry=nl&&"documentMode"in document&&11>=document.documentMode,qa=null,Nc=null,Bn=null,Hc=!1;function is(e,t,l){var a=l.window===l?l.document:l.nodeType===9?l:l.ownerDocument;Hc||qa==null||qa!==Nu(a)||(a=qa,"selectionStart"in a&&Rc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Bn&&Hn(Bn,a)||(Bn=a,a=Di(Nc,"onSelect"),0<a.length&&(t=new Lu("onSelect","select",null,t,l),e.push({event:t,listeners:a}),t.target=qa)))}function aa(e,t){var l={};return l[e.toLowerCase()]=t.toLowerCase(),l["Webkit"+e]="webkit"+t,l["Moz"+e]="moz"+t,l}var La={animationend:aa("Animation","AnimationEnd"),animationiteration:aa("Animation","AnimationIteration"),animationstart:aa("Animation","AnimationStart"),transitionrun:aa("Transition","TransitionRun"),transitionstart:aa("Transition","TransitionStart"),transitioncancel:aa("Transition","TransitionCancel"),transitionend:aa("Transition","TransitionEnd")},Bc={},cs={};nl&&(cs=document.createElement("div").style,"AnimationEvent"in window||(delete La.animationend.animation,delete La.animationiteration.animation,delete La.animationstart.animation),"TransitionEvent"in window||delete La.transitionend.transition);function na(e){if(Bc[e])return Bc[e];if(!La[e])return e;var t=La[e],l;for(l in t)if(t.hasOwnProperty(l)&&l in cs)return Bc[e]=t[l];return e}var os=na("animationend"),fs=na("animationiteration"),rs=na("animationstart"),Ny=na("transitionrun"),Hy=na("transitionstart"),By=na("transitioncancel"),ss=na("transitionend"),ds=new Map,kc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");kc.push("scrollEnd");function Zt(e,t){ds.set(e,t),ta(t,[e])}var Gu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Nt=[],Ya=0,qc=0;function Xu(){for(var e=Ya,t=qc=Ya=0;t<e;){var l=Nt[t];Nt[t++]=null;var a=Nt[t];Nt[t++]=null;var n=Nt[t];Nt[t++]=null;var u=Nt[t];if(Nt[t++]=null,a!==null&&n!==null){var c=a.pending;c===null?n.next=n:(n.next=c.next,c.next=n),a.pending=n}u!==0&&hs(l,n,u)}}function Qu(e,t,l,a){Nt[Ya++]=e,Nt[Ya++]=t,Nt[Ya++]=l,Nt[Ya++]=a,qc|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Lc(e,t,l,a){return Qu(e,t,l,a),Zu(e)}function ua(e,t){return Qu(e,null,null,t),Zu(e)}function hs(e,t,l){e.lanes|=l;var a=e.alternate;a!==null&&(a.lanes|=l);for(var n=!1,u=e.return;u!==null;)u.childLanes|=l,a=u.alternate,a!==null&&(a.childLanes|=l),u.tag===22&&(e=u.stateNode,e===null||e._visibility&1||(n=!0)),e=u,u=u.return;return e.tag===3?(u=e.stateNode,n&&t!==null&&(n=31-ut(l),e=u.hiddenUpdates,a=e[n],a===null?e[n]=[t]:a.push(t),t.lane=l|536870912),u):null}function Zu(e){if(50<nu)throw nu=0,$o=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ja={};function ky(e,t,l,a){this.tag=e,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function xt(e,t,l,a){return new ky(e,t,l,a)}function Yc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ul(e,t){var l=e.alternate;return l===null?(l=xt(e.tag,t,e.key,e.mode),l.elementType=e.elementType,l.type=e.type,l.stateNode=e.stateNode,l.alternate=e,e.alternate=l):(l.pendingProps=t,l.type=e.type,l.flags=0,l.subtreeFlags=0,l.deletions=null),l.flags=e.flags&65011712,l.childLanes=e.childLanes,l.lanes=e.lanes,l.child=e.child,l.memoizedProps=e.memoizedProps,l.memoizedState=e.memoizedState,l.updateQueue=e.updateQueue,t=e.dependencies,l.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},l.sibling=e.sibling,l.index=e.index,l.ref=e.ref,l.refCleanup=e.refCleanup,l}function ms(e,t){e.flags&=65011714;var l=e.alternate;return l===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=l.childLanes,e.lanes=l.lanes,e.child=l.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=l.memoizedProps,e.memoizedState=l.memoizedState,e.updateQueue=l.updateQueue,e.type=l.type,t=l.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vu(e,t,l,a,n,u){var c=0;if(a=e,typeof e=="function")Yc(e)&&(c=1);else if(typeof e=="string")c=Gv(e,l,X.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Ee:return e=xt(31,l,t,n),e.elementType=Ee,e.lanes=u,e;case Y:return ia(l.children,n,u,t);case k:c=8,n|=24;break;case j:return e=xt(12,l,t,n|2),e.elementType=j,e.lanes=u,e;case J:return e=xt(13,l,t,n),e.elementType=J,e.lanes=u,e;case $:return e=xt(19,l,t,n),e.elementType=$,e.lanes=u,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case q:c=10;break e;case Z:c=9;break e;case G:c=11;break e;case V:c=14;break e;case te:c=16,a=null;break e}c=29,l=Error(o(130,e===null?"null":typeof e,"")),a=null}return t=xt(c,l,t,n),t.elementType=e,t.type=a,t.lanes=u,t}function ia(e,t,l,a){return e=xt(7,e,a,t),e.lanes=l,e}function jc(e,t,l){return e=xt(6,e,null,t),e.lanes=l,e}function gs(e){var t=xt(18,null,null,0);return t.stateNode=e,t}function Gc(e,t,l){return t=xt(4,e.children!==null?e.children:[],e.key,t),t.lanes=l,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ys=new WeakMap;function Ht(e,t){if(typeof e=="object"&&e!==null){var l=ys.get(e);return l!==void 0?l:(t={value:e,source:t,stack:xn(t)},ys.set(e,t),t)}return{value:e,source:t,stack:xn(t)}}var Ga=[],Xa=0,Ku=null,kn=0,Bt=[],kt=0,Al=null,Wt=1,Ft="";function il(e,t){Ga[Xa++]=kn,Ga[Xa++]=Ku,Ku=e,kn=t}function vs(e,t,l){Bt[kt++]=Wt,Bt[kt++]=Ft,Bt[kt++]=Al,Al=e;var a=Wt;e=Ft;var n=32-ut(a)-1;a&=~(1<<n),l+=1;var u=32-ut(t)+n;if(30<u){var c=n-n%5;u=(a&(1<<c)-1).toString(32),a>>=c,n-=c,Wt=1<<32-ut(t)+n|l<<n|a,Ft=u+e}else Wt=1<<u|l<<n|a,Ft=e}function Xc(e){e.return!==null&&(il(e,1),vs(e,1,0))}function Qc(e){for(;e===Ku;)Ku=Ga[--Xa],Ga[Xa]=null,kn=Ga[--Xa],Ga[Xa]=null;for(;e===Al;)Al=Bt[--kt],Bt[kt]=null,Ft=Bt[--kt],Bt[kt]=null,Wt=Bt[--kt],Bt[kt]=null}function bs(e,t){Bt[kt++]=Wt,Bt[kt++]=Ft,Bt[kt++]=Al,Wt=t.id,Ft=t.overflow,Al=e}var Pe=null,_e=null,he=!1,Ml=null,qt=!1,Zc=Error(o(519));function _l(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw qn(Ht(t,e)),Zc}function ps(e){var t=e.stateNode,l=e.type,a=e.memoizedProps;switch(t[Ie]=e,t[dt]=a,l){case"dialog":re("cancel",t),re("close",t);break;case"iframe":case"object":case"embed":re("load",t);break;case"video":case"audio":for(l=0;l<iu.length;l++)re(iu[l],t);break;case"source":re("error",t);break;case"img":case"image":case"link":re("error",t),re("load",t);break;case"details":re("toggle",t);break;case"input":re("invalid",t),Ur(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":re("invalid",t);break;case"textarea":re("invalid",t),Nr(t,a.value,a.defaultValue,a.children)}l=a.children,typeof l!="string"&&typeof l!="number"&&typeof l!="bigint"||t.textContent===""+l||a.suppressHydrationWarning===!0||B0(t.textContent,l)?(a.popover!=null&&(re("beforetoggle",t),re("toggle",t)),a.onScroll!=null&&re("scroll",t),a.onScrollEnd!=null&&re("scrollend",t),a.onClick!=null&&(t.onclick=al),t=!0):t=!1,t||_l(e,!0)}function Ss(e){for(Pe=e.return;Pe;)switch(Pe.tag){case 5:case 31:case 13:qt=!1;return;case 27:case 3:qt=!0;return;default:Pe=Pe.return}}function Qa(e){if(e!==Pe)return!1;if(!he)return Ss(e),he=!0,!1;var t=e.tag,l;if((l=t!==3&&t!==27)&&((l=t===5)&&(l=e.type,l=!(l!=="form"&&l!=="button")||sf(e.type,e.memoizedProps)),l=!l),l&&_e&&_l(e),Ss(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));_e=Z0(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));_e=Z0(e)}else t===27?(t=_e,Gl(e.type)?(e=yf,yf=null,_e=e):_e=t):_e=Pe?Yt(e.stateNode.nextSibling):null;return!0}function ca(){_e=Pe=null,he=!1}function Vc(){var e=Ml;return e!==null&&(vt===null?vt=e:vt.push.apply(vt,e),Ml=null),e}function qn(e){Ml===null?Ml=[e]:Ml.push(e)}var Kc=y(null),oa=null,cl=null;function Dl(e,t,l){L(Kc,t._currentValue),t._currentValue=l}function ol(e){e._currentValue=Kc.current,C(Kc)}function Jc(e,t,l){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===l)break;e=e.return}}function $c(e,t,l,a){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var u=n.dependencies;if(u!==null){var c=n.child;u=u.firstContext;e:for(;u!==null;){var r=u;u=n;for(var d=0;d<t.length;d++)if(r.context===t[d]){u.lanes|=l,r=u.alternate,r!==null&&(r.lanes|=l),Jc(u.return,l,e),a||(c=null);break e}u=r.next}}else if(n.tag===18){if(c=n.return,c===null)throw Error(o(341));c.lanes|=l,u=c.alternate,u!==null&&(u.lanes|=l),Jc(c,l,e),c=null}else c=n.child;if(c!==null)c.return=n;else for(c=n;c!==null;){if(c===e){c=null;break}if(n=c.sibling,n!==null){n.return=c.return,c=n;break}c=c.return}n=c}}function Za(e,t,l,a){e=null;for(var n=t,u=!1;n!==null;){if(!u){if((n.flags&524288)!==0)u=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var c=n.alternate;if(c===null)throw Error(o(387));if(c=c.memoizedProps,c!==null){var r=n.type;Et(n.pendingProps.value,c.value)||(e!==null?e.push(r):e=[r])}}else if(n===oe.current){if(c=n.alternate,c===null)throw Error(o(387));c.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push(su):e=[su])}n=n.return}e!==null&&$c(t,e,l,a),t.flags|=262144}function Ju(e){for(e=e.firstContext;e!==null;){if(!Et(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function fa(e){oa=e,cl=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function et(e){return Es(oa,e)}function $u(e,t){return oa===null&&fa(e),Es(e,t)}function Es(e,t){var l=t._currentValue;if(t={context:t,memoizedValue:l,next:null},cl===null){if(e===null)throw Error(o(308));cl=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else cl=cl.next=t;return l}var qy=typeof AbortController!="undefined"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(l,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(l){return l()})}},Ly=i.unstable_scheduleCallback,Yy=i.unstable_NormalPriority,je={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Wc(){return{controller:new qy,data:new Map,refCount:0}}function Ln(e){e.refCount--,e.refCount===0&&Ly(Yy,function(){e.controller.abort()})}var Yn=null,Fc=0,Va=0,Ka=null;function jy(e,t){if(Yn===null){var l=Yn=[];Fc=0,Va=tf(),Ka={status:"pending",value:void 0,then:function(a){l.push(a)}}}return Fc++,t.then(xs,xs),t}function xs(){if(--Fc===0&&Yn!==null){Ka!==null&&(Ka.status="fulfilled");var e=Yn;Yn=null,Va=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Gy(e,t){var l=[],a={status:"pending",value:null,reason:null,then:function(n){l.push(n)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var n=0;n<l.length;n++)(0,l[n])(t)},function(n){for(a.status="rejected",a.reason=n,n=0;n<l.length;n++)(0,l[n])(void 0)}),a}var Ts=T.S;T.S=function(e,t){i0=nt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&jy(e,t),Ts!==null&&Ts(e,t)};var ra=y(null);function Ic(){var e=ra.current;return e!==null?e:Me.pooledCache}function Wu(e,t){t===null?L(ra,ra.current):L(ra,t.pool)}function zs(){var e=Ic();return e===null?null:{parent:je._currentValue,pool:e}}var Ja=Error(o(460)),Pc=Error(o(474)),Fu=Error(o(542)),Iu={then:function(){}};function ws(e){return e=e.status,e==="fulfilled"||e==="rejected"}function As(e,t,l){switch(l=e[l],l===void 0?e.push(t):l!==t&&(t.then(al,al),t=l),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_s(e),e;default:if(typeof t.status=="string")t.then(al,al);else{if(e=Me,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=a}},function(a){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_s(e),e}throw da=t,Ja}}function sa(e){try{var t=e._init;return t(e._payload)}catch(l){throw l!==null&&typeof l=="object"&&typeof l.then=="function"?(da=l,Ja):l}}var da=null;function Ms(){if(da===null)throw Error(o(459));var e=da;return da=null,e}function _s(e){if(e===Ja||e===Fu)throw Error(o(483))}var $a=null,jn=0;function Pu(e){var t=jn;return jn+=1,$a===null&&($a=[]),As($a,e,t)}function Gn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ei(e,t){throw t.$$typeof===R?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Ds(e){function t(E,g){if(e){var z=E.deletions;z===null?(E.deletions=[g],E.flags|=16):z.push(g)}}function l(E,g){if(!e)return null;for(;g!==null;)t(E,g),g=g.sibling;return null}function a(E){for(var g=new Map;E!==null;)E.key!==null?g.set(E.key,E):g.set(E.index,E),E=E.sibling;return g}function n(E,g){return E=ul(E,g),E.index=0,E.sibling=null,E}function u(E,g,z){return E.index=z,e?(z=E.alternate,z!==null?(z=z.index,z<g?(E.flags|=67108866,g):z):(E.flags|=67108866,g)):(E.flags|=1048576,g)}function c(E){return e&&E.alternate===null&&(E.flags|=67108866),E}function r(E,g,z,O){return g===null||g.tag!==6?(g=jc(z,E.mode,O),g.return=E,g):(g=n(g,z),g.return=E,g)}function d(E,g,z,O){var I=z.type;return I===Y?D(E,g,z.props.children,O,z.key):g!==null&&(g.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===te&&sa(I)===g.type)?(g=n(g,z.props),Gn(g,z),g.return=E,g):(g=Vu(z.type,z.key,z.props,null,E.mode,O),Gn(g,z),g.return=E,g)}function w(E,g,z,O){return g===null||g.tag!==4||g.stateNode.containerInfo!==z.containerInfo||g.stateNode.implementation!==z.implementation?(g=Gc(z,E.mode,O),g.return=E,g):(g=n(g,z.children||[]),g.return=E,g)}function D(E,g,z,O,I){return g===null||g.tag!==7?(g=ia(z,E.mode,O,I),g.return=E,g):(g=n(g,z),g.return=E,g)}function U(E,g,z){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=jc(""+g,E.mode,z),g.return=E,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case N:return z=Vu(g.type,g.key,g.props,null,E.mode,z),Gn(z,g),z.return=E,z;case B:return g=Gc(g,E.mode,z),g.return=E,g;case te:return g=sa(g),U(E,g,z)}if(ee(g)||be(g))return g=ia(g,E.mode,z,null),g.return=E,g;if(typeof g.then=="function")return U(E,Pu(g),z);if(g.$$typeof===q)return U(E,$u(E,g),z);ei(E,g)}return null}function A(E,g,z,O){var I=g!==null?g.key:null;if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return I!==null?null:r(E,g,""+z,O);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case N:return z.key===I?d(E,g,z,O):null;case B:return z.key===I?w(E,g,z,O):null;case te:return z=sa(z),A(E,g,z,O)}if(ee(z)||be(z))return I!==null?null:D(E,g,z,O,null);if(typeof z.then=="function")return A(E,g,Pu(z),O);if(z.$$typeof===q)return A(E,g,$u(E,z),O);ei(E,z)}return null}function M(E,g,z,O,I){if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return E=E.get(z)||null,r(g,E,""+O,I);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case N:return E=E.get(O.key===null?z:O.key)||null,d(g,E,O,I);case B:return E=E.get(O.key===null?z:O.key)||null,w(g,E,O,I);case te:return O=sa(O),M(E,g,z,O,I)}if(ee(O)||be(O))return E=E.get(z)||null,D(g,E,O,I,null);if(typeof O.then=="function")return M(E,g,z,Pu(O),I);if(O.$$typeof===q)return M(E,g,z,$u(g,O),I);ei(g,O)}return null}function Q(E,g,z,O){for(var I=null,ye=null,W=g,ce=g=0,de=null;W!==null&&ce<z.length;ce++){W.index>ce?(de=W,W=null):de=W.sibling;var ve=A(E,W,z[ce],O);if(ve===null){W===null&&(W=de);break}e&&W&&ve.alternate===null&&t(E,W),g=u(ve,g,ce),ye===null?I=ve:ye.sibling=ve,ye=ve,W=de}if(ce===z.length)return l(E,W),he&&il(E,ce),I;if(W===null){for(;ce<z.length;ce++)W=U(E,z[ce],O),W!==null&&(g=u(W,g,ce),ye===null?I=W:ye.sibling=W,ye=W);return he&&il(E,ce),I}for(W=a(W);ce<z.length;ce++)de=M(W,E,ce,z[ce],O),de!==null&&(e&&de.alternate!==null&&W.delete(de.key===null?ce:de.key),g=u(de,g,ce),ye===null?I=de:ye.sibling=de,ye=de);return e&&W.forEach(function(Kl){return t(E,Kl)}),he&&il(E,ce),I}function P(E,g,z,O){if(z==null)throw Error(o(151));for(var I=null,ye=null,W=g,ce=g=0,de=null,ve=z.next();W!==null&&!ve.done;ce++,ve=z.next()){W.index>ce?(de=W,W=null):de=W.sibling;var Kl=A(E,W,ve.value,O);if(Kl===null){W===null&&(W=de);break}e&&W&&Kl.alternate===null&&t(E,W),g=u(Kl,g,ce),ye===null?I=Kl:ye.sibling=Kl,ye=Kl,W=de}if(ve.done)return l(E,W),he&&il(E,ce),I;if(W===null){for(;!ve.done;ce++,ve=z.next())ve=U(E,ve.value,O),ve!==null&&(g=u(ve,g,ce),ye===null?I=ve:ye.sibling=ve,ye=ve);return he&&il(E,ce),I}for(W=a(W);!ve.done;ce++,ve=z.next())ve=M(W,E,ce,ve.value,O),ve!==null&&(e&&ve.alternate!==null&&W.delete(ve.key===null?ce:ve.key),g=u(ve,g,ce),ye===null?I=ve:ye.sibling=ve,ye=ve);return e&&W.forEach(function(Pv){return t(E,Pv)}),he&&il(E,ce),I}function Ae(E,g,z,O){if(typeof z=="object"&&z!==null&&z.type===Y&&z.key===null&&(z=z.props.children),typeof z=="object"&&z!==null){switch(z.$$typeof){case N:e:{for(var I=z.key;g!==null;){if(g.key===I){if(I=z.type,I===Y){if(g.tag===7){l(E,g.sibling),O=n(g,z.props.children),O.return=E,E=O;break e}}else if(g.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===te&&sa(I)===g.type){l(E,g.sibling),O=n(g,z.props),Gn(O,z),O.return=E,E=O;break e}l(E,g);break}else t(E,g);g=g.sibling}z.type===Y?(O=ia(z.props.children,E.mode,O,z.key),O.return=E,E=O):(O=Vu(z.type,z.key,z.props,null,E.mode,O),Gn(O,z),O.return=E,E=O)}return c(E);case B:e:{for(I=z.key;g!==null;){if(g.key===I)if(g.tag===4&&g.stateNode.containerInfo===z.containerInfo&&g.stateNode.implementation===z.implementation){l(E,g.sibling),O=n(g,z.children||[]),O.return=E,E=O;break e}else{l(E,g);break}else t(E,g);g=g.sibling}O=Gc(z,E.mode,O),O.return=E,E=O}return c(E);case te:return z=sa(z),Ae(E,g,z,O)}if(ee(z))return Q(E,g,z,O);if(be(z)){if(I=be(z),typeof I!="function")throw Error(o(150));return z=I.call(z),P(E,g,z,O)}if(typeof z.then=="function")return Ae(E,g,Pu(z),O);if(z.$$typeof===q)return Ae(E,g,$u(E,z),O);ei(E,z)}return typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint"?(z=""+z,g!==null&&g.tag===6?(l(E,g.sibling),O=n(g,z),O.return=E,E=O):(l(E,g),O=jc(z,E.mode,O),O.return=E,E=O),c(E)):l(E,g)}return function(E,g,z,O){try{jn=0;var I=Ae(E,g,z,O);return $a=null,I}catch(W){if(W===Ja||W===Fu)throw W;var ye=xt(29,W,null,E.mode);return ye.lanes=O,ye.return=E,ye}}}var ha=Ds(!0),Cs=Ds(!1),Cl=!1;function eo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function to(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ol(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ul(e,t,l){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(pe&2)!==0){var n=a.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),a.pending=t,t=Zu(e),hs(e,null,l),t}return Qu(e,a,t,l),Zu(e)}function Xn(e,t,l){if(t=t.updateQueue,t!==null&&(t=t.shared,(l&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,l|=a,t.lanes=l,Er(e,l)}}function lo(e,t){var l=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,l===a)){var n=null,u=null;if(l=l.firstBaseUpdate,l!==null){do{var c={lane:l.lane,tag:l.tag,payload:l.payload,callback:null,next:null};u===null?n=u=c:u=u.next=c,l=l.next}while(l!==null);u===null?n=u=t:u=u.next=t}else n=u=t;l={baseState:a.baseState,firstBaseUpdate:n,lastBaseUpdate:u,shared:a.shared,callbacks:a.callbacks},e.updateQueue=l;return}e=l.lastBaseUpdate,e===null?l.firstBaseUpdate=t:e.next=t,l.lastBaseUpdate=t}var ao=!1;function Qn(){if(ao){var e=Ka;if(e!==null)throw e}}function Zn(e,t,l,a){ao=!1;var n=e.updateQueue;Cl=!1;var u=n.firstBaseUpdate,c=n.lastBaseUpdate,r=n.shared.pending;if(r!==null){n.shared.pending=null;var d=r,w=d.next;d.next=null,c===null?u=w:c.next=w,c=d;var D=e.alternate;D!==null&&(D=D.updateQueue,r=D.lastBaseUpdate,r!==c&&(r===null?D.firstBaseUpdate=w:r.next=w,D.lastBaseUpdate=d))}if(u!==null){var U=n.baseState;c=0,D=w=d=null,r=u;do{var A=r.lane&-536870913,M=A!==r.lane;if(M?(se&A)===A:(a&A)===A){A!==0&&A===Va&&(ao=!0),D!==null&&(D=D.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var Q=e,P=r;A=t;var Ae=l;switch(P.tag){case 1:if(Q=P.payload,typeof Q=="function"){U=Q.call(Ae,U,A);break e}U=Q;break e;case 3:Q.flags=Q.flags&-65537|128;case 0:if(Q=P.payload,A=typeof Q=="function"?Q.call(Ae,U,A):Q,A==null)break e;U=_({},U,A);break e;case 2:Cl=!0}}A=r.callback,A!==null&&(e.flags|=64,M&&(e.flags|=8192),M=n.callbacks,M===null?n.callbacks=[A]:M.push(A))}else M={lane:A,tag:r.tag,payload:r.payload,callback:r.callback,next:null},D===null?(w=D=M,d=U):D=D.next=M,c|=A;if(r=r.next,r===null){if(r=n.shared.pending,r===null)break;M=r,r=M.next,M.next=null,n.lastBaseUpdate=M,n.shared.pending=null}}while(!0);D===null&&(d=U),n.baseState=d,n.firstBaseUpdate=w,n.lastBaseUpdate=D,u===null&&(n.shared.lanes=0),kl|=c,e.lanes=c,e.memoizedState=U}}function Os(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function Us(e,t){var l=e.callbacks;if(l!==null)for(e.callbacks=null,e=0;e<l.length;e++)Os(l[e],t)}var Wa=y(null),ti=y(0);function Rs(e,t){e=vl,L(ti,e),L(Wa,t),vl=e|t.baseLanes}function no(){L(ti,vl),L(Wa,Wa.current)}function uo(){vl=ti.current,C(Wa),C(ti)}var Tt=y(null),Lt=null;function Rl(e){var t=e.alternate;L(qe,qe.current&1),L(Tt,e),Lt===null&&(t===null||Wa.current!==null||t.memoizedState!==null)&&(Lt=e)}function io(e){L(qe,qe.current),L(Tt,e),Lt===null&&(Lt=e)}function Ns(e){e.tag===22?(L(qe,qe.current),L(Tt,e),Lt===null&&(Lt=e)):Nl()}function Nl(){L(qe,qe.current),L(Tt,Tt.current)}function zt(e){C(Tt),Lt===e&&(Lt=null),C(qe)}var qe=y(0);function li(e){for(var t=e;t!==null;){if(t.tag===13){var l=t.memoizedState;if(l!==null&&(l=l.dehydrated,l===null||mf(l)||gf(l)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var fl=0,ie=null,ze=null,Ge=null,ai=!1,Fa=!1,ma=!1,ni=0,Vn=0,Ia=null,Xy=0;function Ue(){throw Error(o(321))}function co(e,t){if(t===null)return!1;for(var l=0;l<t.length&&l<e.length;l++)if(!Et(e[l],t[l]))return!1;return!0}function oo(e,t,l,a,n,u){return fl=u,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=e===null||e.memoizedState===null?vd:zo,ma=!1,u=l(a,n),ma=!1,Fa&&(u=Bs(t,l,a,n)),Hs(e),u}function Hs(e){T.H=$n;var t=ze!==null&&ze.next!==null;if(fl=0,Ge=ze=ie=null,ai=!1,Vn=0,Ia=null,t)throw Error(o(300));e===null||Xe||(e=e.dependencies,e!==null&&Ju(e)&&(Xe=!0))}function Bs(e,t,l,a){ie=e;var n=0;do{if(Fa&&(Ia=null),Vn=0,Fa=!1,25<=n)throw Error(o(301));if(n+=1,Ge=ze=null,e.updateQueue!=null){var u=e.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}T.H=bd,u=t(l,a)}while(Fa);return u}function Qy(){var e=T.H,t=e.useState()[0];return t=typeof t.then=="function"?Kn(t):t,e=e.useState()[0],(ze!==null?ze.memoizedState:null)!==e&&(ie.flags|=1024),t}function fo(){var e=ni!==0;return ni=0,e}function ro(e,t,l){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l}function so(e){if(ai){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ai=!1}fl=0,Ge=ze=ie=null,Fa=!1,Vn=ni=0,Ia=null}function ft(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ge===null?ie.memoizedState=Ge=e:Ge=Ge.next=e,Ge}function Le(){if(ze===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var t=Ge===null?ie.memoizedState:Ge.next;if(t!==null)Ge=t,ze=e;else{if(e===null)throw ie.alternate===null?Error(o(467)):Error(o(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},Ge===null?ie.memoizedState=Ge=e:Ge=Ge.next=e}return Ge}function ui(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Kn(e){var t=Vn;return Vn+=1,Ia===null&&(Ia=[]),e=As(Ia,e,t),t=ie,(Ge===null?t.memoizedState:Ge.next)===null&&(t=t.alternate,T.H=t===null||t.memoizedState===null?vd:zo),e}function ii(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Kn(e);if(e.$$typeof===q)return et(e)}throw Error(o(438,String(e)))}function ho(e){var t=null,l=ie.updateQueue;if(l!==null&&(t=l.memoCache),t==null){var a=ie.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),l===null&&(l=ui(),ie.updateQueue=l),l.memoCache=t,l=t.data[t.index],l===void 0)for(l=t.data[t.index]=Array(e),a=0;a<e;a++)l[a]=Ye;return t.index++,l}function rl(e,t){return typeof t=="function"?t(e):t}function ci(e){var t=Le();return mo(t,ze,e)}function mo(e,t,l){var a=e.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=l;var n=e.baseQueue,u=a.pending;if(u!==null){if(n!==null){var c=n.next;n.next=u.next,u.next=c}t.baseQueue=n=u,a.pending=null}if(u=e.baseState,n===null)e.memoizedState=u;else{t=n.next;var r=c=null,d=null,w=t,D=!1;do{var U=w.lane&-536870913;if(U!==w.lane?(se&U)===U:(fl&U)===U){var A=w.revertLane;if(A===0)d!==null&&(d=d.next={lane:0,revertLane:0,gesture:null,action:w.action,hasEagerState:w.hasEagerState,eagerState:w.eagerState,next:null}),U===Va&&(D=!0);else if((fl&A)===A){w=w.next,A===Va&&(D=!0);continue}else U={lane:0,revertLane:w.revertLane,gesture:null,action:w.action,hasEagerState:w.hasEagerState,eagerState:w.eagerState,next:null},d===null?(r=d=U,c=u):d=d.next=U,ie.lanes|=A,kl|=A;U=w.action,ma&&l(u,U),u=w.hasEagerState?w.eagerState:l(u,U)}else A={lane:U,revertLane:w.revertLane,gesture:w.gesture,action:w.action,hasEagerState:w.hasEagerState,eagerState:w.eagerState,next:null},d===null?(r=d=A,c=u):d=d.next=A,ie.lanes|=U,kl|=U;w=w.next}while(w!==null&&w!==t);if(d===null?c=u:d.next=r,!Et(u,e.memoizedState)&&(Xe=!0,D&&(l=Ka,l!==null)))throw l;e.memoizedState=u,e.baseState=c,e.baseQueue=d,a.lastRenderedState=u}return n===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function go(e){var t=Le(),l=t.queue;if(l===null)throw Error(o(311));l.lastRenderedReducer=e;var a=l.dispatch,n=l.pending,u=t.memoizedState;if(n!==null){l.pending=null;var c=n=n.next;do u=e(u,c.action),c=c.next;while(c!==n);Et(u,t.memoizedState)||(Xe=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),l.lastRenderedState=u}return[u,a]}function ks(e,t,l){var a=ie,n=Le(),u=he;if(u){if(l===void 0)throw Error(o(407));l=l()}else l=t();var c=!Et((ze||n).memoizedState,l);if(c&&(n.memoizedState=l,Xe=!0),n=n.queue,bo(Ys.bind(null,a,n,e),[e]),n.getSnapshot!==t||c||Ge!==null&&Ge.memoizedState.tag&1){if(a.flags|=2048,Pa(9,{destroy:void 0},Ls.bind(null,a,n,l,t),null),Me===null)throw Error(o(349));u||(fl&127)!==0||qs(a,t,l)}return l}function qs(e,t,l){e.flags|=16384,e={getSnapshot:t,value:l},t=ie.updateQueue,t===null?(t=ui(),ie.updateQueue=t,t.stores=[e]):(l=t.stores,l===null?t.stores=[e]:l.push(e))}function Ls(e,t,l,a){t.value=l,t.getSnapshot=a,js(t)&&Gs(e)}function Ys(e,t,l){return l(function(){js(t)&&Gs(e)})}function js(e){var t=e.getSnapshot;e=e.value;try{var l=t();return!Et(e,l)}catch(a){return!0}}function Gs(e){var t=ua(e,2);t!==null&&bt(t,e,2)}function yo(e){var t=ft();if(typeof e=="function"){var l=e;if(e=l(),ma){Xt(!0);try{l()}finally{Xt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rl,lastRenderedState:e},t}function Xs(e,t,l,a){return e.baseState=l,mo(e,ze,typeof a=="function"?a:rl)}function Zy(e,t,l,a,n){if(ri(e))throw Error(o(485));if(e=t.action,e!==null){var u={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(c){u.listeners.push(c)}};T.T!==null?l(!0):u.isTransition=!1,a(u),l=t.pending,l===null?(u.next=t.pending=u,Qs(t,u)):(u.next=l.next,t.pending=l.next=u)}}function Qs(e,t){var l=t.action,a=t.payload,n=e.state;if(t.isTransition){var u=T.T,c={};T.T=c;try{var r=l(n,a),d=T.S;d!==null&&d(c,r),Zs(e,t,r)}catch(w){vo(e,t,w)}finally{u!==null&&c.types!==null&&(u.types=c.types),T.T=u}}else try{u=l(n,a),Zs(e,t,u)}catch(w){vo(e,t,w)}}function Zs(e,t,l){l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(function(a){Vs(e,t,a)},function(a){return vo(e,t,a)}):Vs(e,t,l)}function Vs(e,t,l){t.status="fulfilled",t.value=l,Ks(t),e.state=l,t=e.pending,t!==null&&(l=t.next,l===t?e.pending=null:(l=l.next,t.next=l,Qs(e,l)))}function vo(e,t,l){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=l,Ks(t),t=t.next;while(t!==a)}e.action=null}function Ks(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Js(e,t){return t}function $s(e,t){if(he){var l=Me.formState;if(l!==null){e:{var a=ie;if(he){if(_e){t:{for(var n=_e,u=qt;n.nodeType!==8;){if(!u){n=null;break t}if(n=Yt(n.nextSibling),n===null){n=null;break t}}u=n.data,n=u==="F!"||u==="F"?n:null}if(n){_e=Yt(n.nextSibling),a=n.data==="F!";break e}}_l(a)}a=!1}a&&(t=l[0])}}return l=ft(),l.memoizedState=l.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Js,lastRenderedState:t},l.queue=a,l=md.bind(null,ie,a),a.dispatch=l,a=yo(!1),u=To.bind(null,ie,!1,a.queue),a=ft(),n={state:t,dispatch:null,action:e,pending:null},a.queue=n,l=Zy.bind(null,ie,n,u,l),n.dispatch=l,a.memoizedState=e,[t,l,!1]}function Ws(e){var t=Le();return Fs(t,ze,e)}function Fs(e,t,l){if(t=mo(e,t,Js)[0],e=ci(rl)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Kn(t)}catch(c){throw c===Ja?Fu:c}else a=t;t=Le();var n=t.queue,u=n.dispatch;return l!==t.memoizedState&&(ie.flags|=2048,Pa(9,{destroy:void 0},Vy.bind(null,n,l),null)),[a,u,e]}function Vy(e,t){e.action=t}function Is(e){var t=Le(),l=ze;if(l!==null)return Fs(t,l,e);Le(),t=t.memoizedState,l=Le();var a=l.queue.dispatch;return l.memoizedState=e,[t,a,!1]}function Pa(e,t,l,a){return e={tag:e,create:l,deps:a,inst:t,next:null},t=ie.updateQueue,t===null&&(t=ui(),ie.updateQueue=t),l=t.lastEffect,l===null?t.lastEffect=e.next=e:(a=l.next,l.next=e,e.next=a,t.lastEffect=e),e}function Ps(){return Le().memoizedState}function oi(e,t,l,a){var n=ft();ie.flags|=e,n.memoizedState=Pa(1|t,{destroy:void 0},l,a===void 0?null:a)}function fi(e,t,l,a){var n=Le();a=a===void 0?null:a;var u=n.memoizedState.inst;ze!==null&&a!==null&&co(a,ze.memoizedState.deps)?n.memoizedState=Pa(t,u,l,a):(ie.flags|=e,n.memoizedState=Pa(1|t,u,l,a))}function ed(e,t){oi(8390656,8,e,t)}function bo(e,t){fi(2048,8,e,t)}function Ky(e){ie.flags|=4;var t=ie.updateQueue;if(t===null)t=ui(),ie.updateQueue=t,t.events=[e];else{var l=t.events;l===null?t.events=[e]:l.push(e)}}function td(e){var t=Le().memoizedState;return Ky({ref:t,nextImpl:e}),function(){if((pe&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function ld(e,t){return fi(4,2,e,t)}function ad(e,t){return fi(4,4,e,t)}function nd(e,t){if(typeof t=="function"){e=e();var l=t(e);return function(){typeof l=="function"?l():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ud(e,t,l){l=l!=null?l.concat([e]):null,fi(4,4,nd.bind(null,t,e),l)}function po(){}function id(e,t){var l=Le();t=t===void 0?null:t;var a=l.memoizedState;return t!==null&&co(t,a[1])?a[0]:(l.memoizedState=[e,t],e)}function cd(e,t){var l=Le();t=t===void 0?null:t;var a=l.memoizedState;if(t!==null&&co(t,a[1]))return a[0];if(a=e(),ma){Xt(!0);try{e()}finally{Xt(!1)}}return l.memoizedState=[a,t],a}function So(e,t,l){return l===void 0||(fl&1073741824)!==0&&(se&261930)===0?e.memoizedState=t:(e.memoizedState=l,e=o0(),ie.lanes|=e,kl|=e,l)}function od(e,t,l,a){return Et(l,t)?l:Wa.current!==null?(e=So(e,l,a),Et(e,t)||(Xe=!0),e):(fl&42)===0||(fl&1073741824)!==0&&(se&261930)===0?(Xe=!0,e.memoizedState=l):(e=o0(),ie.lanes|=e,kl|=e,t)}function fd(e,t,l,a,n){var u=H.p;H.p=u!==0&&8>u?u:8;var c=T.T,r={};T.T=r,To(e,!1,t,l);try{var d=n(),w=T.S;if(w!==null&&w(r,d),d!==null&&typeof d=="object"&&typeof d.then=="function"){var D=Gy(d,a);Jn(e,t,D,Mt(e))}else Jn(e,t,a,Mt(e))}catch(U){Jn(e,t,{then:function(){},status:"rejected",reason:U},Mt())}finally{H.p=u,c!==null&&r.types!==null&&(c.types=r.types),T.T=c}}function Jy(){}function Eo(e,t,l,a){if(e.tag!==5)throw Error(o(476));var n=rd(e).queue;fd(e,n,t,F,l===null?Jy:function(){return sd(e),l(a)})}function rd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:F,baseState:F,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:rl,lastRenderedState:F},next:null};var l={};return t.next={memoizedState:l,baseState:l,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:rl,lastRenderedState:l},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function sd(e){var t=rd(e);t.next===null&&(t=e.alternate.memoizedState),Jn(e,t.next.queue,{},Mt())}function xo(){return et(su)}function dd(){return Le().memoizedState}function hd(){return Le().memoizedState}function $y(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var l=Mt();e=Ol(l);var a=Ul(t,e,l);a!==null&&(bt(a,t,l),Xn(a,t,l)),t={cache:Wc()},e.payload=t;return}t=t.return}}function Wy(e,t,l){var a=Mt();l={lane:a,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},ri(e)?gd(t,l):(l=Lc(e,t,l,a),l!==null&&(bt(l,e,a),yd(l,t,a)))}function md(e,t,l){var a=Mt();Jn(e,t,l,a)}function Jn(e,t,l,a){var n={lane:a,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null};if(ri(e))gd(t,n);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var c=t.lastRenderedState,r=u(c,l);if(n.hasEagerState=!0,n.eagerState=r,Et(r,c))return Qu(e,t,n,0),Me===null&&Xu(),!1}catch(d){}if(l=Lc(e,t,n,a),l!==null)return bt(l,e,a),yd(l,t,a),!0}return!1}function To(e,t,l,a){if(a={lane:2,revertLane:tf(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ri(e)){if(t)throw Error(o(479))}else t=Lc(e,l,a,2),t!==null&&bt(t,e,2)}function ri(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function gd(e,t){Fa=ai=!0;var l=e.pending;l===null?t.next=t:(t.next=l.next,l.next=t),e.pending=t}function yd(e,t,l){if((l&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,l|=a,t.lanes=l,Er(e,l)}}var $n={readContext:et,use:ii,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useLayoutEffect:Ue,useInsertionEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useSyncExternalStore:Ue,useId:Ue,useHostTransitionStatus:Ue,useFormState:Ue,useActionState:Ue,useOptimistic:Ue,useMemoCache:Ue,useCacheRefresh:Ue};$n.useEffectEvent=Ue;var vd={readContext:et,use:ii,useCallback:function(e,t){return ft().memoizedState=[e,t===void 0?null:t],e},useContext:et,useEffect:ed,useImperativeHandle:function(e,t,l){l=l!=null?l.concat([e]):null,oi(4194308,4,nd.bind(null,t,e),l)},useLayoutEffect:function(e,t){return oi(4194308,4,e,t)},useInsertionEffect:function(e,t){oi(4,2,e,t)},useMemo:function(e,t){var l=ft();t=t===void 0?null:t;var a=e();if(ma){Xt(!0);try{e()}finally{Xt(!1)}}return l.memoizedState=[a,t],a},useReducer:function(e,t,l){var a=ft();if(l!==void 0){var n=l(t);if(ma){Xt(!0);try{l(t)}finally{Xt(!1)}}}else n=t;return a.memoizedState=a.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},a.queue=e,e=e.dispatch=Wy.bind(null,ie,e),[a.memoizedState,e]},useRef:function(e){var t=ft();return e={current:e},t.memoizedState=e},useState:function(e){e=yo(e);var t=e.queue,l=md.bind(null,ie,t);return t.dispatch=l,[e.memoizedState,l]},useDebugValue:po,useDeferredValue:function(e,t){var l=ft();return So(l,e,t)},useTransition:function(){var e=yo(!1);return e=fd.bind(null,ie,e.queue,!0,!1),ft().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,l){var a=ie,n=ft();if(he){if(l===void 0)throw Error(o(407));l=l()}else{if(l=t(),Me===null)throw Error(o(349));(se&127)!==0||qs(a,t,l)}n.memoizedState=l;var u={value:l,getSnapshot:t};return n.queue=u,ed(Ys.bind(null,a,u,e),[e]),a.flags|=2048,Pa(9,{destroy:void 0},Ls.bind(null,a,u,l,t),null),l},useId:function(){var e=ft(),t=Me.identifierPrefix;if(he){var l=Ft,a=Wt;l=(a&~(1<<32-ut(a)-1)).toString(32)+l,t="_"+t+"R_"+l,l=ni++,0<l&&(t+="H"+l.toString(32)),t+="_"}else l=Xy++,t="_"+t+"r_"+l.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:xo,useFormState:$s,useActionState:$s,useOptimistic:function(e){var t=ft();t.memoizedState=t.baseState=e;var l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=l,t=To.bind(null,ie,!0,l),l.dispatch=t,[e,t]},useMemoCache:ho,useCacheRefresh:function(){return ft().memoizedState=$y.bind(null,ie)},useEffectEvent:function(e){var t=ft(),l={impl:e};return t.memoizedState=l,function(){if((pe&2)!==0)throw Error(o(440));return l.impl.apply(void 0,arguments)}}},zo={readContext:et,use:ii,useCallback:id,useContext:et,useEffect:bo,useImperativeHandle:ud,useInsertionEffect:ld,useLayoutEffect:ad,useMemo:cd,useReducer:ci,useRef:Ps,useState:function(){return ci(rl)},useDebugValue:po,useDeferredValue:function(e,t){var l=Le();return od(l,ze.memoizedState,e,t)},useTransition:function(){var e=ci(rl)[0],t=Le().memoizedState;return[typeof e=="boolean"?e:Kn(e),t]},useSyncExternalStore:ks,useId:dd,useHostTransitionStatus:xo,useFormState:Ws,useActionState:Ws,useOptimistic:function(e,t){var l=Le();return Xs(l,ze,e,t)},useMemoCache:ho,useCacheRefresh:hd};zo.useEffectEvent=td;var bd={readContext:et,use:ii,useCallback:id,useContext:et,useEffect:bo,useImperativeHandle:ud,useInsertionEffect:ld,useLayoutEffect:ad,useMemo:cd,useReducer:go,useRef:Ps,useState:function(){return go(rl)},useDebugValue:po,useDeferredValue:function(e,t){var l=Le();return ze===null?So(l,e,t):od(l,ze.memoizedState,e,t)},useTransition:function(){var e=go(rl)[0],t=Le().memoizedState;return[typeof e=="boolean"?e:Kn(e),t]},useSyncExternalStore:ks,useId:dd,useHostTransitionStatus:xo,useFormState:Is,useActionState:Is,useOptimistic:function(e,t){var l=Le();return ze!==null?Xs(l,ze,e,t):(l.baseState=e,[e,l.queue.dispatch])},useMemoCache:ho,useCacheRefresh:hd};bd.useEffectEvent=td;function wo(e,t,l,a){t=e.memoizedState,l=l(a,t),l=l==null?t:_({},t,l),e.memoizedState=l,e.lanes===0&&(e.updateQueue.baseState=l)}var Ao={enqueueSetState:function(e,t,l){e=e._reactInternals;var a=Mt(),n=Ol(a);n.payload=t,l!=null&&(n.callback=l),t=Ul(e,n,a),t!==null&&(bt(t,e,a),Xn(t,e,a))},enqueueReplaceState:function(e,t,l){e=e._reactInternals;var a=Mt(),n=Ol(a);n.tag=1,n.payload=t,l!=null&&(n.callback=l),t=Ul(e,n,a),t!==null&&(bt(t,e,a),Xn(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var l=Mt(),a=Ol(l);a.tag=2,t!=null&&(a.callback=t),t=Ul(e,a,l),t!==null&&(bt(t,e,l),Xn(t,e,l))}};function pd(e,t,l,a,n,u,c){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,u,c):t.prototype&&t.prototype.isPureReactComponent?!Hn(l,a)||!Hn(n,u):!0}function Sd(e,t,l,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(l,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(l,a),t.state!==e&&Ao.enqueueReplaceState(t,t.state,null)}function ga(e,t){var l=t;if("ref"in t){l={};for(var a in t)a!=="ref"&&(l[a]=t[a])}if(e=e.defaultProps){l===t&&(l=_({},l));for(var n in e)l[n]===void 0&&(l[n]=e[n])}return l}function Ed(e){Gu(e)}function xd(e){console.error(e)}function Td(e){Gu(e)}function si(e,t){try{var l=e.onUncaughtError;l(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function zd(e,t,l){try{var a=e.onCaughtError;a(l.value,{componentStack:l.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Mo(e,t,l){return l=Ol(l),l.tag=3,l.payload={element:null},l.callback=function(){si(e,t)},l}function wd(e){return e=Ol(e),e.tag=3,e}function Ad(e,t,l,a){var n=l.type.getDerivedStateFromError;if(typeof n=="function"){var u=a.value;e.payload=function(){return n(u)},e.callback=function(){zd(t,l,a)}}var c=l.stateNode;c!==null&&typeof c.componentDidCatch=="function"&&(e.callback=function(){zd(t,l,a),typeof n!="function"&&(ql===null?ql=new Set([this]):ql.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function Fy(e,t,l,a,n){if(l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=l.alternate,t!==null&&Za(t,l,n,!0),l=Tt.current,l!==null){switch(l.tag){case 31:case 13:return Lt===null?Ti():l.alternate===null&&Re===0&&(Re=3),l.flags&=-257,l.flags|=65536,l.lanes=n,a===Iu?l.flags|=16384:(t=l.updateQueue,t===null?l.updateQueue=new Set([a]):t.add(a),Io(e,a,n)),!1;case 22:return l.flags|=65536,a===Iu?l.flags|=16384:(t=l.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},l.updateQueue=t):(l=t.retryQueue,l===null?t.retryQueue=new Set([a]):l.add(a)),Io(e,a,n)),!1}throw Error(o(435,l.tag))}return Io(e,a,n),Ti(),!1}if(he)return t=Tt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,a!==Zc&&(e=Error(o(422),{cause:a}),qn(Ht(e,l)))):(a!==Zc&&(t=Error(o(423),{cause:a}),qn(Ht(t,l))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,a=Ht(a,l),n=Mo(e.stateNode,a,n),lo(e,n),Re!==4&&(Re=2)),!1;var u=Error(o(520),{cause:a});if(u=Ht(u,l),au===null?au=[u]:au.push(u),Re!==4&&(Re=2),t===null)return!0;a=Ht(a,l),l=t;do{switch(l.tag){case 3:return l.flags|=65536,e=n&-n,l.lanes|=e,e=Mo(l.stateNode,a,e),lo(l,e),!1;case 1:if(t=l.type,u=l.stateNode,(l.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(ql===null||!ql.has(u))))return l.flags|=65536,n&=-n,l.lanes|=n,n=wd(n),Ad(n,e,l,a),lo(l,n),!1}l=l.return}while(l!==null);return!1}var _o=Error(o(461)),Xe=!1;function tt(e,t,l,a){t.child=e===null?Cs(t,null,l,a):ha(t,e.child,l,a)}function Md(e,t,l,a,n){l=l.render;var u=t.ref;if("ref"in a){var c={};for(var r in a)r!=="ref"&&(c[r]=a[r])}else c=a;return fa(t),a=oo(e,t,l,c,u,n),r=fo(),e!==null&&!Xe?(ro(e,t,n),sl(e,t,n)):(he&&r&&Xc(t),t.flags|=1,tt(e,t,a,n),t.child)}function _d(e,t,l,a,n){if(e===null){var u=l.type;return typeof u=="function"&&!Yc(u)&&u.defaultProps===void 0&&l.compare===null?(t.tag=15,t.type=u,Dd(e,t,u,a,n)):(e=Vu(l.type,null,a,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(u=e.child,!Bo(e,n)){var c=u.memoizedProps;if(l=l.compare,l=l!==null?l:Hn,l(c,a)&&e.ref===t.ref)return sl(e,t,n)}return t.flags|=1,e=ul(u,a),e.ref=t.ref,e.return=t,t.child=e}function Dd(e,t,l,a,n){if(e!==null){var u=e.memoizedProps;if(Hn(u,a)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=a=u,Bo(e,n))(e.flags&131072)!==0&&(Xe=!0);else return t.lanes=e.lanes,sl(e,t,n)}return Do(e,t,l,a,n)}function Cd(e,t,l,a){var n=a.children,u=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(u=u!==null?u.baseLanes|l:l,e!==null){for(a=t.child=e.child,n=0;a!==null;)n=n|a.lanes|a.childLanes,a=a.sibling;a=n&~u}else a=0,t.child=null;return Od(e,t,u,l,a)}if((l&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Wu(t,u!==null?u.cachePool:null),u!==null?Rs(t,u):no(),Ns(t);else return a=t.lanes=536870912,Od(e,t,u!==null?u.baseLanes|l:l,l,a)}else u!==null?(Wu(t,u.cachePool),Rs(t,u),Nl(),t.memoizedState=null):(e!==null&&Wu(t,null),no(),Nl());return tt(e,t,n,l),t.child}function Wn(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Od(e,t,l,a,n){var u=Ic();return u=u===null?null:{parent:je._currentValue,pool:u},t.memoizedState={baseLanes:l,cachePool:u},e!==null&&Wu(t,null),no(),Ns(t),e!==null&&Za(e,t,a,!0),t.childLanes=n,null}function di(e,t){return t=mi({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Ud(e,t,l){return ha(t,e.child,null,l),e=di(t,t.pendingProps),e.flags|=2,zt(t),t.memoizedState=null,e}function Iy(e,t,l){var a=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(he){if(a.mode==="hidden")return e=di(t,a),t.lanes=536870912,Wn(null,e);if(io(t),(e=_e)?(e=Q0(e,qt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Al!==null?{id:Wt,overflow:Ft}:null,retryLane:536870912,hydrationErrors:null},l=gs(e),l.return=t,t.child=l,Pe=t,_e=null)):e=null,e===null)throw _l(t);return t.lanes=536870912,null}return di(t,a)}var u=e.memoizedState;if(u!==null){var c=u.dehydrated;if(io(t),n)if(t.flags&256)t.flags&=-257,t=Ud(e,t,l);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(Xe||Za(e,t,l,!1),n=(l&e.childLanes)!==0,Xe||n){if(a=Me,a!==null&&(c=xr(a,l),c!==0&&c!==u.retryLane))throw u.retryLane=c,ua(e,c),bt(a,e,c),_o;Ti(),t=Ud(e,t,l)}else e=u.treeContext,_e=Yt(c.nextSibling),Pe=t,he=!0,Ml=null,qt=!1,e!==null&&bs(t,e),t=di(t,a),t.flags|=4096;return t}return e=ul(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function hi(e,t){var l=t.ref;if(l===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof l!="function"&&typeof l!="object")throw Error(o(284));(e===null||e.ref!==l)&&(t.flags|=4194816)}}function Do(e,t,l,a,n){return fa(t),l=oo(e,t,l,a,void 0,n),a=fo(),e!==null&&!Xe?(ro(e,t,n),sl(e,t,n)):(he&&a&&Xc(t),t.flags|=1,tt(e,t,l,n),t.child)}function Rd(e,t,l,a,n,u){return fa(t),t.updateQueue=null,l=Bs(t,a,l,n),Hs(e),a=fo(),e!==null&&!Xe?(ro(e,t,u),sl(e,t,u)):(he&&a&&Xc(t),t.flags|=1,tt(e,t,l,u),t.child)}function Nd(e,t,l,a,n){if(fa(t),t.stateNode===null){var u=ja,c=l.contextType;typeof c=="object"&&c!==null&&(u=et(c)),u=new l(a,u),t.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=Ao,t.stateNode=u,u._reactInternals=t,u=t.stateNode,u.props=a,u.state=t.memoizedState,u.refs={},eo(t),c=l.contextType,u.context=typeof c=="object"&&c!==null?et(c):ja,u.state=t.memoizedState,c=l.getDerivedStateFromProps,typeof c=="function"&&(wo(t,l,c,a),u.state=t.memoizedState),typeof l.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(c=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),c!==u.state&&Ao.enqueueReplaceState(u,u.state,null),Zn(t,a,u,n),Qn(),u.state=t.memoizedState),typeof u.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){u=t.stateNode;var r=t.memoizedProps,d=ga(l,r);u.props=d;var w=u.context,D=l.contextType;c=ja,typeof D=="object"&&D!==null&&(c=et(D));var U=l.getDerivedStateFromProps;D=typeof U=="function"||typeof u.getSnapshotBeforeUpdate=="function",r=t.pendingProps!==r,D||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(r||w!==c)&&Sd(t,u,a,c),Cl=!1;var A=t.memoizedState;u.state=A,Zn(t,a,u,n),Qn(),w=t.memoizedState,r||A!==w||Cl?(typeof U=="function"&&(wo(t,l,U,a),w=t.memoizedState),(d=Cl||pd(t,l,d,a,A,w,c))?(D||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=w),u.props=a,u.state=w,u.context=c,a=d):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{u=t.stateNode,to(e,t),c=t.memoizedProps,D=ga(l,c),u.props=D,U=t.pendingProps,A=u.context,w=l.contextType,d=ja,typeof w=="object"&&w!==null&&(d=et(w)),r=l.getDerivedStateFromProps,(w=typeof r=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==U||A!==d)&&Sd(t,u,a,d),Cl=!1,A=t.memoizedState,u.state=A,Zn(t,a,u,n),Qn();var M=t.memoizedState;c!==U||A!==M||Cl||e!==null&&e.dependencies!==null&&Ju(e.dependencies)?(typeof r=="function"&&(wo(t,l,r,a),M=t.memoizedState),(D=Cl||pd(t,l,D,a,A,M,d)||e!==null&&e.dependencies!==null&&Ju(e.dependencies))?(w||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(a,M,d),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(a,M,d)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=M),u.props=a,u.state=M,u.context=d,a=D):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=1024),a=!1)}return u=a,hi(e,t),a=(t.flags&128)!==0,u||a?(u=t.stateNode,l=a&&typeof l.getDerivedStateFromError!="function"?null:u.render(),t.flags|=1,e!==null&&a?(t.child=ha(t,e.child,null,n),t.child=ha(t,null,l,n)):tt(e,t,l,n),t.memoizedState=u.state,e=t.child):e=sl(e,t,n),e}function Hd(e,t,l,a){return ca(),t.flags|=256,tt(e,t,l,a),t.child}var Co={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Oo(e){return{baseLanes:e,cachePool:zs()}}function Uo(e,t,l){return e=e!==null?e.childLanes&~l:0,t&&(e|=At),e}function Bd(e,t,l){var a=t.pendingProps,n=!1,u=(t.flags&128)!==0,c;if((c=u)||(c=e!==null&&e.memoizedState===null?!1:(qe.current&2)!==0),c&&(n=!0,t.flags&=-129),c=(t.flags&32)!==0,t.flags&=-33,e===null){if(he){if(n?Rl(t):Nl(),(e=_e)?(e=Q0(e,qt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Al!==null?{id:Wt,overflow:Ft}:null,retryLane:536870912,hydrationErrors:null},l=gs(e),l.return=t,t.child=l,Pe=t,_e=null)):e=null,e===null)throw _l(t);return gf(e)?t.lanes=32:t.lanes=536870912,null}var r=a.children;return a=a.fallback,n?(Nl(),n=t.mode,r=mi({mode:"hidden",children:r},n),a=ia(a,n,l,null),r.return=t,a.return=t,r.sibling=a,t.child=r,a=t.child,a.memoizedState=Oo(l),a.childLanes=Uo(e,c,l),t.memoizedState=Co,Wn(null,a)):(Rl(t),Ro(t,r))}var d=e.memoizedState;if(d!==null&&(r=d.dehydrated,r!==null)){if(u)t.flags&256?(Rl(t),t.flags&=-257,t=No(e,t,l)):t.memoizedState!==null?(Nl(),t.child=e.child,t.flags|=128,t=null):(Nl(),r=a.fallback,n=t.mode,a=mi({mode:"visible",children:a.children},n),r=ia(r,n,l,null),r.flags|=2,a.return=t,r.return=t,a.sibling=r,t.child=a,ha(t,e.child,null,l),a=t.child,a.memoizedState=Oo(l),a.childLanes=Uo(e,c,l),t.memoizedState=Co,t=Wn(null,a));else if(Rl(t),gf(r)){if(c=r.nextSibling&&r.nextSibling.dataset,c)var w=c.dgst;c=w,a=Error(o(419)),a.stack="",a.digest=c,qn({value:a,source:null,stack:null}),t=No(e,t,l)}else if(Xe||Za(e,t,l,!1),c=(l&e.childLanes)!==0,Xe||c){if(c=Me,c!==null&&(a=xr(c,l),a!==0&&a!==d.retryLane))throw d.retryLane=a,ua(e,a),bt(c,e,a),_o;mf(r)||Ti(),t=No(e,t,l)}else mf(r)?(t.flags|=192,t.child=e.child,t=null):(e=d.treeContext,_e=Yt(r.nextSibling),Pe=t,he=!0,Ml=null,qt=!1,e!==null&&bs(t,e),t=Ro(t,a.children),t.flags|=4096);return t}return n?(Nl(),r=a.fallback,n=t.mode,d=e.child,w=d.sibling,a=ul(d,{mode:"hidden",children:a.children}),a.subtreeFlags=d.subtreeFlags&65011712,w!==null?r=ul(w,r):(r=ia(r,n,l,null),r.flags|=2),r.return=t,a.return=t,a.sibling=r,t.child=a,Wn(null,a),a=t.child,r=e.child.memoizedState,r===null?r=Oo(l):(n=r.cachePool,n!==null?(d=je._currentValue,n=n.parent!==d?{parent:d,pool:d}:n):n=zs(),r={baseLanes:r.baseLanes|l,cachePool:n}),a.memoizedState=r,a.childLanes=Uo(e,c,l),t.memoizedState=Co,Wn(e.child,a)):(Rl(t),l=e.child,e=l.sibling,l=ul(l,{mode:"visible",children:a.children}),l.return=t,l.sibling=null,e!==null&&(c=t.deletions,c===null?(t.deletions=[e],t.flags|=16):c.push(e)),t.child=l,t.memoizedState=null,l)}function Ro(e,t){return t=mi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function mi(e,t){return e=xt(22,e,null,t),e.lanes=0,e}function No(e,t,l){return ha(t,e.child,null,l),e=Ro(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kd(e,t,l){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Jc(e.return,t,l)}function Ho(e,t,l,a,n,u){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:l,tailMode:n,treeForkCount:u}:(c.isBackwards=t,c.rendering=null,c.renderingStartTime=0,c.last=a,c.tail=l,c.tailMode=n,c.treeForkCount=u)}function qd(e,t,l){var a=t.pendingProps,n=a.revealOrder,u=a.tail;a=a.children;var c=qe.current,r=(c&2)!==0;if(r?(c=c&1|2,t.flags|=128):c&=1,L(qe,c),tt(e,t,a,l),a=he?kn:0,!r&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kd(e,l,t);else if(e.tag===19)kd(e,l,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(n){case"forwards":for(l=t.child,n=null;l!==null;)e=l.alternate,e!==null&&li(e)===null&&(n=l),l=l.sibling;l=n,l===null?(n=t.child,t.child=null):(n=l.sibling,l.sibling=null),Ho(t,!1,n,l,u,a);break;case"backwards":case"unstable_legacy-backwards":for(l=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&li(e)===null){t.child=n;break}e=n.sibling,n.sibling=l,l=n,n=e}Ho(t,!0,l,null,u,a);break;case"together":Ho(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function sl(e,t,l){if(e!==null&&(t.dependencies=e.dependencies),kl|=t.lanes,(l&t.childLanes)===0)if(e!==null){if(Za(e,t,l,!1),(l&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,l=ul(e,e.pendingProps),t.child=l,l.return=t;e.sibling!==null;)e=e.sibling,l=l.sibling=ul(e,e.pendingProps),l.return=t;l.sibling=null}return t.child}function Bo(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ju(e)))}function Py(e,t,l){switch(t.tag){case 3:Ve(t,t.stateNode.containerInfo),Dl(t,je,e.memoizedState.cache),ca();break;case 27:case 5:el(t);break;case 4:Ve(t,t.stateNode.containerInfo);break;case 10:Dl(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,io(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(Rl(t),t.flags|=128,null):(l&t.child.childLanes)!==0?Bd(e,t,l):(Rl(t),e=sl(e,t,l),e!==null?e.sibling:null);Rl(t);break;case 19:var n=(e.flags&128)!==0;if(a=(l&t.childLanes)!==0,a||(Za(e,t,l,!1),a=(l&t.childLanes)!==0),n){if(a)return qd(e,t,l);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),L(qe,qe.current),a)break;return null;case 22:return t.lanes=0,Cd(e,t,l,t.pendingProps);case 24:Dl(t,je,e.memoizedState.cache)}return sl(e,t,l)}function Ld(e,t,l){if(e!==null)if(e.memoizedProps!==t.pendingProps)Xe=!0;else{if(!Bo(e,l)&&(t.flags&128)===0)return Xe=!1,Py(e,t,l);Xe=(e.flags&131072)!==0}else Xe=!1,he&&(t.flags&1048576)!==0&&vs(t,kn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=sa(t.elementType),t.type=e,typeof e=="function")Yc(e)?(a=ga(e,a),t.tag=1,t=Nd(null,t,e,a,l)):(t.tag=0,t=Do(null,t,e,a,l));else{if(e!=null){var n=e.$$typeof;if(n===G){t.tag=11,t=Md(null,t,e,a,l);break e}else if(n===V){t.tag=14,t=_d(null,t,e,a,l);break e}}throw t=Be(e)||e,Error(o(306,t,""))}}return t;case 0:return Do(e,t,t.type,t.pendingProps,l);case 1:return a=t.type,n=ga(a,t.pendingProps),Nd(e,t,a,n,l);case 3:e:{if(Ve(t,t.stateNode.containerInfo),e===null)throw Error(o(387));a=t.pendingProps;var u=t.memoizedState;n=u.element,to(e,t),Zn(t,a,null,l);var c=t.memoizedState;if(a=c.cache,Dl(t,je,a),a!==u.cache&&$c(t,[je],l,!0),Qn(),a=c.element,u.isDehydrated)if(u={element:a,isDehydrated:!1,cache:c.cache},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){t=Hd(e,t,a,l);break e}else if(a!==n){n=Ht(Error(o(424)),t),qn(n),t=Hd(e,t,a,l);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,_e=Yt(e.firstChild),Pe=t,he=!0,Ml=null,qt=!0,l=Cs(t,null,a,l),t.child=l;l;)l.flags=l.flags&-3|4096,l=l.sibling;else{if(ca(),a===n){t=sl(e,t,l);break e}tt(e,t,a,l)}t=t.child}return t;case 26:return hi(e,t),e===null?(l=W0(t.type,null,t.pendingProps,null))?t.memoizedState=l:he||(l=t.type,e=t.pendingProps,a=Ci(ne.current).createElement(l),a[Ie]=t,a[dt]=e,lt(a,l,e),Je(a),t.stateNode=a):t.memoizedState=W0(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return el(t),e===null&&he&&(a=t.stateNode=K0(t.type,t.pendingProps,ne.current),Pe=t,qt=!0,n=_e,Gl(t.type)?(yf=n,_e=Yt(a.firstChild)):_e=n),tt(e,t,t.pendingProps.children,l),hi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&he&&((n=a=_e)&&(a=Dv(a,t.type,t.pendingProps,qt),a!==null?(t.stateNode=a,Pe=t,_e=Yt(a.firstChild),qt=!1,n=!0):n=!1),n||_l(t)),el(t),n=t.type,u=t.pendingProps,c=e!==null?e.memoizedProps:null,a=u.children,sf(n,u)?a=null:c!==null&&sf(n,c)&&(t.flags|=32),t.memoizedState!==null&&(n=oo(e,t,Qy,null,null,l),su._currentValue=n),hi(e,t),tt(e,t,a,l),t.child;case 6:return e===null&&he&&((e=l=_e)&&(l=Cv(l,t.pendingProps,qt),l!==null?(t.stateNode=l,Pe=t,_e=null,e=!0):e=!1),e||_l(t)),null;case 13:return Bd(e,t,l);case 4:return Ve(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=ha(t,null,a,l):tt(e,t,a,l),t.child;case 11:return Md(e,t,t.type,t.pendingProps,l);case 7:return tt(e,t,t.pendingProps,l),t.child;case 8:return tt(e,t,t.pendingProps.children,l),t.child;case 12:return tt(e,t,t.pendingProps.children,l),t.child;case 10:return a=t.pendingProps,Dl(t,t.type,a.value),tt(e,t,a.children,l),t.child;case 9:return n=t.type._context,a=t.pendingProps.children,fa(t),n=et(n),a=a(n),t.flags|=1,tt(e,t,a,l),t.child;case 14:return _d(e,t,t.type,t.pendingProps,l);case 15:return Dd(e,t,t.type,t.pendingProps,l);case 19:return qd(e,t,l);case 31:return Iy(e,t,l);case 22:return Cd(e,t,l,t.pendingProps);case 24:return fa(t),a=et(je),e===null?(n=Ic(),n===null&&(n=Me,u=Wc(),n.pooledCache=u,u.refCount++,u!==null&&(n.pooledCacheLanes|=l),n=u),t.memoizedState={parent:a,cache:n},eo(t),Dl(t,je,n)):((e.lanes&l)!==0&&(to(e,t),Zn(t,null,null,l),Qn()),n=e.memoizedState,u=t.memoizedState,n.parent!==a?(n={parent:a,cache:a},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),Dl(t,je,a)):(a=u.cache,Dl(t,je,a),a!==n.cache&&$c(t,[je],l,!0))),tt(e,t,t.pendingProps.children,l),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function dl(e){e.flags|=4}function ko(e,t,l,a,n){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(n&335544128)===n)if(e.stateNode.complete)e.flags|=8192;else if(d0())e.flags|=8192;else throw da=Iu,Pc}else e.flags&=-16777217}function Yd(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!th(t))if(d0())e.flags|=8192;else throw da=Iu,Pc}function gi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?wn():536870912,e.lanes|=t,an|=t)}function Fn(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var l=null;t!==null;)t.alternate!==null&&(l=t),t=t.sibling;l===null?e.tail=null:l.sibling=null;break;case"collapsed":l=e.tail;for(var a=null;l!==null;)l.alternate!==null&&(a=l),l=l.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function De(e){var t=e.alternate!==null&&e.alternate.child===e.child,l=0,a=0;if(t)for(var n=e.child;n!==null;)l|=n.lanes|n.childLanes,a|=n.subtreeFlags&65011712,a|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)l|=n.lanes|n.childLanes,a|=n.subtreeFlags,a|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=a,e.childLanes=l,t}function ev(e,t,l){var a=t.pendingProps;switch(Qc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return De(t),null;case 1:return De(t),null;case 3:return l=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),ol(je),Ce(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&(Qa(t)?dl(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Vc())),De(t),null;case 26:var n=t.type,u=t.memoizedState;return e===null?(dl(t),u!==null?(De(t),Yd(t,u)):(De(t),ko(t,n,null,a,l))):u?u!==e.memoizedState?(dl(t),De(t),Yd(t,u)):(De(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&dl(t),De(t),ko(t,n,e,a,l)),null;case 27:if(Wl(t),l=ne.current,n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&dl(t);else{if(!a){if(t.stateNode===null)throw Error(o(166));return De(t),null}e=X.current,Qa(t)?ps(t):(e=K0(n,a,l),t.stateNode=e,dl(t))}return De(t),null;case 5:if(Wl(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&dl(t);else{if(!a){if(t.stateNode===null)throw Error(o(166));return De(t),null}if(u=X.current,Qa(t))ps(t);else{var c=Ci(ne.current);switch(u){case 1:u=c.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:u=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":u=c.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":u=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":u=c.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof a.is=="string"?c.createElement("select",{is:a.is}):c.createElement("select"),a.multiple?u.multiple=!0:a.size&&(u.size=a.size);break;default:u=typeof a.is=="string"?c.createElement(n,{is:a.is}):c.createElement(n)}}u[Ie]=t,u[dt]=a;e:for(c=t.child;c!==null;){if(c.tag===5||c.tag===6)u.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===t)break e;for(;c.sibling===null;){if(c.return===null||c.return===t)break e;c=c.return}c.sibling.return=c.return,c=c.sibling}t.stateNode=u;e:switch(lt(u,n,a),n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&dl(t)}}return De(t),ko(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,l),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&dl(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(o(166));if(e=ne.current,Qa(t)){if(e=t.stateNode,l=t.memoizedProps,a=null,n=Pe,n!==null)switch(n.tag){case 27:case 5:a=n.memoizedProps}e[Ie]=t,e=!!(e.nodeValue===l||a!==null&&a.suppressHydrationWarning===!0||B0(e.nodeValue,l)),e||_l(t,!0)}else e=Ci(e).createTextNode(a),e[Ie]=t,t.stateNode=e}return De(t),null;case 31:if(l=t.memoizedState,e===null||e.memoizedState!==null){if(a=Qa(t),l!==null){if(e===null){if(!a)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[Ie]=t}else ca(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;De(t),e=!1}else l=Vc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),e=!0;if(!e)return t.flags&256?(zt(t),t):(zt(t),null);if((t.flags&128)!==0)throw Error(o(558))}return De(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=Qa(t),a!==null&&a.dehydrated!==null){if(e===null){if(!n)throw Error(o(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(o(317));n[Ie]=t}else ca(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;De(t),n=!1}else n=Vc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(zt(t),t):(zt(t),null)}return zt(t),(t.flags&128)!==0?(t.lanes=l,t):(l=a!==null,e=e!==null&&e.memoizedState!==null,l&&(a=t.child,n=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(n=a.alternate.memoizedState.cachePool.pool),u=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(u=a.memoizedState.cachePool.pool),u!==n&&(a.flags|=2048)),l!==e&&l&&(t.child.flags|=8192),gi(t,t.updateQueue),De(t),null);case 4:return Ce(),e===null&&uf(t.stateNode.containerInfo),De(t),null;case 10:return ol(t.type),De(t),null;case 19:if(C(qe),a=t.memoizedState,a===null)return De(t),null;if(n=(t.flags&128)!==0,u=a.rendering,u===null)if(n)Fn(a,!1);else{if(Re!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=li(e),u!==null){for(t.flags|=128,Fn(a,!1),e=u.updateQueue,t.updateQueue=e,gi(t,e),t.subtreeFlags=0,e=l,l=t.child;l!==null;)ms(l,e),l=l.sibling;return L(qe,qe.current&1|2),he&&il(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&nt()>Si&&(t.flags|=128,n=!0,Fn(a,!1),t.lanes=4194304)}else{if(!n)if(e=li(u),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,gi(t,e),Fn(a,!0),a.tail===null&&a.tailMode==="hidden"&&!u.alternate&&!he)return De(t),null}else 2*nt()-a.renderingStartTime>Si&&l!==536870912&&(t.flags|=128,n=!0,Fn(a,!1),t.lanes=4194304);a.isBackwards?(u.sibling=t.child,t.child=u):(e=a.last,e!==null?e.sibling=u:t.child=u,a.last=u)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=nt(),e.sibling=null,l=qe.current,L(qe,n?l&1|2:l&1),he&&il(t,a.treeForkCount),e):(De(t),null);case 22:case 23:return zt(t),uo(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(l&536870912)!==0&&(t.flags&128)===0&&(De(t),t.subtreeFlags&6&&(t.flags|=8192)):De(t),l=t.updateQueue,l!==null&&gi(t,l.retryQueue),l=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==l&&(t.flags|=2048),e!==null&&C(ra),null;case 24:return l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),ol(je),De(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function tv(e,t){switch(Qc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ol(je),Ce(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Wl(t),null;case 31:if(t.memoizedState!==null){if(zt(t),t.alternate===null)throw Error(o(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(zt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return C(qe),null;case 4:return Ce(),null;case 10:return ol(t.type),null;case 22:case 23:return zt(t),uo(),e!==null&&C(ra),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ol(je),null;case 25:return null;default:return null}}function jd(e,t){switch(Qc(t),t.tag){case 3:ol(je),Ce();break;case 26:case 27:case 5:Wl(t);break;case 4:Ce();break;case 31:t.memoizedState!==null&&zt(t);break;case 13:zt(t);break;case 19:C(qe);break;case 10:ol(t.type);break;case 22:case 23:zt(t),uo(),e!==null&&C(ra);break;case 24:ol(je)}}function In(e,t){try{var l=t.updateQueue,a=l!==null?l.lastEffect:null;if(a!==null){var n=a.next;l=n;do{if((l.tag&e)===e){a=void 0;var u=l.create,c=l.inst;a=u(),c.destroy=a}l=l.next}while(l!==n)}}catch(r){Te(t,t.return,r)}}function Hl(e,t,l){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var u=n.next;a=u;do{if((a.tag&e)===e){var c=a.inst,r=c.destroy;if(r!==void 0){c.destroy=void 0,n=t;var d=l,w=r;try{w()}catch(D){Te(n,d,D)}}}a=a.next}while(a!==u)}}catch(D){Te(t,t.return,D)}}function Gd(e){var t=e.updateQueue;if(t!==null){var l=e.stateNode;try{Us(t,l)}catch(a){Te(e,e.return,a)}}}function Xd(e,t,l){l.props=ga(e.type,e.memoizedProps),l.state=e.memoizedState;try{l.componentWillUnmount()}catch(a){Te(e,t,a)}}function Pn(e,t){try{var l=e.ref;if(l!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof l=="function"?e.refCleanup=l(a):l.current=a}}catch(n){Te(e,t,n)}}function It(e,t){var l=e.ref,a=e.refCleanup;if(l!==null)if(typeof a=="function")try{a()}catch(n){Te(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof l=="function")try{l(null)}catch(n){Te(e,t,n)}else l.current=null}function Qd(e){var t=e.type,l=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":l.autoFocus&&a.focus();break e;case"img":l.src?a.src=l.src:l.srcSet&&(a.srcset=l.srcSet)}}catch(n){Te(e,e.return,n)}}function qo(e,t,l){try{var a=e.stateNode;Tv(a,e.type,l,t),a[dt]=t}catch(n){Te(e,e.return,n)}}function Zd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Gl(e.type)||e.tag===4}function Lo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Zd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Gl(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Yo(e,t,l){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l).insertBefore(e,t):(t=l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l,t.appendChild(e),l=l._reactRootContainer,l!=null||t.onclick!==null||(t.onclick=al));else if(a!==4&&(a===27&&Gl(e.type)&&(l=e.stateNode,t=null),e=e.child,e!==null))for(Yo(e,t,l),e=e.sibling;e!==null;)Yo(e,t,l),e=e.sibling}function yi(e,t,l){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?l.insertBefore(e,t):l.appendChild(e);else if(a!==4&&(a===27&&Gl(e.type)&&(l=e.stateNode),e=e.child,e!==null))for(yi(e,t,l),e=e.sibling;e!==null;)yi(e,t,l),e=e.sibling}function Vd(e){var t=e.stateNode,l=e.memoizedProps;try{for(var a=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);lt(t,a,l),t[Ie]=e,t[dt]=l}catch(u){Te(e,e.return,u)}}var hl=!1,Qe=!1,jo=!1,Kd=typeof WeakSet=="function"?WeakSet:Set,$e=null;function lv(e,t){if(e=e.containerInfo,ff=ki,e=us(e),Rc(e)){if("selectionStart"in e)var l={start:e.selectionStart,end:e.selectionEnd};else e:{l=(l=e.ownerDocument)&&l.defaultView||window;var a=l.getSelection&&l.getSelection();if(a&&a.rangeCount!==0){l=a.anchorNode;var n=a.anchorOffset,u=a.focusNode;a=a.focusOffset;try{l.nodeType,u.nodeType}catch(P){l=null;break e}var c=0,r=-1,d=-1,w=0,D=0,U=e,A=null;t:for(;;){for(var M;U!==l||n!==0&&U.nodeType!==3||(r=c+n),U!==u||a!==0&&U.nodeType!==3||(d=c+a),U.nodeType===3&&(c+=U.nodeValue.length),(M=U.firstChild)!==null;)A=U,U=M;for(;;){if(U===e)break t;if(A===l&&++w===n&&(r=c),A===u&&++D===a&&(d=c),(M=U.nextSibling)!==null)break;U=A,A=U.parentNode}U=M}l=r===-1||d===-1?null:{start:r,end:d}}else l=null}l=l||{start:0,end:0}}else l=null;for(rf={focusedElem:e,selectionRange:l},ki=!1,$e=t;$e!==null;)if(t=$e,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,$e=e;else for(;$e!==null;){switch(t=$e,u=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(l=0;l<e.length;l++)n=e[l],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&u!==null){e=void 0,l=t,n=u.memoizedProps,u=u.memoizedState,a=l.stateNode;try{var Q=ga(l.type,n);e=a.getSnapshotBeforeUpdate(Q,u),a.__reactInternalSnapshotBeforeUpdate=e}catch(P){Te(l,l.return,P)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,l=e.nodeType,l===9)hf(e);else if(l===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":hf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,$e=e;break}$e=t.return}}function Jd(e,t,l){var a=l.flags;switch(l.tag){case 0:case 11:case 15:gl(e,l),a&4&&In(5,l);break;case 1:if(gl(e,l),a&4)if(e=l.stateNode,t===null)try{e.componentDidMount()}catch(c){Te(l,l.return,c)}else{var n=ga(l.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(c){Te(l,l.return,c)}}a&64&&Gd(l),a&512&&Pn(l,l.return);break;case 3:if(gl(e,l),a&64&&(e=l.updateQueue,e!==null)){if(t=null,l.child!==null)switch(l.child.tag){case 27:case 5:t=l.child.stateNode;break;case 1:t=l.child.stateNode}try{Us(e,t)}catch(c){Te(l,l.return,c)}}break;case 27:t===null&&a&4&&Vd(l);case 26:case 5:gl(e,l),t===null&&a&4&&Qd(l),a&512&&Pn(l,l.return);break;case 12:gl(e,l);break;case 31:gl(e,l),a&4&&Fd(e,l);break;case 13:gl(e,l),a&4&&Id(e,l),a&64&&(e=l.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(l=sv.bind(null,l),Ov(e,l))));break;case 22:if(a=l.memoizedState!==null||hl,!a){t=t!==null&&t.memoizedState!==null||Qe,n=hl;var u=Qe;hl=a,(Qe=t)&&!u?yl(e,l,(l.subtreeFlags&8772)!==0):gl(e,l),hl=n,Qe=u}break;case 30:break;default:gl(e,l)}}function $d(e){var t=e.alternate;t!==null&&(e.alternate=null,$d(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&yc(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Oe=null,mt=!1;function ml(e,t,l){for(l=l.child;l!==null;)Wd(e,t,l),l=l.sibling}function Wd(e,t,l){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(St,l)}catch(u){}switch(l.tag){case 26:Qe||It(l,t),ml(e,t,l),l.memoizedState?l.memoizedState.count--:l.stateNode&&(l=l.stateNode,l.parentNode.removeChild(l));break;case 27:Qe||It(l,t);var a=Oe,n=mt;Gl(l.type)&&(Oe=l.stateNode,mt=!1),ml(e,t,l),ou(l.stateNode),Oe=a,mt=n;break;case 5:Qe||It(l,t);case 6:if(a=Oe,n=mt,Oe=null,ml(e,t,l),Oe=a,mt=n,Oe!==null)if(mt)try{(Oe.nodeType===9?Oe.body:Oe.nodeName==="HTML"?Oe.ownerDocument.body:Oe).removeChild(l.stateNode)}catch(u){Te(l,t,u)}else try{Oe.removeChild(l.stateNode)}catch(u){Te(l,t,u)}break;case 18:Oe!==null&&(mt?(e=Oe,G0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,l.stateNode),dn(e)):G0(Oe,l.stateNode));break;case 4:a=Oe,n=mt,Oe=l.stateNode.containerInfo,mt=!0,ml(e,t,l),Oe=a,mt=n;break;case 0:case 11:case 14:case 15:Hl(2,l,t),Qe||Hl(4,l,t),ml(e,t,l);break;case 1:Qe||(It(l,t),a=l.stateNode,typeof a.componentWillUnmount=="function"&&Xd(l,t,a)),ml(e,t,l);break;case 21:ml(e,t,l);break;case 22:Qe=(a=Qe)||l.memoizedState!==null,ml(e,t,l),Qe=a;break;default:ml(e,t,l)}}function Fd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{dn(e)}catch(l){Te(t,t.return,l)}}}function Id(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{dn(e)}catch(l){Te(t,t.return,l)}}function av(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Kd),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Kd),t;default:throw Error(o(435,e.tag))}}function vi(e,t){var l=av(e);t.forEach(function(a){if(!l.has(a)){l.add(a);var n=dv.bind(null,e,a);a.then(n,n)}})}function gt(e,t){var l=t.deletions;if(l!==null)for(var a=0;a<l.length;a++){var n=l[a],u=e,c=t,r=c;e:for(;r!==null;){switch(r.tag){case 27:if(Gl(r.type)){Oe=r.stateNode,mt=!1;break e}break;case 5:Oe=r.stateNode,mt=!1;break e;case 3:case 4:Oe=r.stateNode.containerInfo,mt=!0;break e}r=r.return}if(Oe===null)throw Error(o(160));Wd(u,c,n),Oe=null,mt=!1,u=n.alternate,u!==null&&(u.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Pd(t,e),t=t.sibling}var Vt=null;function Pd(e,t){var l=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:gt(t,e),yt(e),a&4&&(Hl(3,e,e.return),In(3,e),Hl(5,e,e.return));break;case 1:gt(t,e),yt(e),a&512&&(Qe||l===null||It(l,l.return)),a&64&&hl&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(l=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=l===null?a:l.concat(a))));break;case 26:var n=Vt;if(gt(t,e),yt(e),a&512&&(Qe||l===null||It(l,l.return)),a&4){var u=l!==null?l.memoizedState:null;if(a=e.memoizedState,l===null)if(a===null)if(e.stateNode===null){e:{a=e.type,l=e.memoizedProps,n=n.ownerDocument||n;t:switch(a){case"title":u=n.getElementsByTagName("title")[0],(!u||u[An]||u[Ie]||u.namespaceURI==="http://www.w3.org/2000/svg"||u.hasAttribute("itemprop"))&&(u=n.createElement(a),n.head.insertBefore(u,n.querySelector("head > title"))),lt(u,a,l),u[Ie]=e,Je(u),a=u;break e;case"link":var c=P0("link","href",n).get(a+(l.href||""));if(c){for(var r=0;r<c.length;r++)if(u=c[r],u.getAttribute("href")===(l.href==null||l.href===""?null:l.href)&&u.getAttribute("rel")===(l.rel==null?null:l.rel)&&u.getAttribute("title")===(l.title==null?null:l.title)&&u.getAttribute("crossorigin")===(l.crossOrigin==null?null:l.crossOrigin)){c.splice(r,1);break t}}u=n.createElement(a),lt(u,a,l),n.head.appendChild(u);break;case"meta":if(c=P0("meta","content",n).get(a+(l.content||""))){for(r=0;r<c.length;r++)if(u=c[r],u.getAttribute("content")===(l.content==null?null:""+l.content)&&u.getAttribute("name")===(l.name==null?null:l.name)&&u.getAttribute("property")===(l.property==null?null:l.property)&&u.getAttribute("http-equiv")===(l.httpEquiv==null?null:l.httpEquiv)&&u.getAttribute("charset")===(l.charSet==null?null:l.charSet)){c.splice(r,1);break t}}u=n.createElement(a),lt(u,a,l),n.head.appendChild(u);break;default:throw Error(o(468,a))}u[Ie]=e,Je(u),a=u}e.stateNode=a}else eh(n,e.type,e.stateNode);else e.stateNode=I0(n,a,e.memoizedProps);else u!==a?(u===null?l.stateNode!==null&&(l=l.stateNode,l.parentNode.removeChild(l)):u.count--,a===null?eh(n,e.type,e.stateNode):I0(n,a,e.memoizedProps)):a===null&&e.stateNode!==null&&qo(e,e.memoizedProps,l.memoizedProps)}break;case 27:gt(t,e),yt(e),a&512&&(Qe||l===null||It(l,l.return)),l!==null&&a&4&&qo(e,e.memoizedProps,l.memoizedProps);break;case 5:if(gt(t,e),yt(e),a&512&&(Qe||l===null||It(l,l.return)),e.flags&32){n=e.stateNode;try{Na(n,"")}catch(Q){Te(e,e.return,Q)}}a&4&&e.stateNode!=null&&(n=e.memoizedProps,qo(e,n,l!==null?l.memoizedProps:n)),a&1024&&(jo=!0);break;case 6:if(gt(t,e),yt(e),a&4){if(e.stateNode===null)throw Error(o(162));a=e.memoizedProps,l=e.stateNode;try{l.nodeValue=a}catch(Q){Te(e,e.return,Q)}}break;case 3:if(Ri=null,n=Vt,Vt=Oi(t.containerInfo),gt(t,e),Vt=n,yt(e),a&4&&l!==null&&l.memoizedState.isDehydrated)try{dn(t.containerInfo)}catch(Q){Te(e,e.return,Q)}jo&&(jo=!1,e0(e));break;case 4:a=Vt,Vt=Oi(e.stateNode.containerInfo),gt(t,e),yt(e),Vt=a;break;case 12:gt(t,e),yt(e);break;case 31:gt(t,e),yt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,vi(e,a)));break;case 13:gt(t,e),yt(e),e.child.flags&8192&&e.memoizedState!==null!=(l!==null&&l.memoizedState!==null)&&(pi=nt()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,vi(e,a)));break;case 22:n=e.memoizedState!==null;var d=l!==null&&l.memoizedState!==null,w=hl,D=Qe;if(hl=w||n,Qe=D||d,gt(t,e),Qe=D,hl=w,yt(e),a&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(l===null||d||hl||Qe||ya(e)),l=null,t=e;;){if(t.tag===5||t.tag===26){if(l===null){d=l=t;try{if(u=d.stateNode,n)c=u.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none";else{r=d.stateNode;var U=d.memoizedProps.style,A=U!=null&&U.hasOwnProperty("display")?U.display:null;r.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(Q){Te(d,d.return,Q)}}}else if(t.tag===6){if(l===null){d=t;try{d.stateNode.nodeValue=n?"":d.memoizedProps}catch(Q){Te(d,d.return,Q)}}}else if(t.tag===18){if(l===null){d=t;try{var M=d.stateNode;n?X0(M,!0):X0(d.stateNode,!1)}catch(Q){Te(d,d.return,Q)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;l===t&&(l=null),t=t.return}l===t&&(l=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(l=a.retryQueue,l!==null&&(a.retryQueue=null,vi(e,l))));break;case 19:gt(t,e),yt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,vi(e,a)));break;case 30:break;case 21:break;default:gt(t,e),yt(e)}}function yt(e){var t=e.flags;if(t&2){try{for(var l,a=e.return;a!==null;){if(Zd(a)){l=a;break}a=a.return}if(l==null)throw Error(o(160));switch(l.tag){case 27:var n=l.stateNode,u=Lo(e);yi(e,u,n);break;case 5:var c=l.stateNode;l.flags&32&&(Na(c,""),l.flags&=-33);var r=Lo(e);yi(e,r,c);break;case 3:case 4:var d=l.stateNode.containerInfo,w=Lo(e);Yo(e,w,d);break;default:throw Error(o(161))}}catch(D){Te(e,e.return,D)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function e0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;e0(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function gl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Jd(e,t.alternate,t),t=t.sibling}function ya(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Hl(4,t,t.return),ya(t);break;case 1:It(t,t.return);var l=t.stateNode;typeof l.componentWillUnmount=="function"&&Xd(t,t.return,l),ya(t);break;case 27:ou(t.stateNode);case 26:case 5:It(t,t.return),ya(t);break;case 22:t.memoizedState===null&&ya(t);break;case 30:ya(t);break;default:ya(t)}e=e.sibling}}function yl(e,t,l){for(l=l&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,n=e,u=t,c=u.flags;switch(u.tag){case 0:case 11:case 15:yl(n,u,l),In(4,u);break;case 1:if(yl(n,u,l),a=u,n=a.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(w){Te(a,a.return,w)}if(a=u,n=a.updateQueue,n!==null){var r=a.stateNode;try{var d=n.shared.hiddenCallbacks;if(d!==null)for(n.shared.hiddenCallbacks=null,n=0;n<d.length;n++)Os(d[n],r)}catch(w){Te(a,a.return,w)}}l&&c&64&&Gd(u),Pn(u,u.return);break;case 27:Vd(u);case 26:case 5:yl(n,u,l),l&&a===null&&c&4&&Qd(u),Pn(u,u.return);break;case 12:yl(n,u,l);break;case 31:yl(n,u,l),l&&c&4&&Fd(n,u);break;case 13:yl(n,u,l),l&&c&4&&Id(n,u);break;case 22:u.memoizedState===null&&yl(n,u,l),Pn(u,u.return);break;case 30:break;default:yl(n,u,l)}t=t.sibling}}function Go(e,t){var l=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==l&&(e!=null&&e.refCount++,l!=null&&Ln(l))}function Xo(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ln(e))}function Kt(e,t,l,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)t0(e,t,l,a),t=t.sibling}function t0(e,t,l,a){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Kt(e,t,l,a),n&2048&&In(9,t);break;case 1:Kt(e,t,l,a);break;case 3:Kt(e,t,l,a),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ln(e)));break;case 12:if(n&2048){Kt(e,t,l,a),e=t.stateNode;try{var u=t.memoizedProps,c=u.id,r=u.onPostCommit;typeof r=="function"&&r(c,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(d){Te(t,t.return,d)}}else Kt(e,t,l,a);break;case 31:Kt(e,t,l,a);break;case 13:Kt(e,t,l,a);break;case 23:break;case 22:u=t.stateNode,c=t.alternate,t.memoizedState!==null?u._visibility&2?Kt(e,t,l,a):eu(e,t):u._visibility&2?Kt(e,t,l,a):(u._visibility|=2,en(e,t,l,a,(t.subtreeFlags&10256)!==0||!1)),n&2048&&Go(c,t);break;case 24:Kt(e,t,l,a),n&2048&&Xo(t.alternate,t);break;default:Kt(e,t,l,a)}}function en(e,t,l,a,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var u=e,c=t,r=l,d=a,w=c.flags;switch(c.tag){case 0:case 11:case 15:en(u,c,r,d,n),In(8,c);break;case 23:break;case 22:var D=c.stateNode;c.memoizedState!==null?D._visibility&2?en(u,c,r,d,n):eu(u,c):(D._visibility|=2,en(u,c,r,d,n)),n&&w&2048&&Go(c.alternate,c);break;case 24:en(u,c,r,d,n),n&&w&2048&&Xo(c.alternate,c);break;default:en(u,c,r,d,n)}t=t.sibling}}function eu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var l=e,a=t,n=a.flags;switch(a.tag){case 22:eu(l,a),n&2048&&Go(a.alternate,a);break;case 24:eu(l,a),n&2048&&Xo(a.alternate,a);break;default:eu(l,a)}t=t.sibling}}var tu=8192;function tn(e,t,l){if(e.subtreeFlags&tu)for(e=e.child;e!==null;)l0(e,t,l),e=e.sibling}function l0(e,t,l){switch(e.tag){case 26:tn(e,t,l),e.flags&tu&&e.memoizedState!==null&&Xv(l,Vt,e.memoizedState,e.memoizedProps);break;case 5:tn(e,t,l);break;case 3:case 4:var a=Vt;Vt=Oi(e.stateNode.containerInfo),tn(e,t,l),Vt=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=tu,tu=16777216,tn(e,t,l),tu=a):tn(e,t,l));break;default:tn(e,t,l)}}function a0(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function lu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var a=t[l];$e=a,u0(a,e)}a0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)n0(e),e=e.sibling}function n0(e){switch(e.tag){case 0:case 11:case 15:lu(e),e.flags&2048&&Hl(9,e,e.return);break;case 3:lu(e);break;case 12:lu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,bi(e)):lu(e);break;default:lu(e)}}function bi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var a=t[l];$e=a,u0(a,e)}a0(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Hl(8,t,t.return),bi(t);break;case 22:l=t.stateNode,l._visibility&2&&(l._visibility&=-3,bi(t));break;default:bi(t)}e=e.sibling}}function u0(e,t){for(;$e!==null;){var l=$e;switch(l.tag){case 0:case 11:case 15:Hl(8,l,t);break;case 23:case 22:if(l.memoizedState!==null&&l.memoizedState.cachePool!==null){var a=l.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Ln(l.memoizedState.cache)}if(a=l.child,a!==null)a.return=l,$e=a;else e:for(l=e;$e!==null;){a=$e;var n=a.sibling,u=a.return;if($d(a),a===l){$e=null;break e}if(n!==null){n.return=u,$e=n;break e}$e=u}}}var nv={getCacheForType:function(e){var t=et(je),l=t.data.get(e);return l===void 0&&(l=e(),t.data.set(e,l)),l},cacheSignal:function(){return et(je).controller.signal}},uv=typeof WeakMap=="function"?WeakMap:Map,pe=0,Me=null,fe=null,se=0,xe=0,wt=null,Bl=!1,ln=!1,Qo=!1,vl=0,Re=0,kl=0,va=0,Zo=0,At=0,an=0,au=null,vt=null,Vo=!1,pi=0,i0=0,Si=1/0,Ei=null,ql=null,Ze=0,Ll=null,nn=null,bl=0,Ko=0,Jo=null,c0=null,nu=0,$o=null;function Mt(){return(pe&2)!==0&&se!==0?se&-se:T.T!==null?tf():Tr()}function o0(){if(At===0)if((se&536870912)===0||he){var e=xl;xl<<=1,(xl&3932160)===0&&(xl=262144),At=e}else At=536870912;return e=Tt.current,e!==null&&(e.flags|=32),At}function bt(e,t,l){(e===Me&&(xe===2||xe===9)||e.cancelPendingCommit!==null)&&(un(e,0),Yl(e,se,At,!1)),Tl(e,l),((pe&2)===0||e!==Me)&&(e===Me&&((pe&2)===0&&(va|=l),Re===4&&Yl(e,se,At,!1)),Pt(e))}function f0(e,t,l){if((pe&6)!==0)throw Error(o(327));var a=!l&&(t&127)===0&&(t&e.expiredLanes)===0||ea(e,t),n=a?ov(e,t):Fo(e,t,!0),u=a;do{if(n===0){ln&&!a&&Yl(e,t,0,!1);break}else{if(l=e.current.alternate,u&&!iv(l)){n=Fo(e,t,!1),u=!1;continue}if(n===2){if(u=t,e.errorRecoveryDisabledLanes&u)var c=0;else c=e.pendingLanes&-536870913,c=c!==0?c:c&536870912?536870912:0;if(c!==0){t=c;e:{var r=e;n=au;var d=r.current.memoizedState.isDehydrated;if(d&&(un(r,c).flags|=256),c=Fo(r,c,!1),c!==2){if(Qo&&!d){r.errorRecoveryDisabledLanes|=u,va|=u,n=4;break e}u=vt,vt=n,u!==null&&(vt===null?vt=u:vt.push.apply(vt,u))}n=c}if(u=!1,n!==2)continue}}if(n===1){un(e,0),Yl(e,t,0,!0);break}e:{switch(a=e,u=n,u){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:Yl(a,t,At,!Bl);break e;case 2:vt=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(n=pi+300-nt(),10<n)){if(Yl(a,t,At,!Bl),tl(a,0,!0)!==0)break e;bl=t,a.timeoutHandle=Y0(r0.bind(null,a,l,vt,Ei,Vo,t,At,va,an,Bl,u,"Throttled",-0,0),n);break e}r0(a,l,vt,Ei,Vo,t,At,va,an,Bl,u,null,-0,0)}}break}while(!0);Pt(e)}function r0(e,t,l,a,n,u,c,r,d,w,D,U,A,M){if(e.timeoutHandle=-1,U=t.subtreeFlags,U&8192||(U&16785408)===16785408){U={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:al},l0(t,u,U);var Q=(u&62914560)===u?pi-nt():(u&4194048)===u?i0-nt():0;if(Q=Qv(U,Q),Q!==null){bl=u,e.cancelPendingCommit=Q(b0.bind(null,e,t,u,l,a,n,c,r,d,D,U,null,A,M)),Yl(e,u,c,!w);return}}b0(e,t,u,l,a,n,c,r,d)}function iv(e){for(var t=e;;){var l=t.tag;if((l===0||l===11||l===15)&&t.flags&16384&&(l=t.updateQueue,l!==null&&(l=l.stores,l!==null)))for(var a=0;a<l.length;a++){var n=l[a],u=n.getSnapshot;n=n.value;try{if(!Et(u(),n))return!1}catch(c){return!1}}if(l=t.child,t.subtreeFlags&16384&&l!==null)l.return=t,t=l;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Yl(e,t,l,a){t&=~Zo,t&=~va,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var n=t;0<n;){var u=31-ut(n),c=1<<u;a[u]=-1,n&=~c}l!==0&&st(e,l,t)}function xi(){return(pe&6)===0?(uu(0),!1):!0}function Wo(){if(fe!==null){if(xe===0)var e=fe.return;else e=fe,cl=oa=null,so(e),$a=null,jn=0,e=fe;for(;e!==null;)jd(e.alternate,e),e=e.return;fe=null}}function un(e,t){var l=e.timeoutHandle;l!==-1&&(e.timeoutHandle=-1,Av(l)),l=e.cancelPendingCommit,l!==null&&(e.cancelPendingCommit=null,l()),bl=0,Wo(),Me=e,fe=l=ul(e.current,null),se=t,xe=0,wt=null,Bl=!1,ln=ea(e,t),Qo=!1,an=At=Zo=va=kl=Re=0,vt=au=null,Vo=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var n=31-ut(a),u=1<<n;t|=e[n],a&=~u}return vl=t,Xu(),l}function s0(e,t){ie=null,T.H=$n,t===Ja||t===Fu?(t=Ms(),xe=3):t===Pc?(t=Ms(),xe=4):xe=t===_o?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,wt=t,fe===null&&(Re=1,si(e,Ht(t,e.current)))}function d0(){var e=Tt.current;return e===null?!0:(se&4194048)===se?Lt===null:(se&62914560)===se||(se&536870912)!==0?e===Lt:!1}function h0(){var e=T.H;return T.H=$n,e===null?$n:e}function m0(){var e=T.A;return T.A=nv,e}function Ti(){Re=4,Bl||(se&4194048)!==se&&Tt.current!==null||(ln=!0),(kl&134217727)===0&&(va&134217727)===0||Me===null||Yl(Me,se,At,!1)}function Fo(e,t,l){var a=pe;pe|=2;var n=h0(),u=m0();(Me!==e||se!==t)&&(Ei=null,un(e,t)),t=!1;var c=Re;e:do try{if(xe!==0&&fe!==null){var r=fe,d=wt;switch(xe){case 8:Wo(),c=6;break e;case 3:case 2:case 9:case 6:Tt.current===null&&(t=!0);var w=xe;if(xe=0,wt=null,cn(e,r,d,w),l&&ln){c=0;break e}break;default:w=xe,xe=0,wt=null,cn(e,r,d,w)}}cv(),c=Re;break}catch(D){s0(e,D)}while(!0);return t&&e.shellSuspendCounter++,cl=oa=null,pe=a,T.H=n,T.A=u,fe===null&&(Me=null,se=0,Xu()),c}function cv(){for(;fe!==null;)g0(fe)}function ov(e,t){var l=pe;pe|=2;var a=h0(),n=m0();Me!==e||se!==t?(Ei=null,Si=nt()+500,un(e,t)):ln=ea(e,t);e:do try{if(xe!==0&&fe!==null){t=fe;var u=wt;t:switch(xe){case 1:xe=0,wt=null,cn(e,t,u,1);break;case 2:case 9:if(ws(u)){xe=0,wt=null,y0(t);break}t=function(){xe!==2&&xe!==9||Me!==e||(xe=7),Pt(e)},u.then(t,t);break e;case 3:xe=7;break e;case 4:xe=5;break e;case 7:ws(u)?(xe=0,wt=null,y0(t)):(xe=0,wt=null,cn(e,t,u,7));break;case 5:var c=null;switch(fe.tag){case 26:c=fe.memoizedState;case 5:case 27:var r=fe;if(c?th(c):r.stateNode.complete){xe=0,wt=null;var d=r.sibling;if(d!==null)fe=d;else{var w=r.return;w!==null?(fe=w,zi(w)):fe=null}break t}}xe=0,wt=null,cn(e,t,u,5);break;case 6:xe=0,wt=null,cn(e,t,u,6);break;case 8:Wo(),Re=6;break e;default:throw Error(o(462))}}fv();break}catch(D){s0(e,D)}while(!0);return cl=oa=null,T.H=a,T.A=n,pe=l,fe!==null?0:(Me=null,se=0,Xu(),Re)}function fv(){for(;fe!==null&&!wu();)g0(fe)}function g0(e){var t=Ld(e.alternate,e,vl);e.memoizedProps=e.pendingProps,t===null?zi(e):fe=t}function y0(e){var t=e,l=t.alternate;switch(t.tag){case 15:case 0:t=Rd(l,t,t.pendingProps,t.type,void 0,se);break;case 11:t=Rd(l,t,t.pendingProps,t.type.render,t.ref,se);break;case 5:so(t);default:jd(l,t),t=fe=ms(t,vl),t=Ld(l,t,vl)}e.memoizedProps=e.pendingProps,t===null?zi(e):fe=t}function cn(e,t,l,a){cl=oa=null,so(t),$a=null,jn=0;var n=t.return;try{if(Fy(e,n,t,l,se)){Re=1,si(e,Ht(l,e.current)),fe=null;return}}catch(u){if(n!==null)throw fe=n,u;Re=1,si(e,Ht(l,e.current)),fe=null;return}t.flags&32768?(he||a===1?e=!0:ln||(se&536870912)!==0?e=!1:(Bl=e=!0,(a===2||a===9||a===3||a===6)&&(a=Tt.current,a!==null&&a.tag===13&&(a.flags|=16384))),v0(t,e)):zi(t)}function zi(e){var t=e;do{if((t.flags&32768)!==0){v0(t,Bl);return}e=t.return;var l=ev(t.alternate,t,vl);if(l!==null){fe=l;return}if(t=t.sibling,t!==null){fe=t;return}fe=t=e}while(t!==null);Re===0&&(Re=5)}function v0(e,t){do{var l=tv(e.alternate,e);if(l!==null){l.flags&=32767,fe=l;return}if(l=e.return,l!==null&&(l.flags|=32768,l.subtreeFlags=0,l.deletions=null),!t&&(e=e.sibling,e!==null)){fe=e;return}fe=e=l}while(e!==null);Re=6,fe=null}function b0(e,t,l,a,n,u,c,r,d){e.cancelPendingCommit=null;do wi();while(Ze!==0);if((pe&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(u=t.lanes|t.childLanes,u|=qc,Ou(e,l,u,c,r,d),e===Me&&(fe=Me=null,se=0),nn=t,Ll=e,bl=l,Ko=u,Jo=n,c0=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,hv(Pl,function(){return T0(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=T.T,T.T=null,n=H.p,H.p=2,c=pe,pe|=4;try{lv(e,t,l)}finally{pe=c,H.p=n,T.T=a}}Ze=1,p0(),S0(),E0()}}function p0(){if(Ze===1){Ze=0;var e=Ll,t=nn,l=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||l){l=T.T,T.T=null;var a=H.p;H.p=2;var n=pe;pe|=4;try{Pd(t,e);var u=rf,c=us(e.containerInfo),r=u.focusedElem,d=u.selectionRange;if(c!==r&&r&&r.ownerDocument&&ns(r.ownerDocument.documentElement,r)){if(d!==null&&Rc(r)){var w=d.start,D=d.end;if(D===void 0&&(D=w),"selectionStart"in r)r.selectionStart=w,r.selectionEnd=Math.min(D,r.value.length);else{var U=r.ownerDocument||document,A=U&&U.defaultView||window;if(A.getSelection){var M=A.getSelection(),Q=r.textContent.length,P=Math.min(d.start,Q),Ae=d.end===void 0?P:Math.min(d.end,Q);!M.extend&&P>Ae&&(c=Ae,Ae=P,P=c);var E=as(r,P),g=as(r,Ae);if(E&&g&&(M.rangeCount!==1||M.anchorNode!==E.node||M.anchorOffset!==E.offset||M.focusNode!==g.node||M.focusOffset!==g.offset)){var z=U.createRange();z.setStart(E.node,E.offset),M.removeAllRanges(),P>Ae?(M.addRange(z),M.extend(g.node,g.offset)):(z.setEnd(g.node,g.offset),M.addRange(z))}}}}for(U=[],M=r;M=M.parentNode;)M.nodeType===1&&U.push({element:M,left:M.scrollLeft,top:M.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<U.length;r++){var O=U[r];O.element.scrollLeft=O.left,O.element.scrollTop=O.top}}ki=!!ff,rf=ff=null}finally{pe=n,H.p=a,T.T=l}}e.current=t,Ze=2}}function S0(){if(Ze===2){Ze=0;var e=Ll,t=nn,l=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||l){l=T.T,T.T=null;var a=H.p;H.p=2;var n=pe;pe|=4;try{Jd(e,t.alternate,t)}finally{pe=n,H.p=a,T.T=l}}Ze=3}}function E0(){if(Ze===4||Ze===3){Ze=0,Au();var e=Ll,t=nn,l=bl,a=c0;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ze=5:(Ze=0,nn=Ll=null,x0(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(ql=null),mc(l),t=t.stateNode,ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(St,t,void 0,(t.current.flags&128)===128)}catch(d){}if(a!==null){t=T.T,n=H.p,H.p=2,T.T=null;try{for(var u=e.onRecoverableError,c=0;c<a.length;c++){var r=a[c];u(r.value,{componentStack:r.stack})}}finally{T.T=t,H.p=n}}(bl&3)!==0&&wi(),Pt(e),n=e.pendingLanes,(l&261930)!==0&&(n&42)!==0?e===$o?nu++:(nu=0,$o=e):nu=0,uu(0)}}function x0(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ln(t)))}function wi(){return p0(),S0(),E0(),T0()}function T0(){if(Ze!==5)return!1;var e=Ll,t=Ko;Ko=0;var l=mc(bl),a=T.T,n=H.p;try{H.p=32>l?32:l,T.T=null,l=Jo,Jo=null;var u=Ll,c=bl;if(Ze=0,nn=Ll=null,bl=0,(pe&6)!==0)throw Error(o(331));var r=pe;if(pe|=4,n0(u.current),t0(u,u.current,c,l),pe=r,uu(0,!1),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(St,u)}catch(d){}return!0}finally{H.p=n,T.T=a,x0(e,t)}}function z0(e,t,l){t=Ht(l,t),t=Mo(e.stateNode,t,2),e=Ul(e,t,2),e!==null&&(Tl(e,2),Pt(e))}function Te(e,t,l){if(e.tag===3)z0(e,e,l);else for(;t!==null;){if(t.tag===3){z0(t,e,l);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(ql===null||!ql.has(a))){e=Ht(l,e),l=wd(2),a=Ul(t,l,2),a!==null&&(Ad(l,a,t,e),Tl(a,2),Pt(a));break}}t=t.return}}function Io(e,t,l){var a=e.pingCache;if(a===null){a=e.pingCache=new uv;var n=new Set;a.set(t,n)}else n=a.get(t),n===void 0&&(n=new Set,a.set(t,n));n.has(l)||(Qo=!0,n.add(l),e=rv.bind(null,e,t,l),t.then(e,e))}function rv(e,t,l){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&l,e.warmLanes&=~l,Me===e&&(se&l)===l&&(Re===4||Re===3&&(se&62914560)===se&&300>nt()-pi?(pe&2)===0&&un(e,0):Zo|=l,an===se&&(an=0)),Pt(e)}function w0(e,t){t===0&&(t=wn()),e=ua(e,t),e!==null&&(Tl(e,t),Pt(e))}function sv(e){var t=e.memoizedState,l=0;t!==null&&(l=t.retryLane),w0(e,l)}function dv(e,t){var l=0;switch(e.tag){case 31:case 13:var a=e.stateNode,n=e.memoizedState;n!==null&&(l=n.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(o(314))}a!==null&&a.delete(t),w0(e,l)}function hv(e,t){return Fl(e,t)}var Ai=null,on=null,Po=!1,Mi=!1,ef=!1,jl=0;function Pt(e){e!==on&&e.next===null&&(on===null?Ai=on=e:on=on.next=e),Mi=!0,Po||(Po=!0,gv())}function uu(e,t){if(!ef&&Mi){ef=!0;do for(var l=!1,a=Ai;a!==null;){if(e!==0){var n=a.pendingLanes;if(n===0)var u=0;else{var c=a.suspendedLanes,r=a.pingedLanes;u=(1<<31-ut(42|e)+1)-1,u&=n&~(c&~r),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(l=!0,D0(a,u))}else u=se,u=tl(a,a===Me?u:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(u&3)===0||ea(a,u)||(l=!0,D0(a,u));a=a.next}while(l);ef=!1}}function mv(){A0()}function A0(){Mi=Po=!1;var e=0;jl!==0&&wv()&&(e=jl);for(var t=nt(),l=null,a=Ai;a!==null;){var n=a.next,u=M0(a,t);u===0?(a.next=null,l===null?Ai=n:l.next=n,n===null&&(on=l)):(l=a,(e!==0||(u&3)!==0)&&(Mi=!0)),a=n}Ze!==0&&Ze!==5||uu(e),jl!==0&&(jl=0)}function M0(e,t){for(var l=e.suspendedLanes,a=e.pingedLanes,n=e.expirationTimes,u=e.pendingLanes&-62914561;0<u;){var c=31-ut(u),r=1<<c,d=n[c];d===-1?((r&l)===0||(r&a)!==0)&&(n[c]=Cu(r,t)):d<=t&&(e.expiredLanes|=r),u&=~r}if(t=Me,l=se,l=tl(e,e===t?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,l===0||e===t&&(xe===2||xe===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Il(a),e.callbackNode=null,e.callbackPriority=0;if((l&3)===0||ea(e,l)){if(t=l&-l,t===e.callbackPriority)return t;switch(a!==null&&Il(a),mc(l)){case 2:case 8:l=ct;break;case 32:l=Pl;break;case 268435456:l=zn;break;default:l=Pl}return a=_0.bind(null,e),l=Fl(l,a),e.callbackPriority=t,e.callbackNode=l,t}return a!==null&&a!==null&&Il(a),e.callbackPriority=2,e.callbackNode=null,2}function _0(e,t){if(Ze!==0&&Ze!==5)return e.callbackNode=null,e.callbackPriority=0,null;var l=e.callbackNode;if(wi()&&e.callbackNode!==l)return null;var a=se;return a=tl(e,e===Me?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(f0(e,a,t),M0(e,nt()),e.callbackNode!=null&&e.callbackNode===l?_0.bind(null,e):null)}function D0(e,t){if(wi())return null;f0(e,t,!0)}function gv(){Mv(function(){(pe&6)!==0?Fl(Tn,mv):A0()})}function tf(){if(jl===0){var e=Va;e===0&&(e=it,it<<=1,(it&261888)===0&&(it=256)),jl=e}return jl}function C0(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Hu(""+e)}function O0(e,t){var l=t.ownerDocument.createElement("input");return l.name=t.name,l.value=t.value,e.id&&l.setAttribute("form",e.id),t.parentNode.insertBefore(l,t),e=new FormData(e),l.parentNode.removeChild(l),e}function yv(e,t,l,a,n){if(t==="submit"&&l&&l.stateNode===n){var u=C0((n[dt]||null).action),c=a.submitter;c&&(t=(t=c[dt]||null)?C0(t.formAction):c.getAttribute("formAction"),t!==null&&(u=t,c=null));var r=new Lu("action","action",null,a,n);e.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(jl!==0){var d=c?O0(n,c):new FormData(n);Eo(l,{pending:!0,data:d,method:n.method,action:u},null,d)}}else typeof u=="function"&&(r.preventDefault(),d=c?O0(n,c):new FormData(n),Eo(l,{pending:!0,data:d,method:n.method,action:u},u,d))},currentTarget:n}]})}}for(var lf=0;lf<kc.length;lf++){var af=kc[lf],vv=af.toLowerCase(),bv=af[0].toUpperCase()+af.slice(1);Zt(vv,"on"+bv)}Zt(os,"onAnimationEnd"),Zt(fs,"onAnimationIteration"),Zt(rs,"onAnimationStart"),Zt("dblclick","onDoubleClick"),Zt("focusin","onFocus"),Zt("focusout","onBlur"),Zt(Ny,"onTransitionRun"),Zt(Hy,"onTransitionStart"),Zt(By,"onTransitionCancel"),Zt(ss,"onTransitionEnd"),Ua("onMouseEnter",["mouseout","mouseover"]),Ua("onMouseLeave",["mouseout","mouseover"]),Ua("onPointerEnter",["pointerout","pointerover"]),Ua("onPointerLeave",["pointerout","pointerover"]),ta("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ta("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ta("onBeforeInput",["compositionend","keypress","textInput","paste"]),ta("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ta("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ta("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var iu="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(iu));function U0(e,t){t=(t&4)!==0;for(var l=0;l<e.length;l++){var a=e[l],n=a.event;a=a.listeners;e:{var u=void 0;if(t)for(var c=a.length-1;0<=c;c--){var r=a[c],d=r.instance,w=r.currentTarget;if(r=r.listener,d!==u&&n.isPropagationStopped())break e;u=r,n.currentTarget=w;try{u(n)}catch(D){Gu(D)}n.currentTarget=null,u=d}else for(c=0;c<a.length;c++){if(r=a[c],d=r.instance,w=r.currentTarget,r=r.listener,d!==u&&n.isPropagationStopped())break e;u=r,n.currentTarget=w;try{u(n)}catch(D){Gu(D)}n.currentTarget=null,u=d}}}}function re(e,t){var l=t[gc];l===void 0&&(l=t[gc]=new Set);var a=e+"__bubble";l.has(a)||(R0(t,e,2,!1),l.add(a))}function nf(e,t,l){var a=0;t&&(a|=4),R0(l,e,a,t)}var _i="_reactListening"+Math.random().toString(36).slice(2);function uf(e){if(!e[_i]){e[_i]=!0,Ar.forEach(function(l){l!=="selectionchange"&&(pv.has(l)||nf(l,!1,e),nf(l,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_i]||(t[_i]=!0,nf("selectionchange",!1,t))}}function R0(e,t,l,a){switch(oh(t)){case 2:var n=Kv;break;case 8:n=Jv;break;default:n=Ef}l=n.bind(null,t,l,e),n=void 0,!zc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),a?n!==void 0?e.addEventListener(t,l,{capture:!0,passive:n}):e.addEventListener(t,l,!0):n!==void 0?e.addEventListener(t,l,{passive:n}):e.addEventListener(t,l,!1)}function cf(e,t,l,a,n){var u=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var c=a.tag;if(c===3||c===4){var r=a.stateNode.containerInfo;if(r===n)break;if(c===4)for(c=a.return;c!==null;){var d=c.tag;if((d===3||d===4)&&c.stateNode.containerInfo===n)return;c=c.return}for(;r!==null;){if(c=Da(r),c===null)return;if(d=c.tag,d===5||d===6||d===26||d===27){a=u=c;continue e}r=r.parentNode}}a=a.return}qr(function(){var w=u,D=xc(l),U=[];e:{var A=ds.get(e);if(A!==void 0){var M=Lu,Q=e;switch(e){case"keypress":if(ku(l)===0)break e;case"keydown":case"keyup":M=dy;break;case"focusin":Q="focus",M=_c;break;case"focusout":Q="blur",M=_c;break;case"beforeblur":case"afterblur":M=_c;break;case"click":if(l.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":M=jr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":M=ey;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":M=gy;break;case os:case fs:case rs:M=ay;break;case ss:M=vy;break;case"scroll":case"scrollend":M=Ig;break;case"wheel":M=py;break;case"copy":case"cut":case"paste":M=uy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":M=Xr;break;case"toggle":case"beforetoggle":M=Ey}var P=(t&4)!==0,Ae=!P&&(e==="scroll"||e==="scrollend"),E=P?A!==null?A+"Capture":null:A;P=[];for(var g=w,z;g!==null;){var O=g;if(z=O.stateNode,O=O.tag,O!==5&&O!==26&&O!==27||z===null||E===null||(O=_n(g,E),O!=null&&P.push(cu(g,O,z))),Ae)break;g=g.return}0<P.length&&(A=new M(A,Q,null,l,D),U.push({event:A,listeners:P}))}}if((t&7)===0){e:{if(A=e==="mouseover"||e==="pointerover",M=e==="mouseout"||e==="pointerout",A&&l!==Ec&&(Q=l.relatedTarget||l.fromElement)&&(Da(Q)||Q[_a]))break e;if((M||A)&&(A=D.window===D?D:(A=D.ownerDocument)?A.defaultView||A.parentWindow:window,M?(Q=l.relatedTarget||l.toElement,M=w,Q=Q?Da(Q):null,Q!==null&&(Ae=m(Q),P=Q.tag,Q!==Ae||P!==5&&P!==27&&P!==6)&&(Q=null)):(M=null,Q=w),M!==Q)){if(P=jr,O="onMouseLeave",E="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(P=Xr,O="onPointerLeave",E="onPointerEnter",g="pointer"),Ae=M==null?A:Mn(M),z=Q==null?A:Mn(Q),A=new P(O,g+"leave",M,l,D),A.target=Ae,A.relatedTarget=z,O=null,Da(D)===w&&(P=new P(E,g+"enter",Q,l,D),P.target=z,P.relatedTarget=Ae,O=P),Ae=O,M&&Q)t:{for(P=Sv,E=M,g=Q,z=0,O=E;O;O=P(O))z++;O=0;for(var I=g;I;I=P(I))O++;for(;0<z-O;)E=P(E),z--;for(;0<O-z;)g=P(g),O--;for(;z--;){if(E===g||g!==null&&E===g.alternate){P=E;break t}E=P(E),g=P(g)}P=null}else P=null;M!==null&&N0(U,A,M,P,!1),Q!==null&&Ae!==null&&N0(U,Ae,Q,P,!0)}}e:{if(A=w?Mn(w):window,M=A.nodeName&&A.nodeName.toLowerCase(),M==="select"||M==="input"&&A.type==="file")var ye=Fr;else if($r(A))if(Ir)ye=Oy;else{ye=Dy;var W=_y}else M=A.nodeName,!M||M.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?w&&Sc(w.elementType)&&(ye=Fr):ye=Cy;if(ye&&(ye=ye(e,w))){Wr(U,ye,l,D);break e}W&&W(e,A,w),e==="focusout"&&w&&A.type==="number"&&w.memoizedProps.value!=null&&pc(A,"number",A.value)}switch(W=w?Mn(w):window,e){case"focusin":($r(W)||W.contentEditable==="true")&&(qa=W,Nc=w,Bn=null);break;case"focusout":Bn=Nc=qa=null;break;case"mousedown":Hc=!0;break;case"contextmenu":case"mouseup":case"dragend":Hc=!1,is(U,l,D);break;case"selectionchange":if(Ry)break;case"keydown":case"keyup":is(U,l,D)}var ce;if(Cc)e:{switch(e){case"compositionstart":var de="onCompositionStart";break e;case"compositionend":de="onCompositionEnd";break e;case"compositionupdate":de="onCompositionUpdate";break e}de=void 0}else ka?Kr(e,l)&&(de="onCompositionEnd"):e==="keydown"&&l.keyCode===229&&(de="onCompositionStart");de&&(Qr&&l.locale!=="ko"&&(ka||de!=="onCompositionStart"?de==="onCompositionEnd"&&ka&&(ce=Lr()):(wl=D,wc="value"in wl?wl.value:wl.textContent,ka=!0)),W=Di(w,de),0<W.length&&(de=new Gr(de,e,null,l,D),U.push({event:de,listeners:W}),ce?de.data=ce:(ce=Jr(l),ce!==null&&(de.data=ce)))),(ce=Ty?zy(e,l):wy(e,l))&&(de=Di(w,"onBeforeInput"),0<de.length&&(W=new Gr("onBeforeInput","beforeinput",null,l,D),U.push({event:W,listeners:de}),W.data=ce)),yv(U,e,w,l,D)}U0(U,t)})}function cu(e,t,l){return{instance:e,listener:t,currentTarget:l}}function Di(e,t){for(var l=t+"Capture",a=[];e!==null;){var n=e,u=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||u===null||(n=_n(e,l),n!=null&&a.unshift(cu(e,n,u)),n=_n(e,t),n!=null&&a.push(cu(e,n,u))),e.tag===3)return a;e=e.return}return[]}function Sv(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function N0(e,t,l,a,n){for(var u=t._reactName,c=[];l!==null&&l!==a;){var r=l,d=r.alternate,w=r.stateNode;if(r=r.tag,d!==null&&d===a)break;r!==5&&r!==26&&r!==27||w===null||(d=w,n?(w=_n(l,u),w!=null&&c.unshift(cu(l,w,d))):n||(w=_n(l,u),w!=null&&c.push(cu(l,w,d)))),l=l.return}c.length!==0&&e.push({event:t,listeners:c})}var Ev=/\r\n?/g,xv=/\u0000|\uFFFD/g;function H0(e){return(typeof e=="string"?e:""+e).replace(Ev,`
`).replace(xv,"")}function B0(e,t){return t=H0(t),H0(e)===t}function we(e,t,l,a,n,u){switch(l){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Na(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Na(e,""+a);break;case"className":Ru(e,"class",a);break;case"tabIndex":Ru(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Ru(e,l,a);break;case"style":Br(e,a,u);break;case"data":if(t!=="object"){Ru(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||l!=="href")){e.removeAttribute(l);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(l);break}a=Hu(""+a),e.setAttribute(l,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(l,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(l==="formAction"?(t!=="input"&&we(e,t,"name",n.name,n,null),we(e,t,"formEncType",n.formEncType,n,null),we(e,t,"formMethod",n.formMethod,n,null),we(e,t,"formTarget",n.formTarget,n,null)):(we(e,t,"encType",n.encType,n,null),we(e,t,"method",n.method,n,null),we(e,t,"target",n.target,n,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(l);break}a=Hu(""+a),e.setAttribute(l,a);break;case"onClick":a!=null&&(e.onclick=al);break;case"onScroll":a!=null&&re("scroll",e);break;case"onScrollEnd":a!=null&&re("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(l=a.__html,l!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=l}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}l=Hu(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",l);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(l,""+a):e.removeAttribute(l);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(l,""):e.removeAttribute(l);break;case"capture":case"download":a===!0?e.setAttribute(l,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(l,a):e.removeAttribute(l);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(l,a):e.removeAttribute(l);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(l):e.setAttribute(l,a);break;case"popover":re("beforetoggle",e),re("toggle",e),Uu(e,"popover",a);break;case"xlinkActuate":ll(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":ll(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":ll(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":ll(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":ll(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":ll(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":ll(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":ll(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":ll(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Uu(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<l.length)||l[0]!=="o"&&l[0]!=="O"||l[1]!=="n"&&l[1]!=="N")&&(l=Wg.get(l)||l,Uu(e,l,a))}}function of(e,t,l,a,n,u){switch(l){case"style":Br(e,a,u);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(l=a.__html,l!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=l}}break;case"children":typeof a=="string"?Na(e,a):(typeof a=="number"||typeof a=="bigint")&&Na(e,""+a);break;case"onScroll":a!=null&&re("scroll",e);break;case"onScrollEnd":a!=null&&re("scrollend",e);break;case"onClick":a!=null&&(e.onclick=al);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Mr.hasOwnProperty(l))e:{if(l[0]==="o"&&l[1]==="n"&&(n=l.endsWith("Capture"),t=l.slice(2,n?l.length-7:void 0),u=e[dt]||null,u=u!=null?u[l]:null,typeof u=="function"&&e.removeEventListener(t,u,n),typeof a=="function")){typeof u!="function"&&u!==null&&(l in e?e[l]=null:e.hasAttribute(l)&&e.removeAttribute(l)),e.addEventListener(t,a,n);break e}l in e?e[l]=a:a===!0?e.setAttribute(l,""):Uu(e,l,a)}}}function lt(e,t,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":re("error",e),re("load",e);var a=!1,n=!1,u;for(u in l)if(l.hasOwnProperty(u)){var c=l[u];if(c!=null)switch(u){case"src":a=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:we(e,t,u,c,l,null)}}n&&we(e,t,"srcSet",l.srcSet,l,null),a&&we(e,t,"src",l.src,l,null);return;case"input":re("invalid",e);var r=u=c=n=null,d=null,w=null;for(a in l)if(l.hasOwnProperty(a)){var D=l[a];if(D!=null)switch(a){case"name":n=D;break;case"type":c=D;break;case"checked":d=D;break;case"defaultChecked":w=D;break;case"value":u=D;break;case"defaultValue":r=D;break;case"children":case"dangerouslySetInnerHTML":if(D!=null)throw Error(o(137,t));break;default:we(e,t,a,D,l,null)}}Ur(e,u,r,d,w,c,n,!1);return;case"select":re("invalid",e),a=c=u=null;for(n in l)if(l.hasOwnProperty(n)&&(r=l[n],r!=null))switch(n){case"value":u=r;break;case"defaultValue":c=r;break;case"multiple":a=r;default:we(e,t,n,r,l,null)}t=u,l=c,e.multiple=!!a,t!=null?Ra(e,!!a,t,!1):l!=null&&Ra(e,!!a,l,!0);return;case"textarea":re("invalid",e),u=n=a=null;for(c in l)if(l.hasOwnProperty(c)&&(r=l[c],r!=null))switch(c){case"value":a=r;break;case"defaultValue":n=r;break;case"children":u=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(o(91));break;default:we(e,t,c,r,l,null)}Nr(e,a,n,u);return;case"option":for(d in l)l.hasOwnProperty(d)&&(a=l[d],a!=null)&&(d==="selected"?e.selected=a&&typeof a!="function"&&typeof a!="symbol":we(e,t,d,a,l,null));return;case"dialog":re("beforetoggle",e),re("toggle",e),re("cancel",e),re("close",e);break;case"iframe":case"object":re("load",e);break;case"video":case"audio":for(a=0;a<iu.length;a++)re(iu[a],e);break;case"image":re("error",e),re("load",e);break;case"details":re("toggle",e);break;case"embed":case"source":case"link":re("error",e),re("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(w in l)if(l.hasOwnProperty(w)&&(a=l[w],a!=null))switch(w){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:we(e,t,w,a,l,null)}return;default:if(Sc(t)){for(D in l)l.hasOwnProperty(D)&&(a=l[D],a!==void 0&&of(e,t,D,a,l,void 0));return}}for(r in l)l.hasOwnProperty(r)&&(a=l[r],a!=null&&we(e,t,r,a,l,null))}function Tv(e,t,l,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,u=null,c=null,r=null,d=null,w=null,D=null;for(M in l){var U=l[M];if(l.hasOwnProperty(M)&&U!=null)switch(M){case"checked":break;case"value":break;case"defaultValue":d=U;default:a.hasOwnProperty(M)||we(e,t,M,null,a,U)}}for(var A in a){var M=a[A];if(U=l[A],a.hasOwnProperty(A)&&(M!=null||U!=null))switch(A){case"type":u=M;break;case"name":n=M;break;case"checked":w=M;break;case"defaultChecked":D=M;break;case"value":c=M;break;case"defaultValue":r=M;break;case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(o(137,t));break;default:M!==U&&we(e,t,A,M,a,U)}}bc(e,c,r,d,w,D,u,n);return;case"select":M=c=r=A=null;for(u in l)if(d=l[u],l.hasOwnProperty(u)&&d!=null)switch(u){case"value":break;case"multiple":M=d;default:a.hasOwnProperty(u)||we(e,t,u,null,a,d)}for(n in a)if(u=a[n],d=l[n],a.hasOwnProperty(n)&&(u!=null||d!=null))switch(n){case"value":A=u;break;case"defaultValue":r=u;break;case"multiple":c=u;default:u!==d&&we(e,t,n,u,a,d)}t=r,l=c,a=M,A!=null?Ra(e,!!l,A,!1):!!a!=!!l&&(t!=null?Ra(e,!!l,t,!0):Ra(e,!!l,l?[]:"",!1));return;case"textarea":M=A=null;for(r in l)if(n=l[r],l.hasOwnProperty(r)&&n!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:we(e,t,r,null,a,n)}for(c in a)if(n=a[c],u=l[c],a.hasOwnProperty(c)&&(n!=null||u!=null))switch(c){case"value":A=n;break;case"defaultValue":M=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(o(91));break;default:n!==u&&we(e,t,c,n,a,u)}Rr(e,A,M);return;case"option":for(var Q in l)A=l[Q],l.hasOwnProperty(Q)&&A!=null&&!a.hasOwnProperty(Q)&&(Q==="selected"?e.selected=!1:we(e,t,Q,null,a,A));for(d in a)A=a[d],M=l[d],a.hasOwnProperty(d)&&A!==M&&(A!=null||M!=null)&&(d==="selected"?e.selected=A&&typeof A!="function"&&typeof A!="symbol":we(e,t,d,A,a,M));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var P in l)A=l[P],l.hasOwnProperty(P)&&A!=null&&!a.hasOwnProperty(P)&&we(e,t,P,null,a,A);for(w in a)if(A=a[w],M=l[w],a.hasOwnProperty(w)&&A!==M&&(A!=null||M!=null))switch(w){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(o(137,t));break;default:we(e,t,w,A,a,M)}return;default:if(Sc(t)){for(var Ae in l)A=l[Ae],l.hasOwnProperty(Ae)&&A!==void 0&&!a.hasOwnProperty(Ae)&&of(e,t,Ae,void 0,a,A);for(D in a)A=a[D],M=l[D],!a.hasOwnProperty(D)||A===M||A===void 0&&M===void 0||of(e,t,D,A,a,M);return}}for(var E in l)A=l[E],l.hasOwnProperty(E)&&A!=null&&!a.hasOwnProperty(E)&&we(e,t,E,null,a,A);for(U in a)A=a[U],M=l[U],!a.hasOwnProperty(U)||A===M||A==null&&M==null||we(e,t,U,A,a,M)}function k0(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function zv(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,l=performance.getEntriesByType("resource"),a=0;a<l.length;a++){var n=l[a],u=n.transferSize,c=n.initiatorType,r=n.duration;if(u&&r&&k0(c)){for(c=0,r=n.responseEnd,a+=1;a<l.length;a++){var d=l[a],w=d.startTime;if(w>r)break;var D=d.transferSize,U=d.initiatorType;D&&k0(U)&&(d=d.responseEnd,c+=D*(d<r?1:(r-w)/(d-w)))}if(--a,t+=8*(u+c)/(n.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ff=null,rf=null;function Ci(e){return e.nodeType===9?e:e.ownerDocument}function q0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function L0(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function sf(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var df=null;function wv(){var e=window.event;return e&&e.type==="popstate"?e===df?!1:(df=e,!0):(df=null,!1)}var Y0=typeof setTimeout=="function"?setTimeout:void 0,Av=typeof clearTimeout=="function"?clearTimeout:void 0,j0=typeof Promise=="function"?Promise:void 0,Mv=typeof queueMicrotask=="function"?queueMicrotask:typeof j0!="undefined"?function(e){return j0.resolve(null).then(e).catch(_v)}:Y0;function _v(e){setTimeout(function(){throw e})}function Gl(e){return e==="head"}function G0(e,t){var l=t,a=0;do{var n=l.nextSibling;if(e.removeChild(l),n&&n.nodeType===8)if(l=n.data,l==="/$"||l==="/&"){if(a===0){e.removeChild(n),dn(t);return}a--}else if(l==="$"||l==="$?"||l==="$~"||l==="$!"||l==="&")a++;else if(l==="html")ou(e.ownerDocument.documentElement);else if(l==="head"){l=e.ownerDocument.head,ou(l);for(var u=l.firstChild;u;){var c=u.nextSibling,r=u.nodeName;u[An]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&u.rel.toLowerCase()==="stylesheet"||l.removeChild(u),u=c}}else l==="body"&&ou(e.ownerDocument.body);l=n}while(l);dn(t)}function X0(e,t){var l=e;e=0;do{var a=l.nextSibling;if(l.nodeType===1?t?(l._stashedDisplay=l.style.display,l.style.display="none"):(l.style.display=l._stashedDisplay||"",l.getAttribute("style")===""&&l.removeAttribute("style")):l.nodeType===3&&(t?(l._stashedText=l.nodeValue,l.nodeValue=""):l.nodeValue=l._stashedText||""),a&&a.nodeType===8)if(l=a.data,l==="/$"){if(e===0)break;e--}else l!=="$"&&l!=="$?"&&l!=="$~"&&l!=="$!"||e++;l=a}while(l)}function hf(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var l=t;switch(t=t.nextSibling,l.nodeName){case"HTML":case"HEAD":case"BODY":hf(l),yc(l);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(l.rel.toLowerCase()==="stylesheet")continue}e.removeChild(l)}}function Dv(e,t,l,a){for(;e.nodeType===1;){var n=l;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[An])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(u=e.getAttribute("rel"),u==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(u!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(u=e.getAttribute("src"),(u!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&u&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var u=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===u)return e}else return e;if(e=Yt(e.nextSibling),e===null)break}return null}function Cv(e,t,l){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!l||(e=Yt(e.nextSibling),e===null))return null;return e}function Q0(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Yt(e.nextSibling),e===null))return null;return e}function mf(e){return e.data==="$?"||e.data==="$~"}function gf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Ov(e,t){var l=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||l.readyState!=="loading")t();else{var a=function(){t(),l.removeEventListener("DOMContentLoaded",a)};l.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var yf=null;function Z0(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="/$"||l==="/&"){if(t===0)return Yt(e.nextSibling);t--}else l!=="$"&&l!=="$!"&&l!=="$?"&&l!=="$~"&&l!=="&"||t++}e=e.nextSibling}return null}function V0(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="$"||l==="$!"||l==="$?"||l==="$~"||l==="&"){if(t===0)return e;t--}else l!=="/$"&&l!=="/&"||t++}e=e.previousSibling}return null}function K0(e,t,l){switch(t=Ci(l),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function ou(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);yc(e)}var jt=new Map,J0=new Set;function Oi(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var pl=H.d;H.d={f:Uv,r:Rv,D:Nv,C:Hv,L:Bv,m:kv,X:Lv,S:qv,M:Yv};function Uv(){var e=pl.f(),t=xi();return e||t}function Rv(e){var t=Ca(e);t!==null&&t.tag===5&&t.type==="form"?sd(t):pl.r(e)}var fn=typeof document=="undefined"?null:document;function $0(e,t,l){var a=fn;if(a&&typeof t=="string"&&t){var n=Rt(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof l=="string"&&(n+='[crossorigin="'+l+'"]'),J0.has(n)||(J0.add(n),e={rel:e,crossOrigin:l,href:t},a.querySelector(n)===null&&(t=a.createElement("link"),lt(t,"link",e),Je(t),a.head.appendChild(t)))}}function Nv(e){pl.D(e),$0("dns-prefetch",e,null)}function Hv(e,t){pl.C(e,t),$0("preconnect",e,t)}function Bv(e,t,l){pl.L(e,t,l);var a=fn;if(a&&e&&t){var n='link[rel="preload"][as="'+Rt(t)+'"]';t==="image"&&l&&l.imageSrcSet?(n+='[imagesrcset="'+Rt(l.imageSrcSet)+'"]',typeof l.imageSizes=="string"&&(n+='[imagesizes="'+Rt(l.imageSizes)+'"]')):n+='[href="'+Rt(e)+'"]';var u=n;switch(t){case"style":u=rn(e);break;case"script":u=sn(e)}jt.has(u)||(e=_({rel:"preload",href:t==="image"&&l&&l.imageSrcSet?void 0:e,as:t},l),jt.set(u,e),a.querySelector(n)!==null||t==="style"&&a.querySelector(fu(u))||t==="script"&&a.querySelector(ru(u))||(t=a.createElement("link"),lt(t,"link",e),Je(t),a.head.appendChild(t)))}}function kv(e,t){pl.m(e,t);var l=fn;if(l&&e){var a=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+Rt(a)+'"][href="'+Rt(e)+'"]',u=n;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=sn(e)}if(!jt.has(u)&&(e=_({rel:"modulepreload",href:e},t),jt.set(u,e),l.querySelector(n)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(l.querySelector(ru(u)))return}a=l.createElement("link"),lt(a,"link",e),Je(a),l.head.appendChild(a)}}}function qv(e,t,l){pl.S(e,t,l);var a=fn;if(a&&e){var n=Oa(a).hoistableStyles,u=rn(e);t=t||"default";var c=n.get(u);if(!c){var r={loading:0,preload:null};if(c=a.querySelector(fu(u)))r.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":t},l),(l=jt.get(u))&&vf(e,l);var d=c=a.createElement("link");Je(d),lt(d,"link",e),d._p=new Promise(function(w,D){d.onload=w,d.onerror=D}),d.addEventListener("load",function(){r.loading|=1}),d.addEventListener("error",function(){r.loading|=2}),r.loading|=4,Ui(c,t,a)}c={type:"stylesheet",instance:c,count:1,state:r},n.set(u,c)}}}function Lv(e,t){pl.X(e,t);var l=fn;if(l&&e){var a=Oa(l).hoistableScripts,n=sn(e),u=a.get(n);u||(u=l.querySelector(ru(n)),u||(e=_({src:e,async:!0},t),(t=jt.get(n))&&bf(e,t),u=l.createElement("script"),Je(u),lt(u,"link",e),l.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},a.set(n,u))}}function Yv(e,t){pl.M(e,t);var l=fn;if(l&&e){var a=Oa(l).hoistableScripts,n=sn(e),u=a.get(n);u||(u=l.querySelector(ru(n)),u||(e=_({src:e,async:!0,type:"module"},t),(t=jt.get(n))&&bf(e,t),u=l.createElement("script"),Je(u),lt(u,"link",e),l.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},a.set(n,u))}}function W0(e,t,l,a){var n=(n=ne.current)?Oi(n):null;if(!n)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof l.precedence=="string"&&typeof l.href=="string"?(t=rn(l.href),l=Oa(n).hoistableStyles,a=l.get(t),a||(a={type:"style",instance:null,count:0,state:null},l.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(l.rel==="stylesheet"&&typeof l.href=="string"&&typeof l.precedence=="string"){e=rn(l.href);var u=Oa(n).hoistableStyles,c=u.get(e);if(c||(n=n.ownerDocument||n,c={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,c),(u=n.querySelector(fu(e)))&&!u._p&&(c.instance=u,c.state.loading=5),jt.has(e)||(l={rel:"preload",as:"style",href:l.href,crossOrigin:l.crossOrigin,integrity:l.integrity,media:l.media,hrefLang:l.hrefLang,referrerPolicy:l.referrerPolicy},jt.set(e,l),u||jv(n,e,l,c.state))),t&&a===null)throw Error(o(528,""));return c}if(t&&a!==null)throw Error(o(529,""));return null;case"script":return t=l.async,l=l.src,typeof l=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=sn(l),l=Oa(n).hoistableScripts,a=l.get(t),a||(a={type:"script",instance:null,count:0,state:null},l.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function rn(e){return'href="'+Rt(e)+'"'}function fu(e){return'link[rel="stylesheet"]['+e+"]"}function F0(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function jv(e,t,l,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),lt(t,"link",l),Je(t),e.head.appendChild(t))}function sn(e){return'[src="'+Rt(e)+'"]'}function ru(e){return"script[async]"+e}function I0(e,t,l){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Rt(l.href)+'"]');if(a)return t.instance=a,Je(a),a;var n=_({},l,{"data-href":l.href,"data-precedence":l.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Je(a),lt(a,"style",n),Ui(a,l.precedence,e),t.instance=a;case"stylesheet":n=rn(l.href);var u=e.querySelector(fu(n));if(u)return t.state.loading|=4,t.instance=u,Je(u),u;a=F0(l),(n=jt.get(n))&&vf(a,n),u=(e.ownerDocument||e).createElement("link"),Je(u);var c=u;return c._p=new Promise(function(r,d){c.onload=r,c.onerror=d}),lt(u,"link",a),t.state.loading|=4,Ui(u,l.precedence,e),t.instance=u;case"script":return u=sn(l.src),(n=e.querySelector(ru(u)))?(t.instance=n,Je(n),n):(a=l,(n=jt.get(u))&&(a=_({},l),bf(a,n)),e=e.ownerDocument||e,n=e.createElement("script"),Je(n),lt(n,"link",a),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,Ui(a,l.precedence,e));return t.instance}function Ui(e,t,l){for(var a=l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=a.length?a[a.length-1]:null,u=n,c=0;c<a.length;c++){var r=a[c];if(r.dataset.precedence===t)u=r;else if(u!==n)break}u?u.parentNode.insertBefore(e,u.nextSibling):(t=l.nodeType===9?l.head:l,t.insertBefore(e,t.firstChild))}function vf(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function bf(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Ri=null;function P0(e,t,l){if(Ri===null){var a=new Map,n=Ri=new Map;n.set(l,a)}else n=Ri,a=n.get(l),a||(a=new Map,n.set(l,a));if(a.has(e))return a;for(a.set(e,null),l=l.getElementsByTagName(e),n=0;n<l.length;n++){var u=l[n];if(!(u[An]||u[Ie]||e==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var c=u.getAttribute(t)||"";c=e+c;var r=a.get(c);r?r.push(u):a.set(c,[u])}}return a}function eh(e,t,l){e=e.ownerDocument||e,e.head.insertBefore(l,t==="title"?e.querySelector("head > title"):null)}function Gv(e,t,l){if(l===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function th(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Xv(e,t,l,a){if(l.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(l.state.loading&4)===0){if(l.instance===null){var n=rn(a.href),u=t.querySelector(fu(n));if(u){t=u._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Ni.bind(e),t.then(e,e)),l.state.loading|=4,l.instance=u,Je(u);return}u=t.ownerDocument||t,a=F0(a),(n=jt.get(n))&&vf(a,n),u=u.createElement("link"),Je(u);var c=u;c._p=new Promise(function(r,d){c.onload=r,c.onerror=d}),lt(u,"link",a),l.instance=u}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(l,t),(t=l.state.preload)&&(l.state.loading&3)===0&&(e.count++,l=Ni.bind(e),t.addEventListener("load",l),t.addEventListener("error",l))}}var pf=0;function Qv(e,t){return e.stylesheets&&e.count===0&&Bi(e,e.stylesheets),0<e.count||0<e.imgCount?function(l){var a=setTimeout(function(){if(e.stylesheets&&Bi(e,e.stylesheets),e.unsuspend){var u=e.unsuspend;e.unsuspend=null,u()}},6e4+t);0<e.imgBytes&&pf===0&&(pf=62500*zv());var n=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Bi(e,e.stylesheets),e.unsuspend)){var u=e.unsuspend;e.unsuspend=null,u()}},(e.imgBytes>pf?50:800)+t);return e.unsuspend=l,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(n)}}:null}function Ni(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Bi(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Hi=null;function Bi(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Hi=new Map,t.forEach(Zv,e),Hi=null,Ni.call(e))}function Zv(e,t){if(!(t.state.loading&4)){var l=Hi.get(e);if(l)var a=l.get(null);else{l=new Map,Hi.set(e,l);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<n.length;u++){var c=n[u];(c.nodeName==="LINK"||c.getAttribute("media")!=="not all")&&(l.set(c.dataset.precedence,c),a=c)}a&&l.set(null,a)}n=t.instance,c=n.getAttribute("data-precedence"),u=l.get(c)||a,u===a&&l.set(null,n),l.set(c,n),this.count++,a=Ni.bind(this),n.addEventListener("load",a),n.addEventListener("error",a),u?u.parentNode.insertBefore(n,u.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var su={$$typeof:q,Provider:null,Consumer:null,_currentValue:F,_currentValue2:F,_threadCount:0};function Vv(e,t,l,a,n,u,c,r,d){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ma(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ma(0),this.hiddenUpdates=Ma(null),this.identifierPrefix=a,this.onUncaughtError=n,this.onCaughtError=u,this.onRecoverableError=c,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=d,this.incompleteTransitions=new Map}function lh(e,t,l,a,n,u,c,r,d,w,D,U){return e=new Vv(e,t,l,c,d,w,D,U,r),t=1,u===!0&&(t|=24),u=xt(3,null,null,t),e.current=u,u.stateNode=e,t=Wc(),t.refCount++,e.pooledCache=t,t.refCount++,u.memoizedState={element:a,isDehydrated:l,cache:t},eo(u),e}function ah(e){return e?(e=ja,e):ja}function nh(e,t,l,a,n,u){n=ah(n),a.context===null?a.context=n:a.pendingContext=n,a=Ol(t),a.payload={element:l},u=u===void 0?null:u,u!==null&&(a.callback=u),l=Ul(e,a,t),l!==null&&(bt(l,e,t),Xn(l,e,t))}function uh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var l=e.retryLane;e.retryLane=l!==0&&l<t?l:t}}function Sf(e,t){uh(e,t),(e=e.alternate)&&uh(e,t)}function ih(e){if(e.tag===13||e.tag===31){var t=ua(e,67108864);t!==null&&bt(t,e,67108864),Sf(e,67108864)}}function ch(e){if(e.tag===13||e.tag===31){var t=Mt();t=hc(t);var l=ua(e,t);l!==null&&bt(l,e,t),Sf(e,t)}}var ki=!0;function Kv(e,t,l,a){var n=T.T;T.T=null;var u=H.p;try{H.p=2,Ef(e,t,l,a)}finally{H.p=u,T.T=n}}function Jv(e,t,l,a){var n=T.T;T.T=null;var u=H.p;try{H.p=8,Ef(e,t,l,a)}finally{H.p=u,T.T=n}}function Ef(e,t,l,a){if(ki){var n=xf(a);if(n===null)cf(e,t,a,qi,l),fh(e,a);else if(Wv(n,e,t,l,a))a.stopPropagation();else if(fh(e,a),t&4&&-1<$v.indexOf(e)){for(;n!==null;){var u=Ca(n);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var c=ke(u.pendingLanes);if(c!==0){var r=u;for(r.pendingLanes|=2,r.entangledLanes|=2;c;){var d=1<<31-ut(c);r.entanglements[1]|=d,c&=~d}Pt(u),(pe&6)===0&&(Si=nt()+500,uu(0))}}break;case 31:case 13:r=ua(u,2),r!==null&&bt(r,u,2),xi(),Sf(u,2)}if(u=xf(a),u===null&&cf(e,t,a,qi,l),u===n)break;n=u}n!==null&&a.stopPropagation()}else cf(e,t,a,null,l)}}function xf(e){return e=xc(e),Tf(e)}var qi=null;function Tf(e){if(qi=null,e=Da(e),e!==null){var t=m(e);if(t===null)e=null;else{var l=t.tag;if(l===13){if(e=p(t),e!==null)return e;e=null}else if(l===31){if(e=b(t),e!==null)return e;e=null}else if(l===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return qi=e,null}function oh(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mu()){case Tn:return 2;case ct:return 8;case Pl:case _u:return 32;case zn:return 268435456;default:return 32}default:return 32}}var zf=!1,Xl=null,Ql=null,Zl=null,du=new Map,hu=new Map,Vl=[],$v="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function fh(e,t){switch(e){case"focusin":case"focusout":Xl=null;break;case"dragenter":case"dragleave":Ql=null;break;case"mouseover":case"mouseout":Zl=null;break;case"pointerover":case"pointerout":du.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":hu.delete(t.pointerId)}}function mu(e,t,l,a,n,u){return e===null||e.nativeEvent!==u?(e={blockedOn:t,domEventName:l,eventSystemFlags:a,nativeEvent:u,targetContainers:[n]},t!==null&&(t=Ca(t),t!==null&&ih(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function Wv(e,t,l,a,n){switch(t){case"focusin":return Xl=mu(Xl,e,t,l,a,n),!0;case"dragenter":return Ql=mu(Ql,e,t,l,a,n),!0;case"mouseover":return Zl=mu(Zl,e,t,l,a,n),!0;case"pointerover":var u=n.pointerId;return du.set(u,mu(du.get(u)||null,e,t,l,a,n)),!0;case"gotpointercapture":return u=n.pointerId,hu.set(u,mu(hu.get(u)||null,e,t,l,a,n)),!0}return!1}function rh(e){var t=Da(e.target);if(t!==null){var l=m(t);if(l!==null){if(t=l.tag,t===13){if(t=p(l),t!==null){e.blockedOn=t,zr(e.priority,function(){ch(l)});return}}else if(t===31){if(t=b(l),t!==null){e.blockedOn=t,zr(e.priority,function(){ch(l)});return}}else if(t===3&&l.stateNode.current.memoizedState.isDehydrated){e.blockedOn=l.tag===3?l.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Li(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var l=xf(e.nativeEvent);if(l===null){l=e.nativeEvent;var a=new l.constructor(l.type,l);Ec=a,l.target.dispatchEvent(a),Ec=null}else return t=Ca(l),t!==null&&ih(t),e.blockedOn=l,!1;t.shift()}return!0}function sh(e,t,l){Li(e)&&l.delete(t)}function Fv(){zf=!1,Xl!==null&&Li(Xl)&&(Xl=null),Ql!==null&&Li(Ql)&&(Ql=null),Zl!==null&&Li(Zl)&&(Zl=null),du.forEach(sh),hu.forEach(sh)}function Yi(e,t){e.blockedOn===t&&(e.blockedOn=null,zf||(zf=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,Fv)))}var ji=null;function dh(e){ji!==e&&(ji=e,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){ji===e&&(ji=null);for(var t=0;t<e.length;t+=3){var l=e[t],a=e[t+1],n=e[t+2];if(typeof a!="function"){if(Tf(a||l)===null)continue;break}var u=Ca(l);u!==null&&(e.splice(t,3),t-=3,Eo(u,{pending:!0,data:n,method:l.method,action:a},a,n))}}))}function dn(e){function t(d){return Yi(d,e)}Xl!==null&&Yi(Xl,e),Ql!==null&&Yi(Ql,e),Zl!==null&&Yi(Zl,e),du.forEach(t),hu.forEach(t);for(var l=0;l<Vl.length;l++){var a=Vl[l];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Vl.length&&(l=Vl[0],l.blockedOn===null);)rh(l),l.blockedOn===null&&Vl.shift();if(l=(e.ownerDocument||e).$$reactFormReplay,l!=null)for(a=0;a<l.length;a+=3){var n=l[a],u=l[a+1],c=n[dt]||null;if(typeof u=="function")c||dh(l);else if(c){var r=null;if(u&&u.hasAttribute("formAction")){if(n=u,c=u[dt]||null)r=c.formAction;else if(Tf(n)!==null)continue}else r=c.action;typeof r=="function"?l[a+1]=r:(l.splice(a,3),a-=3),dh(l)}}}function hh(){function e(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(c){return n=c})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),a||setTimeout(l,20)}function l(){if(!a&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,n=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(l,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function wf(e){this._internalRoot=e}Gi.prototype.render=wf.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var l=t.current,a=Mt();nh(l,a,e,t,null,null)},Gi.prototype.unmount=wf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;nh(e.current,2,null,e,null,null),xi(),t[_a]=null}};function Gi(e){this._internalRoot=e}Gi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Tr();e={blockedOn:null,target:e,priority:t};for(var l=0;l<Vl.length&&t!==0&&t<Vl[l].priority;l++);Vl.splice(l,0,e),l===0&&rh(e)}};var mh=f.version;if(mh!=="19.2.3")throw Error(o(527,mh,"19.2.3"));H.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=v(t),e=e!==null?x(e):null,e=e===null?null:e.stateNode,e};var Iv={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:T,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"){var Xi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xi.isDisabled&&Xi.supportsFiber)try{St=Xi.inject(Iv),ot=Xi}catch(e){}}return mn.createRoot=function(e,t){if(!h(e))throw Error(o(299));var l=!1,a="",n=Ed,u=xd,c=Td;return t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(u=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,l,a,null,n,u,c,hh),e[_a]=t.current,uf(e),new wf(t)},mn.hydrateRoot=function(e,t,l){if(!h(e))throw Error(o(299));var a=!1,n="",u=Ed,c=xd,r=Td,d=null;return l!=null&&(l.unstable_strictMode===!0&&(a=!0),l.identifierPrefix!==void 0&&(n=l.identifierPrefix),l.onUncaughtError!==void 0&&(u=l.onUncaughtError),l.onCaughtError!==void 0&&(c=l.onCaughtError),l.onRecoverableError!==void 0&&(r=l.onRecoverableError),l.formState!==void 0&&(d=l.formState)),t=lh(e,1,!0,t,l!=null?l:null,a,n,d,u,c,r,hh),t.context=ah(null),l=t.current,a=Mt(),a=hc(a),n=Ol(a),n.callback=null,Ul(l,n,a),l=a,t.current.lanes=l,Tl(t,l),Pt(t),e[_a]=t.current,uf(e),new Gi(t)},mn.version="19.2.3",mn}var Hf;function Ah(){if(Hf)return Zi.exports;Hf=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(f){console.error(f)}}return i(),Zi.exports=wh(),Zi.exports}var Mh=Ah(),K=$i();const Bf=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="22" y1="12" x2="18" y2="12"></line>
    <line x1="6" y1="12" x2="2" y2="12"></line>
    <line x1="12" y1="6" x2="12" y2="2"></line>
    <line x1="12" y1="22" x2="12" y2="18"></line>
  </svg>
`,_h=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`,Dh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
`,Ch=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
`,Oh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
`;function Uh(i=!1){return`
    <div class="feedback-screenshot-container" id="screenshot-dropzone">
      <input type="file" id="screenshot-file-input" class="feedback-file-input" accept="image/*" multiple ${i?"disabled":""} />
      <button
        type="button"
        class="feedback-select-button"
        data-tooltip="You may also drag and drop!"
        ${i?"disabled":""}
      >
        ${Dh}
        <span>Add Screenshot</span>
        ${Oh}
      </button>
      <div class="feedback-screenshot-menu">
        <button type="button" class="feedback-menu-item" data-action="capture">
          ${Bf}
          <span>Capture Region</span>
        </button>
        <button type="button" class="feedback-menu-item" data-action="upload">
          ${Ch}
          <span>Upload Image</span>
        </button>
      </div>
    </div>
  `}function Rh(i=0,f=null){const s=f?`
    <div class="selection-mode-warning">
      ${f}
    </div>
  `:"";return`
    <canvas class="selection-mode-canvas" id="selection-canvas"></canvas>
    <div class="selection-mode-overlay">
      <div class="selection-mode-toolbar">
        <div class="selection-mode-info">
          <span class="selection-mode-icon">${Bf}</span>
          <span class="selection-mode-text">Draw to capture region</span>
          <span class="selection-mode-counter">${i}/5 captured</span>
        </div>
        <div class="selection-mode-actions">
          <button type="button" class="selection-mode-done-button">
            ${_h}
            <span>Done</span>
          </button>
        </div>
      </div>
      ${s}
      <div class="selection-mode-hint">
        Press <kbd>ESC</kbd> to exit • Drag to select region
      </div>
    </div>
  `}function kf(){return'<canvas class="selection-mode-canvas display-only" id="selection-canvas"></canvas>'}function Nh(){const i={blue:"#00A3E1",blueHover:"#0090c7",charcoal:"#333F48",lightGray:"#D9D9D6",gray50:"#f8f9fa",gray100:"#f0f2f3",gray400:"#8f999f"};return`
    /* Select on Screen button in form */
    .feedback-select-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 20px 16px;
      background-color: ${i.gray50};
      color: ${i.charcoal};
      border: 1px dashed ${i.lightGray};
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .feedback-select-button:hover {
      background-color: ${i.gray100};
      border-color: ${i.gray400};
      color: ${i.charcoal};
    }

    .feedback-select-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.2);
      border-color: ${i.blue};
    }

    .feedback-select-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .feedback-select-button:disabled:hover {
      background-color: ${i.gray50};
      border-color: ${i.lightGray};
      color: ${i.charcoal};
    }

    .feedback-select-button svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Dropdown container - also serves as drag-drop zone */
    .feedback-screenshot-container {
      position: relative;
      width: 100%;
    }

    /* Drag-over state for the container */
    .feedback-screenshot-container.drag-over .feedback-select-button {
      border-color: ${i.blue};
      background: rgba(0, 163, 225, 0.05);
      border-style: solid;
    }

    /* Hidden file input */
    .feedback-file-input {
      display: none;
    }

    /* Dropdown menu */
    .feedback-screenshot-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid ${i.lightGray};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: none;
      z-index: 10;
      margin-top: 4px;
      overflow: hidden;
    }

    .feedback-screenshot-menu.open {
      display: block;
    }

    /* Menu items */
    .feedback-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: ${i.charcoal};
      text-align: left;
      transition: background 0.15s ease;
    }

    .feedback-menu-item:hover {
      background: ${i.gray100};
    }

    .feedback-menu-item:first-child {
      border-radius: 7px 7px 0 0;
    }

    .feedback-menu-item:last-child {
      border-radius: 0 0 7px 7px;
    }

    .feedback-menu-item svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Selection mode overlay with canvas */
    .selection-mode-overlay {
      position: fixed;
      inset: 0;
      z-index: 999998;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 20px;
      pointer-events: none;  /* Allow mouse events to pass through to canvas */
    }

    /* Full-viewport canvas for lasso drawing */
    .selection-mode-canvas {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      cursor: crosshair;
      z-index: 999997;
      pointer-events: auto;  /* Explicitly receive mouse events */
    }

    /* Display-only canvas - non-interactive, just shows rectangles */
    .selection-mode-canvas.display-only {
      pointer-events: none;
      cursor: default;
      z-index: 999990;  /* Lower z-index so it doesn't block interactions */
    }

    /* Toolbar at top - above canvas */
    .selection-mode-toolbar {
      position: relative;
      z-index: 1000000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      background-color: ${i.charcoal};
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      max-width: 90%;
      animation: selectionToolbarSlideIn 0.2s ease-out;
      pointer-events: auto;
    }

    @keyframes selectionToolbarSlideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .selection-mode-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .selection-mode-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .selection-mode-icon svg {
      width: 20px;
      height: 20px;
      fill: none;
      stroke: ${i.blue};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .selection-mode-text {
      font-size: 14px;
      font-weight: 500;
    }

    .selection-mode-counter {
      font-size: 13px;
      color: ${i.lightGray};
      padding: 4px 10px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
    }

    .selection-mode-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .selection-mode-done-button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background-color: ${i.blue};
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .selection-mode-done-button:hover {
      background-color: ${i.blueHover};
    }

    .selection-mode-done-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.4);
    }

    .selection-mode-done-button svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* ESC hint at bottom - above canvas */
    .selection-mode-hint {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${i.charcoal};
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      animation: selectionHintFadeIn 0.3s ease-out 0.2s both;
      pointer-events: auto;
      z-index: 1000000;
    }

    @keyframes selectionHintFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .selection-mode-hint kbd {
      display: inline-block;
      padding: 2px 6px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      margin: 0 2px;
    }

    /* Widget button in selection mode - special state */
    .feedback-widget-container.selection-mode .feedback-button {
      background-color: #ef4444;
      cursor: pointer;
    }

    .feedback-widget-container.selection-mode .feedback-button:hover {
      background-color: #dc2626;
    }

    /* Warning message */
    .selection-mode-warning {
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fef3c7;
      color: #92400e;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: warningSlideIn 0.2s ease-out;
      z-index: 1000000;
      pointer-events: auto;
    }

    @keyframes warningSlideIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    /* Rectangle badges for completed selections */
    .selection-rectangle-badge {
      position: fixed;
      z-index: 999998;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${i.blue};
      color: white;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  `}const _t={initCanvas(i){i.width=window.innerWidth,i.height=window.innerHeight;const f=i.getContext("2d");return f&&(f.imageSmoothingEnabled=!0),f},clearCanvas(i,f){i.clearRect(0,0,f.width,f.height)},drawRectangle(i,f,s,o,h,m=!1){i.fillStyle="rgba(0, 163, 225, 0.2)",i.fillRect(f,s,o,h),i.strokeStyle="#00A3E1",i.lineWidth=2,i.strokeRect(f,s,o,h),m&&(i.setLineDash([5,3]),i.strokeStyle="rgba(255, 255, 255, 0.5)",i.lineWidth=1,i.strokeRect(f+3,s+3,o-6,h-6),i.setLineDash([]))},drawBadge(i,f,s,o){const m=f+12,p=s+12;i.beginPath(),i.arc(m,p,12,0,2*Math.PI),i.fillStyle="#00A3E1",i.fill(),i.shadowColor="rgba(0, 0, 0, 0.3)",i.shadowBlur=4,i.shadowOffsetX=0,i.shadowOffsetY=2,i.fill(),i.shadowColor="transparent",i.shadowBlur=0,i.fillStyle="#ffffff",i.font="600 12px Montserrat, -apple-system, BlinkMacSystemFont, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(String(o),m,p)},redrawRectangles(i,f,s){_t.clearCanvas(i,f),s.forEach(o=>{_t.drawRectangle(i,o.x,o.y,o.width,o.height),_t.drawBadge(i,o.x,o.y,o.number)})},normalizeRect(i,f,s,o){const h=Math.min(i,s),m=Math.min(f,o),p=Math.abs(s-i),b=Math.abs(o-f);return{x:h,y:m,width:p,height:b}}},Hh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
`,Bh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m18 15-6-6-6 6"></path>
  </svg>
`,kh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
`,qh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
`;function Lh(i,f=!1){if(i.length===0)return"";const s=f?Bh:Hh;return`
    <div class="screenshot-list-container ${f?"expanded":""}">
      <button type="button" class="screenshot-list-badge" aria-expanded="${f}">
        <span class="screenshot-list-count">${i.length} screenshot${i.length>1?"s":""}</span>
        <span class="screenshot-list-chevron">${s}</span>
      </button>
      ${f?Yh(i):""}
    </div>
  `}function Yh(i){return`
    <div class="screenshot-list-expanded">
      <div class="screenshot-thumbnail-grid">
        ${i.map((s,o)=>`
    <div class="screenshot-thumbnail-item" data-screenshot-index="${o}" data-screenshot-id="${s.id}">
      <div class="screenshot-thumbnail-wrapper">
        <img
          src="${s.blobUrl}"
          alt="Screenshot ${o+1}"
          class="screenshot-thumbnail-image"
          loading="lazy"
        />
        <span class="screenshot-thumbnail-badge">${o+1}</span>
        <button
          type="button"
          class="screenshot-thumbnail-remove"
          aria-label="Remove screenshot ${o+1}"
          data-remove-index="${o}"
        >
          ${kh}
        </button>
      </div>
    </div>
  `).join("")}
      </div>
      <button type="button" class="screenshot-list-clear-all">
        ${qh}
        <span>Clear all</span>
      </button>
    </div>
  `}function jh(){const i={blue:"#00A3E1",blueHover:"#0090c7",blueLight:"#4dc3eb",lightGray:"#D9D9D6",gray50:"#f8f9fa"};return`
    /* Screenshot List Container */
    .screenshot-list-container {
      margin-top: -8px;
    }

    /* Collapsed Badge */
    .screenshot-list-badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 12px;
      background-color: rgba(0, 163, 225, 0.08);
      color: ${i.blueHover};
      border: 1px solid rgba(0, 163, 225, 0.3);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .screenshot-list-badge:hover {
      background-color: rgba(0, 163, 225, 0.12);
      border-color: ${i.blueLight};
    }

    .screenshot-list-badge:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 163, 225, 0.3);
    }

    .screenshot-list-container.expanded .screenshot-list-badge {
      border-radius: 8px 8px 0 0;
      border-bottom-color: transparent;
    }

    .screenshot-list-count {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .screenshot-list-chevron {
      display: flex;
      align-items: center;
    }

    .screenshot-list-chevron svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Expanded List */
    .screenshot-list-expanded {
      background-color: ${i.gray50};
      border: 1px solid rgba(0, 163, 225, 0.3);
      border-top: none;
      border-radius: 0 0 8px 8px;
      overflow: hidden;
    }

    /* Thumbnail Grid */
    .screenshot-thumbnail-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      max-height: 180px;
      overflow-y: auto;
    }

    /* Individual Thumbnail Item */
    .screenshot-thumbnail-item {
      position: relative;
      flex-shrink: 0;
    }

    .screenshot-thumbnail-wrapper {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 6px;
      overflow: hidden;
      border: 2px solid ${i.lightGray};
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }

    .screenshot-thumbnail-wrapper:hover {
      border-color: ${i.blue};
      box-shadow: 0 2px 8px rgba(0, 163, 225, 0.2);
    }

    .screenshot-thumbnail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Numbered Badge */
    .screenshot-thumbnail-badge {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: ${i.blue};
      color: white;
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    /* Remove Button */
    .screenshot-thumbnail-remove {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      border: none;
      background-color: rgba(220, 38, 38, 0.9);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.15s ease;
      padding: 0;
    }

    .screenshot-thumbnail-wrapper:hover .screenshot-thumbnail-remove {
      opacity: 1;
    }

    .screenshot-thumbnail-remove:hover {
      background-color: #dc2626;
    }

    .screenshot-thumbnail-remove:focus {
      outline: none;
      opacity: 1;
      box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
    }

    .screenshot-thumbnail-remove svg {
      width: 10px;
      height: 10px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Clear All Button */
    .screenshot-list-clear-all {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      padding: 8px 12px;
      background-color: transparent;
      color: #dc2626;
      border: none;
      border-top: 1px solid ${i.lightGray};
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .screenshot-list-clear-all:hover {
      background-color: #fef2f2;
    }

    .screenshot-list-clear-all:focus {
      outline: none;
      background-color: #fee2e2;
    }

    .screenshot-list-clear-all svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Screenshot Preview Modal (for clicking thumbnails) */
    .screenshot-preview-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000000;
      cursor: pointer;
    }

    .screenshot-preview-container {
      position: relative;
      max-width: 200px;
      max-height: 200px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    }

    .screenshot-preview-image {
      display: block;
      max-width: 200px;
      max-height: 200px;
      object-fit: contain;
      background-color: white;
    }

    .screenshot-preview-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border: none;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.15s ease;
    }

    .screenshot-preview-close:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .screenshot-preview-close svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `}const ue={charcoal:"#333F48",blue:"#00A3E1",blueHover:"#0090c7",blueLight:"#4dc3eb",background:"#ffffff",lightGray:"#D9D9D6",gray50:"#f8f9fa",gray100:"#f0f2f3",gray400:"#8f999f",gray500:"#6b7780",text:"#ffffff",textDark:"#333F48",shadowDark:"rgba(0, 0, 0, 0.25)"},rt={fontFamily:"'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",weightRegular:400,weightMedium:500,trackingTight:"-0.02em",trackingWide:"0.08em"},Gh=()=>`
  :host {
    all: initial;
    font-family: ${rt.fontFamily};
  }

  * {
    box-sizing: border-box;
  }

  /* ===== MORPHING WIDGET CONTAINER ===== */
  .feedback-widget-morph {
    position: fixed;
    z-index: 999999;
    font-family: ${rt.fontFamily};
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${ue.blue};
    box-shadow: 0 4px 12px ${ue.shadowDark};
    transition:
      width 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      border-radius 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .feedback-widget-morph.dragging {
    cursor: grabbing;
    transition: none;
  }

  /* Enable position transitions only during snap-to-corner animation */
  .feedback-widget-morph.animating-to-corner {
    transition:
      left 0.1s ease-out,
      top 0.1s ease-out,
      right 0.1s ease-out,
      bottom 0.1s ease-out,
      width 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      border-radius 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Disable transitions when initializing (fallback) */
  .feedback-widget-morph.initializing {
    transition: none;
  }

  .feedback-widget-morph.expanded {
    width: 320px;
    height: 346px;
    border-radius: 12px;
    background-color: ${ue.background};
    box-shadow: 0 10px 40px ${ue.shadowDark}, 0 0 0 1px ${ue.lightGray};
    cursor: default;
  }

  /* ===== BUTTON LAYER (visible when collapsed) ===== */
  .button-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.15s ease;
    pointer-events: auto;
    z-index: 2;
  }

  .expanded .button-layer {
    opacity: 0;
    pointer-events: none;
    z-index: 0;
  }

  .button-layer svg {
    width: 24px;
    height: 24px;
    color: ${ue.text};
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-widget-morph:not(.expanded):hover {
    background-color: ${ue.blueHover};
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${ue.shadowDark};
  }

  .feedback-widget-morph:not(.expanded):active {
    transform: scale(0.98);
  }

  /* ===== FORM LAYER (visible when expanded) ===== */
  .form-layer {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.08s ease 0.04s;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  .expanded .form-layer {
    opacity: 1;
    pointer-events: auto;
    z-index: 3;
  }

  /* Collapse transition - no delay */
  .feedback-widget-morph:not(.expanded) .form-layer {
    transition: opacity 0.1s ease;
  }

  /* ===== TOOLTIP ===== */
  .feedback-tooltip {
    position: fixed;
    background-color: ${ue.charcoal};
    color: ${ue.text};
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: ${rt.weightMedium};
    letter-spacing: ${rt.trackingWide};
    text-transform: uppercase;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    pointer-events: none;
    z-index: 2147483647;
  }

  .feedback-tooltip.visible {
    opacity: 1;
    visibility: visible;
  }

  /* Form Panel Styles (inside form-layer) */
  .feedback-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: transparent;
  }

  .feedback-form-header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 12px;
    border-bottom: 1px solid ${ue.lightGray};
  }

  .feedback-form-title {
    margin: 0;
    font-size: 16px;
    font-weight: ${rt.weightMedium};
    color: ${ue.textDark};
    letter-spacing: ${rt.trackingTight};
  }

  .feedback-close-button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${ue.gray500};
    transition: all 0.15s ease;
  }

  .feedback-close-button:hover {
    background-color: ${ue.gray100};
    color: ${ue.textDark};
  }

  .feedback-close-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${ue.blueLight};
  }

  .feedback-close-button svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-form-body {
    flex: 1;
    padding: 16px 16px 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
  }

  .feedback-form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .feedback-form-row {
    flex-direction: row;
    gap: 8px;
  }

  .feedback-form-row .feedback-select {
    flex: 1;
    min-width: 0;
  }

  .feedback-initials {
    width: 72px;
    flex-shrink: 0;
    padding: 10px 12px;
    border: 1px solid ${ue.lightGray};
    border-radius: 8px;
    font-size: 14px;
    font-weight: ${rt.weightRegular};
    color: ${ue.textDark};
    background-color: ${ue.background};
    text-transform: uppercase;
    text-align: center;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .feedback-initials::placeholder {
    color: ${ue.gray400};
    text-transform: none;
  }

  .feedback-initials:hover {
    border-color: ${ue.gray400};
  }

  .feedback-initials:focus {
    outline: none;
    border-color: ${ue.blue};
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.15);
  }

  .feedback-initials:disabled {
    background-color: ${ue.gray50};
    cursor: not-allowed;
    opacity: 0.7;
  }

  .feedback-initials.error {
    border-color: #dc2626;
    background-color: #fef2f2;
  }

  .feedback-initials.error::placeholder {
    color: #dc2626;
    text-transform: none;
  }

  .feedback-initials.error:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  }

  .feedback-label {
    font-size: 12px;
    font-weight: ${rt.weightMedium};
    color: ${ue.textDark};
    text-transform: uppercase;
    letter-spacing: ${rt.trackingWide};
  }

  .feedback-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${ue.lightGray};
    border-radius: 8px;
    font-size: 14px;
    font-weight: ${rt.weightRegular};
    color: ${ue.textDark};
    background-color: ${ue.background};
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23333F48' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .feedback-select:hover {
    border-color: ${ue.gray400};
  }

  .feedback-select:focus {
    outline: none;
    border-color: ${ue.blue};
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.15);
  }

  .feedback-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${ue.lightGray};
    border-radius: 8px;
    font-size: 14px;
    font-weight: ${rt.weightRegular};
    color: ${ue.textDark};
    background-color: ${ue.background};
    resize: vertical;
    min-height: 36px;
    font-family: inherit;
    line-height: 1.6;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .feedback-textarea::placeholder {
    color: ${ue.gray400};
  }

  .feedback-textarea:hover {
    border-color: ${ue.gray400};
  }

  .feedback-textarea:focus {
    outline: none;
    border-color: ${ue.blue};
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.15);
  }

  .feedback-textarea.error {
    border-color: #dc2626;
    background-color: #fef2f2;
  }

  .feedback-textarea.error::placeholder {
    color: #dc2626;
  }

  .feedback-textarea.error:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  }

  .feedback-submit-button {
    width: 100%;
    padding: 12px 16px;
    background-color: ${ue.blue};
    color: ${ue.text};
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: ${rt.weightMedium};
    text-transform: uppercase;
    letter-spacing: ${rt.trackingWide};
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.1s ease;
  }

  .feedback-submit-button:hover {
    background-color: ${ue.blueHover};
  }

  .feedback-submit-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.3);
  }

  .feedback-submit-button:active {
    transform: scale(0.98);
  }

  /* Loading spinner animation */
  @keyframes feedbackSpinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .feedback-spinner {
    animation: feedbackSpinner 1s linear infinite;
  }

  .feedback-submit-button svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
  }

  .feedback-submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .feedback-submit-button:disabled:hover {
    background-color: ${ue.blue};
    transform: none;
  }

  /* Success state */
  .feedback-success-body {
    flex: 1;
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;
  }

  .feedback-success-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${ue.blue};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feedback-success-icon svg {
    width: 28px;
    height: 28px;
    fill: none;
    stroke: white;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-success-message {
    margin: 0;
    font-size: 14px;
    font-weight: ${rt.weightRegular};
    color: ${ue.textDark};
    line-height: 1.6;
  }

  /* Error state */
  .feedback-error-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  .feedback-error-icon {
    flex-shrink: 0;
    display: flex;
  }

  .feedback-error-icon svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: #dc2626;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-error-text {
    flex: 1;
    font-size: 13px;
    color: #991b1b;
    line-height: 1.4;
  }

  .feedback-retry-button {
    flex-shrink: 0;
    padding: 4px 10px;
    background-color: transparent;
    color: #dc2626;
    border: 1px solid #dc2626;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .feedback-retry-button:hover {
    background-color: #dc2626;
    color: white;
  }

  .feedback-retry-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fecaca;
  }

  /* Disabled states for form elements */
  .feedback-select:disabled,
  .feedback-textarea:disabled {
    background-color: ${ue.gray50};
    cursor: not-allowed;
    opacity: 0.7;
  }

  .feedback-close-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${jh()}

  ${Nh()}
`,qf=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
`,Xh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
`,Qh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
`,Zh=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="feedback-spinner">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
`,Vh=[{value:"bug",label:"Bug"},{value:"feature",label:"Feature (Suggestion)"},{value:"general",label:"General"}];function Kh(i="bug",f="",s="idle",o="",h=!1,m=[],p=!1,b=!0,S=!1,v="",x=!1){const _=Vh.map(Y=>`<option value="${Y.value}" ${Y.value===i?"selected":""}>${Y.label}</option>`).join(""),R=s==="loading",N=R,B=s==="error"&&!S;return s==="success"?`
      <div class="feedback-form">
        <div class="feedback-form-header">
          <h3 class="feedback-form-title">Thank You!</h3>
          <button
            class="feedback-close-button"
            aria-label="Close feedback form"
            type="button"
          >
            ${qf}
          </button>
        </div>
        <div class="feedback-success-body">
          <div class="feedback-success-icon">${Xh}</div>
          <p class="feedback-success-message">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    `:`
    <div class="feedback-form">
      <div class="feedback-form-header">
        <h3 class="feedback-form-title">Send Feedback</h3>
        <button
          class="feedback-close-button"
          aria-label="Close feedback form"
          type="button"
          ${N?"disabled":""}
        >
          ${qf}
        </button>
      </div>

      <form class="feedback-form-body">
        ${B?`
          <div class="feedback-error-banner">
            <span class="feedback-error-icon">${Qh}</span>
            <span class="feedback-error-text">${o||"Something went wrong. Please try again."}</span>
            ${b?`<button type="button" class="feedback-retry-button">${h?"Retry":"Try Again"}</button>`:""}
          </div>
        `:""}

        <div class="feedback-form-field feedback-form-row">
          <select id="feedback-type" name="type" class="feedback-select" ${N?"disabled":""}>
            ${_}
          </select>
          <input
            type="text"
            id="feedback-initials"
            name="initials"
            class="feedback-initials ${x?"error":""}"
            placeholder="Initials"
            maxlength="4"
            value="${v}"
            ${N?"disabled":""}
          />
        </div>

        <div class="feedback-form-field">
          <textarea
            id="feedback-message"
            name="message"
            class="feedback-textarea ${S?"error":""}"
            placeholder="Tell us what's on your mind..."
            rows="1"
            ${N?"disabled":""}
          >${f}</textarea>
        </div>

        ${Uh(N)}

        ${Lh(m,p)}

        <button type="submit" class="feedback-submit-button" ${N?"disabled":""}>
          ${R?`${Zh} Submitting...`:"Submit"}
        </button>
      </form>
    </div>
  `}let Lf=null;function Jh(i){if(!i||typeof i!="object")throw new Error("FeedbackWidget.init() requires a configuration object");const f=i;if(!f.appId)throw new Error("FeedbackWidget.init() requires appId to be specified");if(typeof f.appId!="string")throw new Error("FeedbackWidget.init() appId must be a string");if(f.appId.trim()==="")throw new Error("FeedbackWidget.init() appId cannot be empty");if(f.position!==void 0){const s=["bottom-right","bottom-left","top-right","top-left"];if(!s.includes(f.position))throw new Error(`FeedbackWidget.init() position must be one of: ${s.join(", ")}`)}if(f.jwtConfig!==void 0&&typeof f.jwtConfig!="object")throw new Error("FeedbackWidget.init() jwtConfig must be an object");if(f.env!==void 0){if(typeof f.env!="string")throw new Error("FeedbackWidget.init() env must be a string");const s=["alpha","beta","dev","stable"];if(!s.includes(f.env))throw new Error(`FeedbackWidget.init() env must be one of: ${s.join(", ")}`)}if(f.apiBaseUrl!==void 0&&typeof f.apiBaseUrl!="string")throw new Error("FeedbackWidget.init() apiBaseUrl must be a string")}function Fi(i){var f;Jh(i),Lf={appId:i.appId,position:(f=i.position)!=null?f:"bottom-right",jwtConfig:i.jwtConfig,env:i.env,apiBaseUrl:i.apiBaseUrl}}function $h(){return Lf}const Yf="feedback-widget-corner";function Wh(i){try{localStorage.setItem(Yf,i)}catch(f){console.warn("FeedbackWidget: Unable to save position to localStorage")}}function jf(){try{const i=localStorage.getItem(Yf);return i&&["bottom-right","bottom-left","top-right","top-left"].includes(i)?i:null}catch(i){return null}}function Fh(i,f){const s=typeof window!="undefined"?document.documentElement.clientWidth:800,o=typeof window!="undefined"?document.documentElement.clientHeight:600,h=i<s/2,m=f<o/2;return m&&h?"top-left":m&&!h?"top-right":!m&&h?"bottom-left":"bottom-right"}const Sl=56,Dt=24;let Jl=(typeof window!="undefined"?jf():null)||"bottom-right";const Ii=new Set;let ba=!1,gu=!1,Pi=!1,gn={x:0,y:0},yu=null;function Ih(){yu=null}function $l(){Ih();for(const i of Ii)i()}function Gf(i){if(typeof window=="undefined")return{x:0,y:0};const f=document.documentElement.clientWidth,s=document.documentElement.clientHeight;switch(i){case"top-left":return{x:Dt,y:Dt};case"top-right":return{x:f-Sl-Dt,y:Dt};case"bottom-left":return{x:Dt,y:s-Sl-Dt};default:return{x:f-Sl-Dt,y:s-Sl-Dt}}}let ec=!1;function Ph(i="bottom-right"){if(ec)return;am(),Jl=jf()||i,ec=!0,$l()}function em(){ba=!0,gn=Gf(Jl),$l()}function tm(i,f){ba&&(gn={x:i,y:f},$l())}function lm(){if(!ba)return;const i=gn.x+Sl/2,f=gn.y+Sl/2,s=Fh(i,f);ba=!1,gu=!0,$l(),setTimeout(()=>{Jl=s,Wh(s),yn=null,vu=null,gu=!1,Pi=!0,$l(),setTimeout(()=>{Pi=!1,$l()},150)},50)}let yn=null,vu=null,tc=0,lc=0,Xf=!1;function am(){Xf||typeof window=="undefined"||(Xf=!0,window.addEventListener("resize",()=>{const i=document.documentElement.clientWidth,f=document.documentElement.clientHeight;(i!==tc||f!==lc)&&(tc=i,lc=f,yn=null,vu=null,$l())}),tc=document.documentElement.clientWidth,lc=document.documentElement.clientHeight)}function nm(){return ba||gu?gn:((yn===null||vu!==Jl)&&(yn=Gf(Jl),vu=Jl),yn)}function um(i){return Ii.add(i),()=>{Ii.delete(i)}}function im(){return yu===null&&(yu={corner:Jl,position:nm(),isDragging:ba,isSnapping:gu,isAnimatingToCorner:Pi,isInitialized:ec}),yu}function cm(){return{corner:"bottom-right",position:{x:0,y:0},isDragging:!1,isSnapping:!1,isAnimatingToCorner:!1,isInitialized:!1}}function om(i){const f=K.useSyncExternalStore(um,im,cm),{position:s,isDragging:o,isSnapping:h,isInitialized:m,corner:p,isAnimatingToCorner:b}=f;return K.useLayoutEffect(()=>{Ph(i)},[i]),{widgetPosition:s,isDragging:o,isSnapping:h,isInitialized:m,corner:p,isAnimatingToCorner:b,widgetState:f}}function fm({widgetPosition:i,isExpanded:f}){const s=K.useRef(!1),o=K.useRef(null),h=K.useRef(null),m=K.useRef(!1),p=K.useRef(!1),b=K.useRef(()=>{}),S=K.useCallback(_=>{_.button!==0||f||(s.current=!0,m.current=!1,p.current=!1,o.current={x:_.clientX,y:_.clientY},h.current=pt({},i))},[i,f]);b.current=S;const v=K.useCallback(_=>{if(!s.current||!o.current||!h.current)return;const R=_.clientX-o.current.x,N=_.clientY-o.current.y;if((Math.abs(R)>5||Math.abs(N)>5)&&(m.current=!0,p.current||(p.current=!0,em())),!p.current)return;const B=document.documentElement.clientWidth,Y=document.documentElement.clientHeight,k=Math.max(Dt,Math.min(h.current.x+R,B-Sl-Dt)),j=Math.max(Dt,Math.min(h.current.y+N,Y-Sl-Dt));tm(k,j)},[]),x=K.useCallback(()=>{s.current&&p.current&&lm(),s.current=!1,p.current=!1,o.current=null,h.current=null},[]);return K.useEffect(()=>(document.addEventListener("mousemove",v),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",x)}),[v,x]),{handleMouseDownRef:b,hasDraggedRef:m}}function rm({setIsExpanded:i,setSelectionWarning:f}){const[s,o]=K.useState(!1),h=K.useRef(!1);h.current=s,K.useEffect(()=>{const b=S=>{S.key==="Escape"&&s&&o(!1)};if(s)return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[s]);const m=K.useCallback(()=>{o(!0),i(!1)},[i]),p=K.useCallback(()=>{o(!1),i(!0),f(null)},[i,f]);return{isSelectionMode:s,setIsSelectionMode:o,isSelectionModeRef:h,handleEnterSelectionMode:m,handleExitSelectionMode:p}}const Qf="[modern-screenshot]",pa=typeof window!="undefined",sm=pa&&"Worker"in window,ac=pa?(Sr=window.navigator)==null?void 0:Sr.userAgent:"",Zf=ac.includes("Chrome"),bu=ac.includes("AppleWebKit")&&!Zf,nc=ac.includes("Firefox"),dm=i=>i&&"__CONTEXT__"in i,hm=i=>i.constructor.name==="CSSFontFaceRule",mm=i=>i.constructor.name==="CSSImportRule",Jt=i=>i.nodeType===1,vn=i=>typeof i.className=="object",Vf=i=>i.tagName==="image",gm=i=>i.tagName==="use",bn=i=>Jt(i)&&typeof i.style!="undefined"&&!vn(i),ym=i=>i.nodeType===8,vm=i=>i.nodeType===3,Sa=i=>i.tagName==="IMG",pu=i=>i.tagName==="VIDEO",bm=i=>i.tagName==="CANVAS",pm=i=>i.tagName==="TEXTAREA",Sm=i=>i.tagName==="INPUT",Em=i=>i.tagName==="STYLE",xm=i=>i.tagName==="SCRIPT",Tm=i=>i.tagName==="SELECT",zm=i=>i.tagName==="SLOT",wm=i=>i.tagName==="IFRAME",Am=(...i)=>console.warn(Qf,...i);function Mm(i){var s;const f=(s=i==null?void 0:i.createElement)==null?void 0:s.call(i,"canvas");return f&&(f.height=f.width=1),!!f&&"toDataURL"in f&&!!f.toDataURL("image/webp").includes("image/webp")}const uc=i=>i.startsWith("data:");function Kf(i,f){if(i.match(/^[a-z]+:\/\//i))return i;if(pa&&i.match(/^\/\//))return window.location.protocol+i;if(i.match(/^[a-z]+:/i)||!pa)return i;const s=Su().implementation.createHTMLDocument(),o=s.createElement("base"),h=s.createElement("a");return s.head.appendChild(o),s.body.appendChild(h),f&&(o.href=f),h.href=i,h.href}function Su(i){var f;return(f=i&&Jt(i)?i==null?void 0:i.ownerDocument:i)!=null?f:window.document}const Eu="http://www.w3.org/2000/svg";function _m(i,f,s){const o=Su(s).createElementNS(Eu,"svg");return o.setAttributeNS(null,"width",i.toString()),o.setAttributeNS(null,"height",f.toString()),o.setAttributeNS(null,"viewBox",`0 0 ${i} ${f}`),o}function Dm(i,f){let s=new XMLSerializer().serializeToString(i);return f&&(s=s.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu,"")),`data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`}function Cm(i,f){return new Promise((s,o)=>{const h=new FileReader;h.onload=()=>s(h.result),h.onerror=()=>o(h.error),h.onabort=()=>o(new Error(`Failed read blob to ${f}`)),h.readAsDataURL(i)})}const Om=i=>Cm(i,"dataUrl");function Ea(i,f){const s=Su(f).createElement("img");return s.decoding="sync",s.loading="eager",s.src=i,s}function pn(i,f){return new Promise(s=>{const{timeout:o,ownerDocument:h,onError:m,onWarn:p}=f!=null?f:{},b=typeof i=="string"?Ea(i,Su(h)):i;let S=null,v=null;function x(){s(b),S&&clearTimeout(S),v==null||v()}if(o&&(S=setTimeout(x,o)),pu(b)){const _=b.currentSrc||b.src;if(!_)return b.poster?pn(b.poster,f).then(s):x();if(b.readyState>=2)return x();const R=x,N=B=>{p==null||p("Failed video load",_,B),m==null||m(B),x()};v=()=>{b.removeEventListener("loadeddata",R),b.removeEventListener("error",N)},b.addEventListener("loadeddata",R,{once:!0}),b.addEventListener("error",N,{once:!0})}else{const _=Vf(b)?b.href.baseVal:b.currentSrc||b.src;if(!_)return x();const R=async()=>{if(Sa(b)&&"decode"in b)try{await b.decode()}catch(B){p==null||p("Failed to decode image, trying to render anyway",b.dataset.originalSrc||_,B)}x()},N=B=>{p==null||p("Failed image load",b.dataset.originalSrc||_,B),x()};if(Sa(b)&&b.complete)return R();v=()=>{b.removeEventListener("load",R),b.removeEventListener("error",N)},b.addEventListener("load",R,{once:!0}),b.addEventListener("error",N,{once:!0})}})}async function Um(i,f){bn(i)&&(Sa(i)||pu(i)?await pn(i,f):await Promise.all(["img","video"].flatMap(s=>Array.from(i.querySelectorAll(s)).map(o=>pn(o,f)))))}const Jf=(function(){let f=0;const s=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(f+=1,`u${s()}${f}`)})();function $f(i){return i==null?void 0:i.split(",").map(f=>f.trim().replace(/"|'/g,"").toLowerCase()).filter(Boolean)}let Wf=0;function Rm(i){const f=`${Qf}[#${Wf}]`;return Wf++,{time:s=>i&&console.time(`${f} ${s}`),timeEnd:s=>i&&console.timeEnd(`${f} ${s}`),warn:(...s)=>i&&Am(...s)}}function Nm(i){return{cache:i?"no-cache":"force-cache"}}async function Ff(i,f){return dm(i)?i:Hm(i,hn(pt({},f),{autoDestruct:!0}))}async function Hm(i,f){var N,B,Y,k,j;const{scale:s=1,workerUrl:o,workerNumber:h=1}=f||{},m=!!(f!=null&&f.debug),p=(N=f==null?void 0:f.features)!=null?N:!0,b=(B=i.ownerDocument)!=null?B:pa?window.document:void 0,S=(k=(Y=i.ownerDocument)==null?void 0:Y.defaultView)!=null?k:pa?window:void 0,v=new Map,x=hn(pt({width:0,height:0,quality:1,type:"image/png",scale:s,backgroundColor:null,style:null,filter:null,maximumCanvasSize:0,timeout:3e4,progress:null,debug:m,fetch:pt({requestInit:Nm((j=f==null?void 0:f.fetch)==null?void 0:j.bypassingCache),placeholderImage:"data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",bypassingCache:!1},f==null?void 0:f.fetch),fetchFn:null,font:{},drawImageInterval:100,workerUrl:null,workerNumber:h,onCloneEachNode:null,onCloneNode:null,onEmbedNode:null,onCreateForeignObjectSvg:null,includeStyleProperties:null,autoDestruct:!1},f),{__CONTEXT__:!0,log:Rm(m),node:i,ownerDocument:b,ownerWindow:S,dpi:s===1?null:96*s,svgStyleElement:If(b),svgDefsElement:b==null?void 0:b.createElementNS(Eu,"defs"),svgStyles:new Map,defaultComputedStyles:new Map,workers:[...Array.from({length:sm&&o&&h?h:0})].map(()=>{try{const Z=new Worker(o);return Z.onmessage=async q=>{var $,V,te,Ee;const{url:G,result:J}=q.data;J?(V=($=v.get(G))==null?void 0:$.resolve)==null||V.call($,J):(Ee=(te=v.get(G))==null?void 0:te.reject)==null||Ee.call(te,new Error(`Error receiving message from worker: ${G}`))},Z.onmessageerror=q=>{var J,$;const{url:G}=q.data;($=(J=v.get(G))==null?void 0:J.reject)==null||$.call(J,new Error(`Error receiving message from worker: ${G}`))},Z}catch(Z){return x.log.warn("Failed to new Worker",Z),null}}).filter(Boolean),fontFamilies:new Map,fontCssTexts:new Map,acceptOfImage:`${[Mm(b)&&"image/webp","image/svg+xml","image/*","*/*"].filter(Boolean).join(",")};q=0.8`,requests:v,drawImageCount:0,tasks:[],features:p,isEnable:Z=>{var q,G;return Z==="restoreScrollPosition"?typeof p=="boolean"?!1:(q=p[Z])!=null?q:!1:typeof p=="boolean"?p:(G=p[Z])!=null?G:!0},shadowRoots:[]});x.log.time("wait until load"),await Um(i,{timeout:x.timeout,onWarn:x.log.warn}),x.log.timeEnd("wait until load");const{width:_,height:R}=Bm(i,x);return x.width=_,x.height=R,x}function If(i){if(!i)return;const f=i.createElement("style"),s=f.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);return f.appendChild(s),f}function Bm(i,f){let{width:s,height:o}=f;if(Jt(i)&&(!s||!o)){const h=i.getBoundingClientRect();s=s||h.width||Number(i.getAttribute("width"))||0,o=o||h.height||Number(i.getAttribute("height"))||0}return{width:s,height:o}}async function km(i,f){const{log:s,timeout:o,drawImageCount:h,drawImageInterval:m}=f;s.time("image to canvas");const p=await pn(i,{timeout:o,onWarn:f.log.warn}),{canvas:b,context2d:S}=qm(i.ownerDocument,f),v=()=>{try{S==null||S.drawImage(p,0,0,b.width,b.height)}catch(x){f.log.warn("Failed to drawImage",x)}};if(v(),f.isEnable("fixSvgXmlDecode"))for(let x=0;x<h;x++)await new Promise(_=>{setTimeout(()=>{S==null||S.clearRect(0,0,b.width,b.height),v(),_()},x+m)});return f.drawImageCount=0,s.timeEnd("image to canvas"),b}function qm(i,f){const{width:s,height:o,scale:h,backgroundColor:m,maximumCanvasSize:p}=f,b=i.createElement("canvas");b.width=Math.floor(s*h),b.height=Math.floor(o*h),b.style.width=`${s}px`,b.style.height=`${o}px`,p&&(b.width>p||b.height>p)&&(b.width>p&&b.height>p?b.width>b.height?(b.height*=p/b.width,b.width=p):(b.width*=p/b.height,b.height=p):b.width>p?(b.height*=p/b.width,b.width=p):(b.width*=p/b.height,b.height=p));const S=b.getContext("2d");return S&&m&&(S.fillStyle=m,S.fillRect(0,0,b.width,b.height)),{canvas:b,context2d:S}}function Pf(i,f){if(i.ownerDocument)try{const m=i.toDataURL();if(m!=="data:,")return Ea(m,i.ownerDocument)}catch(m){f.log.warn("Failed to clone canvas",m)}const s=i.cloneNode(!1),o=i.getContext("2d"),h=s.getContext("2d");try{return o&&h&&h.putImageData(o.getImageData(0,0,i.width,i.height),0,0),s}catch(m){f.log.warn("Failed to clone canvas",m)}return s}function Lm(i,f){var s;try{if((s=i==null?void 0:i.contentDocument)!=null&&s.body)return ic(i.contentDocument.body,f)}catch(o){f.log.warn("Failed to clone iframe",o)}return i.cloneNode(!1)}function Ym(i){const f=i.cloneNode(!1);return i.currentSrc&&i.currentSrc!==i.src&&(f.src=i.currentSrc,f.srcset=""),f.loading==="lazy"&&(f.loading="eager"),f}async function jm(i,f){if(i.ownerDocument&&!i.currentSrc&&i.poster)return Ea(i.poster,i.ownerDocument);const s=i.cloneNode(!1);s.crossOrigin="anonymous",i.currentSrc&&i.currentSrc!==i.src&&(s.src=i.currentSrc);const o=s.ownerDocument;if(o){let h=!0;if(await pn(s,{onError:()=>h=!1,onWarn:f.log.warn}),!h)return i.poster?Ea(i.poster,i.ownerDocument):s;s.currentTime=i.currentTime,await new Promise(p=>{s.addEventListener("seeked",p,{once:!0})});const m=o.createElement("canvas");m.width=i.offsetWidth,m.height=i.offsetHeight;try{const p=m.getContext("2d");p&&p.drawImage(s,0,0,m.width,m.height)}catch(p){return f.log.warn("Failed to clone video",p),i.poster?Ea(i.poster,i.ownerDocument):s}return Pf(m,f)}return s}function Gm(i,f){return bm(i)?Pf(i,f):wm(i)?Lm(i,f):Sa(i)?Ym(i):pu(i)?jm(i,f):i.cloneNode(!1)}function Xm(i){let f=i.sandbox;if(!f){const{ownerDocument:s}=i;try{s&&(f=s.createElement("iframe"),f.id=`__SANDBOX__${Jf()}`,f.width="0",f.height="0",f.style.visibility="hidden",f.style.position="fixed",s.body.appendChild(f),f.srcdoc='<!DOCTYPE html><meta charset="UTF-8"><title></title><body>',i.sandbox=f)}catch(o){i.log.warn("Failed to getSandBox",o)}}return f}const Qm=["width","height","-webkit-text-fill-color"],Zm=["stroke","fill"];function er(i,f,s){const{defaultComputedStyles:o}=s,h=i.nodeName.toLowerCase(),m=vn(i)&&h!=="svg",p=m?Zm.map(Y=>[Y,i.getAttribute(Y)]).filter(([,Y])=>Y!==null):[],b=[m&&"svg",h,p.map((Y,k)=>`${Y}=${k}`).join(","),f].filter(Boolean).join(":");if(o.has(b))return o.get(b);const S=Xm(s),v=S==null?void 0:S.contentWindow;if(!v)return new Map;const x=v==null?void 0:v.document;let _,R;m?(_=x.createElementNS(Eu,"svg"),R=_.ownerDocument.createElementNS(_.namespaceURI,h),p.forEach(([Y,k])=>{R.setAttributeNS(null,Y,k)}),_.appendChild(R)):_=R=x.createElement(h),R.textContent=" ",x.body.appendChild(_);const N=v.getComputedStyle(R,f),B=new Map;for(let Y=N.length,k=0;k<Y;k++){const j=N.item(k);Qm.includes(j)||B.set(j,N.getPropertyValue(j))}return x.body.removeChild(_),o.set(b,B),B}function tr(i,f,s){var b;const o=new Map,h=[],m=new Map;if(s)for(const S of s)p(S);else for(let S=i.length,v=0;v<S;v++){const x=i.item(v);p(x)}for(let S=h.length,v=0;v<S;v++)(b=m.get(h[v]))==null||b.forEach((x,_)=>o.set(_,x));function p(S){const v=i.getPropertyValue(S),x=i.getPropertyPriority(S),_=S.lastIndexOf("-"),R=_>-1?S.substring(0,_):void 0;if(R){let N=m.get(R);N||(N=new Map,m.set(R,N)),N.set(S,[v,x])}f.get(S)===v&&!x||(R?h.push(R):o.set(S,[v,x]))}return o}function Vm(i,f,s,o){var _,R,N,B;const{ownerWindow:h,includeStyleProperties:m,currentParentNodeStyle:p}=o,b=f.style,S=h.getComputedStyle(i),v=er(i,null,o);p==null||p.forEach((Y,k)=>{v.delete(k)});const x=tr(S,v,m);x.delete("transition-property"),x.delete("all"),x.delete("d"),x.delete("content"),s&&(x.delete("margin-top"),x.delete("margin-right"),x.delete("margin-bottom"),x.delete("margin-left"),x.delete("margin-block-start"),x.delete("margin-block-end"),x.delete("margin-inline-start"),x.delete("margin-inline-end"),x.set("box-sizing",["border-box",""])),((_=x.get("background-clip"))==null?void 0:_[0])==="text"&&f.classList.add("______background-clip--text"),Zf&&(x.has("font-kerning")||x.set("font-kerning",["normal",""]),(((R=x.get("overflow-x"))==null?void 0:R[0])==="hidden"||((N=x.get("overflow-y"))==null?void 0:N[0])==="hidden")&&((B=x.get("text-overflow"))==null?void 0:B[0])==="ellipsis"&&i.scrollWidth===i.clientWidth&&x.set("text-overflow",["clip",""]));for(let Y=b.length,k=0;k<Y;k++)b.removeProperty(b.item(k));return x.forEach(([Y,k],j)=>{b.setProperty(j,Y,k)}),x}function Km(i,f){(pm(i)||Sm(i)||Tm(i))&&f.setAttribute("value",i.value)}const Jm=["::before","::after"],$m=["::-webkit-scrollbar","::-webkit-scrollbar-button","::-webkit-scrollbar-thumb","::-webkit-scrollbar-track","::-webkit-scrollbar-track-piece","::-webkit-scrollbar-corner","::-webkit-resizer"];function Wm(i,f,s,o,h){const{ownerWindow:m,svgStyleElement:p,svgStyles:b,currentNodeStyle:S}=o;if(!p||!m)return;function v(x){var q;const _=m.getComputedStyle(i,x);let R=_.getPropertyValue("content");if(!R||R==="none")return;h==null||h(R),R=R.replace(/(')|(")|(counter\(.+\))/g,"");const N=[Jf()],B=er(i,x,o);S==null||S.forEach((G,J)=>{B.delete(J)});const Y=tr(_,B,o.includeStyleProperties);Y.delete("content"),Y.delete("-webkit-locale"),((q=Y.get("background-clip"))==null?void 0:q[0])==="text"&&f.classList.add("______background-clip--text");const k=[`content: '${R}';`];if(Y.forEach(([G,J],$)=>{k.push(`${$}: ${G}${J?" !important":""};`)}),k.length===1)return;try{f.className=[f.className,...N].join(" ")}catch(G){o.log.warn("Failed to copyPseudoClass",G);return}const j=k.join(`
  `);let Z=b.get(j);Z||(Z=[],b.set(j,Z)),Z.push(`.${N[0]}${x}`)}Jm.forEach(v),s&&$m.forEach(v)}const lr=new Set(["symbol"]);async function ar(i,f,s,o,h){if(Jt(s)&&(Em(s)||xm(s))||o.filter&&!o.filter(s))return;lr.has(f.nodeName)||lr.has(s.nodeName)?o.currentParentNodeStyle=void 0:o.currentParentNodeStyle=o.currentNodeStyle;const m=await ic(s,o,!1,h);o.isEnable("restoreScrollPosition")&&Fm(i,m),f.appendChild(m)}async function nr(i,f,s,o){var m;let h=i.firstChild;Jt(i)&&i.shadowRoot&&(h=(m=i.shadowRoot)==null?void 0:m.firstChild,s.shadowRoots.push(i.shadowRoot));for(let p=h;p;p=p.nextSibling)if(!ym(p))if(Jt(p)&&zm(p)&&typeof p.assignedNodes=="function"){const b=p.assignedNodes();for(let S=0;S<b.length;S++)await ar(i,f,b[S],s,o)}else await ar(i,f,p,s,o)}function Fm(i,f){if(!bn(i)||!bn(f))return;const{scrollTop:s,scrollLeft:o}=i;if(!s&&!o)return;const{transform:h}=f.style,m=new DOMMatrix(h),{a:p,b,c:S,d:v}=m;m.a=1,m.b=0,m.c=0,m.d=1,m.translateSelf(-o,-s),m.a=p,m.b=b,m.c=S,m.d=v,f.style.transform=m.toString()}function Im(i,f){const{backgroundColor:s,width:o,height:h,style:m}=f,p=i.style;if(s&&p.setProperty("background-color",s,"important"),o&&p.setProperty("width",`${o}px`,"important"),h&&p.setProperty("height",`${h}px`,"important"),m)for(const b in m)p[b]=m[b]}const Pm=/^[\w-:]+$/;async function ic(i,f,s=!1,o){var v,x,_,R;const{ownerDocument:h,ownerWindow:m,fontFamilies:p,onCloneEachNode:b}=f;if(h&&vm(i))return o&&/\S/.test(i.data)&&o(i.data),h.createTextNode(i.data);if(h&&m&&Jt(i)&&(bn(i)||vn(i))){const N=await Gm(i,f);if(f.isEnable("removeAbnormalAttributes")){const q=N.getAttributeNames();for(let G=q.length,J=0;J<G;J++){const $=q[J];Pm.test($)||N.removeAttribute($)}}const B=f.currentNodeStyle=Vm(i,N,s,f);s&&Im(N,f);let Y=!1;if(f.isEnable("copyScrollbar")){const q=[(v=B.get("overflow-x"))==null?void 0:v[0],(x=B.get("overflow-y"))==null?void 0:x[0]];Y=q.includes("scroll")||(q.includes("auto")||q.includes("overlay"))&&(i.scrollHeight>i.clientHeight||i.scrollWidth>i.clientWidth)}const k=(_=B.get("text-transform"))==null?void 0:_[0],j=$f((R=B.get("font-family"))==null?void 0:R[0]),Z=j?q=>{k==="uppercase"?q=q.toUpperCase():k==="lowercase"?q=q.toLowerCase():k==="capitalize"&&(q=q[0].toUpperCase()+q.substring(1)),j.forEach(G=>{let J=p.get(G);J||p.set(G,J=new Set),q.split("").forEach($=>J.add($))})}:void 0;return Wm(i,N,Y,f,Z),Km(i,N),pu(i)||await nr(i,N,f,Z),await(b==null?void 0:b(N)),N}const S=i.cloneNode(!1);return await nr(i,S,f),await(b==null?void 0:b(S)),S}function eg(i){if(i.ownerDocument=void 0,i.ownerWindow=void 0,i.svgStyleElement=void 0,i.svgDefsElement=void 0,i.svgStyles.clear(),i.defaultComputedStyles.clear(),i.sandbox){try{i.sandbox.remove()}catch(f){i.log.warn("Failed to destroyContext",f)}i.sandbox=void 0}i.workers=[],i.fontFamilies.clear(),i.fontCssTexts.clear(),i.requests.clear(),i.tasks=[],i.shadowRoots=[]}function tg(i){const b=i,{url:f,timeout:s,responseType:o}=b,h=bh(b,["url","timeout","responseType"]),m=new AbortController,p=s?setTimeout(()=>m.abort(),s):void 0;return fetch(f,pt({signal:m.signal},h)).then(S=>{if(!S.ok)throw new Error("Failed fetch, not 2xx response",{cause:S});switch(o){case"arrayBuffer":return S.arrayBuffer();case"dataUrl":return S.blob().then(Om);default:return S.text()}}).finally(()=>clearTimeout(p))}function Sn(i,f){const{url:s,requestType:o="text",responseType:h="text",imageDom:m}=f;let p=s;const{timeout:b,acceptOfImage:S,requests:v,fetchFn:x,fetch:{requestInit:_,bypassingCache:R,placeholderImage:N},font:B,workers:Y,fontFamilies:k}=i;o==="image"&&(bu||nc)&&i.drawImageCount++;let j=v.get(s);if(!j){R&&R instanceof RegExp&&R.test(p)&&(p+=(/\?/.test(p)?"&":"?")+new Date().getTime());const Z=o.startsWith("font")&&B&&B.minify,q=new Set;Z&&o.split(";")[1].split(",").forEach(V=>{k.has(V)&&k.get(V).forEach(te=>q.add(te))});const G=Z&&q.size,J=pt({url:p,timeout:b,responseType:G?"arrayBuffer":h,headers:o==="image"?{accept:S}:void 0},_);j={type:o,resolve:void 0,reject:void 0,response:null},j.response=(async()=>{if(x&&o==="image"){const $=await x(s);if($)return $}return!bu&&s.startsWith("http")&&Y.length?new Promise(($,V)=>{Y[v.size&Y.length-1].postMessage(pt({rawUrl:s},J)),j.resolve=$,j.reject=V}):tg(J)})().catch($=>{if(v.delete(s),o==="image"&&N)return i.log.warn("Failed to fetch image base64, trying to use placeholder image",p),typeof N=="string"?N:N(m);throw $}),v.set(s,j)}return j.response}async function ur(i,f,s,o){if(!ir(i))return i;for(const[h,m]of lg(i,f))try{const p=await Sn(s,{url:m,requestType:o?"image":"text",responseType:"dataUrl"});i=i.replace(ag(h),`$1${p}$3`)}catch(p){s.log.warn("Failed to fetch css data url",h,p)}return i}function ir(i){return/url\((['"]?)([^'"]+?)\1\)/.test(i)}const cr=/url\((['"]?)([^'"]+?)\1\)/g;function lg(i,f){const s=[];return i.replace(cr,(o,h,m)=>(s.push([m,Kf(m,f)]),o)),s.filter(([o])=>!uc(o))}function ag(i){const f=i.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${f})(['"]?\\))`,"g")}const ng=["background-image","border-image-source","-webkit-border-image","-webkit-mask-image","list-style-image"];function ug(i,f){return ng.map(s=>{const o=i.getPropertyValue(s);return!o||o==="none"?null:((bu||nc)&&f.drawImageCount++,ur(o,null,f,!0).then(h=>{!h||o===h||i.setProperty(s,h,i.getPropertyPriority(s))}))}).filter(Boolean)}function ig(i,f){if(Sa(i)){const s=i.currentSrc||i.src;if(!uc(s))return[Sn(f,{url:s,imageDom:i,requestType:"image",responseType:"dataUrl"}).then(o=>{o&&(i.srcset="",i.dataset.originalSrc=s,i.src=o||"")})];(bu||nc)&&f.drawImageCount++}else if(vn(i)&&!uc(i.href.baseVal)){const s=i.href.baseVal;return[Sn(f,{url:s,imageDom:i,requestType:"image",responseType:"dataUrl"}).then(o=>{o&&(i.dataset.originalSrc=s,i.href.baseVal=o||"")})]}return[]}function cg(i,f){var b;const{ownerDocument:s,svgDefsElement:o}=f,h=(b=i.getAttribute("href"))!=null?b:i.getAttribute("xlink:href");if(!h)return[];const[m,p]=h.split("#");if(p){const S=`#${p}`,v=f.shadowRoots.reduce((x,_)=>x!=null?x:_.querySelector(`svg ${S}`),s==null?void 0:s.querySelector(`svg ${S}`));if(m&&i.setAttribute("href",S),o!=null&&o.querySelector(S))return[];if(v)return o==null||o.appendChild(v.cloneNode(!0)),[];if(m)return[Sn(f,{url:m,responseType:"text"}).then(x=>{o==null||o.insertAdjacentHTML("beforeend",x)})]}return[]}function or(i,f){const{tasks:s}=f;Jt(i)&&((Sa(i)||Vf(i))&&s.push(...ig(i,f)),gm(i)&&s.push(...cg(i,f))),bn(i)&&s.push(...ug(i.style,f)),i.childNodes.forEach(o=>{or(o,f)})}async function og(i,f){const{ownerDocument:s,svgStyleElement:o,fontFamilies:h,fontCssTexts:m,tasks:p,font:b}=f;if(!(!s||!o||!h.size))if(b&&b.cssText){const S=rr(b.cssText,f);o.appendChild(s.createTextNode(`${S}
`))}else{const S=Array.from(s.styleSheets).filter(x=>{try{return"cssRules"in x&&!!x.cssRules.length}catch(_){return f.log.warn(`Error while reading CSS rules from ${x.href}`,_),!1}});await Promise.all(S.flatMap(x=>Array.from(x.cssRules).map(async(_,R)=>{if(mm(_)){let N=R+1;const B=_.href;let Y="";try{Y=await Sn(f,{url:B,requestType:"text",responseType:"text"})}catch(j){f.log.warn(`Error fetch remote css import from ${B}`,j)}const k=Y.replace(cr,(j,Z,q)=>j.replace(q,Kf(q,B)));for(const j of rg(k))try{x.insertRule(j,j.startsWith("@import")?N+=1:x.cssRules.length)}catch(Z){f.log.warn("Error inserting rule from remote css import",{rule:j,error:Z})}}}))),S.flatMap(x=>Array.from(x.cssRules)).filter(x=>{var _;return hm(x)&&ir(x.style.getPropertyValue("src"))&&((_=$f(x.style.getPropertyValue("font-family")))==null?void 0:_.some(R=>h.has(R)))}).forEach(x=>{const _=x,R=m.get(_.cssText);R?o.appendChild(s.createTextNode(`${R}
`)):p.push(ur(_.cssText,_.parentStyleSheet?_.parentStyleSheet.href:null,f).then(N=>{N=rr(N,f),m.set(_.cssText,N),o.appendChild(s.createTextNode(`${N}
`))}))})}}const fg=/(\/\*[\s\S]*?\*\/)/g,fr=/((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;function rg(i){if(i==null)return[];const f=[];let s=i.replace(fg,"");for(;;){const m=fr.exec(s);if(!m)break;f.push(m[0])}s=s.replace(fr,"");const o=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,h=new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})","gi");for(;;){let m=o.exec(s);if(m)h.lastIndex=o.lastIndex;else if(m=h.exec(s),m)o.lastIndex=h.lastIndex;else break;f.push(m[0])}return f}const sg=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,dg=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function rr(i,f){const{font:s}=f,o=s?s==null?void 0:s.preferredFormat:void 0;return o?i.replace(dg,h=>{for(;;){const[m,,p]=sg.exec(h)||[];if(!p)return"";if(p===o)return`src: ${m};`}}):i}async function hg(i,f){const s=await Ff(i,f);if(Jt(s.node)&&vn(s.node))return s.node;const{ownerDocument:o,log:h,tasks:m,svgStyleElement:p,svgDefsElement:b,svgStyles:S,font:v,progress:x,autoDestruct:_,onCloneNode:R,onEmbedNode:N,onCreateForeignObjectSvg:B}=s;h.time("clone node");const Y=await ic(s.node,s,!0);if(p&&o){let G="";S.forEach((J,$)=>{G+=`${J.join(`,
`)} {
  ${$}
}
`}),p.appendChild(o.createTextNode(G))}h.timeEnd("clone node"),await(R==null?void 0:R(Y)),v!==!1&&Jt(Y)&&(h.time("embed web font"),await og(Y,s),h.timeEnd("embed web font")),h.time("embed node"),or(Y,s);const k=m.length;let j=0;const Z=async()=>{for(;;){const G=m.pop();if(!G)break;try{await G}catch(J){s.log.warn("Failed to run task",J)}x==null||x(++j,k)}};x==null||x(j,k),await Promise.all([...Array.from({length:4})].map(Z)),h.timeEnd("embed node"),await(N==null?void 0:N(Y));const q=mg(Y,s);return b&&q.insertBefore(b,q.children[0]),p&&q.insertBefore(p,q.children[0]),_&&eg(s),await(B==null?void 0:B(q)),q}function mg(i,f){const{width:s,height:o}=f,h=_m(s,o,i.ownerDocument),m=h.ownerDocument.createElementNS(h.namespaceURI,"foreignObject");return m.setAttributeNS(null,"x","0%"),m.setAttributeNS(null,"y","0%"),m.setAttributeNS(null,"width","100%"),m.setAttributeNS(null,"height","100%"),m.append(i),h.appendChild(m),h}async function gg(i,f){var p;const s=await Ff(i,f),o=await hg(s),h=Dm(o,s.isEnable("removeControlCharacter"));s.autoDestruct||(s.svgStyleElement=If(s.ownerDocument),s.svgDefsElement=(p=s.ownerDocument)==null?void 0:p.createElementNS(Eu,"defs"),s.svgStyles.clear());const m=Ea(h,o.ownerDocument);return await km(m,s)}const xu=2e3;function yg(){return`screenshot-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function sr(i,f,s,o,h){const m=document.createElement("canvas");m.width=Math.max(1,Math.round(i*h)),m.height=Math.max(1,Math.round(f*h));const p=m.getContext("2d");return p&&(p.fillStyle="#f0f0f0",p.fillRect(0,0,m.width,m.height),p.strokeStyle="#00A3E1",p.lineWidth=2,p.strokeRect(1,1,m.width-2,m.height-2),p.fillStyle="#333",p.font="14px sans-serif",p.textAlign="center",p.textBaseline="middle",p.fillText(`Region: ${i}x${f}`,m.width/2,m.height/2-10),p.fillText(`at (${s}, ${o})`,m.width/2,m.height/2+10)),m}async function vg(i,f,s,o){let h=1;(s>xu||o>xu)&&(h=Math.min(xu/s,xu/o));let m;try{const p=await gg(document.body,{scale:h,filter:S=>{var v;return S instanceof Element?!((v=S.hasAttribute)!=null&&v.call(S,"data-feedback-widget")):!0}});m=document.createElement("canvas"),m.width=Math.round(s*h),m.height=Math.round(o*h);const b=m.getContext("2d");b&&b.drawImage(p,i*h,f*h,s*h,o*h,0,0,m.width,m.height)}catch(p){console.warn("[FeedbackWidget] modern-screenshot failed, using placeholder:",p),m=sr(s,o,i,f,h)}return new Promise(p=>{m.toBlob(b=>{b?p(b):(console.warn("[FeedbackWidget] Canvas toBlob failed, creating placeholder"),sr(s,o,i,f,h).toBlob(v=>{p(v||new Blob(["placeholder"],{type:"image/png"}))},"image/png"))},"image/png",1)})}async function bg(i,f,s,o){const h=await vg(i,f,s,o),m=URL.createObjectURL(h);return{id:yg(),blobUrl:m,region:{x:i,y:f,width:s,height:o},capturedAt:Date.now(),sizeBytes:h.size}}function Tu(i){URL.revokeObjectURL(i.blobUrl)}const cc=5;function pg({shadowRootRef:i}){const[f,s]=K.useState([]),[o,h]=K.useState([]),[m,p]=K.useState(null),[b,S]=K.useState(!1),v=K.useRef(null);K.useEffect(()=>()=>{v.current&&clearTimeout(v.current),f.forEach(k=>Tu(k))},[]);const x=K.useCallback(k=>{p(k),v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{p(null)},2e3)},[]),_=K.useCallback(k=>{s(j=>{const Z=j[k];return Z&&Tu(Z),j.filter((q,G)=>G!==k)}),h(j=>j.filter((q,G)=>G!==k).map((q,G)=>hn(pt({},q),{number:G+1})))},[]),R=K.useCallback(()=>{f.forEach(k=>Tu(k)),s([]),h([]),S(!1)},[f]),N=K.useCallback(()=>{S(k=>!k)},[]),B=K.useCallback(k=>{if(!i.current)return;const j=i.current,Z=j.querySelector("[data-preview-overlay]");Z&&Z.remove();const q=document.createElement("div");q.className="screenshot-preview-overlay",q.setAttribute("data-preview-overlay",""),q.innerHTML=`
      <div class="screenshot-preview-container">
        <img src="${k.blobUrl}" alt="Screenshot preview" class="screenshot-preview-image" />
        <button type="button" class="screenshot-preview-close" aria-label="Close preview">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    `,q.addEventListener("click",G=>{(G.target===q||G.target.closest(".screenshot-preview-close"))&&q.remove()}),j.appendChild(q)},[i]),Y=K.useCallback(k=>{if(!k)return;let j=0;for(const Z of Array.from(k)){if(f.length+j>=cc){x(`Maximum ${cc} screenshots allowed`);break}if(!Z.type.startsWith("image/"))continue;const q=URL.createObjectURL(Z),G={id:`upload-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,blobUrl:q,region:{x:0,y:0,width:0,height:0},capturedAt:Date.now(),sizeBytes:Z.size};s(J=>[...J,G]),j++}},[f.length,x]);return{capturedScreenshots:f,setCapturedScreenshots:s,drawnRectangles:o,setDrawnRectangles:h,selectionWarning:m,setSelectionWarning:p,isScreenshotListExpanded:b,setIsScreenshotListExpanded:S,showWarning:x,handleRemoveScreenshot:_,handleClearAllScreenshots:R,handleToggleScreenshotList:N,handleShowScreenshotPreview:B,handleFileUpload:Y,MAX_SCREENSHOTS:cc}}function Sg({isSelectionMode:i,drawnRectangles:f,setDrawnRectangles:s,setCapturedScreenshots:o,showWarning:h,shadowRootRef:m,maxScreenshots:p}){const b=K.useRef(null),S=K.useRef(null),v=K.useRef(!1),x=K.useRef(null);return K.useEffect(()=>{const _=f.length>0;if(!i&&!_){b.current=null,S.current=null,v.current=!1,x.current=null;return}if(!m.current)return;let R=[];const N=requestAnimationFrame(()=>{if(!m.current)return;const B=m.current.querySelector(".selection-mode-canvas");if(!B)return;b.current=B;const Y=_t.initCanvas(B);if(!Y)return;if(S.current=Y,_t.redrawRectangles(Y,B,f),i){const j=G=>{v.current=!0,x.current={x:G.clientX,y:G.clientY}},Z=G=>{if(!v.current||!x.current||!S.current||!b.current)return;const J=S.current,$=b.current;_t.redrawRectangles(J,$,f);const{x:V,y:te,width:Ee,height:Ye}=_t.normalizeRect(x.current.x,x.current.y,G.clientX,G.clientY);_t.drawRectangle(J,V,te,Ee,Ye,!0)},q=async G=>{if(!v.current||!x.current)return;v.current=!1;const{x:J,y:$,width:V,height:te}=_t.normalizeRect(x.current.x,x.current.y,G.clientX,G.clientY);if(x.current=null,f.length>=p){h(`Maximum ${p} screenshots allowed`),S.current&&b.current&&_t.redrawRectangles(S.current,b.current,f);return}const Ee=f.length+1,Ye={id:`rect-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,x:J,y:$,width:V,height:te,number:Ee};s(Se=>[...Se,Ye]);try{b.current&&(b.current.style.visibility="hidden");const Se=await bg(J,$,V,te);b.current&&(b.current.style.visibility="visible"),o(be=>[...be,Se])}catch(Se){b.current&&(b.current.style.visibility="visible"),console.error("Failed to capture screenshot:",Se),h("Failed to capture screenshot"),s(be=>be.filter(Fe=>Fe.id!==Ye.id))}};B.addEventListener("mousedown",j),document.addEventListener("mousemove",Z),document.addEventListener("mouseup",q),R.push(()=>{B.removeEventListener("mousedown",j),document.removeEventListener("mousemove",Z),document.removeEventListener("mouseup",q)})}const k=()=>{b.current&&S.current&&(_t.initCanvas(b.current),S.current=b.current.getContext("2d"),S.current&&_t.redrawRectangles(S.current,b.current,f))};window.addEventListener("resize",k),R.push(()=>{window.removeEventListener("resize",k)})});return()=>{cancelAnimationFrame(N),R.forEach(B=>B())}},[i,f,s,o,h,m,p]),{canvasRef:b}}function Eg(i){var f;return i?i.replace(/\/$/,""):typeof window!="undefined"&&((f=window.location)!=null&&f.origin)?window.location.origin:""}function dr(i,f){const s=Eg(i);return s?`${s}${f.startsWith("/")?"":"/"}${f}`:f}function xg(i){if(i instanceof Error){const f=i.message.toLowerCase();if(f.includes("network")||f.includes("fetch")||f.includes("connection")||f.includes("timeout")||f.includes("failed to fetch")||i.name==="TypeError")return{message:"Unable to connect. Please check your internet connection and try again.",isNetworkError:!0}}return{message:"Something went wrong. Please try again.",isNetworkError:!1}}async function Tg(i,f,s,o){const h=dr(o||"","/api/screenshot"),m=new FormData;m.append("appId",f),m.append("index",String(s)),m.append("file",i,`screenshot-${s}.png`);try{const p=await fetch(h,{method:"POST",body:m,mode:"cors",credentials:"omit"});if(!p.ok)return console.error("[FeedbackWidget] Screenshot upload failed:",p.status),null;const b=await p.json();return!(b!=null&&b.url)||!(b!=null&&b.storagePath)?(console.error("[FeedbackWidget] Screenshot upload response missing fields."),null):b}catch(p){return console.error("[FeedbackWidget] Screenshot upload exception:",p),null}}async function zg(i,f){const s=dr(f||"","/api/feedback");try{const o=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),mode:"cors",credentials:"omit"});if(!o.ok){let h="Something went wrong. Please try again.";try{const m=await o.json();m!=null&&m.error&&(h=m.error)}catch(m){}return{success:!1,error:h,isNetworkError:o.status>=500}}return{success:!0}}catch(o){const{message:h,isNetworkError:m}=xg(o);return{success:!1,error:h,isNetworkError:m}}}const oc={cookieKeys:["token","jwt","access_token","auth_token","sb-access-token"],localStorageKeys:["token","jwt","access_token","auth_token","supabase.auth.token"],userIdClaim:"sub"};function wg(i){try{const f=i.split(".");if(f.length!==3)return null;const o=f[1].replace(/-/g,"+").replace(/_/g,"/"),h=decodeURIComponent(atob(o).split("").map(m=>"%"+("00"+m.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(h)}catch(f){return null}}function Ag(i){if(typeof document=="undefined")return null;const f=document.cookie.split(";");for(const s of f){const[o,...h]=s.trim().split("=");if(o===i)return decodeURIComponent(h.join("="))}return null}function Mg(i){var f;if(typeof window=="undefined")return null;try{const s=localStorage.getItem(i);if(!s)return null;try{const o=JSON.parse(s);if(typeof o=="object"&&o!==null){if(o.access_token)return o.access_token;if(o.token)return o.token;if((f=o.currentSession)!=null&&f.access_token)return o.currentSession.access_token}return s}catch(o){return s}}catch(s){return null}}function hr(i,f){const s=wg(i);if(!s)return null;const o=s[f];return typeof o=="string"?o:typeof s.user_id=="string"?s.user_id:null}function _g(i={}){var s,o,h,m,p;const f={cookieKeys:(s=i.cookieKeys)!=null?s:oc.cookieKeys,localStorageKeys:(o=i.localStorageKeys)!=null?o:oc.localStorageKeys,userIdClaim:(h=i.userIdClaim)!=null?h:oc.userIdClaim};for(const b of(m=f.cookieKeys)!=null?m:[]){const S=Ag(b);if(S){const v=hr(S,f.userIdClaim);if(v)return v}}for(const b of(p=f.localStorageKeys)!=null?p:[]){const S=Mg(b);if(S){const v=hr(S,f.userIdClaim);if(v)return v}}}function Dg({effectiveAppId:i,effectiveApiBaseUrl:f,effectiveJwtConfig:s,capturedScreenshots:o,setCapturedScreenshots:h,setDrawnRectangles:m,setIsScreenshotListExpanded:p,setIsExpanded:b}){const S="feedback-widget-initials",[v,x]=K.useState("bug"),[_,R]=K.useState(""),[N,B]=K.useState(""),[Y,k]=K.useState("idle"),[j,Z]=K.useState(""),[q,G]=K.useState(!1),[J,$]=K.useState(!1),[V,te]=K.useState(!1),Ee=K.useRef(null);K.useEffect(()=>{try{const T=localStorage.getItem(S);T&&Se(T)}catch(T){}},[]);const Ye=K.useCallback(T=>{R(T),J&&($(!1),k("idle"),Z(""))},[J]),Se=K.useCallback(T=>{B(T),V&&(te(!1),k("idle"),Z(""))},[V]),be=K.useCallback(()=>{const T=_g(s);return pt({url:typeof window!="undefined"?window.location.href:"",userAgent:typeof navigator!="undefined"?navigator.userAgent:"",timestamp:new Date().toISOString()},T&&{userId:T})},[s]),Fe=K.useCallback(()=>{Ee.current&&(clearTimeout(Ee.current),Ee.current=null),b(!1),k("idle"),Z("")},[b]),Be=K.useCallback(async T=>{T&&T.preventDefault();const H=!N.trim(),F=!_.trim();if(H||F){te(H),$(F),k("idle"),Z("");return}k("loading"),Z(""),G(!1),$(!1),te(!1);const ge=be(),me=[];for(let C=0;C<o.length;C++){const L=o[C];try{const le=await(await fetch(L.blobUrl)).blob(),ne=await Tg(le,i,C+1,f);ne?me.push({url:ne.url,storagePath:ne.storagePath,region:L.region,capturedAt:L.capturedAt,sizeBytes:L.sizeBytes}):console.warn(`[FeedbackWidget] Failed to upload screenshot ${C+1}`)}catch(X){console.error(`[FeedbackWidget] Error uploading screenshot ${C+1}:`,X)}}const y=await zg({app_id:i,type:v,message:_.trim(),initials:N.trim()||void 0,elements:me.length>0?me:void 0,metadata:ge},f);if(y.success){if(k("success"),N.trim())try{localStorage.setItem(S,N.trim())}catch(C){}Ye(""),x("general"),o.forEach(C=>Tu(C)),h([]),m([]),p(!1),Ee.current=setTimeout(()=>{b(!1),k("idle")},600)}else k("error"),Z(y.error||"Something went wrong. Please try again."),G(y.isNetworkError||!1)},[v,_,N,i,f,be,o,h,m,p,b]),ee=K.useCallback(()=>{Be()},[Be]);return{feedbackType:v,setFeedbackType:x,feedbackMessage:_,setFeedbackMessage:Ye,feedbackInitials:N,setFeedbackInitials:Se,submissionState:Y,setSubmissionState:k,errorMessage:j,isNetworkError:q,isValidationError:J,isInitialsValidationError:V,autoCloseTimerRef:Ee,handleClose:Fe,handleSubmit:Be,handleRetry:ee}}function Cg(i,f,s){const{handleClose:o,handleSubmit:h,handleRetry:m,handleEnterSelectionMode:p,handleToggleScreenshotList:b,handleClearAllScreenshots:S,handleRemoveScreenshot:v,handleShowScreenshotPreview:x,handleFileUpload:_,setFeedbackType:R,setFeedbackMessage:N,setFeedbackInitials:B}=f,Y=i.querySelector(".feedback-close-button"),k=i.querySelector(".feedback-form-body"),j=i.querySelector("#feedback-type"),Z=i.querySelector("#feedback-message"),q=i.querySelector("#feedback-initials"),G=i.querySelector(".feedback-retry-button"),J=i.querySelector(".feedback-select-button"),$=i.querySelector(".feedback-screenshot-menu"),V=i.querySelector("#screenshot-file-input"),te=i.querySelector("#widget-tooltip");Y&&Y.addEventListener("click",o),k&&k.addEventListener("submit",h),j&&(j.addEventListener("change",ee=>R(ee.target.value)),j.addEventListener("keydown",ee=>ee.stopPropagation())),Z&&(Z.addEventListener("input",ee=>N(ee.target.value)),Z.addEventListener("keydown",ee=>ee.stopPropagation()),Z.addEventListener("keyup",ee=>ee.stopPropagation()),Z.addEventListener("keypress",ee=>ee.stopPropagation())),q&&(q.addEventListener("input",ee=>B(ee.target.value)),q.addEventListener("keydown",ee=>ee.stopPropagation())),G&&G.addEventListener("click",m),J&&$&&J.addEventListener("click",ee=>{ee.stopPropagation(),te&&te.classList.remove("visible"),$.classList.toggle("open")}),J&&te&&(J.addEventListener("mouseenter",()=>{const ee=J.getAttribute("data-tooltip");if(ee){const T=J.getBoundingClientRect(),H=window.innerHeight,F=T.top+T.height/2;te.textContent=ee,te.style.left=`${T.left+T.width/2}px`,te.style.transform="translateX(-50%)",F>H/2?(te.style.top=`${T.top-8}px`,te.style.transform+=" translateY(-100%)"):(te.style.top=`${T.bottom+8}px`,te.style.transform+=" translateY(0)"),te.classList.add("visible")}}),J.addEventListener("mouseleave",()=>te.classList.remove("visible")));const Ee=i.querySelector('[data-action="capture"]'),Ye=i.querySelector('[data-action="upload"]');Ee&&$&&Ee.addEventListener("click",()=>{$.classList.remove("open"),p()}),Ye&&V&&$&&Ye.addEventListener("click",()=>{$.classList.remove("open"),V.click()}),V&&V.addEventListener("change",ee=>{_(ee.target.files),V.value=""});const Se=i.querySelector("#screenshot-dropzone");Se&&(Se.addEventListener("dragover",ee=>{ee.preventDefault(),Se.classList.add("drag-over")}),Se.addEventListener("dragleave",()=>Se.classList.remove("drag-over")),Se.addEventListener("drop",ee=>{var T;ee.preventDefault(),Se.classList.remove("drag-over"),_((T=ee.dataTransfer)==null?void 0:T.files)}));const be=ee=>{const T=i.querySelector(".feedback-screenshot-container");T&&!T.contains(ee.target)&&($==null||$.classList.remove("open"))};document.addEventListener("click",be);const Fe=i.querySelector(".screenshot-list-badge"),Be=i.querySelector(".screenshot-list-clear-all");return Fe&&Fe.addEventListener("click",b),Be&&Be.addEventListener("click",S),i.querySelectorAll(".screenshot-thumbnail-remove").forEach(ee=>{ee.addEventListener("click",T=>{T.stopPropagation(),v(parseInt(T.currentTarget.getAttribute("data-remove-index")||"0",10))})}),i.querySelectorAll(".screenshot-thumbnail-wrapper").forEach(ee=>{ee.addEventListener("click",T=>{if(T.target.closest(".screenshot-thumbnail-remove"))return;const H=T.currentTarget.closest(".screenshot-thumbnail-item"),F=parseInt((H==null?void 0:H.getAttribute("data-screenshot-index"))||"0",10);s[F]&&x(s[F])})}),()=>document.removeEventListener("click",be)}function Og(i,f,s,o,h,m,p,b){i.addEventListener("mousedown",v=>{!o.current&&!s.current&&h.current(v)});const S=f.querySelector("#widget-tooltip");if(i.addEventListener("click",()=>{if(S&&S.classList.remove("visible"),s.current)return;const v=m.current;m.current=!1,v||(o.current?p():b(!0))}),S){const v=(x,_)=>{S.textContent=_;const R=window.innerWidth,N=x.left+x.width/2,B=x.top+x.height/2;N>R/2?(S.style.left=`${x.left-8}px`,S.style.transform="translateX(-100%)"):(S.style.left=`${x.right+8}px`,S.style.transform="translateX(0)"),S.style.top=`${B}px`,S.style.transform+=" translateY(-50%)",S.classList.add("visible")};i.addEventListener("mouseenter",()=>{!s.current&&!o.current&&v(i.getBoundingClientRect(),"Provide Feedback")}),i.addEventListener("mouseleave",()=>S.classList.remove("visible"))}}const Ug='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';function Rg(){return K.useSyncExternalStore(()=>()=>{},()=>!0,()=>!1)}mr.init=function(f){Fi(f)};function mr({position:i,appId:f,jwtConfig:s,apiBaseUrl:o}={}){var Mu,Tn;const h=$h(),m=(Mu=f!=null?f:h==null?void 0:h.appId)!=null?Mu:"default",p=(Tn=i!=null?i:h==null?void 0:h.position)!=null?Tn:"top-right",b=s!=null?s:h==null?void 0:h.jwtConfig,S=o!=null?o:h==null?void 0:h.apiBaseUrl,v=K.useRef(null),x=K.useRef(null),_=K.useRef(null),R=K.useRef(!1),N=K.useRef(!1),[B,Y]=K.useState(!1),[k,j]=K.useState(!1),Z=K.useRef(!1);N.current=B,K.useEffect(()=>{if(Z.current&&!B){j(!0);const ct=setTimeout(()=>j(!1),150);return()=>clearTimeout(ct)}Z.current=B},[B]);const q=Rg(),{widgetPosition:G,isDragging:J,isSnapping:$,isInitialized:V,isAnimatingToCorner:te,widgetState:Ee}=om(p),{handleMouseDownRef:Ye,hasDraggedRef:Se}=fm({widgetPosition:G,isExpanded:B}),{capturedScreenshots:be,setCapturedScreenshots:Fe,drawnRectangles:Be,setDrawnRectangles:ee,selectionWarning:T,setSelectionWarning:H,isScreenshotListExpanded:F,setIsScreenshotListExpanded:ge,showWarning:me,handleRemoveScreenshot:y,handleClearAllScreenshots:C,handleToggleScreenshotList:L,handleShowScreenshotPreview:X,handleFileUpload:le,MAX_SCREENSHOTS:ne}=pg({shadowRootRef:x}),{isSelectionMode:oe,isSelectionModeRef:Ve,handleEnterSelectionMode:Ce,handleExitSelectionMode:el}=rm({setIsExpanded:Y,setSelectionWarning:H});Sg({isSelectionMode:oe,drawnRectangles:Be,setDrawnRectangles:ee,setCapturedScreenshots:Fe,showWarning:me,shadowRootRef:x,maxScreenshots:ne});const{feedbackType:Wl,setFeedbackType:Ta,feedbackMessage:En,setFeedbackMessage:$t,feedbackInitials:za,setFeedbackInitials:wa,submissionState:zu,errorMessage:xn,isNetworkError:Aa,isValidationError:Fl,isInitialsValidationError:Il,handleClose:wu,handleSubmit:Au,handleRetry:nt}=Dg({effectiveAppId:m,effectiveApiBaseUrl:S,effectiveJwtConfig:b,capturedScreenshots:be,setCapturedScreenshots:Fe,setDrawnRectangles:ee,setIsScreenshotListExpanded:ge,setIsExpanded:Y});return K.useEffect(()=>{if(!v.current||!q||!V)return;x.current||(x.current=v.current.attachShadow({mode:"open"}));const ct=x.current,Pl=B?"expanded":"",_u=J?"dragging":"",zn=V?"":"initializing",Du=te?"animating-to-corner":"",dc=J||$||te;let St;if(dc)St=`left: ${G.x}px; top: ${G.y}px; right: auto; bottom: auto;`;else switch(Ee.corner){case"top-left":St="left: 24px; top: 24px; right: auto; bottom: auto;";break;case"top-right":St="right: 24px; top: 24px; left: auto; bottom: auto;";break;case"bottom-left":St="left: 24px; bottom: 24px; right: auto; top: auto;";break;default:St="right: 24px; bottom: 24px; left: auto; top: auto;";break}const ot=Be.length>0,Xt=oe?Rh(be.length,T):ot?kf():"",ut=Kh(Wl,En,zu,xn,Aa,be,F,!Fl&&!Il,Fl,za,Il);let Ct=_.current;if(Ct&&ct.contains(Ct)){Ct.className=`feedback-widget-morph ${Pl} ${_u} ${zn} ${Du}`.trim(),Ct.style.cssText=St,Ct.setAttribute("aria-expanded",String(B));const Ot=Ct.querySelector(".form-layer");if(Ot&&B){const Ke=Ot.querySelector("#feedback-message"),ke=Ot.querySelector("#feedback-initials"),tl=ct.activeElement===Ke,ea=ct.activeElement===ke,Cu=Ke==null?void 0:Ke.selectionStart,wn=Ke==null?void 0:Ke.selectionEnd,Ma=Ke==null?void 0:Ke.scrollTop,Tl=ke==null?void 0:ke.selectionStart,Ou=ke==null?void 0:ke.selectionEnd;if(Ot.innerHTML=ut,tl){const st=Ot.querySelector("#feedback-message");st&&(st.focus(),Cu!==void 0&&wn!==void 0&&st.setSelectionRange(Cu,wn),Ma!==void 0&&(st.scrollTop=Ma),st.setSelectionRange(st.selectionStart,st.selectionStart))}else if(ea){const st=Ot.querySelector("#feedback-initials");st&&(st.focus(),Tl!==void 0&&Ou!==void 0&&st.setSelectionRange(Tl,Ou))}}const Qt=ct.querySelector(".selection-mode-overlay"),it=ct.querySelector(".selection-mode-canvas"),xl=Be.length>0;if(oe&&!Qt)it&&it.remove(),Ct.insertAdjacentHTML("beforebegin",Xt);else if(!oe&&Qt)Qt.remove(),xl&&it?it.classList.add("display-only"):it&&it.remove();else if(!oe&&!Qt&&xl)it?it.classList.contains("display-only")||it.classList.add("display-only"):Ct.insertAdjacentHTML("beforebegin",kf());else if(!oe&&!Qt&&!xl&&it)it.remove();else if(oe&&Qt){const Ke=Qt.querySelector(".selection-mode-counter");Ke&&(Ke.textContent=`${be.length}/5 captured`);const ke=Qt.querySelector(".selection-mode-warning");if(T&&!ke){const tl=Qt.querySelector(".selection-mode-hint");tl&&tl.insertAdjacentHTML("beforebegin",`<div class="selection-mode-warning">${T}</div>`)}else!T&&ke?ke.remove():T&&ke&&(ke.textContent=T)}}else ct.innerHTML=`<style>${Gh()}</style>${Xt}<div class="feedback-tooltip" id="widget-tooltip">Provide Feedback</div><div class="feedback-widget-morph ${Pl} ${_u} ${zn} ${Du}" style="${St}" role="dialog" aria-label="Feedback widget" aria-expanded="${B}"><div class="button-layer" data-tooltip="Provide Feedback">${Ug}</div><div class="form-layer">${ut}</div></div>`,Ct=ct.querySelector(".feedback-widget-morph"),_.current=Ct;if(_.current&&!R.current&&(R.current=!0,Og(_.current,ct,N,Ve,Ye,Se,el,Y)),oe){const Ot=ct.querySelector(".selection-mode-done-button");Ot&&Ot.addEventListener("click",el)}return Cg(ct,{handleClose:wu,handleSubmit:Au,handleRetry:nt,handleEnterSelectionMode:Ce,handleToggleScreenshotList:L,handleClearAllScreenshots:C,handleRemoveScreenshot:y,handleShowScreenshotPreview:X,handleFileUpload:le,setFeedbackType:Ta,setFeedbackMessage:$t,setFeedbackInitials:wa},be)},[B,k,G,Ee.corner,J,$,te,q,V,wu,Au,nt,Ce,el,L,C,y,X,le,Wl,En,za,zu,xn,Aa,Fl,Il,oe,be,Be,F,T,Ta,$t,wa,Ve,Ye,Se]),Mf.jsx("div",{ref:v,"data-feedback-widget":!0})}const gr="feedback-widget-root",Ng=["bottom-right","bottom-left","top-right","top-left"],Hg=["alpha","beta","dev","stable"];let xa=null,El=null,fc=null;function rc(){var s,o;if(typeof document=="undefined")return null;const i=document.currentScript;if(i&&i.tagName==="SCRIPT")return i;const f=Array.from(document.getElementsByTagName("script"));return(o=(s=f.find(h=>h.dataset.appId))!=null?s:f.find(h=>h.dataset.feedbackWidget!==void 0))!=null?o:null}function Bg(i){if(i)return Ng.includes(i)?i:void 0}function kg(i){if(!i)return;const f=i.toLowerCase();return Hg.includes(f)?f:void 0}function yr(i){var s;if(!i)return;let f=(s=i.dataset.apiBase)==null?void 0:s.trim();if(!f&&i.src)try{f=new URL(i.src,window.location.href).origin}catch(o){f=void 0}return f}function vr(i){if(i)return kg(i.dataset.env)}function br(i){var m;if(!i)return null;const f=(m=i.dataset.appId)==null?void 0:m.trim();if(!f)return null;const s=Bg(i.dataset.position),o=vr(i),h=yr(i);return{appId:f,position:s,env:o,apiBaseUrl:h}}function pr(i){var s,o;const f=rc();return hn(pt({},i),{env:(s=i.env)!=null?s:vr(f),apiBaseUrl:(o=i.apiBaseUrl)!=null?o:yr(f)})}async function qg(i){const f=i.apiBaseUrl||window.location.origin,s=new URL("/api/config",f);s.searchParams.set("app",i.appId),i.env&&s.searchParams.set("env",i.env);try{const o=await fetch(s.toString(),{method:"GET",mode:"cors",credentials:"omit"});return o.ok?await o.json():null}catch(o){return null}}function Lg(){if(El&&document.body.contains(El))return El;const i=document.getElementById(gr);if(i)return El=i,i;const f=document.createElement("div");return f.id=gr,document.body.appendChild(f),El=f,f}function Yg(i){const f=pr(i);Fi(f),fc=f}function sc(i){var o;if(typeof document=="undefined")return;const f=(o=i!=null?i:fc)!=null?o:br(rc());if(!f){console.error("[FeedbackWidget] Missing config. Provide appId to mount the widget.");return}const s=pr(f);if(!document.body){window.addEventListener("DOMContentLoaded",()=>sc(s),{once:!0});return}(async()=>{var p;const h=await qg(s);if((h==null?void 0:h.enabled)===!1){console.info("[FeedbackWidget] Widget disabled by remote config.");return}const m=hn(pt({},s),{apiBaseUrl:(p=h==null?void 0:h.apiBaseUrl)!=null?p:s.apiBaseUrl});try{Fi(m)}catch(b){console.error("[FeedbackWidget] Invalid config.",b);return}fc=m,xa||(xa=Mh.createRoot(Lg())),xa.render(Mf.jsx(mr,{}))})()}function jg(){xa&&(xa.unmount(),xa=null),El&&(El.remove(),El=null)}function Gg(){const i={init:Yg,mount:sc,unmount:jg};window.FeedbackWidget?window.FeedbackWidget=pt(pt({},window.FeedbackWidget),i):window.FeedbackWidget=i}if(typeof window!="undefined"){Gg();const i=br(rc());i&&sc(i)}})();
//# sourceMappingURL=widget.js.map
