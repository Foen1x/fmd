//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

Parser["layout:block:bootstrap-blue"] = function(conf, prop) {
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

