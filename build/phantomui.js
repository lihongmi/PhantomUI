!function(t){"use strict";t.Class={create:function(t,e){function n(){this.init.apply(this,arguments)}if(1===arguments.length&&(e=t,t=Object),"function"!=typeof t)throw new Error("superclass must be fun");var i=t.prototype,r=e.statics;delete e.statics,n.prototype=Object.create(i),n._super=i,n.prototype.constructor=n,"function"!=typeof n.prototype.init&&(n.prototype.init=function(){t.apply(this,arguments)});for(var s in e)n.prototype[s]=e[s];n.statics={};for(var s in r)n.statics[s]=r[s];return n}}}(this),function(t){"use strict";t.CONST_ATTR_KEYS=["value","setter","getter"],t.CONST_ATTR_ERROR="SET ATTR ERROR";var e=Class.create({_bubbles:!0,init:function(t,e){this.target=t,this.type=e},stopPropagation:function(){this._bubbles=!1}}),n=Class.create({init:function(t){this._initAttrs(t)},destroy:function(){this.off();for(var t in this)this.hasOwnProperty(t)&&delete this[t];this.destroy=function(){}},on:function(t,e,n){var i;if(this._events=this._events||{},"function"!=typeof e||void 0===e)return console.warn("fail on subscribe: callback is error"),this;for(t=t.split(/\s+/);i=t.shift();)i&&(this._events[i]=this._events[i]||[],this._events[i].push([e,n]));return this},off:function(t,e){var n;if(!t)return delete this._events,this;for(t=t.split(/\s+/);n=t.shift();)if(n){var i=this._events[n];if(e){if(i)for(var r=0,s=i.length;s>r;r++)i[r][0]===e&&i.splice(r,1)}else delete this._events[n]}return this},trigger:function(t){var n,i=this;if(this._events=this._events||{},!t)return console.warn("EventError : there must be an event"),!1;for(t=t.split(/\s+/);n=t.shift();)if(n){var r=this._events[n],s=new e(i,n);if(r)for(var a=0,o=r.length;o>a;a++){var l=r[a][0],u=r[a][1]||i,c=arguments[1]?arguments[1]:[];if(c.unshift(s),l.apply(u,c),s._bubbles===!1)break}}return!0},_initAttrs:function(t){for(var e,n=this,r={},s=n.constructor.prototype,a=[];s&&!$.isEmptyObject(s);)a.push(s),s=s.constructor._super;for(;s=a.pop();){e=i.normalizeAttr(s.attrs||{});for(var o in e)e[o].attrMerge?r[o]=$.extend(!0,{},r[o],e[o]):r[o]=e[o]}t=t||{},r=$.extend(!0,{},r,i.normalizeAttr(t)),n.attrs=r},set:function(t,e,n){var r=this,s={},a=this.attrs;"string"==typeof t?s[t]=e:(s=t,n=e),n=n||{};for(var t in s){var o=t.split("."),l=o[0],u=o.length>1,c=a[l];if(!c)return!1;if(u){var h=i.getProperty(c.value,o.slice(1,-1).join("."));if(void 0===h||!$.isPlainObject(h))return!1;var f=$.extend({},c.value);h=i.getProperty(f,o.slice(1,-1).join(".")),h[o[o.length-1]]=s[t],s[t]=f}if(c.setter&&"function"==typeof c.setter&&(s[t]=c.setter.call(r,s[t],t,n.data),s[t]===CONST_ATTR_ERROR))return!1;n.merge&&(s[t]=$.extend(!0,{},c,{value:s[t]}).value),c=c.value,a[l].value=s[t],n.event||(r.trigger("change:"+l,[r.get(l),c,t,n.data]),r.trigger("change:*",[r.get(l),c,t,n.data]))}return!0},get:function(t){var e=this;if(t){var n=t.split(".");if(!e.attrs.hasOwnProperty(n[0]))return!1;var r=e.attrs[n[0]],s=r.value;return r.getter&&(s=r.getter.call(e,s,t)),s=i.getProperty(s,n.slice(1).join(".")),s===CONST_ATTR_ERROR&&(s=void 0),s}var a={};for(var t in e.attrs)a[t]=e.get(t);return a}});t.Base=n;var i={getProperty:function(t,e){for(var n=e?e.split("."):[],i=0,r=n.length;r>i;i++){if(void 0===t)return;t=t[n[i]]}return t},normalizeAttr:function(t){var e={};for(var n in t){var r=t[n];$.isPlainObject(t[n])&&i.hasOwnProperty(t[n],CONST_ATTR_KEYS)||(t[n]={value:r}),e[n]=t[n]}return e},hasOwnProperty:function(t,e){var n=!1;return $.each(e,function(e,i){t.hasOwnProperty(i)&&(n=!0)}),n}}}(this),function(t){var e={},n=".widget-",i=Class.create(Base,{element:null,$element:null,events:null,attrs:{id:null,className:null,style:null,parentNode:document.body,template:"<div></div>"},init:function(t){t=this._parseConfig(t),i._super.init.call(this,t),this._initTemplate(),this._parseElement(),this._stamp(),this.delegateEvents(),this.setup()},_initTemplate:function(){},_parseConfig:function(t){t=t||{},this.element=t.element,delete t.element,this.events=$.extend(this.events||{},t.events),delete t.events;var e=r.parseDataApi(this.element);return t=$.extend({},e,t)},_parseElement:function(){this.element||(this._isTemplate=!0),this.$element=this.element?$(this.element):$(this.get("template")),this.element=this.$element[0]},_stamp:function(){var t=this.uuid=r.getUuid();e[t]=this,this.$element.attr("data-widget-id",t)},delegateEvents:function(t,e,n){var i=this;if(0===arguments.length)e=i.events,t=i.element;else if(1==arguments.length)e=t,t=i.element;else if(2===arguments.length){if(!$.isPlainObject(e)){var s={};s[t]=e,e=s,t=i.element}}else if(3===arguments.length){var s={};s[e]=n,e=s}return t!=this.element&&(this.delegateElements||(this.delegateElements=[]),this.delegateElements.push($(t))),t=$(t),e&&$.each(e,function(e,n){var s,a=r.parseEventKey(i,e);"string"==typeof n?s=function(t){i[n](t)}:"function"==typeof n&&(s=function(t){n.call(i,t)}),t.on(a.type,a.selector,s)}),this},undelegateEvents:function(t,e){if(0===arguments.length){var i=this.uuid;this.$element.off(n+i),this.delegateElements&&$.each(this.delegateElements,function(t,e){e.off(n+i)})}else{1===arguments.length&&(r.contain(document.documentElement,$(t)[0])||(e=t,t=this.element)),t=$(t);var s=e&&r.parseEventKey(this,e);s?t.off(s.type,s.selector):t.off(n+this.uuid)}return this},setup:function(){},render:function(){this.rendered||(this._renderAndBindAttrs(),this.rendered=!0);var t=this.get("parentNode");return t&&!r.contain(document.documentElement,this.element)&&this.$element.appendTo(t),this},destroy:function(){this.undelegateEvents(),delete e[this.uuid],this.$element&&this._isTemplate&&(this.$element.off(),this.$element.remove()),this.element=null,i._super.destroy.call(this)},_renderAndBindAttrs:function(){var t=this;$.each(t,function(e,n){var i=e.match(/^_onRender([A-Z](.)*)/);if(i){var s=r.firstLetterToLc(i[1]);t.on("change:"+s,n);var a=t.get(s);void 0!==a&&null!==a&&t.trigger("change:"+s,[a,void 0,s])}})},_onRenderId:function(t,e){this.$element.attr("id",e)},_onRenderClassName:function(t,e,n){n&&this.$element.removeClass(n),this.$element.addClass(e)},_onRenderStyle:function(t,e,n){this.$element.css(e)},statics:{query:function(t){var n=parseInt($(t).attr("data-widget-id"));return e[n]}}});i.query=function(t){var n=[];return $(t).each(function(t,i){var r=parseInt($(i).attr("data-widget-id"),10);n.push(e[r])}),n};var r={uuid:0,getUuid:function(){return r.uuid++},parseDataApi:function(t){var e={},n=$(t);if(n[0]&&"on"==n.data("api")){var i=n[0].dataset||n.data();for(var s in i){var a=t.data(s);s=r.camelize(s),e[s]=r.normalizeData(a)}return e}},camelize:function(t){return t=t.replace(/-([a-z])/g,function(){return arguments[1].toUpperCase()})},normalizeData:function(t){return/^\s*[\[{].*[\]}]\s*$/.test(t)&&(t=t.replace(/'/g,'"'),t=JSON.parse(t)),t},parseEventKey:function(t,e){var i={},r=e.match(/^(\S+)\s*(.*)$/);return i.type=r[1]+n+t.uuid,i.selector=r[2].replace(/{\$(.*)}/,function(){return t.get(arguments[1])}),i},firstLetterToLc:function(t){return t.charAt(0).toLowerCase()+t.substring(1)},contain:function(t,e){return t.contains?t!=e&&t.contains(e):!!(16&t.compareDocumentPosition(e))}};t.Widget=i}(this);