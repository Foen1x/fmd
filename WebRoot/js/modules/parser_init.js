/**
 * Parser holder for all parser functions for all modules
 * and all global variables for parsing such as lang and skin
 * Initialized in java parse engine
 */
//Parser = function Parser() {};

/**
 * translate json array to html
 * @param ar
 * @param props
 * @returns {String}
 */
Parser["toHtml"] = function(ar, props){
	var s = "";
	if (!ar || !ar.length) {
		return s;
	}
	for (var i in ar) {
		var tr = {"tag":"i"};
		var funckey = ar[i].compType+":"+ar[i].type+":"+Parser.formskin;
		println("finding function: "+funckey);
		var parserfunc = Parser[funckey];
		tr.html = parserfunc(ar[i], ar[i].id ? (props[ar[i].id] || {}):{});
		println("got html:"+tr.html);
		var wrapper = json2html.transform({"children":this.toHtml(ar[i].items, props)}, tr);
		s += wrapper.substr(0, wrapper.length-4).substr(3);
	}
	return s;
};

Parser["cssDisplay"] = function(display) {
	if ('displaynone'==display) {
		return 'display:none;';
	} else if ('displayblockinline'==display) {
		return 'display:inline;';
	} else if ('visibilityhidden'==display) {
		return 'visibility:hidden;';
	} else {
		return 'display:block;';
	}
};

