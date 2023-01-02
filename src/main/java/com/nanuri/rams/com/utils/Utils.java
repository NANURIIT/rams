package com.nanuri.rams.com.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

	/**
	 * <pre>
	 * 날짜형식 변환.
	 * isAllWhitespace 로 null check 도 한다.
	 * </pre>
	 * 
	 * @param Stinrg paramDate : inputed Date
	 * @param String dateFormat : 변환후 포맷 (Example : "yyyyMMdd", "yyyy-MM-dd", "yyyy/MM/dd")
	 * 
	 * @return formattedDate
	 * @exception return paramDate(origin)
	 */
	public static String changeDateFormat(String paramDate, String dateFormat) {

		if (!StringUtil.isAllWhitespace(paramDate)  && !StringUtil.isAllWhitespace(dateFormat)) {

			SimpleDateFormat df1 = new SimpleDateFormat("yyyyMMdd");
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat df3 = new SimpleDateFormat("yyyy/MM/dd");

			Date dt;

			try {
				if(paramDate.contains("-")) {

					dt = df2.parse(paramDate);

					if (dateFormat.contains("/")) { paramDate = df3.format(dt); }
					else { paramDate = df1.format(dt); }
					
					return paramDate;
				} else if(paramDate.contains("/")) {
					dt = df3.parse(paramDate);

					if (dateFormat.contains("-")) { paramDate = df2.format(dt); }
					else { paramDate = df1.format(dt); }
					
					return paramDate;
				} else {
					dt = df1.parse(paramDate);

					if (dateFormat.contains("/")) { paramDate = df3.format(dt); }
					else if (dateFormat.contains("-")) { paramDate = df2.format(dt); }
					
					return paramDate;
				}
			} catch (ParseException e) {
				return paramDate;
			}
		}else {
			return paramDate;
		}
	}
}
