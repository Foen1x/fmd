package com.tss.formdesigner.parser;

import com.tss.util.FmdSettings;


public class ParserManager {
	
	public static AbstractJsParser getParser() {
		try {
			AbstractJsParser parser = (AbstractJsParser) Class.forName(FmdSettings.getValue(FmdSettings.PARSER_IMPL)).newInstance();
			return parser;
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

}
