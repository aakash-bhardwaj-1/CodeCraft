//package com.codecraft.InterviewerMicroservice.entities;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class FulfilledRequirements {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToMany
//    @JoinTable(name = "fulfilled_requirements_all_requirements",
//            joinColumns = @JoinColumn(name = "fulfilled_requirements_id"),
//            inverseJoinColumns = @JoinColumn(name = "all_requirements_id"))
//    private Set<AllRequirements> fulfilledRequirements = new HashSet<>();
//
//    private Long interviewRecordId;
//}