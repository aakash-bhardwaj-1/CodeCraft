package com.codecraft.InterviewerMicroservice.repository;

import com.codecraft.InterviewerMicroservice.entities.AllRequirements;
import com.codecraft.InterviewerMicroservice.entities.Enrollment;
import com.codecraft.InterviewerMicroservice.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByCandidateIdAndJobId(Long candidateId, Long jobId);
    Optional<Enrollment> findById(Long Enroll);
    List<Enrollment> findByJobId(Job job);
    List<Enrollment> findByJobId(Long jobId);
    Enrollment findByAndCandidateNameAndAndRoomId (String cid, String roomId);
}
