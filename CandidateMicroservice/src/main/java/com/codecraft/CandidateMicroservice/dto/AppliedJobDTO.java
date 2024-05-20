package com.codecraft.CandidateMicroservice.dto;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppliedJobDTO {
    private Integer id;
    private Integer cid;
    private Integer jid;
    private String jobName;
    private String jobRole;
    private String jobDescription;
    private Date interviewDate;
    private String appliedStatus = "pending";
}

