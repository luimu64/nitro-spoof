parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"../../moduleWrappers/goosemod/webpack.js":[function(require,module,exports) {
module.exports=goosemodScope.webpackModules;
},{}],"../../moduleWrappers/goosemod/patcher.js":[function(require,module,exports) {
module.exports=goosemodScope.patcher;
},{}],"../../moduleWrappers/goosemod/settings.js":[function(require,module,exports) {
module.exports=goosemodScope.settings;
},{}],"utils.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("@goosemod/webpack");function e(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=n(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return u=t.done,t},e:function(t){l=!0,a=t},f:function(){try{u||null==r.return||r.return()}finally{if(l)throw a}}}}function n(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var o=(0,t.findByProps)("getCustomEmojiById"),i=o.getCustomEmojiById,a=(0,t.findByProps)("getLastSelectedGuildId"),u=a.getLastSelectedGuildId;function l(t,n){var r,o=[],a=e(t.matchAll(/<a?:(\w+):(\d+)>/gi));try{for(a.s();!(r=a.n()).done;){var l=r.value,s=i(l[2]);(s.guildId!=u()||s.animated||c())&&(t=t.replace(l[0],""),o.push(s.url.split("?")[0]+"?size=".concat(n)))}}catch(d){a.e(d)}finally{a.f()}return{content:t.trim(),emojis:o}}function c(){return document.querySelector('[data-list-item-id="guildsnav___home"]').classList.contains("selected-bZ3Lue")}function s(t,e){var n=l(e[1].content,t);return e[1].content=n.content,n.emojis.length>0&&(e[1].content+="\n"+n.emojis.join("\n")),e[1].invalidEmojis=[],e}var d=s;exports.default=d;
},{"@goosemod/webpack":"../../moduleWrappers/goosemod/webpack.js"}],"index.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("@goosemod/webpack"),t=u(require("@goosemod/patcher")),r=require("@goosemod/settings"),n=o(require("./utils"));function o(e){return e&&e.__esModule?e:{default:e}}function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}function u(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var a=o?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(n,u,a):n[u]=e[u]}return n.default=e,r&&r.set(e,n),n}function a(e,t){return p(e)||l(e,t)||s(e,t)||c()}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(e,t):void 0}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function l(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],u=!0,a=!1;try{for(r=r.call(e);!(u=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);u=!0);}catch(c){a=!0,o=c}finally{try{u||null==r.return||r.return()}finally{if(a)throw o}}return i}}function p(e){if(Array.isArray(e))return e}function d(e,t,r,n,o,i,u){try{var a=e[i](u),c=a.value}catch(s){return void r(s)}a.done?t(c):Promise.resolve(c).then(n,o)}function m(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var i=e.apply(t,r);function u(e){d(i,n,o,u,a,"next",e)}function a(e){d(i,n,o,u,a,"throw",e)}u(void 0)})}}var y={emojisize:"64"},v=(0,e.findByProps)("canUseEmojisEverywhere","canUseAnimatedEmojis"),h=(0,e.findByProps)("sendMessage"),g={animatedCheck:null,emojiCheck:null,sendMessage:null},j={goosemodHandlers:{onImport:function(){var e=m(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:g.emojiCheck=t.patch(v,"canUseEmojisEverywhere",function(){return!0}),g.animatedCheck=t.patch(v,"canUseAnimatedEmojis",function(){return!0}),g.sendMessage=t.patch(h,"sendMessage",function(e){null!=e[1].content.match(/<a?:(\w+):(\d+)>/i)&&(0,n.default)(y.emojisize,e)}),(0,r.createItem)("Nitro Spoof",["",{type:"text-input",text:"Emoji Size",initialValue:function(){return y.emojisize},oninput:function(e){y.emojisize=e}}]);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),getSettings:function(){return[y]},loadSettings:function(e){var t=a(e,1)[0];y=t},onRemove:function(){var e=m(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:Object.values(g).forEach(function(e){return e()}),(0,r.removeItem)("Nitro Spoof");case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()}};exports.default=j;
},{"@goosemod/webpack":"../../moduleWrappers/goosemod/webpack.js","@goosemod/patcher":"../../moduleWrappers/goosemod/patcher.js","@goosemod/settings":"../../moduleWrappers/goosemod/settings.js","./utils":"utils.js"}]},{},["index.js"], null);parcelRequire('index.js').default