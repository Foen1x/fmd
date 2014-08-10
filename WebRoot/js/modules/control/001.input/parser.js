//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

Parser["control:input:bootstrap-blue"] = function(conf, prop) {
	
	return '<label for="'+conf.id+'">'+prop["i18nname-"+Parser.lang]+'</label>'+
				'<div class="form-control-div">'+
				'<input id="'+conf.id+'" type="text" class="form-control" placeholder="'+(prop.placeholder?prop.placeholder:'')+'">'+
			'</div>';
};

