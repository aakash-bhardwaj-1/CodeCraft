package com.codecraft.InterviewerMicroservice.repository;

import com.codecraft.InterviewerMicroservice.entities.Job;
import com.codecraft.InterviewerMicroservice.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository  extends JpaRepository<Question, Long> {

}
