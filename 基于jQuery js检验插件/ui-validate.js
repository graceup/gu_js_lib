/**
 * 基于jQuery js 检验插件
 */
GuValidate = new function() {
	
	function getFormValue($elem){
		var type = $elem.attr("type") || $(this)[0].tagName;
		
		if(type == "radio"){
			if($elem.is(":checked")){
				return $elem.val();
			}
		} else if(type == "checkbox"){
			if($elem.is(":checked")){
				return $elem.val();
			}
		} else if(type == "ui-rating") {
			return $elem.rating("getValue");
			
		} else if(type == "ui-switch") {
			return $elem.uiswitch("getValue");
			
		} else if(type == "dropdown-tree") {
			return $elem.dropdowntree("getSelectIds");
		} else if(type == "filtertag") {
			return $elem.filtertag("getSelectFilter");
		} else {
			return $elem.val();
		}
		return null;
	}
	/**
	 * 传进来一个form对象,将这个form对象的元素转成一个bean,如果包含属性ui-ignore则忽略该表单项
	 */
	this.formToBean = function($form){

		var bean = {};
		 
		$form.find("input, select, textarea, .ui-rating, .ui-switch, .dropdown-tree, .filtertag").each(function(){
			if($(this).is("[ui-ignore]")){
				return ;
			}
			var name = $(this).attr("name");
			var type = $(this).attr("type") || $(this)[0].tagName;
			
			if(type == "button" || type == "reset" || type == "submit"){
				return ;
			}

			var value = getFormValue($(this));
			
			if(value != null){
				if(typeof value == 'string'){
					value = $.trim(value);
				}
				if(type == 'checkbox'){
					if(bean[name]){
						bean[name] = value;
					} else {
						bean[name] += ',' + value;
					}
				} else {
					bean[name] = value;
				}
			}
		});

		return bean;
	};
	
	
	/**
	 * 绑定表单
	 */
	this.bindForm = function($form, formData) {
		
		var checkedValue = 1;
			 
		$form.find("input,textarea,select,.ui-rating,.ui-switch,.dropdown-tree,.filtertag,img").each(function(){
			var name = $(this).attr("name");
			var type = $(this).attr("type") || $(this)[0].tagName;
			if(type == "button" || type == "reset" || type == "submit" || name == ''){
				return ;
			}
			
			if(formData[name] == undefined || formData[name] == null){
				return ;
				//formData[name] = '';
			}
			
			if(type == "radio"){
				if($(this).val() == formData[name]){
					$(this).prop("checked", true);
				}
			} else if(type == "checkbox"){
				if(checkedValue == formData[name]){
					$(this).prop("checked", true);
				}
			} else if(type == "ui-rating") {
				$(this).rating("setValue", formData[name]);
				
			} else if(type == "ui-switch") {
				$(this).uiswitch("setValue", formData[name]);
				
			} else if(type == "dropdown-tree") {
				//to be implement
			} else if(type == "filtertag") {
				
			} else if(type == 'img'){
				
				$(this).attr("src", formData[name]);
				
			} else if($(this).hasClass("select2-offscreen")) {
				$(this).select2("data", formData[name]);
			} else {
				$(this).val(formData[name]);
			}
		});
		
	};
	
	var validatePatterns = { 
		"required":     [/^[\S+\s*\S+]+$/ig, "不能为空！"],
		"integer":      [/^\d+$/, "必须为整数！"],	
		"numeric":      [/^\d+(\.\d+)?$/, "不是合法的数字！"],
		"currency":     [/^\d+\.\d{1,2}$/, "不是合法的货币数字！"],
		"email":        [/^\w+@\w+(\.\w+)*$/, "不合法email输入！"],
		"phone":        [/^[\d|-]+$/, "不合法phone输入！"],
		"mustChecked":  [/0+/g, "checkbox不能为空！"],
		"mustSelected": [/0+/g, "select不能为空！"],
		"ipAddress":    [/^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/, "不是有效的IP地址！"],
		"netport":      [/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, "不合法端口！"],
		"mac":          [/^[0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}$/, "不合法mac地址！"], 
		"year":         [/^(\d{4})$/, "不合法年！"],
		"mouth":		[/^(\d{4})-(0\d{1}|1[0-2])$/, "不合法月！"],
		"date":         [/^{\d}{4}\-{\d}{2}\-{\d}{2}$/, "不合法日！"],
		"timeHour":		[/^(0\d{1}|1\d{1}|2[0-3])$/, "不合法时！"],  //HH
		"timeMinute":	[/^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/, "不合法分！"], //HH:mm
		"timeSeconds":  [/^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/, "不合法时间！"], //HH:mm:ss
		"chineseOnly":	[/[^\u4E00-\u9FA5]/g, "输入不合法！请只输入中文！"],
		"mobilePhone":  [/^1[\d]{10}$/, "不合法手机号！"],
		//"unicomPhone":  [/^13[0-4]{1}[\d]{8}$/, "不合法！"],
		//"telecomPhone": [/^(\d{7,8})|(\d{3,4}\-\d{7,8})$/, "不合法！"],
		"specials":     [/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>?]{1}[^`~!@$%^&+=\\\][\{\}:;'\,<>?]{0,}$/, "不能输入特殊字符！"],
		"all":          [/^/,""],
		"pattern":      [null, "数据不合法！请确认"]
	};
	
	/**
	 * 表单验证
	 * ui-validate 属性， minlength, maxlength
	 */
	this.validateForm = function($form){
		
		var checkAll = true;
		$form.find("[ui-validate]").each(function(){
			var validate = $(this).attr("ui-validate");
			
			var pattern = $(this).attr('ui-pattern');
			
			var objectReg = new RegExp(/\{.*\}/g);
			
			var name = $(this).attr("name");
			
			var vtext = $(this).attr("ui-vtext");
			
			var type = $(this).attr("type") || $(this)[0].tagName;
			
			if(vtext == undefined || vtext == null || vtext == ''){
				vtext = name;
			}
			
			var value = $.trim(getFormValue($(this)));

			function getPattern(p){
				var reg = null;
				p = $.trim(p);
				if(p == "pattern") {
					reg = [eval("/" + pattern + "/i"), validatePatterns["pattern"][1] ];
				} else {
					reg = validatePatterns[p];  
				}
				if(reg == null) {

					var msg = "[" + vtext + "]验证Pattern配置错误：" + p;
					alert(msg, 'warn');

					throw new Error(msg);
				}
				return reg;
			}
			
			var pats = null;
			var allPatterns = '';
			
			if(objectReg.test(validate)){
				validate = eval("(" + validate + ")");
				
				if(validate.minlength && !isNaN(validate.minlength)){
					if(value.length < validate.minlength){
						alert("[" + vtext + "]不能少于" + validate.minlength + "个字符！", "warn");
						$(this).focus();
						checkAll = false;
						return false;
					}
				}
				
				if(validate.maxlength && !isNaN(validate.maxlength)){
					if(value.length > validate.maxlength){
						alert("[" + vtext + "]不能超过" + validate.maxlength + "个字符！", "warn");
						$(this).focus();
						checkAll = false;
						return false;
					}
				}
				
				pats = validate.pattern.split(",");
				
				allPatterns = validate.pattern;

			} else {
				pats = validate.split(",");
				
				allPatterns = validate;
			}
			
			if(allPatterns != null && allPatterns.indexOf("required") >= 0 || value != '') {
				for(var i = 0; i < pats.length; i++){
					
					var reg = getPattern(pats[i]);
					if(!value.match(reg[0]) || (value.match(reg[0])==-1) && type =="SELECT"){
						var vinfo = $(this).attr("ui-vinfo");
						if(vinfo == undefined || vinfo == null || vinfo == ''){
							vinfo = "[" + vtext + "]" + reg[1];
						}
						alert(vinfo, "warn");
						$(this).focus();
						checkAll = false;
						return false;
					}
				}
			}
			
		});
		
		return checkAll;
	};
			
	 
};
