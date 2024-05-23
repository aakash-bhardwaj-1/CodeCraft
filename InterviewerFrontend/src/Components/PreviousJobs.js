import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PreviousJobs = () => {
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
    }
  ]);

  return (
    <div className=" dark:bg-gray-900 rounded-lg py-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg ">
        <caption className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Previous Jobs Postings</caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400 rounded-lg">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-l-lg">
              Job name
            </th>
            <th scope="col" className="px-6 py-3">
              Requirements
            </th>
            {/* Remove the Enrollment column header */}
            {/* <th scope="col" className="px-6 py-3">
              Enrollment
            </th> */}
            <th scope="col" className="px-6 py-3 rounded-r-lg">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <React.Fragment key={index}>
              <tr className="bg-white dark:bg-gray-900 rounded-lg">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {job.jobName}
                </td>
                <td className="px-6 py-4 max-w-[16rem] overflow-hidden">
                    <div className="max-h-10 overflow-y-auto">{job.requirements}</div>
              </td>
                {/* Remove the Enrollment column */}
                {/* <td className="px-6 py-4">{job.enrollments}</td> */}
                <td className="px-6 py-4">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">View</button>
                </td>
              </tr>
              <tr className="bg-gray-900">
                <td colSpan="3" className="h-px"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
            <tr>
              <td colSpan="3" className="px-6 py-3 text-center">
                <Link to = "/view-more-prev">
                <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">View more</button>
                </Link>
              </td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PreviousJobs;
