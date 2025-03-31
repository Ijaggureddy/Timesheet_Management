package com.timesheetmanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class TimesheetEmployeeResponse {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name = "employee_id", nullable = false)
	private User employee;

	@ManyToOne
	@JoinColumn(name = "timesheet_request_id", nullable = false)
	private TimesheetRequest timesheetRequest;

	private String workDate;

	private double totalWorkingHours; // updated by Employee

	private String workDetail; // updated by Employee

	private String status; // Pending, Rejected or Approved By Admin
	

    @Lob
    @Column(name = "image")
    private byte[] image;

    private String imageName;
    private String imageType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getEmployee() {
		return employee;
	}

	public void setEmployee(User employee) {
		this.employee = employee;
	}

	public TimesheetRequest getTimesheetRequest() {
		return timesheetRequest;
	}

	public void setTimesheetRequest(TimesheetRequest timesheetRequest) {
		this.timesheetRequest = timesheetRequest;
	}

	public String getWorkDate() {
		return workDate;
	}

	public void setWorkDate(String workDate) {
		this.workDate = workDate;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	// New Image Getters & Setters
		public byte[] getImage() {
			return image;
		}

		public void setImage(byte[] image) {
			this.image = image;
		}

		public String getImageName() {
			return imageName;
		}

		public void setImageName(String imageName) {
			this.imageName = imageName;
		}

		public String getImageType() {
			return imageType;
		}

		public void setImageType(String imageType) {
			this.imageType = imageType;
		}

}
