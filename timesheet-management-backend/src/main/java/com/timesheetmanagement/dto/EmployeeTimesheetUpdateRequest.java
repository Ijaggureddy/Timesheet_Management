package com.timesheetmanagement.dto;

public class EmployeeTimesheetUpdateRequest {

	private int id;

	private double totalWorkingHours;

	private String workDetail;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getTotalWorkingHours() {
		return totalWorkingHours;
	}

	public void setTotalWorkingHours(double totalWorkingHours) {
		this.totalWorkingHours = totalWorkingHours;
	}

	public String getWorkDetail() {
		return workDetail;
	}

	public void setWorkDetail(String workDetail) {
		this.workDetail = workDetail;
	}

}
