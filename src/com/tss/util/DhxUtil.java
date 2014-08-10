package com.tss.util;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 
 * @author Johnny
 *
 */
public class DhxUtil {

	public static final String EMPTY_GRIDJSON = "{\"rows\":[]}";
	
	public static final String ROWS = "rows";
	
	public static final String DATA = "data";
	
	public static final String ID = "id";
	
	public static final String POS = "pos";
	
	public static final String TOTAL_COUNT = "total_count";
	
	public static final String GRID_DATEFORMAT_EN = "%M/%D/%Y";
    
	public static final String GRID_DATEFORMAT_ZH = "%Y-%M-%D";
	
	private static Logger logger = Logger.getLogger(DhxUtil.class.getName());
	
	/**
	 * translate db result to grid json
	 * @param list
	 * @param cols
	 * @param fromRow
	 * @param total
	 * @param timezoneOffset
	 * @param lang
	 * @return
	 */
	public static String toGridJsonStr(List<Map<String, ?>> list, String[] cols, int fromRow, int total, int timezoneOffset, String lang) {
		if (list==null) {
			return null;
		}
		if (list.size()==0) {
			return EMPTY_GRIDJSON;
		}
		JSONObject rtn = new JSONObject();
		JSONArray rows = new JSONArray();
		for (int i=0; i<list.size(); i++) {
			JSONObject row = new JSONObject();
			JSONArray data = new JSONArray();
			data.add(fromRow + i);//ROW NUMBER
			for (String col : cols) {
				data.add(formatValue(list.get(i).get(col), DateUtil.getSSFormatByLang(lang), lang, timezoneOffset));
			}
			row.put(ID, fromRow + i -1);
			row.put(DATA, data);
			rows.add(row);
		}
		rtn.put(ROWS, rows);
		rtn.put(TOTAL_COUNT, total);
		rtn.put(POS, fromRow -1);
		return rtn.toString();
	}
	
	/**
	 * format value by format predefined in ts_tablecolumnmeta
	 * @param f
	 * @param val
	 * @return
	 */
	public static String formatValue(Object val, String f, String lang, int timezoneoffset) {
		if (val==null) {
			return null;
		}
		if (val instanceof java.math.BigDecimal) {
			return val.toString();
		} else if (val instanceof java.sql.Timestamp) {
			Date d = new Date(((java.sql.Timestamp)val).getTime());
			if (f!=null && f.length()>0) {
				return DateUtil.formatDate(d, f, timezoneoffset);
			}
			return DateUtil.formatDate(d, DateUtil.getSSFormatByLang(lang), timezoneoffset);
		} else {
			return val.toString();
		}
	}
	
	/**
	 * parse order by columns to order by clause
	 * @param ordercolumns
	 * @return
	 */
	public static String parseGridOrderBy(String ordercolumns) {
		if (ordercolumns==null || ordercolumns.trim().length()==0) return "";
		JSONArray ocs = JSONArray.fromObject(ordercolumns);
		StringBuilder sb = new StringBuilder(" ORDER BY");
		for (int i=0; i<ocs.size(); i++) {
			JSONObject oc = ocs.getJSONObject(i);
			String key = (String) oc.keySet().iterator().next();
			sb.append(i>0?",":" ").append(key).append(" ").append(oc.getString(key));
		}
		logger.finer("parseGridOrderBy translated "+ordercolumns+" to "+sb);
		return sb.toString();
	}
	
}
