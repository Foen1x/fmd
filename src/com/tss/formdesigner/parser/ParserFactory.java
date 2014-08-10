package com.tss.formdesigner.parser;

public class ParserFactory {
	
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

}
