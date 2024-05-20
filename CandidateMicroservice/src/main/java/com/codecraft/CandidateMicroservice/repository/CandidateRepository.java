package com.codecraft.CandidateMicroservice.repository;

import com.codecraft.CandidateMicroservice.entities.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Candidate findByEmail(String email);
}
