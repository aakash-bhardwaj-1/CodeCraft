package com.codecraft.InterviewerMicroservice.dto;

import lombok.Data;

@Data
public class CountDTO {
    private int activeJobs;
    private int closedJobs;
    private int totalEnrollments;
    private int totalInterview;
}
