"use strict";var flysasApp=window.flysasApp||{};flysasApp.mainHeader=window.flysasApp.mainHeader||{},flysasApp.mainHeader.widget=function(e,r){var t=(r.cookie.match(/(^|;\s)_country=([^;$]+)/i)||[])[2]||"lu",a=(r.cookie.match(/(^|;\s)_language=([^;$]+)/i)||[])[2]||"en",d="",n="/widgets/sas-main-header/"+t+"-"+a;e.location.hostname.match(/^((www|test)\.)(fly)?sas\.(se|no|dk|fi|com)$/gi)&&(n="/v2/de-design-library"+n),function(e,t){var a=e.data?"POST":"GET",n=e.url.match(/^http/gi)?e.url:d+e.url,s=new XMLHttpRequest;if(s.onreadystatechange=function(){4==this.readyState&&200==this.status?t(s.responseText):4==this.readyState&&200!=this.status&&t("")},s.open(a,n,!0),e.data){s.setRequestHeader("Content-type","application/x-www-form-urlencoded");var i=[];for(var r in e.data)i.push(r+"="+e.data[r]);s.send(i.join("&"))}else s.send()}({url:n},function(e){var t=r.createElement("div");t.innerHTML=e,r.body.insertBefore(t,r.body.firstChild);for(var a,n,s=t.getElementsByTagName("script"),i=0;i<s.length;i++)a=s[i],n=void 0,(n=r.createElement("script")).textContent=a.innerText,r.head.insertBefore(n,r.head.childNodes[r.head.childNodes.length-1].nextSibling)})}(window,document);