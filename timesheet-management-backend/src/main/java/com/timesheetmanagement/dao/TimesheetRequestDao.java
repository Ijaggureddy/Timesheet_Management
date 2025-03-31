package com.timesheetmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.timesheetmanagement.entity.TimesheetRequest;

@Repository
public interface TimesheetRequestDao extends JpaRepository<TimesheetRequest, Integer> {

	List<TimesheetRequest> findByStatus(String status);

}
