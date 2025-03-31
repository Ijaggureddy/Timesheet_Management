package com.timesheetmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.timesheetmanagement.entity.TimesheetEmployeeResponse;
import com.timesheetmanagement.entity.TimesheetRequest;
import com.timesheetmanagement.entity.User;

@Repository
public interface TimesheetEmployeeResponseDao extends JpaRepository<TimesheetEmployeeResponse, Integer> {

	List<TimesheetEmployeeResponse> findByEmployee(User employee);
	
	List<TimesheetEmployeeResponse> findByEmployeeAndTimesheetRequest(User employee, TimesheetRequest request);

}
