import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import DatePickerPopup from '../Components/DatePickerPopup';
import { BASE_URL } from '../config';
import resultImg from "../Assets/result.webp"


const ViewEnrollments = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [jobs, setJobs] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedenrollId, setSelectedenrollId] = useState(null);
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
    
  const scheduleInterviewHandler = (enrollId) => {
    setSelectedenrollId(enrollId);
    setShowDatePicker(true);
  };
  
  const ViewInterviewHandler = (jobId, roomId) => {
    alert( 'Room ID: '+roomId+' Date:' + jobId);

  };

  const seeResultHandler= (enrollId)=>{
    navigate(`/view-result`,{state:{enrollId:enrollId}});
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interviewer/jobEnrollments/${id}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    fetchData();
  }, [id, rerender]);

  const closeJob = async()=>{
    
  await axios.post(`${BASE_URL}/interviewer/close-job/${id}`);
  alert("Job opening closed");
  }

  const handleDateSubmit = async (selectedDate) => {
    try {
      const javaSqlDate = new Date(selectedDate).toISOString().split('T')[0];
      
      await axios.post(`${BASE_URL}/interviewer/scheduleInterview`, {
        enrollId: selectedenrollId,
        interviewDate: javaSqlDate,
      });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === selectedenrollId ? { ...job, interviewDate: javaSqlDate } : job
        )
      );
      setShowDatePicker(false);
      setRerender(prev => !prev);
    } catch (error) {
      console.error('Error scheduling interview:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto dark:bg-slate-800 p-8 gap-4 h-screen">
      <div className="flex justify-between mb-4">
        <div></div>
        <div className="p-2">
          <h2 className="text-xl text-white mb-4 text-center">Enrolled Candidates</h2>
        </div>
        <div>
          <button className="bg-blue-500 text-white text-m px-6 py-3 rounded-xl" onClick={closeJob}>Close Job Opening</button>
        </div>
      </div>
      <div>
        {showDatePicker && <DatePickerPopup onSubmit={handleDateSubmit} />} 
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md shadow-lg border border-gray-600 p-4 mb-6 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">Candidate Name</th>
              <th scope="col" className="px-4 py-3">Interview Date</th>
              <th scope="col" className="px-4 py-3">Action</th>
              <th scope="col" className="px-4 py-3">Result</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="bg-white dark:bg-gray-900 rounded-lg">
                <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                  {job.candidateName}
                </td>
                <td className="px-6 py-4">
                  {job.interviewDate ? job.interviewDate : "Interview Date Not Available"}
                </td>

                <td className="px-6 py-4">
                  {job.interviewDate ? (
                    <span className="text-xs bg-green-200 text-green-800 rounded-full px-2 py-1" onClick={() => ViewInterviewHandler(job.interviewDate,job.roomId)}>
                      View Schedule
                    </span>
                  ) : (
                    <button className="text-xs bg-blue-200 text-blue-800 rounded-full px-2 py-1" onClick={() => scheduleInterviewHandler(job.enrollId)}>
                      Schedule Interview
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                    {job.resultStatus ===true ? (
                      <button onClick = {() => seeResultHandler(job.enrollId)}>
                        <img src={resultImg} className="w-9 h-9 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" alt="Result"/>
                      </button>
                    ) : (
                      <button className="text-xs  text-red-300 l px-2 py-1">
                        not available
                      </button>
                    )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}  

export default ViewEnrollments;
