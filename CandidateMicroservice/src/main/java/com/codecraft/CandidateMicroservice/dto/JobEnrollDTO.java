package com.codecraft.CandidateMicroservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobEnrollDTO {
    private Long jobId;
    private Long candidateId;
    private String candidateName;
}
