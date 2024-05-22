package com.codecraft.InterviewerMicroservice.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class updateAppliedJobDTO {
    Long cid;
    Long jid;
    Date InterviewDate;
}
