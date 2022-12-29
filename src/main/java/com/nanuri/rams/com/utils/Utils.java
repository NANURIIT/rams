package com.nanuri.rams.com.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

	/**
	 * 날짜형식 변환 : String - String
	 * @param   : input Date
	 * @format1 : 변환전 포맷 
	 * @format2 : 변환후 포맷
	 * @formatExample : "yyyyMMdd", "yyyy-MM-dd", "yyyy/MM/dd"
	 */
	public static String changeDateFormat(String param, String format1, String format2) {

		if (!StringUtil.isAllWhitespace(param)  && !StringUtil.isAllWhitespace(format1) && !StringUtil.isAllWhitespace(format2)) {

			SimpleDateFormat df1 = new SimpleDateFormat("yyyyMMdd");
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat df3 = new SimpleDateFormat("yyyy/MM/dd");

			Date dt;

			try {
				switch (format1) {
				case "yyyyMMdd":
					dt = df1.parse(param);

					if (format2 == "yyyy-MM-dd") {
						param = df2.format(dt);
					} else if (format2 == "yyyy/MM/dd") {
						param = df3.format(dt);
					}
				case "yyyy-MM-dd":
					dt = df2.parse(param);

					if (format2 == "yyyyMMdd") {
						param = df1.format(dt);
					} else if (format2 == "yyyy/MM/dd") {
						param = df3.format(dt);
					}

				case "yyyy/MM/dd":
					dt = df3.parse(param);

					if (format2 == "yyyyMMdd") {
						param = df1.format(dt);
					} else if (format2 == "yyyy-MM-dd") {
						param = df2.format(dt);
					}

					break;
				default:
					return param;
				}

			} catch (ParseException e) {
				return param;
			}

		}
		return param;
	}
}
