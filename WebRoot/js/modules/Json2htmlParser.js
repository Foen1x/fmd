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
Parser["parseForm"] = function(formtype, env, prop){
	var funckey = "form:"+formtype+":"+Parser.formskin+":"+Parser.impl+":html";
	Parser.log("finding function: "+funckey);
	var parserfunc = Parser[funckey];
	!parserfunc && Parser.warning("Failed to find function with signature:"+funckey);
	var html = parserfunc(env, prop);
	return html;
};

/**
 * translate json array to html
 * @param ar
 * @param props
 * @returns {String}
 */
Parser["parseModules"] = function(root, props){
	var s = "";
	var ar = root.items;
	if (!ar || !ar.length) {
		return s;
	}
	for (var i in ar) {
		var tr = {"tag":"i"};
		var funckey = ar[i].compType+":"+ar[i].type+":"+Parser.formskin+":"+Parser.impl+":html";
		Parser.log("finding function: "+funckey);
		var parserfunc = Parser[funckey];
		!parserfunc && Parser.warning("Failed to find function with signature:"+funckey);
		var prop1 = ar[i].id ? (props[ar[i].id] || {}):{};
		Parser.parseDataProvider(prop1);
		tr.html = parserfunc(ar[i], prop1, root, root.id ? (props[root.id] || {}):{});
		Parser.log("got html:"+tr.html);
		prop1.children = this.parseModules(ar[i], props);
		var wrapper = json2html.transform(prop1, tr);
		s += wrapper.substr(0, wrapper.length-4).substr(3);
	}
	return s;
};


//translate css display from properties value
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


Parser["parseDataProvider"] = function(prop) {
	var dptypeval = prop["dataprovider"];
	if (!dptypeval) return;
	
	var dptype = {"type":dptypeval};
	var dpval = prop[prop["dataprovider"]];
	
	if (dptypeval=="dataprovider-restsrv") {
		var rusr = prop["dataprovider-restsrv-usr"];
		if (rusr) {
			dptype["dataprovider-restsrv-usr"] = rusr;
			dptype["dataprovider-restsrv-pwd"] = prop["dataprovider-restsrv-pwd"];
		}
	}
	Parser.fmdv.dataprovider[dpval] = dptype;
};


