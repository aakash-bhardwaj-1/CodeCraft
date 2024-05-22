package com.codecraft.InterviewerMicroservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppliedJobDTO {
    private Integer id;
    private Integer cid;
    private Integer jid;
    private String jobName;
    private String testScore;
    private String appliedStatus = "pending";
}

