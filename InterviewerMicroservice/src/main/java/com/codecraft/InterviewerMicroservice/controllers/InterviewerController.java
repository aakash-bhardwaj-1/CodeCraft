package com.codecraft.InterviewerMicroservice.controllers;

import com.codecraft.InterviewerMicroservice.dto.*;
import com.codecraft.InterviewerMicroservice.entities.InterviewRecord;
import com.codecraft.InterviewerMicroservice.entities.Job;
import com.codecraft.InterviewerMicroservice.services.InterviewerService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@Slf4j
@RestController
@RequestMapping("/interviewer")
public class InterviewerController {
    private static final Logger logger = LoggerFactory.getLogger(InterviewerController.class);
    @Autowired
    private InterviewerService interviewerService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        logger.info("Login Request DTO Recieved: " + loginRequest);
        String token = interviewerService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials or User is Unauthorized");
        }
    }
    @GetMapping("/activeJobs/{id}")
    public int activeJobsCountController(@PathVariable int id){
        logger.info("Request to find whether a job is active or not received: " + id);
        return interviewerService.activeJobsCount(id);

    }
    //for candidate fiegn client
    @GetMapping("/all-active-jobs")
    public List<Job> allactiveJobsCountController(){
        logger.info("Request for all active job count received");
        List<Job> jobs =interviewerService.allactiveJobsCount();
        logger.info("Info log message");
        return jobs;

    }

    @GetMapping("/closed-jobs/{id}")
    public List<JobInfoDTO> closedJobController(@PathVariable int id){

        logger.info("Request to close job received: " + id);

        return interviewerService.getClosedJobs(id);

    }

    @PostMapping("/scheduleInterview")
    public void scheduleInterview(@RequestBody ScheduleInterviewDTO ScheduleInterviewDTO){
        logger.info("Schedule Interview Request DTO Recieved: " + ScheduleInterviewDTO);
//        System.out.println(true);
        System.out.println(ScheduleInterviewDTO.getInterviewDate());
        interviewerService.scheduleInterview(ScheduleInterviewDTO);
    }
@PostMapping("/result")
    public void interviewResults(@RequestBody InterviewRecordInfoDTO dto){
    logger.info("Interview Record Info DTO Recieved: " + dto);
    System.out.println(dto);
    interviewerService.interviewResult(dto);
    }
    @GetMapping("/count/{id}")
    public CountDTO counter(@PathVariable int id){
        logger.info("Count DTO Recieved: " + id);
        return interviewerService.counter(id);
    }

    @PostMapping("/createJob")
    public ResponseEntity<String> createJob(@RequestBody JobPostingDTO jobPostingRequest) {
        logger.info("Job Posting DTO Recieved: " + jobPostingRequest);
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
        logger.info("Given an interviewer-id request to fetch all the jobs recieved: " + id);
        List<JobInfoDTO> jobs = interviewerService.getJobs(id);
        if (!jobs.isEmpty()) {
            return ResponseEntity.ok(jobs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<Optional<JobForCandidateMicroserviceDTO>> getJob(@PathVariable int id) {
        logger.info("Job For Candidate Microservice DTO recieved: " + id);
        Optional<JobForCandidateMicroserviceDTO> job = interviewerService.getJob(id);
        if (!job.isEmpty()) {
            return ResponseEntity.ok(job);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/job/enroll")
    public ResponseEntity<String> enrollInJob(@RequestBody JobEnrollDTO jobEnrollRequest) {
        logger.info("Job Enroll DTO recieved: " + jobEnrollRequest);
        boolean status = interviewerService.enrollInJob(jobEnrollRequest);
        if (status) {
            return ResponseEntity.ok("Enrollment Successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in enrollment");
        }
    }

    @GetMapping("/jobEnrollments/{jobId}")
    public ResponseEntity<List<JobEnrollmentInfoDTO>> getJobEnrollments(@PathVariable Long jobId) {
        logger.info("Request to get job enrollments received: " + jobId);

        List<JobEnrollmentInfoDTO> jobs = interviewerService.getJobEnrollments(jobId);
        if (!jobs.isEmpty()) {
            return ResponseEntity.ok(jobs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/job/updateTestScore")
    public ResponseEntity<String> updateTestScore(@RequestBody UpdateTestScoreDTO updateTestScoreRequest) {
        logger.info("Update Test Score DTO received: " + updateTestScoreRequest);

        boolean status = interviewerService.updateTestScore(updateTestScoreRequest);
        if (status) {
            return ResponseEntity.ok("Test Score Updated Successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in Test Score Updation");
        }
    }

    @PostMapping("/code-sync-candidate-check/{candidateId}")
    public boolean candidateCheck(@PathVariable String candidateId, @RequestBody String roomId){
        logger.info("Candidate Code-sync check request received");

        CandidateCheckDTO dto = new CandidateCheckDTO();
        dto.setCandidateName(candidateId);
        dto.setRoomId(roomId);
        System.out.println(candidateId);
        System.out.println(roomId);
       return interviewerService.candidateCodeEditorCheck(dto);
    }

    @PostMapping("/code-sync-interviewer-check/{interviewerEmail}")
    public boolean interviewerCheck(@PathVariable String interviewerEmail){
        logger.info("Interviewer Code-sync check request received");

        System.out.println(interviewerEmail);
        return interviewerService.interviewerCodeEditorCheck(interviewerEmail);
    }
    @GetMapping("/result/{enrollId}")
    public InterviewRecord results(@PathVariable int enrollId){
        logger.info("Request to check results for a enrollment received: " + enrollId);

        return interviewerService.checkResults(enrollId);
    }
    @PostMapping("/close-job/{id}")
    public void closeJob(@PathVariable int id){
        interviewerService.closeJob(id);
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
