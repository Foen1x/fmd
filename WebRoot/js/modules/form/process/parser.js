//Parser object that contains all parser for all skins
//Parser = function Parser() {}; //No need to initialize

/**
 * skin bootstrap-blue
 */

/**
 * skin default
 */
Parser["form:process:default:Json2htmlParser:html"] = function(env, prop) {
	var tr = {"tag":"i"};
	//Parser.log("formtemplate: "+formtemplate);
	tr.html = formtemplate;
	var wrapper = json2html.transform(prop, tr);
	var html = wrapper.substr(0, wrapper.length-4).substr(3);
	Parser.log("got html:"+html);
	return html;
};
//parser config holds some extra configuration which will be used in java parser engine
Parser["form:process:default:Json2htmlParser:parserconfig"] = {"wrapper_page":"wrapper.jsp"};

/**
 * skin bootstrap-blue
 */
Parser["form:process:bootstrap-blue:Json2htmlParser:html"] = function(env, prop) {
	var tr = {"tag":"i"};
	//Parser.log("formtemplate: "+formtemplate);
	tr.html = formtemplate;
	var wrapper = json2html.transform(prop, tr);
	var html = wrapper.substr(0, wrapper.length-4).substr(3);
	Parser.log("got html:"+html);
	return html;
};
Parser["form:process:bootstrap-blue:Json2htmlParser:parserconfig"] = {"wrapper_page":"wrapper.jsp"};

