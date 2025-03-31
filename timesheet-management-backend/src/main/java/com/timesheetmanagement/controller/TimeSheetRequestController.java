package com.timesheetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timesheetmanagement.dto.CommonApiResponse;
import com.timesheetmanagement.dto.EmployeeTimesheetUpdateRequest;
import com.timesheetmanagement.dto.TimeSheetRequestResponse;
import com.timesheetmanagement.dto.TimesheetEmployeeResponseDto;
import com.timesheetmanagement.resource.TimeSheetResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/timesheet")
@CrossOrigin(origins = "http://localhost:3000")
public class TimeSheetRequestController {

	@Autowired
	private TimeSheetResource timeSheetResource;

	@PostMapping("request")
	@Operation(summary = "Api to request for timesheet")
	public ResponseEntity<TimeSheetRequestResponse> login(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate) {
		return timeSheetResource.requestTimeSheet(startDate, endDate);
	}

	@GetMapping("/fetch/requests")
	@Operation(summary = "Api to fetch timesheet requests")
	public ResponseEntity<TimeSheetRequestResponse> getTimesheetRequests() {
		return timeSheetResource.getTimesheetRequests();
	}

	@GetMapping("/fetch/requests/status-wise")
	@Operation(summary = "Api to fetch timesheet requests based on status")
	public ResponseEntity<TimeSheetRequestResponse> getTimesheetRequestsByStatus(
			@RequestParam("status") String status) {
		return timeSheetResource.getTimesheetRequestsByStatus(status);
	}
	

	@GetMapping("/verify/employee/response")
	@Operation(summary = "Api to verify the employee timesheet response")
	public ResponseEntity<TimesheetEmployeeResponseDto> getTimesheetRequests(@RequestParam("employeeId") int employeeId,
			@RequestParam("requestId") int requestId, @RequestParam("status") String status) {
		return timeSheetResource.verifyTimesheetResponse(employeeId, requestId, status);
	}

	@GetMapping("/fetch/employee/response")
	@Operation(summary = "Api to fetch timesheet employee response")
	public ResponseEntity<TimesheetEmployeeResponseDto> fetchEmployeeTimesheetResponse(
			@RequestParam("employeeId") Integer employeeId, @RequestParam("requestId") int requestId) {
		return timeSheetResource.fetchEmployeeTimesheetResponse(employeeId, requestId);
	}

	@PostMapping("/employee/update")
	@Operation(summary = "Api to update timesheet employee response")
	public ResponseEntity<TimesheetEmployeeResponseDto> updateEmployeeTimesheet(
			@RequestBody List<EmployeeTimesheetUpdateRequest> request) {
		return timeSheetResource.updateEmployeeTimesheet(request);
	}

	@GetMapping("/admin/update/status")
	@Operation(summary = "Api to update the timesheet request status")
	public ResponseEntity<CommonApiResponse> updateTimesheetRequestStatus(
			@RequestParam("requestId") int requestId, @RequestParam("status") String status) {
		return timeSheetResource.updateTimesheetRequestStatus(requestId, status);
	}

}
