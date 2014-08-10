package com.tss.formdesigner.parser;


public interface Parser {

	/**
	 * init the parser before use
	 * @param engine
	 * @param skin
	 * @param lang
	 */
	public void init(String realPath, String skin, String lang) throws Exception;
	
	/**
	 * parse module json to html
	 * @param moudleCategory
	 * @param moduleName
	 * @return
	 */
	//public StringBuilder parseModule(String conf, String prop) throws Exception;
	
	public StringBuilder parseModules(String moduleList, String props) throws Exception;
}
