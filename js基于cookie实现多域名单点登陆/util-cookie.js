//写cookies
function setCookie(name,value,days)//两个参数，一个是cookie的名子，一个是值
{
    var exp  = new Date();    
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
   
}
function setCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
	var exp  = new Date();    
	exp.setTime(exp.getTime() + 15*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
	
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) {
    	 return unescape(arr[2]);
     }else{
    	  return null;
     }   	 

}

function delCookie(name)//删除cookie
{	
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();    
}