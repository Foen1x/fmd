//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

Parser["layout:tab:bootstrap-blue"] = function(conf, props) {
	
	return '<div class="tab-pane fade in active"'+(conf.id ? " id='"+conf.id+"'":"")+'>${children}</div>';
};

