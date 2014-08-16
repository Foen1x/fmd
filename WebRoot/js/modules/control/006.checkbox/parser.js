/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl : html
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:checkbox:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '') +
			'>'+
			prop["i18nname-"+Parser.lang]+'</span>'+
			'<span class="item"><span class="checkb">'+
			'<input type="checkbox" name="'+conf.id+'"'+
			' desc="'+ prop["i18nname-" + Parser.lang]+'"' +
			' databinding="'+ prop.databinding+ '"'+
			(prop.processbinding ? (' binding="'+ prop.processbinding+'"'):'')+
			' ng-true-value="1" ng-false-value="0" ' +
			' ng-model="b.'+prop.databinding+'"' +
			'/></span></span>';
};


