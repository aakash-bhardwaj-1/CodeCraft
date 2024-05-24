package com.codecraft.InterviewerMicroservice.implementations;

import com.codecraft.InterviewerMicroservice.dto.JobEnrollDTO;
import com.codecraft.InterviewerMicroservice.dto.JobEnrollmentInfoDTO;
import com.codecraft.InterviewerMicroservice.dto.JobPostingDTO;
import com.codecraft.InterviewerMicroservice.entities.Enrollment;
import com.codecraft.InterviewerMicroservice.entities.Interviewer;
import com.codecraft.InterviewerMicroservice.entities.Job;
import com.codecraft.InterviewerMicroservice.repository.EnrollmentRepository;
import com.codecraft.InterviewerMicroservice.repository.InterviewerRepository;
import com.codecraft.InterviewerMicroservice.repository.JobRepository;
import com.codecraft.InterviewerMicroservice.services.implementations.InterviewerServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class InterviewerServiceImplTest {

    @Autowired
    private InterviewerServiceImpl interviewerService;

    @Autowired
    private JobRepository jobRepository;

    @MockBean
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private InterviewerRepository interviewerRepository;

    @Test
    public void createJobTest() {
        // Given
        JobPostingDTO jobPostingRequest = new JobPostingDTO();
        jobPostingRequest.setCompany("Test Company");
        jobPostingRequest.setContact("Test Contact");
        jobPostingRequest.setJobDescription("Test Description");
        jobPostingRequest.setStatus("open");
        jobPostingRequest.setRoleType("Test Role Type");


        // Create a mock interviewer
        Interviewer interviewer = new Interviewer();
        interviewer.setEmail("test@example.com");
        interviewer.setPassword("testpassword");
        Interviewer savedInterviewer = interviewerRepository.save(interviewer);
        jobPostingRequest.setInterviewerId(savedInterviewer.getId());

        // When
        String result = interviewerService.createJob(jobPostingRequest);

        // Then
        assertEquals("Job created successfully", result);

        System.out.println("------------------ createJobTest Service Test Successfully Ran -----------------");

    }

    @Test
    public void getJobEnrollmentsTest() {
        // Given
        long jobId = 1L;
        List<Enrollment> enrollments = new ArrayList<>();
        // Add mock enrollments to the list
        enrollments.add(new Enrollment(1L, 101L, "Candidate1", Date.valueOf("2022-05-25"), "TestRoom1", null));
        enrollments.add(new Enrollment(2L, 102L, "Candidate2", Date.valueOf("2022-05-26"), "TestRoom2", null));

        // Stub the behavior of enrollmentRepository.findByJobId to return the mock enrollments
        when(enrollmentRepository.findByJobId(jobId)).thenReturn(enrollments);

        // When
        List<JobEnrollmentInfoDTO> result = interviewerService.getJobEnrollments(jobId);

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());

        System.out.println("------------------ getJobEnrollmentsTest Service Test Successfully Ran -----------------");

    }


    @Test
    public void enrollInJob() {
        // Given
        // Create a mock job for testing enrollment
        Job job = new Job();
        job.setCompany("Test Company");
        job.setContact("Test Contact");
        job.setJobDescription("Test Description");
        job.setStatus("open");
        job.setRoleType("Test Role Type");
        Interviewer interviewer = new Interviewer();
        interviewer.setEmail("test@example.com");
        interviewer.setPassword("testpassword");
        Interviewer savedInterviewer = interviewerRepository.save(interviewer);
        job.setInterviewer(savedInterviewer);
        Job savedJob = jobRepository.save(job);

        JobEnrollDTO jobEnrollDTO = new JobEnrollDTO();
        jobEnrollDTO.setJobId(savedJob.getId());
        jobEnrollDTO.setCandidateId(1L);
        jobEnrollDTO.setCandidateName("John Doe");

        // When
        boolean enrollmentResult = interviewerService.enrollInJob(jobEnrollDTO);

        // Then
        assertTrue(enrollmentResult);

        System.out.println("------------------ enrollInJob Service Test Successfully Ran -----------------");

    }
}