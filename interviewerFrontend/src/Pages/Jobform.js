import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { SendJob } from '../API/APIs';
import { useLocation, useNavigate } from 'react-router-dom';

function Jobform() {
  const navigate = useNavigate();
  const location = useLocation();
  const { interviewer_id } = location.state || {};
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [roleType, setRoleType] = useState('');
  const [experience, setExperience] = useState(0);
  const [requirements, setRequirements] = useState([]);

  const handleRequirementsChange = (e) => {
    const tech = e.target.value;
    if (requirements.includes(tech)) {
      setRequirements(requirements.filter(item => item !== tech));
    } else {
      setRequirements([...requirements, tech]);
    }
  };

  // Function to create DTO object from form data
  const createJobDTO = (company, jobDescription, roleType, requirements, contact, experience) => {
    return {
      company,
      contact,
      jobDescription,
      roleType,
      interviewerId: parseInt(interviewer_id),  // Ensure interviewerId is an integer
      requirements: Array.from(requirements),  // Ensure requirements is an array
      experience,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = createJobDTO(company, jobDescription, roleType, requirements, contact, experience);
    console.log(uploadData);
    SendJob(uploadData);
    navigate("/dashboard", { state: { interviewer_id } });
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-gray-800 py-1">
        <div className="w-2/3 p-2">
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded shadow-lg border border-gray-600 p-4 mb-6">
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm text-white">Company:</label>
              <input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="block py-2.5 px-4 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white focus:outline-none"
                placeholder="Company"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm text-white">Contact ID:</label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="block py-2.5 px-4 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white focus:outline-none"
                placeholder="Contact ID"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="roleType" className="block text-sm text-white">Role Type:</label>
              <select
                id="roleType"
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="block py-2.5 px-4 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white focus:outline-none"
                required
              >
                <option value="">Select Role Type</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full-stack Developer">Full-stack Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="jobDescription" className="block text-sm text-white">Job Description:</label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="block py-2.5 px-4 w-full h-20 text-sm text-white bg-transparent border-0 border-b-2 border-white focus:outline-none resize-none"
                placeholder="Job description"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="requirements" className="block text-sm text-white">Requirements:</label>
              <div className="flex flex-wrap">
                {["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"].map(tech => (
                  <div key={tech} className="mr-2 mb-2">
                    <input
                      type="checkbox"
                      id={tech}
                      value={tech}
                      checked={requirements.includes(tech)}
                      onChange={handleRequirementsChange}
                      className="hidden"
                    />
                    <label
                      htmlFor={tech}
                      className={`cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        requirements.includes(tech) ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {tech}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="experience" className="block text-sm text-white">Experience:</label>
              <input
                type="range"
                id="experience"
                min="0"
                max="20"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full"
              />
              <div className="text-sm text-white text-center">{experience} years</div>
            </div>
            <button
              type="submit"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Jobform;
