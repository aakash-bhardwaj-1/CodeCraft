package com.example.demo.Controller;

import com.example.demo.DTO.CreateJob;
import com.example.demo.DTO.jobPostingsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class jobRequirementsController {
    @Autowired
    private com.example.demo.Service.jobPostingsService getDataService;

    @GetMapping("/get_jobs")
    public List<jobPostingsDTO> controllerfunc(){
        return getDataService.getDataService();
    }
    @PostMapping("/create_job")
    public boolean create_job(@RequestBody CreateJob uploadData){
        System.out.println(uploadData);
        return true;

    }
}
