package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class jobPostings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jobid")
    private int jobId;

    @Column(name = "jobname")
    private String jobName;

    @Column(name = "jobrequirements")
    private String jobRequirements;

    @Column(name = "jobenrollments")
    private int jobEnrollments;
}
