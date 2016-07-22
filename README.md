# gu_js_lib
share gu common js lib
---
##检测输入框是否是输入中状态
--

$("#textarea").keydown(function(){
		 if(prepareEnable){
			 

			 var sendContent =$('#textarea').val();
			 if(sendContent){
				 setTimeout(function(){
					 var currentContent =$('#textarea').val();
					 if(currentContent==sendContent){
						 checkIsType(sendContent);
					 }
				 },2000);
			 }
		 
			 
		 }
		
	});
	
	var typingIndex=1;
/**
 *检查是否输入中 
 */
function checkIsType(message){
	typingIndex++;
	if(typingIndex==1000){
		typingIndex=1;
	}
	sendMesageByWebsocket(10005, {
						"state":"composing",
						"message":message
				});
					
	var currentTypingIndex=typingIndex;
	setTimeout(function(){
	 	if(currentTypingIndex==typingIndex){
	 		sendMesageByWebsocket(10005, {
	 			"state":"gone",
	 			"message":""
	 		});
	 	}
	},2000);
}
	
	--
