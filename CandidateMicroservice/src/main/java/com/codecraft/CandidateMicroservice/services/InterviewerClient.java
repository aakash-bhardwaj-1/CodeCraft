package com.codecraft.CandidateMicroservice.services;

import com.codecraft.CandidateMicroservice.dto.JobEnrollDTO;

import com.codecraft.CandidateMicroservice.dto.JobForCandidateMicroserviceDTO;
import com.codecraft.CandidateMicroservice.dto.updateAppliedJobDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(url = "http://localhost:8081",value = "Enrollment-Client")
public interface InterviewerClient {
    @GetMapping("/interviewer/job/{id}")
    public ResponseEntity<Optional<JobForCandidateMicroserviceDTO>> getJob(@PathVariable int id);
    @PostMapping("/interviewer/job/enroll")
    ResponseEntity<String> enrollInJob(@RequestBody JobEnrollDTO jobEnrollRequest);

}
