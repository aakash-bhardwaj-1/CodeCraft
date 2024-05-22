package com.codecraft.InterviewerMicroservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class InterviewerMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewerMicroserviceApplication.class, args);
	}

}
