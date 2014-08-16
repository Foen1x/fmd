/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl : html
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:textarea:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '')
			+ '>'
			+ (prop.required=='1' ? '<span class="xh">*</span>' : '')
			+ prop["i18nname-" + Parser.lang] + '</span>'
			+ '<span class="item"><textarea '
			+ (prop.disabled=='1' ? ' readonly="readonly"' : '')
			+ (prop.style ? ' style="'+prop.style+'"' : '')
			+ (' class="area '+(prop.classNames ? prop.classNames : '')+'"')
			+ ' databinding="'+ prop.databinding+'"'
			+ (prop.processbinding ? ' binding="'+ prop.processbinding+ '"' : '')
			+ ' rows="'+(prop.rows||'1')+'" maxlength="'+ prop.maxlength +'"'
			+ ' ng-model="b.'+prop.databinding+'"'
			+ ' ng-bind="b.'+prop.databinding+'"'
			+ ' id="' + conf.id +'"'
			+ ' desc="'+ prop["i18nname-" + Parser.lang] +'"'
			+ ' name="' + conf.id+ '"></textarea></span>';
};

