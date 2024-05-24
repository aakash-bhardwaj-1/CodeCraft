import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PreviousJobs = ({ jobs }) => {
  useEffect(()=>{
    console.log("Received table");
    console.log( jobs);
  })
 
  return (
    <div className="dark:bg-gray-900 rounded-lg py-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
        <caption className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Previous Jobs Postings 
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400 rounded-lg">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-l-lg">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Requirements
            </th>
            <th scope="col" className="px-6 py-3 rounded-r-lg">
              Role Type
            </th>
          </tr>
        </thead>
        <tbody>
          {(jobs || []).slice(0, 3).map((job, index) => (
            <React.Fragment key={index}>
              <tr className="bg-white dark:bg-gray-900 rounded-lg">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {job.company}
                </td>
                <td className="px-6 py-4 max-w-[16rem] overflow-hidden">
                  <div className="max-h-10 overflow-y-auto">{job.requirements.join(" , ")}</div>
                </td>
                <td className="px-6 py-4">
                <div className="max-h-10 overflow-y-auto">{job.roleType}</div>
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
              <Link to="/view-more-prev">
                <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">
                  View more
                </button>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

PreviousJobs.propTypes = {
  closedJobs: PropTypes.arrayOf(
    PropTypes.shape({
      jobName: PropTypes.string.isRequired,
      requirements: PropTypes.string.isRequired,
    })
  ),
};

PreviousJobs.defaultProps = {
  closedJobs: [],
};

export default PreviousJobs;
