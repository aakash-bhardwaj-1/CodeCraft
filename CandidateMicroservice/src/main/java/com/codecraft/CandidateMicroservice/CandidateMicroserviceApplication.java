package com.codecraft.CandidateMicroservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class CandidateMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CandidateMicroserviceApplication.class, args);
	}

}
