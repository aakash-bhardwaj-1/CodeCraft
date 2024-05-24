package com.codecraft.CandidateMicroservice.controllers;

import com.codecraft.CandidateMicroservice.dto.AppliedJobDTO;
import com.codecraft.CandidateMicroservice.dto.JobApplyDTO;
import com.codecraft.CandidateMicroservice.services.CandidateService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class CandidateControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @MockBean
    private CandidateService candidateService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void applyJobTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        JobApplyDTO jobApplyDTO = new JobApplyDTO();
        jobApplyDTO.setCid(1);
        jobApplyDTO.setJid(101);
        jobApplyDTO.setCompany_name("Tech Corp");
        jobApplyDTO.setTest_score("85");
        jobApplyDTO.setApplied_status("pending");

        String jobApplyJson = objectMapper.writeValueAsString(jobApplyDTO);

        Mockito.when(candidateService.applyJob(Mockito.any(JobApplyDTO.class))).thenReturn("successToken");

        mockMvc.perform(post("/candidate/apply")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jobApplyJson))
                .andExpect(status().isOk())
                .andExpect(content().string("Job application successful"));

        System.out.println("------------------ applyJobTest Controller Successfully Ran -----------------");
    }

    @Test
    public void listOfAppliedJobsTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        List<AppliedJobDTO> appliedJobDTOList = new ArrayList<>();
        AppliedJobDTO appliedJobDTO = new AppliedJobDTO();
        appliedJobDTO.setId(1);
        appliedJobDTO.setCid(1);
        appliedJobDTO.setJid(101);
        appliedJobDTO.setJobName("Software Engineer");
        appliedJobDTO.setJobRole("Developer");
        appliedJobDTO.setJobDescription("Develop and maintain software applications.");
        appliedJobDTO.setInterviewDate(Date.valueOf("2024-06-01"));
        appliedJobDTO.setAppliedStatus("pending");
        appliedJobDTOList.add(appliedJobDTO);

        Mockito.when(candidateService.listOfAppliedJobs(Mockito.anyInt())).thenReturn(appliedJobDTOList);

        mockMvc.perform(get("/candidate/appliedJobs/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(appliedJobDTOList)));

        System.out.println("------------------ listOfAppliedJobsTest Controller Successfully Ran -----------------");
    }
}