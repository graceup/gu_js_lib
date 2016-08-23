/**
 * iframe 上下文 js方法互调 工具类
 * 
 * 
 * 
 * by lyn 20160302
 */

var jiaxinIframeCurrentPageName;

initJiaxinIframeEvent();

/**
 * 初始化事件
 */
function initJiaxinIframeEvent(){
	
	var strUrl=window.location.href;
	var arrUrl=strUrl.split("/");
	
	jiaxinIframeCurrentPageName=arrUrl[arrUrl.length-1];
	
	//监听message
	if (typeof window.addEventListener != 'undefined') { 
		window.addEventListener('message', jiaxinIframeMessageHandler, false); 
	} else if (typeof window.attachEvent != 'undefined') { 
		window.attachEvent('onmessage', jiaxinIframeMessageHandler); 
	}
	
}


function jiaxinIframeMessageHandler(e) {
    if ((currentPageName).indexOf(e.origin)>=0) { 
    	var jiaxinInitJson = eval("(" + e.data + ")");
		if (jiaxinInitJson.code == "0") {
			
		}
		
		e.source.postMessage('Hello', e.origin);
    }  
}


function jiaxinMcsPostMessage(){
	window.top.postMessage("togglerDiv", '/');
	document.getElementById("otherPage").contentWindow.postMessage('message',"/");
	 window.frames[0].postMessage('getcolor','/');
	 parent.frames["frame2"];
	
}