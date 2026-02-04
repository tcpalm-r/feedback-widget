var eb=Object.defineProperty,tb=Object.defineProperties;var lb=Object.getOwnPropertyDescriptors;var Xi=Object.getOwnPropertySymbols;var y0=Object.prototype.hasOwnProperty,v0=Object.prototype.propertyIsEnumerable;var g0=(Be,ke,Ie)=>ke in Be?eb(Be,ke,{enumerable:!0,configurable:!0,writable:!0,value:Ie}):Be[ke]=Ie,vt=(Be,ke)=>{for(var Ie in ke||(ke={}))y0.call(ke,Ie)&&g0(Be,Ie,ke[Ie]);if(Xi)for(var Ie of Xi(ke))v0.call(ke,Ie)&&g0(Be,Ie,ke[Ie]);return Be},mn=(Be,ke)=>tb(Be,lb(ke));var b0=(Be,ke)=>{var Ie={};for(var jt in Be)y0.call(Be,jt)&&ke.indexOf(jt)<0&&(Ie[jt]=Be[jt]);if(Be!=null&&Xi)for(var jt of Xi(Be))ke.indexOf(jt)<0&&v0.call(Be,jt)&&(Ie[jt]=Be[jt]);return Ie};(function(){"use strict";var pr;var Be={exports:{}},ke={};var Ie;function jt(){if(Ie)return ke;Ie=1;var i=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function s(o,h,m){var p=null;if(m!==void 0&&(p=""+m),h.key!==void 0&&(p=""+h.key),"key"in h){m={};for(var b in h)b!=="key"&&(m[b]=h[b])}else m=h;return h=m.ref,{$$typeof:i,type:o,key:p,ref:h!==void 0?h:null,props:m}}return ke.Fragment=f,ke.jsx=s,ke.jsxs=s,ke}var wf;function p0(){return wf||(wf=1,Be.exports=jt()),Be.exports}var Af=p0(),Qi={exports:{}},gn={},Zi={exports:{}},Vi={};var Mf;function S0(){return Mf||(Mf=1,(function(i){function f(w,N){var $=w.length;w.push(N);e:for(;0<$;){var me=$-1>>>1,be=w[me];if(0<h(be,N))w[me]=N,w[$]=be,$=me;else break e}}function s(w){return w.length===0?null:w[0]}function o(w){if(w.length===0)return null;var N=w[0],$=w.pop();if($!==N){w[0]=$;e:for(var me=0,be=w.length,y=be>>>1;me<y;){var U=2*(me+1)-1,L=w[U],X=U+1,le=w[X];if(0>h(L,$))X<be&&0>h(le,L)?(w[me]=le,w[X]=$,me=X):(w[me]=L,w[U]=$,me=U);else if(X<be&&0>h(le,$))w[me]=le,w[X]=$,me=X;else break e}}return N}function h(w,N){var $=w.sortIndex-N.sortIndex;return $!==0?$:w.id-N.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var m=performance;i.unstable_now=function(){return m.now()}}else{var p=Date,b=p.now();i.unstable_now=function(){return p.now()-b}}var S=[],v=[],x=1,_=null,R=3,H=!1,B=!1,Y=!1,q=!1,j=typeof setTimeout=="function"?setTimeout:null,V=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate!="undefined"?setImmediate:null;function G(w){for(var N=s(v);N!==null;){if(N.callback===null)o(v);else if(N.startTime<=w)o(v),N.sortIndex=N.expirationTime,f(S,N);else break;N=s(v)}}function K(w){if(Y=!1,G(w),!B)if(s(S)!==null)B=!0,J||(J=!0,Se());else{var N=s(v);N!==null&&P(K,N.startTime-w)}}var J=!1,Z=-1,te=5,_e=-1;function Qe(){return q?!0:!(i.unstable_now()-_e<te)}function ve(){if(q=!1,J){var w=i.unstable_now();_e=w;var N=!0;try{e:{B=!1,Y&&(Y=!1,V(Z),Z=-1),H=!0;var $=R;try{t:{for(G(w),_=s(S);_!==null&&!(_.expirationTime>w&&Qe());){var me=_.callback;if(typeof me=="function"){_.callback=null,R=_.priorityLevel;var be=me(_.expirationTime<=w);if(w=i.unstable_now(),typeof be=="function"){_.callback=be,G(w),N=!0;break t}_===s(S)&&o(S),G(w)}else o(S);_=s(S)}if(_!==null)N=!0;else{var y=s(v);y!==null&&P(K,y.startTime-w),N=!1}}break e}finally{_=null,R=$,H=!1}N=void 0}}finally{N?Se():J=!1}}}var Se;if(typeof k=="function")Se=function(){k(ve)};else if(typeof MessageChannel!="undefined"){var Ae=new MessageChannel,Ze=Ae.port2;Ae.port1.onmessage=ve,Se=function(){Ze.postMessage(null)}}else Se=function(){j(ve,0)};function P(w,N){Z=j(function(){w(i.unstable_now())},N)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(w){w.callback=null},i.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<w?Math.floor(1e3/w):5},i.unstable_getCurrentPriorityLevel=function(){return R},i.unstable_next=function(w){switch(R){case 1:case 2:case 3:var N=3;break;default:N=R}var $=R;R=N;try{return w()}finally{R=$}},i.unstable_requestPaint=function(){q=!0},i.unstable_runWithPriority=function(w,N){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var $=R;R=w;try{return N()}finally{R=$}},i.unstable_scheduleCallback=function(w,N,$){var me=i.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?me+$:me):$=me,w){case 1:var be=-1;break;case 2:be=250;break;case 5:be=1073741823;break;case 4:be=1e4;break;default:be=5e3}return be=$+be,w={id:x++,callback:N,priorityLevel:w,startTime:$,expirationTime:be,sortIndex:-1},$>me?(w.sortIndex=$,f(v,w),s(S)===null&&w===s(v)&&(Y?(V(Z),Z=-1):Y=!0,P(K,$-me))):(w.sortIndex=be,f(S,w),B||H||(B=!0,J||(J=!0,Se()))),w},i.unstable_shouldYield=Qe,i.unstable_wrapCallback=function(w){var N=R;return function(){var $=R;R=N;try{return w.apply(this,arguments)}finally{R=$}}}})(Vi)),Vi}var _f;function E0(){return _f||(_f=1,Zi.exports=S0()),Zi.exports}var Ki={exports:{}},ae={};var Df;function x0(){if(Df)return ae;Df=1;var i=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),h=Symbol.for("react.profiler"),m=Symbol.for("react.consumer"),p=Symbol.for("react.context"),b=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),R=Symbol.iterator;function H(y){return y===null||typeof y!="object"?null:(y=R&&y[R]||y["@@iterator"],typeof y=="function"?y:null)}var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Y=Object.assign,q={};function j(y,U,L){this.props=y,this.context=U,this.refs=q,this.updater=L||B}j.prototype.isReactComponent={},j.prototype.setState=function(y,U){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,U,"setState")},j.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};function V(){}V.prototype=j.prototype;function k(y,U,L){this.props=y,this.context=U,this.refs=q,this.updater=L||B}var G=k.prototype=new V;G.constructor=k,Y(G,j.prototype),G.isPureReactComponent=!0;var K=Array.isArray;function J(){}var Z={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function _e(y,U,L){var X=L.ref;return{$$typeof:i,type:y,key:U,ref:X!==void 0?X:null,props:L}}function Qe(y,U){return _e(y.type,U,y.props)}function ve(y){return typeof y=="object"&&y!==null&&y.$$typeof===i}function Se(y){var U={"=":"=0",":":"=2"};return"$"+y.replace(/[=:]/g,function(L){return U[L]})}var Ae=/\/+/g;function Ze(y,U){return typeof y=="object"&&y!==null&&y.key!=null?Se(""+y.key):U.toString(36)}function P(y){switch(y.status){case"fulfilled":return y.value;case"rejected":throw y.reason;default:switch(typeof y.status=="string"?y.then(J,J):(y.status="pending",y.then(function(U){y.status==="pending"&&(y.status="fulfilled",y.value=U)},function(U){y.status==="pending"&&(y.status="rejected",y.reason=U)})),y.status){case"fulfilled":return y.value;case"rejected":throw y.reason}}throw y}function w(y,U,L,X,le){var oe=typeof y;(oe==="undefined"||oe==="boolean")&&(y=null);var ce=!1;if(y===null)ce=!0;else switch(oe){case"bigint":case"string":case"number":ce=!0;break;case"object":switch(y.$$typeof){case i:case f:ce=!0;break;case x:return ce=y._init,w(ce(y._payload),U,L,X,le)}}if(ce)return le=le(y),ce=X===""?"."+Ze(y,0):X,K(le)?(L="",ce!=null&&(L=ce.replace(Ae,"$&/")+"/"),w(le,U,L,"",function(Pt){return Pt})):le!=null&&(ve(le)&&(le=Qe(le,L+(le.key==null||y&&y.key===le.key?"":(""+le.key).replace(Ae,"$&/")+"/")+ce)),U.push(le)),1;ce=0;var Ke=X===""?".":X+":";if(K(y))for(var Oe=0;Oe<y.length;Oe++)X=y[Oe],oe=Ke+Ze(X,Oe),ce+=w(X,U,L,oe,le);else if(Oe=H(y),typeof Oe=="function")for(y=Oe.call(y),Oe=0;!(X=y.next()).done;)X=X.value,oe=Ke+Ze(X,Oe++),ce+=w(X,U,L,oe,le);else if(oe==="object"){if(typeof y.then=="function")return w(P(y),U,L,X,le);throw U=String(y),Error("Objects are not valid as a React child (found: "+(U==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":U)+"). If you meant to render a collection of children, use an array instead.")}return ce}function N(y,U,L){if(y==null)return y;var X=[],le=0;return w(y,X,"","",function(oe){return U.call(L,oe,le++)}),X}function $(y){if(y._status===-1){var U=y._result;U=U(),U.then(function(L){(y._status===0||y._status===-1)&&(y._status=1,y._result=L)},function(L){(y._status===0||y._status===-1)&&(y._status=2,y._result=L)}),y._status===-1&&(y._status=0,y._result=U)}if(y._status===1)return y._result.default;throw y._result}var me=typeof reportError=="function"?reportError:function(y){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var U=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof y=="object"&&y!==null&&typeof y.message=="string"?String(y.message):String(y),error:y});if(!window.dispatchEvent(U))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",y);return}console.error(y)},be={map:N,forEach:function(y,U,L){N(y,function(){U.apply(this,arguments)},L)},count:function(y){var U=0;return N(y,function(){U++}),U},toArray:function(y){return N(y,function(U){return U})||[]},only:function(y){if(!ve(y))throw Error("React.Children.only expected to receive a single React element child.");return y}};return ae.Activity=_,ae.Children=be,ae.Component=j,ae.Fragment=s,ae.Profiler=h,ae.PureComponent=k,ae.StrictMode=o,ae.Suspense=S,ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Z,ae.__COMPILER_RUNTIME={__proto__:null,c:function(y){return Z.H.useMemoCache(y)}},ae.cache=function(y){return function(){return y.apply(null,arguments)}},ae.cacheSignal=function(){return null},ae.cloneElement=function(y,U,L){if(y==null)throw Error("The argument must be a React element, but you passed "+y+".");var X=Y({},y.props),le=y.key;if(U!=null)for(oe in U.key!==void 0&&(le=""+U.key),U)!te.call(U,oe)||oe==="key"||oe==="__self"||oe==="__source"||oe==="ref"&&U.ref===void 0||(X[oe]=U[oe]);var oe=arguments.length-2;if(oe===1)X.children=L;else if(1<oe){for(var ce=Array(oe),Ke=0;Ke<oe;Ke++)ce[Ke]=arguments[Ke+2];X.children=ce}return _e(y.type,le,X)},ae.createContext=function(y){return y={$$typeof:p,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null},y.Provider=y,y.Consumer={$$typeof:m,_context:y},y},ae.createElement=function(y,U,L){var X,le={},oe=null;if(U!=null)for(X in U.key!==void 0&&(oe=""+U.key),U)te.call(U,X)&&X!=="key"&&X!=="__self"&&X!=="__source"&&(le[X]=U[X]);var ce=arguments.length-2;if(ce===1)le.children=L;else if(1<ce){for(var Ke=Array(ce),Oe=0;Oe<ce;Oe++)Ke[Oe]=arguments[Oe+2];le.children=Ke}if(y&&y.defaultProps)for(X in ce=y.defaultProps,ce)le[X]===void 0&&(le[X]=ce[X]);return _e(y,oe,le)},ae.createRef=function(){return{current:null}},ae.forwardRef=function(y){return{$$typeof:b,render:y}},ae.isValidElement=ve,ae.lazy=function(y){return{$$typeof:x,_payload:{_status:-1,_result:y},_init:$}},ae.memo=function(y,U){return{$$typeof:v,type:y,compare:U===void 0?null:U}},ae.startTransition=function(y){var U=Z.T,L={};Z.T=L;try{var X=y(),le=Z.S;le!==null&&le(L,X),typeof X=="object"&&X!==null&&typeof X.then=="function"&&X.then(J,me)}catch(oe){me(oe)}finally{U!==null&&L.types!==null&&(U.types=L.types),Z.T=U}},ae.unstable_useCacheRefresh=function(){return Z.H.useCacheRefresh()},ae.use=function(y){return Z.H.use(y)},ae.useActionState=function(y,U,L){return Z.H.useActionState(y,U,L)},ae.useCallback=function(y,U){return Z.H.useCallback(y,U)},ae.useContext=function(y){return Z.H.useContext(y)},ae.useDebugValue=function(){},ae.useDeferredValue=function(y,U){return Z.H.useDeferredValue(y,U)},ae.useEffect=function(y,U){return Z.H.useEffect(y,U)},ae.useEffectEvent=function(y){return Z.H.useEffectEvent(y)},ae.useId=function(){return Z.H.useId()},ae.useImperativeHandle=function(y,U,L){return Z.H.useImperativeHandle(y,U,L)},ae.useInsertionEffect=function(y,U){return Z.H.useInsertionEffect(y,U)},ae.useLayoutEffect=function(y,U){return Z.H.useLayoutEffect(y,U)},ae.useMemo=function(y,U){return Z.H.useMemo(y,U)},ae.useOptimistic=function(y,U){return Z.H.useOptimistic(y,U)},ae.useReducer=function(y,U,L){return Z.H.useReducer(y,U,L)},ae.useRef=function(y){return Z.H.useRef(y)},ae.useState=function(y){return Z.H.useState(y)},ae.useSyncExternalStore=function(y,U,L){return Z.H.useSyncExternalStore(y,U,L)},ae.useTransition=function(){return Z.H.useTransition()},ae.version="19.2.3",ae}var Cf;function Ji(){return Cf||(Cf=1,Ki.exports=x0()),Ki.exports}var $i={exports:{}},nt={};var Of;function T0(){if(Of)return nt;Of=1;var i=Ji();function f(S){var v="https://react.dev/errors/"+S;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)v+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+S+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var o={d:{f:s,r:function(){throw Error(f(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},h=Symbol.for("react.portal");function m(S,v,x){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:h,key:_==null?null:""+_,children:S,containerInfo:v,implementation:x}}var p=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function b(S,v){if(S==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return nt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,nt.createPortal=function(S,v){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(f(299));return m(S,v,null,x)},nt.flushSync=function(S){var v=p.T,x=o.p;try{if(p.T=null,o.p=2,S)return S()}finally{p.T=v,o.p=x,o.d.f()}},nt.preconnect=function(S,v){typeof S=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,o.d.C(S,v))},nt.prefetchDNS=function(S){typeof S=="string"&&o.d.D(S)},nt.preinit=function(S,v){if(typeof S=="string"&&v&&typeof v.as=="string"){var x=v.as,_=b(x,v.crossOrigin),R=typeof v.integrity=="string"?v.integrity:void 0,H=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;x==="style"?o.d.S(S,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:_,integrity:R,fetchPriority:H}):x==="script"&&o.d.X(S,{crossOrigin:_,integrity:R,fetchPriority:H,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},nt.preinitModule=function(S,v){if(typeof S=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var x=b(v.as,v.crossOrigin);o.d.M(S,{crossOrigin:x,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&o.d.M(S)},nt.preload=function(S,v){if(typeof S=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var x=v.as,_=b(x,v.crossOrigin);o.d.L(S,x,{crossOrigin:_,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},nt.preloadModule=function(S,v){if(typeof S=="string")if(v){var x=b(v.as,v.crossOrigin);o.d.m(S,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:x,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else o.d.m(S)},nt.requestFormReset=function(S){o.d.r(S)},nt.unstable_batchedUpdates=function(S,v){return S(v)},nt.useFormState=function(S,v,x){return p.H.useFormState(S,v,x)},nt.useFormStatus=function(){return p.H.useHostTransitionStatus()},nt.version="19.2.3",nt}var Uf;function z0(){if(Uf)return $i.exports;Uf=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(f){console.error(f)}}return i(),$i.exports=T0(),$i.exports}var Rf;function w0(){if(Rf)return gn;Rf=1;var i=E0(),f=Ji(),s=z0();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var l=2;l<arguments.length;l++)t+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function m(e){var t=e,l=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(l=t.return),e=t.return;while(e)}return t.tag===3?l:null}function p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function b(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function S(e){if(m(e)!==e)throw Error(o(188))}function v(e){var t=e.alternate;if(!t){if(t=m(e),t===null)throw Error(o(188));return t!==e?null:e}for(var l=e,a=t;;){var n=l.return;if(n===null)break;var u=n.alternate;if(u===null){if(a=n.return,a!==null){l=a;continue}break}if(n.child===u.child){for(u=n.child;u;){if(u===l)return S(n),e;if(u===a)return S(n),t;u=u.sibling}throw Error(o(188))}if(l.return!==a.return)l=n,a=u;else{for(var c=!1,r=n.child;r;){if(r===l){c=!0,l=n,a=u;break}if(r===a){c=!0,a=n,l=u;break}r=r.sibling}if(!c){for(r=u.child;r;){if(r===l){c=!0,l=u,a=n;break}if(r===a){c=!0,a=u,l=n;break}r=r.sibling}if(!c)throw Error(o(189))}}if(l.alternate!==a)throw Error(o(190))}if(l.tag!==3)throw Error(o(188));return l.stateNode.current===l?e:t}function x(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=x(e),t!==null)return t;e=e.sibling}return null}var _=Object.assign,R=Symbol.for("react.element"),H=Symbol.for("react.transitional.element"),B=Symbol.for("react.portal"),Y=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),V=Symbol.for("react.consumer"),k=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),J=Symbol.for("react.suspense_list"),Z=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),_e=Symbol.for("react.activity"),Qe=Symbol.for("react.memo_cache_sentinel"),ve=Symbol.iterator;function Se(e){return e===null||typeof e!="object"?null:(e=ve&&e[ve]||e["@@iterator"],typeof e=="function"?e:null)}var Ae=Symbol.for("react.client.reference");function Ze(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ae?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Y:return"Fragment";case j:return"Profiler";case q:return"StrictMode";case K:return"Suspense";case J:return"SuspenseList";case _e:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case B:return"Portal";case k:return e.displayName||"Context";case V:return(e._context.displayName||"Context")+".Consumer";case G:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Z:return t=e.displayName||null,t!==null?t:Ze(e.type)||"Memo";case te:t=e._payload,e=e._init;try{return Ze(e(t))}catch(l){}}return null}var P=Array.isArray,w=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,N=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,$={pending:!1,data:null,method:null,action:null},me=[],be=-1;function y(e){return{current:e}}function U(e){0>be||(e.current=me[be],me[be]=null,be--)}function L(e,t){be++,me[be]=e.current,e.current=t}var X=y(null),le=y(null),oe=y(null),ce=y(null);function Ke(e,t){switch(L(oe,t),L(le,e),L(X,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?qh(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=qh(t),e=Lh(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}U(X),L(X,e)}function Oe(){U(X),U(le),U(oe)}function Pt(e){e.memoizedState!==null&&L(ce,e);var t=X.current,l=Lh(t,e.type);t!==l&&(L(le,e),L(X,l))}function Wl(e){le.current===e&&(U(X),U(le)),ce.current===e&&(U(ce),du._currentValue=$)}var xa,xn;function Jt(e){if(xa===void 0)try{throw Error()}catch(l){var t=l.stack.trim().match(/\n( *(at )?)/);xa=t&&t[1]||"",xn=-1<l.stack.indexOf(`
    at`)?" (<anonymous>)":-1<l.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xa+e+xn}var Ta=!1;function za(e,t){if(!e||Ta)return"";Ta=!0;var l=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var O=function(){throw Error()};if(Object.defineProperty(O.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(O,[])}catch(M){var A=M}Reflect.construct(e,[],O)}else{try{O.call()}catch(M){A=M}e.call(O.prototype)}}else{try{throw Error()}catch(M){A=M}(O=e())&&typeof O.catch=="function"&&O.catch(function(){})}}catch(M){if(M&&A&&typeof M.stack=="string")return[M.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=a.DetermineComponentFrameRoot(),c=u[0],r=u[1];if(c&&r){var d=c.split(`
`),z=r.split(`
`);for(n=a=0;a<d.length&&!d[a].includes("DetermineComponentFrameRoot");)a++;for(;n<z.length&&!z[n].includes("DetermineComponentFrameRoot");)n++;if(a===d.length||n===z.length)for(a=d.length-1,n=z.length-1;1<=a&&0<=n&&d[a]!==z[n];)n--;for(;1<=a&&0<=n;a--,n--)if(d[a]!==z[n]){if(a!==1||n!==1)do if(a--,n--,0>n||d[a]!==z[n]){var D=`
`+d[a].replace(" at new "," at ");return e.displayName&&D.includes("<anonymous>")&&(D=D.replace("<anonymous>",e.displayName)),D}while(1<=a&&0<=n);break}}}finally{Ta=!1,Error.prepareStackTrace=l}return(l=e?e.displayName||e.name:"")?Jt(l):""}function wu(e,t){switch(e.tag){case 26:case 27:case 5:return Jt(e.type);case 16:return Jt("Lazy");case 13:return e.child!==t&&t!==null?Jt("Suspense Fallback"):Jt("Suspense");case 19:return Jt("SuspenseList");case 0:case 15:return za(e.type,!1);case 11:return za(e.type.render,!1);case 1:return za(e.type,!0);case 31:return Jt("Activity");default:return""}}function Tn(e){try{var t="",l=null;do t+=wu(e,l),l=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var wa=Object.prototype.hasOwnProperty,Fl=i.unstable_scheduleCallback,Aa=i.unstable_cancelCallback,Au=i.unstable_shouldYield,Mu=i.unstable_requestPaint,ut=i.unstable_now,_u=i.unstable_getCurrentPriorityLevel,ct=i.unstable_ImmediatePriority,zn=i.unstable_UserBlockingPriority,Il=i.unstable_NormalPriority,Du=i.unstable_LowPriority,wn=i.unstable_IdlePriority,sc=i.log,el=i.unstable_setDisableYieldValue,Pl=null,it=null;function Gt(e){if(typeof sc=="function"&&el(e),it&&typeof it.setStrictMode=="function")try{it.setStrictMode(Pl,e)}catch(t){}}var Ue=Math.clz32?Math.clz32:bt,Dt=Math.log,Xt=Math.LN2;function bt(e){return e>>>=0,e===0?32:31-(Dt(e)/Xt|0)|0}var El=256,Je=262144,$e=4194304;function Ct(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ma(e,t,l){var a=e.pendingLanes;if(a===0)return 0;var n=0,u=e.suspendedLanes,c=e.pingedLanes;e=e.warmLanes;var r=a&134217727;return r!==0?(a=r&~u,a!==0?n=Ct(a):(c&=r,c!==0?n=Ct(c):l||(l=r&~e,l!==0&&(n=Ct(l))))):(r=a&~u,r!==0?n=Ct(r):c!==0?n=Ct(c):l||(l=a&~e,l!==0&&(n=Ct(l)))),n===0?0:t!==0&&t!==n&&(t&u)===0&&(u=n&-n,l=t&-t,u>=l||u===32&&(l&4194048)!==0)?t:n}function xl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Cu(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function An(){var e=$e;return $e<<=1,($e&62914560)===0&&($e=4194304),e}function _a(e){for(var t=[],l=0;31>l;l++)t.push(e);return t}function Tl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function pt(e,t,l,a,n,u){var c=e.pendingLanes;e.pendingLanes=l,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=l,e.entangledLanes&=l,e.errorRecoveryDisabledLanes&=l,e.shellSuspendCounter=0;var r=e.entanglements,d=e.expirationTimes,z=e.hiddenUpdates;for(l=c&~l;0<l;){var D=31-Ue(l),O=1<<D;r[D]=0,d[D]=-1;var A=z[D];if(A!==null)for(z[D]=null,D=0;D<A.length;D++){var M=A[D];M!==null&&(M.lane&=-536870913)}l&=~O}a!==0&&Sr(e,a,0),u!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=u&~(c&~t))}function Sr(e,t,l){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-Ue(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|l&261930}function Er(e,t){var l=e.entangledLanes|=t;for(e=e.entanglements;l;){var a=31-Ue(l),n=1<<a;n&t|e[a]&t&&(e[a]|=t),l&=~n}}function xr(e,t){var l=t&-t;return l=(l&42)!==0?1:dc(l),(l&(e.suspendedLanes|t))!==0?0:l}function dc(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function hc(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Tr(){var e=N.p;return e!==0?e:(e=window.event,e===void 0?32:o0(e.type))}function zr(e,t){var l=N.p;try{return N.p=e,t()}finally{N.p=l}}var zl=Math.random().toString(36).slice(2),Pe="__reactFiber$"+zl,rt="__reactProps$"+zl,Da="__reactContainer$"+zl,mc="__reactEvents$"+zl,Xg="__reactListeners$"+zl,Qg="__reactHandles$"+zl,wr="__reactResources$"+zl,Mn="__reactMarker$"+zl;function gc(e){delete e[Pe],delete e[rt],delete e[mc],delete e[Xg],delete e[Qg]}function Ca(e){var t=e[Pe];if(t)return t;for(var l=e.parentNode;l;){if(t=l[Da]||l[Pe]){if(l=t.alternate,t.child!==null||l!==null&&l.child!==null)for(e=Vh(e);e!==null;){if(l=e[Pe])return l;e=Vh(e)}return t}e=l,l=e.parentNode}return null}function Oa(e){if(e=e[Pe]||e[Da]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function _n(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function Ua(e){var t=e[wr];return t||(t=e[wr]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function We(e){e[Mn]=!0}var Ar=new Set,Mr={};function ea(e,t){Ra(e,t),Ra(e+"Capture",t)}function Ra(e,t){for(Mr[e]=t,e=0;e<t.length;e++)Ar.add(t[e])}var Zg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),_r={},Dr={};function Vg(e){return wa.call(Dr,e)?!0:wa.call(_r,e)?!1:Zg.test(e)?Dr[e]=!0:(_r[e]=!0,!1)}function Ou(e,t,l){if(Vg(t))if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+l)}}function Uu(e,t,l){if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+l)}}function tl(e,t,l,a){if(a===null)e.removeAttribute(l);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(l);return}e.setAttributeNS(t,l,""+a)}}function Ot(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Cr(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Kg(e,t,l){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a!="undefined"&&typeof a.get=="function"&&typeof a.set=="function"){var n=a.get,u=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(c){l=""+c,u.call(this,c)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(c){l=""+c},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function yc(e){if(!e._valueTracker){var t=Cr(e)?"checked":"value";e._valueTracker=Kg(e,t,""+e[t])}}function Or(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var l=t.getValue(),a="";return e&&(a=Cr(e)?e.checked?"true":"false":e.value),e=a,e!==l?(t.setValue(e),!0):!1}function Ru(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch(t){return e.body}}var Jg=/[\n"\\]/g;function Ut(e){return e.replace(Jg,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function vc(e,t,l,a,n,u,c,r){e.name="",c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?e.type=c:e.removeAttribute("type"),t!=null?c==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Ot(t)):e.value!==""+Ot(t)&&(e.value=""+Ot(t)):c!=="submit"&&c!=="reset"||e.removeAttribute("value"),t!=null?bc(e,c,Ot(t)):l!=null?bc(e,c,Ot(l)):a!=null&&e.removeAttribute("value"),n==null&&u!=null&&(e.defaultChecked=!!u),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+Ot(r):e.removeAttribute("name")}function Ur(e,t,l,a,n,u,c,r){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.type=u),t!=null||l!=null){if(!(u!=="submit"&&u!=="reset"||t!=null)){yc(e);return}l=l!=null?""+Ot(l):"",t=t!=null?""+Ot(t):l,r||t===e.value||(e.value=t),e.defaultValue=t}a=a!=null?a:n,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=r?e.checked:!!a,e.defaultChecked=!!a,c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(e.name=c),yc(e)}function bc(e,t,l){t==="number"&&Ru(e.ownerDocument)===e||e.defaultValue===""+l||(e.defaultValue=""+l)}function Na(e,t,l,a){if(e=e.options,t){t={};for(var n=0;n<l.length;n++)t["$"+l[n]]=!0;for(l=0;l<e.length;l++)n=t.hasOwnProperty("$"+e[l].value),e[l].selected!==n&&(e[l].selected=n),n&&a&&(e[l].defaultSelected=!0)}else{for(l=""+Ot(l),t=null,n=0;n<e.length;n++){if(e[n].value===l){e[n].selected=!0,a&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function Rr(e,t,l){if(t!=null&&(t=""+Ot(t),t!==e.value&&(e.value=t),l==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=l!=null?""+Ot(l):""}function Nr(e,t,l,a){if(t==null){if(a!=null){if(l!=null)throw Error(o(92));if(P(a)){if(1<a.length)throw Error(o(93));a=a[0]}l=a}l==null&&(l=""),t=l}l=Ot(t),e.defaultValue=l,a=e.textContent,a===l&&a!==""&&a!==null&&(e.value=a),yc(e)}function Ha(e,t){if(t){var l=e.firstChild;if(l&&l===e.lastChild&&l.nodeType===3){l.nodeValue=t;return}}e.textContent=t}var $g=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Hr(e,t,l){var a=t.indexOf("--")===0;l==null||typeof l=="boolean"||l===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,l):typeof l!="number"||l===0||$g.has(t)?t==="float"?e.cssFloat=l:e[t]=(""+l).trim():e[t]=l+"px"}function Br(e,t,l){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,l!=null){for(var a in l)!l.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var n in t)a=t[n],t.hasOwnProperty(n)&&l[n]!==a&&Hr(e,n,a)}else for(var u in t)t.hasOwnProperty(u)&&Hr(e,u,t[u])}function pc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wg=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Fg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Nu(e){return Fg.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ll(){}var Sc=null;function Ec(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ba=null,ka=null;function kr(e){var t=Oa(e);if(t&&(e=t.stateNode)){var l=e[rt]||null;e:switch(e=t.stateNode,t.type){case"input":if(vc(e,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name),t=l.name,l.type==="radio"&&t!=null){for(l=e;l.parentNode;)l=l.parentNode;for(l=l.querySelectorAll('input[name="'+Ut(""+t)+'"][type="radio"]'),t=0;t<l.length;t++){var a=l[t];if(a!==e&&a.form===e.form){var n=a[rt]||null;if(!n)throw Error(o(90));vc(a,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<l.length;t++)a=l[t],a.form===e.form&&Or(a)}break e;case"textarea":Rr(e,l.value,l.defaultValue);break e;case"select":t=l.value,t!=null&&Na(e,!!l.multiple,t,!1)}}}var xc=!1;function qr(e,t,l){if(xc)return e(t,l);xc=!0;try{var a=e(t);return a}finally{if(xc=!1,(Ba!==null||ka!==null)&&(Ei(),Ba&&(t=Ba,e=ka,ka=Ba=null,kr(t),e)))for(t=0;t<e.length;t++)kr(e[t])}}function Dn(e,t){var l=e.stateNode;if(l===null)return null;var a=l[rt]||null;if(a===null)return null;l=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(l&&typeof l!="function")throw Error(o(231,t,typeof l));return l}var al=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),Tc=!1;if(al)try{var Cn={};Object.defineProperty(Cn,"passive",{get:function(){Tc=!0}}),window.addEventListener("test",Cn,Cn),window.removeEventListener("test",Cn,Cn)}catch(e){Tc=!1}var wl=null,zc=null,Hu=null;function Lr(){if(Hu)return Hu;var e,t=zc,l=t.length,a,n="value"in wl?wl.value:wl.textContent,u=n.length;for(e=0;e<l&&t[e]===n[e];e++);var c=l-e;for(a=1;a<=c&&t[l-a]===n[u-a];a++);return Hu=n.slice(e,1<a?1-a:void 0)}function Bu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ku(){return!0}function Yr(){return!1}function st(e){function t(l,a,n,u,c){this._reactName=l,this._targetInst=n,this.type=a,this.nativeEvent=u,this.target=c,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(l=e[r],this[r]=l?l(u):u[r]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?ku:Yr,this.isPropagationStopped=Yr,this}return _(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var l=this.nativeEvent;l&&(l.preventDefault?l.preventDefault():typeof l.returnValue!="unknown"&&(l.returnValue=!1),this.isDefaultPrevented=ku)},stopPropagation:function(){var l=this.nativeEvent;l&&(l.stopPropagation?l.stopPropagation():typeof l.cancelBubble!="unknown"&&(l.cancelBubble=!0),this.isPropagationStopped=ku)},persist:function(){},isPersistent:ku}),t}var ta={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qu=st(ta),On=_({},ta,{view:0,detail:0}),Ig=st(On),wc,Ac,Un,Lu=_({},On,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_c,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Un&&(Un&&e.type==="mousemove"?(wc=e.screenX-Un.screenX,Ac=e.screenY-Un.screenY):Ac=wc=0,Un=e),wc)},movementY:function(e){return"movementY"in e?e.movementY:Ac}}),jr=st(Lu),Pg=_({},Lu,{dataTransfer:0}),ey=st(Pg),ty=_({},On,{relatedTarget:0}),Mc=st(ty),ly=_({},ta,{animationName:0,elapsedTime:0,pseudoElement:0}),ay=st(ly),ny=_({},ta,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),uy=st(ny),iy=_({},ta,{data:0}),Gr=st(iy),cy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},oy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ry(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=fy[e])?!!t[e]:!1}function _c(){return ry}var sy=_({},On,{key:function(e){if(e.key){var t=cy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Bu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?oy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_c,charCode:function(e){return e.type==="keypress"?Bu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Bu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),dy=st(sy),hy=_({},Lu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xr=st(hy),my=_({},On,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_c}),gy=st(my),yy=_({},ta,{propertyName:0,elapsedTime:0,pseudoElement:0}),vy=st(yy),by=_({},Lu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),py=st(by),Sy=_({},ta,{newState:0,oldState:0}),Ey=st(Sy),xy=[9,13,27,32],Dc=al&&"CompositionEvent"in window,Rn=null;al&&"documentMode"in document&&(Rn=document.documentMode);var Ty=al&&"TextEvent"in window&&!Rn,Qr=al&&(!Dc||Rn&&8<Rn&&11>=Rn),Zr=" ",Vr=!1;function Kr(e,t){switch(e){case"keyup":return xy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jr(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qa=!1;function zy(e,t){switch(e){case"compositionend":return Jr(t);case"keypress":return t.which!==32?null:(Vr=!0,Zr);case"textInput":return e=t.data,e===Zr&&Vr?null:e;default:return null}}function wy(e,t){if(qa)return e==="compositionend"||!Dc&&Kr(e,t)?(e=Lr(),Hu=zc=wl=null,qa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Qr&&t.locale!=="ko"?null:t.data;default:return null}}var Ay={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $r(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ay[e.type]:t==="textarea"}function Wr(e,t,l,a){Ba?ka?ka.push(a):ka=[a]:Ba=a,t=_i(t,"onChange"),0<t.length&&(l=new qu("onChange","change",null,l,a),e.push({event:l,listeners:t}))}var Nn=null,Hn=null;function My(e){Uh(e,0)}function Yu(e){var t=_n(e);if(Or(t))return e}function Fr(e,t){if(e==="change")return t}var Ir=!1;if(al){var Cc;if(al){var Oc="oninput"in document;if(!Oc){var Pr=document.createElement("div");Pr.setAttribute("oninput","return;"),Oc=typeof Pr.oninput=="function"}Cc=Oc}else Cc=!1;Ir=Cc&&(!document.documentMode||9<document.documentMode)}function es(){Nn&&(Nn.detachEvent("onpropertychange",ts),Hn=Nn=null)}function ts(e){if(e.propertyName==="value"&&Yu(Hn)){var t=[];Wr(t,Hn,e,Ec(e)),qr(My,t)}}function _y(e,t,l){e==="focusin"?(es(),Nn=t,Hn=l,Nn.attachEvent("onpropertychange",ts)):e==="focusout"&&es()}function Dy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Yu(Hn)}function Cy(e,t){if(e==="click")return Yu(t)}function Oy(e,t){if(e==="input"||e==="change")return Yu(t)}function Uy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var St=typeof Object.is=="function"?Object.is:Uy;function Bn(e,t){if(St(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var l=Object.keys(e),a=Object.keys(t);if(l.length!==a.length)return!1;for(a=0;a<l.length;a++){var n=l[a];if(!wa.call(t,n)||!St(e[n],t[n]))return!1}return!0}function ls(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function as(e,t){var l=ls(e);e=0;for(var a;l;){if(l.nodeType===3){if(a=e+l.textContent.length,e<=t&&a>=t)return{node:l,offset:t-e};e=a}e:{for(;l;){if(l.nextSibling){l=l.nextSibling;break e}l=l.parentNode}l=void 0}l=ls(l)}}function ns(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ns(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function us(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ru(e.document);t instanceof e.HTMLIFrameElement;){try{var l=typeof t.contentWindow.location.href=="string"}catch(a){l=!1}if(l)e=t.contentWindow;else break;t=Ru(e.document)}return t}function Uc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Ry=al&&"documentMode"in document&&11>=document.documentMode,La=null,Rc=null,kn=null,Nc=!1;function is(e,t,l){var a=l.window===l?l.document:l.nodeType===9?l:l.ownerDocument;Nc||La==null||La!==Ru(a)||(a=La,"selectionStart"in a&&Uc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),kn&&Bn(kn,a)||(kn=a,a=_i(Rc,"onSelect"),0<a.length&&(t=new qu("onSelect","select",null,t,l),e.push({event:t,listeners:a}),t.target=La)))}function la(e,t){var l={};return l[e.toLowerCase()]=t.toLowerCase(),l["Webkit"+e]="webkit"+t,l["Moz"+e]="moz"+t,l}var Ya={animationend:la("Animation","AnimationEnd"),animationiteration:la("Animation","AnimationIteration"),animationstart:la("Animation","AnimationStart"),transitionrun:la("Transition","TransitionRun"),transitionstart:la("Transition","TransitionStart"),transitioncancel:la("Transition","TransitionCancel"),transitionend:la("Transition","TransitionEnd")},Hc={},cs={};al&&(cs=document.createElement("div").style,"AnimationEvent"in window||(delete Ya.animationend.animation,delete Ya.animationiteration.animation,delete Ya.animationstart.animation),"TransitionEvent"in window||delete Ya.transitionend.transition);function aa(e){if(Hc[e])return Hc[e];if(!Ya[e])return e;var t=Ya[e],l;for(l in t)if(t.hasOwnProperty(l)&&l in cs)return Hc[e]=t[l];return e}var os=aa("animationend"),fs=aa("animationiteration"),rs=aa("animationstart"),Ny=aa("transitionrun"),Hy=aa("transitionstart"),By=aa("transitioncancel"),ss=aa("transitionend"),ds=new Map,Bc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Bc.push("scrollEnd");function Qt(e,t){ds.set(e,t),ea(t,[e])}var ju=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Rt=[],ja=0,kc=0;function Gu(){for(var e=ja,t=kc=ja=0;t<e;){var l=Rt[t];Rt[t++]=null;var a=Rt[t];Rt[t++]=null;var n=Rt[t];Rt[t++]=null;var u=Rt[t];if(Rt[t++]=null,a!==null&&n!==null){var c=a.pending;c===null?n.next=n:(n.next=c.next,c.next=n),a.pending=n}u!==0&&hs(l,n,u)}}function Xu(e,t,l,a){Rt[ja++]=e,Rt[ja++]=t,Rt[ja++]=l,Rt[ja++]=a,kc|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function qc(e,t,l,a){return Xu(e,t,l,a),Qu(e)}function na(e,t){return Xu(e,null,null,t),Qu(e)}function hs(e,t,l){e.lanes|=l;var a=e.alternate;a!==null&&(a.lanes|=l);for(var n=!1,u=e.return;u!==null;)u.childLanes|=l,a=u.alternate,a!==null&&(a.childLanes|=l),u.tag===22&&(e=u.stateNode,e===null||e._visibility&1||(n=!0)),e=u,u=u.return;return e.tag===3?(u=e.stateNode,n&&t!==null&&(n=31-Ue(l),e=u.hiddenUpdates,a=e[n],a===null?e[n]=[t]:a.push(t),t.lane=l|536870912),u):null}function Qu(e){if(50<uu)throw uu=0,Jo=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ga={};function ky(e,t,l,a){this.tag=e,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Et(e,t,l,a){return new ky(e,t,l,a)}function Lc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function nl(e,t){var l=e.alternate;return l===null?(l=Et(e.tag,t,e.key,e.mode),l.elementType=e.elementType,l.type=e.type,l.stateNode=e.stateNode,l.alternate=e,e.alternate=l):(l.pendingProps=t,l.type=e.type,l.flags=0,l.subtreeFlags=0,l.deletions=null),l.flags=e.flags&65011712,l.childLanes=e.childLanes,l.lanes=e.lanes,l.child=e.child,l.memoizedProps=e.memoizedProps,l.memoizedState=e.memoizedState,l.updateQueue=e.updateQueue,t=e.dependencies,l.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},l.sibling=e.sibling,l.index=e.index,l.ref=e.ref,l.refCleanup=e.refCleanup,l}function ms(e,t){e.flags&=65011714;var l=e.alternate;return l===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=l.childLanes,e.lanes=l.lanes,e.child=l.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=l.memoizedProps,e.memoizedState=l.memoizedState,e.updateQueue=l.updateQueue,e.type=l.type,t=l.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Zu(e,t,l,a,n,u){var c=0;if(a=e,typeof e=="function")Lc(e)&&(c=1);else if(typeof e=="string")c=Gv(e,l,X.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case _e:return e=Et(31,l,t,n),e.elementType=_e,e.lanes=u,e;case Y:return ua(l.children,n,u,t);case q:c=8,n|=24;break;case j:return e=Et(12,l,t,n|2),e.elementType=j,e.lanes=u,e;case K:return e=Et(13,l,t,n),e.elementType=K,e.lanes=u,e;case J:return e=Et(19,l,t,n),e.elementType=J,e.lanes=u,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case k:c=10;break e;case V:c=9;break e;case G:c=11;break e;case Z:c=14;break e;case te:c=16,a=null;break e}c=29,l=Error(o(130,e===null?"null":typeof e,"")),a=null}return t=Et(c,l,t,n),t.elementType=e,t.type=a,t.lanes=u,t}function ua(e,t,l,a){return e=Et(7,e,a,t),e.lanes=l,e}function Yc(e,t,l){return e=Et(6,e,null,t),e.lanes=l,e}function gs(e){var t=Et(18,null,null,0);return t.stateNode=e,t}function jc(e,t,l){return t=Et(4,e.children!==null?e.children:[],e.key,t),t.lanes=l,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ys=new WeakMap;function Nt(e,t){if(typeof e=="object"&&e!==null){var l=ys.get(e);return l!==void 0?l:(t={value:e,source:t,stack:Tn(t)},ys.set(e,t),t)}return{value:e,source:t,stack:Tn(t)}}var Xa=[],Qa=0,Vu=null,qn=0,Ht=[],Bt=0,Al=null,$t=1,Wt="";function ul(e,t){Xa[Qa++]=qn,Xa[Qa++]=Vu,Vu=e,qn=t}function vs(e,t,l){Ht[Bt++]=$t,Ht[Bt++]=Wt,Ht[Bt++]=Al,Al=e;var a=$t;e=Wt;var n=32-Ue(a)-1;a&=~(1<<n),l+=1;var u=32-Ue(t)+n;if(30<u){var c=n-n%5;u=(a&(1<<c)-1).toString(32),a>>=c,n-=c,$t=1<<32-Ue(t)+n|l<<n|a,Wt=u+e}else $t=1<<u|l<<n|a,Wt=e}function Gc(e){e.return!==null&&(ul(e,1),vs(e,1,0))}function Xc(e){for(;e===Vu;)Vu=Xa[--Qa],Xa[Qa]=null,qn=Xa[--Qa],Xa[Qa]=null;for(;e===Al;)Al=Ht[--Bt],Ht[Bt]=null,Wt=Ht[--Bt],Ht[Bt]=null,$t=Ht[--Bt],Ht[Bt]=null}function bs(e,t){Ht[Bt++]=$t,Ht[Bt++]=Wt,Ht[Bt++]=Al,$t=t.id,Wt=t.overflow,Al=e}var et=null,De=null,he=!1,Ml=null,kt=!1,Qc=Error(o(519));function _l(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ln(Nt(t,e)),Qc}function ps(e){var t=e.stateNode,l=e.type,a=e.memoizedProps;switch(t[Pe]=e,t[rt]=a,l){case"dialog":re("cancel",t),re("close",t);break;case"iframe":case"object":case"embed":re("load",t);break;case"video":case"audio":for(l=0;l<cu.length;l++)re(cu[l],t);break;case"source":re("error",t);break;case"img":case"image":case"link":re("error",t),re("load",t);break;case"details":re("toggle",t);break;case"input":re("invalid",t),Ur(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":re("invalid",t);break;case"textarea":re("invalid",t),Nr(t,a.value,a.defaultValue,a.children)}l=a.children,typeof l!="string"&&typeof l!="number"&&typeof l!="bigint"||t.textContent===""+l||a.suppressHydrationWarning===!0||Bh(t.textContent,l)?(a.popover!=null&&(re("beforetoggle",t),re("toggle",t)),a.onScroll!=null&&re("scroll",t),a.onScrollEnd!=null&&re("scrollend",t),a.onClick!=null&&(t.onclick=ll),t=!0):t=!1,t||_l(e,!0)}function Ss(e){for(et=e.return;et;)switch(et.tag){case 5:case 31:case 13:kt=!1;return;case 27:case 3:kt=!0;return;default:et=et.return}}function Za(e){if(e!==et)return!1;if(!he)return Ss(e),he=!0,!1;var t=e.tag,l;if((l=t!==3&&t!==27)&&((l=t===5)&&(l=e.type,l=!(l!=="form"&&l!=="button")||rf(e.type,e.memoizedProps)),l=!l),l&&De&&_l(e),Ss(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));De=Zh(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));De=Zh(e)}else t===27?(t=De,Gl(e.type)?(e=gf,gf=null,De=e):De=t):De=et?Lt(e.stateNode.nextSibling):null;return!0}function ia(){De=et=null,he=!1}function Zc(){var e=Ml;return e!==null&&(gt===null?gt=e:gt.push.apply(gt,e),Ml=null),e}function Ln(e){Ml===null?Ml=[e]:Ml.push(e)}var Vc=y(null),ca=null,il=null;function Dl(e,t,l){L(Vc,t._currentValue),t._currentValue=l}function cl(e){e._currentValue=Vc.current,U(Vc)}function Kc(e,t,l){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===l)break;e=e.return}}function Jc(e,t,l,a){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var u=n.dependencies;if(u!==null){var c=n.child;u=u.firstContext;e:for(;u!==null;){var r=u;u=n;for(var d=0;d<t.length;d++)if(r.context===t[d]){u.lanes|=l,r=u.alternate,r!==null&&(r.lanes|=l),Kc(u.return,l,e),a||(c=null);break e}u=r.next}}else if(n.tag===18){if(c=n.return,c===null)throw Error(o(341));c.lanes|=l,u=c.alternate,u!==null&&(u.lanes|=l),Kc(c,l,e),c=null}else c=n.child;if(c!==null)c.return=n;else for(c=n;c!==null;){if(c===e){c=null;break}if(n=c.sibling,n!==null){n.return=c.return,c=n;break}c=c.return}n=c}}function Va(e,t,l,a){e=null;for(var n=t,u=!1;n!==null;){if(!u){if((n.flags&524288)!==0)u=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var c=n.alternate;if(c===null)throw Error(o(387));if(c=c.memoizedProps,c!==null){var r=n.type;St(n.pendingProps.value,c.value)||(e!==null?e.push(r):e=[r])}}else if(n===ce.current){if(c=n.alternate,c===null)throw Error(o(387));c.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push(du):e=[du])}n=n.return}e!==null&&Jc(t,e,l,a),t.flags|=262144}function Ku(e){for(e=e.firstContext;e!==null;){if(!St(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function oa(e){ca=e,il=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function tt(e){return Es(ca,e)}function Ju(e,t){return ca===null&&oa(e),Es(e,t)}function Es(e,t){var l=t._currentValue;if(t={context:t,memoizedValue:l,next:null},il===null){if(e===null)throw Error(o(308));il=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else il=il.next=t;return l}var qy=typeof AbortController!="undefined"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(l,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(l){return l()})}},Ly=i.unstable_scheduleCallback,Yy=i.unstable_NormalPriority,Ye={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function $c(){return{controller:new qy,data:new Map,refCount:0}}function Yn(e){e.refCount--,e.refCount===0&&Ly(Yy,function(){e.controller.abort()})}var jn=null,Wc=0,Ka=0,Ja=null;function jy(e,t){if(jn===null){var l=jn=[];Wc=0,Ka=ef(),Ja={status:"pending",value:void 0,then:function(a){l.push(a)}}}return Wc++,t.then(xs,xs),t}function xs(){if(--Wc===0&&jn!==null){Ja!==null&&(Ja.status="fulfilled");var e=jn;jn=null,Ka=0,Ja=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Gy(e,t){var l=[],a={status:"pending",value:null,reason:null,then:function(n){l.push(n)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var n=0;n<l.length;n++)(0,l[n])(t)},function(n){for(a.status="rejected",a.reason=n,n=0;n<l.length;n++)(0,l[n])(void 0)}),a}var Ts=w.S;w.S=function(e,t){ih=ut(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&jy(e,t),Ts!==null&&Ts(e,t)};var fa=y(null);function Fc(){var e=fa.current;return e!==null?e:Me.pooledCache}function $u(e,t){t===null?L(fa,fa.current):L(fa,t.pool)}function zs(){var e=Fc();return e===null?null:{parent:Ye._currentValue,pool:e}}var $a=Error(o(460)),Ic=Error(o(474)),Wu=Error(o(542)),Fu={then:function(){}};function ws(e){return e=e.status,e==="fulfilled"||e==="rejected"}function As(e,t,l){switch(l=e[l],l===void 0?e.push(t):l!==t&&(t.then(ll,ll),t=l),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_s(e),e;default:if(typeof t.status=="string")t.then(ll,ll);else{if(e=Me,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=a}},function(a){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_s(e),e}throw sa=t,$a}}function ra(e){try{var t=e._init;return t(e._payload)}catch(l){throw l!==null&&typeof l=="object"&&typeof l.then=="function"?(sa=l,$a):l}}var sa=null;function Ms(){if(sa===null)throw Error(o(459));var e=sa;return sa=null,e}function _s(e){if(e===$a||e===Wu)throw Error(o(483))}var Wa=null,Gn=0;function Iu(e){var t=Gn;return Gn+=1,Wa===null&&(Wa=[]),As(Wa,e,t)}function Xn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Pu(e,t){throw t.$$typeof===R?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Ds(e){function t(E,g){if(e){var T=E.deletions;T===null?(E.deletions=[g],E.flags|=16):T.push(g)}}function l(E,g){if(!e)return null;for(;g!==null;)t(E,g),g=g.sibling;return null}function a(E){for(var g=new Map;E!==null;)E.key!==null?g.set(E.key,E):g.set(E.index,E),E=E.sibling;return g}function n(E,g){return E=nl(E,g),E.index=0,E.sibling=null,E}function u(E,g,T){return E.index=T,e?(T=E.alternate,T!==null?(T=T.index,T<g?(E.flags|=67108866,g):T):(E.flags|=67108866,g)):(E.flags|=1048576,g)}function c(E){return e&&E.alternate===null&&(E.flags|=67108866),E}function r(E,g,T,C){return g===null||g.tag!==6?(g=Yc(T,E.mode,C),g.return=E,g):(g=n(g,T),g.return=E,g)}function d(E,g,T,C){var I=T.type;return I===Y?D(E,g,T.props.children,C,T.key):g!==null&&(g.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===te&&ra(I)===g.type)?(g=n(g,T.props),Xn(g,T),g.return=E,g):(g=Zu(T.type,T.key,T.props,null,E.mode,C),Xn(g,T),g.return=E,g)}function z(E,g,T,C){return g===null||g.tag!==4||g.stateNode.containerInfo!==T.containerInfo||g.stateNode.implementation!==T.implementation?(g=jc(T,E.mode,C),g.return=E,g):(g=n(g,T.children||[]),g.return=E,g)}function D(E,g,T,C,I){return g===null||g.tag!==7?(g=ua(T,E.mode,C,I),g.return=E,g):(g=n(g,T),g.return=E,g)}function O(E,g,T){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=Yc(""+g,E.mode,T),g.return=E,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case H:return T=Zu(g.type,g.key,g.props,null,E.mode,T),Xn(T,g),T.return=E,T;case B:return g=jc(g,E.mode,T),g.return=E,g;case te:return g=ra(g),O(E,g,T)}if(P(g)||Se(g))return g=ua(g,E.mode,T,null),g.return=E,g;if(typeof g.then=="function")return O(E,Iu(g),T);if(g.$$typeof===k)return O(E,Ju(E,g),T);Pu(E,g)}return null}function A(E,g,T,C){var I=g!==null?g.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return I!==null?null:r(E,g,""+T,C);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case H:return T.key===I?d(E,g,T,C):null;case B:return T.key===I?z(E,g,T,C):null;case te:return T=ra(T),A(E,g,T,C)}if(P(T)||Se(T))return I!==null?null:D(E,g,T,C,null);if(typeof T.then=="function")return A(E,g,Iu(T),C);if(T.$$typeof===k)return A(E,g,Ju(E,T),C);Pu(E,T)}return null}function M(E,g,T,C,I){if(typeof C=="string"&&C!==""||typeof C=="number"||typeof C=="bigint")return E=E.get(T)||null,r(g,E,""+C,I);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case H:return E=E.get(C.key===null?T:C.key)||null,d(g,E,C,I);case B:return E=E.get(C.key===null?T:C.key)||null,z(g,E,C,I);case te:return C=ra(C),M(E,g,T,C,I)}if(P(C)||Se(C))return E=E.get(T)||null,D(g,E,C,I,null);if(typeof C.then=="function")return M(E,g,T,Iu(C),I);if(C.$$typeof===k)return M(E,g,T,Ju(g,C),I);Pu(g,C)}return null}function Q(E,g,T,C){for(var I=null,ge=null,W=g,ie=g=0,de=null;W!==null&&ie<T.length;ie++){W.index>ie?(de=W,W=null):de=W.sibling;var ye=A(E,W,T[ie],C);if(ye===null){W===null&&(W=de);break}e&&W&&ye.alternate===null&&t(E,W),g=u(ye,g,ie),ge===null?I=ye:ge.sibling=ye,ge=ye,W=de}if(ie===T.length)return l(E,W),he&&ul(E,ie),I;if(W===null){for(;ie<T.length;ie++)W=O(E,T[ie],C),W!==null&&(g=u(W,g,ie),ge===null?I=W:ge.sibling=W,ge=W);return he&&ul(E,ie),I}for(W=a(W);ie<T.length;ie++)de=M(W,E,ie,T[ie],C),de!==null&&(e&&de.alternate!==null&&W.delete(de.key===null?ie:de.key),g=u(de,g,ie),ge===null?I=de:ge.sibling=de,ge=de);return e&&W.forEach(function(Kl){return t(E,Kl)}),he&&ul(E,ie),I}function ee(E,g,T,C){if(T==null)throw Error(o(151));for(var I=null,ge=null,W=g,ie=g=0,de=null,ye=T.next();W!==null&&!ye.done;ie++,ye=T.next()){W.index>ie?(de=W,W=null):de=W.sibling;var Kl=A(E,W,ye.value,C);if(Kl===null){W===null&&(W=de);break}e&&W&&Kl.alternate===null&&t(E,W),g=u(Kl,g,ie),ge===null?I=Kl:ge.sibling=Kl,ge=Kl,W=de}if(ye.done)return l(E,W),he&&ul(E,ie),I;if(W===null){for(;!ye.done;ie++,ye=T.next())ye=O(E,ye.value,C),ye!==null&&(g=u(ye,g,ie),ge===null?I=ye:ge.sibling=ye,ge=ye);return he&&ul(E,ie),I}for(W=a(W);!ye.done;ie++,ye=T.next())ye=M(W,E,ie,ye.value,C),ye!==null&&(e&&ye.alternate!==null&&W.delete(ye.key===null?ie:ye.key),g=u(ye,g,ie),ge===null?I=ye:ge.sibling=ye,ge=ye);return e&&W.forEach(function(Pv){return t(E,Pv)}),he&&ul(E,ie),I}function we(E,g,T,C){if(typeof T=="object"&&T!==null&&T.type===Y&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case H:e:{for(var I=T.key;g!==null;){if(g.key===I){if(I=T.type,I===Y){if(g.tag===7){l(E,g.sibling),C=n(g,T.props.children),C.return=E,E=C;break e}}else if(g.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===te&&ra(I)===g.type){l(E,g.sibling),C=n(g,T.props),Xn(C,T),C.return=E,E=C;break e}l(E,g);break}else t(E,g);g=g.sibling}T.type===Y?(C=ua(T.props.children,E.mode,C,T.key),C.return=E,E=C):(C=Zu(T.type,T.key,T.props,null,E.mode,C),Xn(C,T),C.return=E,E=C)}return c(E);case B:e:{for(I=T.key;g!==null;){if(g.key===I)if(g.tag===4&&g.stateNode.containerInfo===T.containerInfo&&g.stateNode.implementation===T.implementation){l(E,g.sibling),C=n(g,T.children||[]),C.return=E,E=C;break e}else{l(E,g);break}else t(E,g);g=g.sibling}C=jc(T,E.mode,C),C.return=E,E=C}return c(E);case te:return T=ra(T),we(E,g,T,C)}if(P(T))return Q(E,g,T,C);if(Se(T)){if(I=Se(T),typeof I!="function")throw Error(o(150));return T=I.call(T),ee(E,g,T,C)}if(typeof T.then=="function")return we(E,g,Iu(T),C);if(T.$$typeof===k)return we(E,g,Ju(E,T),C);Pu(E,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,g!==null&&g.tag===6?(l(E,g.sibling),C=n(g,T),C.return=E,E=C):(l(E,g),C=Yc(T,E.mode,C),C.return=E,E=C),c(E)):l(E,g)}return function(E,g,T,C){try{Gn=0;var I=we(E,g,T,C);return Wa=null,I}catch(W){if(W===$a||W===Wu)throw W;var ge=Et(29,W,null,E.mode);return ge.lanes=C,ge.return=E,ge}}}var da=Ds(!0),Cs=Ds(!1),Cl=!1;function Pc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function eo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ol(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ul(e,t,l){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(pe&2)!==0){var n=a.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),a.pending=t,t=Qu(e),hs(e,null,l),t}return Xu(e,a,t,l),Qu(e)}function Qn(e,t,l){if(t=t.updateQueue,t!==null&&(t=t.shared,(l&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,l|=a,t.lanes=l,Er(e,l)}}function to(e,t){var l=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,l===a)){var n=null,u=null;if(l=l.firstBaseUpdate,l!==null){do{var c={lane:l.lane,tag:l.tag,payload:l.payload,callback:null,next:null};u===null?n=u=c:u=u.next=c,l=l.next}while(l!==null);u===null?n=u=t:u=u.next=t}else n=u=t;l={baseState:a.baseState,firstBaseUpdate:n,lastBaseUpdate:u,shared:a.shared,callbacks:a.callbacks},e.updateQueue=l;return}e=l.lastBaseUpdate,e===null?l.firstBaseUpdate=t:e.next=t,l.lastBaseUpdate=t}var lo=!1;function Zn(){if(lo){var e=Ja;if(e!==null)throw e}}function Vn(e,t,l,a){lo=!1;var n=e.updateQueue;Cl=!1;var u=n.firstBaseUpdate,c=n.lastBaseUpdate,r=n.shared.pending;if(r!==null){n.shared.pending=null;var d=r,z=d.next;d.next=null,c===null?u=z:c.next=z,c=d;var D=e.alternate;D!==null&&(D=D.updateQueue,r=D.lastBaseUpdate,r!==c&&(r===null?D.firstBaseUpdate=z:r.next=z,D.lastBaseUpdate=d))}if(u!==null){var O=n.baseState;c=0,D=z=d=null,r=u;do{var A=r.lane&-536870913,M=A!==r.lane;if(M?(se&A)===A:(a&A)===A){A!==0&&A===Ka&&(lo=!0),D!==null&&(D=D.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var Q=e,ee=r;A=t;var we=l;switch(ee.tag){case 1:if(Q=ee.payload,typeof Q=="function"){O=Q.call(we,O,A);break e}O=Q;break e;case 3:Q.flags=Q.flags&-65537|128;case 0:if(Q=ee.payload,A=typeof Q=="function"?Q.call(we,O,A):Q,A==null)break e;O=_({},O,A);break e;case 2:Cl=!0}}A=r.callback,A!==null&&(e.flags|=64,M&&(e.flags|=8192),M=n.callbacks,M===null?n.callbacks=[A]:M.push(A))}else M={lane:A,tag:r.tag,payload:r.payload,callback:r.callback,next:null},D===null?(z=D=M,d=O):D=D.next=M,c|=A;if(r=r.next,r===null){if(r=n.shared.pending,r===null)break;M=r,r=M.next,M.next=null,n.lastBaseUpdate=M,n.shared.pending=null}}while(!0);D===null&&(d=O),n.baseState=d,n.firstBaseUpdate=z,n.lastBaseUpdate=D,u===null&&(n.shared.lanes=0),kl|=c,e.lanes=c,e.memoizedState=O}}function Os(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function Us(e,t){var l=e.callbacks;if(l!==null)for(e.callbacks=null,e=0;e<l.length;e++)Os(l[e],t)}var Fa=y(null),ei=y(0);function Rs(e,t){e=yl,L(ei,e),L(Fa,t),yl=e|t.baseLanes}function ao(){L(ei,yl),L(Fa,Fa.current)}function no(){yl=ei.current,U(Fa),U(ei)}var xt=y(null),qt=null;function Rl(e){var t=e.alternate;L(qe,qe.current&1),L(xt,e),qt===null&&(t===null||Fa.current!==null||t.memoizedState!==null)&&(qt=e)}function uo(e){L(qe,qe.current),L(xt,e),qt===null&&(qt=e)}function Ns(e){e.tag===22?(L(qe,qe.current),L(xt,e),qt===null&&(qt=e)):Nl()}function Nl(){L(qe,qe.current),L(xt,xt.current)}function Tt(e){U(xt),qt===e&&(qt=null),U(qe)}var qe=y(0);function ti(e){for(var t=e;t!==null;){if(t.tag===13){var l=t.memoizedState;if(l!==null&&(l=l.dehydrated,l===null||hf(l)||mf(l)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ol=0,ue=null,Te=null,je=null,li=!1,Ia=!1,ha=!1,ai=0,Kn=0,Pa=null,Xy=0;function Ne(){throw Error(o(321))}function io(e,t){if(t===null)return!1;for(var l=0;l<t.length&&l<e.length;l++)if(!St(e[l],t[l]))return!1;return!0}function co(e,t,l,a,n,u){return ol=u,ue=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,w.H=e===null||e.memoizedState===null?vd:To,ha=!1,u=l(a,n),ha=!1,Ia&&(u=Bs(t,l,a,n)),Hs(e),u}function Hs(e){w.H=Wn;var t=Te!==null&&Te.next!==null;if(ol=0,je=Te=ue=null,li=!1,Kn=0,Pa=null,t)throw Error(o(300));e===null||Ge||(e=e.dependencies,e!==null&&Ku(e)&&(Ge=!0))}function Bs(e,t,l,a){ue=e;var n=0;do{if(Ia&&(Pa=null),Kn=0,Ia=!1,25<=n)throw Error(o(301));if(n+=1,je=Te=null,e.updateQueue!=null){var u=e.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}w.H=bd,u=t(l,a)}while(Ia);return u}function Qy(){var e=w.H,t=e.useState()[0];return t=typeof t.then=="function"?Jn(t):t,e=e.useState()[0],(Te!==null?Te.memoizedState:null)!==e&&(ue.flags|=1024),t}function oo(){var e=ai!==0;return ai=0,e}function fo(e,t,l){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l}function ro(e){if(li){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}li=!1}ol=0,je=Te=ue=null,Ia=!1,Kn=ai=0,Pa=null}function ot(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return je===null?ue.memoizedState=je=e:je=je.next=e,je}function Le(){if(Te===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Te.next;var t=je===null?ue.memoizedState:je.next;if(t!==null)je=t,Te=e;else{if(e===null)throw ue.alternate===null?Error(o(467)):Error(o(310));Te=e,e={memoizedState:Te.memoizedState,baseState:Te.baseState,baseQueue:Te.baseQueue,queue:Te.queue,next:null},je===null?ue.memoizedState=je=e:je=je.next=e}return je}function ni(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Jn(e){var t=Kn;return Kn+=1,Pa===null&&(Pa=[]),e=As(Pa,e,t),t=ue,(je===null?t.memoizedState:je.next)===null&&(t=t.alternate,w.H=t===null||t.memoizedState===null?vd:To),e}function ui(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Jn(e);if(e.$$typeof===k)return tt(e)}throw Error(o(438,String(e)))}function so(e){var t=null,l=ue.updateQueue;if(l!==null&&(t=l.memoCache),t==null){var a=ue.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),l===null&&(l=ni(),ue.updateQueue=l),l.memoCache=t,l=t.data[t.index],l===void 0)for(l=t.data[t.index]=Array(e),a=0;a<e;a++)l[a]=Qe;return t.index++,l}function fl(e,t){return typeof t=="function"?t(e):t}function ii(e){var t=Le();return ho(t,Te,e)}function ho(e,t,l){var a=e.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=l;var n=e.baseQueue,u=a.pending;if(u!==null){if(n!==null){var c=n.next;n.next=u.next,u.next=c}t.baseQueue=n=u,a.pending=null}if(u=e.baseState,n===null)e.memoizedState=u;else{t=n.next;var r=c=null,d=null,z=t,D=!1;do{var O=z.lane&-536870913;if(O!==z.lane?(se&O)===O:(ol&O)===O){var A=z.revertLane;if(A===0)d!==null&&(d=d.next={lane:0,revertLane:0,gesture:null,action:z.action,hasEagerState:z.hasEagerState,eagerState:z.eagerState,next:null}),O===Ka&&(D=!0);else if((ol&A)===A){z=z.next,A===Ka&&(D=!0);continue}else O={lane:0,revertLane:z.revertLane,gesture:null,action:z.action,hasEagerState:z.hasEagerState,eagerState:z.eagerState,next:null},d===null?(r=d=O,c=u):d=d.next=O,ue.lanes|=A,kl|=A;O=z.action,ha&&l(u,O),u=z.hasEagerState?z.eagerState:l(u,O)}else A={lane:O,revertLane:z.revertLane,gesture:z.gesture,action:z.action,hasEagerState:z.hasEagerState,eagerState:z.eagerState,next:null},d===null?(r=d=A,c=u):d=d.next=A,ue.lanes|=O,kl|=O;z=z.next}while(z!==null&&z!==t);if(d===null?c=u:d.next=r,!St(u,e.memoizedState)&&(Ge=!0,D&&(l=Ja,l!==null)))throw l;e.memoizedState=u,e.baseState=c,e.baseQueue=d,a.lastRenderedState=u}return n===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function mo(e){var t=Le(),l=t.queue;if(l===null)throw Error(o(311));l.lastRenderedReducer=e;var a=l.dispatch,n=l.pending,u=t.memoizedState;if(n!==null){l.pending=null;var c=n=n.next;do u=e(u,c.action),c=c.next;while(c!==n);St(u,t.memoizedState)||(Ge=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),l.lastRenderedState=u}return[u,a]}function ks(e,t,l){var a=ue,n=Le(),u=he;if(u){if(l===void 0)throw Error(o(407));l=l()}else l=t();var c=!St((Te||n).memoizedState,l);if(c&&(n.memoizedState=l,Ge=!0),n=n.queue,vo(Ys.bind(null,a,n,e),[e]),n.getSnapshot!==t||c||je!==null&&je.memoizedState.tag&1){if(a.flags|=2048,en(9,{destroy:void 0},Ls.bind(null,a,n,l,t),null),Me===null)throw Error(o(349));u||(ol&127)!==0||qs(a,t,l)}return l}function qs(e,t,l){e.flags|=16384,e={getSnapshot:t,value:l},t=ue.updateQueue,t===null?(t=ni(),ue.updateQueue=t,t.stores=[e]):(l=t.stores,l===null?t.stores=[e]:l.push(e))}function Ls(e,t,l,a){t.value=l,t.getSnapshot=a,js(t)&&Gs(e)}function Ys(e,t,l){return l(function(){js(t)&&Gs(e)})}function js(e){var t=e.getSnapshot;e=e.value;try{var l=t();return!St(e,l)}catch(a){return!0}}function Gs(e){var t=na(e,2);t!==null&&yt(t,e,2)}function go(e){var t=ot();if(typeof e=="function"){var l=e;if(e=l(),ha){Gt(!0);try{l()}finally{Gt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fl,lastRenderedState:e},t}function Xs(e,t,l,a){return e.baseState=l,ho(e,Te,typeof a=="function"?a:fl)}function Zy(e,t,l,a,n){if(fi(e))throw Error(o(485));if(e=t.action,e!==null){var u={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(c){u.listeners.push(c)}};w.T!==null?l(!0):u.isTransition=!1,a(u),l=t.pending,l===null?(u.next=t.pending=u,Qs(t,u)):(u.next=l.next,t.pending=l.next=u)}}function Qs(e,t){var l=t.action,a=t.payload,n=e.state;if(t.isTransition){var u=w.T,c={};w.T=c;try{var r=l(n,a),d=w.S;d!==null&&d(c,r),Zs(e,t,r)}catch(z){yo(e,t,z)}finally{u!==null&&c.types!==null&&(u.types=c.types),w.T=u}}else try{u=l(n,a),Zs(e,t,u)}catch(z){yo(e,t,z)}}function Zs(e,t,l){l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(function(a){Vs(e,t,a)},function(a){return yo(e,t,a)}):Vs(e,t,l)}function Vs(e,t,l){t.status="fulfilled",t.value=l,Ks(t),e.state=l,t=e.pending,t!==null&&(l=t.next,l===t?e.pending=null:(l=l.next,t.next=l,Qs(e,l)))}function yo(e,t,l){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=l,Ks(t),t=t.next;while(t!==a)}e.action=null}function Ks(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Js(e,t){return t}function $s(e,t){if(he){var l=Me.formState;if(l!==null){e:{var a=ue;if(he){if(De){t:{for(var n=De,u=kt;n.nodeType!==8;){if(!u){n=null;break t}if(n=Lt(n.nextSibling),n===null){n=null;break t}}u=n.data,n=u==="F!"||u==="F"?n:null}if(n){De=Lt(n.nextSibling),a=n.data==="F!";break e}}_l(a)}a=!1}a&&(t=l[0])}}return l=ot(),l.memoizedState=l.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Js,lastRenderedState:t},l.queue=a,l=md.bind(null,ue,a),a.dispatch=l,a=go(!1),u=xo.bind(null,ue,!1,a.queue),a=ot(),n={state:t,dispatch:null,action:e,pending:null},a.queue=n,l=Zy.bind(null,ue,n,u,l),n.dispatch=l,a.memoizedState=e,[t,l,!1]}function Ws(e){var t=Le();return Fs(t,Te,e)}function Fs(e,t,l){if(t=ho(e,t,Js)[0],e=ii(fl)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Jn(t)}catch(c){throw c===$a?Wu:c}else a=t;t=Le();var n=t.queue,u=n.dispatch;return l!==t.memoizedState&&(ue.flags|=2048,en(9,{destroy:void 0},Vy.bind(null,n,l),null)),[a,u,e]}function Vy(e,t){e.action=t}function Is(e){var t=Le(),l=Te;if(l!==null)return Fs(t,l,e);Le(),t=t.memoizedState,l=Le();var a=l.queue.dispatch;return l.memoizedState=e,[t,a,!1]}function en(e,t,l,a){return e={tag:e,create:l,deps:a,inst:t,next:null},t=ue.updateQueue,t===null&&(t=ni(),ue.updateQueue=t),l=t.lastEffect,l===null?t.lastEffect=e.next=e:(a=l.next,l.next=e,e.next=a,t.lastEffect=e),e}function Ps(){return Le().memoizedState}function ci(e,t,l,a){var n=ot();ue.flags|=e,n.memoizedState=en(1|t,{destroy:void 0},l,a===void 0?null:a)}function oi(e,t,l,a){var n=Le();a=a===void 0?null:a;var u=n.memoizedState.inst;Te!==null&&a!==null&&io(a,Te.memoizedState.deps)?n.memoizedState=en(t,u,l,a):(ue.flags|=e,n.memoizedState=en(1|t,u,l,a))}function ed(e,t){ci(8390656,8,e,t)}function vo(e,t){oi(2048,8,e,t)}function Ky(e){ue.flags|=4;var t=ue.updateQueue;if(t===null)t=ni(),ue.updateQueue=t,t.events=[e];else{var l=t.events;l===null?t.events=[e]:l.push(e)}}function td(e){var t=Le().memoizedState;return Ky({ref:t,nextImpl:e}),function(){if((pe&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function ld(e,t){return oi(4,2,e,t)}function ad(e,t){return oi(4,4,e,t)}function nd(e,t){if(typeof t=="function"){e=e();var l=t(e);return function(){typeof l=="function"?l():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ud(e,t,l){l=l!=null?l.concat([e]):null,oi(4,4,nd.bind(null,t,e),l)}function bo(){}function id(e,t){var l=Le();t=t===void 0?null:t;var a=l.memoizedState;return t!==null&&io(t,a[1])?a[0]:(l.memoizedState=[e,t],e)}function cd(e,t){var l=Le();t=t===void 0?null:t;var a=l.memoizedState;if(t!==null&&io(t,a[1]))return a[0];if(a=e(),ha){Gt(!0);try{e()}finally{Gt(!1)}}return l.memoizedState=[a,t],a}function po(e,t,l){return l===void 0||(ol&1073741824)!==0&&(se&261930)===0?e.memoizedState=t:(e.memoizedState=l,e=oh(),ue.lanes|=e,kl|=e,l)}function od(e,t,l,a){return St(l,t)?l:Fa.current!==null?(e=po(e,l,a),St(e,t)||(Ge=!0),e):(ol&42)===0||(ol&1073741824)!==0&&(se&261930)===0?(Ge=!0,e.memoizedState=l):(e=oh(),ue.lanes|=e,kl|=e,t)}function fd(e,t,l,a,n){var u=N.p;N.p=u!==0&&8>u?u:8;var c=w.T,r={};w.T=r,xo(e,!1,t,l);try{var d=n(),z=w.S;if(z!==null&&z(r,d),d!==null&&typeof d=="object"&&typeof d.then=="function"){var D=Gy(d,a);$n(e,t,D,At(e))}else $n(e,t,a,At(e))}catch(O){$n(e,t,{then:function(){},status:"rejected",reason:O},At())}finally{N.p=u,c!==null&&r.types!==null&&(c.types=r.types),w.T=c}}function Jy(){}function So(e,t,l,a){if(e.tag!==5)throw Error(o(476));var n=rd(e).queue;fd(e,n,t,$,l===null?Jy:function(){return sd(e),l(a)})}function rd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:$,baseState:$,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fl,lastRenderedState:$},next:null};var l={};return t.next={memoizedState:l,baseState:l,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fl,lastRenderedState:l},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function sd(e){var t=rd(e);t.next===null&&(t=e.alternate.memoizedState),$n(e,t.next.queue,{},At())}function Eo(){return tt(du)}function dd(){return Le().memoizedState}function hd(){return Le().memoizedState}function $y(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var l=At();e=Ol(l);var a=Ul(t,e,l);a!==null&&(yt(a,t,l),Qn(a,t,l)),t={cache:$c()},e.payload=t;return}t=t.return}}function Wy(e,t,l){var a=At();l={lane:a,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},fi(e)?gd(t,l):(l=qc(e,t,l,a),l!==null&&(yt(l,e,a),yd(l,t,a)))}function md(e,t,l){var a=At();$n(e,t,l,a)}function $n(e,t,l,a){var n={lane:a,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null};if(fi(e))gd(t,n);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var c=t.lastRenderedState,r=u(c,l);if(n.hasEagerState=!0,n.eagerState=r,St(r,c))return Xu(e,t,n,0),Me===null&&Gu(),!1}catch(d){}if(l=qc(e,t,n,a),l!==null)return yt(l,e,a),yd(l,t,a),!0}return!1}function xo(e,t,l,a){if(a={lane:2,revertLane:ef(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},fi(e)){if(t)throw Error(o(479))}else t=qc(e,l,a,2),t!==null&&yt(t,e,2)}function fi(e){var t=e.alternate;return e===ue||t!==null&&t===ue}function gd(e,t){Ia=li=!0;var l=e.pending;l===null?t.next=t:(t.next=l.next,l.next=t),e.pending=t}function yd(e,t,l){if((l&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,l|=a,t.lanes=l,Er(e,l)}}var Wn={readContext:tt,use:ui,useCallback:Ne,useContext:Ne,useEffect:Ne,useImperativeHandle:Ne,useLayoutEffect:Ne,useInsertionEffect:Ne,useMemo:Ne,useReducer:Ne,useRef:Ne,useState:Ne,useDebugValue:Ne,useDeferredValue:Ne,useTransition:Ne,useSyncExternalStore:Ne,useId:Ne,useHostTransitionStatus:Ne,useFormState:Ne,useActionState:Ne,useOptimistic:Ne,useMemoCache:Ne,useCacheRefresh:Ne};Wn.useEffectEvent=Ne;var vd={readContext:tt,use:ui,useCallback:function(e,t){return ot().memoizedState=[e,t===void 0?null:t],e},useContext:tt,useEffect:ed,useImperativeHandle:function(e,t,l){l=l!=null?l.concat([e]):null,ci(4194308,4,nd.bind(null,t,e),l)},useLayoutEffect:function(e,t){return ci(4194308,4,e,t)},useInsertionEffect:function(e,t){ci(4,2,e,t)},useMemo:function(e,t){var l=ot();t=t===void 0?null:t;var a=e();if(ha){Gt(!0);try{e()}finally{Gt(!1)}}return l.memoizedState=[a,t],a},useReducer:function(e,t,l){var a=ot();if(l!==void 0){var n=l(t);if(ha){Gt(!0);try{l(t)}finally{Gt(!1)}}}else n=t;return a.memoizedState=a.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},a.queue=e,e=e.dispatch=Wy.bind(null,ue,e),[a.memoizedState,e]},useRef:function(e){var t=ot();return e={current:e},t.memoizedState=e},useState:function(e){e=go(e);var t=e.queue,l=md.bind(null,ue,t);return t.dispatch=l,[e.memoizedState,l]},useDebugValue:bo,useDeferredValue:function(e,t){var l=ot();return po(l,e,t)},useTransition:function(){var e=go(!1);return e=fd.bind(null,ue,e.queue,!0,!1),ot().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,l){var a=ue,n=ot();if(he){if(l===void 0)throw Error(o(407));l=l()}else{if(l=t(),Me===null)throw Error(o(349));(se&127)!==0||qs(a,t,l)}n.memoizedState=l;var u={value:l,getSnapshot:t};return n.queue=u,ed(Ys.bind(null,a,u,e),[e]),a.flags|=2048,en(9,{destroy:void 0},Ls.bind(null,a,u,l,t),null),l},useId:function(){var e=ot(),t=Me.identifierPrefix;if(he){var l=Wt,a=$t;l=(a&~(1<<32-Ue(a)-1)).toString(32)+l,t="_"+t+"R_"+l,l=ai++,0<l&&(t+="H"+l.toString(32)),t+="_"}else l=Xy++,t="_"+t+"r_"+l.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Eo,useFormState:$s,useActionState:$s,useOptimistic:function(e){var t=ot();t.memoizedState=t.baseState=e;var l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=l,t=xo.bind(null,ue,!0,l),l.dispatch=t,[e,t]},useMemoCache:so,useCacheRefresh:function(){return ot().memoizedState=$y.bind(null,ue)},useEffectEvent:function(e){var t=ot(),l={impl:e};return t.memoizedState=l,function(){if((pe&2)!==0)throw Error(o(440));return l.impl.apply(void 0,arguments)}}},To={readContext:tt,use:ui,useCallback:id,useContext:tt,useEffect:vo,useImperativeHandle:ud,useInsertionEffect:ld,useLayoutEffect:ad,useMemo:cd,useReducer:ii,useRef:Ps,useState:function(){return ii(fl)},useDebugValue:bo,useDeferredValue:function(e,t){var l=Le();return od(l,Te.memoizedState,e,t)},useTransition:function(){var e=ii(fl)[0],t=Le().memoizedState;return[typeof e=="boolean"?e:Jn(e),t]},useSyncExternalStore:ks,useId:dd,useHostTransitionStatus:Eo,useFormState:Ws,useActionState:Ws,useOptimistic:function(e,t){var l=Le();return Xs(l,Te,e,t)},useMemoCache:so,useCacheRefresh:hd};To.useEffectEvent=td;var bd={readContext:tt,use:ui,useCallback:id,useContext:tt,useEffect:vo,useImperativeHandle:ud,useInsertionEffect:ld,useLayoutEffect:ad,useMemo:cd,useReducer:mo,useRef:Ps,useState:function(){return mo(fl)},useDebugValue:bo,useDeferredValue:function(e,t){var l=Le();return Te===null?po(l,e,t):od(l,Te.memoizedState,e,t)},useTransition:function(){var e=mo(fl)[0],t=Le().memoizedState;return[typeof e=="boolean"?e:Jn(e),t]},useSyncExternalStore:ks,useId:dd,useHostTransitionStatus:Eo,useFormState:Is,useActionState:Is,useOptimistic:function(e,t){var l=Le();return Te!==null?Xs(l,Te,e,t):(l.baseState=e,[e,l.queue.dispatch])},useMemoCache:so,useCacheRefresh:hd};bd.useEffectEvent=td;function zo(e,t,l,a){t=e.memoizedState,l=l(a,t),l=l==null?t:_({},t,l),e.memoizedState=l,e.lanes===0&&(e.updateQueue.baseState=l)}var wo={enqueueSetState:function(e,t,l){e=e._reactInternals;var a=At(),n=Ol(a);n.payload=t,l!=null&&(n.callback=l),t=Ul(e,n,a),t!==null&&(yt(t,e,a),Qn(t,e,a))},enqueueReplaceState:function(e,t,l){e=e._reactInternals;var a=At(),n=Ol(a);n.tag=1,n.payload=t,l!=null&&(n.callback=l),t=Ul(e,n,a),t!==null&&(yt(t,e,a),Qn(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var l=At(),a=Ol(l);a.tag=2,t!=null&&(a.callback=t),t=Ul(e,a,l),t!==null&&(yt(t,e,l),Qn(t,e,l))}};function pd(e,t,l,a,n,u,c){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,u,c):t.prototype&&t.prototype.isPureReactComponent?!Bn(l,a)||!Bn(n,u):!0}function Sd(e,t,l,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(l,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(l,a),t.state!==e&&wo.enqueueReplaceState(t,t.state,null)}function ma(e,t){var l=t;if("ref"in t){l={};for(var a in t)a!=="ref"&&(l[a]=t[a])}if(e=e.defaultProps){l===t&&(l=_({},l));for(var n in e)l[n]===void 0&&(l[n]=e[n])}return l}function Ed(e){ju(e)}function xd(e){console.error(e)}function Td(e){ju(e)}function ri(e,t){try{var l=e.onUncaughtError;l(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function zd(e,t,l){try{var a=e.onCaughtError;a(l.value,{componentStack:l.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Ao(e,t,l){return l=Ol(l),l.tag=3,l.payload={element:null},l.callback=function(){ri(e,t)},l}function wd(e){return e=Ol(e),e.tag=3,e}function Ad(e,t,l,a){var n=l.type.getDerivedStateFromError;if(typeof n=="function"){var u=a.value;e.payload=function(){return n(u)},e.callback=function(){zd(t,l,a)}}var c=l.stateNode;c!==null&&typeof c.componentDidCatch=="function"&&(e.callback=function(){zd(t,l,a),typeof n!="function"&&(ql===null?ql=new Set([this]):ql.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function Fy(e,t,l,a,n){if(l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=l.alternate,t!==null&&Va(t,l,n,!0),l=xt.current,l!==null){switch(l.tag){case 31:case 13:return qt===null?xi():l.alternate===null&&He===0&&(He=3),l.flags&=-257,l.flags|=65536,l.lanes=n,a===Fu?l.flags|=16384:(t=l.updateQueue,t===null?l.updateQueue=new Set([a]):t.add(a),Fo(e,a,n)),!1;case 22:return l.flags|=65536,a===Fu?l.flags|=16384:(t=l.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},l.updateQueue=t):(l=t.retryQueue,l===null?t.retryQueue=new Set([a]):l.add(a)),Fo(e,a,n)),!1}throw Error(o(435,l.tag))}return Fo(e,a,n),xi(),!1}if(he)return t=xt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,a!==Qc&&(e=Error(o(422),{cause:a}),Ln(Nt(e,l)))):(a!==Qc&&(t=Error(o(423),{cause:a}),Ln(Nt(t,l))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,a=Nt(a,l),n=Ao(e.stateNode,a,n),to(e,n),He!==4&&(He=2)),!1;var u=Error(o(520),{cause:a});if(u=Nt(u,l),nu===null?nu=[u]:nu.push(u),He!==4&&(He=2),t===null)return!0;a=Nt(a,l),l=t;do{switch(l.tag){case 3:return l.flags|=65536,e=n&-n,l.lanes|=e,e=Ao(l.stateNode,a,e),to(l,e),!1;case 1:if(t=l.type,u=l.stateNode,(l.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(ql===null||!ql.has(u))))return l.flags|=65536,n&=-n,l.lanes|=n,n=wd(n),Ad(n,e,l,a),to(l,n),!1}l=l.return}while(l!==null);return!1}var Mo=Error(o(461)),Ge=!1;function lt(e,t,l,a){t.child=e===null?Cs(t,null,l,a):da(t,e.child,l,a)}function Md(e,t,l,a,n){l=l.render;var u=t.ref;if("ref"in a){var c={};for(var r in a)r!=="ref"&&(c[r]=a[r])}else c=a;return oa(t),a=co(e,t,l,c,u,n),r=oo(),e!==null&&!Ge?(fo(e,t,n),rl(e,t,n)):(he&&r&&Gc(t),t.flags|=1,lt(e,t,a,n),t.child)}function _d(e,t,l,a,n){if(e===null){var u=l.type;return typeof u=="function"&&!Lc(u)&&u.defaultProps===void 0&&l.compare===null?(t.tag=15,t.type=u,Dd(e,t,u,a,n)):(e=Zu(l.type,null,a,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(u=e.child,!Ho(e,n)){var c=u.memoizedProps;if(l=l.compare,l=l!==null?l:Bn,l(c,a)&&e.ref===t.ref)return rl(e,t,n)}return t.flags|=1,e=nl(u,a),e.ref=t.ref,e.return=t,t.child=e}function Dd(e,t,l,a,n){if(e!==null){var u=e.memoizedProps;if(Bn(u,a)&&e.ref===t.ref)if(Ge=!1,t.pendingProps=a=u,Ho(e,n))(e.flags&131072)!==0&&(Ge=!0);else return t.lanes=e.lanes,rl(e,t,n)}return _o(e,t,l,a,n)}function Cd(e,t,l,a){var n=a.children,u=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(u=u!==null?u.baseLanes|l:l,e!==null){for(a=t.child=e.child,n=0;a!==null;)n=n|a.lanes|a.childLanes,a=a.sibling;a=n&~u}else a=0,t.child=null;return Od(e,t,u,l,a)}if((l&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&$u(t,u!==null?u.cachePool:null),u!==null?Rs(t,u):ao(),Ns(t);else return a=t.lanes=536870912,Od(e,t,u!==null?u.baseLanes|l:l,l,a)}else u!==null?($u(t,u.cachePool),Rs(t,u),Nl(),t.memoizedState=null):(e!==null&&$u(t,null),ao(),Nl());return lt(e,t,n,l),t.child}function Fn(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Od(e,t,l,a,n){var u=Fc();return u=u===null?null:{parent:Ye._currentValue,pool:u},t.memoizedState={baseLanes:l,cachePool:u},e!==null&&$u(t,null),ao(),Ns(t),e!==null&&Va(e,t,a,!0),t.childLanes=n,null}function si(e,t){return t=hi({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Ud(e,t,l){return da(t,e.child,null,l),e=si(t,t.pendingProps),e.flags|=2,Tt(t),t.memoizedState=null,e}function Iy(e,t,l){var a=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(he){if(a.mode==="hidden")return e=si(t,a),t.lanes=536870912,Fn(null,e);if(uo(t),(e=De)?(e=Qh(e,kt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Al!==null?{id:$t,overflow:Wt}:null,retryLane:536870912,hydrationErrors:null},l=gs(e),l.return=t,t.child=l,et=t,De=null)):e=null,e===null)throw _l(t);return t.lanes=536870912,null}return si(t,a)}var u=e.memoizedState;if(u!==null){var c=u.dehydrated;if(uo(t),n)if(t.flags&256)t.flags&=-257,t=Ud(e,t,l);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(Ge||Va(e,t,l,!1),n=(l&e.childLanes)!==0,Ge||n){if(a=Me,a!==null&&(c=xr(a,l),c!==0&&c!==u.retryLane))throw u.retryLane=c,na(e,c),yt(a,e,c),Mo;xi(),t=Ud(e,t,l)}else e=u.treeContext,De=Lt(c.nextSibling),et=t,he=!0,Ml=null,kt=!1,e!==null&&bs(t,e),t=si(t,a),t.flags|=4096;return t}return e=nl(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function di(e,t){var l=t.ref;if(l===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof l!="function"&&typeof l!="object")throw Error(o(284));(e===null||e.ref!==l)&&(t.flags|=4194816)}}function _o(e,t,l,a,n){return oa(t),l=co(e,t,l,a,void 0,n),a=oo(),e!==null&&!Ge?(fo(e,t,n),rl(e,t,n)):(he&&a&&Gc(t),t.flags|=1,lt(e,t,l,n),t.child)}function Rd(e,t,l,a,n,u){return oa(t),t.updateQueue=null,l=Bs(t,a,l,n),Hs(e),a=oo(),e!==null&&!Ge?(fo(e,t,u),rl(e,t,u)):(he&&a&&Gc(t),t.flags|=1,lt(e,t,l,u),t.child)}function Nd(e,t,l,a,n){if(oa(t),t.stateNode===null){var u=Ga,c=l.contextType;typeof c=="object"&&c!==null&&(u=tt(c)),u=new l(a,u),t.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=wo,t.stateNode=u,u._reactInternals=t,u=t.stateNode,u.props=a,u.state=t.memoizedState,u.refs={},Pc(t),c=l.contextType,u.context=typeof c=="object"&&c!==null?tt(c):Ga,u.state=t.memoizedState,c=l.getDerivedStateFromProps,typeof c=="function"&&(zo(t,l,c,a),u.state=t.memoizedState),typeof l.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(c=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),c!==u.state&&wo.enqueueReplaceState(u,u.state,null),Vn(t,a,u,n),Zn(),u.state=t.memoizedState),typeof u.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){u=t.stateNode;var r=t.memoizedProps,d=ma(l,r);u.props=d;var z=u.context,D=l.contextType;c=Ga,typeof D=="object"&&D!==null&&(c=tt(D));var O=l.getDerivedStateFromProps;D=typeof O=="function"||typeof u.getSnapshotBeforeUpdate=="function",r=t.pendingProps!==r,D||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(r||z!==c)&&Sd(t,u,a,c),Cl=!1;var A=t.memoizedState;u.state=A,Vn(t,a,u,n),Zn(),z=t.memoizedState,r||A!==z||Cl?(typeof O=="function"&&(zo(t,l,O,a),z=t.memoizedState),(d=Cl||pd(t,l,d,a,A,z,c))?(D||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=z),u.props=a,u.state=z,u.context=c,a=d):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{u=t.stateNode,eo(e,t),c=t.memoizedProps,D=ma(l,c),u.props=D,O=t.pendingProps,A=u.context,z=l.contextType,d=Ga,typeof z=="object"&&z!==null&&(d=tt(z)),r=l.getDerivedStateFromProps,(z=typeof r=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==O||A!==d)&&Sd(t,u,a,d),Cl=!1,A=t.memoizedState,u.state=A,Vn(t,a,u,n),Zn();var M=t.memoizedState;c!==O||A!==M||Cl||e!==null&&e.dependencies!==null&&Ku(e.dependencies)?(typeof r=="function"&&(zo(t,l,r,a),M=t.memoizedState),(D=Cl||pd(t,l,D,a,A,M,d)||e!==null&&e.dependencies!==null&&Ku(e.dependencies))?(z||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(a,M,d),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(a,M,d)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=M),u.props=a,u.state=M,u.context=d,a=D):(typeof u.componentDidUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&A===e.memoizedState||(t.flags|=1024),a=!1)}return u=a,di(e,t),a=(t.flags&128)!==0,u||a?(u=t.stateNode,l=a&&typeof l.getDerivedStateFromError!="function"?null:u.render(),t.flags|=1,e!==null&&a?(t.child=da(t,e.child,null,n),t.child=da(t,null,l,n)):lt(e,t,l,n),t.memoizedState=u.state,e=t.child):e=rl(e,t,n),e}function Hd(e,t,l,a){return ia(),t.flags|=256,lt(e,t,l,a),t.child}var Do={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Co(e){return{baseLanes:e,cachePool:zs()}}function Oo(e,t,l){return e=e!==null?e.childLanes&~l:0,t&&(e|=wt),e}function Bd(e,t,l){var a=t.pendingProps,n=!1,u=(t.flags&128)!==0,c;if((c=u)||(c=e!==null&&e.memoizedState===null?!1:(qe.current&2)!==0),c&&(n=!0,t.flags&=-129),c=(t.flags&32)!==0,t.flags&=-33,e===null){if(he){if(n?Rl(t):Nl(),(e=De)?(e=Qh(e,kt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Al!==null?{id:$t,overflow:Wt}:null,retryLane:536870912,hydrationErrors:null},l=gs(e),l.return=t,t.child=l,et=t,De=null)):e=null,e===null)throw _l(t);return mf(e)?t.lanes=32:t.lanes=536870912,null}var r=a.children;return a=a.fallback,n?(Nl(),n=t.mode,r=hi({mode:"hidden",children:r},n),a=ua(a,n,l,null),r.return=t,a.return=t,r.sibling=a,t.child=r,a=t.child,a.memoizedState=Co(l),a.childLanes=Oo(e,c,l),t.memoizedState=Do,Fn(null,a)):(Rl(t),Uo(t,r))}var d=e.memoizedState;if(d!==null&&(r=d.dehydrated,r!==null)){if(u)t.flags&256?(Rl(t),t.flags&=-257,t=Ro(e,t,l)):t.memoizedState!==null?(Nl(),t.child=e.child,t.flags|=128,t=null):(Nl(),r=a.fallback,n=t.mode,a=hi({mode:"visible",children:a.children},n),r=ua(r,n,l,null),r.flags|=2,a.return=t,r.return=t,a.sibling=r,t.child=a,da(t,e.child,null,l),a=t.child,a.memoizedState=Co(l),a.childLanes=Oo(e,c,l),t.memoizedState=Do,t=Fn(null,a));else if(Rl(t),mf(r)){if(c=r.nextSibling&&r.nextSibling.dataset,c)var z=c.dgst;c=z,a=Error(o(419)),a.stack="",a.digest=c,Ln({value:a,source:null,stack:null}),t=Ro(e,t,l)}else if(Ge||Va(e,t,l,!1),c=(l&e.childLanes)!==0,Ge||c){if(c=Me,c!==null&&(a=xr(c,l),a!==0&&a!==d.retryLane))throw d.retryLane=a,na(e,a),yt(c,e,a),Mo;hf(r)||xi(),t=Ro(e,t,l)}else hf(r)?(t.flags|=192,t.child=e.child,t=null):(e=d.treeContext,De=Lt(r.nextSibling),et=t,he=!0,Ml=null,kt=!1,e!==null&&bs(t,e),t=Uo(t,a.children),t.flags|=4096);return t}return n?(Nl(),r=a.fallback,n=t.mode,d=e.child,z=d.sibling,a=nl(d,{mode:"hidden",children:a.children}),a.subtreeFlags=d.subtreeFlags&65011712,z!==null?r=nl(z,r):(r=ua(r,n,l,null),r.flags|=2),r.return=t,a.return=t,a.sibling=r,t.child=a,Fn(null,a),a=t.child,r=e.child.memoizedState,r===null?r=Co(l):(n=r.cachePool,n!==null?(d=Ye._currentValue,n=n.parent!==d?{parent:d,pool:d}:n):n=zs(),r={baseLanes:r.baseLanes|l,cachePool:n}),a.memoizedState=r,a.childLanes=Oo(e,c,l),t.memoizedState=Do,Fn(e.child,a)):(Rl(t),l=e.child,e=l.sibling,l=nl(l,{mode:"visible",children:a.children}),l.return=t,l.sibling=null,e!==null&&(c=t.deletions,c===null?(t.deletions=[e],t.flags|=16):c.push(e)),t.child=l,t.memoizedState=null,l)}function Uo(e,t){return t=hi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function hi(e,t){return e=Et(22,e,null,t),e.lanes=0,e}function Ro(e,t,l){return da(t,e.child,null,l),e=Uo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kd(e,t,l){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Kc(e.return,t,l)}function No(e,t,l,a,n,u){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:l,tailMode:n,treeForkCount:u}:(c.isBackwards=t,c.rendering=null,c.renderingStartTime=0,c.last=a,c.tail=l,c.tailMode=n,c.treeForkCount=u)}function qd(e,t,l){var a=t.pendingProps,n=a.revealOrder,u=a.tail;a=a.children;var c=qe.current,r=(c&2)!==0;if(r?(c=c&1|2,t.flags|=128):c&=1,L(qe,c),lt(e,t,a,l),a=he?qn:0,!r&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kd(e,l,t);else if(e.tag===19)kd(e,l,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(n){case"forwards":for(l=t.child,n=null;l!==null;)e=l.alternate,e!==null&&ti(e)===null&&(n=l),l=l.sibling;l=n,l===null?(n=t.child,t.child=null):(n=l.sibling,l.sibling=null),No(t,!1,n,l,u,a);break;case"backwards":case"unstable_legacy-backwards":for(l=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&ti(e)===null){t.child=n;break}e=n.sibling,n.sibling=l,l=n,n=e}No(t,!0,l,null,u,a);break;case"together":No(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function rl(e,t,l){if(e!==null&&(t.dependencies=e.dependencies),kl|=t.lanes,(l&t.childLanes)===0)if(e!==null){if(Va(e,t,l,!1),(l&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,l=nl(e,e.pendingProps),t.child=l,l.return=t;e.sibling!==null;)e=e.sibling,l=l.sibling=nl(e,e.pendingProps),l.return=t;l.sibling=null}return t.child}function Ho(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ku(e)))}function Py(e,t,l){switch(t.tag){case 3:Ke(t,t.stateNode.containerInfo),Dl(t,Ye,e.memoizedState.cache),ia();break;case 27:case 5:Pt(t);break;case 4:Ke(t,t.stateNode.containerInfo);break;case 10:Dl(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,uo(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(Rl(t),t.flags|=128,null):(l&t.child.childLanes)!==0?Bd(e,t,l):(Rl(t),e=rl(e,t,l),e!==null?e.sibling:null);Rl(t);break;case 19:var n=(e.flags&128)!==0;if(a=(l&t.childLanes)!==0,a||(Va(e,t,l,!1),a=(l&t.childLanes)!==0),n){if(a)return qd(e,t,l);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),L(qe,qe.current),a)break;return null;case 22:return t.lanes=0,Cd(e,t,l,t.pendingProps);case 24:Dl(t,Ye,e.memoizedState.cache)}return rl(e,t,l)}function Ld(e,t,l){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ge=!0;else{if(!Ho(e,l)&&(t.flags&128)===0)return Ge=!1,Py(e,t,l);Ge=(e.flags&131072)!==0}else Ge=!1,he&&(t.flags&1048576)!==0&&vs(t,qn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=ra(t.elementType),t.type=e,typeof e=="function")Lc(e)?(a=ma(e,a),t.tag=1,t=Nd(null,t,e,a,l)):(t.tag=0,t=_o(null,t,e,a,l));else{if(e!=null){var n=e.$$typeof;if(n===G){t.tag=11,t=Md(null,t,e,a,l);break e}else if(n===Z){t.tag=14,t=_d(null,t,e,a,l);break e}}throw t=Ze(e)||e,Error(o(306,t,""))}}return t;case 0:return _o(e,t,t.type,t.pendingProps,l);case 1:return a=t.type,n=ma(a,t.pendingProps),Nd(e,t,a,n,l);case 3:e:{if(Ke(t,t.stateNode.containerInfo),e===null)throw Error(o(387));a=t.pendingProps;var u=t.memoizedState;n=u.element,eo(e,t),Vn(t,a,null,l);var c=t.memoizedState;if(a=c.cache,Dl(t,Ye,a),a!==u.cache&&Jc(t,[Ye],l,!0),Zn(),a=c.element,u.isDehydrated)if(u={element:a,isDehydrated:!1,cache:c.cache},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){t=Hd(e,t,a,l);break e}else if(a!==n){n=Nt(Error(o(424)),t),Ln(n),t=Hd(e,t,a,l);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,De=Lt(e.firstChild),et=t,he=!0,Ml=null,kt=!0,l=Cs(t,null,a,l),t.child=l;l;)l.flags=l.flags&-3|4096,l=l.sibling;else{if(ia(),a===n){t=rl(e,t,l);break e}lt(e,t,a,l)}t=t.child}return t;case 26:return di(e,t),e===null?(l=Wh(t.type,null,t.pendingProps,null))?t.memoizedState=l:he||(l=t.type,e=t.pendingProps,a=Di(oe.current).createElement(l),a[Pe]=t,a[rt]=e,at(a,l,e),We(a),t.stateNode=a):t.memoizedState=Wh(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Pt(t),e===null&&he&&(a=t.stateNode=Kh(t.type,t.pendingProps,oe.current),et=t,kt=!0,n=De,Gl(t.type)?(gf=n,De=Lt(a.firstChild)):De=n),lt(e,t,t.pendingProps.children,l),di(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&he&&((n=a=De)&&(a=Dv(a,t.type,t.pendingProps,kt),a!==null?(t.stateNode=a,et=t,De=Lt(a.firstChild),kt=!1,n=!0):n=!1),n||_l(t)),Pt(t),n=t.type,u=t.pendingProps,c=e!==null?e.memoizedProps:null,a=u.children,rf(n,u)?a=null:c!==null&&rf(n,c)&&(t.flags|=32),t.memoizedState!==null&&(n=co(e,t,Qy,null,null,l),du._currentValue=n),di(e,t),lt(e,t,a,l),t.child;case 6:return e===null&&he&&((e=l=De)&&(l=Cv(l,t.pendingProps,kt),l!==null?(t.stateNode=l,et=t,De=null,e=!0):e=!1),e||_l(t)),null;case 13:return Bd(e,t,l);case 4:return Ke(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=da(t,null,a,l):lt(e,t,a,l),t.child;case 11:return Md(e,t,t.type,t.pendingProps,l);case 7:return lt(e,t,t.pendingProps,l),t.child;case 8:return lt(e,t,t.pendingProps.children,l),t.child;case 12:return lt(e,t,t.pendingProps.children,l),t.child;case 10:return a=t.pendingProps,Dl(t,t.type,a.value),lt(e,t,a.children,l),t.child;case 9:return n=t.type._context,a=t.pendingProps.children,oa(t),n=tt(n),a=a(n),t.flags|=1,lt(e,t,a,l),t.child;case 14:return _d(e,t,t.type,t.pendingProps,l);case 15:return Dd(e,t,t.type,t.pendingProps,l);case 19:return qd(e,t,l);case 31:return Iy(e,t,l);case 22:return Cd(e,t,l,t.pendingProps);case 24:return oa(t),a=tt(Ye),e===null?(n=Fc(),n===null&&(n=Me,u=$c(),n.pooledCache=u,u.refCount++,u!==null&&(n.pooledCacheLanes|=l),n=u),t.memoizedState={parent:a,cache:n},Pc(t),Dl(t,Ye,n)):((e.lanes&l)!==0&&(eo(e,t),Vn(t,null,null,l),Zn()),n=e.memoizedState,u=t.memoizedState,n.parent!==a?(n={parent:a,cache:a},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),Dl(t,Ye,a)):(a=u.cache,Dl(t,Ye,a),a!==n.cache&&Jc(t,[Ye],l,!0))),lt(e,t,t.pendingProps.children,l),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function sl(e){e.flags|=4}function Bo(e,t,l,a,n){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(n&335544128)===n)if(e.stateNode.complete)e.flags|=8192;else if(dh())e.flags|=8192;else throw sa=Fu,Ic}else e.flags&=-16777217}function Yd(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!t0(t))if(dh())e.flags|=8192;else throw sa=Fu,Ic}function mi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?An():536870912,e.lanes|=t,nn|=t)}function In(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var l=null;t!==null;)t.alternate!==null&&(l=t),t=t.sibling;l===null?e.tail=null:l.sibling=null;break;case"collapsed":l=e.tail;for(var a=null;l!==null;)l.alternate!==null&&(a=l),l=l.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Ce(e){var t=e.alternate!==null&&e.alternate.child===e.child,l=0,a=0;if(t)for(var n=e.child;n!==null;)l|=n.lanes|n.childLanes,a|=n.subtreeFlags&65011712,a|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)l|=n.lanes|n.childLanes,a|=n.subtreeFlags,a|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=a,e.childLanes=l,t}function ev(e,t,l){var a=t.pendingProps;switch(Xc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ce(t),null;case 1:return Ce(t),null;case 3:return l=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),cl(Ye),Oe(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&(Za(t)?sl(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Zc())),Ce(t),null;case 26:var n=t.type,u=t.memoizedState;return e===null?(sl(t),u!==null?(Ce(t),Yd(t,u)):(Ce(t),Bo(t,n,null,a,l))):u?u!==e.memoizedState?(sl(t),Ce(t),Yd(t,u)):(Ce(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&sl(t),Ce(t),Bo(t,n,e,a,l)),null;case 27:if(Wl(t),l=oe.current,n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&sl(t);else{if(!a){if(t.stateNode===null)throw Error(o(166));return Ce(t),null}e=X.current,Za(t)?ps(t):(e=Kh(n,a,l),t.stateNode=e,sl(t))}return Ce(t),null;case 5:if(Wl(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&sl(t);else{if(!a){if(t.stateNode===null)throw Error(o(166));return Ce(t),null}if(u=X.current,Za(t))ps(t);else{var c=Di(oe.current);switch(u){case 1:u=c.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:u=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":u=c.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":u=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":u=c.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof a.is=="string"?c.createElement("select",{is:a.is}):c.createElement("select"),a.multiple?u.multiple=!0:a.size&&(u.size=a.size);break;default:u=typeof a.is=="string"?c.createElement(n,{is:a.is}):c.createElement(n)}}u[Pe]=t,u[rt]=a;e:for(c=t.child;c!==null;){if(c.tag===5||c.tag===6)u.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===t)break e;for(;c.sibling===null;){if(c.return===null||c.return===t)break e;c=c.return}c.sibling.return=c.return,c=c.sibling}t.stateNode=u;e:switch(at(u,n,a),n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&sl(t)}}return Ce(t),Bo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,l),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&sl(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(o(166));if(e=oe.current,Za(t)){if(e=t.stateNode,l=t.memoizedProps,a=null,n=et,n!==null)switch(n.tag){case 27:case 5:a=n.memoizedProps}e[Pe]=t,e=!!(e.nodeValue===l||a!==null&&a.suppressHydrationWarning===!0||Bh(e.nodeValue,l)),e||_l(t,!0)}else e=Di(e).createTextNode(a),e[Pe]=t,t.stateNode=e}return Ce(t),null;case 31:if(l=t.memoizedState,e===null||e.memoizedState!==null){if(a=Za(t),l!==null){if(e===null){if(!a)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[Pe]=t}else ia(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ce(t),e=!1}else l=Zc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),e=!0;if(!e)return t.flags&256?(Tt(t),t):(Tt(t),null);if((t.flags&128)!==0)throw Error(o(558))}return Ce(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=Za(t),a!==null&&a.dehydrated!==null){if(e===null){if(!n)throw Error(o(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(o(317));n[Pe]=t}else ia(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ce(t),n=!1}else n=Zc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(Tt(t),t):(Tt(t),null)}return Tt(t),(t.flags&128)!==0?(t.lanes=l,t):(l=a!==null,e=e!==null&&e.memoizedState!==null,l&&(a=t.child,n=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(n=a.alternate.memoizedState.cachePool.pool),u=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(u=a.memoizedState.cachePool.pool),u!==n&&(a.flags|=2048)),l!==e&&l&&(t.child.flags|=8192),mi(t,t.updateQueue),Ce(t),null);case 4:return Oe(),e===null&&nf(t.stateNode.containerInfo),Ce(t),null;case 10:return cl(t.type),Ce(t),null;case 19:if(U(qe),a=t.memoizedState,a===null)return Ce(t),null;if(n=(t.flags&128)!==0,u=a.rendering,u===null)if(n)In(a,!1);else{if(He!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=ti(e),u!==null){for(t.flags|=128,In(a,!1),e=u.updateQueue,t.updateQueue=e,mi(t,e),t.subtreeFlags=0,e=l,l=t.child;l!==null;)ms(l,e),l=l.sibling;return L(qe,qe.current&1|2),he&&ul(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&ut()>pi&&(t.flags|=128,n=!0,In(a,!1),t.lanes=4194304)}else{if(!n)if(e=ti(u),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,mi(t,e),In(a,!0),a.tail===null&&a.tailMode==="hidden"&&!u.alternate&&!he)return Ce(t),null}else 2*ut()-a.renderingStartTime>pi&&l!==536870912&&(t.flags|=128,n=!0,In(a,!1),t.lanes=4194304);a.isBackwards?(u.sibling=t.child,t.child=u):(e=a.last,e!==null?e.sibling=u:t.child=u,a.last=u)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=ut(),e.sibling=null,l=qe.current,L(qe,n?l&1|2:l&1),he&&ul(t,a.treeForkCount),e):(Ce(t),null);case 22:case 23:return Tt(t),no(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(l&536870912)!==0&&(t.flags&128)===0&&(Ce(t),t.subtreeFlags&6&&(t.flags|=8192)):Ce(t),l=t.updateQueue,l!==null&&mi(t,l.retryQueue),l=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==l&&(t.flags|=2048),e!==null&&U(fa),null;case 24:return l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),cl(Ye),Ce(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function tv(e,t){switch(Xc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return cl(Ye),Oe(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Wl(t),null;case 31:if(t.memoizedState!==null){if(Tt(t),t.alternate===null)throw Error(o(340));ia()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Tt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));ia()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return U(qe),null;case 4:return Oe(),null;case 10:return cl(t.type),null;case 22:case 23:return Tt(t),no(),e!==null&&U(fa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return cl(Ye),null;case 25:return null;default:return null}}function jd(e,t){switch(Xc(t),t.tag){case 3:cl(Ye),Oe();break;case 26:case 27:case 5:Wl(t);break;case 4:Oe();break;case 31:t.memoizedState!==null&&Tt(t);break;case 13:Tt(t);break;case 19:U(qe);break;case 10:cl(t.type);break;case 22:case 23:Tt(t),no(),e!==null&&U(fa);break;case 24:cl(Ye)}}function Pn(e,t){try{var l=t.updateQueue,a=l!==null?l.lastEffect:null;if(a!==null){var n=a.next;l=n;do{if((l.tag&e)===e){a=void 0;var u=l.create,c=l.inst;a=u(),c.destroy=a}l=l.next}while(l!==n)}}catch(r){xe(t,t.return,r)}}function Hl(e,t,l){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var u=n.next;a=u;do{if((a.tag&e)===e){var c=a.inst,r=c.destroy;if(r!==void 0){c.destroy=void 0,n=t;var d=l,z=r;try{z()}catch(D){xe(n,d,D)}}}a=a.next}while(a!==u)}}catch(D){xe(t,t.return,D)}}function Gd(e){var t=e.updateQueue;if(t!==null){var l=e.stateNode;try{Us(t,l)}catch(a){xe(e,e.return,a)}}}function Xd(e,t,l){l.props=ma(e.type,e.memoizedProps),l.state=e.memoizedState;try{l.componentWillUnmount()}catch(a){xe(e,t,a)}}function eu(e,t){try{var l=e.ref;if(l!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof l=="function"?e.refCleanup=l(a):l.current=a}}catch(n){xe(e,t,n)}}function Ft(e,t){var l=e.ref,a=e.refCleanup;if(l!==null)if(typeof a=="function")try{a()}catch(n){xe(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof l=="function")try{l(null)}catch(n){xe(e,t,n)}else l.current=null}function Qd(e){var t=e.type,l=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":l.autoFocus&&a.focus();break e;case"img":l.src?a.src=l.src:l.srcSet&&(a.srcset=l.srcSet)}}catch(n){xe(e,e.return,n)}}function ko(e,t,l){try{var a=e.stateNode;Tv(a,e.type,l,t),a[rt]=t}catch(n){xe(e,e.return,n)}}function Zd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Gl(e.type)||e.tag===4}function qo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Zd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Gl(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Lo(e,t,l){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l).insertBefore(e,t):(t=l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l,t.appendChild(e),l=l._reactRootContainer,l!=null||t.onclick!==null||(t.onclick=ll));else if(a!==4&&(a===27&&Gl(e.type)&&(l=e.stateNode,t=null),e=e.child,e!==null))for(Lo(e,t,l),e=e.sibling;e!==null;)Lo(e,t,l),e=e.sibling}function gi(e,t,l){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?l.insertBefore(e,t):l.appendChild(e);else if(a!==4&&(a===27&&Gl(e.type)&&(l=e.stateNode),e=e.child,e!==null))for(gi(e,t,l),e=e.sibling;e!==null;)gi(e,t,l),e=e.sibling}function Vd(e){var t=e.stateNode,l=e.memoizedProps;try{for(var a=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);at(t,a,l),t[Pe]=e,t[rt]=l}catch(u){xe(e,e.return,u)}}var dl=!1,Xe=!1,Yo=!1,Kd=typeof WeakSet=="function"?WeakSet:Set,Fe=null;function lv(e,t){if(e=e.containerInfo,of=Bi,e=us(e),Uc(e)){if("selectionStart"in e)var l={start:e.selectionStart,end:e.selectionEnd};else e:{l=(l=e.ownerDocument)&&l.defaultView||window;var a=l.getSelection&&l.getSelection();if(a&&a.rangeCount!==0){l=a.anchorNode;var n=a.anchorOffset,u=a.focusNode;a=a.focusOffset;try{l.nodeType,u.nodeType}catch(ee){l=null;break e}var c=0,r=-1,d=-1,z=0,D=0,O=e,A=null;t:for(;;){for(var M;O!==l||n!==0&&O.nodeType!==3||(r=c+n),O!==u||a!==0&&O.nodeType!==3||(d=c+a),O.nodeType===3&&(c+=O.nodeValue.length),(M=O.firstChild)!==null;)A=O,O=M;for(;;){if(O===e)break t;if(A===l&&++z===n&&(r=c),A===u&&++D===a&&(d=c),(M=O.nextSibling)!==null)break;O=A,A=O.parentNode}O=M}l=r===-1||d===-1?null:{start:r,end:d}}else l=null}l=l||{start:0,end:0}}else l=null;for(ff={focusedElem:e,selectionRange:l},Bi=!1,Fe=t;Fe!==null;)if(t=Fe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Fe=e;else for(;Fe!==null;){switch(t=Fe,u=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(l=0;l<e.length;l++)n=e[l],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&u!==null){e=void 0,l=t,n=u.memoizedProps,u=u.memoizedState,a=l.stateNode;try{var Q=ma(l.type,n);e=a.getSnapshotBeforeUpdate(Q,u),a.__reactInternalSnapshotBeforeUpdate=e}catch(ee){xe(l,l.return,ee)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,l=e.nodeType,l===9)df(e);else if(l===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":df(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,Fe=e;break}Fe=t.return}}function Jd(e,t,l){var a=l.flags;switch(l.tag){case 0:case 11:case 15:ml(e,l),a&4&&Pn(5,l);break;case 1:if(ml(e,l),a&4)if(e=l.stateNode,t===null)try{e.componentDidMount()}catch(c){xe(l,l.return,c)}else{var n=ma(l.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(c){xe(l,l.return,c)}}a&64&&Gd(l),a&512&&eu(l,l.return);break;case 3:if(ml(e,l),a&64&&(e=l.updateQueue,e!==null)){if(t=null,l.child!==null)switch(l.child.tag){case 27:case 5:t=l.child.stateNode;break;case 1:t=l.child.stateNode}try{Us(e,t)}catch(c){xe(l,l.return,c)}}break;case 27:t===null&&a&4&&Vd(l);case 26:case 5:ml(e,l),t===null&&a&4&&Qd(l),a&512&&eu(l,l.return);break;case 12:ml(e,l);break;case 31:ml(e,l),a&4&&Fd(e,l);break;case 13:ml(e,l),a&4&&Id(e,l),a&64&&(e=l.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(l=sv.bind(null,l),Ov(e,l))));break;case 22:if(a=l.memoizedState!==null||dl,!a){t=t!==null&&t.memoizedState!==null||Xe,n=dl;var u=Xe;dl=a,(Xe=t)&&!u?gl(e,l,(l.subtreeFlags&8772)!==0):ml(e,l),dl=n,Xe=u}break;case 30:break;default:ml(e,l)}}function $d(e){var t=e.alternate;t!==null&&(e.alternate=null,$d(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&gc(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Re=null,dt=!1;function hl(e,t,l){for(l=l.child;l!==null;)Wd(e,t,l),l=l.sibling}function Wd(e,t,l){if(it&&typeof it.onCommitFiberUnmount=="function")try{it.onCommitFiberUnmount(Pl,l)}catch(u){}switch(l.tag){case 26:Xe||Ft(l,t),hl(e,t,l),l.memoizedState?l.memoizedState.count--:l.stateNode&&(l=l.stateNode,l.parentNode.removeChild(l));break;case 27:Xe||Ft(l,t);var a=Re,n=dt;Gl(l.type)&&(Re=l.stateNode,dt=!1),hl(e,t,l),fu(l.stateNode),Re=a,dt=n;break;case 5:Xe||Ft(l,t);case 6:if(a=Re,n=dt,Re=null,hl(e,t,l),Re=a,dt=n,Re!==null)if(dt)try{(Re.nodeType===9?Re.body:Re.nodeName==="HTML"?Re.ownerDocument.body:Re).removeChild(l.stateNode)}catch(u){xe(l,t,u)}else try{Re.removeChild(l.stateNode)}catch(u){xe(l,t,u)}break;case 18:Re!==null&&(dt?(e=Re,Gh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,l.stateNode),hn(e)):Gh(Re,l.stateNode));break;case 4:a=Re,n=dt,Re=l.stateNode.containerInfo,dt=!0,hl(e,t,l),Re=a,dt=n;break;case 0:case 11:case 14:case 15:Hl(2,l,t),Xe||Hl(4,l,t),hl(e,t,l);break;case 1:Xe||(Ft(l,t),a=l.stateNode,typeof a.componentWillUnmount=="function"&&Xd(l,t,a)),hl(e,t,l);break;case 21:hl(e,t,l);break;case 22:Xe=(a=Xe)||l.memoizedState!==null,hl(e,t,l),Xe=a;break;default:hl(e,t,l)}}function Fd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{hn(e)}catch(l){xe(t,t.return,l)}}}function Id(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{hn(e)}catch(l){xe(t,t.return,l)}}function av(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Kd),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Kd),t;default:throw Error(o(435,e.tag))}}function yi(e,t){var l=av(e);t.forEach(function(a){if(!l.has(a)){l.add(a);var n=dv.bind(null,e,a);a.then(n,n)}})}function ht(e,t){var l=t.deletions;if(l!==null)for(var a=0;a<l.length;a++){var n=l[a],u=e,c=t,r=c;e:for(;r!==null;){switch(r.tag){case 27:if(Gl(r.type)){Re=r.stateNode,dt=!1;break e}break;case 5:Re=r.stateNode,dt=!1;break e;case 3:case 4:Re=r.stateNode.containerInfo,dt=!0;break e}r=r.return}if(Re===null)throw Error(o(160));Wd(u,c,n),Re=null,dt=!1,u=n.alternate,u!==null&&(u.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Pd(t,e),t=t.sibling}var Zt=null;function Pd(e,t){var l=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ht(t,e),mt(e),a&4&&(Hl(3,e,e.return),Pn(3,e),Hl(5,e,e.return));break;case 1:ht(t,e),mt(e),a&512&&(Xe||l===null||Ft(l,l.return)),a&64&&dl&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(l=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=l===null?a:l.concat(a))));break;case 26:var n=Zt;if(ht(t,e),mt(e),a&512&&(Xe||l===null||Ft(l,l.return)),a&4){var u=l!==null?l.memoizedState:null;if(a=e.memoizedState,l===null)if(a===null)if(e.stateNode===null){e:{a=e.type,l=e.memoizedProps,n=n.ownerDocument||n;t:switch(a){case"title":u=n.getElementsByTagName("title")[0],(!u||u[Mn]||u[Pe]||u.namespaceURI==="http://www.w3.org/2000/svg"||u.hasAttribute("itemprop"))&&(u=n.createElement(a),n.head.insertBefore(u,n.querySelector("head > title"))),at(u,a,l),u[Pe]=e,We(u),a=u;break e;case"link":var c=Ph("link","href",n).get(a+(l.href||""));if(c){for(var r=0;r<c.length;r++)if(u=c[r],u.getAttribute("href")===(l.href==null||l.href===""?null:l.href)&&u.getAttribute("rel")===(l.rel==null?null:l.rel)&&u.getAttribute("title")===(l.title==null?null:l.title)&&u.getAttribute("crossorigin")===(l.crossOrigin==null?null:l.crossOrigin)){c.splice(r,1);break t}}u=n.createElement(a),at(u,a,l),n.head.appendChild(u);break;case"meta":if(c=Ph("meta","content",n).get(a+(l.content||""))){for(r=0;r<c.length;r++)if(u=c[r],u.getAttribute("content")===(l.content==null?null:""+l.content)&&u.getAttribute("name")===(l.name==null?null:l.name)&&u.getAttribute("property")===(l.property==null?null:l.property)&&u.getAttribute("http-equiv")===(l.httpEquiv==null?null:l.httpEquiv)&&u.getAttribute("charset")===(l.charSet==null?null:l.charSet)){c.splice(r,1);break t}}u=n.createElement(a),at(u,a,l),n.head.appendChild(u);break;default:throw Error(o(468,a))}u[Pe]=e,We(u),a=u}e.stateNode=a}else e0(n,e.type,e.stateNode);else e.stateNode=Ih(n,a,e.memoizedProps);else u!==a?(u===null?l.stateNode!==null&&(l=l.stateNode,l.parentNode.removeChild(l)):u.count--,a===null?e0(n,e.type,e.stateNode):Ih(n,a,e.memoizedProps)):a===null&&e.stateNode!==null&&ko(e,e.memoizedProps,l.memoizedProps)}break;case 27:ht(t,e),mt(e),a&512&&(Xe||l===null||Ft(l,l.return)),l!==null&&a&4&&ko(e,e.memoizedProps,l.memoizedProps);break;case 5:if(ht(t,e),mt(e),a&512&&(Xe||l===null||Ft(l,l.return)),e.flags&32){n=e.stateNode;try{Ha(n,"")}catch(Q){xe(e,e.return,Q)}}a&4&&e.stateNode!=null&&(n=e.memoizedProps,ko(e,n,l!==null?l.memoizedProps:n)),a&1024&&(Yo=!0);break;case 6:if(ht(t,e),mt(e),a&4){if(e.stateNode===null)throw Error(o(162));a=e.memoizedProps,l=e.stateNode;try{l.nodeValue=a}catch(Q){xe(e,e.return,Q)}}break;case 3:if(Ui=null,n=Zt,Zt=Ci(t.containerInfo),ht(t,e),Zt=n,mt(e),a&4&&l!==null&&l.memoizedState.isDehydrated)try{hn(t.containerInfo)}catch(Q){xe(e,e.return,Q)}Yo&&(Yo=!1,eh(e));break;case 4:a=Zt,Zt=Ci(e.stateNode.containerInfo),ht(t,e),mt(e),Zt=a;break;case 12:ht(t,e),mt(e);break;case 31:ht(t,e),mt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,yi(e,a)));break;case 13:ht(t,e),mt(e),e.child.flags&8192&&e.memoizedState!==null!=(l!==null&&l.memoizedState!==null)&&(bi=ut()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,yi(e,a)));break;case 22:n=e.memoizedState!==null;var d=l!==null&&l.memoizedState!==null,z=dl,D=Xe;if(dl=z||n,Xe=D||d,ht(t,e),Xe=D,dl=z,mt(e),a&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(l===null||d||dl||Xe||ga(e)),l=null,t=e;;){if(t.tag===5||t.tag===26){if(l===null){d=l=t;try{if(u=d.stateNode,n)c=u.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none";else{r=d.stateNode;var O=d.memoizedProps.style,A=O!=null&&O.hasOwnProperty("display")?O.display:null;r.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(Q){xe(d,d.return,Q)}}}else if(t.tag===6){if(l===null){d=t;try{d.stateNode.nodeValue=n?"":d.memoizedProps}catch(Q){xe(d,d.return,Q)}}}else if(t.tag===18){if(l===null){d=t;try{var M=d.stateNode;n?Xh(M,!0):Xh(d.stateNode,!1)}catch(Q){xe(d,d.return,Q)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;l===t&&(l=null),t=t.return}l===t&&(l=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(l=a.retryQueue,l!==null&&(a.retryQueue=null,yi(e,l))));break;case 19:ht(t,e),mt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,yi(e,a)));break;case 30:break;case 21:break;default:ht(t,e),mt(e)}}function mt(e){var t=e.flags;if(t&2){try{for(var l,a=e.return;a!==null;){if(Zd(a)){l=a;break}a=a.return}if(l==null)throw Error(o(160));switch(l.tag){case 27:var n=l.stateNode,u=qo(e);gi(e,u,n);break;case 5:var c=l.stateNode;l.flags&32&&(Ha(c,""),l.flags&=-33);var r=qo(e);gi(e,r,c);break;case 3:case 4:var d=l.stateNode.containerInfo,z=qo(e);Lo(e,z,d);break;default:throw Error(o(161))}}catch(D){xe(e,e.return,D)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function eh(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;eh(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ml(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Jd(e,t.alternate,t),t=t.sibling}function ga(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Hl(4,t,t.return),ga(t);break;case 1:Ft(t,t.return);var l=t.stateNode;typeof l.componentWillUnmount=="function"&&Xd(t,t.return,l),ga(t);break;case 27:fu(t.stateNode);case 26:case 5:Ft(t,t.return),ga(t);break;case 22:t.memoizedState===null&&ga(t);break;case 30:ga(t);break;default:ga(t)}e=e.sibling}}function gl(e,t,l){for(l=l&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,n=e,u=t,c=u.flags;switch(u.tag){case 0:case 11:case 15:gl(n,u,l),Pn(4,u);break;case 1:if(gl(n,u,l),a=u,n=a.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(z){xe(a,a.return,z)}if(a=u,n=a.updateQueue,n!==null){var r=a.stateNode;try{var d=n.shared.hiddenCallbacks;if(d!==null)for(n.shared.hiddenCallbacks=null,n=0;n<d.length;n++)Os(d[n],r)}catch(z){xe(a,a.return,z)}}l&&c&64&&Gd(u),eu(u,u.return);break;case 27:Vd(u);case 26:case 5:gl(n,u,l),l&&a===null&&c&4&&Qd(u),eu(u,u.return);break;case 12:gl(n,u,l);break;case 31:gl(n,u,l),l&&c&4&&Fd(n,u);break;case 13:gl(n,u,l),l&&c&4&&Id(n,u);break;case 22:u.memoizedState===null&&gl(n,u,l),eu(u,u.return);break;case 30:break;default:gl(n,u,l)}t=t.sibling}}function jo(e,t){var l=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==l&&(e!=null&&e.refCount++,l!=null&&Yn(l))}function Go(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Yn(e))}function Vt(e,t,l,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)th(e,t,l,a),t=t.sibling}function th(e,t,l,a){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Vt(e,t,l,a),n&2048&&Pn(9,t);break;case 1:Vt(e,t,l,a);break;case 3:Vt(e,t,l,a),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Yn(e)));break;case 12:if(n&2048){Vt(e,t,l,a),e=t.stateNode;try{var u=t.memoizedProps,c=u.id,r=u.onPostCommit;typeof r=="function"&&r(c,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(d){xe(t,t.return,d)}}else Vt(e,t,l,a);break;case 31:Vt(e,t,l,a);break;case 13:Vt(e,t,l,a);break;case 23:break;case 22:u=t.stateNode,c=t.alternate,t.memoizedState!==null?u._visibility&2?Vt(e,t,l,a):tu(e,t):u._visibility&2?Vt(e,t,l,a):(u._visibility|=2,tn(e,t,l,a,(t.subtreeFlags&10256)!==0||!1)),n&2048&&jo(c,t);break;case 24:Vt(e,t,l,a),n&2048&&Go(t.alternate,t);break;default:Vt(e,t,l,a)}}function tn(e,t,l,a,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var u=e,c=t,r=l,d=a,z=c.flags;switch(c.tag){case 0:case 11:case 15:tn(u,c,r,d,n),Pn(8,c);break;case 23:break;case 22:var D=c.stateNode;c.memoizedState!==null?D._visibility&2?tn(u,c,r,d,n):tu(u,c):(D._visibility|=2,tn(u,c,r,d,n)),n&&z&2048&&jo(c.alternate,c);break;case 24:tn(u,c,r,d,n),n&&z&2048&&Go(c.alternate,c);break;default:tn(u,c,r,d,n)}t=t.sibling}}function tu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var l=e,a=t,n=a.flags;switch(a.tag){case 22:tu(l,a),n&2048&&jo(a.alternate,a);break;case 24:tu(l,a),n&2048&&Go(a.alternate,a);break;default:tu(l,a)}t=t.sibling}}var lu=8192;function ln(e,t,l){if(e.subtreeFlags&lu)for(e=e.child;e!==null;)lh(e,t,l),e=e.sibling}function lh(e,t,l){switch(e.tag){case 26:ln(e,t,l),e.flags&lu&&e.memoizedState!==null&&Xv(l,Zt,e.memoizedState,e.memoizedProps);break;case 5:ln(e,t,l);break;case 3:case 4:var a=Zt;Zt=Ci(e.stateNode.containerInfo),ln(e,t,l),Zt=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=lu,lu=16777216,ln(e,t,l),lu=a):ln(e,t,l));break;default:ln(e,t,l)}}function ah(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function au(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var a=t[l];Fe=a,uh(a,e)}ah(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)nh(e),e=e.sibling}function nh(e){switch(e.tag){case 0:case 11:case 15:au(e),e.flags&2048&&Hl(9,e,e.return);break;case 3:au(e);break;case 12:au(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,vi(e)):au(e);break;default:au(e)}}function vi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var a=t[l];Fe=a,uh(a,e)}ah(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Hl(8,t,t.return),vi(t);break;case 22:l=t.stateNode,l._visibility&2&&(l._visibility&=-3,vi(t));break;default:vi(t)}e=e.sibling}}function uh(e,t){for(;Fe!==null;){var l=Fe;switch(l.tag){case 0:case 11:case 15:Hl(8,l,t);break;case 23:case 22:if(l.memoizedState!==null&&l.memoizedState.cachePool!==null){var a=l.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Yn(l.memoizedState.cache)}if(a=l.child,a!==null)a.return=l,Fe=a;else e:for(l=e;Fe!==null;){a=Fe;var n=a.sibling,u=a.return;if($d(a),a===l){Fe=null;break e}if(n!==null){n.return=u,Fe=n;break e}Fe=u}}}var nv={getCacheForType:function(e){var t=tt(Ye),l=t.data.get(e);return l===void 0&&(l=e(),t.data.set(e,l)),l},cacheSignal:function(){return tt(Ye).controller.signal}},uv=typeof WeakMap=="function"?WeakMap:Map,pe=0,Me=null,fe=null,se=0,Ee=0,zt=null,Bl=!1,an=!1,Xo=!1,yl=0,He=0,kl=0,ya=0,Qo=0,wt=0,nn=0,nu=null,gt=null,Zo=!1,bi=0,ih=0,pi=1/0,Si=null,ql=null,Ve=0,Ll=null,un=null,vl=0,Vo=0,Ko=null,ch=null,uu=0,Jo=null;function At(){return(pe&2)!==0&&se!==0?se&-se:w.T!==null?ef():Tr()}function oh(){if(wt===0)if((se&536870912)===0||he){var e=Je;Je<<=1,(Je&3932160)===0&&(Je=262144),wt=e}else wt=536870912;return e=xt.current,e!==null&&(e.flags|=32),wt}function yt(e,t,l){(e===Me&&(Ee===2||Ee===9)||e.cancelPendingCommit!==null)&&(cn(e,0),Yl(e,se,wt,!1)),Tl(e,l),((pe&2)===0||e!==Me)&&(e===Me&&((pe&2)===0&&(ya|=l),He===4&&Yl(e,se,wt,!1)),It(e))}function fh(e,t,l){if((pe&6)!==0)throw Error(o(327));var a=!l&&(t&127)===0&&(t&e.expiredLanes)===0||xl(e,t),n=a?ov(e,t):Wo(e,t,!0),u=a;do{if(n===0){an&&!a&&Yl(e,t,0,!1);break}else{if(l=e.current.alternate,u&&!iv(l)){n=Wo(e,t,!1),u=!1;continue}if(n===2){if(u=t,e.errorRecoveryDisabledLanes&u)var c=0;else c=e.pendingLanes&-536870913,c=c!==0?c:c&536870912?536870912:0;if(c!==0){t=c;e:{var r=e;n=nu;var d=r.current.memoizedState.isDehydrated;if(d&&(cn(r,c).flags|=256),c=Wo(r,c,!1),c!==2){if(Xo&&!d){r.errorRecoveryDisabledLanes|=u,ya|=u,n=4;break e}u=gt,gt=n,u!==null&&(gt===null?gt=u:gt.push.apply(gt,u))}n=c}if(u=!1,n!==2)continue}}if(n===1){cn(e,0),Yl(e,t,0,!0);break}e:{switch(a=e,u=n,u){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:Yl(a,t,wt,!Bl);break e;case 2:gt=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(n=bi+300-ut(),10<n)){if(Yl(a,t,wt,!Bl),Ma(a,0,!0)!==0)break e;vl=t,a.timeoutHandle=Yh(rh.bind(null,a,l,gt,Si,Zo,t,wt,ya,nn,Bl,u,"Throttled",-0,0),n);break e}rh(a,l,gt,Si,Zo,t,wt,ya,nn,Bl,u,null,-0,0)}}break}while(!0);It(e)}function rh(e,t,l,a,n,u,c,r,d,z,D,O,A,M){if(e.timeoutHandle=-1,O=t.subtreeFlags,O&8192||(O&16785408)===16785408){O={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ll},lh(t,u,O);var Q=(u&62914560)===u?bi-ut():(u&4194048)===u?ih-ut():0;if(Q=Qv(O,Q),Q!==null){vl=u,e.cancelPendingCommit=Q(bh.bind(null,e,t,u,l,a,n,c,r,d,D,O,null,A,M)),Yl(e,u,c,!z);return}}bh(e,t,u,l,a,n,c,r,d)}function iv(e){for(var t=e;;){var l=t.tag;if((l===0||l===11||l===15)&&t.flags&16384&&(l=t.updateQueue,l!==null&&(l=l.stores,l!==null)))for(var a=0;a<l.length;a++){var n=l[a],u=n.getSnapshot;n=n.value;try{if(!St(u(),n))return!1}catch(c){return!1}}if(l=t.child,t.subtreeFlags&16384&&l!==null)l.return=t,t=l;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Yl(e,t,l,a){t&=~Qo,t&=~ya,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var n=t;0<n;){var u=31-Ue(n),c=1<<u;a[u]=-1,n&=~c}l!==0&&Sr(e,l,t)}function Ei(){return(pe&6)===0?(iu(0),!1):!0}function $o(){if(fe!==null){if(Ee===0)var e=fe.return;else e=fe,il=ca=null,ro(e),Wa=null,Gn=0,e=fe;for(;e!==null;)jd(e.alternate,e),e=e.return;fe=null}}function cn(e,t){var l=e.timeoutHandle;l!==-1&&(e.timeoutHandle=-1,Av(l)),l=e.cancelPendingCommit,l!==null&&(e.cancelPendingCommit=null,l()),vl=0,$o(),Me=e,fe=l=nl(e.current,null),se=t,Ee=0,zt=null,Bl=!1,an=xl(e,t),Xo=!1,nn=wt=Qo=ya=kl=He=0,gt=nu=null,Zo=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var n=31-Ue(a),u=1<<n;t|=e[n],a&=~u}return yl=t,Gu(),l}function sh(e,t){ue=null,w.H=Wn,t===$a||t===Wu?(t=Ms(),Ee=3):t===Ic?(t=Ms(),Ee=4):Ee=t===Mo?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,zt=t,fe===null&&(He=1,ri(e,Nt(t,e.current)))}function dh(){var e=xt.current;return e===null?!0:(se&4194048)===se?qt===null:(se&62914560)===se||(se&536870912)!==0?e===qt:!1}function hh(){var e=w.H;return w.H=Wn,e===null?Wn:e}function mh(){var e=w.A;return w.A=nv,e}function xi(){He=4,Bl||(se&4194048)!==se&&xt.current!==null||(an=!0),(kl&134217727)===0&&(ya&134217727)===0||Me===null||Yl(Me,se,wt,!1)}function Wo(e,t,l){var a=pe;pe|=2;var n=hh(),u=mh();(Me!==e||se!==t)&&(Si=null,cn(e,t)),t=!1;var c=He;e:do try{if(Ee!==0&&fe!==null){var r=fe,d=zt;switch(Ee){case 8:$o(),c=6;break e;case 3:case 2:case 9:case 6:xt.current===null&&(t=!0);var z=Ee;if(Ee=0,zt=null,on(e,r,d,z),l&&an){c=0;break e}break;default:z=Ee,Ee=0,zt=null,on(e,r,d,z)}}cv(),c=He;break}catch(D){sh(e,D)}while(!0);return t&&e.shellSuspendCounter++,il=ca=null,pe=a,w.H=n,w.A=u,fe===null&&(Me=null,se=0,Gu()),c}function cv(){for(;fe!==null;)gh(fe)}function ov(e,t){var l=pe;pe|=2;var a=hh(),n=mh();Me!==e||se!==t?(Si=null,pi=ut()+500,cn(e,t)):an=xl(e,t);e:do try{if(Ee!==0&&fe!==null){t=fe;var u=zt;t:switch(Ee){case 1:Ee=0,zt=null,on(e,t,u,1);break;case 2:case 9:if(ws(u)){Ee=0,zt=null,yh(t);break}t=function(){Ee!==2&&Ee!==9||Me!==e||(Ee=7),It(e)},u.then(t,t);break e;case 3:Ee=7;break e;case 4:Ee=5;break e;case 7:ws(u)?(Ee=0,zt=null,yh(t)):(Ee=0,zt=null,on(e,t,u,7));break;case 5:var c=null;switch(fe.tag){case 26:c=fe.memoizedState;case 5:case 27:var r=fe;if(c?t0(c):r.stateNode.complete){Ee=0,zt=null;var d=r.sibling;if(d!==null)fe=d;else{var z=r.return;z!==null?(fe=z,Ti(z)):fe=null}break t}}Ee=0,zt=null,on(e,t,u,5);break;case 6:Ee=0,zt=null,on(e,t,u,6);break;case 8:$o(),He=6;break e;default:throw Error(o(462))}}fv();break}catch(D){sh(e,D)}while(!0);return il=ca=null,w.H=a,w.A=n,pe=l,fe!==null?0:(Me=null,se=0,Gu(),He)}function fv(){for(;fe!==null&&!Au();)gh(fe)}function gh(e){var t=Ld(e.alternate,e,yl);e.memoizedProps=e.pendingProps,t===null?Ti(e):fe=t}function yh(e){var t=e,l=t.alternate;switch(t.tag){case 15:case 0:t=Rd(l,t,t.pendingProps,t.type,void 0,se);break;case 11:t=Rd(l,t,t.pendingProps,t.type.render,t.ref,se);break;case 5:ro(t);default:jd(l,t),t=fe=ms(t,yl),t=Ld(l,t,yl)}e.memoizedProps=e.pendingProps,t===null?Ti(e):fe=t}function on(e,t,l,a){il=ca=null,ro(t),Wa=null,Gn=0;var n=t.return;try{if(Fy(e,n,t,l,se)){He=1,ri(e,Nt(l,e.current)),fe=null;return}}catch(u){if(n!==null)throw fe=n,u;He=1,ri(e,Nt(l,e.current)),fe=null;return}t.flags&32768?(he||a===1?e=!0:an||(se&536870912)!==0?e=!1:(Bl=e=!0,(a===2||a===9||a===3||a===6)&&(a=xt.current,a!==null&&a.tag===13&&(a.flags|=16384))),vh(t,e)):Ti(t)}function Ti(e){var t=e;do{if((t.flags&32768)!==0){vh(t,Bl);return}e=t.return;var l=ev(t.alternate,t,yl);if(l!==null){fe=l;return}if(t=t.sibling,t!==null){fe=t;return}fe=t=e}while(t!==null);He===0&&(He=5)}function vh(e,t){do{var l=tv(e.alternate,e);if(l!==null){l.flags&=32767,fe=l;return}if(l=e.return,l!==null&&(l.flags|=32768,l.subtreeFlags=0,l.deletions=null),!t&&(e=e.sibling,e!==null)){fe=e;return}fe=e=l}while(e!==null);He=6,fe=null}function bh(e,t,l,a,n,u,c,r,d){e.cancelPendingCommit=null;do zi();while(Ve!==0);if((pe&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(u=t.lanes|t.childLanes,u|=kc,pt(e,l,u,c,r,d),e===Me&&(fe=Me=null,se=0),un=t,Ll=e,vl=l,Vo=u,Ko=n,ch=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,hv(Il,function(){return Th(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=w.T,w.T=null,n=N.p,N.p=2,c=pe,pe|=4;try{lv(e,t,l)}finally{pe=c,N.p=n,w.T=a}}Ve=1,ph(),Sh(),Eh()}}function ph(){if(Ve===1){Ve=0;var e=Ll,t=un,l=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||l){l=w.T,w.T=null;var a=N.p;N.p=2;var n=pe;pe|=4;try{Pd(t,e);var u=ff,c=us(e.containerInfo),r=u.focusedElem,d=u.selectionRange;if(c!==r&&r&&r.ownerDocument&&ns(r.ownerDocument.documentElement,r)){if(d!==null&&Uc(r)){var z=d.start,D=d.end;if(D===void 0&&(D=z),"selectionStart"in r)r.selectionStart=z,r.selectionEnd=Math.min(D,r.value.length);else{var O=r.ownerDocument||document,A=O&&O.defaultView||window;if(A.getSelection){var M=A.getSelection(),Q=r.textContent.length,ee=Math.min(d.start,Q),we=d.end===void 0?ee:Math.min(d.end,Q);!M.extend&&ee>we&&(c=we,we=ee,ee=c);var E=as(r,ee),g=as(r,we);if(E&&g&&(M.rangeCount!==1||M.anchorNode!==E.node||M.anchorOffset!==E.offset||M.focusNode!==g.node||M.focusOffset!==g.offset)){var T=O.createRange();T.setStart(E.node,E.offset),M.removeAllRanges(),ee>we?(M.addRange(T),M.extend(g.node,g.offset)):(T.setEnd(g.node,g.offset),M.addRange(T))}}}}for(O=[],M=r;M=M.parentNode;)M.nodeType===1&&O.push({element:M,left:M.scrollLeft,top:M.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<O.length;r++){var C=O[r];C.element.scrollLeft=C.left,C.element.scrollTop=C.top}}Bi=!!of,ff=of=null}finally{pe=n,N.p=a,w.T=l}}e.current=t,Ve=2}}function Sh(){if(Ve===2){Ve=0;var e=Ll,t=un,l=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||l){l=w.T,w.T=null;var a=N.p;N.p=2;var n=pe;pe|=4;try{Jd(e,t.alternate,t)}finally{pe=n,N.p=a,w.T=l}}Ve=3}}function Eh(){if(Ve===4||Ve===3){Ve=0,Mu();var e=Ll,t=un,l=vl,a=ch;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ve=5:(Ve=0,un=Ll=null,xh(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(ql=null),hc(l),t=t.stateNode,it&&typeof it.onCommitFiberRoot=="function")try{it.onCommitFiberRoot(Pl,t,void 0,(t.current.flags&128)===128)}catch(d){}if(a!==null){t=w.T,n=N.p,N.p=2,w.T=null;try{for(var u=e.onRecoverableError,c=0;c<a.length;c++){var r=a[c];u(r.value,{componentStack:r.stack})}}finally{w.T=t,N.p=n}}(vl&3)!==0&&zi(),It(e),n=e.pendingLanes,(l&261930)!==0&&(n&42)!==0?e===Jo?uu++:(uu=0,Jo=e):uu=0,iu(0)}}function xh(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Yn(t)))}function zi(){return ph(),Sh(),Eh(),Th()}function Th(){if(Ve!==5)return!1;var e=Ll,t=Vo;Vo=0;var l=hc(vl),a=w.T,n=N.p;try{N.p=32>l?32:l,w.T=null,l=Ko,Ko=null;var u=Ll,c=vl;if(Ve=0,un=Ll=null,vl=0,(pe&6)!==0)throw Error(o(331));var r=pe;if(pe|=4,nh(u.current),th(u,u.current,c,l),pe=r,iu(0,!1),it&&typeof it.onPostCommitFiberRoot=="function")try{it.onPostCommitFiberRoot(Pl,u)}catch(d){}return!0}finally{N.p=n,w.T=a,xh(e,t)}}function zh(e,t,l){t=Nt(l,t),t=Ao(e.stateNode,t,2),e=Ul(e,t,2),e!==null&&(Tl(e,2),It(e))}function xe(e,t,l){if(e.tag===3)zh(e,e,l);else for(;t!==null;){if(t.tag===3){zh(t,e,l);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(ql===null||!ql.has(a))){e=Nt(l,e),l=wd(2),a=Ul(t,l,2),a!==null&&(Ad(l,a,t,e),Tl(a,2),It(a));break}}t=t.return}}function Fo(e,t,l){var a=e.pingCache;if(a===null){a=e.pingCache=new uv;var n=new Set;a.set(t,n)}else n=a.get(t),n===void 0&&(n=new Set,a.set(t,n));n.has(l)||(Xo=!0,n.add(l),e=rv.bind(null,e,t,l),t.then(e,e))}function rv(e,t,l){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&l,e.warmLanes&=~l,Me===e&&(se&l)===l&&(He===4||He===3&&(se&62914560)===se&&300>ut()-bi?(pe&2)===0&&cn(e,0):Qo|=l,nn===se&&(nn=0)),It(e)}function wh(e,t){t===0&&(t=An()),e=na(e,t),e!==null&&(Tl(e,t),It(e))}function sv(e){var t=e.memoizedState,l=0;t!==null&&(l=t.retryLane),wh(e,l)}function dv(e,t){var l=0;switch(e.tag){case 31:case 13:var a=e.stateNode,n=e.memoizedState;n!==null&&(l=n.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(o(314))}a!==null&&a.delete(t),wh(e,l)}function hv(e,t){return Fl(e,t)}var wi=null,fn=null,Io=!1,Ai=!1,Po=!1,jl=0;function It(e){e!==fn&&e.next===null&&(fn===null?wi=fn=e:fn=fn.next=e),Ai=!0,Io||(Io=!0,gv())}function iu(e,t){if(!Po&&Ai){Po=!0;do for(var l=!1,a=wi;a!==null;){if(e!==0){var n=a.pendingLanes;if(n===0)var u=0;else{var c=a.suspendedLanes,r=a.pingedLanes;u=(1<<31-Ue(42|e)+1)-1,u&=n&~(c&~r),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(l=!0,Dh(a,u))}else u=se,u=Ma(a,a===Me?u:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(u&3)===0||xl(a,u)||(l=!0,Dh(a,u));a=a.next}while(l);Po=!1}}function mv(){Ah()}function Ah(){Ai=Io=!1;var e=0;jl!==0&&wv()&&(e=jl);for(var t=ut(),l=null,a=wi;a!==null;){var n=a.next,u=Mh(a,t);u===0?(a.next=null,l===null?wi=n:l.next=n,n===null&&(fn=l)):(l=a,(e!==0||(u&3)!==0)&&(Ai=!0)),a=n}Ve!==0&&Ve!==5||iu(e),jl!==0&&(jl=0)}function Mh(e,t){for(var l=e.suspendedLanes,a=e.pingedLanes,n=e.expirationTimes,u=e.pendingLanes&-62914561;0<u;){var c=31-Ue(u),r=1<<c,d=n[c];d===-1?((r&l)===0||(r&a)!==0)&&(n[c]=Cu(r,t)):d<=t&&(e.expiredLanes|=r),u&=~r}if(t=Me,l=se,l=Ma(e,e===t?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,l===0||e===t&&(Ee===2||Ee===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Aa(a),e.callbackNode=null,e.callbackPriority=0;if((l&3)===0||xl(e,l)){if(t=l&-l,t===e.callbackPriority)return t;switch(a!==null&&Aa(a),hc(l)){case 2:case 8:l=zn;break;case 32:l=Il;break;case 268435456:l=wn;break;default:l=Il}return a=_h.bind(null,e),l=Fl(l,a),e.callbackPriority=t,e.callbackNode=l,t}return a!==null&&a!==null&&Aa(a),e.callbackPriority=2,e.callbackNode=null,2}function _h(e,t){if(Ve!==0&&Ve!==5)return e.callbackNode=null,e.callbackPriority=0,null;var l=e.callbackNode;if(zi()&&e.callbackNode!==l)return null;var a=se;return a=Ma(e,e===Me?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(fh(e,a,t),Mh(e,ut()),e.callbackNode!=null&&e.callbackNode===l?_h.bind(null,e):null)}function Dh(e,t){if(zi())return null;fh(e,t,!0)}function gv(){Mv(function(){(pe&6)!==0?Fl(ct,mv):Ah()})}function ef(){if(jl===0){var e=Ka;e===0&&(e=El,El<<=1,(El&261888)===0&&(El=256)),jl=e}return jl}function Ch(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Nu(""+e)}function Oh(e,t){var l=t.ownerDocument.createElement("input");return l.name=t.name,l.value=t.value,e.id&&l.setAttribute("form",e.id),t.parentNode.insertBefore(l,t),e=new FormData(e),l.parentNode.removeChild(l),e}function yv(e,t,l,a,n){if(t==="submit"&&l&&l.stateNode===n){var u=Ch((n[rt]||null).action),c=a.submitter;c&&(t=(t=c[rt]||null)?Ch(t.formAction):c.getAttribute("formAction"),t!==null&&(u=t,c=null));var r=new qu("action","action",null,a,n);e.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(jl!==0){var d=c?Oh(n,c):new FormData(n);So(l,{pending:!0,data:d,method:n.method,action:u},null,d)}}else typeof u=="function"&&(r.preventDefault(),d=c?Oh(n,c):new FormData(n),So(l,{pending:!0,data:d,method:n.method,action:u},u,d))},currentTarget:n}]})}}for(var tf=0;tf<Bc.length;tf++){var lf=Bc[tf],vv=lf.toLowerCase(),bv=lf[0].toUpperCase()+lf.slice(1);Qt(vv,"on"+bv)}Qt(os,"onAnimationEnd"),Qt(fs,"onAnimationIteration"),Qt(rs,"onAnimationStart"),Qt("dblclick","onDoubleClick"),Qt("focusin","onFocus"),Qt("focusout","onBlur"),Qt(Ny,"onTransitionRun"),Qt(Hy,"onTransitionStart"),Qt(By,"onTransitionCancel"),Qt(ss,"onTransitionEnd"),Ra("onMouseEnter",["mouseout","mouseover"]),Ra("onMouseLeave",["mouseout","mouseover"]),Ra("onPointerEnter",["pointerout","pointerover"]),Ra("onPointerLeave",["pointerout","pointerover"]),ea("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ea("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ea("onBeforeInput",["compositionend","keypress","textInput","paste"]),ea("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ea("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ea("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cu="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cu));function Uh(e,t){t=(t&4)!==0;for(var l=0;l<e.length;l++){var a=e[l],n=a.event;a=a.listeners;e:{var u=void 0;if(t)for(var c=a.length-1;0<=c;c--){var r=a[c],d=r.instance,z=r.currentTarget;if(r=r.listener,d!==u&&n.isPropagationStopped())break e;u=r,n.currentTarget=z;try{u(n)}catch(D){ju(D)}n.currentTarget=null,u=d}else for(c=0;c<a.length;c++){if(r=a[c],d=r.instance,z=r.currentTarget,r=r.listener,d!==u&&n.isPropagationStopped())break e;u=r,n.currentTarget=z;try{u(n)}catch(D){ju(D)}n.currentTarget=null,u=d}}}}function re(e,t){var l=t[mc];l===void 0&&(l=t[mc]=new Set);var a=e+"__bubble";l.has(a)||(Rh(t,e,2,!1),l.add(a))}function af(e,t,l){var a=0;t&&(a|=4),Rh(l,e,a,t)}var Mi="_reactListening"+Math.random().toString(36).slice(2);function nf(e){if(!e[Mi]){e[Mi]=!0,Ar.forEach(function(l){l!=="selectionchange"&&(pv.has(l)||af(l,!1,e),af(l,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Mi]||(t[Mi]=!0,af("selectionchange",!1,t))}}function Rh(e,t,l,a){switch(o0(t)){case 2:var n=Kv;break;case 8:n=Jv;break;default:n=Sf}l=n.bind(null,t,l,e),n=void 0,!Tc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),a?n!==void 0?e.addEventListener(t,l,{capture:!0,passive:n}):e.addEventListener(t,l,!0):n!==void 0?e.addEventListener(t,l,{passive:n}):e.addEventListener(t,l,!1)}function uf(e,t,l,a,n){var u=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var c=a.tag;if(c===3||c===4){var r=a.stateNode.containerInfo;if(r===n)break;if(c===4)for(c=a.return;c!==null;){var d=c.tag;if((d===3||d===4)&&c.stateNode.containerInfo===n)return;c=c.return}for(;r!==null;){if(c=Ca(r),c===null)return;if(d=c.tag,d===5||d===6||d===26||d===27){a=u=c;continue e}r=r.parentNode}}a=a.return}qr(function(){var z=u,D=Ec(l),O=[];e:{var A=ds.get(e);if(A!==void 0){var M=qu,Q=e;switch(e){case"keypress":if(Bu(l)===0)break e;case"keydown":case"keyup":M=dy;break;case"focusin":Q="focus",M=Mc;break;case"focusout":Q="blur",M=Mc;break;case"beforeblur":case"afterblur":M=Mc;break;case"click":if(l.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":M=jr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":M=ey;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":M=gy;break;case os:case fs:case rs:M=ay;break;case ss:M=vy;break;case"scroll":case"scrollend":M=Ig;break;case"wheel":M=py;break;case"copy":case"cut":case"paste":M=uy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":M=Xr;break;case"toggle":case"beforetoggle":M=Ey}var ee=(t&4)!==0,we=!ee&&(e==="scroll"||e==="scrollend"),E=ee?A!==null?A+"Capture":null:A;ee=[];for(var g=z,T;g!==null;){var C=g;if(T=C.stateNode,C=C.tag,C!==5&&C!==26&&C!==27||T===null||E===null||(C=Dn(g,E),C!=null&&ee.push(ou(g,C,T))),we)break;g=g.return}0<ee.length&&(A=new M(A,Q,null,l,D),O.push({event:A,listeners:ee}))}}if((t&7)===0){e:{if(A=e==="mouseover"||e==="pointerover",M=e==="mouseout"||e==="pointerout",A&&l!==Sc&&(Q=l.relatedTarget||l.fromElement)&&(Ca(Q)||Q[Da]))break e;if((M||A)&&(A=D.window===D?D:(A=D.ownerDocument)?A.defaultView||A.parentWindow:window,M?(Q=l.relatedTarget||l.toElement,M=z,Q=Q?Ca(Q):null,Q!==null&&(we=m(Q),ee=Q.tag,Q!==we||ee!==5&&ee!==27&&ee!==6)&&(Q=null)):(M=null,Q=z),M!==Q)){if(ee=jr,C="onMouseLeave",E="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(ee=Xr,C="onPointerLeave",E="onPointerEnter",g="pointer"),we=M==null?A:_n(M),T=Q==null?A:_n(Q),A=new ee(C,g+"leave",M,l,D),A.target=we,A.relatedTarget=T,C=null,Ca(D)===z&&(ee=new ee(E,g+"enter",Q,l,D),ee.target=T,ee.relatedTarget=we,C=ee),we=C,M&&Q)t:{for(ee=Sv,E=M,g=Q,T=0,C=E;C;C=ee(C))T++;C=0;for(var I=g;I;I=ee(I))C++;for(;0<T-C;)E=ee(E),T--;for(;0<C-T;)g=ee(g),C--;for(;T--;){if(E===g||g!==null&&E===g.alternate){ee=E;break t}E=ee(E),g=ee(g)}ee=null}else ee=null;M!==null&&Nh(O,A,M,ee,!1),Q!==null&&we!==null&&Nh(O,we,Q,ee,!0)}}e:{if(A=z?_n(z):window,M=A.nodeName&&A.nodeName.toLowerCase(),M==="select"||M==="input"&&A.type==="file")var ge=Fr;else if($r(A))if(Ir)ge=Oy;else{ge=Dy;var W=_y}else M=A.nodeName,!M||M.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?z&&pc(z.elementType)&&(ge=Fr):ge=Cy;if(ge&&(ge=ge(e,z))){Wr(O,ge,l,D);break e}W&&W(e,A,z),e==="focusout"&&z&&A.type==="number"&&z.memoizedProps.value!=null&&bc(A,"number",A.value)}switch(W=z?_n(z):window,e){case"focusin":($r(W)||W.contentEditable==="true")&&(La=W,Rc=z,kn=null);break;case"focusout":kn=Rc=La=null;break;case"mousedown":Nc=!0;break;case"contextmenu":case"mouseup":case"dragend":Nc=!1,is(O,l,D);break;case"selectionchange":if(Ry)break;case"keydown":case"keyup":is(O,l,D)}var ie;if(Dc)e:{switch(e){case"compositionstart":var de="onCompositionStart";break e;case"compositionend":de="onCompositionEnd";break e;case"compositionupdate":de="onCompositionUpdate";break e}de=void 0}else qa?Kr(e,l)&&(de="onCompositionEnd"):e==="keydown"&&l.keyCode===229&&(de="onCompositionStart");de&&(Qr&&l.locale!=="ko"&&(qa||de!=="onCompositionStart"?de==="onCompositionEnd"&&qa&&(ie=Lr()):(wl=D,zc="value"in wl?wl.value:wl.textContent,qa=!0)),W=_i(z,de),0<W.length&&(de=new Gr(de,e,null,l,D),O.push({event:de,listeners:W}),ie?de.data=ie:(ie=Jr(l),ie!==null&&(de.data=ie)))),(ie=Ty?zy(e,l):wy(e,l))&&(de=_i(z,"onBeforeInput"),0<de.length&&(W=new Gr("onBeforeInput","beforeinput",null,l,D),O.push({event:W,listeners:de}),W.data=ie)),yv(O,e,z,l,D)}Uh(O,t)})}function ou(e,t,l){return{instance:e,listener:t,currentTarget:l}}function _i(e,t){for(var l=t+"Capture",a=[];e!==null;){var n=e,u=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||u===null||(n=Dn(e,l),n!=null&&a.unshift(ou(e,n,u)),n=Dn(e,t),n!=null&&a.push(ou(e,n,u))),e.tag===3)return a;e=e.return}return[]}function Sv(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Nh(e,t,l,a,n){for(var u=t._reactName,c=[];l!==null&&l!==a;){var r=l,d=r.alternate,z=r.stateNode;if(r=r.tag,d!==null&&d===a)break;r!==5&&r!==26&&r!==27||z===null||(d=z,n?(z=Dn(l,u),z!=null&&c.unshift(ou(l,z,d))):n||(z=Dn(l,u),z!=null&&c.push(ou(l,z,d)))),l=l.return}c.length!==0&&e.push({event:t,listeners:c})}var Ev=/\r\n?/g,xv=/\u0000|\uFFFD/g;function Hh(e){return(typeof e=="string"?e:""+e).replace(Ev,`
`).replace(xv,"")}function Bh(e,t){return t=Hh(t),Hh(e)===t}function ze(e,t,l,a,n,u){switch(l){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Ha(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Ha(e,""+a);break;case"className":Uu(e,"class",a);break;case"tabIndex":Uu(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Uu(e,l,a);break;case"style":Br(e,a,u);break;case"data":if(t!=="object"){Uu(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||l!=="href")){e.removeAttribute(l);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(l);break}a=Nu(""+a),e.setAttribute(l,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(l,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(l==="formAction"?(t!=="input"&&ze(e,t,"name",n.name,n,null),ze(e,t,"formEncType",n.formEncType,n,null),ze(e,t,"formMethod",n.formMethod,n,null),ze(e,t,"formTarget",n.formTarget,n,null)):(ze(e,t,"encType",n.encType,n,null),ze(e,t,"method",n.method,n,null),ze(e,t,"target",n.target,n,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(l);break}a=Nu(""+a),e.setAttribute(l,a);break;case"onClick":a!=null&&(e.onclick=ll);break;case"onScroll":a!=null&&re("scroll",e);break;case"onScrollEnd":a!=null&&re("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(l=a.__html,l!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=l}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}l=Nu(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",l);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(l,""+a):e.removeAttribute(l);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(l,""):e.removeAttribute(l);break;case"capture":case"download":a===!0?e.setAttribute(l,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(l,a):e.removeAttribute(l);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(l,a):e.removeAttribute(l);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(l):e.setAttribute(l,a);break;case"popover":re("beforetoggle",e),re("toggle",e),Ou(e,"popover",a);break;case"xlinkActuate":tl(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":tl(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":tl(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":tl(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":tl(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":tl(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":tl(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":tl(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":tl(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ou(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<l.length)||l[0]!=="o"&&l[0]!=="O"||l[1]!=="n"&&l[1]!=="N")&&(l=Wg.get(l)||l,Ou(e,l,a))}}function cf(e,t,l,a,n,u){switch(l){case"style":Br(e,a,u);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(l=a.__html,l!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=l}}break;case"children":typeof a=="string"?Ha(e,a):(typeof a=="number"||typeof a=="bigint")&&Ha(e,""+a);break;case"onScroll":a!=null&&re("scroll",e);break;case"onScrollEnd":a!=null&&re("scrollend",e);break;case"onClick":a!=null&&(e.onclick=ll);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Mr.hasOwnProperty(l))e:{if(l[0]==="o"&&l[1]==="n"&&(n=l.endsWith("Capture"),t=l.slice(2,n?l.length-7:void 0),u=e[rt]||null,u=u!=null?u[l]:null,typeof u=="function"&&e.removeEventListener(t,u,n),typeof a=="function")){typeof u!="function"&&u!==null&&(l in e?e[l]=null:e.hasAttribute(l)&&e.removeAttribute(l)),e.addEventListener(t,a,n);break e}l in e?e[l]=a:a===!0?e.setAttribute(l,""):Ou(e,l,a)}}}function at(e,t,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":re("error",e),re("load",e);var a=!1,n=!1,u;for(u in l)if(l.hasOwnProperty(u)){var c=l[u];if(c!=null)switch(u){case"src":a=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:ze(e,t,u,c,l,null)}}n&&ze(e,t,"srcSet",l.srcSet,l,null),a&&ze(e,t,"src",l.src,l,null);return;case"input":re("invalid",e);var r=u=c=n=null,d=null,z=null;for(a in l)if(l.hasOwnProperty(a)){var D=l[a];if(D!=null)switch(a){case"name":n=D;break;case"type":c=D;break;case"checked":d=D;break;case"defaultChecked":z=D;break;case"value":u=D;break;case"defaultValue":r=D;break;case"children":case"dangerouslySetInnerHTML":if(D!=null)throw Error(o(137,t));break;default:ze(e,t,a,D,l,null)}}Ur(e,u,r,d,z,c,n,!1);return;case"select":re("invalid",e),a=c=u=null;for(n in l)if(l.hasOwnProperty(n)&&(r=l[n],r!=null))switch(n){case"value":u=r;break;case"defaultValue":c=r;break;case"multiple":a=r;default:ze(e,t,n,r,l,null)}t=u,l=c,e.multiple=!!a,t!=null?Na(e,!!a,t,!1):l!=null&&Na(e,!!a,l,!0);return;case"textarea":re("invalid",e),u=n=a=null;for(c in l)if(l.hasOwnProperty(c)&&(r=l[c],r!=null))switch(c){case"value":a=r;break;case"defaultValue":n=r;break;case"children":u=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(o(91));break;default:ze(e,t,c,r,l,null)}Nr(e,a,n,u);return;case"option":for(d in l)l.hasOwnProperty(d)&&(a=l[d],a!=null)&&(d==="selected"?e.selected=a&&typeof a!="function"&&typeof a!="symbol":ze(e,t,d,a,l,null));return;case"dialog":re("beforetoggle",e),re("toggle",e),re("cancel",e),re("close",e);break;case"iframe":case"object":re("load",e);break;case"video":case"audio":for(a=0;a<cu.length;a++)re(cu[a],e);break;case"image":re("error",e),re("load",e);break;case"details":re("toggle",e);break;case"embed":case"source":case"link":re("error",e),re("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(z in l)if(l.hasOwnProperty(z)&&(a=l[z],a!=null))switch(z){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:ze(e,t,z,a,l,null)}return;default:if(pc(t)){for(D in l)l.hasOwnProperty(D)&&(a=l[D],a!==void 0&&cf(e,t,D,a,l,void 0));return}}for(r in l)l.hasOwnProperty(r)&&(a=l[r],a!=null&&ze(e,t,r,a,l,null))}function Tv(e,t,l,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,u=null,c=null,r=null,d=null,z=null,D=null;for(M in l){var O=l[M];if(l.hasOwnProperty(M)&&O!=null)switch(M){case"checked":break;case"value":break;case"defaultValue":d=O;default:a.hasOwnProperty(M)||ze(e,t,M,null,a,O)}}for(var A in a){var M=a[A];if(O=l[A],a.hasOwnProperty(A)&&(M!=null||O!=null))switch(A){case"type":u=M;break;case"name":n=M;break;case"checked":z=M;break;case"defaultChecked":D=M;break;case"value":c=M;break;case"defaultValue":r=M;break;case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(o(137,t));break;default:M!==O&&ze(e,t,A,M,a,O)}}vc(e,c,r,d,z,D,u,n);return;case"select":M=c=r=A=null;for(u in l)if(d=l[u],l.hasOwnProperty(u)&&d!=null)switch(u){case"value":break;case"multiple":M=d;default:a.hasOwnProperty(u)||ze(e,t,u,null,a,d)}for(n in a)if(u=a[n],d=l[n],a.hasOwnProperty(n)&&(u!=null||d!=null))switch(n){case"value":A=u;break;case"defaultValue":r=u;break;case"multiple":c=u;default:u!==d&&ze(e,t,n,u,a,d)}t=r,l=c,a=M,A!=null?Na(e,!!l,A,!1):!!a!=!!l&&(t!=null?Na(e,!!l,t,!0):Na(e,!!l,l?[]:"",!1));return;case"textarea":M=A=null;for(r in l)if(n=l[r],l.hasOwnProperty(r)&&n!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:ze(e,t,r,null,a,n)}for(c in a)if(n=a[c],u=l[c],a.hasOwnProperty(c)&&(n!=null||u!=null))switch(c){case"value":A=n;break;case"defaultValue":M=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(o(91));break;default:n!==u&&ze(e,t,c,n,a,u)}Rr(e,A,M);return;case"option":for(var Q in l)A=l[Q],l.hasOwnProperty(Q)&&A!=null&&!a.hasOwnProperty(Q)&&(Q==="selected"?e.selected=!1:ze(e,t,Q,null,a,A));for(d in a)A=a[d],M=l[d],a.hasOwnProperty(d)&&A!==M&&(A!=null||M!=null)&&(d==="selected"?e.selected=A&&typeof A!="function"&&typeof A!="symbol":ze(e,t,d,A,a,M));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ee in l)A=l[ee],l.hasOwnProperty(ee)&&A!=null&&!a.hasOwnProperty(ee)&&ze(e,t,ee,null,a,A);for(z in a)if(A=a[z],M=l[z],a.hasOwnProperty(z)&&A!==M&&(A!=null||M!=null))switch(z){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(o(137,t));break;default:ze(e,t,z,A,a,M)}return;default:if(pc(t)){for(var we in l)A=l[we],l.hasOwnProperty(we)&&A!==void 0&&!a.hasOwnProperty(we)&&cf(e,t,we,void 0,a,A);for(D in a)A=a[D],M=l[D],!a.hasOwnProperty(D)||A===M||A===void 0&&M===void 0||cf(e,t,D,A,a,M);return}}for(var E in l)A=l[E],l.hasOwnProperty(E)&&A!=null&&!a.hasOwnProperty(E)&&ze(e,t,E,null,a,A);for(O in a)A=a[O],M=l[O],!a.hasOwnProperty(O)||A===M||A==null&&M==null||ze(e,t,O,A,a,M)}function kh(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function zv(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,l=performance.getEntriesByType("resource"),a=0;a<l.length;a++){var n=l[a],u=n.transferSize,c=n.initiatorType,r=n.duration;if(u&&r&&kh(c)){for(c=0,r=n.responseEnd,a+=1;a<l.length;a++){var d=l[a],z=d.startTime;if(z>r)break;var D=d.transferSize,O=d.initiatorType;D&&kh(O)&&(d=d.responseEnd,c+=D*(d<r?1:(r-z)/(d-z)))}if(--a,t+=8*(u+c)/(n.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var of=null,ff=null;function Di(e){return e.nodeType===9?e:e.ownerDocument}function qh(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Lh(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function rf(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var sf=null;function wv(){var e=window.event;return e&&e.type==="popstate"?e===sf?!1:(sf=e,!0):(sf=null,!1)}var Yh=typeof setTimeout=="function"?setTimeout:void 0,Av=typeof clearTimeout=="function"?clearTimeout:void 0,jh=typeof Promise=="function"?Promise:void 0,Mv=typeof queueMicrotask=="function"?queueMicrotask:typeof jh!="undefined"?function(e){return jh.resolve(null).then(e).catch(_v)}:Yh;function _v(e){setTimeout(function(){throw e})}function Gl(e){return e==="head"}function Gh(e,t){var l=t,a=0;do{var n=l.nextSibling;if(e.removeChild(l),n&&n.nodeType===8)if(l=n.data,l==="/$"||l==="/&"){if(a===0){e.removeChild(n),hn(t);return}a--}else if(l==="$"||l==="$?"||l==="$~"||l==="$!"||l==="&")a++;else if(l==="html")fu(e.ownerDocument.documentElement);else if(l==="head"){l=e.ownerDocument.head,fu(l);for(var u=l.firstChild;u;){var c=u.nextSibling,r=u.nodeName;u[Mn]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&u.rel.toLowerCase()==="stylesheet"||l.removeChild(u),u=c}}else l==="body"&&fu(e.ownerDocument.body);l=n}while(l);hn(t)}function Xh(e,t){var l=e;e=0;do{var a=l.nextSibling;if(l.nodeType===1?t?(l._stashedDisplay=l.style.display,l.style.display="none"):(l.style.display=l._stashedDisplay||"",l.getAttribute("style")===""&&l.removeAttribute("style")):l.nodeType===3&&(t?(l._stashedText=l.nodeValue,l.nodeValue=""):l.nodeValue=l._stashedText||""),a&&a.nodeType===8)if(l=a.data,l==="/$"){if(e===0)break;e--}else l!=="$"&&l!=="$?"&&l!=="$~"&&l!=="$!"||e++;l=a}while(l)}function df(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var l=t;switch(t=t.nextSibling,l.nodeName){case"HTML":case"HEAD":case"BODY":df(l),gc(l);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(l.rel.toLowerCase()==="stylesheet")continue}e.removeChild(l)}}function Dv(e,t,l,a){for(;e.nodeType===1;){var n=l;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[Mn])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(u=e.getAttribute("rel"),u==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(u!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(u=e.getAttribute("src"),(u!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&u&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var u=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===u)return e}else return e;if(e=Lt(e.nextSibling),e===null)break}return null}function Cv(e,t,l){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!l||(e=Lt(e.nextSibling),e===null))return null;return e}function Qh(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Lt(e.nextSibling),e===null))return null;return e}function hf(e){return e.data==="$?"||e.data==="$~"}function mf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Ov(e,t){var l=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||l.readyState!=="loading")t();else{var a=function(){t(),l.removeEventListener("DOMContentLoaded",a)};l.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Lt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var gf=null;function Zh(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="/$"||l==="/&"){if(t===0)return Lt(e.nextSibling);t--}else l!=="$"&&l!=="$!"&&l!=="$?"&&l!=="$~"&&l!=="&"||t++}e=e.nextSibling}return null}function Vh(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="$"||l==="$!"||l==="$?"||l==="$~"||l==="&"){if(t===0)return e;t--}else l!=="/$"&&l!=="/&"||t++}e=e.previousSibling}return null}function Kh(e,t,l){switch(t=Di(l),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function fu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);gc(e)}var Yt=new Map,Jh=new Set;function Ci(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var bl=N.d;N.d={f:Uv,r:Rv,D:Nv,C:Hv,L:Bv,m:kv,X:Lv,S:qv,M:Yv};function Uv(){var e=bl.f(),t=Ei();return e||t}function Rv(e){var t=Oa(e);t!==null&&t.tag===5&&t.type==="form"?sd(t):bl.r(e)}var rn=typeof document=="undefined"?null:document;function $h(e,t,l){var a=rn;if(a&&typeof t=="string"&&t){var n=Ut(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof l=="string"&&(n+='[crossorigin="'+l+'"]'),Jh.has(n)||(Jh.add(n),e={rel:e,crossOrigin:l,href:t},a.querySelector(n)===null&&(t=a.createElement("link"),at(t,"link",e),We(t),a.head.appendChild(t)))}}function Nv(e){bl.D(e),$h("dns-prefetch",e,null)}function Hv(e,t){bl.C(e,t),$h("preconnect",e,t)}function Bv(e,t,l){bl.L(e,t,l);var a=rn;if(a&&e&&t){var n='link[rel="preload"][as="'+Ut(t)+'"]';t==="image"&&l&&l.imageSrcSet?(n+='[imagesrcset="'+Ut(l.imageSrcSet)+'"]',typeof l.imageSizes=="string"&&(n+='[imagesizes="'+Ut(l.imageSizes)+'"]')):n+='[href="'+Ut(e)+'"]';var u=n;switch(t){case"style":u=sn(e);break;case"script":u=dn(e)}Yt.has(u)||(e=_({rel:"preload",href:t==="image"&&l&&l.imageSrcSet?void 0:e,as:t},l),Yt.set(u,e),a.querySelector(n)!==null||t==="style"&&a.querySelector(ru(u))||t==="script"&&a.querySelector(su(u))||(t=a.createElement("link"),at(t,"link",e),We(t),a.head.appendChild(t)))}}function kv(e,t){bl.m(e,t);var l=rn;if(l&&e){var a=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+Ut(a)+'"][href="'+Ut(e)+'"]',u=n;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=dn(e)}if(!Yt.has(u)&&(e=_({rel:"modulepreload",href:e},t),Yt.set(u,e),l.querySelector(n)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(l.querySelector(su(u)))return}a=l.createElement("link"),at(a,"link",e),We(a),l.head.appendChild(a)}}}function qv(e,t,l){bl.S(e,t,l);var a=rn;if(a&&e){var n=Ua(a).hoistableStyles,u=sn(e);t=t||"default";var c=n.get(u);if(!c){var r={loading:0,preload:null};if(c=a.querySelector(ru(u)))r.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":t},l),(l=Yt.get(u))&&yf(e,l);var d=c=a.createElement("link");We(d),at(d,"link",e),d._p=new Promise(function(z,D){d.onload=z,d.onerror=D}),d.addEventListener("load",function(){r.loading|=1}),d.addEventListener("error",function(){r.loading|=2}),r.loading|=4,Oi(c,t,a)}c={type:"stylesheet",instance:c,count:1,state:r},n.set(u,c)}}}function Lv(e,t){bl.X(e,t);var l=rn;if(l&&e){var a=Ua(l).hoistableScripts,n=dn(e),u=a.get(n);u||(u=l.querySelector(su(n)),u||(e=_({src:e,async:!0},t),(t=Yt.get(n))&&vf(e,t),u=l.createElement("script"),We(u),at(u,"link",e),l.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},a.set(n,u))}}function Yv(e,t){bl.M(e,t);var l=rn;if(l&&e){var a=Ua(l).hoistableScripts,n=dn(e),u=a.get(n);u||(u=l.querySelector(su(n)),u||(e=_({src:e,async:!0,type:"module"},t),(t=Yt.get(n))&&vf(e,t),u=l.createElement("script"),We(u),at(u,"link",e),l.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},a.set(n,u))}}function Wh(e,t,l,a){var n=(n=oe.current)?Ci(n):null;if(!n)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof l.precedence=="string"&&typeof l.href=="string"?(t=sn(l.href),l=Ua(n).hoistableStyles,a=l.get(t),a||(a={type:"style",instance:null,count:0,state:null},l.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(l.rel==="stylesheet"&&typeof l.href=="string"&&typeof l.precedence=="string"){e=sn(l.href);var u=Ua(n).hoistableStyles,c=u.get(e);if(c||(n=n.ownerDocument||n,c={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,c),(u=n.querySelector(ru(e)))&&!u._p&&(c.instance=u,c.state.loading=5),Yt.has(e)||(l={rel:"preload",as:"style",href:l.href,crossOrigin:l.crossOrigin,integrity:l.integrity,media:l.media,hrefLang:l.hrefLang,referrerPolicy:l.referrerPolicy},Yt.set(e,l),u||jv(n,e,l,c.state))),t&&a===null)throw Error(o(528,""));return c}if(t&&a!==null)throw Error(o(529,""));return null;case"script":return t=l.async,l=l.src,typeof l=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=dn(l),l=Ua(n).hoistableScripts,a=l.get(t),a||(a={type:"script",instance:null,count:0,state:null},l.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function sn(e){return'href="'+Ut(e)+'"'}function ru(e){return'link[rel="stylesheet"]['+e+"]"}function Fh(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function jv(e,t,l,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),at(t,"link",l),We(t),e.head.appendChild(t))}function dn(e){return'[src="'+Ut(e)+'"]'}function su(e){return"script[async]"+e}function Ih(e,t,l){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Ut(l.href)+'"]');if(a)return t.instance=a,We(a),a;var n=_({},l,{"data-href":l.href,"data-precedence":l.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),We(a),at(a,"style",n),Oi(a,l.precedence,e),t.instance=a;case"stylesheet":n=sn(l.href);var u=e.querySelector(ru(n));if(u)return t.state.loading|=4,t.instance=u,We(u),u;a=Fh(l),(n=Yt.get(n))&&yf(a,n),u=(e.ownerDocument||e).createElement("link"),We(u);var c=u;return c._p=new Promise(function(r,d){c.onload=r,c.onerror=d}),at(u,"link",a),t.state.loading|=4,Oi(u,l.precedence,e),t.instance=u;case"script":return u=dn(l.src),(n=e.querySelector(su(u)))?(t.instance=n,We(n),n):(a=l,(n=Yt.get(u))&&(a=_({},l),vf(a,n)),e=e.ownerDocument||e,n=e.createElement("script"),We(n),at(n,"link",a),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,Oi(a,l.precedence,e));return t.instance}function Oi(e,t,l){for(var a=l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=a.length?a[a.length-1]:null,u=n,c=0;c<a.length;c++){var r=a[c];if(r.dataset.precedence===t)u=r;else if(u!==n)break}u?u.parentNode.insertBefore(e,u.nextSibling):(t=l.nodeType===9?l.head:l,t.insertBefore(e,t.firstChild))}function yf(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function vf(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Ui=null;function Ph(e,t,l){if(Ui===null){var a=new Map,n=Ui=new Map;n.set(l,a)}else n=Ui,a=n.get(l),a||(a=new Map,n.set(l,a));if(a.has(e))return a;for(a.set(e,null),l=l.getElementsByTagName(e),n=0;n<l.length;n++){var u=l[n];if(!(u[Mn]||u[Pe]||e==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var c=u.getAttribute(t)||"";c=e+c;var r=a.get(c);r?r.push(u):a.set(c,[u])}}return a}function e0(e,t,l){e=e.ownerDocument||e,e.head.insertBefore(l,t==="title"?e.querySelector("head > title"):null)}function Gv(e,t,l){if(l===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function t0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Xv(e,t,l,a){if(l.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(l.state.loading&4)===0){if(l.instance===null){var n=sn(a.href),u=t.querySelector(ru(n));if(u){t=u._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Ri.bind(e),t.then(e,e)),l.state.loading|=4,l.instance=u,We(u);return}u=t.ownerDocument||t,a=Fh(a),(n=Yt.get(n))&&yf(a,n),u=u.createElement("link"),We(u);var c=u;c._p=new Promise(function(r,d){c.onload=r,c.onerror=d}),at(u,"link",a),l.instance=u}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(l,t),(t=l.state.preload)&&(l.state.loading&3)===0&&(e.count++,l=Ri.bind(e),t.addEventListener("load",l),t.addEventListener("error",l))}}var bf=0;function Qv(e,t){return e.stylesheets&&e.count===0&&Hi(e,e.stylesheets),0<e.count||0<e.imgCount?function(l){var a=setTimeout(function(){if(e.stylesheets&&Hi(e,e.stylesheets),e.unsuspend){var u=e.unsuspend;e.unsuspend=null,u()}},6e4+t);0<e.imgBytes&&bf===0&&(bf=62500*zv());var n=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Hi(e,e.stylesheets),e.unsuspend)){var u=e.unsuspend;e.unsuspend=null,u()}},(e.imgBytes>bf?50:800)+t);return e.unsuspend=l,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(n)}}:null}function Ri(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Hi(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ni=null;function Hi(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ni=new Map,t.forEach(Zv,e),Ni=null,Ri.call(e))}function Zv(e,t){if(!(t.state.loading&4)){var l=Ni.get(e);if(l)var a=l.get(null);else{l=new Map,Ni.set(e,l);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<n.length;u++){var c=n[u];(c.nodeName==="LINK"||c.getAttribute("media")!=="not all")&&(l.set(c.dataset.precedence,c),a=c)}a&&l.set(null,a)}n=t.instance,c=n.getAttribute("data-precedence"),u=l.get(c)||a,u===a&&l.set(null,n),l.set(c,n),this.count++,a=Ri.bind(this),n.addEventListener("load",a),n.addEventListener("error",a),u?u.parentNode.insertBefore(n,u.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var du={$$typeof:k,Provider:null,Consumer:null,_currentValue:$,_currentValue2:$,_threadCount:0};function Vv(e,t,l,a,n,u,c,r,d){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=_a(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_a(0),this.hiddenUpdates=_a(null),this.identifierPrefix=a,this.onUncaughtError=n,this.onCaughtError=u,this.onRecoverableError=c,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=d,this.incompleteTransitions=new Map}function l0(e,t,l,a,n,u,c,r,d,z,D,O){return e=new Vv(e,t,l,c,d,z,D,O,r),t=1,u===!0&&(t|=24),u=Et(3,null,null,t),e.current=u,u.stateNode=e,t=$c(),t.refCount++,e.pooledCache=t,t.refCount++,u.memoizedState={element:a,isDehydrated:l,cache:t},Pc(u),e}function a0(e){return e?(e=Ga,e):Ga}function n0(e,t,l,a,n,u){n=a0(n),a.context===null?a.context=n:a.pendingContext=n,a=Ol(t),a.payload={element:l},u=u===void 0?null:u,u!==null&&(a.callback=u),l=Ul(e,a,t),l!==null&&(yt(l,e,t),Qn(l,e,t))}function u0(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var l=e.retryLane;e.retryLane=l!==0&&l<t?l:t}}function pf(e,t){u0(e,t),(e=e.alternate)&&u0(e,t)}function i0(e){if(e.tag===13||e.tag===31){var t=na(e,67108864);t!==null&&yt(t,e,67108864),pf(e,67108864)}}function c0(e){if(e.tag===13||e.tag===31){var t=At();t=dc(t);var l=na(e,t);l!==null&&yt(l,e,t),pf(e,t)}}var Bi=!0;function Kv(e,t,l,a){var n=w.T;w.T=null;var u=N.p;try{N.p=2,Sf(e,t,l,a)}finally{N.p=u,w.T=n}}function Jv(e,t,l,a){var n=w.T;w.T=null;var u=N.p;try{N.p=8,Sf(e,t,l,a)}finally{N.p=u,w.T=n}}function Sf(e,t,l,a){if(Bi){var n=Ef(a);if(n===null)uf(e,t,a,ki,l),f0(e,a);else if(Wv(n,e,t,l,a))a.stopPropagation();else if(f0(e,a),t&4&&-1<$v.indexOf(e)){for(;n!==null;){var u=Oa(n);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var c=Ct(u.pendingLanes);if(c!==0){var r=u;for(r.pendingLanes|=2,r.entangledLanes|=2;c;){var d=1<<31-Ue(c);r.entanglements[1]|=d,c&=~d}It(u),(pe&6)===0&&(pi=ut()+500,iu(0))}}break;case 31:case 13:r=na(u,2),r!==null&&yt(r,u,2),Ei(),pf(u,2)}if(u=Ef(a),u===null&&uf(e,t,a,ki,l),u===n)break;n=u}n!==null&&a.stopPropagation()}else uf(e,t,a,null,l)}}function Ef(e){return e=Ec(e),xf(e)}var ki=null;function xf(e){if(ki=null,e=Ca(e),e!==null){var t=m(e);if(t===null)e=null;else{var l=t.tag;if(l===13){if(e=p(t),e!==null)return e;e=null}else if(l===31){if(e=b(t),e!==null)return e;e=null}else if(l===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return ki=e,null}function o0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(_u()){case ct:return 2;case zn:return 8;case Il:case Du:return 32;case wn:return 268435456;default:return 32}default:return 32}}var Tf=!1,Xl=null,Ql=null,Zl=null,hu=new Map,mu=new Map,Vl=[],$v="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function f0(e,t){switch(e){case"focusin":case"focusout":Xl=null;break;case"dragenter":case"dragleave":Ql=null;break;case"mouseover":case"mouseout":Zl=null;break;case"pointerover":case"pointerout":hu.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mu.delete(t.pointerId)}}function gu(e,t,l,a,n,u){return e===null||e.nativeEvent!==u?(e={blockedOn:t,domEventName:l,eventSystemFlags:a,nativeEvent:u,targetContainers:[n]},t!==null&&(t=Oa(t),t!==null&&i0(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function Wv(e,t,l,a,n){switch(t){case"focusin":return Xl=gu(Xl,e,t,l,a,n),!0;case"dragenter":return Ql=gu(Ql,e,t,l,a,n),!0;case"mouseover":return Zl=gu(Zl,e,t,l,a,n),!0;case"pointerover":var u=n.pointerId;return hu.set(u,gu(hu.get(u)||null,e,t,l,a,n)),!0;case"gotpointercapture":return u=n.pointerId,mu.set(u,gu(mu.get(u)||null,e,t,l,a,n)),!0}return!1}function r0(e){var t=Ca(e.target);if(t!==null){var l=m(t);if(l!==null){if(t=l.tag,t===13){if(t=p(l),t!==null){e.blockedOn=t,zr(e.priority,function(){c0(l)});return}}else if(t===31){if(t=b(l),t!==null){e.blockedOn=t,zr(e.priority,function(){c0(l)});return}}else if(t===3&&l.stateNode.current.memoizedState.isDehydrated){e.blockedOn=l.tag===3?l.stateNode.containerInfo:null;return}}}e.blockedOn=null}function qi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var l=Ef(e.nativeEvent);if(l===null){l=e.nativeEvent;var a=new l.constructor(l.type,l);Sc=a,l.target.dispatchEvent(a),Sc=null}else return t=Oa(l),t!==null&&i0(t),e.blockedOn=l,!1;t.shift()}return!0}function s0(e,t,l){qi(e)&&l.delete(t)}function Fv(){Tf=!1,Xl!==null&&qi(Xl)&&(Xl=null),Ql!==null&&qi(Ql)&&(Ql=null),Zl!==null&&qi(Zl)&&(Zl=null),hu.forEach(s0),mu.forEach(s0)}function Li(e,t){e.blockedOn===t&&(e.blockedOn=null,Tf||(Tf=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,Fv)))}var Yi=null;function d0(e){Yi!==e&&(Yi=e,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){Yi===e&&(Yi=null);for(var t=0;t<e.length;t+=3){var l=e[t],a=e[t+1],n=e[t+2];if(typeof a!="function"){if(xf(a||l)===null)continue;break}var u=Oa(l);u!==null&&(e.splice(t,3),t-=3,So(u,{pending:!0,data:n,method:l.method,action:a},a,n))}}))}function hn(e){function t(d){return Li(d,e)}Xl!==null&&Li(Xl,e),Ql!==null&&Li(Ql,e),Zl!==null&&Li(Zl,e),hu.forEach(t),mu.forEach(t);for(var l=0;l<Vl.length;l++){var a=Vl[l];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Vl.length&&(l=Vl[0],l.blockedOn===null);)r0(l),l.blockedOn===null&&Vl.shift();if(l=(e.ownerDocument||e).$$reactFormReplay,l!=null)for(a=0;a<l.length;a+=3){var n=l[a],u=l[a+1],c=n[rt]||null;if(typeof u=="function")c||d0(l);else if(c){var r=null;if(u&&u.hasAttribute("formAction")){if(n=u,c=u[rt]||null)r=c.formAction;else if(xf(n)!==null)continue}else r=c.action;typeof r=="function"?l[a+1]=r:(l.splice(a,3),a-=3),d0(l)}}}function h0(){function e(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(c){return n=c})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),a||setTimeout(l,20)}function l(){if(!a&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,n=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(l,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function zf(e){this._internalRoot=e}ji.prototype.render=zf.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var l=t.current,a=At();n0(l,a,e,t,null,null)},ji.prototype.unmount=zf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;n0(e.current,2,null,e,null,null),Ei(),t[Da]=null}};function ji(e){this._internalRoot=e}ji.prototype.unstable_scheduleHydration=function(e){if(e){var t=Tr();e={blockedOn:null,target:e,priority:t};for(var l=0;l<Vl.length&&t!==0&&t<Vl[l].priority;l++);Vl.splice(l,0,e),l===0&&r0(e)}};var m0=f.version;if(m0!=="19.2.3")throw Error(o(527,m0,"19.2.3"));N.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=v(t),e=e!==null?x(e):null,e=e===null?null:e.stateNode,e};var Iv={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:w,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"){var Gi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Gi.isDisabled&&Gi.supportsFiber)try{Pl=Gi.inject(Iv),it=Gi}catch(e){}}return gn.createRoot=function(e,t){if(!h(e))throw Error(o(299));var l=!1,a="",n=Ed,u=xd,c=Td;return t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(u=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=l0(e,1,!1,null,null,l,a,null,n,u,c,h0),e[Da]=t.current,nf(e),new zf(t)},gn.hydrateRoot=function(e,t,l){if(!h(e))throw Error(o(299));var a=!1,n="",u=Ed,c=xd,r=Td,d=null;return l!=null&&(l.unstable_strictMode===!0&&(a=!0),l.identifierPrefix!==void 0&&(n=l.identifierPrefix),l.onUncaughtError!==void 0&&(u=l.onUncaughtError),l.onCaughtError!==void 0&&(c=l.onCaughtError),l.onRecoverableError!==void 0&&(r=l.onRecoverableError),l.formState!==void 0&&(d=l.formState)),t=l0(e,1,!0,t,l!=null?l:null,a,n,d,u,c,r,h0),t.context=a0(null),l=t.current,a=At(),a=dc(a),n=Ol(a),n.callback=null,Ul(l,n,a),l=a,t.current.lanes=l,Tl(t,l),It(t),e[Da]=t.current,nf(e),new ji(t)},gn.version="19.2.3",gn}var Nf;function A0(){if(Nf)return Qi.exports;Nf=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(f){console.error(f)}}return i(),Qi.exports=w0(),Qi.exports}var M0=A0(),F=Ji();const Hf=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="22" y1="12" x2="18" y2="12"></line>
    <line x1="6" y1="12" x2="2" y2="12"></line>
    <line x1="12" y1="6" x2="12" y2="2"></line>
    <line x1="12" y1="22" x2="12" y2="18"></line>
  </svg>
`,_0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`,D0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
`,C0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
`,O0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
`;function U0(i=!1){return`
    <div class="feedback-screenshot-container" id="screenshot-dropzone">
      <input type="file" id="screenshot-file-input" class="feedback-file-input" accept="image/*" multiple ${i?"disabled":""} />
      <button
        type="button"
        class="feedback-select-button"
        data-tooltip="You may also drag and drop!"
        ${i?"disabled":""}
      >
        ${D0}
        <span>Add Screenshot</span>
        ${O0}
      </button>
      <div class="feedback-screenshot-menu">
        <button type="button" class="feedback-menu-item" data-action="capture">
          ${Hf}
          <span>Capture Region</span>
        </button>
        <button type="button" class="feedback-menu-item" data-action="upload">
          ${C0}
          <span>Upload Image</span>
        </button>
      </div>
    </div>
  `}function R0(i=0,f=null){const s=f?`
    <div class="selection-mode-warning">
      ${f}
    </div>
  `:"";return`
    <canvas class="selection-mode-canvas" id="selection-canvas"></canvas>
    <div class="selection-mode-overlay">
      <div class="selection-mode-toolbar">
        <div class="selection-mode-info">
          <span class="selection-mode-icon">${Hf}</span>
          <span class="selection-mode-text">Draw to capture region</span>
          <span class="selection-mode-counter">${i}/5 captured</span>
        </div>
        <div class="selection-mode-actions">
          <button type="button" class="selection-mode-done-button">
            ${_0}
            <span>Done</span>
          </button>
        </div>
      </div>
      ${s}
      <div class="selection-mode-hint">
        Press <kbd>ESC</kbd> to exit • Drag to select region
      </div>
    </div>
  `}function Bf(){return'<canvas class="selection-mode-canvas display-only" id="selection-canvas"></canvas>'}function N0(){const i={blue:"#00A3E1",blueHover:"#0090c7",charcoal:"#333F48",lightGray:"#D9D9D6",gray50:"#f8f9fa",gray100:"#f0f2f3",gray400:"#8f999f"};return`
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
  `}const Mt={initCanvas(i){i.width=window.innerWidth,i.height=window.innerHeight;const f=i.getContext("2d");return f&&(f.imageSmoothingEnabled=!0),f},clearCanvas(i,f){i.clearRect(0,0,f.width,f.height)},drawRectangle(i,f,s,o,h,m=!1){i.fillStyle="rgba(0, 163, 225, 0.2)",i.fillRect(f,s,o,h),i.strokeStyle="#00A3E1",i.lineWidth=2,i.strokeRect(f,s,o,h),m&&(i.setLineDash([5,3]),i.strokeStyle="rgba(255, 255, 255, 0.5)",i.lineWidth=1,i.strokeRect(f+3,s+3,o-6,h-6),i.setLineDash([]))},drawBadge(i,f,s,o){const m=f+12,p=s+12;i.beginPath(),i.arc(m,p,12,0,2*Math.PI),i.fillStyle="#00A3E1",i.fill(),i.shadowColor="rgba(0, 0, 0, 0.3)",i.shadowBlur=4,i.shadowOffsetX=0,i.shadowOffsetY=2,i.fill(),i.shadowColor="transparent",i.shadowBlur=0,i.fillStyle="#ffffff",i.font="600 12px Montserrat, -apple-system, BlinkMacSystemFont, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(String(o),m,p)},redrawRectangles(i,f,s){Mt.clearCanvas(i,f),s.forEach(o=>{Mt.drawRectangle(i,o.x,o.y,o.width,o.height),Mt.drawBadge(i,o.x,o.y,o.number)})},normalizeRect(i,f,s,o){const h=Math.min(i,s),m=Math.min(f,o),p=Math.abs(s-i),b=Math.abs(o-f);return{x:h,y:m,width:p,height:b}}},H0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
`,B0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m18 15-6-6-6 6"></path>
  </svg>
`,k0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
`,q0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
`;function L0(i,f=!1){if(i.length===0)return"";const s=f?B0:H0;return`
    <div class="screenshot-list-container ${f?"expanded":""}">
      <button type="button" class="screenshot-list-badge" aria-expanded="${f}">
        <span class="screenshot-list-count">${i.length} screenshot${i.length>1?"s":""}</span>
        <span class="screenshot-list-chevron">${s}</span>
      </button>
      ${f?Y0(i):""}
    </div>
  `}function Y0(i){return`
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
          ${k0}
        </button>
      </div>
    </div>
  `).join("")}
      </div>
      <button type="button" class="screenshot-list-clear-all">
        ${q0}
        <span>Clear all</span>
      </button>
    </div>
  `}function j0(){const i={blue:"#00A3E1",blueHover:"#0090c7",blueLight:"#4dc3eb",lightGray:"#D9D9D6",gray50:"#f8f9fa"};return`
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
  `}const ne={charcoal:"#333F48",blue:"#00A3E1",blueHover:"#0090c7",blueLight:"#4dc3eb",background:"#ffffff",lightGray:"#D9D9D6",gray50:"#f8f9fa",gray100:"#f0f2f3",gray400:"#8f999f",gray500:"#6b7780",text:"#ffffff",textDark:"#333F48",shadowDark:"rgba(0, 0, 0, 0.25)"},ft={fontFamily:"'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",weightRegular:400,weightMedium:500,trackingTight:"-0.02em",trackingWide:"0.08em"},G0=()=>`
  :host {
    all: initial;
    font-family: ${ft.fontFamily};
  }

  * {
    box-sizing: border-box;
  }

  /* ===== MORPHING WIDGET CONTAINER ===== */
  .feedback-widget-morph {
    position: fixed;
    z-index: 999999;
    font-family: ${ft.fontFamily};
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${ne.blue};
    box-shadow: 0 4px 12px ${ne.shadowDark};
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
    background-color: ${ne.background};
    box-shadow: 0 10px 40px ${ne.shadowDark}, 0 0 0 1px ${ne.lightGray};
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
    color: ${ne.text};
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-widget-morph:not(.expanded):hover {
    background-color: ${ne.blueHover};
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${ne.shadowDark};
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
    background-color: ${ne.charcoal};
    color: ${ne.text};
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: ${ft.weightMedium};
    letter-spacing: ${ft.trackingWide};
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
    border-bottom: 1px solid ${ne.lightGray};
  }

  .feedback-form-title {
    margin: 0;
    font-size: 16px;
    font-weight: ${ft.weightMedium};
    color: ${ne.textDark};
    letter-spacing: ${ft.trackingTight};
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
    color: ${ne.gray500};
    transition: all 0.15s ease;
  }

  .feedback-close-button:hover {
    background-color: ${ne.gray100};
    color: ${ne.textDark};
  }

  .feedback-close-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${ne.blueLight};
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
    border: 1px solid ${ne.lightGray};
    border-radius: 8px;
    font-size: 14px;
    font-weight: ${ft.weightRegular};
    color: ${ne.textDark};
    background-color: ${ne.background};
    text-transform: uppercase;
    text-align: center;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .feedback-initials::placeholder {
    color: ${ne.gray400};
    text-transform: none;
  }

  .feedback-initials:hover {
    border-color: ${ne.gray400};
  }

  .feedback-initials:focus {
    outline: none;
    border-color: ${ne.blue};
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.15);
  }

  .feedback-initials:disabled {
    background-color: ${ne.gray50};
    cursor: not-allowed;
    opacity: 0.7;
  }

  .feedback-label {
    font-size: 12px;
    font-weight: ${ft.weightMedium};
    color: ${ne.textDark};
    text-transform: uppercase;
    letter-spacing: ${ft.trackingWide};
  }

  .feedback-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${ne.lightGray};
    border-radius: 8px;
    font-size: 14px;
    font-weight: ${ft.weightRegular};
    color: ${ne.textDark};
    background-color: ${ne.background};
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23333F48' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .feedback-select:hover {
    border-color: ${ne.gray400};
  }

  .feedback-select:focus {
    outline: none;
    border-color: ${ne.blue};
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.15);
  }

  .feedback-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${ne.lightGray};
    border-radius: 8px;
    font-size: 14px;
    font-weight: ${ft.weightRegular};
    color: ${ne.textDark};
    background-color: ${ne.background};
    resize: vertical;
    min-height: 36px;
    font-family: inherit;
    line-height: 1.6;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .feedback-textarea::placeholder {
    color: ${ne.gray400};
  }

  .feedback-textarea:hover {
    border-color: ${ne.gray400};
  }

  .feedback-textarea:focus {
    outline: none;
    border-color: ${ne.blue};
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
    background-color: ${ne.blue};
    color: ${ne.text};
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: ${ft.weightMedium};
    text-transform: uppercase;
    letter-spacing: ${ft.trackingWide};
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.1s ease;
  }

  .feedback-submit-button:hover {
    background-color: ${ne.blueHover};
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
    background-color: ${ne.blue};
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
    background-color: ${ne.blue};
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
    font-weight: ${ft.weightRegular};
    color: ${ne.textDark};
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
    background-color: ${ne.gray50};
    cursor: not-allowed;
    opacity: 0.7;
  }

  .feedback-close-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${j0()}

  ${N0()}
`,kf=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
`,X0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
`,Q0=`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
`,Z0=`
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
`,V0=[{value:"bug",label:"Bug"},{value:"feature",label:"Feature (Suggestion)"},{value:"general",label:"General"}];function K0(i="bug",f="",s="idle",o="",h=!1,m=[],p=!1,b=!0,S=!1,v=""){const x=V0.map(B=>`<option value="${B.value}" ${B.value===i?"selected":""}>${B.label}</option>`).join(""),_=s==="loading",R=_,H=s==="error"&&!S;return s==="success"?`
      <div class="feedback-form">
        <div class="feedback-form-header">
          <h3 class="feedback-form-title">Thank You!</h3>
          <button
            class="feedback-close-button"
            aria-label="Close feedback form"
            type="button"
          >
            ${kf}
          </button>
        </div>
        <div class="feedback-success-body">
          <div class="feedback-success-icon">${X0}</div>
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
          ${R?"disabled":""}
        >
          ${kf}
        </button>
      </div>

      <form class="feedback-form-body">
        ${H?`
          <div class="feedback-error-banner">
            <span class="feedback-error-icon">${Q0}</span>
            <span class="feedback-error-text">${o||"Something went wrong. Please try again."}</span>
            ${b?`<button type="button" class="feedback-retry-button">${h?"Retry":"Try Again"}</button>`:""}
          </div>
        `:""}

        <div class="feedback-form-field feedback-form-row">
          <select id="feedback-type" name="type" class="feedback-select" ${R?"disabled":""}>
            ${x}
          </select>
          <input
            type="text"
            id="feedback-initials"
            name="initials"
            class="feedback-initials"
            placeholder="Initials"
            maxlength="4"
            value="${v}"
            ${R?"disabled":""}
          />
        </div>

        <div class="feedback-form-field">
          <textarea
            id="feedback-message"
            name="message"
            class="feedback-textarea ${S?"error":""}"
            placeholder="${S?o:"Tell us what's on your mind..."}"
            rows="1"
            ${R?"disabled":""}
          >${f}</textarea>
        </div>

        ${U0(R)}

        ${L0(m,p)}

        <button type="submit" class="feedback-submit-button" ${R?"disabled":""}>
          ${_?`${Z0} Submitting...`:"Submit"}
        </button>
      </form>
    </div>
  `}let qf=null;function J0(i){if(!i||typeof i!="object")throw new Error("FeedbackWidget.init() requires a configuration object");const f=i;if(!f.appId)throw new Error("FeedbackWidget.init() requires appId to be specified");if(typeof f.appId!="string")throw new Error("FeedbackWidget.init() appId must be a string");if(f.appId.trim()==="")throw new Error("FeedbackWidget.init() appId cannot be empty");if(f.position!==void 0){const s=["bottom-right","bottom-left","top-right","top-left"];if(!s.includes(f.position))throw new Error(`FeedbackWidget.init() position must be one of: ${s.join(", ")}`)}if(f.jwtConfig!==void 0&&typeof f.jwtConfig!="object")throw new Error("FeedbackWidget.init() jwtConfig must be an object");if(f.env!==void 0){if(typeof f.env!="string")throw new Error("FeedbackWidget.init() env must be a string");const s=["alpha","beta","dev","stable"];if(!s.includes(f.env))throw new Error(`FeedbackWidget.init() env must be one of: ${s.join(", ")}`)}if(f.apiBaseUrl!==void 0&&typeof f.apiBaseUrl!="string")throw new Error("FeedbackWidget.init() apiBaseUrl must be a string")}function Wi(i){var f;J0(i),qf={appId:i.appId,position:(f=i.position)!=null?f:"bottom-right",jwtConfig:i.jwtConfig,env:i.env,apiBaseUrl:i.apiBaseUrl}}function $0(){return qf}const Lf="feedback-widget-corner";function W0(i){try{localStorage.setItem(Lf,i)}catch(f){console.warn("FeedbackWidget: Unable to save position to localStorage")}}function Yf(){try{const i=localStorage.getItem(Lf);return i&&["bottom-right","bottom-left","top-right","top-left"].includes(i)?i:null}catch(i){return null}}function F0(i,f){const s=typeof window!="undefined"?document.documentElement.clientWidth:800,o=typeof window!="undefined"?document.documentElement.clientHeight:600,h=i<s/2,m=f<o/2;return m&&h?"top-left":m&&!h?"top-right":!m&&h?"bottom-left":"bottom-right"}const pl=56,_t=24;let Jl=(typeof window!="undefined"?Yf():null)||"bottom-right";const Fi=new Set;let va=!1,yu=!1,Ii=!1,yn={x:0,y:0},vu=null;function I0(){vu=null}function $l(){I0();for(const i of Fi)i()}function jf(i){if(typeof window=="undefined")return{x:0,y:0};const f=document.documentElement.clientWidth,s=document.documentElement.clientHeight;switch(i){case"top-left":return{x:_t,y:_t};case"top-right":return{x:f-pl-_t,y:_t};case"bottom-left":return{x:_t,y:s-pl-_t};default:return{x:f-pl-_t,y:s-pl-_t}}}let Pi=!1;function P0(i="bottom-right"){if(Pi)return;am(),Jl=Yf()||i,Pi=!0,$l()}function em(){va=!0,yn=jf(Jl),$l()}function tm(i,f){va&&(yn={x:i,y:f},$l())}function lm(){if(!va)return;const i=yn.x+pl/2,f=yn.y+pl/2,s=F0(i,f);va=!1,yu=!0,$l(),setTimeout(()=>{Jl=s,W0(s),vn=null,bu=null,yu=!1,Ii=!0,$l(),setTimeout(()=>{Ii=!1,$l()},150)},50)}let vn=null,bu=null,ec=0,tc=0,Gf=!1;function am(){Gf||typeof window=="undefined"||(Gf=!0,window.addEventListener("resize",()=>{const i=document.documentElement.clientWidth,f=document.documentElement.clientHeight;(i!==ec||f!==tc)&&(ec=i,tc=f,vn=null,bu=null,$l())}),ec=document.documentElement.clientWidth,tc=document.documentElement.clientHeight)}function nm(){return va||yu?yn:((vn===null||bu!==Jl)&&(vn=jf(Jl),bu=Jl),vn)}function um(i){return Fi.add(i),()=>{Fi.delete(i)}}function im(){return vu===null&&(vu={corner:Jl,position:nm(),isDragging:va,isSnapping:yu,isAnimatingToCorner:Ii,isInitialized:Pi}),vu}function cm(){return{corner:"bottom-right",position:{x:0,y:0},isDragging:!1,isSnapping:!1,isAnimatingToCorner:!1,isInitialized:!1}}function om(i){const f=F.useSyncExternalStore(um,im,cm),{position:s,isDragging:o,isSnapping:h,isInitialized:m,corner:p,isAnimatingToCorner:b}=f;return F.useLayoutEffect(()=>{P0(i)},[i]),{widgetPosition:s,isDragging:o,isSnapping:h,isInitialized:m,corner:p,isAnimatingToCorner:b,widgetState:f}}function fm({widgetPosition:i,isExpanded:f}){const s=F.useRef(!1),o=F.useRef(null),h=F.useRef(null),m=F.useRef(!1),p=F.useRef(!1),b=F.useRef(()=>{}),S=F.useCallback(_=>{_.button!==0||f||(s.current=!0,m.current=!1,p.current=!1,o.current={x:_.clientX,y:_.clientY},h.current=vt({},i))},[i,f]);b.current=S;const v=F.useCallback(_=>{if(!s.current||!o.current||!h.current)return;const R=_.clientX-o.current.x,H=_.clientY-o.current.y;if((Math.abs(R)>5||Math.abs(H)>5)&&(m.current=!0,p.current||(p.current=!0,em())),!p.current)return;const B=document.documentElement.clientWidth,Y=document.documentElement.clientHeight,q=Math.max(_t,Math.min(h.current.x+R,B-pl-_t)),j=Math.max(_t,Math.min(h.current.y+H,Y-pl-_t));tm(q,j)},[]),x=F.useCallback(()=>{s.current&&p.current&&lm(),s.current=!1,p.current=!1,o.current=null,h.current=null},[]);return F.useEffect(()=>(document.addEventListener("mousemove",v),document.addEventListener("mouseup",x),()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",x)}),[v,x]),{handleMouseDownRef:b,hasDraggedRef:m}}function rm({setIsExpanded:i,setSelectionWarning:f}){const[s,o]=F.useState(!1),h=F.useRef(!1);h.current=s,F.useEffect(()=>{const b=S=>{S.key==="Escape"&&s&&o(!1)};if(s)return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[s]);const m=F.useCallback(()=>{o(!0),i(!1)},[i]),p=F.useCallback(()=>{o(!1),i(!0),f(null)},[i,f]);return{isSelectionMode:s,setIsSelectionMode:o,isSelectionModeRef:h,handleEnterSelectionMode:m,handleExitSelectionMode:p}}const Xf="[modern-screenshot]",ba=typeof window!="undefined",sm=ba&&"Worker"in window,lc=ba?(pr=window.navigator)==null?void 0:pr.userAgent:"",Qf=lc.includes("Chrome"),pu=lc.includes("AppleWebKit")&&!Qf,ac=lc.includes("Firefox"),dm=i=>i&&"__CONTEXT__"in i,hm=i=>i.constructor.name==="CSSFontFaceRule",mm=i=>i.constructor.name==="CSSImportRule",Kt=i=>i.nodeType===1,bn=i=>typeof i.className=="object",Zf=i=>i.tagName==="image",gm=i=>i.tagName==="use",pn=i=>Kt(i)&&typeof i.style!="undefined"&&!bn(i),ym=i=>i.nodeType===8,vm=i=>i.nodeType===3,pa=i=>i.tagName==="IMG",Su=i=>i.tagName==="VIDEO",bm=i=>i.tagName==="CANVAS",pm=i=>i.tagName==="TEXTAREA",Sm=i=>i.tagName==="INPUT",Em=i=>i.tagName==="STYLE",xm=i=>i.tagName==="SCRIPT",Tm=i=>i.tagName==="SELECT",zm=i=>i.tagName==="SLOT",wm=i=>i.tagName==="IFRAME",Am=(...i)=>console.warn(Xf,...i);function Mm(i){var s;const f=(s=i==null?void 0:i.createElement)==null?void 0:s.call(i,"canvas");return f&&(f.height=f.width=1),!!f&&"toDataURL"in f&&!!f.toDataURL("image/webp").includes("image/webp")}const nc=i=>i.startsWith("data:");function Vf(i,f){if(i.match(/^[a-z]+:\/\//i))return i;if(ba&&i.match(/^\/\//))return window.location.protocol+i;if(i.match(/^[a-z]+:/i)||!ba)return i;const s=Eu().implementation.createHTMLDocument(),o=s.createElement("base"),h=s.createElement("a");return s.head.appendChild(o),s.body.appendChild(h),f&&(o.href=f),h.href=i,h.href}function Eu(i){var f;return(f=i&&Kt(i)?i==null?void 0:i.ownerDocument:i)!=null?f:window.document}const xu="http://www.w3.org/2000/svg";function _m(i,f,s){const o=Eu(s).createElementNS(xu,"svg");return o.setAttributeNS(null,"width",i.toString()),o.setAttributeNS(null,"height",f.toString()),o.setAttributeNS(null,"viewBox",`0 0 ${i} ${f}`),o}function Dm(i,f){let s=new XMLSerializer().serializeToString(i);return f&&(s=s.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu,"")),`data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`}function Cm(i,f){return new Promise((s,o)=>{const h=new FileReader;h.onload=()=>s(h.result),h.onerror=()=>o(h.error),h.onabort=()=>o(new Error(`Failed read blob to ${f}`)),h.readAsDataURL(i)})}const Om=i=>Cm(i,"dataUrl");function Sa(i,f){const s=Eu(f).createElement("img");return s.decoding="sync",s.loading="eager",s.src=i,s}function Sn(i,f){return new Promise(s=>{const{timeout:o,ownerDocument:h,onError:m,onWarn:p}=f!=null?f:{},b=typeof i=="string"?Sa(i,Eu(h)):i;let S=null,v=null;function x(){s(b),S&&clearTimeout(S),v==null||v()}if(o&&(S=setTimeout(x,o)),Su(b)){const _=b.currentSrc||b.src;if(!_)return b.poster?Sn(b.poster,f).then(s):x();if(b.readyState>=2)return x();const R=x,H=B=>{p==null||p("Failed video load",_,B),m==null||m(B),x()};v=()=>{b.removeEventListener("loadeddata",R),b.removeEventListener("error",H)},b.addEventListener("loadeddata",R,{once:!0}),b.addEventListener("error",H,{once:!0})}else{const _=Zf(b)?b.href.baseVal:b.currentSrc||b.src;if(!_)return x();const R=async()=>{if(pa(b)&&"decode"in b)try{await b.decode()}catch(B){p==null||p("Failed to decode image, trying to render anyway",b.dataset.originalSrc||_,B)}x()},H=B=>{p==null||p("Failed image load",b.dataset.originalSrc||_,B),x()};if(pa(b)&&b.complete)return R();v=()=>{b.removeEventListener("load",R),b.removeEventListener("error",H)},b.addEventListener("load",R,{once:!0}),b.addEventListener("error",H,{once:!0})}})}async function Um(i,f){pn(i)&&(pa(i)||Su(i)?await Sn(i,f):await Promise.all(["img","video"].flatMap(s=>Array.from(i.querySelectorAll(s)).map(o=>Sn(o,f)))))}const Kf=(function(){let f=0;const s=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(f+=1,`u${s()}${f}`)})();function Jf(i){return i==null?void 0:i.split(",").map(f=>f.trim().replace(/"|'/g,"").toLowerCase()).filter(Boolean)}let $f=0;function Rm(i){const f=`${Xf}[#${$f}]`;return $f++,{time:s=>i&&console.time(`${f} ${s}`),timeEnd:s=>i&&console.timeEnd(`${f} ${s}`),warn:(...s)=>i&&Am(...s)}}function Nm(i){return{cache:i?"no-cache":"force-cache"}}async function Wf(i,f){return dm(i)?i:Hm(i,mn(vt({},f),{autoDestruct:!0}))}async function Hm(i,f){var H,B,Y,q,j;const{scale:s=1,workerUrl:o,workerNumber:h=1}=f||{},m=!!(f!=null&&f.debug),p=(H=f==null?void 0:f.features)!=null?H:!0,b=(B=i.ownerDocument)!=null?B:ba?window.document:void 0,S=(q=(Y=i.ownerDocument)==null?void 0:Y.defaultView)!=null?q:ba?window:void 0,v=new Map,x=mn(vt({width:0,height:0,quality:1,type:"image/png",scale:s,backgroundColor:null,style:null,filter:null,maximumCanvasSize:0,timeout:3e4,progress:null,debug:m,fetch:vt({requestInit:Nm((j=f==null?void 0:f.fetch)==null?void 0:j.bypassingCache),placeholderImage:"data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",bypassingCache:!1},f==null?void 0:f.fetch),fetchFn:null,font:{},drawImageInterval:100,workerUrl:null,workerNumber:h,onCloneEachNode:null,onCloneNode:null,onEmbedNode:null,onCreateForeignObjectSvg:null,includeStyleProperties:null,autoDestruct:!1},f),{__CONTEXT__:!0,log:Rm(m),node:i,ownerDocument:b,ownerWindow:S,dpi:s===1?null:96*s,svgStyleElement:Ff(b),svgDefsElement:b==null?void 0:b.createElementNS(xu,"defs"),svgStyles:new Map,defaultComputedStyles:new Map,workers:[...Array.from({length:sm&&o&&h?h:0})].map(()=>{try{const V=new Worker(o);return V.onmessage=async k=>{var J,Z,te,_e;const{url:G,result:K}=k.data;K?(Z=(J=v.get(G))==null?void 0:J.resolve)==null||Z.call(J,K):(_e=(te=v.get(G))==null?void 0:te.reject)==null||_e.call(te,new Error(`Error receiving message from worker: ${G}`))},V.onmessageerror=k=>{var K,J;const{url:G}=k.data;(J=(K=v.get(G))==null?void 0:K.reject)==null||J.call(K,new Error(`Error receiving message from worker: ${G}`))},V}catch(V){return x.log.warn("Failed to new Worker",V),null}}).filter(Boolean),fontFamilies:new Map,fontCssTexts:new Map,acceptOfImage:`${[Mm(b)&&"image/webp","image/svg+xml","image/*","*/*"].filter(Boolean).join(",")};q=0.8`,requests:v,drawImageCount:0,tasks:[],features:p,isEnable:V=>{var k,G;return V==="restoreScrollPosition"?typeof p=="boolean"?!1:(k=p[V])!=null?k:!1:typeof p=="boolean"?p:(G=p[V])!=null?G:!0},shadowRoots:[]});x.log.time("wait until load"),await Um(i,{timeout:x.timeout,onWarn:x.log.warn}),x.log.timeEnd("wait until load");const{width:_,height:R}=Bm(i,x);return x.width=_,x.height=R,x}function Ff(i){if(!i)return;const f=i.createElement("style"),s=f.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);return f.appendChild(s),f}function Bm(i,f){let{width:s,height:o}=f;if(Kt(i)&&(!s||!o)){const h=i.getBoundingClientRect();s=s||h.width||Number(i.getAttribute("width"))||0,o=o||h.height||Number(i.getAttribute("height"))||0}return{width:s,height:o}}async function km(i,f){const{log:s,timeout:o,drawImageCount:h,drawImageInterval:m}=f;s.time("image to canvas");const p=await Sn(i,{timeout:o,onWarn:f.log.warn}),{canvas:b,context2d:S}=qm(i.ownerDocument,f),v=()=>{try{S==null||S.drawImage(p,0,0,b.width,b.height)}catch(x){f.log.warn("Failed to drawImage",x)}};if(v(),f.isEnable("fixSvgXmlDecode"))for(let x=0;x<h;x++)await new Promise(_=>{setTimeout(()=>{S==null||S.clearRect(0,0,b.width,b.height),v(),_()},x+m)});return f.drawImageCount=0,s.timeEnd("image to canvas"),b}function qm(i,f){const{width:s,height:o,scale:h,backgroundColor:m,maximumCanvasSize:p}=f,b=i.createElement("canvas");b.width=Math.floor(s*h),b.height=Math.floor(o*h),b.style.width=`${s}px`,b.style.height=`${o}px`,p&&(b.width>p||b.height>p)&&(b.width>p&&b.height>p?b.width>b.height?(b.height*=p/b.width,b.width=p):(b.width*=p/b.height,b.height=p):b.width>p?(b.height*=p/b.width,b.width=p):(b.width*=p/b.height,b.height=p));const S=b.getContext("2d");return S&&m&&(S.fillStyle=m,S.fillRect(0,0,b.width,b.height)),{canvas:b,context2d:S}}function If(i,f){if(i.ownerDocument)try{const m=i.toDataURL();if(m!=="data:,")return Sa(m,i.ownerDocument)}catch(m){f.log.warn("Failed to clone canvas",m)}const s=i.cloneNode(!1),o=i.getContext("2d"),h=s.getContext("2d");try{return o&&h&&h.putImageData(o.getImageData(0,0,i.width,i.height),0,0),s}catch(m){f.log.warn("Failed to clone canvas",m)}return s}function Lm(i,f){var s;try{if((s=i==null?void 0:i.contentDocument)!=null&&s.body)return uc(i.contentDocument.body,f)}catch(o){f.log.warn("Failed to clone iframe",o)}return i.cloneNode(!1)}function Ym(i){const f=i.cloneNode(!1);return i.currentSrc&&i.currentSrc!==i.src&&(f.src=i.currentSrc,f.srcset=""),f.loading==="lazy"&&(f.loading="eager"),f}async function jm(i,f){if(i.ownerDocument&&!i.currentSrc&&i.poster)return Sa(i.poster,i.ownerDocument);const s=i.cloneNode(!1);s.crossOrigin="anonymous",i.currentSrc&&i.currentSrc!==i.src&&(s.src=i.currentSrc);const o=s.ownerDocument;if(o){let h=!0;if(await Sn(s,{onError:()=>h=!1,onWarn:f.log.warn}),!h)return i.poster?Sa(i.poster,i.ownerDocument):s;s.currentTime=i.currentTime,await new Promise(p=>{s.addEventListener("seeked",p,{once:!0})});const m=o.createElement("canvas");m.width=i.offsetWidth,m.height=i.offsetHeight;try{const p=m.getContext("2d");p&&p.drawImage(s,0,0,m.width,m.height)}catch(p){return f.log.warn("Failed to clone video",p),i.poster?Sa(i.poster,i.ownerDocument):s}return If(m,f)}return s}function Gm(i,f){return bm(i)?If(i,f):wm(i)?Lm(i,f):pa(i)?Ym(i):Su(i)?jm(i,f):i.cloneNode(!1)}function Xm(i){let f=i.sandbox;if(!f){const{ownerDocument:s}=i;try{s&&(f=s.createElement("iframe"),f.id=`__SANDBOX__${Kf()}`,f.width="0",f.height="0",f.style.visibility="hidden",f.style.position="fixed",s.body.appendChild(f),f.srcdoc='<!DOCTYPE html><meta charset="UTF-8"><title></title><body>',i.sandbox=f)}catch(o){i.log.warn("Failed to getSandBox",o)}}return f}const Qm=["width","height","-webkit-text-fill-color"],Zm=["stroke","fill"];function Pf(i,f,s){const{defaultComputedStyles:o}=s,h=i.nodeName.toLowerCase(),m=bn(i)&&h!=="svg",p=m?Zm.map(Y=>[Y,i.getAttribute(Y)]).filter(([,Y])=>Y!==null):[],b=[m&&"svg",h,p.map((Y,q)=>`${Y}=${q}`).join(","),f].filter(Boolean).join(":");if(o.has(b))return o.get(b);const S=Xm(s),v=S==null?void 0:S.contentWindow;if(!v)return new Map;const x=v==null?void 0:v.document;let _,R;m?(_=x.createElementNS(xu,"svg"),R=_.ownerDocument.createElementNS(_.namespaceURI,h),p.forEach(([Y,q])=>{R.setAttributeNS(null,Y,q)}),_.appendChild(R)):_=R=x.createElement(h),R.textContent=" ",x.body.appendChild(_);const H=v.getComputedStyle(R,f),B=new Map;for(let Y=H.length,q=0;q<Y;q++){const j=H.item(q);Qm.includes(j)||B.set(j,H.getPropertyValue(j))}return x.body.removeChild(_),o.set(b,B),B}function er(i,f,s){var b;const o=new Map,h=[],m=new Map;if(s)for(const S of s)p(S);else for(let S=i.length,v=0;v<S;v++){const x=i.item(v);p(x)}for(let S=h.length,v=0;v<S;v++)(b=m.get(h[v]))==null||b.forEach((x,_)=>o.set(_,x));function p(S){const v=i.getPropertyValue(S),x=i.getPropertyPriority(S),_=S.lastIndexOf("-"),R=_>-1?S.substring(0,_):void 0;if(R){let H=m.get(R);H||(H=new Map,m.set(R,H)),H.set(S,[v,x])}f.get(S)===v&&!x||(R?h.push(R):o.set(S,[v,x]))}return o}function Vm(i,f,s,o){var _,R,H,B;const{ownerWindow:h,includeStyleProperties:m,currentParentNodeStyle:p}=o,b=f.style,S=h.getComputedStyle(i),v=Pf(i,null,o);p==null||p.forEach((Y,q)=>{v.delete(q)});const x=er(S,v,m);x.delete("transition-property"),x.delete("all"),x.delete("d"),x.delete("content"),s&&(x.delete("margin-top"),x.delete("margin-right"),x.delete("margin-bottom"),x.delete("margin-left"),x.delete("margin-block-start"),x.delete("margin-block-end"),x.delete("margin-inline-start"),x.delete("margin-inline-end"),x.set("box-sizing",["border-box",""])),((_=x.get("background-clip"))==null?void 0:_[0])==="text"&&f.classList.add("______background-clip--text"),Qf&&(x.has("font-kerning")||x.set("font-kerning",["normal",""]),(((R=x.get("overflow-x"))==null?void 0:R[0])==="hidden"||((H=x.get("overflow-y"))==null?void 0:H[0])==="hidden")&&((B=x.get("text-overflow"))==null?void 0:B[0])==="ellipsis"&&i.scrollWidth===i.clientWidth&&x.set("text-overflow",["clip",""]));for(let Y=b.length,q=0;q<Y;q++)b.removeProperty(b.item(q));return x.forEach(([Y,q],j)=>{b.setProperty(j,Y,q)}),x}function Km(i,f){(pm(i)||Sm(i)||Tm(i))&&f.setAttribute("value",i.value)}const Jm=["::before","::after"],$m=["::-webkit-scrollbar","::-webkit-scrollbar-button","::-webkit-scrollbar-thumb","::-webkit-scrollbar-track","::-webkit-scrollbar-track-piece","::-webkit-scrollbar-corner","::-webkit-resizer"];function Wm(i,f,s,o,h){const{ownerWindow:m,svgStyleElement:p,svgStyles:b,currentNodeStyle:S}=o;if(!p||!m)return;function v(x){var k;const _=m.getComputedStyle(i,x);let R=_.getPropertyValue("content");if(!R||R==="none")return;h==null||h(R),R=R.replace(/(')|(")|(counter\(.+\))/g,"");const H=[Kf()],B=Pf(i,x,o);S==null||S.forEach((G,K)=>{B.delete(K)});const Y=er(_,B,o.includeStyleProperties);Y.delete("content"),Y.delete("-webkit-locale"),((k=Y.get("background-clip"))==null?void 0:k[0])==="text"&&f.classList.add("______background-clip--text");const q=[`content: '${R}';`];if(Y.forEach(([G,K],J)=>{q.push(`${J}: ${G}${K?" !important":""};`)}),q.length===1)return;try{f.className=[f.className,...H].join(" ")}catch(G){o.log.warn("Failed to copyPseudoClass",G);return}const j=q.join(`
  `);let V=b.get(j);V||(V=[],b.set(j,V)),V.push(`.${H[0]}${x}`)}Jm.forEach(v),s&&$m.forEach(v)}const tr=new Set(["symbol"]);async function lr(i,f,s,o,h){if(Kt(s)&&(Em(s)||xm(s))||o.filter&&!o.filter(s))return;tr.has(f.nodeName)||tr.has(s.nodeName)?o.currentParentNodeStyle=void 0:o.currentParentNodeStyle=o.currentNodeStyle;const m=await uc(s,o,!1,h);o.isEnable("restoreScrollPosition")&&Fm(i,m),f.appendChild(m)}async function ar(i,f,s,o){var m;let h=i.firstChild;Kt(i)&&i.shadowRoot&&(h=(m=i.shadowRoot)==null?void 0:m.firstChild,s.shadowRoots.push(i.shadowRoot));for(let p=h;p;p=p.nextSibling)if(!ym(p))if(Kt(p)&&zm(p)&&typeof p.assignedNodes=="function"){const b=p.assignedNodes();for(let S=0;S<b.length;S++)await lr(i,f,b[S],s,o)}else await lr(i,f,p,s,o)}function Fm(i,f){if(!pn(i)||!pn(f))return;const{scrollTop:s,scrollLeft:o}=i;if(!s&&!o)return;const{transform:h}=f.style,m=new DOMMatrix(h),{a:p,b,c:S,d:v}=m;m.a=1,m.b=0,m.c=0,m.d=1,m.translateSelf(-o,-s),m.a=p,m.b=b,m.c=S,m.d=v,f.style.transform=m.toString()}function Im(i,f){const{backgroundColor:s,width:o,height:h,style:m}=f,p=i.style;if(s&&p.setProperty("background-color",s,"important"),o&&p.setProperty("width",`${o}px`,"important"),h&&p.setProperty("height",`${h}px`,"important"),m)for(const b in m)p[b]=m[b]}const Pm=/^[\w-:]+$/;async function uc(i,f,s=!1,o){var v,x,_,R;const{ownerDocument:h,ownerWindow:m,fontFamilies:p,onCloneEachNode:b}=f;if(h&&vm(i))return o&&/\S/.test(i.data)&&o(i.data),h.createTextNode(i.data);if(h&&m&&Kt(i)&&(pn(i)||bn(i))){const H=await Gm(i,f);if(f.isEnable("removeAbnormalAttributes")){const k=H.getAttributeNames();for(let G=k.length,K=0;K<G;K++){const J=k[K];Pm.test(J)||H.removeAttribute(J)}}const B=f.currentNodeStyle=Vm(i,H,s,f);s&&Im(H,f);let Y=!1;if(f.isEnable("copyScrollbar")){const k=[(v=B.get("overflow-x"))==null?void 0:v[0],(x=B.get("overflow-y"))==null?void 0:x[0]];Y=k.includes("scroll")||(k.includes("auto")||k.includes("overlay"))&&(i.scrollHeight>i.clientHeight||i.scrollWidth>i.clientWidth)}const q=(_=B.get("text-transform"))==null?void 0:_[0],j=Jf((R=B.get("font-family"))==null?void 0:R[0]),V=j?k=>{q==="uppercase"?k=k.toUpperCase():q==="lowercase"?k=k.toLowerCase():q==="capitalize"&&(k=k[0].toUpperCase()+k.substring(1)),j.forEach(G=>{let K=p.get(G);K||p.set(G,K=new Set),k.split("").forEach(J=>K.add(J))})}:void 0;return Wm(i,H,Y,f,V),Km(i,H),Su(i)||await ar(i,H,f,V),await(b==null?void 0:b(H)),H}const S=i.cloneNode(!1);return await ar(i,S,f),await(b==null?void 0:b(S)),S}function eg(i){if(i.ownerDocument=void 0,i.ownerWindow=void 0,i.svgStyleElement=void 0,i.svgDefsElement=void 0,i.svgStyles.clear(),i.defaultComputedStyles.clear(),i.sandbox){try{i.sandbox.remove()}catch(f){i.log.warn("Failed to destroyContext",f)}i.sandbox=void 0}i.workers=[],i.fontFamilies.clear(),i.fontCssTexts.clear(),i.requests.clear(),i.tasks=[],i.shadowRoots=[]}function tg(i){const b=i,{url:f,timeout:s,responseType:o}=b,h=b0(b,["url","timeout","responseType"]),m=new AbortController,p=s?setTimeout(()=>m.abort(),s):void 0;return fetch(f,vt({signal:m.signal},h)).then(S=>{if(!S.ok)throw new Error("Failed fetch, not 2xx response",{cause:S});switch(o){case"arrayBuffer":return S.arrayBuffer();case"dataUrl":return S.blob().then(Om);default:return S.text()}}).finally(()=>clearTimeout(p))}function En(i,f){const{url:s,requestType:o="text",responseType:h="text",imageDom:m}=f;let p=s;const{timeout:b,acceptOfImage:S,requests:v,fetchFn:x,fetch:{requestInit:_,bypassingCache:R,placeholderImage:H},font:B,workers:Y,fontFamilies:q}=i;o==="image"&&(pu||ac)&&i.drawImageCount++;let j=v.get(s);if(!j){R&&R instanceof RegExp&&R.test(p)&&(p+=(/\?/.test(p)?"&":"?")+new Date().getTime());const V=o.startsWith("font")&&B&&B.minify,k=new Set;V&&o.split(";")[1].split(",").forEach(Z=>{q.has(Z)&&q.get(Z).forEach(te=>k.add(te))});const G=V&&k.size,K=vt({url:p,timeout:b,responseType:G?"arrayBuffer":h,headers:o==="image"?{accept:S}:void 0},_);j={type:o,resolve:void 0,reject:void 0,response:null},j.response=(async()=>{if(x&&o==="image"){const J=await x(s);if(J)return J}return!pu&&s.startsWith("http")&&Y.length?new Promise((J,Z)=>{Y[v.size&Y.length-1].postMessage(vt({rawUrl:s},K)),j.resolve=J,j.reject=Z}):tg(K)})().catch(J=>{if(v.delete(s),o==="image"&&H)return i.log.warn("Failed to fetch image base64, trying to use placeholder image",p),typeof H=="string"?H:H(m);throw J}),v.set(s,j)}return j.response}async function nr(i,f,s,o){if(!ur(i))return i;for(const[h,m]of lg(i,f))try{const p=await En(s,{url:m,requestType:o?"image":"text",responseType:"dataUrl"});i=i.replace(ag(h),`$1${p}$3`)}catch(p){s.log.warn("Failed to fetch css data url",h,p)}return i}function ur(i){return/url\((['"]?)([^'"]+?)\1\)/.test(i)}const ir=/url\((['"]?)([^'"]+?)\1\)/g;function lg(i,f){const s=[];return i.replace(ir,(o,h,m)=>(s.push([m,Vf(m,f)]),o)),s.filter(([o])=>!nc(o))}function ag(i){const f=i.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${f})(['"]?\\))`,"g")}const ng=["background-image","border-image-source","-webkit-border-image","-webkit-mask-image","list-style-image"];function ug(i,f){return ng.map(s=>{const o=i.getPropertyValue(s);return!o||o==="none"?null:((pu||ac)&&f.drawImageCount++,nr(o,null,f,!0).then(h=>{!h||o===h||i.setProperty(s,h,i.getPropertyPriority(s))}))}).filter(Boolean)}function ig(i,f){if(pa(i)){const s=i.currentSrc||i.src;if(!nc(s))return[En(f,{url:s,imageDom:i,requestType:"image",responseType:"dataUrl"}).then(o=>{o&&(i.srcset="",i.dataset.originalSrc=s,i.src=o||"")})];(pu||ac)&&f.drawImageCount++}else if(bn(i)&&!nc(i.href.baseVal)){const s=i.href.baseVal;return[En(f,{url:s,imageDom:i,requestType:"image",responseType:"dataUrl"}).then(o=>{o&&(i.dataset.originalSrc=s,i.href.baseVal=o||"")})]}return[]}function cg(i,f){var b;const{ownerDocument:s,svgDefsElement:o}=f,h=(b=i.getAttribute("href"))!=null?b:i.getAttribute("xlink:href");if(!h)return[];const[m,p]=h.split("#");if(p){const S=`#${p}`,v=f.shadowRoots.reduce((x,_)=>x!=null?x:_.querySelector(`svg ${S}`),s==null?void 0:s.querySelector(`svg ${S}`));if(m&&i.setAttribute("href",S),o!=null&&o.querySelector(S))return[];if(v)return o==null||o.appendChild(v.cloneNode(!0)),[];if(m)return[En(f,{url:m,responseType:"text"}).then(x=>{o==null||o.insertAdjacentHTML("beforeend",x)})]}return[]}function cr(i,f){const{tasks:s}=f;Kt(i)&&((pa(i)||Zf(i))&&s.push(...ig(i,f)),gm(i)&&s.push(...cg(i,f))),pn(i)&&s.push(...ug(i.style,f)),i.childNodes.forEach(o=>{cr(o,f)})}async function og(i,f){const{ownerDocument:s,svgStyleElement:o,fontFamilies:h,fontCssTexts:m,tasks:p,font:b}=f;if(!(!s||!o||!h.size))if(b&&b.cssText){const S=fr(b.cssText,f);o.appendChild(s.createTextNode(`${S}
`))}else{const S=Array.from(s.styleSheets).filter(x=>{try{return"cssRules"in x&&!!x.cssRules.length}catch(_){return f.log.warn(`Error while reading CSS rules from ${x.href}`,_),!1}});await Promise.all(S.flatMap(x=>Array.from(x.cssRules).map(async(_,R)=>{if(mm(_)){let H=R+1;const B=_.href;let Y="";try{Y=await En(f,{url:B,requestType:"text",responseType:"text"})}catch(j){f.log.warn(`Error fetch remote css import from ${B}`,j)}const q=Y.replace(ir,(j,V,k)=>j.replace(k,Vf(k,B)));for(const j of rg(q))try{x.insertRule(j,j.startsWith("@import")?H+=1:x.cssRules.length)}catch(V){f.log.warn("Error inserting rule from remote css import",{rule:j,error:V})}}}))),S.flatMap(x=>Array.from(x.cssRules)).filter(x=>{var _;return hm(x)&&ur(x.style.getPropertyValue("src"))&&((_=Jf(x.style.getPropertyValue("font-family")))==null?void 0:_.some(R=>h.has(R)))}).forEach(x=>{const _=x,R=m.get(_.cssText);R?o.appendChild(s.createTextNode(`${R}
`)):p.push(nr(_.cssText,_.parentStyleSheet?_.parentStyleSheet.href:null,f).then(H=>{H=fr(H,f),m.set(_.cssText,H),o.appendChild(s.createTextNode(`${H}
`))}))})}}const fg=/(\/\*[\s\S]*?\*\/)/g,or=/((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;function rg(i){if(i==null)return[];const f=[];let s=i.replace(fg,"");for(;;){const m=or.exec(s);if(!m)break;f.push(m[0])}s=s.replace(or,"");const o=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,h=new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})","gi");for(;;){let m=o.exec(s);if(m)h.lastIndex=o.lastIndex;else if(m=h.exec(s),m)o.lastIndex=h.lastIndex;else break;f.push(m[0])}return f}const sg=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,dg=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function fr(i,f){const{font:s}=f,o=s?s==null?void 0:s.preferredFormat:void 0;return o?i.replace(dg,h=>{for(;;){const[m,,p]=sg.exec(h)||[];if(!p)return"";if(p===o)return`src: ${m};`}}):i}async function hg(i,f){const s=await Wf(i,f);if(Kt(s.node)&&bn(s.node))return s.node;const{ownerDocument:o,log:h,tasks:m,svgStyleElement:p,svgDefsElement:b,svgStyles:S,font:v,progress:x,autoDestruct:_,onCloneNode:R,onEmbedNode:H,onCreateForeignObjectSvg:B}=s;h.time("clone node");const Y=await uc(s.node,s,!0);if(p&&o){let G="";S.forEach((K,J)=>{G+=`${K.join(`,
`)} {
  ${J}
}
`}),p.appendChild(o.createTextNode(G))}h.timeEnd("clone node"),await(R==null?void 0:R(Y)),v!==!1&&Kt(Y)&&(h.time("embed web font"),await og(Y,s),h.timeEnd("embed web font")),h.time("embed node"),cr(Y,s);const q=m.length;let j=0;const V=async()=>{for(;;){const G=m.pop();if(!G)break;try{await G}catch(K){s.log.warn("Failed to run task",K)}x==null||x(++j,q)}};x==null||x(j,q),await Promise.all([...Array.from({length:4})].map(V)),h.timeEnd("embed node"),await(H==null?void 0:H(Y));const k=mg(Y,s);return b&&k.insertBefore(b,k.children[0]),p&&k.insertBefore(p,k.children[0]),_&&eg(s),await(B==null?void 0:B(k)),k}function mg(i,f){const{width:s,height:o}=f,h=_m(s,o,i.ownerDocument),m=h.ownerDocument.createElementNS(h.namespaceURI,"foreignObject");return m.setAttributeNS(null,"x","0%"),m.setAttributeNS(null,"y","0%"),m.setAttributeNS(null,"width","100%"),m.setAttributeNS(null,"height","100%"),m.append(i),h.appendChild(m),h}async function gg(i,f){var p;const s=await Wf(i,f),o=await hg(s),h=Dm(o,s.isEnable("removeControlCharacter"));s.autoDestruct||(s.svgStyleElement=Ff(s.ownerDocument),s.svgDefsElement=(p=s.ownerDocument)==null?void 0:p.createElementNS(xu,"defs"),s.svgStyles.clear());const m=Sa(h,o.ownerDocument);return await km(m,s)}const Tu=2e3;function yg(){return`screenshot-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function rr(i,f,s,o,h){const m=document.createElement("canvas");m.width=Math.max(1,Math.round(i*h)),m.height=Math.max(1,Math.round(f*h));const p=m.getContext("2d");return p&&(p.fillStyle="#f0f0f0",p.fillRect(0,0,m.width,m.height),p.strokeStyle="#00A3E1",p.lineWidth=2,p.strokeRect(1,1,m.width-2,m.height-2),p.fillStyle="#333",p.font="14px sans-serif",p.textAlign="center",p.textBaseline="middle",p.fillText(`Region: ${i}x${f}`,m.width/2,m.height/2-10),p.fillText(`at (${s}, ${o})`,m.width/2,m.height/2+10)),m}async function vg(i,f,s,o){let h=1;(s>Tu||o>Tu)&&(h=Math.min(Tu/s,Tu/o));let m;try{const p=await gg(document.body,{scale:h,filter:S=>{var v;return S instanceof Element?!((v=S.hasAttribute)!=null&&v.call(S,"data-feedback-widget")):!0}});m=document.createElement("canvas"),m.width=Math.round(s*h),m.height=Math.round(o*h);const b=m.getContext("2d");b&&b.drawImage(p,i*h,f*h,s*h,o*h,0,0,m.width,m.height)}catch(p){console.warn("[FeedbackWidget] modern-screenshot failed, using placeholder:",p),m=rr(s,o,i,f,h)}return new Promise(p=>{m.toBlob(b=>{b?p(b):(console.warn("[FeedbackWidget] Canvas toBlob failed, creating placeholder"),rr(s,o,i,f,h).toBlob(v=>{p(v||new Blob(["placeholder"],{type:"image/png"}))},"image/png"))},"image/png",1)})}async function bg(i,f,s,o){const h=await vg(i,f,s,o),m=URL.createObjectURL(h);return{id:yg(),blobUrl:m,region:{x:i,y:f,width:s,height:o},capturedAt:Date.now(),sizeBytes:h.size}}function zu(i){URL.revokeObjectURL(i.blobUrl)}const ic=5;function pg({shadowRootRef:i}){const[f,s]=F.useState([]),[o,h]=F.useState([]),[m,p]=F.useState(null),[b,S]=F.useState(!1),v=F.useRef(null);F.useEffect(()=>()=>{v.current&&clearTimeout(v.current),f.forEach(q=>zu(q))},[]);const x=F.useCallback(q=>{p(q),v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{p(null)},2e3)},[]),_=F.useCallback(q=>{s(j=>{const V=j[q];return V&&zu(V),j.filter((k,G)=>G!==q)}),h(j=>j.filter((k,G)=>G!==q).map((k,G)=>mn(vt({},k),{number:G+1})))},[]),R=F.useCallback(()=>{f.forEach(q=>zu(q)),s([]),h([]),S(!1)},[f]),H=F.useCallback(()=>{S(q=>!q)},[]),B=F.useCallback(q=>{if(!i.current)return;const j=i.current,V=j.querySelector("[data-preview-overlay]");V&&V.remove();const k=document.createElement("div");k.className="screenshot-preview-overlay",k.setAttribute("data-preview-overlay",""),k.innerHTML=`
      <div class="screenshot-preview-container">
        <img src="${q.blobUrl}" alt="Screenshot preview" class="screenshot-preview-image" />
        <button type="button" class="screenshot-preview-close" aria-label="Close preview">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    `,k.addEventListener("click",G=>{(G.target===k||G.target.closest(".screenshot-preview-close"))&&k.remove()}),j.appendChild(k)},[i]),Y=F.useCallback(q=>{if(!q)return;let j=0;for(const V of Array.from(q)){if(f.length+j>=ic){x(`Maximum ${ic} screenshots allowed`);break}if(!V.type.startsWith("image/"))continue;const k=URL.createObjectURL(V),G={id:`upload-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,blobUrl:k,region:{x:0,y:0,width:0,height:0},capturedAt:Date.now(),sizeBytes:V.size};s(K=>[...K,G]),j++}},[f.length,x]);return{capturedScreenshots:f,setCapturedScreenshots:s,drawnRectangles:o,setDrawnRectangles:h,selectionWarning:m,setSelectionWarning:p,isScreenshotListExpanded:b,setIsScreenshotListExpanded:S,showWarning:x,handleRemoveScreenshot:_,handleClearAllScreenshots:R,handleToggleScreenshotList:H,handleShowScreenshotPreview:B,handleFileUpload:Y,MAX_SCREENSHOTS:ic}}function Sg({isSelectionMode:i,drawnRectangles:f,setDrawnRectangles:s,setCapturedScreenshots:o,showWarning:h,shadowRootRef:m,maxScreenshots:p}){const b=F.useRef(null),S=F.useRef(null),v=F.useRef(!1),x=F.useRef(null);return F.useEffect(()=>{const _=f.length>0;if(!i&&!_){b.current=null,S.current=null,v.current=!1,x.current=null;return}if(!m.current)return;let R=[];const H=requestAnimationFrame(()=>{if(!m.current)return;const B=m.current.querySelector(".selection-mode-canvas");if(!B)return;b.current=B;const Y=Mt.initCanvas(B);if(!Y)return;if(S.current=Y,Mt.redrawRectangles(Y,B,f),i){const j=G=>{v.current=!0,x.current={x:G.clientX,y:G.clientY}},V=G=>{if(!v.current||!x.current||!S.current||!b.current)return;const K=S.current,J=b.current;Mt.redrawRectangles(K,J,f);const{x:Z,y:te,width:_e,height:Qe}=Mt.normalizeRect(x.current.x,x.current.y,G.clientX,G.clientY);Mt.drawRectangle(K,Z,te,_e,Qe,!0)},k=async G=>{if(!v.current||!x.current)return;v.current=!1;const{x:K,y:J,width:Z,height:te}=Mt.normalizeRect(x.current.x,x.current.y,G.clientX,G.clientY);if(x.current=null,f.length>=p){h(`Maximum ${p} screenshots allowed`),S.current&&b.current&&Mt.redrawRectangles(S.current,b.current,f);return}const _e=f.length+1,Qe={id:`rect-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,x:K,y:J,width:Z,height:te,number:_e};s(ve=>[...ve,Qe]);try{b.current&&(b.current.style.visibility="hidden");const ve=await bg(K,J,Z,te);b.current&&(b.current.style.visibility="visible"),o(Se=>[...Se,ve])}catch(ve){b.current&&(b.current.style.visibility="visible"),console.error("Failed to capture screenshot:",ve),h("Failed to capture screenshot"),s(Se=>Se.filter(Ae=>Ae.id!==Qe.id))}};B.addEventListener("mousedown",j),document.addEventListener("mousemove",V),document.addEventListener("mouseup",k),R.push(()=>{B.removeEventListener("mousedown",j),document.removeEventListener("mousemove",V),document.removeEventListener("mouseup",k)})}const q=()=>{b.current&&S.current&&(Mt.initCanvas(b.current),S.current=b.current.getContext("2d"),S.current&&Mt.redrawRectangles(S.current,b.current,f))};window.addEventListener("resize",q),R.push(()=>{window.removeEventListener("resize",q)})});return()=>{cancelAnimationFrame(H),R.forEach(B=>B())}},[i,f,s,o,h,m,p]),{canvasRef:b}}function Eg(i){var f;return i?i.replace(/\/$/,""):typeof window!="undefined"&&((f=window.location)!=null&&f.origin)?window.location.origin:""}function sr(i,f){const s=Eg(i);return s?`${s}${f.startsWith("/")?"":"/"}${f}`:f}function xg(i){if(i instanceof Error){const f=i.message.toLowerCase();if(f.includes("network")||f.includes("fetch")||f.includes("connection")||f.includes("timeout")||f.includes("failed to fetch")||i.name==="TypeError")return{message:"Unable to connect. Please check your internet connection and try again.",isNetworkError:!0}}return{message:"Something went wrong. Please try again.",isNetworkError:!1}}async function Tg(i,f,s,o){const h=sr(o||"","/api/screenshot"),m=new FormData;m.append("appId",f),m.append("index",String(s)),m.append("file",i,`screenshot-${s}.png`);try{const p=await fetch(h,{method:"POST",body:m,mode:"cors",credentials:"omit"});if(!p.ok)return console.error("[FeedbackWidget] Screenshot upload failed:",p.status),null;const b=await p.json();return!(b!=null&&b.url)||!(b!=null&&b.storagePath)?(console.error("[FeedbackWidget] Screenshot upload response missing fields."),null):b}catch(p){return console.error("[FeedbackWidget] Screenshot upload exception:",p),null}}async function zg(i,f){const s=sr(f||"","/api/feedback");try{const o=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),mode:"cors",credentials:"omit"});if(!o.ok){let h="Something went wrong. Please try again.";try{const m=await o.json();m!=null&&m.error&&(h=m.error)}catch(m){}return{success:!1,error:h,isNetworkError:o.status>=500}}return{success:!0}}catch(o){const{message:h,isNetworkError:m}=xg(o);return{success:!1,error:h,isNetworkError:m}}}const cc={cookieKeys:["token","jwt","access_token","auth_token","sb-access-token"],localStorageKeys:["token","jwt","access_token","auth_token","supabase.auth.token"],userIdClaim:"sub"};function wg(i){try{const f=i.split(".");if(f.length!==3)return null;const o=f[1].replace(/-/g,"+").replace(/_/g,"/"),h=decodeURIComponent(atob(o).split("").map(m=>"%"+("00"+m.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(h)}catch(f){return null}}function Ag(i){if(typeof document=="undefined")return null;const f=document.cookie.split(";");for(const s of f){const[o,...h]=s.trim().split("=");if(o===i)return decodeURIComponent(h.join("="))}return null}function Mg(i){var f;if(typeof window=="undefined")return null;try{const s=localStorage.getItem(i);if(!s)return null;try{const o=JSON.parse(s);if(typeof o=="object"&&o!==null){if(o.access_token)return o.access_token;if(o.token)return o.token;if((f=o.currentSession)!=null&&f.access_token)return o.currentSession.access_token}return s}catch(o){return s}}catch(s){return null}}function dr(i,f){const s=wg(i);if(!s)return null;const o=s[f];return typeof o=="string"?o:typeof s.user_id=="string"?s.user_id:null}function _g(i={}){var s,o,h,m,p;const f={cookieKeys:(s=i.cookieKeys)!=null?s:cc.cookieKeys,localStorageKeys:(o=i.localStorageKeys)!=null?o:cc.localStorageKeys,userIdClaim:(h=i.userIdClaim)!=null?h:cc.userIdClaim};for(const b of(m=f.cookieKeys)!=null?m:[]){const S=Ag(b);if(S){const v=dr(S,f.userIdClaim);if(v)return v}}for(const b of(p=f.localStorageKeys)!=null?p:[]){const S=Mg(b);if(S){const v=dr(S,f.userIdClaim);if(v)return v}}}function Dg({effectiveAppId:i,effectiveApiBaseUrl:f,effectiveJwtConfig:s,capturedScreenshots:o,setCapturedScreenshots:h,setDrawnRectangles:m,setIsScreenshotListExpanded:p,setIsExpanded:b}){const S="feedback-widget-initials",[v,x]=F.useState("bug"),[_,R]=F.useState(""),[H,B]=F.useState(""),[Y,q]=F.useState("idle"),[j,V]=F.useState(""),[k,G]=F.useState(!1),[K,J]=F.useState(!1),Z=F.useRef(null);F.useEffect(()=>{try{const Ae=localStorage.getItem(S);Ae&&B(Ae)}catch(Ae){}},[]);const te=F.useCallback(Ae=>{R(Ae),K&&(J(!1),q("idle"),V(""))},[K]),_e=F.useCallback(()=>{const Ae=_g(s);return vt({url:typeof window!="undefined"?window.location.href:"",userAgent:typeof navigator!="undefined"?navigator.userAgent:"",timestamp:new Date().toISOString()},Ae&&{userId:Ae})},[s]),Qe=F.useCallback(()=>{Z.current&&(clearTimeout(Z.current),Z.current=null),b(!1),q("idle"),V("")},[b]),ve=F.useCallback(async Ae=>{if(Ae&&Ae.preventDefault(),!_.trim()){q("error"),V("Please enter a message"),G(!1),J(!0);return}q("loading"),V(""),G(!1),J(!1);const Ze=_e(),P=[];for(let N=0;N<o.length;N++){const $=o[N];try{const be=await(await fetch($.blobUrl)).blob(),y=await Tg(be,i,N+1,f);y?P.push({url:y.url,storagePath:y.storagePath,region:$.region,capturedAt:$.capturedAt,sizeBytes:$.sizeBytes}):console.warn(`[FeedbackWidget] Failed to upload screenshot ${N+1}`)}catch(me){console.error(`[FeedbackWidget] Error uploading screenshot ${N+1}:`,me)}}const w=await zg({app_id:i,type:v,message:_.trim(),initials:H.trim()||void 0,elements:P.length>0?P:void 0,metadata:Ze},f);if(w.success){if(q("success"),H.trim())try{localStorage.setItem(S,H.trim())}catch(N){}te(""),x("general"),o.forEach(N=>zu(N)),h([]),m([]),p(!1),Z.current=setTimeout(()=>{b(!1),q("idle")},600)}else q("error"),V(w.error||"Something went wrong. Please try again."),G(w.isNetworkError||!1)},[v,_,H,i,f,_e,o,h,m,p,b]),Se=F.useCallback(()=>{ve()},[ve]);return{feedbackType:v,setFeedbackType:x,feedbackMessage:_,setFeedbackMessage:te,feedbackInitials:H,setFeedbackInitials:B,submissionState:Y,setSubmissionState:q,errorMessage:j,isNetworkError:k,isValidationError:K,autoCloseTimerRef:Z,handleClose:Qe,handleSubmit:ve,handleRetry:Se}}function Cg(i,f,s){const{handleClose:o,handleSubmit:h,handleRetry:m,handleEnterSelectionMode:p,handleToggleScreenshotList:b,handleClearAllScreenshots:S,handleRemoveScreenshot:v,handleShowScreenshotPreview:x,handleFileUpload:_,setFeedbackType:R,setFeedbackMessage:H,setFeedbackInitials:B}=f,Y=i.querySelector(".feedback-close-button"),q=i.querySelector(".feedback-form-body"),j=i.querySelector("#feedback-type"),V=i.querySelector("#feedback-message"),k=i.querySelector("#feedback-initials"),G=i.querySelector(".feedback-retry-button"),K=i.querySelector(".feedback-select-button"),J=i.querySelector(".feedback-screenshot-menu"),Z=i.querySelector("#screenshot-file-input"),te=i.querySelector("#widget-tooltip");Y&&Y.addEventListener("click",o),q&&q.addEventListener("submit",h),j&&(j.addEventListener("change",P=>R(P.target.value)),j.addEventListener("keydown",P=>P.stopPropagation())),V&&(V.addEventListener("input",P=>H(P.target.value)),V.addEventListener("keydown",P=>P.stopPropagation()),V.addEventListener("keyup",P=>P.stopPropagation()),V.addEventListener("keypress",P=>P.stopPropagation())),k&&(k.addEventListener("input",P=>B(P.target.value)),k.addEventListener("keydown",P=>P.stopPropagation())),G&&G.addEventListener("click",m),K&&J&&K.addEventListener("click",P=>{P.stopPropagation(),te&&te.classList.remove("visible"),J.classList.toggle("open")}),K&&te&&(K.addEventListener("mouseenter",()=>{const P=K.getAttribute("data-tooltip");if(P){const w=K.getBoundingClientRect(),N=window.innerHeight,$=w.top+w.height/2;te.textContent=P,te.style.left=`${w.left+w.width/2}px`,te.style.transform="translateX(-50%)",$>N/2?(te.style.top=`${w.top-8}px`,te.style.transform+=" translateY(-100%)"):(te.style.top=`${w.bottom+8}px`,te.style.transform+=" translateY(0)"),te.classList.add("visible")}}),K.addEventListener("mouseleave",()=>te.classList.remove("visible")));const _e=i.querySelector('[data-action="capture"]'),Qe=i.querySelector('[data-action="upload"]');_e&&J&&_e.addEventListener("click",()=>{J.classList.remove("open"),p()}),Qe&&Z&&J&&Qe.addEventListener("click",()=>{J.classList.remove("open"),Z.click()}),Z&&Z.addEventListener("change",P=>{_(P.target.files),Z.value=""});const ve=i.querySelector("#screenshot-dropzone");ve&&(ve.addEventListener("dragover",P=>{P.preventDefault(),ve.classList.add("drag-over")}),ve.addEventListener("dragleave",()=>ve.classList.remove("drag-over")),ve.addEventListener("drop",P=>{var w;P.preventDefault(),ve.classList.remove("drag-over"),_((w=P.dataTransfer)==null?void 0:w.files)}));const Se=P=>{const w=i.querySelector(".feedback-screenshot-container");w&&!w.contains(P.target)&&(J==null||J.classList.remove("open"))};document.addEventListener("click",Se);const Ae=i.querySelector(".screenshot-list-badge"),Ze=i.querySelector(".screenshot-list-clear-all");return Ae&&Ae.addEventListener("click",b),Ze&&Ze.addEventListener("click",S),i.querySelectorAll(".screenshot-thumbnail-remove").forEach(P=>{P.addEventListener("click",w=>{w.stopPropagation(),v(parseInt(w.currentTarget.getAttribute("data-remove-index")||"0",10))})}),i.querySelectorAll(".screenshot-thumbnail-wrapper").forEach(P=>{P.addEventListener("click",w=>{if(w.target.closest(".screenshot-thumbnail-remove"))return;const N=w.currentTarget.closest(".screenshot-thumbnail-item"),$=parseInt((N==null?void 0:N.getAttribute("data-screenshot-index"))||"0",10);s[$]&&x(s[$])})}),()=>document.removeEventListener("click",Se)}function Og(i,f,s,o,h,m,p,b){i.addEventListener("mousedown",v=>{!o.current&&!s.current&&h.current(v)});const S=f.querySelector("#widget-tooltip");if(i.addEventListener("click",()=>{if(S&&S.classList.remove("visible"),s.current)return;const v=m.current;m.current=!1,v||(o.current?p():b(!0))}),S){const v=(x,_)=>{S.textContent=_;const R=window.innerWidth,H=x.left+x.width/2,B=x.top+x.height/2;H>R/2?(S.style.left=`${x.left-8}px`,S.style.transform="translateX(-100%)"):(S.style.left=`${x.right+8}px`,S.style.transform="translateX(0)"),S.style.top=`${B}px`,S.style.transform+=" translateY(-50%)",S.classList.add("visible")};i.addEventListener("mouseenter",()=>{!s.current&&!o.current&&v(i.getBoundingClientRect(),"Provide Feedback")}),i.addEventListener("mouseleave",()=>S.classList.remove("visible"))}}const Ug='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';function Rg(){return F.useSyncExternalStore(()=>()=>{},()=>!0,()=>!1)}hr.init=function(f){Wi(f)};function hr({position:i,appId:f,jwtConfig:s,apiBaseUrl:o}={}){var ut,_u;const h=$0(),m=(ut=f!=null?f:h==null?void 0:h.appId)!=null?ut:"default",p=(_u=i!=null?i:h==null?void 0:h.position)!=null?_u:"top-right",b=s!=null?s:h==null?void 0:h.jwtConfig,S=o!=null?o:h==null?void 0:h.apiBaseUrl,v=F.useRef(null),x=F.useRef(null),_=F.useRef(null),R=F.useRef(!1),H=F.useRef(!1),[B,Y]=F.useState(!1),[q,j]=F.useState(!1),V=F.useRef(!1);H.current=B,F.useEffect(()=>{if(V.current&&!B){j(!0);const ct=setTimeout(()=>j(!1),150);return()=>clearTimeout(ct)}V.current=B},[B]);const k=Rg(),{widgetPosition:G,isDragging:K,isSnapping:J,isInitialized:Z,isAnimatingToCorner:te,widgetState:_e}=om(p),{handleMouseDownRef:Qe,hasDraggedRef:ve}=fm({widgetPosition:G,isExpanded:B}),{capturedScreenshots:Se,setCapturedScreenshots:Ae,drawnRectangles:Ze,setDrawnRectangles:P,selectionWarning:w,setSelectionWarning:N,isScreenshotListExpanded:$,setIsScreenshotListExpanded:me,showWarning:be,handleRemoveScreenshot:y,handleClearAllScreenshots:U,handleToggleScreenshotList:L,handleShowScreenshotPreview:X,handleFileUpload:le,MAX_SCREENSHOTS:oe}=pg({shadowRootRef:x}),{isSelectionMode:ce,isSelectionModeRef:Ke,handleEnterSelectionMode:Oe,handleExitSelectionMode:Pt}=rm({setIsExpanded:Y,setSelectionWarning:N});Sg({isSelectionMode:ce,drawnRectangles:Ze,setDrawnRectangles:P,setCapturedScreenshots:Ae,showWarning:be,shadowRootRef:x,maxScreenshots:oe});const{feedbackType:Wl,setFeedbackType:xa,feedbackMessage:xn,setFeedbackMessage:Jt,feedbackInitials:Ta,setFeedbackInitials:za,submissionState:wu,errorMessage:Tn,isNetworkError:wa,isValidationError:Fl,handleClose:Aa,handleSubmit:Au,handleRetry:Mu}=Dg({effectiveAppId:m,effectiveApiBaseUrl:S,effectiveJwtConfig:b,capturedScreenshots:Se,setCapturedScreenshots:Ae,setDrawnRectangles:P,setIsScreenshotListExpanded:me,setIsExpanded:Y});return F.useEffect(()=>{if(!v.current||!k||!Z)return;x.current||(x.current=v.current.attachShadow({mode:"open"}));const ct=x.current,zn=B?"expanded":"",Il=K?"dragging":"",Du=Z?"":"initializing",wn=te?"animating-to-corner":"",sc=K||J||te;let el;if(sc)el=`left: ${G.x}px; top: ${G.y}px; right: auto; bottom: auto;`;else switch(_e.corner){case"top-left":el="left: 24px; top: 24px; right: auto; bottom: auto;";break;case"top-right":el="right: 24px; top: 24px; left: auto; bottom: auto;";break;case"bottom-left":el="left: 24px; bottom: 24px; right: auto; top: auto;";break;default:el="right: 24px; bottom: 24px; left: auto; top: auto;";break}const Pl=Ze.length>0,it=ce?R0(Se.length,w):Pl?Bf():"",Gt=K0(Wl,xn,wu,Tn,wa,Se,$,!Fl,Fl,Ta);let Ue=_.current;if(Ue&&ct.contains(Ue)){Ue.className=`feedback-widget-morph ${zn} ${Il} ${Du} ${wn}`.trim(),Ue.style.cssText=el,Ue.setAttribute("aria-expanded",String(B));const Dt=Ue.querySelector(".form-layer");if(Dt&&B){const Je=Dt.querySelector("#feedback-message"),$e=Dt.querySelector("#feedback-initials"),Ct=ct.activeElement===Je,Ma=ct.activeElement===$e,xl=Je==null?void 0:Je.selectionStart,Cu=Je==null?void 0:Je.selectionEnd,An=Je==null?void 0:Je.scrollTop,_a=$e==null?void 0:$e.selectionStart,Tl=$e==null?void 0:$e.selectionEnd;if(Dt.innerHTML=Gt,Ct){const pt=Dt.querySelector("#feedback-message");pt&&(pt.focus(),xl!==void 0&&Cu!==void 0&&pt.setSelectionRange(xl,Cu),An!==void 0&&(pt.scrollTop=An),pt.setSelectionRange(pt.selectionStart,pt.selectionStart))}else if(Ma){const pt=Dt.querySelector("#feedback-initials");pt&&(pt.focus(),_a!==void 0&&Tl!==void 0&&pt.setSelectionRange(_a,Tl))}}const Xt=ct.querySelector(".selection-mode-overlay"),bt=ct.querySelector(".selection-mode-canvas"),El=Ze.length>0;if(ce&&!Xt)bt&&bt.remove(),Ue.insertAdjacentHTML("beforebegin",it);else if(!ce&&Xt)Xt.remove(),El&&bt?bt.classList.add("display-only"):bt&&bt.remove();else if(!ce&&!Xt&&El)bt?bt.classList.contains("display-only")||bt.classList.add("display-only"):Ue.insertAdjacentHTML("beforebegin",Bf());else if(!ce&&!Xt&&!El&&bt)bt.remove();else if(ce&&Xt){const Je=Xt.querySelector(".selection-mode-counter");Je&&(Je.textContent=`${Se.length}/5 captured`);const $e=Xt.querySelector(".selection-mode-warning");if(w&&!$e){const Ct=Xt.querySelector(".selection-mode-hint");Ct&&Ct.insertAdjacentHTML("beforebegin",`<div class="selection-mode-warning">${w}</div>`)}else!w&&$e?$e.remove():w&&$e&&($e.textContent=w)}}else ct.innerHTML=`<style>${G0()}</style>${it}<div class="feedback-tooltip" id="widget-tooltip">Provide Feedback</div><div class="feedback-widget-morph ${zn} ${Il} ${Du} ${wn}" style="${el}" role="dialog" aria-label="Feedback widget" aria-expanded="${B}"><div class="button-layer" data-tooltip="Provide Feedback">${Ug}</div><div class="form-layer">${Gt}</div></div>`,Ue=ct.querySelector(".feedback-widget-morph"),_.current=Ue;if(_.current&&!R.current&&(R.current=!0,Og(_.current,ct,H,Ke,Qe,ve,Pt,Y)),ce){const Dt=ct.querySelector(".selection-mode-done-button");Dt&&Dt.addEventListener("click",Pt)}return Cg(ct,{handleClose:Aa,handleSubmit:Au,handleRetry:Mu,handleEnterSelectionMode:Oe,handleToggleScreenshotList:L,handleClearAllScreenshots:U,handleRemoveScreenshot:y,handleShowScreenshotPreview:X,handleFileUpload:le,setFeedbackType:xa,setFeedbackMessage:Jt,setFeedbackInitials:za},Se)},[B,q,G,_e.corner,K,J,te,k,Z,Aa,Au,Mu,Oe,Pt,L,U,y,X,le,Wl,xn,Ta,wu,Tn,wa,Fl,ce,Se,Ze,$,w,xa,Jt,za,Ke,Qe,ve]),Af.jsx("div",{ref:v,"data-feedback-widget":!0})}const mr="feedback-widget-root",Ng=["bottom-right","bottom-left","top-right","top-left"],Hg=["alpha","beta","dev","stable"];let Ea=null,Sl=null,oc=null;function fc(){var s,o;if(typeof document=="undefined")return null;const i=document.currentScript;if(i&&i.tagName==="SCRIPT")return i;const f=Array.from(document.getElementsByTagName("script"));return(o=(s=f.find(h=>h.dataset.appId))!=null?s:f.find(h=>h.dataset.feedbackWidget!==void 0))!=null?o:null}function Bg(i){if(i)return Ng.includes(i)?i:void 0}function kg(i){if(!i)return;const f=i.toLowerCase();return Hg.includes(f)?f:void 0}function gr(i){var s;if(!i)return;let f=(s=i.dataset.apiBase)==null?void 0:s.trim();if(!f&&i.src)try{f=new URL(i.src,window.location.href).origin}catch(o){f=void 0}return f}function yr(i){if(i)return kg(i.dataset.env)}function vr(i){var m;if(!i)return null;const f=(m=i.dataset.appId)==null?void 0:m.trim();if(!f)return null;const s=Bg(i.dataset.position),o=yr(i),h=gr(i);return{appId:f,position:s,env:o,apiBaseUrl:h}}function br(i){var s,o;const f=fc();return mn(vt({},i),{env:(s=i.env)!=null?s:yr(f),apiBaseUrl:(o=i.apiBaseUrl)!=null?o:gr(f)})}async function qg(i){const f=i.apiBaseUrl||window.location.origin,s=new URL("/api/config",f);s.searchParams.set("app",i.appId),i.env&&s.searchParams.set("env",i.env);try{const o=await fetch(s.toString(),{method:"GET",mode:"cors",credentials:"omit"});return o.ok?await o.json():null}catch(o){return null}}function Lg(){if(Sl&&document.body.contains(Sl))return Sl;const i=document.getElementById(mr);if(i)return Sl=i,i;const f=document.createElement("div");return f.id=mr,document.body.appendChild(f),Sl=f,f}function Yg(i){const f=br(i);Wi(f),oc=f}function rc(i){var o;if(typeof document=="undefined")return;const f=(o=i!=null?i:oc)!=null?o:vr(fc());if(!f){console.error("[FeedbackWidget] Missing config. Provide appId to mount the widget.");return}const s=br(f);if(!document.body){window.addEventListener("DOMContentLoaded",()=>rc(s),{once:!0});return}(async()=>{var p;const h=await qg(s);if((h==null?void 0:h.enabled)===!1){console.info("[FeedbackWidget] Widget disabled by remote config.");return}const m=mn(vt({},s),{apiBaseUrl:(p=h==null?void 0:h.apiBaseUrl)!=null?p:s.apiBaseUrl});try{Wi(m)}catch(b){console.error("[FeedbackWidget] Invalid config.",b);return}oc=m,Ea||(Ea=M0.createRoot(Lg())),Ea.render(Af.jsx(hr,{}))})()}function jg(){Ea&&(Ea.unmount(),Ea=null),Sl&&(Sl.remove(),Sl=null)}function Gg(){const i={init:Yg,mount:rc,unmount:jg};window.FeedbackWidget?window.FeedbackWidget=vt(vt({},window.FeedbackWidget),i):window.FeedbackWidget=i}if(typeof window!="undefined"){Gg();const i=vr(fc());i&&rc(i)}})();
//# sourceMappingURL=widget.js.map
