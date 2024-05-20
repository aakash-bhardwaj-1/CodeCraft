package com.codecraft.InterviewerMicroservice.repository;

import com.codecraft.InterviewerMicroservice.entities.Interviewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, Integer> {
    Interviewer findByEmail(String email);

}
