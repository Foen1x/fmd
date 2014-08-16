//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

Parser["layout:tab:default:Json2htmlParser:html"] = function(conf, props, parentconf, parentprop) {
	
	return '<div class="tab-pane fade in active"'+(conf.id ? " id='"+conf.id+"'":"")+'>${children}</div>';
};

Parser["layout:tab:bootstrap-blue:Json2htmlParser:html"] = function(conf, props, parentconf, parentprop) {
	
	return '<div class="tab-pane fade in active"'+(conf.id ? " id='"+conf.id+"'":"")+'>${children}</div>';
};

