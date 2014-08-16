//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl : html
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:radio:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	
	var dpval = prop[prop["dataprovider"]];
	
	return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '')
			+ '>'
			+ (prop.required=='1' ? '<span class="xh">*</span>' : '')
			//+ prop["i18nname-" + Parser.lang] + '</span>'
			+ '${i18nname-'+Parser.lang+'}</span>'
			+ '<span class="item">'
			+ '<span style="line-height:30px;" ng-repeat="i in m.enu[\''+dpval+'\']">'
			+ '<input class="radio" type="radio"'
			+ ' id="${id}_{{i.key}}"'
			+ ' name="${id}" value="{{i.key}}" '
			+ ' ng-model="b.${databinding}"'
			+ ' />'
			+ '<label for="${id}_{{i.key}}">{{i.value}}</label>'
			+ '</span>'
			+ '</span>';
};
