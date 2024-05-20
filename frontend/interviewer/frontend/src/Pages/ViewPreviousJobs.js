import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ViewPreviousJobs = () => {
  // Array containing job data
  const [jobs, setJobs] = useState([
    {
      jobName: "Software Engineer",
      requirements: "5+ years experience, strong knowledge of React and Node.js",
      enrollments: 10
    },
    {
      jobName: "Data Scientist",
      requirements: "Masters in Data Science, Python expertise, experience with ML algorithms",
      enrollments: 7
    },
    {
      jobName: "UX/UI Designer",
      requirements: "2+ years experience in UX/UI design, proficiency in Figma",
      enrollments: 12
    },
    {
      jobName: "UX/UI Designer",
      requirements: "2+ years experience in UX/UI design, proficiency in Figma",
      enrollments: 12
    },
    {
      jobName: "UX/UI Designer",
      requirements: "2+ years experience in UX/UI design, proficiency in Figma",
      enrollments: 12
    },
    {
      jobName: "UX/UI Designer",
      requirements: "2+ years experience in UX/UI design, proficiency in Figma",
      enrollments: 12
    },
    {
      jobName: "UX/UI Designer",
      requirements: "2+ years experience in UX/UI design, proficiency in Figma",
      enrollments: 12
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
    <Navbar/>
    <div className="relative overflow-x-auto dark:bg-slate-800  p-4 h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded shadow-lg border border-gray-600 p-4 mb-6">
        <caption className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Job Openings</caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-4 py-3 ">
              Job name
            </th>
            <th scope="col" className="px-4 py-3">
              Requirements
            </th>
            <th scope="col" className="px-4 py-3">
              Enrollment
            </th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job, index) => (
            <React.Fragment key={index}>
              <tr className="bg-white dark:bg-gray-900 rounded-lg">
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {job.jobName}
                </td>
                <td className="px-4 py-3">{job.requirements}</td>
                <td className="px-4 py-3">{job.enrollments}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-900 h-1"></tr> {/* White line separator */}
            </React.Fragment>
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
            style={{ minWidth: "30px", minHeight: "30px", borderRadius: "9999px" }} // Adjusted the size and border radius
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ViewPreviousJobs;
