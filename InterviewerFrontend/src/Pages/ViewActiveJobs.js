import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { GetJobOpenings } from '../API/APIs';

const ViewActiveJobs = () => { // Correctly destructure the props
  const [jobs, setjobs] = useState([]);
  const navigate = useNavigate();
  // Logging the passed jobs array
  console.log("Passed jobs array:", jobs);
  const handleViewMoreClick =(id) => {
     console.log(id);
     navigate(`/active-jobs-view/`, {state:{id}});
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetJobOpenings();
        console.log("R: after call "+ result)
        setjobs(result);
      } catch (error) {
        console.error("Error fetching job openings:", error);
        // Optionally, you can handle the error state here, e.g., setJobs([]) or display an error message.
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect only runs once when the component mounts
  

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="relative overflow-x-auto dark:bg-slate-800 p-4 h-screen">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded shadow-lg border border-gray-600 p-4 mb-6">
          <caption className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Job Openings</caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">Job name</th>
              <th scope="col" className="px-4 py-3">Role Type</th>
              <th scope="col" className="px-4 py-3">Requirements</th>
              <th scope="col" className="px-4 py-3">Enrollment</th>
              <th scope="col" className="px-4 py-3">View</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => (
              <tr key={index} className="bg-white dark:bg-gray-900 rounded-lg">
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {job.company}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {job.roleType}
                </td>
                <td className="px-4 py-3">{job.requirements.join(" , ")}</td>
                <td className="px-4 py-3">{job.noOfEnrollments}</td>
                <td className="px-4 py-3">
                <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none" 
                         onClick={() => handleViewMoreClick(job.id)}>
                  View
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 rounded-full focus:outline-none ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
              style={{ minWidth: "30px", minHeight: "30px", borderRadius: "9999px" }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewActiveJobs;
