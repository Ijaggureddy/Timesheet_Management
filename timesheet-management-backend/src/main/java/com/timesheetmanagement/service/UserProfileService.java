package com.timesheetmanagement.service;

import com.timesheetmanagement.entity.UserProfile;

public interface UserProfileService {
	
	UserProfile add(UserProfile userProfile);

	UserProfile update(UserProfile userProfile);

	UserProfile getById(int userProfileId);

}
