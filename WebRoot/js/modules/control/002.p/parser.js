//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl : html
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:p:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '') +
			'>'+
			prop["i18nname-"+Parser.lang]+'</span>'+
			'<span class="item"><span class="readonly" id="'+conf.id+'"' +
			'>{{b.'+prop.databinding+'}}</span>'+
			'<input type="hidden" name="'+conf.id+'"'+
			' desc="'+ prop["i18nname-" + Parser.lang]+'"' +
			' databinding="'+ prop.databinding+ '"'+
			(prop.processbinding ? (' binding="'+ prop.processbinding+'"'):'')+
			' ng-model="b.'+prop.databinding+'"' +
			' ng-bind="b.'+prop.databinding+'"' +
			'/></span>';
};

/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:p:bootstrap-blue:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	var atomwidth = 100/conf.maxspans/3;
	/*var widthlabel = ' style="width:'+atomwidth+'%;"';
	var widthcontrol = ' style="width:'+atomwidth*2+'%;"';*/
	var widthlabel = ' style="width:120px;"';
	var widthcontrol = ' style="width:100%;"';
	return '<label for="'+conf.id+'"'+widthlabel+'>'+prop["i18nname-"+Parser.lang]+'</label><span id="'+conf.id+'"'+widthcontrol+' class="form-control-div help-block"></span>';
};




