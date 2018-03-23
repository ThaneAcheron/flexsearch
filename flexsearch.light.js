/*
 FlexSearch v0.2.44
 Copyright 2018 Thomas Wilkerling
 Released under the Apache 2.0 Licence
 https://github.com/nextapps-de/flexsearch
*/
'use strict';(function(d,u,p){var q;(q=p.define)&&q.amd?q([],function(){return u}):(q=p.modules)?q[d.toLowerCase()]=u:"undefined"!==typeof module?module.exports=u:p[d]=u})("FlexSearch",function(){function d(a){"string"===typeof a&&(a=A[a]);a||(a=x);this.id=a.id||E++;this.init(a);u(this,"index",function(){return this.a});u(this,"length",function(){return Object.keys(this.a).length})}function u(a,b,c){Object.defineProperty(a,b,{get:c})}function p(a){return new RegExp(a,"g")}function q(a,b,c){if("undefined"===
typeof c){for(c=0;c<b.length;c+=2)a=a.replace(b[c],b[c+1]);return a}return a.replace(b,c)}function v(a,b,c,l,g,h,e){if("undefined"===typeof b[c]){var f=g?(9-(e||6))*h+(e||6)*g:h;b[c]=f;f>=e&&(a=a[f+.5|0],a=a[c]||(a[c]=[]),a[a.length]=l)}return f||b[c]}function z(a,b){if(a)for(var c=Object.keys(a),l=0,g=c.length;l<g;l++){var h=c[l],e=a[h];if(e)for(var f=0,k=e.length;f<k;f++)if(e[f]===b){1===k?delete a[h]:e.splice(f,1);break}else"object"===typeof e[f]&&z(e[f],b)}}function B(a){var b=[];if(!a)return b;
for(var c=0,l=0,g=0,h="",e=a.length,f=0;f<e;f++){var k=a[f];"a"===k||"e"===k||"i"===k||"o"===k||"u"===k||"y"===k?c++:l++;" "!==k&&(h+=k);if(" "===k||c>=(8<e?2:1)&&2<=l||2<=c&&l>=(8<e?2:1)||f===e-1)h&&(b[g]&&2<h.length&&g++,b[g]=b[g]?b[g]+h:h," "===k&&g++,h=""),l=c=0}return b}function F(a,b){a=a.length-b.length;return 0>a?1:0<a?-1:0}function G(a,b){a=a.length-b.length;return 0>a?-1:0<a?1:0}function H(a,b){var c=[],l=a.length;if(1<l){a.sort(G);for(var g={},h=a[0],e=h.length,f=0;f<e;)g[h[f++]]=1;for(var k,
C=0,n=1;n<l;){var d=!1;h=a[n];e=h.length;for(f=0;f<e;)if(g[k=h[f++]]===n){if(n===l-1&&(c[C++]=k,b&&C===b)){d=!1;break}d=!0;g[k]=n+1}if(!d)break;n++}}else if(l&&(c=a[0],b&&c.length>b))return c.slice(0,b);return c}var x={encode:"icase",mode:"ngram",cache:!1,async:!1,m:!1,threshold:0,depth:0},A={memory:{encode:"extra",mode:"strict",threshold:7},speed:{encode:"icase",mode:"strict",threshold:7,depth:2},match:{encode:"extra",mode:"full"},score:{encode:"extra",mode:"strict",threshold:5,depth:4},balance:{encode:"balance",
mode:"ngram",threshold:6,depth:3},fastest:{encode:"icase",mode:"strict",threshold:9,depth:1}},w=[],E=0,D=p("[ -/]");d.new=function(a){return new this(a)};d.create=function(a){return d.new(a)};d.addMatcher=function(a){for(var b in a)a.hasOwnProperty(b)&&(w[w.length]=p(b),w[w.length]=a[b]);return this};d.register=function(a,b){y[a]=b;return this};d.encode=function(a,b){return y[a].call(y,b)};d.prototype.init=function(a){this.h=[];a||(a=x);var b=a.profile;b=b?A[b]:{};this.mode=a.mode||b.mode||this.mode||
x.mode;this.threshold=a.threshold||b.threshold||this.threshold||x.threshold;this.depth=a.depth||b.depth||this.depth||x.depth;this.i=(b=a.encode||b.encode)&&y[b]||("function"===typeof b?b:this.i||!1);(b=a.matcher)&&this.addMatcher(b);this.f=[{},{},{},{},{},{},{},{},{},{}];this.b={};this.a={};this.c="";this.g=!0;return this};d.prototype.encode=function(a){a&&w.length&&(a=q(a,w));a&&this.h.length&&(a=q(a,this.h));a&&this.i&&(a=this.i.call(y,a));if(a&&this.j){a=a.split(" ");for(var b=0;b<a.length;b++){var c=
this.j[a[b]];c&&(a[b]=c)}a=a.join(" ")}a&&this.l&&(a=q(a,this.l));return a};d.prototype.addMatcher=function(a){var b=this.h,c;for(c in a)a.hasOwnProperty(c)&&(b[b.length]=p(c),b[b.length]=a[c]);return this};d.prototype.add=function(a,b,c){if("string"===typeof b&&b&&(a||0===a))if(this.a[a]&&!c)this.update(a,b);else{b=this.encode(b);if(!b.length)return this;c=this.mode;b="function"===typeof c?c(b):"ngram"===c?B(b):b.split(D);for(var l={_ctx:{}},g=this.threshold,h=this.depth,e=this.f,f=b.length,k=0;k<
f;k++){var d=b[k];if(d){var n=d.length,p=(f-k)/f;switch(c){case "reverse":case "both":for(var r="",m=n-1;1<=m;m--)r=d[m]+r,v(e,l,r,a,(n-m)/n,p,g);case "forward":r="";for(m=0;m<n;m++)r+=d[m],v(e,l,r,a,1,p,g);break;case "full":for(m=0;m<n;m++)for(var q=(n-m)/n,t=n;t>m;t--)r=d.substring(m,t),v(e,l,r,a,q,p,g);break;default:if(m=v(e,l,d,a,1,p,g),h&&1<f&&m>=g)for(n=l._ctx[d]||(l._ctx[d]={}),d=this.b[d]||(this.b[d]=[{},{},{},{},{},{},{},{},{},{}]),m=k-h,t=k+h+1,0>m&&(m=0),t>f&&(t=f);m<t;m++)m!==k&&v(d,n,
b[m],a,0,10-(m<k?k-m:m-k),g)}}}this.a[a]="1";this.g=!1}return this};d.prototype.update=function(a,b){this.a[a]&&b&&"string"===typeof b&&(this.remove(a),this.add(a,b,!0));return this};d.prototype.remove=function(a){if(this.a[a]){for(var b=0;10>b;b++)z(this.f[b],a);this.depth&&z(this.b,a);delete this.a[a];this.g=!1}return this};d.prototype.search=function(a,b,c){var l=[];if(a&&"object"===typeof a){c=a.callback||b;b=a.limit;var d=a.threshold;a=a.query}d=(d||this.threshold||0)|0;"function"===typeof b?
(c=b,b=1E3):b||(b=1E3);if(c){var h=this;I(function(){c(h.search(a,b));h=null},1,"search-"+this.id);return null}if(!a||"string"!==typeof a)return l;if(!this.g)this.g=!0;else if(this.c&&0===a.indexOf(this.c))return l;var e=this.encode(a);if(!e.length)return l;var f=this.mode;e="function"===typeof f?f(e):"ngram"===f?B(e):e.split(D);f=e.length;var k=!0,p=[],n={};if(1<f)if(this.depth){var q=!0,r=e[0];n[r]="1"}else e.sort(F);var m;if(!q||(m=this.b)[r])for(var u=q?1:0;u<f;u++){var t=e[u];if(t&&!n[t]){for(var w,
x=!1,v=[],y=0,z=9;z>=d;z--)if(w=(q?m[r]:this.f)[z][t])v[y++]=w,x=!0;if(x)p[p.length]=1<y?p.concat.apply([],v):v[0];else{k=!1;break}n[t]="1"}r=t}else k=!1;k&&(l=H(p,b));l.length?this.c="":this.c||(this.c=a);return l};d.prototype.reset=function(){this.destroy();return this.init()};d.prototype.destroy=function(){this.j=this.l=this.f=this.b=this.a=null;return this};var y={icase:function(a){return a.toLowerCase()},balance:function(){var a=[p("[-/]")," ",p("[^a-z0-9 ]"),"",p("\\s\\s+")," "];return function(b){b=
q(b.toLowerCase(),a);for(var c="",d="",g="",h=0;h<b.length;h++){var e=b[h];if(e!==d)if(h&&"h"===e){if(g="a"===g||"e"===g||"i"===g||"o"===g||"u"===g||"y"===g,("a"===d||"e"===d||"i"===d||"o"===d||"u"===d||"y"===d)&&g||" "===d)c+=e}else c+=e;g=h===b.length-1?"":b[h+1];d=e}return c}}()},I=null;return d}(!1),this);
