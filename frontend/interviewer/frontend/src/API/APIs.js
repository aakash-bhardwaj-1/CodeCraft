import axios from "axios";
import ApiManager from "./ApiManager";

export const GetJobOpenings = async () => {
		const result = await ApiManager('/interviewer/jobs/1', {
			method: "GET",
		});
		console.log(result[0]);
		return result.data;
};


export const SendJob = async (jobData) => {
  try {
	console.log(jobData)
    const response = await axios.post('http://localhost:8081/interviewer/createJob', jobData);
    console.log(response.data);
  } catch (error) {
    console.error('Error sending job data:', error);
  }
};
