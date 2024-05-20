package com.codecraft.CandidateMicroservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplyDTO {
    private Integer cid;
    private Integer jid;
    private String company_name;
    private String test_score;
    private String applied_status = "pending";
}
