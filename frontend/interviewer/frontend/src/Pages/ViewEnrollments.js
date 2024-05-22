import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DatePickerPopup from '../Components/DatePickerPopup';

const ViewEnrollments = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [jobs, setJobs] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedenrollId, setSelectedenrollId] = useState(null);
  const [rerender, setRerender] = useState(false);

  const scheduleInterviewHandler = (enrollId) => {
    setSelectedenrollId(enrollId);
    setShowDatePicker(true);
  };
  
  const ViewInterviewHandler = (jobId, roomId) => {
    alert(jobId + roomId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/interviewer/jobEnrollments/${id}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    fetchData();
  }, [id, rerender]);

  const handleDateSubmit = async (selectedDate) => {
    try {
      const javaSqlDate = new Date(selectedDate).toISOString().split('T')[0];
      
      await axios.post(`http://localhost:8081/interviewer/scheduleInterview`, {
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
    <div className="display-flex overflow-x-auto bg-slate-800 h-screen px-20 py-10 gap-2">
      <div className="flex justify-end">
         <button className="bg-blue-400 text-white text-l px-6 py-3 rounded-xl" >Close Job Opening</button>
      </div>
      <div>
      {showDatePicker && <DatePickerPopup onSubmit={handleDateSubmit} />} 
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Candidate Name
            </th>
            <th scope="col" className="px-6 py-3">
              OA Score
            </th>
            <th scope="col" className="px-6 py-3">
              Job ID
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} dark:bg-gray-800 dark:border-gray-700`}
            >
              <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                {job.candidateName}
              </td>
              <td className="px-6 py-4">
                not implemented
              </td>
              <td className="px-6 py-4">
                {job.enrollId}
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
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ViewEnrollments;
