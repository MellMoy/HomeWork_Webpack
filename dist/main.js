/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('\n\n/* eslint-env browser */\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\n\n/** @typedef {any} TODO */\n\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === "undefined";\nvar forEach = Array.prototype.forEach;\n\n/**\n * @param {function} fn\n * @param {number} time\n * @returns {(function(): void)|*}\n */\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    // @ts-ignore\n    var self = this;\n    // eslint-disable-next-line prefer-rest-params\n    var args = arguments;\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n    clearTimeout(timeout);\n\n    // @ts-ignore\n    timeout = setTimeout(functionCall, time);\n  };\n}\nfunction noop() {}\n\n/**\n * @param {TODO} moduleId\n * @returns {TODO}\n */\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n  if (!src) {\n    if (document.currentScript) {\n      src = ( /** @type {HTMLScriptElement} */document.currentScript).src;\n    } else {\n      var scripts = document.getElementsByTagName("script");\n      var lastScriptTag = scripts[scripts.length - 1];\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n    srcByModuleId[moduleId] = src;\n  }\n\n  /**\n   * @param {string} fileMap\n   * @returns {null | string[]}\n   */\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n    if (!filename) {\n      return [src.replace(".js", ".css")];\n    }\n    if (!fileMap) {\n      return [src.replace(".js", ".css")];\n    }\n    return fileMap.split(",").map(function (mapRule) {\n      var reg = new RegExp("".concat(filename, "\\\\.js$"), "g");\n      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));\n    });\n  };\n}\n\n/**\n * @param {TODO} el\n * @param {string} [url]\n */\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    }\n\n    // eslint-disable-next-line\n    url = el.href.split("?")[0];\n  }\n  if (!isUrlRequest( /** @type {string} */url)) {\n    return;\n  }\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn\'t loaded yet.\n    // We\'re probably changing the same file more than once.\n    return;\n  }\n  if (!url || !(url.indexOf(".css") > -1)) {\n    return;\n  }\n\n  // eslint-disable-next-line no-param-reassign\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener("load", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener("error", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = "".concat(url, "?").concat(Date.now());\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n\n/**\n * @param {string} href\n * @param {TODO} src\n * @returns {TODO}\n */\nfunction getReloadUrl(href, src) {\n  var ret;\n\n  // eslint-disable-next-line no-param-reassign\n  href = normalizeUrl(href);\n  src.some(\n  /**\n   * @param {string} url\n   */\n  // eslint-disable-next-line array-callback-return\n  function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\n/**\n * @param {string} [src]\n * @returns {boolean}\n */\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n  var elements = document.querySelectorAll("link");\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n    var url = getReloadUrl(el.href, src);\n    if (!isUrlRequest(url)) {\n      return;\n    }\n    if (el.visited === true) {\n      return;\n    }\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\nfunction reloadAll() {\n  var elements = document.querySelectorAll("link");\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n    updateCss(el);\n  });\n}\n\n/**\n * @param {string} url\n * @returns {boolean}\n */\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n\n  // It is not http or https\n  if (!/^[a-zA-Z][a-zA-Z\\d+\\-.]*:/.test(url)) {\n    return false;\n  }\n  return true;\n}\n\n/**\n * @param {TODO} moduleId\n * @param {TODO} options\n * @returns {TODO}\n */\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log("no window.document found, will not HMR CSS");\n    return noop;\n  }\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n    if (options.locals) {\n      console.log("[HMR] Detected local css modules. Reload all css");\n      reloadAll();\n      return;\n    }\n    if (reloaded) {\n      console.log("[HMR] css reload %s", src.join(" "));\n    } else {\n      console.log("[HMR] Reload all css");\n      reloadAll();\n    }\n  }\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack://webpack/./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?')},"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":module=>{eval('\n\n/* eslint-disable */\n\n/**\n * @param {string[]} pathComponents\n * @returns {string}\n */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case "..":\n        accumulator.pop();\n        break;\n      case ".":\n        break;\n      default:\n        accumulator.push(item);\n    }\n    return accumulator;\n  }, /** @type {string[]} */[]).join("/");\n}\n\n/**\n * @param {string} urlString\n * @returns {string}\n */\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";\n  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");\n  var host = components[0].toLowerCase().replace(/\\.$/, "");\n  components[0] = "";\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack://webpack/./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?')},"./src/style.css":(module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      (function() {\n        var localsJsonString = undefined;\n        // 1722515458333\n        var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"esModule":true});\n        // only invalidate when locals change\n        if (\n          module.hot.data &&\n          module.hot.data.value &&\n          module.hot.data.value !== localsJsonString\n        ) {\n          module.hot.invalidate();\n        } else {\n          module.hot.accept();\n        }\n        module.hot.dispose(function(data) {\n          data.value = localsJsonString;\n          cssReload();\n        });\n      })();\n    }\n  \n\n//# sourceURL=webpack://webpack/./src/style.css?')},"./src/new.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");\n\nfunction sum(a, b) {\n    return a + b;\n}\ndocument.write(sum(4, 5).toString());\n\n\n//# sourceURL=webpack://webpack/./src/new.ts?')}},__webpack_module_cache__={},inProgress,dataWebpackPrefix;function __webpack_require__(e){var r=__webpack_module_cache__[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var n=__webpack_module_cache__[e]={id:e,exports:{}};try{var t={id:e,module:n,factory:__webpack_modules__[e],require:__webpack_require__};__webpack_require__.i.forEach((function(e){e(t)})),n=t.module,t.factory.call(n.exports,n,n.exports,t.require)}catch(e){throw n.error=e,e}return n.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.c=__webpack_module_cache__,__webpack_require__.i=[],__webpack_require__.hu=e=>e+"."+__webpack_require__.h()+".hot-update.js",__webpack_require__.miniCssF=e=>{},__webpack_require__.hmrF=()=>"main."+__webpack_require__.h()+".hot-update.json",__webpack_require__.h=()=>"93d92d87e9457d62b9e8",__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),inProgress={},dataWebpackPrefix="webpack:",__webpack_require__.l=(e,r,n,t)=>{if(inProgress[e])inProgress[e].push(r);else{var o,a;if(void 0!==n)for(var i=document.getElementsByTagName("script"),c=0;c<i.length;c++){var l=i[c];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")==dataWebpackPrefix+n){o=l;break}}o||(a=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,__webpack_require__.nc&&o.setAttribute("nonce",__webpack_require__.nc),o.setAttribute("data-webpack",dataWebpackPrefix+n),o.src=e),inProgress[e]=[r];var u=(r,n)=>{o.onerror=o.onload=null,clearTimeout(s);var t=inProgress[e];if(delete inProgress[e],o.parentNode&&o.parentNode.removeChild(o),t&&t.forEach((e=>e(n))),r)return r(n)},s=setTimeout(u.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=u.bind(null,o.onerror),o.onload=u.bind(null,o.onload),a&&document.head.appendChild(o)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e,r,n,t={},o=__webpack_require__.c,a=[],i=[],c="idle",l=0,u=[];function s(e){c=e;for(var r=[],n=0;n<i.length;n++)r[n]=i[n].call(null,e);return Promise.all(r).then((function(){}))}function _(){0==--l&&s("ready").then((function(){if(0===l){var e=u;u=[];for(var r=0;r<e.length;r++)e[r]()}}))}function d(e){if("idle"!==c)throw new Error("check() is only allowed in idle status");return s("check").then(__webpack_require__.hmrM).then((function(n){return n?s("prepare").then((function(){var t=[];return r=[],Promise.all(Object.keys(__webpack_require__.hmrC).reduce((function(e,o){return __webpack_require__.hmrC[o](n.c,n.r,n.m,e,r,t),e}),[])).then((function(){return r=function(){return e?f(e):s("ready").then((function(){return t}))},0===l?r():new Promise((function(e){u.push((function(){e(r())}))}));var r}))})):s(h()?"ready":"idle").then((function(){return null}))}))}function p(e){return"ready"!==c?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status (state: "+c+")")})):f(e)}function f(e){e=e||{},h();var t=r.map((function(r){return r(e)}));r=void 0;var o=t.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return s("abort").then((function(){throw o[0]}));var a=s("dispose");t.forEach((function(e){e.dispose&&e.dispose()}));var i,c=s("apply"),l=function(e){i||(i=e)},u=[];return t.forEach((function(e){if(e.apply){var r=e.apply(l);if(r)for(var n=0;n<r.length;n++)u.push(r[n])}})),Promise.all([a,c]).then((function(){return i?s("fail").then((function(){throw i})):n?f(e).then((function(e){return u.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):s("idle").then((function(){return u}))}))}function h(){if(n)return r||(r=[]),Object.keys(__webpack_require__.hmrI).forEach((function(e){n.forEach((function(n){__webpack_require__.hmrI[e](n,r)}))})),n=void 0,!0}__webpack_require__.hmrD=t,__webpack_require__.i.push((function(u){var f,h,m,b,w=u.module,v=function(r,n){var t=o[n];if(!t)return r;var i=function(i){if(t.hot.active){if(o[i]){var c=o[i].parents;-1===c.indexOf(n)&&c.push(n)}else a=[n],e=i;-1===t.children.indexOf(i)&&t.children.push(i)}else console.warn("[HMR] unexpected require("+i+") from disposed module "+n),a=[];return r(i)},u=function(e){return{configurable:!0,enumerable:!0,get:function(){return r[e]},set:function(n){r[e]=n}}};for(var d in r)Object.prototype.hasOwnProperty.call(r,d)&&"e"!==d&&Object.defineProperty(i,d,u(d));return i.e=function(e,n){return function(e){switch(c){case"ready":s("prepare");case"prepare":return l++,e.then(_,_),e;default:return e}}(r.e(e,n))},i}(u.require,u.id);w.hot=(f=u.id,h=w,b={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:m=e!==f,_requireSelf:function(){a=h.parents.slice(),e=m?void 0:f,__webpack_require__(f)},active:!0,accept:function(e,r,n){if(void 0===e)b._selfAccepted=!0;else if("function"==typeof e)b._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)b._acceptedDependencies[e[t]]=r||function(){},b._acceptedErrorHandlers[e[t]]=n;else b._acceptedDependencies[e]=r||function(){},b._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)b._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)b._declinedDependencies[e[r]]=!0;else b._declinedDependencies[e]=!0},dispose:function(e){b._disposeHandlers.push(e)},addDisposeHandler:function(e){b._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=b._disposeHandlers.indexOf(e);r>=0&&b._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,c){case"idle":r=[],Object.keys(__webpack_require__.hmrI).forEach((function(e){__webpack_require__.hmrI[e](f,r)})),s("ready");break;case"ready":Object.keys(__webpack_require__.hmrI).forEach((function(e){__webpack_require__.hmrI[e](f,r)}));break;case"prepare":case"check":case"dispose":case"apply":(n=n||[]).push(f)}},check:d,apply:p,status:function(e){if(!e)return c;i.push(e)},addStatusHandler:function(e){i.push(e)},removeStatusHandler:function(e){var r=i.indexOf(e);r>=0&&i.splice(r,1)},data:t[f]},e=void 0,b),w.parents=a,w.children=[],a=[],u.require=v})),__webpack_require__.hmrC={},__webpack_require__.hmrI={}})(),(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var r=__webpack_require__.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");if(n.length)for(var t=n.length-1;t>-1&&(!e||!/^http(s?):/.test(e));)e=n[t--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{if("undefined"!=typeof document){var e=(e,r,n,t,o)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",__webpack_require__.nc&&(a.nonce=__webpack_require__.nc);return a.onerror=a.onload=n=>{if(a.onerror=a.onload=null,"load"===n.type)t();else{var i=n&&n.type,c=n&&n.target&&n.target.href||r,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+": "+c+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=c,a.parentNode&&a.parentNode.removeChild(a),o(l)}},a.href=r,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},r=(e,r)=>{for(var n=document.getElementsByTagName("link"),t=0;t<n.length;t++){var o=(i=n[t]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===r))return i}var a=document.getElementsByTagName("style");for(t=0;t<a.length;t++){var i;if((o=(i=a[t]).getAttribute("data-href"))===e||o===r)return i}},n=[],t=[],o=e=>({dispose:()=>{for(var e=0;e<n.length;e++){var r=n[e];r.parentNode&&r.parentNode.removeChild(r)}n.length=0},apply:()=>{for(var e=0;e<t.length;e++)t[e].rel="stylesheet";t.length=0}});__webpack_require__.hmrC.miniCss=(a,i,c,l,u,s)=>{u.push(o),a.forEach((o=>{var a=__webpack_require__.miniCssF(o),i=__webpack_require__.p+a,c=r(a,i);c&&l.push(new Promise(((r,a)=>{var l=e(o,i,c,(()=>{l.as="style",l.rel="preload",r()}),a);n.push(c),t.push(l)})))}))}}})(),(()=>{var e,r,n,t,o,a=__webpack_require__.hmrS_jsonp=__webpack_require__.hmrS_jsonp||{main:0},i={};function c(r,n){return e=n,new Promise(((e,n)=>{i[r]=e;var t=__webpack_require__.p+__webpack_require__.hu(r),o=new Error;__webpack_require__.l(t,(e=>{if(i[r]){i[r]=void 0;var t=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;o.message="Loading hot update chunk "+r+" failed.\n("+t+": "+a+")",o.name="ChunkLoadError",o.type=t,o.request=a,n(o)}}))}))}function l(e){function i(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),a=o.id,i=o.chain,l=__webpack_require__.c[a];if(l&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:i,moduleId:a};if(l.hot._main)return{type:"unaccepted",chain:i,moduleId:a};for(var u=0;u<l.parents.length;u++){var s=l.parents[u],_=__webpack_require__.c[s];if(_){if(_.hot._declinedDependencies[a])return{type:"declined",chain:i.concat([s]),moduleId:a,parentId:s};-1===r.indexOf(s)&&(_.hot._acceptedDependencies[a]?(n[s]||(n[s]=[]),c(n[s],[a])):(delete n[s],r.push(s),t.push({chain:i.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function c(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}__webpack_require__.f&&delete __webpack_require__.f.jsonpHmr,r=void 0;var l={},u=[],s={},_=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var d in n)if(__webpack_require__.o(n,d)){var p,f=n[d],h=!1,m=!1,b=!1,w="";switch((p=f?i(d):{type:"disposed",moduleId:d}).chain&&(w="\nUpdate propagation: "+p.chain.join(" -> ")),p.type){case"self-declined":e.onDeclined&&e.onDeclined(p),e.ignoreDeclined||(h=new Error("Aborted because of self decline: "+p.moduleId+w));break;case"declined":e.onDeclined&&e.onDeclined(p),e.ignoreDeclined||(h=new Error("Aborted because of declined dependency: "+p.moduleId+" in "+p.parentId+w));break;case"unaccepted":e.onUnaccepted&&e.onUnaccepted(p),e.ignoreUnaccepted||(h=new Error("Aborted because "+d+" is not accepted"+w));break;case"accepted":e.onAccepted&&e.onAccepted(p),m=!0;break;case"disposed":e.onDisposed&&e.onDisposed(p),b=!0;break;default:throw new Error("Unexception type "+p.type)}if(h)return{error:h};if(m)for(d in s[d]=f,c(u,p.outdatedModules),p.outdatedDependencies)__webpack_require__.o(p.outdatedDependencies,d)&&(l[d]||(l[d]=[]),c(l[d],p.outdatedDependencies[d]));b&&(c(u,[p.moduleId]),s[d]=_)}n=void 0;for(var v,g=[],k=0;k<u.length;k++){var y=u[k],q=__webpack_require__.c[y];q&&(q.hot._selfAccepted||q.hot._main)&&s[y]!==_&&!q.hot._selfInvalidated&&g.push({module:y,require:q.hot._requireSelf,errorHandler:q.hot._selfAccepted})}return{dispose:function(){var e;t.forEach((function(e){delete a[e]})),t=void 0;for(var r,n=u.slice();n.length>0;){var o=n.pop(),i=__webpack_require__.c[o];if(i){var c={},s=i.hot._disposeHandlers;for(k=0;k<s.length;k++)s[k].call(null,c);for(__webpack_require__.hmrD[o]=c,i.hot.active=!1,delete __webpack_require__.c[o],delete l[o],k=0;k<i.children.length;k++){var _=__webpack_require__.c[i.children[k]];_&&((e=_.parents.indexOf(o))>=0&&_.parents.splice(e,1))}}}for(var d in l)if(__webpack_require__.o(l,d)&&(i=__webpack_require__.c[d]))for(v=l[d],k=0;k<v.length;k++)r=v[k],(e=i.children.indexOf(r))>=0&&i.children.splice(e,1)},apply:function(r){for(var n in s)__webpack_require__.o(s,n)&&(__webpack_require__.m[n]=s[n]);for(var t=0;t<o.length;t++)o[t](__webpack_require__);for(var a in l)if(__webpack_require__.o(l,a)){var i=__webpack_require__.c[a];if(i){v=l[a];for(var c=[],_=[],d=[],p=0;p<v.length;p++){var f=v[p],h=i.hot._acceptedDependencies[f],m=i.hot._acceptedErrorHandlers[f];if(h){if(-1!==c.indexOf(h))continue;c.push(h),_.push(m),d.push(f)}}for(var b=0;b<c.length;b++)try{c[b].call(null,v)}catch(n){if("function"==typeof _[b])try{_[b](n,{moduleId:a,dependencyId:d[b]})}catch(t){e.onErrored&&e.onErrored({type:"accept-error-handler-errored",moduleId:a,dependencyId:d[b],error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"accept-errored",moduleId:a,dependencyId:d[b],error:n}),e.ignoreErrored||r(n)}}}for(var w=0;w<g.length;w++){var k=g[w],y=k.module;try{k.require(y)}catch(n){if("function"==typeof k.errorHandler)try{k.errorHandler(n,{moduleId:y,module:__webpack_require__.c[y]})}catch(t){e.onErrored&&e.onErrored({type:"self-accept-error-handler-errored",moduleId:y,error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"self-accept-errored",moduleId:y,error:n}),e.ignoreErrored||r(n)}}return u}}}self.webpackHotUpdatewebpack=(r,t,a)=>{for(var c in t)__webpack_require__.o(t,c)&&(n[c]=t[c],e&&e.push(c));a&&o.push(a),i[r]&&(i[r](),i[r]=void 0)},__webpack_require__.hmrI.jsonp=function(e,r){n||(n={},o=[],t=[],r.push(l)),__webpack_require__.o(n,e)||(n[e]=__webpack_require__.m[e])},__webpack_require__.hmrC.jsonp=function(e,i,u,s,_,d){_.push(l),r={},t=i,n=u.reduce((function(e,r){return e[r]=!1,e}),{}),o=[],e.forEach((function(e){__webpack_require__.o(a,e)&&void 0!==a[e]?(s.push(c(e,d)),r[e]=!0):r[e]=!1})),__webpack_require__.f&&(__webpack_require__.f.jsonpHmr=function(e,n){r&&__webpack_require__.o(r,e)&&!r[e]&&(n.push(c(e)),r[e]=!0)})},__webpack_require__.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(__webpack_require__.p+__webpack_require__.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})();var __webpack_exports__=__webpack_require__("./src/new.ts")})();