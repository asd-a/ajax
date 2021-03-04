(function webpackUniversalModuleDefinition(a,b){if(typeof exports==="object"&&typeof module==="object"){module.exports=b(require("katex"))}else{if(typeof define==="function"&&define.amd){define(["katex"],b)}else{if(typeof exports==="object"){exports.renderMathInElement=b(require("katex"))}else{a.renderMathInElement=b(a.katex)}}}})((typeof self!=="undefined"?self:this),function(a){return(function(b){var c={};function d(f){if(c[f]){return c[f].exports}var e=c[f]={i:f,l:false,exports:{}};b[f].call(e.exports,e,e.exports,d);e.l=true;return e.exports}d.m=b;d.c=c;d.d=function(f,g,e){if(!d.o(f,g)){Object.defineProperty(f,g,{enumerable:true,get:e})}};d.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})};d.t=function(g,h){if(h&1){g=d(g)}if(h&8){return g}if((h&4)&&typeof g==="object"&&g&&g.__esModule){return g}var f=Object.create(null);d.r(f);Object.defineProperty(f,"default",{enumerable:true,value:g});if(h&2&&typeof g!="string"){for(var e in g){d.d(f,e,function(k){return g[k]}.bind(null,e))}}return f};d.n=function(f){var e=f&&f.__esModule?function g(){return f["default"]}:function h(){return f};d.d(e,"a",e);return e};d.o=function(e,f){return Object.prototype.hasOwnProperty.call(e,f)};d.p="";return d(d.s=1)})([(function(c,b){c.exports=a}),(function(h,n,g){g.r(n);var e=g(0);var q=g.n(e);var c=[];var d=function d(t,z,y){var u=y;var x=0;var w=t.length;while(u<z.length){var v=z[u];if(x<=0&&z.slice(u,u+w)===t){return u}else{if(v==="\\"){u++}else{if(v==="{"){x++}else{if(v==="}"){x--}}}}u++}return -1};var s=function s(w,x,B,A){var u=[];for(var y=0;y<w.length;y++){if(w[y].type==="text"){var C=w[y].data;var v=true;var t=0;var z=void 0;z=C.indexOf(x);if(z!==-1){t=z;u.push({type:"text",data:C.slice(0,t)});v=false}while(true){if(v){z=C.indexOf(x,t);if(z===-1){break}u.push({type:"text",data:C.slice(t,z)});t=z}else{z=d(B,C,t+x.length);if(z===-1){break}u.push({type:"math",data:C.slice(t+x.length,z),rawData:C.slice(t,z+B.length),display:A});t=z+B.length}v=!v}u.push({type:"text",data:C.slice(t)})}else{u.push(w[y])}}return u};var l=(s);var b=function r(x,w){var v=[{type:"text",data:x}];for(var u=0;u<w.length;u++){var t=w[u];v=l(v,t.left,t.right,t.display||false)}return v};var m=function k(A,t){var y=b(A,t.delimiters);if(y.length===1&&y[0].type==="text"){return null}var u=document.createDocumentFragment();for(var v=0;v<y.length;v++){if(y[v].type==="text"){u.appendChild(document.createTextNode(y[v].data))}else{var w=document.createElement("span");var x=y[v].data;t.displayMode=y[v].display;let cachable=false;for(let j=0;j<c.length;j++){if(t.displayMode===c[j][1]&&c[j][0]===y[v].data){cachable=true;c[j][2]=c[j][2].cloneNode(true);u.appendChild(c[j][2]);c[j][3]=true;break}}if(!cachable){var w=document.createElement("span");try{q.a.render(y[v].data,w,t);c.push([y[v].data,t.displayMode,w,true])}catch(z){if(!(z instanceof q.a.ParseError)){throw z}t.errorCallback("KaTeX auto-render: Failed to parse `"+y[v].data+"` with ",z);u.appendChild(document.createTextNode(y[v].rawData));continue}u.appendChild(w)}}}return u};var p=function p(w,t){for(var v=0;v<w.childNodes.length;v++){var u=w.childNodes[v];if(u.nodeType===3){var x=m(u.textContent,t);if(x){v+=x.childNodes.length-1;w.replaceChild(x,u)}}else{if(u.nodeType===1){(function(){var y=" "+u.className+" ";var z=t.ignoredTags.indexOf(u.nodeName.toLowerCase())===-1&&t.ignoredClasses.every(function(A){return y.indexOf(" "+A+" ")===-1});if(z){p(u,t)}})()}}}};var f=function f(w,u){if(!w){throw new Error("No element provided to render")}var t={};for(var v in u){if(u.hasOwnProperty(v)){t[v]=u[v]}}t.delimiters=t.delimiters||[{left:"$$",right:"$$",display:true},{left:"\\(",right:"\\)",display:false},{left:"\\[",right:"\\]",display:true}];t.ignoredTags=t.ignoredTags||["script","noscript","style","textarea","pre","code","option"];t.ignoredClasses=t.ignoredClasses||[];t.errorCallback=t.errorCallback||console.error;t.macros=t.macros||{};for(let i=0;i<c.length;i++){if(!c[i][3]){c.splice(i,1);i--}else{c[i][3]=false}}p(w,t)};var o=n["default"]=(f)})])["default"]});
