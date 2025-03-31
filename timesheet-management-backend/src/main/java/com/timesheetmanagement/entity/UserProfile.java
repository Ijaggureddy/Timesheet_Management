package com.timesheetmanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String bio;

	private String ssNumber;

	private String website; // optional

	private String resume; // resume path

	private String linkedlnProfileLink;

	private String githubProfileLink; // optional

	private String profilePic;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

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

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public String getSsNumber() {
		return ssNumber;
	}

	public void setSsNumber(String ssNumber) {
		this.ssNumber = ssNumber;
	}

}
