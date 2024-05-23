package com.codecraft.InterviewerMicroservice.repository;

//import com.codecraft.InterviewerMicroservice.entities.FulfilledRequirements;
import com.codecraft.InterviewerMicroservice.entities.Enrollment;
import com.codecraft.InterviewerMicroservice.entities.InterviewRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRecordRepository extends JpaRepository<InterviewRecord, Long> {

    InterviewRecord findByEnrollment(Enrollment e);
}
