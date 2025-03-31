package com.timesheetmanagement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.timesheetmanagement.entity.User;
import com.timesheetmanagement.service.UserService;
import com.timesheetmanagement.utility.Constants.ActiveStatus;
import com.timesheetmanagement.utility.Constants.UserRole;

@SpringBootApplication
public class TimesheetManagementApplication implements CommandLineRunner {

	private final Logger LOG = LoggerFactory.getLogger(TimesheetManagementApplication.class);

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(TimesheetManagementApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		User admin = this.userService.getUserByEmailIdAndRoleAndStatus("timesheetmanagement15@gmail.com",
				UserRole.ROLE_ADMIN.value(), ActiveStatus.ACTIVE.value());

		if (admin == null) {

			LOG.info("Admin not found in system, so adding default admin");

			User user = new User();
			user.setEmailId("timesheetmanagement15@gmail.com");
			user.setPassword(passwordEncoder.encode("123456"));
			user.setRole(UserRole.ROLE_ADMIN.value());
			user.setStatus(ActiveStatus.ACTIVE.value());

			this.userService.addUser(user);

		}

	}

}
