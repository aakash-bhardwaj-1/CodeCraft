package com.codecraft.InterviewerMicroservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTestScoreDTO {
    private Long jobId;
    private Long candidateId;
    private String TestScore;
}
