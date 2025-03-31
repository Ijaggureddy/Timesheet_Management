package com.timesheetmanagement.utility;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class DateTimeUtils {

	public static String getProperDateTimeFormatFromEpochTime(String epochTimeString) {

		long epochTimeMillis = Long.parseLong(epochTimeString);

		Instant instant = Instant.ofEpochMilli(epochTimeMillis);
		ZoneId zoneId = ZoneId.systemDefault();

		LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, zoneId);

		// Define the desired date format
		String dateFormatPattern = "yyyy-MM-dd HH:mm:ss";

		// Format LocalDateTime to a specific date format
		String formattedDateTime = formatLocalDateTime(localDateTime, dateFormatPattern);

		// Print the formatted date and time
		System.out.println("Formatted DateTime: " + formattedDateTime);

		return formattedDateTime;
	}

	private static String formatLocalDateTime(LocalDateTime dateTime, String dateFormatPattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(dateFormatPattern);
		return dateTime.format(formatter);
	}
	
	public static List<String> getDateRange(String startDate, String endDate) {
        List<String> dateList = new ArrayList<>();
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        while (!start.isAfter(end)) {
            dateList.add(start.toString());
            start = start.plusDays(1);
        }
        
        return dateList;
    }

}
