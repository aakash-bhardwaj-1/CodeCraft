package com.example.demo.Service;

import com.example.demo.DTO.jobPostingsDTO;
import com.example.demo.Entities.jobPostings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class jobPostingsService {
@Autowired
    private com.example.demo.Repository.jobPostingRepository jobPostingRepository;

    public List<jobPostingsDTO> getDataService(){
        List<jobPostingsDTO> data = new ArrayList<>();
        List<jobPostings> jobs = jobPostingRepository.findAll();
        for(jobPostings it : jobs){
            jobPostingsDTO temp = new jobPostingsDTO();
            temp.setEnrollments(it.getJobEnrollments());
            temp.setJobName(it.getJobName());
            temp.setRequirements(it.getJobRequirements());
            data.add(temp);
        }
        return data;
    }
}
