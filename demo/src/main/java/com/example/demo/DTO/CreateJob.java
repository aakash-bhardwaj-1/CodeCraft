package com.example.demo.DTO;

import lombok.Data;

import java.util.List;

@Data
public class CreateJob {
    private String company;
    private String companyId;
    private int experience;
    private String jobDescription;
    private String jobRole;
    private List<String> techStack;
}
