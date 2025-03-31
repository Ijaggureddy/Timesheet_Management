package com.timesheetmanagement.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
	
	String storeProfilePhoto(MultipartFile file);

	Resource loadProfilePhoto(String fileName);

	void deleteProfilePhoto(String fileName);

}