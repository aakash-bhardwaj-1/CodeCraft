package com.codecraft.CandidateMicroservice.services.implementations;

import com.codecraft.CandidateMicroservice.dto.*;
import com.codecraft.CandidateMicroservice.entities.Applied;
import com.codecraft.CandidateMicroservice.entities.Candidate;
import com.codecraft.CandidateMicroservice.repository.AppliedRepository;
import com.codecraft.CandidateMicroservice.repository.CandidateRepository;
import com.codecraft.CandidateMicroservice.services.CandidateService;
import com.codecraft.CandidateMicroservice.services.InterviewerClient;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    private AppliedRepository appliedRepository;
    private InterviewerClient InterviewerClient;

    public CandidateServiceImpl(InterviewerClient interviewerClient) {
        this.InterviewerClient = interviewerClient;
    }

    public String login(String email, String password) {
        Candidate candidate = candidateRepository.findByEmail(email);
        if (candidate != null && candidate.getPassword().equals(password)) {
            return candidate.getId().toString();
        }
        return null;
    }

    public String applyJob(JobApplyDTO jobRequest) {
        try {
            System.out.println(jobRequest);
            Candidate candidate = candidateRepository.findById(jobRequest.getCid())
                    .orElseThrow(() -> new EntityNotFoundException("Candidate not found with ID: " + jobRequest.getCid()));

            Applied applied = new Applied();
            applied.setCandidate(candidate);
            applied.setJid(jobRequest.getJid());
            applied.setJobName(jobRequest.getCompany_name());
            //applied.setTestScore(jobRequest.getTest_score());
            applied.setAppliedStatus(jobRequest.getApplied_status());
            appliedRepository.save(applied);

            JobEnrollDTO dto = new JobEnrollDTO();
            dto.setCandidateId(candidate.getId().longValue());
            dto.setJobId(jobRequest.getJid().longValue());
            dto.setCandidateName(candidate.getEmail());
            System.out.println(dto);
            ResponseEntity<String> d = InterviewerClient.enrollInJob(dto);
            System.out.println(d);
            return "Success"; // You may return any token or message as needed
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Or handle error gracefully
        }
    }

    @Override
    public List<AppliedJobDTO> listOfAppliedJobs(Integer id) {
        List<Applied> appliedList = appliedRepository.findByCandidateId(id);

        List<AppliedJobDTO> appliedJobDTOList = new ArrayList<>();
        for (Applied applied : appliedList) {
            System.out.println(applied.getJid());
            JobForCandidateMicroserviceDTO d = InterviewerClient.getJob(applied.getJid()).getBody().get();

            appliedJobDTOList.add(new AppliedJobDTO(
                    applied.getId(),
                    applied.getCandidate().getId(),
                    applied.getJid(),
                    applied.getJobName(),
                    d.getRoleType(),
                    d.getJobDescription(),
                    applied.getInterviewDate(),
                    applied.getAppliedStatus()
            ));
        }
        return appliedJobDTOList;
    }

    @Override
    public boolean updateAppliedJob(updateAppliedJobDTO updateAppliedJobDTO) {
        int cid = updateAppliedJobDTO.getCid();
        int jid = updateAppliedJobDTO.getJid();
        Date InterviewDate = updateAppliedJobDTO.getInterviewDate();
        Optional<Applied> appliedOptional = appliedRepository.findByCandidateIdAndAndJid(cid, jid);
        if (appliedOptional.isPresent()) {
            Applied applied = appliedOptional.get();
            applied.setAppliedStatus("Interview Scheduled");
            applied.setInterviewDate(InterviewDate);
            appliedRepository.save(applied);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateTestScore(Integer id, String testScore) {
        System.out.println("Test: "+ testScore);

        Optional<Applied> appliedOptional = appliedRepository.findById(id);
        if (appliedOptional.isPresent()) {
            Applied applied = appliedOptional.get();
           // applied.setTestScore(testScore);
            appliedRepository.save(applied);
            return true;
        }
        return false;
    }
}
