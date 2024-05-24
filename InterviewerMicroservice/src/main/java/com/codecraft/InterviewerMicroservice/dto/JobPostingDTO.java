package com.codecraft.InterviewerMicroservice.dto;

import com.codecraft.InterviewerMicroservice.entities.Interviewer;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingDTO {
    private String company;
    private String contact;
    private String jobDescription;
    private String status = "open";
    private int noOfEnrollments = 0;
    private String roleType;
    private int interviewerId;
    private int experience;
    private Set<String> requirements = new HashSet<>();
}




