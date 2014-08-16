(function() {
	var env = {
		"ctxpath" : "http://localhost:8080/fmd"
	};
	var settings = {
		"refscript" : "",
		"readyscript" : "",
		"bodyscript" : ""
	};
	Parser.log('env=' + JSON.stringify(env));
	Parser.log('settings=' + JSON.stringify(settings));
	return Parser.parserForm('process', env, settings);
});