package com.codecraft.CandidateMicroservice.repository;

import com.codecraft.CandidateMicroservice.dto.JobApplyDTO;
import com.codecraft.CandidateMicroservice.entities.Applied;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppliedRepository extends JpaRepository<Applied, Integer> {
    List<Applied> findByCandidateId(Integer id);


    Optional<Applied> findByCandidateIdAndAndJid(int cid, int jid);
}
