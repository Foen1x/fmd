package com.tss.formdesigner.parser;

import javax.script.ScriptException;

import net.sf.json.JSONObject;


public interface Parser {

	/**
	 * init the parser before use
	 * @param engine
	 * @param skin
	 * @param lang
	 */
	public void init(String realPath, String skin, String lang) throws Exception;
	
	/**
	 * parse modules json to html
	 * @parma formtype form type
	 * @param env environment variables
	 * @param props
	 * @return
	 */
	public StringBuilder parseForm(String formtype, String env, String settings) throws Exception;
	
	/**
	 * get form js parser config by formtype
	 * @param formtype
	 * @return
	 * @throws ScriptException
	 */
	public JSONObject getFormJsParserConfig(String formtype) throws ScriptException;
	
	/**
	 * parse modules json to html
	 * @param moduleList
	 * @param props
	 * @return
	 */
	public JSONObject parseModules(String moduleList, String props) throws Exception;
}
