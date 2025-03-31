package com.timesheetmanagement.dto;

import org.springframework.web.multipart.MultipartFile;

public class UpdateUserProfileRequest {

	private Integer userId;

	private String bio;

	private String ssNumber;

	private String website;

	private String linkedlnProfileLink;

	private String githubProfileLink;

	private MultipartFile profilePic;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}
	

	public String getSsNumber() {
		return ssNumber;
	}

	public void setSsNumber(String ssNumber) {
		this.ssNumber = ssNumber;
	}

//	public String getAadharNumber() {
//		return aadharNumber;
//	}
//
//	public void setAadharNumber(String aadharNumber) {
//		this.aadharNumber = aadharNumber;
//	}

	public String getLinkedlnProfileLink() {
		return linkedlnProfileLink;
	}

	public void setLinkedlnProfileLink(String linkedlnProfileLink) {
		this.linkedlnProfileLink = linkedlnProfileLink;
	}

	public String getGithubProfileLink() {
		return githubProfileLink;
	}

	public void setGithubProfileLink(String githubProfileLink) {
		this.githubProfileLink = githubProfileLink;
	}

	public MultipartFile getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(MultipartFile profilePic) {
		this.profilePic = profilePic;
	}

}
