
/*
	Captionator 0.6 [CaptionPlanet]
	Christopher Giffard, 2011
	Share and enjoy

	https://github.com/cgiffard/Captionator
*/

(function(){var w=10,B=16,F=4.5,G=1.5,K=[0,0,0,0.5],C=!1,f={};window.captionator=f;f.CaptionatorCueStructure=function(b,d){var a=this;this.isTimeDependent=!1;this.cueSource=b;this.options=d;this.processedCue=null;this.toString=function(f){if(!1!==d.processCueHTML){var c=function(b,d){if(null===a.processedCue){var g="",o,h;for(o in b)if(o.match(/^\d+$/)&&b.hasOwnProperty(o))if(h=b[o],h instanceof Object&&h.children&&h.children.length)"v"===h.token?g+='<q data-voice="'+h.voice.replace(/[\"]/g,"")+"\" class='voice speaker-"+
h.voice.replace(/[^a-z0-9]+/ig,"-").toLowerCase()+" webvtt-span' title=\""+h.voice.replace(/[\"]/g,"")+'">'+c(h.children,d+1)+"</q>":"c"===h.token?g+="<span class='webvtt-span webvtt-class-span "+h.classes.join(" ")+"'>"+c(h.children,d+1)+"</span>":0<h.timeIn?null===f||void 0===f||0<f&&f>=h.timeIn?g+="<span class='webvtt-span webvtt-timestamp-span' data-timestamp='"+h.token+"' data-timestamp-seconds='"+h.timeIn+"'>"+c(h.children,d+1)+"</span>":f<h.timeIn&&(g+="<span class='webvtt-span webvtt-timestamp-span webvtt-cue-future' style='opacity: 0;' data-timestamp='"+
h.token+"' data-timestamp-seconds='"+h.timeIn+"'>"+c(h.children,d+1)+"</span>"):g+=h.rawToken+c(h.children,d+1)+"</"+h.token+">";else if(h instanceof String||"string"===typeof h||"number"===typeof h)g+=h;!a.isTimeDependent&&0===d&&(a.processedCue=g);return g}return a.processedCue};return c(this,0)}return b};this.getPlain=function(a){if(!1!==d.processCueHTML){var f=function(b,d){var g="",o,h;for(o in b)if(o.match(/^\d+$/)&&b.hasOwnProperty(o))if(h=b[o],h instanceof Object&&h.children&&h.children.length)if(0<
h.timeIn){if(null===a||void 0===a||0<a&&a>=h.timeIn)g+=f(h.children,d+1)}else g+=f(h.children,d+1);else if(h instanceof String||"string"===typeof h||"number"===typeof h)g+=h;return g};return f(this,0)}return b.replace(/<[^>]*>/ig,"")}};f.CaptionatorCueStructure.prototype=[];f.TextTrack=function(b,d,a,e,c,k){this.onload=function(){};this.onerror=function(){};this.oncuechange=function(){};this.id=b||"";this.internalMode=f.TextTrack.OFF;this.cues=new f.TextTrackCueList(this);this.activeCues=new f.ActiveTextTrackCueList(this.cues,
this);this.kind=d||"subtitles";this.label=a||"";this.language=e||"";this.src=c||"";this.readyState=f.TextTrack.NONE;this.internalDefault=k||!1;this.getMode=function(){return this.internalMode};this.setMode=function(a){if(-1!==[f.TextTrack.OFF,f.TextTrack.HIDDEN,f.TextTrack.SHOWING].indexOf(a))a!==this.internalMode&&(this.internalMode=a,this.readyState===f.TextTrack.NONE&&0<this.src.length&&a>f.TextTrack.OFF&&this.loadTrack(this.src,null),this.videoNode._captionator_dirtyBit=!0,f.rebuildCaptions(this.videoNode),
a===f.TextTrack.OFF&&(this.cues.length=0,this.readyState=f.TextTrack.NONE));else throw Error("Illegal mode value for track: "+a);};this.getDefault=function(){return this.internalDefault};Object.prototype.__defineGetter__?(this.__defineGetter__("mode",this.getMode),this.__defineSetter__("mode",this.setMode),this.__defineGetter__("default",this.getDefault)):Object.defineProperty&&(Object.defineProperty(this,"mode",{get:this.getMode,set:this.setMode}),Object.defineProperty(this,"default",{get:this.getDefault}));
this.loadTrack=function(a,b){var d,c=new XMLHttpRequest;if(this.readyState===f.TextTrack.LOADED)b instanceof Function&&b(d);else{this.src=a;this.readyState=f.TextTrack.LOADING;var e=this;c.open("GET",a,!0);c.onreadystatechange=function(){if(4===c.readyState)if(200===c.status){var a=e.videoNode._captionatorOptions||{};"metadata"===e.kind&&(a.processCueHTML=!1,a.sanitiseCueHTML=!1);d=f.parseCaptions(c.responseText,a);e.readyState=f.TextTrack.LOADED;e.cues.loadCues(d);e.activeCues.refreshCues.apply(e.activeCues);
e.videoNode._captionator_dirtyBit=!0;f.rebuildCaptions(e.videoNode);e.onload.call(this);b instanceof Function&&b.call(e,d)}else e.readyState=f.TextTrack.ERROR,e.onerror()};try{c.send(null)}catch(k){e.readyState=f.TextTrack.ERROR,e.onerror(k)}}};this.addCue=function(a){if(a&&a instanceof f.TextTrackCue)this.cues.addCue(a);else throw Error("The argument is null or not an instance of TextTrackCue.");};this.removeCue=function(){}};f.TextTrack.NONE=0;f.TextTrack.LOADING=1;f.TextTrack.LOADED=2;f.TextTrack.ERROR=
3;f.TextTrack.OFF=0;f.TextTrack.HIDDEN=1;f.TextTrack.SHOWING=2;f.TextTrackCue=function(b,d,a,e,c,k,j){this.id=b;this.track=j instanceof f.TextTrack?j:null;this.startTime=parseFloat(d);this.endTime=parseFloat(a)>=this.startTime?parseFloat(a):this.startTime;this.text="string"===typeof e||e instanceof f.CaptionatorCueStructure?e:"";this.settings="string"===typeof c?c:"";this.intSettings={};this.pauseOnExit=!!k;this.wasActive=!1;this.direction="horizontal";this.snapToLines=!0;this.linePosition="auto";
this.textPosition=50;this.size=0;this.alignment="middle";if(this.settings.length){var g=this.intSettings,o=this,c=c.split(/\s+/).filter(function(a){return 0<a.length});c instanceof Array&&c.forEach(function(a){var b={D:"direction",L:"linePosition",T:"textPosition",A:"alignment",S:"size"},a=a.split(":");b[a[0]]&&(g[b[a[0]]]=a[1]);b[a[0]]in o&&(o[b[a[0]]]=a[1])})}this.linePosition.match(/\%/)&&(this.snapToLines=!1);this.getCueAsSource=function(){return""+this.text};this.getCueAsHTML=function(){var a=
document.createDocumentFragment(),b=document.createElement("div");b.innerHTML=""+this.text;Array.prototype.forEach.call(b.childNodes,function(b){a.appendChild(b.cloneNode(!0))});return a};this.isActive=function(){var a=0;if(this.track instanceof f.TextTrack&&(this.track.mode===f.TextTrack.SHOWING||this.track.mode===f.TextTrack.HIDDEN)&&this.track.readyState===f.TextTrack.LOADED)try{if(a=this.track.videoNode.currentTime,this.startTime<=a&&this.endTime>=a)return this.wasActive||(this.wasActive=!0,this.onenter()),
!0}catch(b){return!1}this.wasActive&&(this.wasActive=!1,this.onexit());return!1};Object.prototype.__defineGetter__?this.__defineGetter__("active",this.isActive):Object.defineProperty&&Object.defineProperty(this,"active",{get:this.isActive});this.toString=function(){return"TextTrackCue:"+this.id+"\n"+(""+this.text)};this.onenter=function(){};this.onexit=function(){}};f.TextTrackCueList=function(b){this.track=b instanceof f.TextTrack?b:null;this.getCueById=function(b){return this.filter(function(a){return a.id===
b})[0]};this.loadCues=function(b){for(var a=0;a<b.length;a++)b[a].track=this.track,Array.prototype.push.call(this,b[a])};this.addCue=function(b){if(b&&b instanceof f.TextTrackCue)if(b.track===this.track||!b.track)Array.prototype.push.call(this,b);else throw Error("This cue is associated with a different track!");else throw Error("The argument is null or not an instance of TextTrackCue.");};this.toString=function(){return"[TextTrackCueList]"}};f.TextTrackCueList.prototype=[];f.ActiveTextTrackCueList=
function(b,d){this.refreshCues=function(){if(b.length){var a=this,f=!1,c=[].slice.call(this,0);this.length=0;b.forEach(function(b){b.active&&(a.push(b),a[a.length-1]!==c[a.length-1]&&(f=!0))});if(f)try{d.oncuechange()}catch(k){}}};this.toString=function(){return"[ActiveTextTrackCueList]"};this.refreshCues()};f.ActiveTextTrackCueList.prototype=new f.TextTrackCueList(null);var L=function(b){this.targetObject=b;this.currentTime=0;this.addEventListener=function(b,a){"timeupdate"===b&&a instanceof Function&&
(this.timeupdateEventHandler=a)};this.attachEvent=function(b,a){"timeupdate"===b&&a instanceof Function&&(this.timeupdateEventHandler=a)};this.updateTime=function(b){isNaN(b)||(this.currentTime=b)}};f.rebuildCaptions=function(b){var d=b.currentTime,a=[],e=!1,c=[],k=[];(b.textTracks||[]).forEach(function(b){b.mode===f.TextTrack.SHOWING&&b.readyState===f.TextTrack.LOADED&&(k=[].slice.call(b.activeCues,0),k=k.sort(function(a,b){return a.startTime>b.startTime?-1:1}),a=a.concat(k))});c=a.map(function(a){return a.track.id+
"."+a.id+":"+a.text.toString(d).length});if((e=!f.compareArray(c,b._captionator_previousActiveCues))||b._captionator_dirtyBit)b._captionator_dirtyBit=!1,b._captionator_availableCueArea=null,b._captionator_previousActiveCues=c,f.styleCueCanvas(b),b._containerObject.innerHTML="",a.forEach(function(a){var e=document.createElement("div"),c=document.createElement("span");c.className="captionator-cue-inner";e.id=(""+a.id).length?a.id:f.generateID();e.className="captionator-cue";e.appendChild(c);c.innerHTML=
a.text.toString(d);b._containerObject.appendChild(e);f.styleCue(e,a,b)})};f.captionify=function(b,d,a){var e=[],c=0,a=a instanceof Object?a:{};a.minimumFontSize&&"number"===typeof a.minimumFontSize&&(w=a.minimumFontSize);a.minimumLineHeight&&"number"===typeof a.minimumLineHeight&&(B=a.minimumLineHeight);a.fontSizeVerticalPercentage&&"number"===typeof a.fontSizeVerticalPercentage&&(F=a.fontSizeVerticalPercentage);a.lineHeightRatio&&"number"!==typeof a.lineHeightRatio&&(G=a.lineHeightRatio);a.cueBackgroundColour&&
a.cueBackgroundColour instanceof Array&&(K=a.cueBackgroundColour);if(!HTMLVideoElement&&!(b instanceof L)&&!a.forceCaptionify||("function"===typeof document.createElement("video").addTextTrack||"function"===typeof document.createElement("video").addTrack)&&!a.forceCaptionify)return!1;!C&&a.exportObjects&&(window.TextTrack=f.TextTrack,window.TextTrackCueList=f.TextTrackCueList,window.ActiveTextTrackCueList=f.ActiveTextTrackCueList,window.TextTrackCue=f.TextTrackCue,C=!0);if(!b||!1===b||void 0===b||
null===b)e=[].slice.call(document.getElementsByTagName("video"),0);else if(b instanceof Array)for(c=0;c<b.length;c++)"string"===typeof b[c]?e=e.concat([].slice.call(document.querySelectorAll(b[c]),0)):b[c].constructor===HTMLVideoElement&&e.push(b[c]);else"string"===typeof b?e=[].slice.call(document.querySelectorAll(b),0):b.constructor===HTMLVideoElement&&e.push(b);return e.length?(e.forEach(function(b){b.addTextTrack=function(a,d,e,c,s){var r="subtitles,captions,descriptions,captions,metadata,chapters".split(",");
r.slice(0,7);a="string"===typeof a?a:"";e="string"===typeof e?e:"";c="string"===typeof c?c:"";if(r.filter(function(a){return d===a?!0:!1}).length)return(a=new f.TextTrack(a,d,e,c,s,null))?(b.textTracks instanceof Array||(b.textTracks=[]),b.textTracks.push(a),a):!1;throw f.createDOMException(12,"DOMException 12: SYNTAX_ERR: You must use a valid kind when creating a TimedTextTrack.","SYNTAX_ERR");};f.processVideoElement(e[c],d,a)}),!0):!1};f.parseCaptions=function(b,d){var d=d instanceof Object?d:{},
a="",e=[],c="",k=[],j=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\,(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,g=/^(\d+)?:?(\d{2}):(\d{2})\.(\d+)\,(\d+)?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,o=/^(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s*(.*)/,h=/(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)/,s=/^([\d\.]+)\s+\+([\d\.]+)\s*(.*)/,r=/^\[(\d{2})?:?(\d{2})\:(\d{2})\.(\d{2,3})\]\s*(.*?)$/,u=/^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,y=/^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,z=/^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g,
m=/<tt\s+xml/ig,p=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)/;if(b){var v=function(a){var b=new f.CaptionatorCueStructure(a,d),e=[],c,g,i,k=[];i=0;var j=function(a){return!!a.replace(/[^a-z0-9]+/ig,"").length},e=a.split(/(<\/?[^>]+>)/ig);i=b;for(c in e)if(e.hasOwnProperty(c))if(g=e[c],"<"===g.substr(0,1))if("/"===g.substr(1,1)){if(a=g.substr(2).split(/[\s>]+/g)[0],0<k.length){g=0;for(i=k.length-1;0<=i;i--){var o=k[i][k[i].length-1];g=i;if(o.token===a)break}i=k[g];k=k.slice(0,g)}}else{if(g.substr(1).match(h)||
g.match(/^<v\s+[^>]+>/i)||g.match(/^<c[a-z0-9\-\_\.]+>/)||g.match(/^<(b|i|u|ruby|rt)>/)||!1!==d.sanitiseCueHTML){a={token:g.replace(/[<\/>]+/ig,"").split(/[\s\.]+/)[0],rawToken:g,children:[]};if("v"===a.token)a.voice=g.match(/^<v\s*([^>]+)>/i)[1];else if("c"===a.token)a.classes=g.replace(/[<\/>\s]+/ig,"").split(/[\.]+/ig).slice(1).filter(j);else if(g=a.rawToken.match(h))b.isTimeDependent=!0,g=g.slice(1),a.timeIn=parseInt(3600*(g[0]||0),10)+parseInt(60*(g[1]||0),10)+parseInt(g[2]||0,10)+parseFloat("0."+
(g[3]||0));i.push(a);k.push(i);i=a.children}}else!1!==d.sanitiseCueHTML&&(g=g.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\&/g,"&amp;"),d.ignoreWhitespace||(g=g.replace(/\n+/g,"<br />"))),i.push(g);return b},A=function(a){var b=0;if("string"!==typeof a)return 0;if(a=p.exec(a))a=a.slice(1),b=parseInt(3600*(a[0]||0),10)+parseInt(60*(a[1]||0),10)+parseInt(a[2]||0,10)+parseFloat("0."+(a[3]||0));return b},w=function(a,b){var e,c=0,g=0,c=""+a.getAttribute("begin");e=""+a.getAttribute("end");var k=
a.getAttribute("id")||b,c=A(c),g=A(e);e=!1===d.processCueHTML?a.innerHTML:v(a.innerHTML);return new f.TextTrackCue(k,c,g,e,{},!1,null)},e=b.replace(/\r\n/g,"\n").replace(/\r/g,"\n");if(m.exec(b))return m=document.createElement("ttml"),m.innerHTML=b,[].slice.call(m.querySelectorAll("[begin],[end]"),0).map(w);b.split(/\n+/g).reduce(function(a,b){return a||!!r.exec(b)},!1)?(e=e.split(/\n+/g),a="LRC"):e=e.split(/\n\n+/g);e=e.filter(function(b){return b.match(/^WEBVTT(\s*FILE)?/ig)?(a="WebVTT",!1):b.replace(/\s*/ig,
"").length?!0:!1}).map(function(b,e){var h,m,p,i,l,t="",q;if(q=u.exec(b))return k=q.slice(2).join(""),k=k.split(/\s+/g).filter(function(a){return a&&!!a.length}),null;if(q=y.exec(b))return c+=q[q.length-1],null;if(q=z.exec(b))return null;for(h="LRC"===a?[b.substr(0,b.indexOf("]")+1),b.substr(b.indexOf("]")+1)]:b.split(/\n/g);!h[0].replace(/\s+/ig,"").length&&0<h.length;)h.shift();for(q=h[0].match(/^\s*[a-z0-9\-]+\s*$/ig)?""+h.shift().replace(/\s*/ig,""):e;0<h.length;){var n=h[0];if((l=o.exec(n))||
(l=j.exec(n))||(l=g.exec(n)))l=l.slice(1),m=parseInt(3600*(l[0]||0),10)+parseInt(60*(l[1]||0),10)+parseInt(l[2]||0,10)+parseFloat("0."+(l[3]||0)),p=parseInt(3600*(l[4]||0),10)+parseInt(60*(l[5]||0),10)+parseInt(l[6]||0,10)+parseFloat("0."+(l[7]||0)),l[8]&&(t=l[8]);else if(l=s.exec(n))l=l.slice(1),m=parseFloat(l[0]),p=m+parseFloat(l[1]),l[2]&&(t=l[2]);else if(l=r.exec(n))l=l.slice(1,l.length-1),p=m=parseInt(3600*(l[0]||0),10)+parseInt(60*(l[1]||0),10)+parseInt(l[2]||0,10)+parseFloat("0."+(l[3]||0));
h=h.slice(0,0).concat(h.slice(1));break}if(!m&&!p)return null;l=k.reduce(function(a,b){a[b.split(":")[0]]=b.split(":")[1];return a},{});l=t.split(/\s+/g).filter(function(a){return a&&!!a.length}).reduce(function(a,b){a[b.split(":")[0]]=b.split(":")[1];return a},l);t="";for(i in l)l.hasOwnProperty(i)&&(t+=t.length?" ":"",t+=i+":"+l[i]);i=!1===d.processCueHTML?h.join("\n"):v(h.join("\n"));m=new f.TextTrackCue(q,m,p,i,t,!1,null);m.styleData=c;return m}).filter(function(a){return null!==a?!0:!1});"LRC"===
a&&(e.forEach(function(a,b){var d=0,c;0<b&&(d=a.startTime,c=e[--b],c.endTime<d&&(c.endTime=d))}),e=e.filter(function(a){return 0<a.text.toString().replace(/\s*/,"").length?!0:!1}));return e}throw Error("Required parameter captionData not supplied.");};f.processVideoElement=function(b,d,a){var e=[],c=navigator.language||navigator.userLanguage;d||c.split("-");a=a instanceof Object?a:{};b.captioned||(b._captionatorOptions=a,b.className+=(b.className.length?" ":"")+"captioned",b.captioned=!0,0===b.id.length&&
(b.id=f.generateID()),[].slice.call(b.querySelectorAll("track"),0).forEach(function(c){var j=null,j=0<c.querySelectorAll("source").length?c.querySelectorAll("source"):c.getAttribute("src"),j=b.addTextTrack(c.getAttribute("id")||f.generateID(),c.getAttribute("kind"),c.getAttribute("label"),c.getAttribute("srclang").split("-")[0],j,c.getAttribute("type"),c.hasAttribute("default"));c.track=j;j.trackNode=c;j.videoNode=b;e.push(j);var g=!1;if(("subtitles"===j.kind||"captions"===j.kind)&&d===j.language&&
a.enableCaptionsByDefault)e.filter(function(a){return("captions"===a.kind||"subtitles"===a.kind)&&d===a.language&&a.mode===f.TextTrack.SHOWING?!0:!1}).length||(g=!0);"chapters"===j.kind&&d===j.language&&(e.filter(function(a){return"chapters"===a.kind&&a.mode===f.TextTrack.SHOWING?!0:!1}).length||(g=!0));"descriptions"===j.kind&&!0===a.enableDescriptionsByDefault&&d===j.language&&(e.filter(function(a){return"descriptions"===a.kind&&a.mode===f.TextTrack.SHOWING?!0:!1}).length||(g=!0));!0===g&&e.forEach(function(a){a.trackNode.hasAttribute("default")&&
a.mode===f.TextTrack.SHOWING&&(a.mode=f.TextTrack.HIDDEN)});c.hasAttribute("default")&&!e.filter(function(a){return a.trackNode.hasAttribute("default")&&a.trackNode!==c?!0:!1}).length&&(g=!0,j.internalDefault=!0);!0===g&&(j.mode=f.TextTrack.SHOWING)}),b.addEventListener("timeupdate",function(b){b=b.target;try{b.textTracks.forEach(function(a){a.activeCues.refreshCues.apply(a.activeCues)})}catch(c){}a.renderer instanceof Function?a.renderer.call(f,b):f.rebuildCaptions(b)},!1),window.addEventListener("resize",
function(){b._captionator_dirtyBit=!0;f.rebuildCaptions(b)},!1),!0===a.enableHighResolution&&window.setInterval(function(){try{b.textTracks.forEach(function(a){a.activeCues.refreshCues.apply(a.activeCues)})}catch(c){}a.renderer instanceof Function?a.renderer.call(f,b):f.rebuildCaptions(b)},20));return b};f.getNodeMetrics=function(b){for(var d=window.getComputedStyle(b,null),a=b,e=b.offsetTop,c=b.offsetLeft,f=b,j=0,g=0,f=parseInt(d.getPropertyValue("width"),10),j=parseInt(d.getPropertyValue("height"),
10);a=a.offsetParent;)e+=a.offsetTop,c+=a.offsetLeft;b.hasAttribute("controls")?(b=navigator.userAgent.toLowerCase(),-1!==b.indexOf("chrome")?g=32:-1!==b.indexOf("opera")?g=25:-1!==b.indexOf("firefox")?g=28:-1!==b.indexOf("ie 9")||-1!==b.indexOf("ipad")?g=44:-1!==b.indexOf("safari")&&(g=25)):b._captionatorOptions&&(b=b._captionatorOptions,b.controlHeight&&(g=parseInt(b.controlHeight,10)));return{left:c,top:e,width:f,height:j,controlHeight:g}};f.applyStyles=function(b,d){for(var a in d)({}).hasOwnProperty.call(d,
a)&&(b.style[a]=d[a])};f.checkDirection=function(b){var d=RegExp("^[^\u0591-\u07ff\ufb1d-\ufdfd\ufe70-\ufefc]*[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff]");return RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff]*[\u0591-\u07ff\ufb1d-\ufdfd\ufe70-\ufefc]").test(b)?"rtl":d.test(b)?"ltr":""};f.styleCue=function(b,d,a){var e=0,c=0,k=0,j=0,g,o,h=0,s=0,r,u,y,z,m,
p,v=0,A=g=e=0,I=0,D=0,H,E,x=0,C=a._captionatorOptions||{},i,c=50,e=h=0,c=!0;g="";var l;if("descriptions"===d.track.kind)return f.applyStyles(b,{position:"absolute",overflow:"hidden",width:"1px",height:"1px",opacity:"0",textIndent:"-999em"}),!0;var t=function(a){var b=function(a){return!!a.length},c,d,e,g,h=0,i=function(a){h++;f.applyStyles(a,{display:"block",lineHeight:"auto",height:r+"px",width:p+"px",textAlign:"center"})};for(c in a.childNodes)a.childNodes.hasOwnProperty(c)&&(d=a.childNodes[c],
3===d.nodeType?(g=document.createDocumentFragment(),e=d.nodeValue,g.appendChild(document.createElement("span")),g.childNodes[0].innerHTML="<span class='captionator-cue-character'>"+e.split(/(.)/).filter(b).join("</span><span class='captionator-cue-character'>")+"</span>",[].slice.call(g.querySelectorAll("span.captionator-cue-character"),0).forEach(i),d.parentNode.replaceChild(g,d)):1===a.childNodes[c].nodeType&&(h+=t(a.childNodes[c])));return h};i=f.getNodeMetrics(a);a._captionator_availableCueArea||
(a._captionator_availableCueArea={bottom:i.height-i.controlHeight,right:i.width,top:0,left:0,height:i.height-i.controlHeight,width:i.width});"horizontal"===d.direction&&(f.applyStyles(b,{width:"auto",position:"static",display:"inline-block",padding:"1em"}),h=parseInt(b.offsetWidth,10),e=Math.floor(100*(h/a._captionator_availableCueArea.width)),e=100>=e?e:100);h=72*(i.height*(F/100)/96);h=h>=w?h:w;r=Math.floor(96*(h/72));u=Math.floor(h*G);u=u>B?u:B;p=m=Math.ceil(96*(u/72));m*Math.floor(i.height/m)<
i.height&&(m=Math.floor(i.height/Math.floor(i.height/m)),u=Math.ceil(72*(m/96)));m*Math.floor(i.width/m)<i.width&&(p=Math.ceil(i.width/Math.floor(i.width/m)));y=Math.floor(a._captionator_availableCueArea.height/m);z=Math.floor(a._captionator_availableCueArea.width/p);0===parseFloat((""+d.size).replace(/[^\d\.]/ig,""))?!0===C.sizeCuesByTextBoundingBox?g=e:(g=100,c=!1):(c=!1,g=parseFloat((""+d.size).replace(/[^\d\.]/ig,"")),g=100>=g?g:100);h="horizontal"===d.direction?Math.floor(0.01*i.width):0;s="horizontal"===
d.direction?0:Math.floor(0.01*i.height);"auto"===d.linePosition?d.linePosition="horizontal"===d.direction?y:z:(""+d.linePosition).match(/\%/)&&(d.snapToLines=!1,d.linePosition=parseFloat((""+d.linePosition).replace(/\%/ig,"")));"horizontal"===d.direction?(j=m,"auto"!==d.textPosition&&c&&(c=parseFloat((""+d.textPosition).replace(/[^\d\.]/ig,"")),g=g-c>e?g-c:e),k=!0===d.snapToLines?a._captionator_availableCueArea.width*(g/100):i.width*(g/100),"auto"===d.textPosition?e=(a._captionator_availableCueArea.right-
k)/2+a._captionator_availableCueArea.left:(c=parseFloat((""+d.textPosition).replace(/[^\d\.]/ig,"")),e=(a._captionator_availableCueArea.right-k)*(c/100)+a._captionator_availableCueArea.left),!0===d.snapToLines?c=(y-1)*m+a._captionator_availableCueArea.top:(c=i.controlHeight+m+2*s,c=(i.height-c)*(d.linePosition/100))):(c=a._captionator_availableCueArea.top,e=a._captionator_availableCueArea.right-p,k=p,j=a._captionator_availableCueArea.height*(g/100),e=t(b),g=[].slice.call(b.querySelectorAll("span.captionator-cue-character"),
0),v=Math.floor((j-2*s)/r),k=Math.ceil(e/v)*p,A=Math.ceil(e/v),I=(e-v*(A-1))*r,!0===d.snapToLines?e="vertical-lr"===d.direction?a._captionator_availableCueArea.left:a._captionator_availableCueArea.right-k:(e=k+2*h,e="vertical-lr"===d.direction?(i.width-e)*(d.linePosition/100):i.width-e-(i.width-e)*(d.linePosition/100)),"auto"===d.textPosition?c=(a._captionator_availableCueArea.bottom-j)/2+a._captionator_availableCueArea.top:(d.textPosition=parseFloat((""+d.textPosition).replace(/[^\d\.]/ig,"")),c=
(a._captionator_availableCueArea.bottom-j)*(d.textPosition/100)+a._captionator_availableCueArea.top),E=H=x=D=0,g.forEach(function(a){H="vertical-lr"===d.direction?p*D:k-p*(D+1);"start"===d.alignment||"start"!==d.alignment&&D<A-1?E=x*r+s:"end"===d.alignment?E=x*r-r+(j+2*s-I):"middle"===d.alignment&&(E=(j-2*s-I)/2+x*r);a.setAttribute("aria-hidden","true");f.applyStyles(a,{position:"absolute",top:E+"px",left:H+"px"});x>=v-1?(x=0,D++):x++}),g=d.text.getPlain(a.currentTime),l=document.createElement("div"),
l.innerHTML=g,b.appendChild(l),f.applyStyles(l,{position:"absolute",overflow:"hidden",width:"1px",height:"1px",opacity:"0",textIndent:"-999em"}));"horizontal"===d.direction&&(o="rtl"===f.checkDirection(""+d.text)?{start:"right",middle:"center",end:"left"}[d.alignment]:{start:"left",middle:"center",end:"right"}[d.alignment]);f.applyStyles(b,{position:"absolute",overflow:"hidden",width:k+"px",height:j+"px",top:c+"px",left:e+"px",padding:s+"px "+h+"px",textAlign:o,backgroundColor:"rgba("+K.join(",")+
")",direction:f.checkDirection(""+d.text),lineHeight:u+"pt",boxSizing:"border-box"});if("vertical"===d.direction||"vertical-lr"===d.direction)e-a._captionator_availableCueArea.left-a._captionator_availableCueArea.left>=a._captionator_availableCueArea.right-(e+k)?a._captionator_availableCueArea.right=e:a._captionator_availableCueArea.left=e+k,a._captionator_availableCueArea.width=a._captionator_availableCueArea.right-a._captionator_availableCueArea.left;else{if(b.scrollHeight>1.2*b.offsetHeight){if(d.snapToLines){for(o=
0;b.scrollHeight>1.2*b.offsetHeight;)j+=m,b.style.height=j+"px",o++;c-=o*m}else j=b.scrollHeight+s,c=i.controlHeight+j+2*s,c=(i.height-c)*(d.linePosition/100),b.style.height=j+"px";b.style.top=c+"px"}c-a._captionator_availableCueArea.top-a._captionator_availableCueArea.top>=a._captionator_availableCueArea.bottom-(c+j)&&a._captionator_availableCueArea.bottom>c?a._captionator_availableCueArea.bottom=c:a._captionator_availableCueArea.top<c+j&&(a._captionator_availableCueArea.top=c+j);a._captionator_availableCueArea.height=
a._captionator_availableCueArea.bottom-a._captionator_availableCueArea.top}if(C.debugMode){var q,n,J=function(){q||(a._captionatorDebugCanvas?(q=a._captionatorDebugCanvas,n=a._captionatorDebugContext):(q=document.createElement("canvas"),q.setAttribute("width",i.width),q.setAttribute("height",i.height-i.controlHeight),document.body.appendChild(q),f.applyStyles(q,{position:"absolute",top:i.top+"px",left:i.left+"px",width:i.width+"px",height:i.height-i.controlHeight+"px",zIndex:3E3}),n=q.getContext("2d"),
a._captionatorDebugCanvas=q,a._captionatorDebugContext=n))};J();q.setAttribute("width",i.width);J();n.fillStyle="rgba(100,100,255,0.5)";n.fillRect(a._captionator_availableCueArea.left,a._captionator_availableCueArea.top,a._captionator_availableCueArea.right,a._captionator_availableCueArea.bottom);n.stroke();(function(){var b;J();n.strokeStyle="rgba(255,0,0,0.5)";n.lineWidth=1;n.beginPath();for(b=0;b<y;b++)n.moveTo(0.5,b*m+0.5),n.lineTo(i.width,b*m+0.5);n.closePath();n.stroke();n.beginPath();n.strokeStyle=
"rgba(0,255,0,0.5)";for(b=z;0<=b;b--)n.moveTo(i.width-b*p-0.5,-0.5),n.lineTo(i.width-b*p-0.5,i.height);n.closePath();n.stroke();n.beginPath();n.strokeStyle="rgba(255,255,0,0.5)";for(b=0;b<=z;b++)n.moveTo(b*p+0.5,-0.5),n.lineTo(b*p+0.5,i.height);n.stroke();a.linesDrawn=!0})()}};f.styleCueCanvas=function(b){var d,a,e=b._captionatorOptions instanceof Object?b._captionatorOptions:{};if(!(b instanceof HTMLVideoElement))throw Error("Cannot style a cue canvas for a non-video node!");b._containerObject&&
(a=b._containerObject,d=a.id);if(a)a.parentNode||document.body.appendChild(a);else{a=document.createElement("div");a.className="captionator-cue-canvas";d=f.generateID();a.id=d;if(e.appendCueCanvasTo){var c=null;if(e.appendCueCanvasTo instanceof HTMLElement)c=e.appendCueCanvasTo;else if("string"===typeof e.appendCueCanvasTo)try{var k=document.querySelectorAll(e.appendCueCanvasTo);if(0<k.length)c=k[0];else throw null;}catch(j){c=document.body,e.appendCueCanvasTo=!1}else c=document.body,e.appendCueCanvasTo=
!1;c.appendChild(a)}else document.body.appendChild(a);b._containerObject=a;a.setAttribute("aria-live","polite");a.setAttribute("aria-atomic","true");a.setAttribute("aria-relevant","text");a.setAttribute("role","region")}-1===(""+b.getAttribute("aria-describedby")).indexOf(d)&&(c=b.hasAttribute("aria-describedby")?b.getAttribute("aria-describedby")+" ":"",b.setAttribute("aria-describedby",c+d));c=f.getNodeMetrics(b);b=72*(c.height*(F/100)/96);b=b>=w?b:w;d=Math.floor(b*G);d=d>B?d:B;f.applyStyles(a,
{position:"absolute",overflow:"hidden",zIndex:100,height:c.height-c.controlHeight+"px",width:c.width+"px",top:(e.appendCueCanvasTo?0:c.top)+"px",left:(e.appendCueCanvasTo?0:c.left)+"px",color:"white",fontFamily:"Verdana, Helvetica, Arial, sans-serif",fontSize:b+"pt",lineHeight:d+"pt",boxSizing:"border-box"})};f.createDOMException=function(b,d,a){try{document.querySelectorAll("div/[]")}catch(e){var c=function(a,b,c){this.code=a;this.message=b;this.name=c};c.prototype=e;return new c(b,d,a)}};f.compareArray=
function(b,d){if(!(b instanceof Array)||!(d instanceof Array)||b.length!==d.length)return!1;for(var a in b)if(b.hasOwnProperty(a)&&b[a]!==d[a])return!1;return!0};f.generateID=function(b){for(var d="",b=b?b:10;d.length<b;)d+=String.fromCharCode(65+Math.floor(26*Math.random()));return"captionator"+d}})();