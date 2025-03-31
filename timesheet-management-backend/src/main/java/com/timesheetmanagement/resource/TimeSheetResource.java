package com.timesheetmanagement.resource;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.timesheetmanagement.dao.TimesheetEmployeeResponseDao;
import com.timesheetmanagement.dao.TimesheetRequestDao;
import com.timesheetmanagement.dao.UserDao;
import com.timesheetmanagement.dto.CommonApiResponse;
import com.timesheetmanagement.dto.EmployeeTimesheetUpdateRequest;
import com.timesheetmanagement.dto.TimeSheetRequestResponse;
import com.timesheetmanagement.dto.TimesheetEmployeeResponseDto;
import com.timesheetmanagement.entity.TimesheetEmployeeResponse;
import com.timesheetmanagement.entity.TimesheetRequest;
import com.timesheetmanagement.entity.User;
import com.timesheetmanagement.utility.Constants.TimesheetRequestStatus;
import com.timesheetmanagement.utility.Constants.TimesheetResponseApprovalStatus;
import com.timesheetmanagement.utility.Constants.UserRole;
import com.timesheetmanagement.utility.DateTimeUtils;
import com.timesheetmanagement.utility.EmailService;
import com.timesheetmanagement.utility.Helper;

@Component
public class TimeSheetResource {

	@Autowired
	private TimesheetRequestDao timesheetRequestDao;

	@Autowired
	private TimesheetEmployeeResponseDao timesheetEmployeeResponseDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private EmailService emailService;

