/**
 * @function namespace/signatrue - Component type : Control type : Parser.formskin : Parser.impl : html
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["control:select:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	Parser.log(JSON.stringify(parentconf));
	Parser.log(JSON.stringify(parentprop));
	
	//if (prop["dataprovider"]=='dataprovider-dict') {
	var dpval = prop[prop["dataprovider"]];
	//Parser.fmdv.dict[dpval] = prop["dataprovider"];
		
	/*} else if (prop["dataprovider"]=='dataprovider-restsrv'){
		Parser.fmdv.restsrv[prop["dataprovider-restsrv"]] = true;
	}*/
	
	//parse option function
	/*this.parseOptions = function(arr) {
		if (!arr || !arr.length) return;
		var rtn = '';
		for (var i=0; i<arr.length; i++) {
			rtn += '<option value="'+arr[i].key+'">'+arr[i].value+'</option>';
		}
		return rtn;
	};*/
	
	//html
	/*return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '')
			+ '>'
			+ (prop.required=='1' ? '<span class="xh">*</span>' : '')
			+ prop["i18nname-" + Parser.lang] + '</span>'
			+ '<span class="item"><select '
			+ (prop.disabled=='1' ? ' disabled="true"' : '')
			+ (prop.style ? ' style="'+prop.style+'"' : '')
			+ (' class="select '+(prop.classNames ? prop.classNames : '')+'"')
			+ ' databinding="'+ prop["databinding-realvalue"] +'"'
			+ (prop["processbinding-realvalue"] ? ' binding="'+ prop["processbinding-realvalue"] + '"' : '')
			+ ' size="'+(prop.size||'1')+'"'
			+ ' id="' + conf.id +'"'
			+ ' desc="'+ prop["i18nname-" + Parser.lang] +'"'
			+ ' name="' + conf.id+ '"'
			+ ' dict="' + prop["dataprovider-dict"]+ '"'
			+ ' ng-model="b.'+prop["databinding-realvalue"]+'"'
			//+ ' ng-bind="b.'+prop["databinding-realvalue"]+'"'
			+ ' data-ng-options="obj.key as obj.value for obj in m.enu.'+prop["dataprovider-dict"]+'"'
			+ '>'
			//+ '<option ng-repeat="i in m.enu.'+prop["dataprovider-dict"]+'" value="{{i[0]}}">{{i[1]}}</option>'
			//+ '<option ng-repeat="i in m.enu.'+prop["dataprovider-dict"]+'" value="{{i.key}}">{{i.value}}</option>'
			//+ this.parseOptions(datactx.m.enu[prop["dataprovider-dict"]])
			+ '</select></span>';*/
	
	return '<span class="label"'+
			(prop["i18ntip-"+Parser.lang] ? (' original-title="'+prop["i18ntip-"+Parser.lang]+'"') : '')
			+ '>'
			+ (prop.required=='1' ? '<span class="xh">*</span>' : '')
			+ prop["i18nname-" + Parser.lang] + '</span>'
			+ '<span class="item"><select '
			+ (prop.disabled=='1' ? ' disabled="true"' : '')
			+ (prop.style ? ' style="'+prop.style+'"' : '')
			+ (' class="select '+(prop.classNames ? prop.classNames : '')+'"')
			+ ' size="'+(prop.size||'1')+'"'
			+ ' id="' + conf.id +'"'
			+ ' ng-model="b.'+prop["databinding-realvalue"]+'"'
			+ ' onchange="fmdf.onchangeOfSelect(\''+conf.id+'\')"'
			+ '>'
			//+ '<option ng-repeat="i in m.enu.'+prop["dataprovider-dict"]+'" value="{{i.key}}"'
			+ '<option ng-repeat="i in m.enu[\''+dpval+'\']" value="{{i.key}}"'
				+' ng-selected="{{i.key==b.'+prop["databinding-realvalue"]+'}}">{{i.value}}</option>'
			+ '</select>'
			+ '<input type="hidden"'
			+ ' value="{{b.'+prop["databinding-realvalue"]+'}}"'
			+ ' desc="'+ prop["i18nname-" + Parser.lang] +'"'
			+ ' name="' + conf.id+ '"'
			+ ' databinding="'+ prop["databinding-realvalue"] +'"'
			+ (prop["processbinding-realvalue"] ? ' binding="'+ prop["processbinding-realvalue"] + '"' : '')
			+ '/>'
			+ '<input type="hidden"'
			+ ' value="{{b.'+prop["databinding-displayvalue"]+'}}"'
			+ ' desc="'+ prop["i18nname-" + Parser.lang] +'"'
			+ ' name="' + conf.id+ '"'
			+ ' databinding="'+ prop["databinding-displayvalue"] +'"'
			+ (prop["processbinding-displayvalue"] ? ' binding="'+ prop["processbinding-displayvalue"] + '"' : '')
			+ '/>'
			+ '</span>';
};



