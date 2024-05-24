package com.codecraft.InterviewerMicroservice.controllers;


import com.codecraft.InterviewerMicroservice.dto.JobForCandidateMicroserviceDTO;
import com.codecraft.InterviewerMicroservice.dto.JobPostingDTO;
import com.codecraft.InterviewerMicroservice.services.InterviewerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class InterviewerControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InterviewerService interviewerService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createJobTest() throws Exception {
        JobPostingDTO jobPostingDTO = new JobPostingDTO();
        jobPostingDTO.setCompany("Test Company");
        jobPostingDTO.setContact("Test Contact");
        jobPostingDTO.setJobDescription("Test Description");
        jobPostingDTO.setStatus("open");
        jobPostingDTO.setRoleType("Test Role Type");

        String jobPostingJson = objectMapper.writeValueAsString(jobPostingDTO);

        Mockito.when(interviewerService.createJob(Mockito.any(JobPostingDTO.class))).thenReturn("Job created successfully");

        mockMvc.perform(post("/interviewer/createJob")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jobPostingJson))
                .andExpect(status().isOk())
                .andExpect(content().string("Job created successfully"));

        System.out.println("------------------ createJobTest Controller Successfully Ran -----------------");
    }

    @Test
    public void getJob() throws Exception {
        int jobId = 123; // Assuming a specific job ID for testing
        JobForCandidateMicroserviceDTO expectedJob = new JobForCandidateMicroserviceDTO();
        expectedJob.setJobDescription("Test Description");
        expectedJob.setRoleType("Test Role Type");

        Mockito.when(interviewerService.getJob(jobId)).thenReturn(Optional.of(expectedJob));

        mockMvc.perform(get("/interviewer/job/" + jobId))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(expectedJob)));

        System.out.println("------------------ getJob Controller Test Successfully Ran -----------------");

    }
}