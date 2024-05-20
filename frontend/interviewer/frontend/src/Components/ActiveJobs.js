import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ActiveJobs = ({ jobs }) => {
  const navigate = useNavigate();
  // Logging the passed jobs array
  console.log("Passed jobs array:", jobs);
  const handleViewMoreClick =(id) => {
     console.log(id);
     navigate(`/active-jobs-view/`, {state:{id}});
  };
  return (
    <div className=" dark:bg-gray-900 rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
        <caption className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Job Openings</caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400 rounded-lg">
          <tr>
          <th scope="col" className="px-6 py-3 rounded-l-lg">
              Role Type
            </th>
            <th scope="col" className="px-6 py-3 rounded-l-lg">
              Company
            </th>
           
            <th scope="col" className="px-6 py-3">
              Requirements
            </th>
            <th scope="col" className="px-6 py-3">
              Enrollment
            </th>
            <th scope="col" className="px-6 py-3 rounded-r-lg" >
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.slice(0, 3).map((elements, key) => (
            <React.Fragment key={elements.id}>
              <tr className="bg-white dark:bg-gray-900 rounded-lg">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {elements.roleType}
                </td>
               <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {elements.company}
                </td>

                <td className="px-6 py-4  min-w-[10rem] max-w-[10rem] overflow-hidden">
                  <div className="max-h-10 min-h-10  overflow-y-auto">{elements.requirements}</div>
                </td>
                <td className="px-6 py-4">{elements.noOfEnrollments}</td>
                <td className="px-6 py-4">

                <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none" 
                         onClick={() => handleViewMoreClick(elements.id)}>
                  View
                </button>
                </td>
              </tr>
              <tr className="bg-gray-900">
                <td colSpan="4" className="h-px"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="px-6 py-3 text-center">
              <Link to="/view-more-open" >
                <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">View more</button>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ActiveJobs;
