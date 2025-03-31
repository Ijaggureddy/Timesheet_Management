package com.timesheetmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.timesheetmanagement.entity.TimesheetRequest;

public class TimeSheetRequestResponse extends CommonApiResponse {

	private List<TimesheetRequest> requests = new ArrayList<>();

	public List<TimesheetRequest> getRequests() {
		return requests;
	}

	public void setRequests(List<TimesheetRequest> requests) {
		this.requests = requests;
	}

}
