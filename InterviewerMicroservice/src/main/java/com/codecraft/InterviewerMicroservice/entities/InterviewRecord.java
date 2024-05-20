package com.codecraft.InterviewerMicroservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InterviewRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long candidateId;

    @OneToOne
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;

    private String positiveFeedback;
    private String negativeFeedback;
}