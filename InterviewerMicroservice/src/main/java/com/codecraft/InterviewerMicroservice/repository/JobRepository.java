package com.codecraft.InterviewerMicroservice.repository;

import com.codecraft.InterviewerMicroservice.entities.Interviewer;
import com.codecraft.InterviewerMicroservice.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository  extends JpaRepository<Job, Long> {

    List<Job> findByInterviewerId(int id);
    int countAllByInterviewerId(int interviewer);
    List<Job> findAllByStatus(String status);


}
