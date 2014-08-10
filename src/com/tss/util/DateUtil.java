package com.tss.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.SimpleTimeZone;

public class DateUtil {

	/**
	 * GMT tag
	 */
	public static final String GMT = "GMT";

	/**
	 * 以毫秒为单位，一秒
	 */
	public static final long SECOND = 1000;

	/**
	 * 以毫秒为单位，一分钟
	 */
	public static final long MINUTE = SECOND * 60;

	/**
	 * 以毫秒为单位，一小时
	 */
	public static final long HOUR = MINUTE * 60;

	/**
	 * 以毫秒为单位，一天
	 */
	public static final long DAY = HOUR * 24;

	/**
	 * 以毫秒为单位，一周
	 */
	public static final long WEEK = DAY * 7;

	/**
	 * 中文星期数组,CNWEEK[0]为星期日
	 */
	public static final String[] CNWEEK = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };

	/**
	 * 英文星期数组,CNWEEK[0]为Sun
	 */
	public static final String[] ENWEEK = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };

	/**
	 * 英文月份数组,ENMONTH[0]为一月
	 */
	public static final String[] ENMONTH = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };

	/**
	 * 数字月份数组,ENMONTH[0]为01
	 */
	public static final String[] NUMMONTH = { "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" };

	// public static final String DATEFORMATDD_EN = "MM/dd/yyyy";
	public static final String DATEFORMATDD_ZH = "yyyy-MM-dd";

	// public static final String DATEFORMATMM_EN = "MM/dd/yyyy HH:mm";
	public static final String DATEFORMATMM_ZH = "yyyy-MM-dd HH:mm";

	// public static final String DATEFORMATSS_EN = "MM/dd/YYYY HH:mm:ss";
	public static final String DATEFORMATSS_ZH = "yyyy-MM-dd HH:mm:ss";
	// public static final String DATEFORMATSS_HU = "yyyy.MM.dd HH:mm:ss";

	/**
	 * 默认的日期格式:yyyy-MM-dd HH:mm:ss
	 */
	public static final String DEFAULTFORMAT = DATEFORMATSS_ZH;

	/**
	 * 日期格式数据 0 → 默认的日期格式yyyy-MM-dd HH:mm:ss(24小时制) 1 → yyyy-MM-dd
	 * hh:mm:ss(12小时制) 2 → yyyy-MM-dd 3 → dd MM yyyy HH:mm:ss z 4 → yyyy/MM/dd
	 * HH:mm:ss 5 → yyyy/MM/dd 6 → yyyy-MM-dd HH:mm:ss.S
	 */
	public static final String[] DATEFORMATS = { DEFAULTFORMAT, "yyyy-MM-dd hh:mm:ss", DATEFORMATDD_ZH, "dd MM yyyy HH:mm:ss z", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd", "yyyy-MM-dd HH:mm:ss.S", };
	
	/**
	 * Get GMT date string by format
	 * 
	 * @param format
	 * @return
	 */
	public static String getGMTDateForFormat(String format) {
		Date d1 = new Date();
		SimpleDateFormat f = new SimpleDateFormat(format);
		f.setTimeZone(new SimpleTimeZone(0, GMT));
		return f.format(d1);
	}

	/**
	 * Get GMT date
	 * 
	 * @param format
	 * @return
	 */
	public static Date getGMTDate() {
		Date d1 = new Date();
		SimpleDateFormat f = new SimpleDateFormat(DATEFORMATSS_ZH);
		f.setTimeZone(new SimpleTimeZone(0, GMT));
		Date date = null;
		SimpleDateFormat f2 = new SimpleDateFormat(DATEFORMATSS_ZH);
		try {
			date = f2.parse(f.format(d1));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	/**
     * 根据传入的日期,日期格式和timezone offset，格式化日期
     * 
     * @param date
     *            要格式化的日期
     * @param format
     *            日期格式,如格式日期不存在,返回默认格式yyyy-MM-dd HH:mm:ss
     * @return String 以格式化日期
     */
    public static String formatDate(Date date, String format, int timezoneoffset) {
        try {
            if (date == null) {
                return null;
            }
            String f = format;
            if (format==null) {
            	f = DEFAULTFORMAT;
            }
            DateFormat df = new SimpleDateFormat(f);
            return df.format(new Date(date.getTime() - (long)timezoneoffset*60L*1000L));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
	
	public static String getSSFormatByLang(String lang) {
    	return DATEFORMATSS_ZH;
    }
}
