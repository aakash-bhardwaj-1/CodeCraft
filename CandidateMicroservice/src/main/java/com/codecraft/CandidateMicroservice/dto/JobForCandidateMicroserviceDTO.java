package com.codecraft.CandidateMicroservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class JobForCandidateMicroserviceDTO {
    private String roleType;
    private String jobDescription;
    private List<String> requirements;
}