	public ResponseEntity<TimeSheetRequestResponse> requestTimeSheet(String startDate, String endDate) {

		TimeSheetRequestResponse response = new TimeSheetRequestResponse();

		String currentTime = String
				.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

		if (startDate == null || endDate == null) {
			response.setResponseMessage("request start date or end date missing!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimeSheetRequestResponse>(response, HttpStatus.BAD_REQUEST);
		}

		TimesheetRequest request = new TimesheetRequest();
		request.setEndDate(endDate);
		request.setStartDate(startDate);
		request.setRequestTime(currentTime);
		request.setStatus(TimesheetRequestStatus.OPEN.value());
		request.setRequestId(Helper.generateRequestId());

		TimesheetRequest addedRequest = timesheetRequestDao.save(request);

		if (addedRequest == null) {
			response.setResponseMessage("failed to request for timesheet!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimeSheetRequestResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		List<User> employees = userDao.findByRole(UserRole.ROLE_EMPLOYEE.value());

		List<String> timeSheetRequestedWorkDays = DateTimeUtils.getDateRange(startDate, endDate);

		// Prepare TimesheetEmployeeResponse entries
		List<TimesheetEmployeeResponse> timesheetEntries = new ArrayList<>();

		for (User employee : employees) {
			for (String workDate : timeSheetRequestedWorkDays) {
				TimesheetEmployeeResponse entry = new TimesheetEmployeeResponse();
				entry.setEmployee(employee);
				entry.setTimesheetRequest(addedRequest);
				entry.setWorkDate(workDate);
				entry.setTotalWorkingHours(0); // Initially 0, employee will update later
				entry.setWorkDetail(""); // Employee will fill in later
				entry.setStatus(TimesheetResponseApprovalStatus.PENDING.value());

				timesheetEntries.add(entry);
			}
		}

		// Save all entries
		timesheetEmployeeResponseDao.saveAll(timesheetEntries);

		employees.forEach(employee -> {

			try {
				String mailBody = getTimeSheetRequestMailBody(employee, request.getStartDate(), request.getEndDate());
				String subject = "Action Required - Timesheet Request!!!";

				this.emailService.sendEmail(employee.getEmailId(), subject, mailBody);
			} catch (Exception e) {
				e.printStackTrace();
			}

		});

		// Set success response
		response.setResponseMessage("Timesheet request submitted successfully!");
		response.setSuccess(true);

		return new ResponseEntity<TimeSheetRequestResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<TimeSheetRequestResponse> getTimesheetRequests() {

		TimeSheetRequestResponse response = new TimeSheetRequestResponse();

		List<TimesheetRequest> requests = this.timesheetRequestDao.findAll();

		if (CollectionUtils.isEmpty(requests)) {
			response.setResponseMessage("No timesheet request found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimeSheetRequestResponse>(response, HttpStatus.BAD_REQUEST);
		}

		response.setRequests(requests);
		response.setResponseMessage("Timesheet requests Fetched Successfully!");
		response.setSuccess(true);

		return new ResponseEntity<TimeSheetRequestResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<TimeSheetRequestResponse> getTimesheetRequestsByStatus(String status) {
		TimeSheetRequestResponse response = new TimeSheetRequestResponse();

		List<TimesheetRequest> requests = this.timesheetRequestDao.findByStatus(status);

		if (CollectionUtils.isEmpty(requests)) {
			response.setResponseMessage("No timesheet request found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimeSheetRequestResponse>(response, HttpStatus.BAD_REQUEST);
		}

		response.setRequests(requests);
		response.setResponseMessage("Timesheet requests Fetched Successfully!");
		response.setSuccess(true);

		return new ResponseEntity<TimeSheetRequestResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<TimesheetEmployeeResponseDto> verifyTimesheetResponse(int employeeId, int requestId,
			String status) {

		TimesheetEmployeeResponseDto response = new TimesheetEmployeeResponseDto();

		if (employeeId == 0 || requestId == 0 || status == null) {
			response.setResponseMessage("missing input!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		User employee = this.userDao.findById(employeeId).orElse(null);

		if (employee == null) {
			response.setResponseMessage("Employee not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		TimesheetRequest request = this.timesheetRequestDao.findById(requestId).orElse(null);

		if (request == null) {
			response.setResponseMessage("Timesheet request not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<TimesheetEmployeeResponse> responses = this.timesheetEmployeeResponseDao
				.findByEmployeeAndTimesheetRequest(employee, request);

		if (CollectionUtils.isEmpty(responses)) {
			response.setResponseMessage("Timesheet responses not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		// Update status using streams and save all at once
		responses = responses.stream().peek(res -> res.setStatus(status)).collect(Collectors.toList());

		List<TimesheetEmployeeResponse> updatedResponse = timesheetEmployeeResponseDao.saveAll(responses);
		
		try {
			String mailBody = "";
			String subject = "";
			if(status.equals(TimesheetResponseApprovalStatus.APPROVED.value())) {
				mailBody = getTimesheetAdminStatusUpdateMailBody(employee, request,
						"Admin has approved your timesheet response!!!");
				subject = "Congratulations, Admin has approved you timesheet response!!!";
			} else if(status.equals(TimesheetResponseApprovalStatus.REJECTED.value())) {
				mailBody = getTimesheetAdminStatusUpdateMailBody(employee, request,
						"Admin has rejected your timesheet response!!!");
				subject = "Timesheet Response Rejected!!!";
			}

			this.emailService.sendEmail(employee.getEmailId(), subject, mailBody);
		} catch (Exception e) {
			e.printStackTrace();
		}

		response.setEmployeeResponses(updatedResponse);
		response.setResponseMessage("Timesheet approval status updated successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.OK);
	}
	
	private String getTimesheetAdminStatusUpdateMailBody(User employee, TimesheetRequest timesheetRequest, String message) {
		// Create a StringBuilder to build the email content
		StringBuilder emailBody = new StringBuilder();

		// Start HTML content
		emailBody.append("<html><body>");

		// Greeting and congratulations
		emailBody.append("<h3>Dear " + employee.getFirstName() + ",</h3>");
		emailBody.append("<p>" + message + ".</p>");
		emailBody.append("<p>Timesheet Request Id: " + timesheetRequest.getRequestId() + ".</p>");
		emailBody.append("<p>Timesheet Requested Date: " + timesheetRequest.getStartDate() + " to "
				+ timesheetRequest.getEndDate() + ".</p>");

		emailBody.append("<p>Best Regards,<br/>Timesheet Portal</p>");

		// End HTML content
		emailBody.append("</body></html>");

		// Return the email content as a string
		return emailBody.toString();
	}

	public ResponseEntity<TimesheetEmployeeResponseDto> fetchEmployeeTimesheetResponse(int employeeId, int requestId) {

		TimesheetEmployeeResponseDto response = new TimesheetEmployeeResponseDto();

		if (employeeId == 0 || requestId == 0) {
			response.setResponseMessage("missing input!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		User employee = this.userDao.findById(employeeId).orElse(null);

		if (employee == null) {
			response.setResponseMessage("Employee not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		TimesheetRequest request = this.timesheetRequestDao.findById(requestId).orElse(null);

		if (request == null) {
			response.setResponseMessage("Timesheet request not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<TimesheetEmployeeResponse> responses = this.timesheetEmployeeResponseDao
				.findByEmployeeAndTimesheetRequest(employee, request);

		if (CollectionUtils.isEmpty(responses)) {
			response.setResponseMessage("Timesheet responses not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		response.setEmployeeResponses(responses);
		response.setResponseMessage("Timesheet employee response fetched successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<TimesheetEmployeeResponseDto> updateEmployeeTimesheet(
			List<EmployeeTimesheetUpdateRequest> requestList) {

		TimesheetEmployeeResponseDto response = new TimesheetEmployeeResponseDto();

		if (requestList == null || requestList.isEmpty()) {
			response.setResponseMessage("Request body is missing!!");
			response.setSuccess(false);
			return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<Integer> ids = new ArrayList<>();

		for (EmployeeTimesheetUpdateRequest request : requestList) {
			ids.add(request.getId());
		}

		List<TimesheetEmployeeResponse> timesheetResponses = timesheetEmployeeResponseDao.findAllById(ids);

		User employee = timesheetResponses.get(0).getEmployee();

		TimesheetEmployeeResponse timesheetResponse = this.timesheetEmployeeResponseDao
				.findById(requestList.get(0).getId()).get();

		Map<Integer, EmployeeTimesheetUpdateRequest> requestMap = requestList.stream()
				.collect(Collectors.toMap(EmployeeTimesheetUpdateRequest::getId, req -> req));

		timesheetResponses = timesheetResponses.stream().peek(entry -> {
			EmployeeTimesheetUpdateRequest updateRequest = requestMap.get(entry.getId());
			if (updateRequest != null) {
				entry.setTotalWorkingHours(updateRequest.getTotalWorkingHours());
				entry.setWorkDetail(updateRequest.getWorkDetail());
				entry.setStatus(TimesheetResponseApprovalStatus.SUBMITTED.value());
			}
		}).collect(Collectors.toList());

		List<TimesheetEmployeeResponse> updatedResponse = timesheetEmployeeResponseDao.saveAll(timesheetResponses);

		try {
			String mailBody = sendEmployeeResponseMailToAdmin(employee, timesheetResponse.getTimesheetRequest());
			String subject = "Congratulations, you have successfully registered in Timesheet System!!!";

			this.emailService.sendEmail("demo.admin@demo.com", subject, mailBody);
		} catch (Exception e) {
			e.printStackTrace();
		}

		response.setEmployeeResponses(updatedResponse);
		response.setResponseMessage("Timesheet updated successfully!");
		response.setSuccess(true);

		return new ResponseEntity<TimesheetEmployeeResponseDto>(response, HttpStatus.OK);
	}

	private String sendEmployeeResponseMailToAdmin(User employee, TimesheetRequest timesheetRequest) {
		// Create a StringBuilder to build the email content
		StringBuilder emailBody = new StringBuilder();

		// Start HTML content
		emailBody.append("<html><body>");

		// Greeting and congratulations
		emailBody.append("<h3>Dear Admin</h3>");
		emailBody.append("<p>Employee " + employee.getFirstName() + " " + employee.getLastName()
				+ " has submitted the request time sheet.</p>");
		emailBody.append("<p>Timesheet Request Id: " + timesheetRequest.getRequestId() + ".</p>");
		emailBody.append("<p>Timesheet Requested Date: " + timesheetRequest.getStartDate() + " to "
				+ timesheetRequest.getEndDate() + ".</p>");
		emailBody.append("<p>Best Regards,<br/>Timesheet Portal</p>");

		// End HTML content
		emailBody.append("</body></html>");

		// Return the email content as a string
		return emailBody.toString();
	}

	public ResponseEntity<CommonApiResponse> updateTimesheetRequestStatus(int requestId, String status) {

		CommonApiResponse response = new CommonApiResponse();

		if (requestId == 0 || status == null) {
			response.setResponseMessage("missing input!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		TimesheetRequest request = this.timesheetRequestDao.findById(requestId).orElse(null);

		if (request == null) {
			response.setResponseMessage("Timesheet request not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		request.setStatus(status);

		TimesheetRequest updatedRequestStatus = this.timesheetRequestDao.save(request);

		if (updatedRequestStatus == null) {
			response.setResponseMessage("Failed to update the status!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		response.setResponseMessage("Timesheet Request status updated successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

	private String getTimeSheetRequestMailBody(User employee, String startDate, String endDate) {
		// Create a StringBuilder to build the email content
		StringBuilder emailBody = new StringBuilder();

		// Start HTML content
		emailBody.append("<html><body>");

		// Greeting and congratulations
		emailBody.append("<h3>Dear " + employee.getFirstName() + ",</h3>");
		emailBody.append("<p>Admin has requested the Timesheet from date " + startDate + " to " + endDate + ".</p>");

		emailBody.append("<p>Best Regards,<br/>Timesheet Portal</p>");

		// End HTML content
		emailBody.append("</body></html>");

		// Return the email content as a string
		return emailBody.toString();
	}

}
