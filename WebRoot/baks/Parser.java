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
	 * parse modules json to html
	 * @param moduleList
	 * @param props
	 * @return
	 */
	public StringBuilder parseModules(String moduleList, String props) throws Exception;
}
