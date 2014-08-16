//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl : html
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:input:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	/*return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '')
			+ '>'
			+ (prop.required=='1' ? '<span class="xh">*</span>' : '')
			+ prop["i18nname-" + Parser.lang] + '</span>'
			+ '<span class="item"><input type="text" '
			+ (prop.disabled=='1' ? ' readonly="readonly"' : '')
			+ (prop.style ? ' style="'+prop.style+'"' : '')
			+ (' class="input'+(prop.classNames ? prop.classNames : '')+'"')
			+ ' databinding="'+ prop.databinding+'"'
			+ (prop.processbinding ? ' binding="'+ prop.processbinding+ '"' : '')
			+ ' maxlength="'+ prop.maxlength 
			+ '" id="' + conf.id 
			+ '" desc="'+ prop["i18nname-" + Parser.lang] 
			+ '" name="' + conf.id+ '"'
			+ ' ng-model="b.'+prop.databinding+'"'
			+ '/></span>';*/
	return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '')
			+ '>'
			+ (prop.required=='1' ? '<span class="xh">*</span>' : '')
			+ '${i18nname-'+Parser.lang+'}</span>'
			+ '<span class="item"><input type="text" '
			+ (prop.disabled=='1' ? ' readonly="readonly"' : '')
			+ (prop.style ? ' style="'+prop.style+'"' : '')
			+ (' class="input'+(prop.classNames ? prop.classNames : '')+'"')
			+ ' databinding="${databinding}"'
			+ (prop.processbinding ? ' binding="'+ prop.processbinding+ '"' : '')
			+ ' maxlength="${maxlength}"' 
			+ ' id="${id}"'
			+ ' desc="${i18nname-'+Parser.lang+'}"'
			+ ' name="${id}"'
			+ ' ng-model="b.'+prop.databinding+'"'
			+ '/></span>';
};


/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:input:bootstrap-blue:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	var atomwidth = 100/conf.maxspans/3;
	/*var widthlabel = ' style="width:'+atomwidth+'%;"';
	var widthcontrol = ' style="width:'+atomwidth*2+'%;"';*/
	var widthlabel = ' style="width:120px;"';
	var widthcontrol = ' style="width:100%;"';
	return '<label for="'+conf.id+'"'+widthlabel+'>'+prop["i18nname-"+Parser.lang]+'</label>'+
				'<div class="form-control-div" '+widthcontrol+'>'+
				'<input id="'+conf.id+'" type="text" class="form-control" placeholder="'+(prop.placeholder?prop.placeholder:'')+'">'+
			'</div>';
};

