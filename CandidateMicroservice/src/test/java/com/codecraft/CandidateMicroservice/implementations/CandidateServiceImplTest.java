package com.codecraft.CandidateMicroservice.implementations;

import com.codecraft.CandidateMicroservice.dto.JobApplyDTO;
import com.codecraft.CandidateMicroservice.dto.JobEnrollDTO;
import com.codecraft.CandidateMicroservice.entities.Applied;
import com.codecraft.CandidateMicroservice.entities.Candidate;
import com.codecraft.CandidateMicroservice.repository.AppliedRepository;
import com.codecraft.CandidateMicroservice.repository.CandidateRepository;
import com.codecraft.CandidateMicroservice.services.InterviewerClient;
import com.codecraft.CandidateMicroservice.services.implementations.CandidateServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class CandidateServiceImplTest {

    @Autowired
    private CandidateServiceImpl candidateServiceImpl;

    @MockBean
    private CandidateRepository candidateRepository;

    @MockBean
    private AppliedRepository appliedRepository;

    @MockBean
    private InterviewerClient interviewerClient;

//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }

    @Test
    public void applyJobTest() {
        // Setup
        JobApplyDTO jobApplyDTO = new JobApplyDTO();
        jobApplyDTO.setCid(1);
        jobApplyDTO.setJid(1);
        jobApplyDTO.setCompany_name("Test Company");
        jobApplyDTO.setTest_score("20/30");
        jobApplyDTO.setApplied_status("applied");

        Candidate candidate = new Candidate();
        candidate.setId(1);
        candidate.setEmail("test@example.com");

        when(candidateRepository.findById(1)).thenReturn(Optional.of(candidate));
        when(interviewerClient.enrollInJob(any(JobEnrollDTO.class))).thenReturn(ResponseEntity.ok("Success"));
        when(appliedRepository.save(any(Applied.class))).thenReturn(new Applied());

        // Execute
        String result = candidateServiceImpl.applyJob(jobApplyDTO);

        // Verify
        assertEquals("Success", result);
        verify(candidateRepository, times(1)).findById(1);
        verify(appliedRepository, times(1)).save(any(Applied.class));
        verify(interviewerClient, times(1)).enrollInJob(any(JobEnrollDTO.class));

        System.out.println("------------------ applyJobTest Service Successfully Ran -----------------");
    }
}
