package com.codecraft.InterviewerMicroservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AllRequirements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reqId;
    private String requirementName;
}