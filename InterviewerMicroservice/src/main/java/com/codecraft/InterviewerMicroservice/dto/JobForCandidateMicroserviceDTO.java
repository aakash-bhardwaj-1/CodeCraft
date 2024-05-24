package com.codecraft.InterviewerMicroservice.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class JobForCandidateMicroserviceDTO {
private String roleType;
private String jobDescription;
private List<String> requirements = new ArrayList<>();
}
