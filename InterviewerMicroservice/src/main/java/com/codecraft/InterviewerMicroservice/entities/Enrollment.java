package com.codecraft.InterviewerMicroservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long candidateId;
    private String candidateName;
    private Date interviewDate=null;
    private String roomId = "";
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
//
//    @OneToOne
//    @JoinColumn(name = "interview_record_id")
//    private InterviewRecord interviewRecord;
}
