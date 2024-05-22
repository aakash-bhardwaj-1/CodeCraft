package com.codecraft.InterviewerMicroservice.dto;

import lombok.Data;

import java.sql.Date;
@Data
public class ScheduleInterviewDTO {
private Long enrollId;
private Date interviewDate;
}
