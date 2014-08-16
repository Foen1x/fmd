//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

Parser["layout:tr:default:Json2htmlParser:html"] = function(conf, prop) {
	return '<tr>${children}</tr>';
};

Parser["layout:tr:bootstrap-blue:Json2htmlParser:html"] = function(conf, prop) {
	return '<tr>${children}</tr>';
};

