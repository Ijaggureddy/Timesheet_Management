package com.timesheetmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.timesheetmanagement.entity.TimesheetEmployeeResponse;

public class TimesheetEmployeeResponseDto extends CommonApiResponse {

	private List<TimesheetEmployeeResponse> employeeResponses = new ArrayList<>();

	public List<TimesheetEmployeeResponse> getEmployeeResponses() {
		return employeeResponses;
	}

	public void setEmployeeResponses(List<TimesheetEmployeeResponse> employeeResponses) {
		this.employeeResponses = employeeResponses;
	}

}
