package com.codecraft.InterviewerMicroservice.repository;

import com.codecraft.InterviewerMicroservice.entities.Enrollment;
import com.codecraft.InterviewerMicroservice.entities.Job;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EnrollmentRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Test
    public void findByCandidateIdAndJobIdTest() {
        // Given
        Long candidateId = 1L;
        Job job = new Job();
        job.setCompany("Test Company");
        job.setContact("test@test.com");
        job.setStatus("Open");
        entityManager.persistAndFlush(job);

        Enrollment enrollment = new Enrollment();
        enrollment.setCandidateId(candidateId);
        enrollment.setJob(job);
        entityManager.persistAndFlush(enrollment);

        // When
        Optional<Enrollment> foundEnrollment = enrollmentRepository.findByCandidateIdAndJobId(candidateId, job.getId());

        // Then
        assertTrue(foundEnrollment.isPresent());
        assertEquals(candidateId, foundEnrollment.get().getCandidateId());
        assertEquals(job.getId(), foundEnrollment.get().getJob().getId());

        System.out.println("------------------ findByCandidateIdAndJobIdTest Repository Test Successfully Ran -----------------");

    }

    @Test
    public void findByIdTest(){
        // Given
        Enrollment enrollment = new Enrollment();
        entityManager.persistAndFlush(enrollment);

        // When
        Optional<Enrollment> foundEnrollment = enrollmentRepository.findById(enrollment.getId());

        // Then
        assertTrue(foundEnrollment.isPresent());
        assertEquals(enrollment.getId(), foundEnrollment.get().getId());

        System.out.println("------------------ findByIdTest Repository Test Successfully Ran -----------------");

    }
}