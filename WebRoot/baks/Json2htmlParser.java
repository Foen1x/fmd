package com.tss.formdesigner.parser.impl;

import java.io.File;
import java.io.FileFilter;
import java.io.FileNotFoundException;
import java.util.logging.Logger;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import com.tss.formdesigner.parser.AbstractJsParser;
import com.tss.formdesigner.parser.ParserManager;
import com.tss.util.FmdSettings;

public class Json2htmlParser implements Parser {
	
	private Logger logger = Logger.getLogger(Json2htmlParser.class.getName());
	
	private ScriptEngine engine;
	private String skin;
	private String realPath;
	private String lang;
	
	public void init(String realPath, String skin, String lang) throws Exception {
		this.skin = skin;
		this.realPath = realPath;
		this.lang = lang;
		// 得到脚本引擎
		this.engine = ParserManager.initScriptEngine(this.getClass().getSimpleName(), realPath, skin, lang);
	}
	
	/*public StringBuilder parseModule(String conf, String prop) throws Exception {
		ScriptEngine engine = newEngine();
		engine.eval("Parser = function Parser() {};");
		engine.eval("var conf="+conf);
		engine.eval("var prop="+prop);
		String id = (String) engine.eval("conf.id");
		String moudleCategory = (String) engine.eval("conf.compType");
		String moduleName = (String) engine.eval("conf.type");
		logger.finer("parseModule id="+id + " moudleCategory="+moudleCategory +" moduleName="+moduleName);
		engine.eval(new java.io.FileReader(realPath + 
				FmdSettings.getValue(FmdSettings.MODULE_PATH_BASE) + 
				moudleCategory + "/" +
				ModuleUtil.getModuleFolder(realPath, moudleCategory, moduleName) +
				"/parser.js"));
		engine.eval("var parserfunc = Parser['"+skin+"'];");
		String html = (String)engine.eval("parserfunc(conf, prop)");
		logger.finer("parseModule return:\n"+html);
		return new StringBuilder(html);
	}*/
	
	private void importAllModules(ScriptEngine engine) throws FileNotFoundException, ScriptException {
		File mFolder = new File(realPath + 
				FmdSettings.getValue(FmdSettings.MODULE_PATH_BASE));
		File[] types = mFolder.listFiles(new FileFilter(){
			@Override
			public boolean accept(File arg0) {
				return arg0.isDirectory();
			}
		});
		for (File t : types) {
			logger.finer(t.getName());
			String[] mns = t.list();
			for (String mn : mns) {
				File mnf = new File(realPath + 
						FmdSettings.getValue(FmdSettings.MODULE_PATH_BASE) + "/"+ t.getName()+"/"+mn+"/parser.js");
				if (mnf.exists()) {
					engine.eval(new java.io.FileReader(mnf));
				}
			}
		}
	}
	
	public StringBuilder parseModules(String moduleList, String props) throws Exception {
		importAllModules(engine);
		engine.eval("var confs="+moduleList);
		engine.eval("var props="+props);
		engine.eval("println(JSON.stringify(confs))");
		engine.eval("println(JSON.stringify(props))");
		engine.eval("var rtn = Parser.toHtml(confs, props)");
		String html=(String)engine.eval("rtn");
		logger.finer("parseModule return:\n"+html);
		return new StringBuilder(html);
	}

}
