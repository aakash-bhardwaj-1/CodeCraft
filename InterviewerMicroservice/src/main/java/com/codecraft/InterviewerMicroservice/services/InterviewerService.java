package com.codecraft.InterviewerMicroservice.services;

import com.codecraft.InterviewerMicroservice.dto.*;
import com.codecraft.InterviewerMicroservice.entities.Enrollment;
import com.codecraft.InterviewerMicroservice.entities.InterviewRecord;
import com.codecraft.InterviewerMicroservice.entities.Job;

import java.util.List;
import java.util.Optional;

public interface InterviewerService {
    String login(String email, String password);
    int activeJobsCount(int id);
     List<Job> allactiveJobsCount();
    String createJob(JobPostingDTO jobPostingRequest);

    List<JobInfoDTO> getJobs(int id);

    List<JobEnrollmentInfoDTO> getJobEnrollments(Long jobId);
    public void scheduleInterview(ScheduleInterviewDTO dto);

    boolean enrollInJob(JobEnrollDTO jobEnrollRequest);

    boolean updateTestScore(UpdateTestScoreDTO updateTestScoreRequest);
    Optional<JobForCandidateMicroserviceDTO> getJob(long id);
     boolean candidateCodeEditorCheck(CandidateCheckDTO CandidateCheckDTO);
    boolean interviewerCodeEditorCheck(String interviewerEmail);
    InterviewRecord checkResults(int enrollId);

//    boolean postInterviewRecord(PostInterviewRecordDTO postInterviewRecordRequest);

//    InterviewRecordInfoDTO getInterviewRecord(Long interviewRecordId);
}
