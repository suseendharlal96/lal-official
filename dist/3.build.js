webpackJsonp([3],{276:function(t,e,n){"use strict";function r(t){n(774)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(739),s=n(780),i=n(55),a=r,c=i(o.a,s.a,!1,a,null,null);e.default=c.exports},701:function(t,e,n){"use strict";function r(t){return"[object Array]"===S.call(t)}function o(t){return"[object ArrayBuffer]"===S.call(t)}function s(t){return"undefined"!=typeof FormData&&t instanceof FormData}function i(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function a(t){return"string"==typeof t}function c(t){return"number"==typeof t}function u(t){return void 0===t}function l(t){return null!==t&&"object"==typeof t}function d(t){return"[object Date]"===S.call(t)}function f(t){return"[object File]"===S.call(t)}function p(t){return"[object Blob]"===S.call(t)}function h(t){return"[object Function]"===S.call(t)}function m(t){return l(t)&&h(t.pipe)}function v(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams}function g(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function b(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function y(t,e){if(null!==t&&void 0!==t)if("object"!=typeof t&&(t=[t]),r(t))for(var n=0,o=t.length;n<o;n++)e.call(null,t[n],n,t);else for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.call(null,t[s],s,t)}function k(){function t(t,n){"object"==typeof e[n]&&"object"==typeof t?e[n]=k(e[n],t):e[n]=t}for(var e={},n=0,r=arguments.length;n<r;n++)y(arguments[n],t);return e}function x(){function t(t,n){"object"==typeof e[n]&&"object"==typeof t?e[n]=x(e[n],t):e[n]="object"==typeof t?x({},t):t}for(var e={},n=0,r=arguments.length;n<r;n++)y(arguments[n],t);return e}function _(t,e,n){return y(e,function(e,r){t[r]=n&&"function"==typeof e?w(e,n):e}),t}var w=n(702),C=n(713),S=Object.prototype.toString;t.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:s,isArrayBufferView:i,isString:a,isNumber:c,isObject:l,isUndefined:u,isDate:d,isFile:f,isBlob:p,isFunction:h,isStream:m,isURLSearchParams:v,isStandardBrowserEnv:b,forEach:y,merge:k,deepMerge:x,extend:_,trim:g}},702:function(t,e,n){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return t.apply(e,n)}}},703:function(t,e,n){"use strict";function r(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(701);t.exports=function(t,e,n){if(!e)return t;var s;if(n)s=n(e);else if(o.isURLSearchParams(e))s=e.toString();else{var i=[];o.forEach(e,function(t,e){null!==t&&void 0!==t&&(o.isArray(t)?e+="[]":t=[t],o.forEach(t,function(t){o.isDate(t)?t=t.toISOString():o.isObject(t)&&(t=JSON.stringify(t)),i.push(r(e)+"="+r(t))}))}),s=i.join("&")}if(s){var a=t.indexOf("#");-1!==a&&(t=t.slice(0,a)),t+=(-1===t.indexOf("?")?"?":"&")+s}return t}},704:function(t,e,n){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},705:function(t,e,n){"use strict";(function(e){function r(t,e){!o.isUndefined(t)&&o.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var o=n(701),s=n(718),i={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:function(){var t;return void 0!==e&&"[object process]"===Object.prototype.toString.call(e)?t=n(706):"undefined"!=typeof XMLHttpRequest&&(t=n(706)),t}(),transformRequest:[function(t,e){return s(e,"Accept"),s(e,"Content-Type"),o.isFormData(t)||o.isArrayBuffer(t)||o.isBuffer(t)||o.isStream(t)||o.isFile(t)||o.isBlob(t)?t:o.isArrayBufferView(t)?t.buffer:o.isURLSearchParams(t)?(r(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):o.isObject(t)?(r(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(t){a.headers[t]={}}),o.forEach(["post","put","patch"],function(t){a.headers[t]=o.merge(i)}),t.exports=a}).call(e,n(116))},706:function(t,e,n){"use strict";var r=n(701),o=n(719),s=n(703),i=n(721),a=n(722),c=n(707);t.exports=function(t){return new Promise(function(e,u){var l=t.data,d=t.headers;r.isFormData(l)&&delete d["Content-Type"];var f=new XMLHttpRequest;if(t.auth){var p=t.auth.username||"",h=t.auth.password||"";d.Authorization="Basic "+btoa(p+":"+h)}if(f.open(t.method.toUpperCase(),s(t.url,t.params,t.paramsSerializer),!0),f.timeout=t.timeout,f.onreadystatechange=function(){if(f&&4===f.readyState&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in f?i(f.getAllResponseHeaders()):null,r=t.responseType&&"text"!==t.responseType?f.response:f.responseText,s={data:r,status:f.status,statusText:f.statusText,headers:n,config:t,request:f};o(e,u,s),f=null}},f.onabort=function(){f&&(u(c("Request aborted",t,"ECONNABORTED",f)),f=null)},f.onerror=function(){u(c("Network Error",t,null,f)),f=null},f.ontimeout=function(){u(c("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",f)),f=null},r.isStandardBrowserEnv()){var m=n(723),v=(t.withCredentials||a(t.url))&&t.xsrfCookieName?m.read(t.xsrfCookieName):void 0;v&&(d[t.xsrfHeaderName]=v)}if("setRequestHeader"in f&&r.forEach(d,function(t,e){void 0===l&&"content-type"===e.toLowerCase()?delete d[e]:f.setRequestHeader(e,t)}),t.withCredentials&&(f.withCredentials=!0),t.responseType)try{f.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&f.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){f&&(f.abort(),u(t),f=null)}),void 0===l&&(l=null),f.send(l)})}},707:function(t,e,n){"use strict";var r=n(720);t.exports=function(t,e,n,o,s){var i=new Error(t);return r(i,e,n,o,s)}},708:function(t,e,n){"use strict";var r=n(701);t.exports=function(t,e){e=e||{};var n={};return r.forEach(["url","method","params","data"],function(t){void 0!==e[t]&&(n[t]=e[t])}),r.forEach(["headers","auth","proxy"],function(o){r.isObject(e[o])?n[o]=r.deepMerge(t[o],e[o]):void 0!==e[o]?n[o]=e[o]:r.isObject(t[o])?n[o]=r.deepMerge(t[o]):void 0!==t[o]&&(n[o]=t[o])}),r.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(r){void 0!==e[r]?n[r]=e[r]:void 0!==t[r]&&(n[r]=t[r])}),n}},709:function(t,e,n){"use strict";function r(t){this.message=t}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,t.exports=r},710:function(t,e,n){t.exports=n(712)},711:function(t,e,n){"use strict";e.a={}},712:function(t,e,n){"use strict";function r(t){var e=new i(t),n=s(i.prototype.request,e);return o.extend(n,i.prototype,e),o.extend(n,e),n}var o=n(701),s=n(702),i=n(714),a=n(708),c=n(705),u=r(c);u.Axios=i,u.create=function(t){return r(a(u.defaults,t))},u.Cancel=n(709),u.CancelToken=n(726),u.isCancel=n(704),u.all=function(t){return Promise.all(t)},u.spread=n(727),t.exports=u,t.exports.default=u},713:function(t,e){/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}},714:function(t,e,n){"use strict";function r(t){this.defaults=t,this.interceptors={request:new i,response:new i}}var o=n(701),s=n(703),i=n(715),a=n(716),c=n(708);r.prototype.request=function(t){"string"==typeof t?(t=arguments[1]||{},t.url=arguments[0]):t=t||{},t=c(this.defaults,t),t.method=t.method?t.method.toLowerCase():"get";var e=[a,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},r.prototype.getUri=function(t){return t=c(this.defaults,t),s(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(t){r.prototype[t]=function(e,n){return this.request(o.merge(n||{},{method:t,url:e}))}}),o.forEach(["post","put","patch"],function(t){r.prototype[t]=function(e,n,r){return this.request(o.merge(r||{},{method:t,url:e,data:n}))}}),t.exports=r},715:function(t,e,n){"use strict";function r(){this.handlers=[]}var o=n(701);r.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},r.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},r.prototype.forEach=function(t){o.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=r},716:function(t,e,n){"use strict";function r(t){t.cancelToken&&t.cancelToken.throwIfRequested()}var o=n(701),s=n(717),i=n(704),a=n(705),c=n(724),u=n(725);t.exports=function(t){return r(t),t.baseURL&&!c(t.url)&&(t.url=u(t.baseURL,t.url)),t.headers=t.headers||{},t.data=s(t.data,t.headers,t.transformRequest),t.headers=o.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||a.adapter)(t).then(function(e){return r(t),e.data=s(e.data,e.headers,t.transformResponse),e},function(e){return i(e)||(r(t),e&&e.response&&(e.response.data=s(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},717:function(t,e,n){"use strict";var r=n(701);t.exports=function(t,e,n){return r.forEach(n,function(n){t=n(t,e)}),t}},718:function(t,e,n){"use strict";var r=n(701);t.exports=function(t,e){r.forEach(t,function(n,r){r!==e&&r.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[r])})}},719:function(t,e,n){"use strict";var r=n(707);t.exports=function(t,e,n){var o=n.config.validateStatus;!o||o(n.status)?t(n):e(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},720:function(t,e,n){"use strict";t.exports=function(t,e,n,r,o){return t.config=e,n&&(t.code=n),t.request=r,t.response=o,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},t}},721:function(t,e,n){"use strict";var r=n(701),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,n,s,i={};return t?(r.forEach(t.split("\n"),function(t){if(s=t.indexOf(":"),e=r.trim(t.substr(0,s)).toLowerCase(),n=r.trim(t.substr(s+1)),e){if(i[e]&&o.indexOf(e)>=0)return;i[e]="set-cookie"===e?(i[e]?i[e]:[]).concat([n]):i[e]?i[e]+", "+n:n}}),i):i}},722:function(t,e,n){"use strict";var r=n(701);t.exports=r.isStandardBrowserEnv()?function(){function t(t){var e=t;return n&&(o.setAttribute("href",e),e=o.href),o.setAttribute("href",e),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var e,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return e=t(window.location.href),function(n){var o=r.isString(n)?t(n):n;return o.protocol===e.protocol&&o.host===e.host}}():function(){return function(){return!0}}()},723:function(t,e,n){"use strict";var r=n(701);t.exports=r.isStandardBrowserEnv()?function(){return{write:function(t,e,n,o,s,i){var a=[];a.push(t+"="+encodeURIComponent(e)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},724:function(t,e,n){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},725:function(t,e,n){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},726:function(t,e,n){"use strict";function r(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new o(t),e(n.reason))})}var o=n(709);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var t;return{token:new r(function(e){t=e}),cancel:t}},t.exports=r},727:function(t,e,n){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},728:function(t,e,n){"use strict";function r(t){n(732)}var o=n(711),s=n(734),i=n(55),a=r,c=i(o.a,s.a,!1,a,null,null);e.a=c.exports},732:function(t,e,n){var r=n(733);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(38)("406958fe",r,!0,{})},733:function(t,e,n){e=t.exports=n(37)(!1),e.push([t.i,".container{margin:0 auto;max-width:930px}@keyframes placeHolderShimmer{0%{-webkit-transform:translateZ(0);transform:translateZ(0);background-position:-468px 0}to{-webkit-transform:translateZ(0);transform:translateZ(0);background-position:468px 0}}.card-skeleton{width:100%;height:300px;margin:5px;position:relative;float:left;top:0;left:0;transition:all .3s ease-in-out;-webkit-backface-visibility:hidden;background:#fff;z-index:10;padding:15px;opacity:1}.card-skeleton.hidden{transition:all .3s ease-in-out;opacity:0;height:0;padding:0}.card-skeleton-img{width:100%;height:120px;background:#e6e6e6;display:block}.animated-background{will-change:transform;animation:placeHolderShimmer 1s linear infinite forwards;-webkit-backface-visibility:hidden;background:#e6e6e6;background:linear-gradient(90deg,#eee 8%,#ddd 18%,#eee 33%);background-size:800px 104px;height:100%;position:relative}.skel-mask-container{position:relative}.skel-mask{background:#fff;position:absolute;z-index:200}.skel-mask-1{width:100%;height:15px;top:0;left:0}.skel-mask-2{width:25%;height:10px;top:15px;right:0}.skel-mask-3{top:25px}.skel-mask-3,.skel-mask-4{width:100%;height:15px;right:0}.skel-mask-4{top:50px}.skel-mask-5{width:10%;height:30px;top:65px;right:30%}.skel-mask-6{width:100%;height:15px;top:95px;right:0}",""])},734:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{id:"persons",fluid:"","grid-list-md":""}},[n("div",{staticClass:"card-skeleton"},[n("div",{staticClass:"animated-background"},[n("div",{staticClass:"card-skeleton-img"}),t._v(" "),n("div",{staticClass:"skel-mask-container"},[n("div",{staticClass:"skel-mask skel-mask-1"}),t._v(" "),n("div",{staticClass:"skel-mask skel-mask-1"}),t._v(" "),n("div",{staticClass:"skel-mask skel-mask-2"}),t._v(" "),n("div",{staticClass:"skel-mask skel-mask-3"}),t._v(" "),n("div",{staticClass:"skel-mask skel-mask-4"}),t._v(" "),n("div",{staticClass:"skel-mask skel-mask-5"}),t._v(" "),n("div",{staticClass:"skel-mask skel-mask-6"})])])])])},o=[],s={render:r,staticRenderFns:o};e.a=s},739:function(t,e,n){"use strict";var r=n(710),o=n.n(r),s=n(776),i=n(778),a=n(728);e.a={data:function(){return{todos:[],val:"",addVal:"",readOnly:"",imgUrl:"",classic:!1,btnName:"Classic",dispName:"Table",dropDownArr:[],loading:!1}},methods:{add:function(t){if(t.length>0){var e={val:t.toLowerCase()};-1===this.todos.findIndex(function(e){return e===t.toLowerCase()})?(this.todos.push(t),o.a.post("https://todolist-7be14.firebaseio.com/tasks.json",e).then(this.$toaster.success("Successfully added")).catch(function(t){return console.log(t)}),this.addVal=""):this.$toaster.error("Task already exists")}else this.$toaster.error("should not be empty")},del:function(t){if("string"==typeof t&&0!==t.length){var e=this.todos.findIndex(function(e){return e===t});-1!==e?(this.todos.splice(+e,1),this.val="",this.$toaster.success("Successfully deleted")):this.$toaster.error("failed deletion")}else"number"==typeof t?(this.todos.splice(t,1),this.val="",this.$toaster.success("Successfully deleted")):this.$toaster.error("Select a task name")},update:function(t,e){if(t.length>0){var n=t.toLowerCase().replace(/\s/g,"");-1===this.todos.findIndex(function(t){return t.toLowerCase().replace(/\s/g,"").includes(n)})?(this.todos[e]=n,this.$toaster.info("Successfully updated"),this.readOnly=!1):(this.readOnly=!0,this.$toaster.error("Task already exists"))}else this.$toaster.error("No changes recorded")},classicMode:function(){this.readOnly&&(this.readOnly=!1),this.classic=!this.classic,this.btnName=this.classic?"Table":"Classic",this.dispName=this.classic?"Classic":"Table"},editable:function(){this.readOnly=!0,this.readOnly?this.$toaster.info("Edit Mode"):this.$toaster.info("Read Mode")},home:function(){this.$router.push("/success")}},filters:{"to-upperCase":function(t){return t.toUpperCase()}},mounted:function(){var t=this;localStorage.getItem("user")?(this.loading=!0,o.a.get("https://todolist-7be14.firebaseio.com/tasks.json").then(function(e){return Object.keys(e.data).map(function(n){var r=e.data[n];t.todos.push(r.val),t.loading=!1})}).catch(function(e){t.loading=!0})):this.$store.dispatch("logout").then(function(){t.$router.push("/logout")})},components:{"classic-todo":s.a,"table-todo":i.a,"person-loader":a.a}}},740:function(t,e,n){"use strict";e.a={props:["Todos","buttonname","upper"],data:function(){return{}},methods:{del:function(t){this.$emit("del",t)}},filters:{"to-upperCase":function(t){return t.toUpperCase()}}}},741:function(t,e,n){"use strict";new Date;!function(){var t=document.createElement("script"),e=document.getElementsByTagName("script")[0];t.async=!0,t.src="https://embed.tawk.to/5d7669e177aa790be3332b6c/default",t.charset="UTF-8",t.setAttribute("crossorigin","*"),e.parentNode.insertBefore(t,e)}(),e.a={props:["Todos","buttonname","readOnly"],data:function(){return{updateVal:"",updateIndex:-1}},methods:{del:function(t){this.$emit("del",t)},save:function(t,e){this.$emit("update",t,e),this.updateIndex=-1},editMode:function(t){this.updateIndex=t,this.$emit("editable")},cancel:function(){this.updateIndex=-1}}}},774:function(t,e,n){var r=n(775);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(38)("02000f3f",r,!0,{})},775:function(t,e,n){e=t.exports=n(37)(!1),e.push([t.i,"#todo{position:relative;bottom:17%}.br{color:brown}.re{color:red}.react{color:#61dafb}#tableEmpty{color:blue}",""])},776:function(t,e,n){"use strict";var r=n(740),o=n(777),s=n(55),i=s(r.a,o.a,!1,null,null,null);e.a=i.exports},777:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("h2",[t._v("\n    You've currently selected\n    "),n("h2",{staticClass:"re"},[t._v(t._s(t.buttonname))])]),t._v(" "),t.Todos.length>0?n("ol",t._l(t.Todos,function(e,r){return n("li",{key:r},[n("b",[t._v("Task Name:")]),n("b",{staticClass:"re"},[t._v(t._s(t._f("to-upperCase")(e)))]),t._v(" "),n("b-button",{attrs:{variant:"outline-danger"},on:{click:function(e){return t.del(r)}}},[t._v("Delete")])],1)}),0):n("ol",[n("li",{staticStyle:{"font-size":"xx-large"},attrs:{id:"tableEmpty"}},[t._v("Completed Tasks")])])])},o=[],s={render:r,staticRenderFns:o};e.a=s},778:function(t,e,n){"use strict";var r=n(741),o=n(779),s=n(55),i=s(r.a,o.a,!1,null,null,null);e.a=i.exports},779:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("h2",[t._v("\n    You've currently selected "),n("span"),t._v(" "),n("h2",{staticClass:"re"},[t._v(t._s(t.buttonname))])]),t._v(" "),n("table",{staticClass:"w3-table-all w3-hoverable w3-centered"},[n("thead",[n("tr",{staticClass:"w3-red"},[n("th",[t._v("Task no.")]),t._v(" "),n("th",[t._v("Task")]),t._v(" "),n("th",[t._v("Action")])])]),t._v(" "),t.Todos.length>0?n("tbody",t._l(t.Todos,function(e,r){return n("tr",{key:r,staticStyle:{cursor:"pointer"}},[t.updateIndex!=r?[n("td",[t._v(t._s(r+1)+".")]),t._v(" "),n("td",[t._v(t._s(e))]),t._v(" "),n("td",[n("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"material-icons",attrs:{title:"click to edit"},on:{click:function(e){return t.editMode(r)}}},[t._v("create")]),t._v(" "),n("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"material-icons",attrs:{title:"click to delete"},on:{click:function(e){return t.del(r)}}},[t._v("delete")])])]:[t.readOnly?[n("td",[t._v(t._s(r+1))]),t._v(" "),n("td",[n("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:e},on:{input:function(e){t.updateVal=e.target.value}}})]),t._v(" "),n("td",[n("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"material-icons",attrs:{title:"click to save"},on:{click:function(e){return t.save(t.updateVal,r)}}},[t._v("save")]),t._v(" "),n("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"material-icons",attrs:{title:"click to cancel"},on:{click:function(e){return t.cancel(r)}}},[t._v("cancel")])])]:t._e()]],2)}),0):[n("tbody",[n("tr",{attrs:{id:"tableEmpty"}},[n("td",{attrs:{colspan:"3"}},[t._v("\n            Completed Tasks.\n          ")])])])]],2)])},o=[],s={render:r,staticRenderFns:o};e.a=s},780:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{id:"todo"}},[n("h2",[t._v("To-do List")]),t._v(" "),n("div",[t.loading?n("div",[n("person-loader")],1):t._e(),t._v(" "),t.loading?t._e():n("div",[n("v-container",{attrs:{fluid:"","grid-list-md":""}},[n("v-text-field",{attrs:{box:"",type:"text",placeholder:"add something...",required:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.add(t.addVal)}},model:{value:t.addVal,callback:function(e){t.addVal=e},expression:"addVal"}}),t._v(" "),n("span",[n("b-button",{attrs:{variant:"outline-danger"},on:{click:function(e){return e.preventDefault(),t.add(t.addVal)}}},[t._v("Add")])],1),t._v(" "),n("div",[n("select",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticStyle:{border:"ridge"},attrs:{label:"delete"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.val=e.target.multiple?n:n[0]}}},[n("option",{staticClass:"form-control",attrs:{disabled:"",value:""}},[t._v("\n              Select task name")]),t._v(" "),t._l(t.todos,function(e,r){return n("option",{key:r,staticClass:"form-control"},[t._v("\n              "+t._s(e)+"\n            ")])})],2),t._v(" "),n("span",{staticStyle:{position:"absolute",cursor:"pointer"}},[n("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"material-icons",attrs:{title:"click to delete"},on:{click:function(e){return t.del(t.val)}}},[t._v("delete")])])]),t._v(" "),n("b-button",{attrs:{variant:"outline-primary"},on:{click:t.classicMode}},[t._v("Switch to "+t._s(t.btnName))]),t._v(" "),t.todos.length>0?n("h3",{staticClass:"br"},[t._v("\n          You've got "+t._s(t.todos.length)+" thing(s) to-do\n        ")]):n("h2",{staticClass:"re"},[t._v("You got everything done!!")]),t._v(" "),t.classic?n("div",[n("classic-todo",{attrs:{Todos:t.todos,buttonname:t.dispName},on:{del:t.del}})],1):n("div",[n("table-todo",{attrs:{Todos:t.todos,buttonname:t.dispName,readOnly:t.readOnly},on:{update:t.update,del:t.del,editable:t.editable}})],1),t._v(" "),n("b-button",{on:{click:t.home}},[t._v("Back to Home")])],1)],1)])])},o=[],s={render:r,staticRenderFns:o};e.a=s}});
//# sourceMappingURL=3.build.js.map