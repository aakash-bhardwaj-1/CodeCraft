//package com.codecraft.InterviewerMicroservice.entities;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
////import javax.persistence.*;
//
//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class JobRequirements {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "req_id")
//    private AllRequirements allRequirements;
//
//    @ManyToOne
//    @JoinColumn(name = "job_id")
//    private Job job;
//}
