import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { useNavigate } from 'react-router-dom';
import TotalInterviewsLogo from "../Assets/TotalInterviews.png";
import ActiveJobsLogo from "../Assets/ActiveJobsLogo.png";
import PreviousJobsLogo from "../Assets/ClosedJobsLogo.png";
import TotalJobsLogo from "../Assets/TotalOnterviews.png";
import Navbar from '../Components/Navbar';
import ActiveJobs from '../Components/ActiveJobs';
import PreviousJobs from '../Components/PreviousJobs';
import { GetJobClosedOpenings, GetJobOpenings } from '../API/APIs';
import axios from 'axios';
import { BASE_URL } from '../config';

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [closedJobs, setClosedJobs] = useState([]);
  const interviewer_id = localStorage.getItem("interviewer_id");

  const onCreateHandle = () => {
    navigate(`/create-job`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetJobOpenings();
        const closedResult = await GetJobClosedOpenings();
        setJobs(result);
        setClosedJobs(closedResult);
      } catch (error) {
        console.error("Error fetching job openings:", error);
      }
    };

    fetchData();
  }, [interviewer_id]);

  useEffect(() => {
    console.log("closedJobs: ", closedJobs); // Log the updated state
  }, [closedJobs]);

  return (
    <div>
      <Navbar />
      <div className='grid grid-rows-[auto,auto,1fr] gap-3 p-3 h-screen bg-gray-800'>
        <div className='flex flex-row justify-between items-center px-8 py-2'>
          <h2 className="text-white font-sans">Dashboard</h2>
          <button 
            className="bg-blue-500 text-white text-lg px-6 py-3 rounded-xl" 
            onClick={onCreateHandle}
          >
            Create Job
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 px-5">
          <Card 
            className="hover:shadow-lg" 
            heading={"Total active Jobs"} 
            count={jobs.length} 
            imageLink={ActiveJobsLogo}
          />
          <Card 
            className="hover:shadow-lg" 
            heading={"Closed postings"} 
            count={closedJobs.length} 
            imageLink={PreviousJobsLogo}
          />
          <Card 
            className="hover:shadow-lg" 
            heading={"Total Enrollments"} 
            count={100} 
            imageLink={TotalJobsLogo}
          />
          <Card 
            className="hover:shadow-lg" 
            heading={"Total interviews"} 
            count={100} 
            imageLink={TotalInterviewsLogo}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 px-4 py-2 flex-grow">
  <div className="flex flex-row gap-3 w-full">
    <div className="flex-grow w-2/3">
      <ActiveJobs className="p-4" jobs={jobs} />
    </div>
    <div className="flex-grow w-1/3">
      <PreviousJobs className="p-4" jobs={closedJobs} />
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
