package com.codecraft.InterviewerMicroservice.dto;

import com.codecraft.InterviewerMicroservice.entities.InterviewRecord;
import com.codecraft.InterviewerMicroservice.entities.Job;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostInterviewRecordDTO {

    private Long jobId;
    private Long candidateId;
    private String positiveFeedback;
    private String negativeFeedback;
    private List<String> fullfilledRequirements;
}
