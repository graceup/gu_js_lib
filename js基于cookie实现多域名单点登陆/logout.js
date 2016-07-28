/**
 * 登出
 */
function logout() {
			var url = "/user/logout";
			$.post(url, null, function(data) {
				delCookie("ssoToken");
				// 调到登录页面
				setTimeout('dumpOut()',5000);
				deleteSsoSite();
			});
} 


/**
 * 删除其它站点单点
 */
function deleteSsoSite(){
	var  ssoIframeIndex=0;
	var  ssoIframeSrcArray=('https://a.com/sso.html?oper=leave'+
							'##'+
							'http://b.com/sso.html?oper=leave').split('##');
	
	var tempIframeHtml='<iframe style="display: none;" id="ssoIframe" ></iframe>';
	$(document.body).append(tempIframeHtml);
	
	var ssoIframe = document.getElementById('ssoIframe');
	ssoIframe.src=ssoIframeSrcArray[ssoIframeIndex];
	ssoIframeIndex++;
	ssoIframe.onload = ssoIframe.onreadystatechange = function() {
	    if (this.readyState && this.readyState != 'complete'){
	    	return;
	    }else {
	    	if(ssoIframeIndex<ssoIframeSrcArray.length){
	    		ssoIframe.src=ssoIframeSrcArray[ssoIframeIndex];
	    		ssoIframeIndex++;
	    	}else{
	    		dumpOut();
	    	}
	      }
	};
}

/**
 * 跳转
 */
function dumpOut(){
	window.location = "/login.html";
}