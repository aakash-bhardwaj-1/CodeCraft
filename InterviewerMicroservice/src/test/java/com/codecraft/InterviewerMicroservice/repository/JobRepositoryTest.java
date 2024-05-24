package com.codecraft.InterviewerMicroservice.repository;

import com.codecraft.InterviewerMicroservice.entities.AllRequirements;
import com.codecraft.InterviewerMicroservice.entities.Interviewer;
import com.codecraft.InterviewerMicroservice.entities.Job;
import com.codecraft.InterviewerMicroservice.entities.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


// Here first we persist the data into db, and then try to fetch it, if fetch successful that means repo is working fine, else problem
// after testing done we will flush the new data inserted into db
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class JobRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private JobRepository jobRepository;

    private Interviewer interviewer;
    private Job job1;
    private Job job2;

    @BeforeEach
    public void setUp() {
        interviewer = new Interviewer();
        interviewer.setEmail("John@gmail.com");

        entityManager.persist(interviewer);
        entityManager.flush();

        Question question1 = new Question();
        question1.setQuestion("What is Java?");
        Question question2 = new Question();
        question2.setQuestion("Explain OOP concepts.");

        entityManager.persist(question1);
        entityManager.persist(question2);
        entityManager.flush();

        AllRequirements requirement1 = new AllRequirements();
        requirement1.setRequirementName("Java");
        AllRequirements requirement2 = new AllRequirements();
        requirement2.setRequirementName("Spring Boot");

        entityManager.persist(requirement1);
        entityManager.persist(requirement2);
        entityManager.flush();

        job1 = new Job();
        job1.setCompany("ABC Corp");
        job1.setContact("abc@abc.com");
        job1.setJobDescription("Software Developer");
        job1.setStatus("Open");
        job1.setNoOfEnrollments(10);
        job1.setRoleType("Full-Time");
        job1.setInterviewer(interviewer);
        job1.setQuestions(new HashSet<>(Arrays.asList(question1, question2)));
        job1.setAllRequirements(new HashSet<>(Arrays.asList(requirement1, requirement2)));

        job2 = new Job();
        job2.setCompany("XYZ Inc");
        job2.setContact("xyz@xyz.com");
        job2.setJobDescription("Backend Developer");
        job2.setStatus("Closed");
        job2.setNoOfEnrollments(5);
        job2.setRoleType("Part-Time");
        job2.setInterviewer(interviewer);
        job2.setQuestions(new HashSet<>(Arrays.asList(question1)));
        job2.setAllRequirements(new HashSet<>(Arrays.asList(requirement2)));

        entityManager.persist(job1);
        entityManager.persist(job2);
        entityManager.flush();
    }

    @Test
    public void findByInterviewerIdTest() {
        List<Job> foundJobs = jobRepository.findByInterviewerId(interviewer.getId());
        assertEquals(2, foundJobs.size());
        assertEquals("ABC Corp", foundJobs.get(0).getCompany());
        assertEquals("XYZ Inc", foundJobs.get(1).getCompany());

        System.out.println("------------------ findByInterviewerIdTest Repository Test Successfully Ran -----------------");

    }

    @Test
    public void countAllByInterviewerIdTest() {
        int jobCount = jobRepository.countAllByInterviewerId(interviewer.getId());
        assertEquals(2, jobCount);

        System.out.println("------------------ countAllByInterviewerIdTest Repository Test Successfully Ran -----------------");

    }
}