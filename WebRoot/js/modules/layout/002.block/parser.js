//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

/**
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["layout:block:default:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	var style = Parser.cssDisplay(prop.display)+(prop.style?prop.style:"")+(prop.margintop?"margin-top:"+prop.margintop:"");
	return '<div id="'+conf.id+'" class="mk '+
					(prop.classNames?prop.classNames:'')+
					'" style="'+style+'">' +
				'<h2 class="mk_title">'+prop["i18nname-"+Parser.lang]+'<img src="<%=resPath%>/css/images/mk_title_imgz.jpg" width="15" height="15" /></h2>'+
				'<table class="tb_'+conf.maxspans+'td" width="100%" border="0" cellspacing="0" cellpadding="0">'+
				'${children}'+
				'</table>'+
			'</div>';
};

/**
 * conf - configuration properties for layout
 * prop - properties
 * parentconf - parent element conf
 * parentprop - parent element prop
 */
Parser["layout:block:bootstrap-blue:Json2htmlParser:html"] = function(conf, prop, parentconf, parentprop) {
	var style = Parser.cssDisplay(prop.display)+(prop.style?prop.style:"")+(prop.margintop?"margin-top:"+prop.margintop:"");
	var header = prop.noheader == '0' ?
				('<div class="panel-heading">' +
					'<h3 class="panel-title">'+prop["i18nname-"+Parser.lang]+'</h3>' +
				'</div>') :'';
	return '<div id="'+conf.id+'" class="panel panel-info container '+
					(prop.classNames?prop.classNames:'')+
					'" style="'+style+'">' +
				header+
				'<div class="panel-body">' +
					'<div class="table-responsive form-inline">' +
						'<table class="table">' +
							'<tbody>' +
							'${children}'+
							'</tbody>' +
						'</table>' +
					'</div>' +
				'</div>' +
			'</div>';
};

