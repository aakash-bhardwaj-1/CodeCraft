package com.codecraft.InterviewerMicroservice.controllers;

import com.codecraft.InterviewerMicroservice.dto.*;
import com.codecraft.InterviewerMicroservice.entities.InterviewRecord;
import com.codecraft.InterviewerMicroservice.entities.Job;
import com.codecraft.InterviewerMicroservice.services.InterviewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/interviewer")
public class InterviewerController {

    @Autowired
    private InterviewerService interviewerService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        String token = interviewerService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials or User is Unauthorized");
        }
    }
    @GetMapping("/activeJobs/{id}")
    public int activeJobsCountController(@PathVariable int id){
        return interviewerService.activeJobsCount(id);

    }
    @GetMapping("/all-active-jobs")
    public List<Job> allactiveJobsCountController(){
        return interviewerService.allactiveJobsCount();

    }

    @PostMapping("/scheduleInterview")
    public void scheduleInterview(@RequestBody ScheduleInterviewDTO ScheduleInterviewDTO){
        System.out.println(true);
        System.out.println(ScheduleInterviewDTO.getInterviewDate());
        interviewerService.scheduleInterview(ScheduleInterviewDTO);
    }

    @PostMapping("/createJob")
    public ResponseEntity<String> createJob(@RequestBody JobPostingDTO jobPostingRequest) {
        System.out.println(jobPostingRequest);
        String message = interviewerService.createJob(jobPostingRequest);
        if (message.equals("Job created successfully")) {
            return ResponseEntity.ok(message);
        } else if (message.equals("Interviewer not found for the given ID")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<List<JobInfoDTO>> getJobs(@PathVariable int id) {
        List<JobInfoDTO> jobs = interviewerService.getJobs(id);
        if (!jobs.isEmpty()) {
            return ResponseEntity.ok(jobs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<Optional<JobForCandidateMicroserviceDTO>> getJob(@PathVariable int id) {
        Optional<JobForCandidateMicroserviceDTO> job = interviewerService.getJob(id);
        if (!job.isEmpty()) {
            return ResponseEntity.ok(job);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/job/enroll")
    public ResponseEntity<String> enrollInJob(@RequestBody JobEnrollDTO jobEnrollRequest) {
        boolean status = interviewerService.enrollInJob(jobEnrollRequest);
        if (status) {
            return ResponseEntity.ok("Enrollment Successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in enrollment");
        }
    }

    @GetMapping("/jobEnrollments/{jobId}")
    public ResponseEntity<List<JobEnrollmentInfoDTO>> getJobEnrollments(@PathVariable Long jobId) {
        List<JobEnrollmentInfoDTO> jobs = interviewerService.getJobEnrollments(jobId);
        if (!jobs.isEmpty()) {
            return ResponseEntity.ok(jobs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/job/updateTestScore")
    public ResponseEntity<String> updateTestScore(@RequestBody UpdateTestScoreDTO updateTestScoreRequest) {
        boolean status = interviewerService.updateTestScore(updateTestScoreRequest);
        if (status) {
            return ResponseEntity.ok("Test Score Updated Successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in Test Score Updation");
        }
    }

    @PostMapping("/code-sync-candidate-check")
    public boolean candidateCheck(@RequestBody CandidateCheckDTO CandidateCheckDTO){
        System.out.println(CandidateCheckDTO.getCandidateName());
        System.out.println(CandidateCheckDTO.getRoomId());
       return interviewerService.candidateCodeEditorCheck(CandidateCheckDTO);
    }

    @PostMapping("/code-sync-interviewer-check/{interviewerEmail}")
    public boolean interviewerCheck(@PathVariable String interviewerEmail){
        System.out.println(interviewerEmail);
        return interviewerService.interviewerCodeEditorCheck(interviewerEmail);
    }
    @GetMapping("/result/{enrollId}")
    public InterviewRecord results(@PathVariable int enrollId){

        return interviewerService.checkResults(enrollId);
    }

//    @PostMapping("/job/interviewRecord")
//    public ResponseEntity<String> postInterviewRecord(@RequestBody PostInterviewRecordDTO postInterviewRecordRequest) {
//        boolean status = interviewerService.postInterviewRecord(postInterviewRecordRequest);
//        if (status) {
//            return ResponseEntity.ok("Interview Record Posted Successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in Posting Interview Record");
//        }
//    }

//    @GetMapping("/job/interviewRecord/{interviewRecordId}")
//    public ResponseEntity<InterviewRecordInfoDTO> getInterviewRecord(@PathVariable Long interviewRecordId) {
//        InterviewRecordInfoDTO info = interviewerService.getInterviewRecord(interviewRecordId);
//        if (info != null) {
//            return ResponseEntity.ok(info);
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }

}
