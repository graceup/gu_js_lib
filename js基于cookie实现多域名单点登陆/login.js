$(function() {
	var ssoToken=getCookie("ssoToken");
	if(ssoToken==null){
		ssoToken=getQueryString("ssoToken");
	}
	if(ssoToken==null){
		initNormalLogin();
	}else{
		loginBySso(ssoToken);
	}
 
});

/**
 * 获取url中的的参数
 */
function getQueryString(name) {
		    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    var r = window.location.search.substr(1).match(reg);
		    if(r!=null) {
		    	return  unescape(r[2]); 
		    }
		   	return null;
}

/**
 * 单点登录
 */
function loginBySso(ssoToken){
	
	var parms = {
			"ssoToken" : ssoToken
		};
		
		var url = "/user/loginbysso";
		$.post(url, parms, function(data) {
			if (data) {
				var result = JSON.parse(data);
				if (result.code == "1") {
					dumpIn();
				} else {
					initNormalLogin();
				}
			}
		});
	
}
/**
 * 正常登录
 */
function initNormalLogin(){
	
	$('#login').click(function(){
		doLogin();
	});
	 
}


/**
 * 初始化其它站点单点
 */
function initSsoSite(tempSsoToken){

	var  ssoIframeIndex=0;
	//单点登录的域名
	var  ssoIframeSrcArray=('https://a.com/sso.html?oper=in&ssoToken='+
							'##'+
							'http://b.com/sso.html?oper=in&ssoToken=').split('##');
	
	var tempIframeHtml='<iframe style="display: none;" id="ssoIframe" ></iframe>';
	$(document.body).append(tempIframeHtml);
	
	var ssoIframe = document.getElementById('ssoIframe');
	ssoIframe.src=ssoIframeSrcArray[ssoIframeIndex]+tempSsoToken;
	ssoIframeIndex++;
	ssoIframe.onload = ssoIframe.onreadystatechange = function() {
	    if (this.readyState && this.readyState != 'complete'){
	    	return;
	    }else {
	    	if(ssoIframeIndex<ssoIframeSrcArray.length){
	    		ssoIframe.src=ssoIframeSrcArray[ssoIframeIndex]+tempSsoToken;
	    		ssoIframeIndex++;
	    	}else{
			    dumpIn();
	    		
	    	}
	      }
	};
	
}


/**
 * 提交登录请求
 */
function doLogin() {
	
	var parms = {
		"username" : $('#username').val(),
		"password" : $('#password').val()
	};
	
	var url = "/user/login";
	$.post(url, parms, function(data) {
		if (data) {
			var result = JSON.parse(data);
			if (result.code == "1") {
				
				var tempSsoToken=result.ssoToken;
				
				setCookie("ssoToken",tempSsoToken,0.08);
				
				//5秒后跳转
				setTimeout('dumpIn()',5000);
				
				initSsoSite(tempSsoToken);
				
			} else { 
				//登录不成功
			}
		}
	});
}
 
/**
 * 跳转
 */
function dumpIn() {
	window.location = "/index.html";
}
 