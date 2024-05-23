package com.codecraft.InterviewerMicroservice.services;

import com.codecraft.InterviewerMicroservice.dto.AppliedJobDTO;
import com.codecraft.InterviewerMicroservice.dto.updateAppliedJobDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(url = "http://localhost:8000",value = "AppliedJobs-Client")
public interface CandidateClient {
    @GetMapping("/appliedJobs/{id}")
    ResponseEntity<List<AppliedJobDTO>> listOfAppliedJobs(@PathVariable Integer id);
    @PostMapping("/candidate/update-applied")
     ResponseEntity<String> updateAppliedJob(@RequestBody updateAppliedJobDTO updateAppliedJobDTO) ;

}
