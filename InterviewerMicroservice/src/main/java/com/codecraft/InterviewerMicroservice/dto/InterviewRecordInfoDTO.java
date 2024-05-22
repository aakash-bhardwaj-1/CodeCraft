package com.codecraft.InterviewerMicroservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRecordInfoDTO {
    private Long jobId;
    private String jobName;
    private String jobDescription;
    private List<String> requirements;
    private Long candidateId;
    private String positiveFeedback;
    private String negativeFeedback;
    private List<String> fullfilledRequirements;
}
