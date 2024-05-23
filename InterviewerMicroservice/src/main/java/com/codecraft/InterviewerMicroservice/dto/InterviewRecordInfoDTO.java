package com.codecraft.InterviewerMicroservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRecordInfoDTO {
    private String candidateName;
    private String roomId;
    private String positiveFeedback;
    private String negativeFeedback;

}
