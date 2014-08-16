package com.tss.formdesigner.parser;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import com.tss.util.FmdSettings;

public class ParserManager {
	
	public static Parser getParser(String name) {
		try {
			return (Parser) Class.forName(name).newInstance();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static ScriptEngine initScriptEngine(String implShortName, String realPath, String skin, String lang) throws Exception {
		ScriptEngineManager engineManager = new ScriptEngineManager();
		// 得到脚本引擎
		ScriptEngine engine = engineManager.getEngineByName("JavaScript");
		// 引入工具库
		engine.eval(new java.io.FileReader(
				realPath + "/js/3rdpartyother/json2.js"));
		engine.eval(new java.io.FileReader(
				realPath + "/js/3rdpartyother/json2html.js"));
		
		engine.eval("Parser = function() {};");
		engine.eval("Parser.formskin='"+skin+"';");
		engine.eval("Parser.lang='"+lang+"';");
		engine.eval("Parser.impl='"+implShortName+"';");
		engine.eval("println('Parser.formskin=='+Parser.formskin)");
		engine.eval("println('Parser.lang=='+Parser.lang)");
		engine.eval("println('Parser.impl=='+Parser.impl)");
		
		engine.eval(new java.io.FileReader(
				realPath + FmdSettings.getValue(FmdSettings.MODULE_PATH_BASE) + "/"+implShortName+".js"));
		return engine;
	}
}
