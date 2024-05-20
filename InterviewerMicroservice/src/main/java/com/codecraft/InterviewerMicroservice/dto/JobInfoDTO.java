package com.codecraft.InterviewerMicroservice.dto;


//import com.codecraft.InterviewerMicroservice.entities.JobRequirements;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobInfoDTO {
    private Long id;
    private String company;
    private String jobDescription;
    private String status;
    private int noOfEnrollments;
    private String roleType;
    private int interviewerId;
    private List<String> requirements;
    private List<QuestionDTO> questions;
}
