package com.timesheetmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.timesheetmanagement.dto.CommonApiResponse;
import com.timesheetmanagement.dto.RegisterUserRequestDto;
import com.timesheetmanagement.dto.UpdateUserProfileRequest;
import com.timesheetmanagement.dto.UserLoginRequest;
import com.timesheetmanagement.dto.UserLoginResponse;
import com.timesheetmanagement.dto.UserResponseDto;
import com.timesheetmanagement.dto.UserStatusUpdateRequestDto;
import com.timesheetmanagement.resource.UserResource;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserResource userResource;

	// RegisterUserRequestDto, we will set only email, password & role from UI
	@PostMapping("/admin/register")
	@Operation(summary = "Api to register Admin")
	public ResponseEntity<CommonApiResponse> registerAdmin(@RequestBody RegisterUserRequestDto request) {
		return userResource.registerAdmin(request);
	}

	// for employee and consultant
	@PostMapping("register")
	@Operation(summary = "Api to register user")
	public ResponseEntity<CommonApiResponse> registerUser(@RequestBody RegisterUserRequestDto request) {
		return this.userResource.registerUser(request);
	}

	@PostMapping("login")
	@Operation(summary = "Api to login any User")
	public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
		return userResource.login(userLoginRequest);
	}

	@GetMapping("/fetch/role-wise")
	@Operation(summary = "Api to get Users By Role")
	public ResponseEntity<UserResponseDto> fetchAllUsersByRole(@RequestParam("role") String role)
			throws JsonProcessingException {
		return userResource.getUsersByRole(role);
	}

	@PutMapping("update/status")
	@Operation(summary = "Api to update the user status")
	public ResponseEntity<CommonApiResponse> updateUserStatus(@RequestBody UserStatusUpdateRequestDto request) {
		return userResource.updateUserStatus(request);
	}

	@GetMapping("/fetch/user-id")
	@Operation(summary = "Api to get User Detail By User Id")
	public ResponseEntity<UserResponseDto> fetchUserById(@RequestParam("userId") int userId) {
		return userResource.getUserById(userId);
	}

	@DeleteMapping("/delete/user-id")
	@Operation(summary = "Api to delete the user by ID")
	public ResponseEntity<CommonApiResponse> deleteUserById(@RequestParam("userId") int userId) {
		return userResource.deleteUserById(userId);
	}

	@PutMapping("/profile/add")
	@Operation(summary = "Api to update the user profile")
	public ResponseEntity<CommonApiResponse> updateUserProfile(UpdateUserProfileRequest request) {
		return this.userResource.updateUserProfile(request);
	}

	@GetMapping(value = "/{userProfilePic}", produces = "image/*")
	@Operation(summary = "Api to get the user profile pic")
	public void fetchFoodImage(@PathVariable("userProfilePic") String userProfilePic, HttpServletResponse resp) {
		this.userResource.fetch(userProfilePic, resp);
	}

}
