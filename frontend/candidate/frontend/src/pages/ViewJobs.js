import React, { useEffect, useState } from "react";
import Navbar from "../components/header/Navbar";
import PageHeading from "../components/header/PageHeading";
import Table from "../components/tables/Table";
import axios from "axios";

function ViewJobs() {
    const columns = ["Company Name", "Job Role", "Job Description", "Requirements", "Apply"];
    
    function JobApplyDTO(id, company, candidateId) {
        return {
            cid: parseInt(candidateId),
            jid: id,
            company_name: company
        };
    }

    const handleViewClick = async (id, company, candidateId) => {
        try {
            const dto = JobApplyDTO(id, company, candidateId);
            await axios.post("http://localhost:8082/candidate/apply", dto);
            console.log('Job application submitted:', dto);
            // After applying, fetch the updated list of applied jobs and update the table
            fetchAppliedJobs();
			alert("Interview schedule will be notified via e-mail");
        } catch (error) {
            console.error('Error applying for job:', error);
        }
    };

    const [tableData, setTableData] = useState([]);

    const fetchAppliedJobs = async () => {
        try {
            const appliedJobsResponse = await axios.get(`http://localhost:8000/candidate/appliedJobs/${localStorage.getItem("candidateId")}`);
            const appliedJobs = appliedJobsResponse.data;

            // Mark applied jobs in the table data
            const updatedTableData = tableData.map(job => {
                const isApplied = appliedJobs.some(appliedJob => appliedJob.jid === job.id);
                return {
                    ...job,
                    applied: isApplied // Adding a flag to indicate if the job is applied
                };
            });

            setTableData(updatedTableData);
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
        }
    };

    const renderViewButton = (id, company, isApplied) => {
        if (isApplied) {
            return <button className="view-button" disabled>Applied</button>;
        } else {
            return (
                <button onClick={() => handleViewClick(id, company, localStorage.getItem("candidateId"))} className="view-button">
                    Apply
                </button>
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all active jobs
                const allJobsResponse = await axios.get("http://localhost:8000/interviewer/all-active-jobs");
                const allJobs = allJobsResponse.data;

                // Fetch applied jobs
                const appliedJobsResponse = await axios.get(`http://localhost:8000/candidate/appliedJobs/${localStorage.getItem("candidateId")}`);
                const appliedJobs = appliedJobsResponse.data;

                // Mark applied jobs in the table data
                const updatedTableData = allJobs.map(job => {
                    const isApplied = appliedJobs.some(appliedJob => appliedJob.jid === job.id);
                    return {
                        ...job,
                        applied: isApplied // Adding a flag to indicate if the job is applied
                    };
                });

                setTableData(updatedTableData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <PageHeading title="Available Jobs" />
            <Table 
                columns={columns}
                data={tableData.map(row => ({
                    "Company Name": row.company,
                    "Job Role": row.roleType,
                    "Job Description": row.jobDescription,
                    "Requirements": row.allRequirements.map(req => req.requirementName).join(', '),
                    "Apply": renderViewButton(row.id, row.company, row.applied), // Pass the applied flag
                }))}
            /> 
        </div>
    );
}

export default ViewJobs;
