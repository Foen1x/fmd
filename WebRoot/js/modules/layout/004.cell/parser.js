//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

Parser["layout:cell:bootstrap-blue"] = function(conf, prop) {
	var width = parseInt(100/conf.maxspans*(conf.colspan==undefined ? 1 : parseInt(conf.colspan)))+'%';
	return '<td'+(conf.id ? ' id="'+conf.id+'"':'')+
		(conf.colspan ? ' colspan="'+conf.colspan+'"' : '') +
		(conf.rowspan ? ' rowspan="'+conf.rowspan+'"' : '') +
		' style="width:'+width+';">${children}</td>';
};

