package com.codecraft.InterviewerMicroservice.repository;

import com.codecraft.InterviewerMicroservice.entities.AllRequirements;
import com.codecraft.InterviewerMicroservice.entities.Interviewer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AllRequirementsRepository extends JpaRepository<AllRequirements, Long> {
    Optional<AllRequirements> findByRequirementName(String requirementName);
    List<AllRequirements> findByRequirementNameIn(List<String> fullfilledRequirements);
}
