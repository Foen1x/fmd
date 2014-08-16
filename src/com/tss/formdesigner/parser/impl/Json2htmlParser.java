package com.tss.formdesigner.parser.impl;

import java.io.File;
import java.io.FileReader;

import net.sf.json.JSONObject;

import com.tss.formdesigner.parser.AbstractJsParser;
import com.tss.util.FmdSettings;

public class Json2htmlParser extends AbstractJsParser {
	
	/**
	 * parse modules json to html
	 * @parma type form type
	 * @param env environment variables
	 * @param props
	 * @return
	 */
	public StringBuilder parseForm(String formtype, String env, String settings) throws Exception {
		String templateName = realPath + FmdSettings.getValue(FmdSettings.MODULE_PATH_BASE) + "/form/"+formtype+"/template.jsp."+this.skin+"-"+this.lang;
		File file = new File(templateName+".txt");
		FileReader reader = new FileReader(file);
        char[] chars = new char[(int)file.length()];
        reader.read(chars);
		String template = String.valueOf(chars);
		reader.close();
		engine.put("formtemplate", template);
		StringBuilder cmd = new StringBuilder();
		cmd.append("(function(){")
			.append("  var env="+env+";")//make it local
			.append("  var settings="+settings+";")//make it local
			.append("  Parser.log('env='+JSON.stringify(env));")
			.append("  Parser.log('settings='+JSON.stringify(settings));")
			.append("  return Parser.parseForm('"+formtype+"', env, settings);")
			.append("})();");
		logger.finer("parseForm function="+cmd);
		String html=(String)engine.eval(cmd.toString());//run
		logger.finer("parseModules return:\n"+html);
		return new StringBuilder(html);
	}
	
	/**
	 * parse all modules
	 */
	public JSONObject parseModules(String moduleList, String props) throws Exception {
		engine.eval("var confs="+moduleList);
		engine.eval("var props="+props);
		engine.eval("Parser.log(JSON.stringify(confs))");
		engine.eval("Parser.log(JSON.stringify(props))");
		engine.eval("var rtnmodules = Parser.parseModules(confs, props)");
		String html=(String)engine.eval("rtnmodules");
		String generatedScripts=(String)engine.eval("Parser.generatedscript ? Parser.generatedscript : ''");
		String fmdv=(String)engine.eval("JSON.stringify(Parser.fmdv)");
		logger.finer("parseModules return html:\n"+html);
		logger.finer("parseModules return generated_scripts:\n"+generatedScripts);
		logger.finer("parseModules return fmdv:\n"+fmdv);
		JSONObject rtn = new JSONObject();
		rtn.put("html", html);
		rtn.put("generatedscript", generatedScripts);
		rtn.put("fmdv", fmdv);
		return rtn;
	}

}
