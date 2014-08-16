//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:popupinput:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	return '<span class="label"'+
				(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '')
				+ '>'+prop["i18nname-"+Parser.lang]+'</span>'+
			'<span class="item input-s">'+
				'<input class="input-xz input_s" id="'+conf.id+'" name="'+conf.id+
				'" type="text" value=""'+
				(prop.disabled=='1' ? ' readonly="readonly"' : '') +
				(prop["processbinding-displayvalue"] ? (' binding="'+prop["processbinding-displayvalue"]+'"') : '')+
				' desc="'+prop["i18nname-"+Parser.lang]+'"'+
				' databinding="'+prop["databinding-displayvalue"]+'" maxlength="'+ prop.maxlength + '"' +
				' ng-model="b.'+prop["databinding-displayvalue"]+'"' +
				//' ng-bind="b.'+prop["databinding-displayvalue"]+'"' +
				' onchange="fmdf.onPopupinputChange(event)"' +
				'/>'+
				'<span class="tip inp-tip" onclick="fmdf.onPopupinputBtnClick(event)"><i class="icon-find"></i></span>'+
				//hidden for realvalue
				'<input name="'+conf.id+
				'" type="hidden" value=""'+
				(prop["processbinding-realvalue"] ? (' binding="'+prop["processbinding-realvalue"]+'"') : '')+
				' desc="'+prop["i18nname-"+Parser.lang]+'"'+
				' databinding="'+prop["databinding-realvalue"]+'"' + 
				' ng-model="b.'+prop["databinding-realvalue"]+'"' +
				//' ng-bind="b.'+prop["databinding-realvalue"]+'"' +
				'"/>'+
			'</span>';
};

/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:popupinput:bootstrap-blue:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	var atomwidth = 100/conf.maxspans/3;
	/*var widthlabel = ' style="width:'+atomwidth+'%;"';
	var widthcontrol = ' style="width:'+atomwidth*2+'%;"';*/
	var widthlabel = ' style="width:120px;"';
	var widthcontrol = ' style="width:100%;"';
	return '<label for="'+conf.id+'"'+widthlabel+'>'+prop["i18nname-"+Parser.lang]+'</label>'+
				'<div class="form-group has-feedback" '+widthcontrol+'>'+
				'<input id="'+conf.id+'" type="text" class="form-control" placeholder="'+(prop.placeholder?prop.placeholder:'')+'">'+
				'<span style="cursor:pointer" class="glyphicon glyphicon-search form-control-feedback"></span>'+
			'</div>';
	  
};

