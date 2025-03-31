package com.timesheetmanagement.utility;

public class Constants {

	public enum UserRole {
		ROLE_EMPLOYEE("Employee"), ROLE_ADMIN("Admin"), ROLE_CONSULTANT("Consultant");

		private String role;

		private UserRole(String role) {
			this.role = role;
		}

		public String value() {
			return this.role;
		}
	}

	public enum ActiveStatus {
		ACTIVE("Active"), DEACTIVATED("Deactivated");

		private String status;

		private ActiveStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}
	}
	
	public enum TimesheetRequestStatus {
		OPEN("Open"), CLOSE("Closed");

		private String status;

		private TimesheetRequestStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}
	}
	
	public enum TimesheetResponseApprovalStatus {
		PENDING("Pending"), SUBMITTED("Submitted"), APPROVED("Approved"), REJECTED("Rejected");

		private String status;

		private TimesheetResponseApprovalStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}
	}

}
