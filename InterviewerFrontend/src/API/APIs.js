import axios from "axios";
import ApiManager from "./ApiManager";
import { BASE_URL } from "../config";

export const GetJobOpenings = async () => {
    try {
        const interviewer_id = await localStorage.getItem("interviewer_id");
        if (!interviewer_id) {
            throw new Error("Interviewer ID not found in localStorage");
        }
        const result = await ApiManager(`/interviewer/jobs/${interviewer_id}`, {
            method: "GET",
        });
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error('Error fetching job openings:', error);
        throw error;
    }
};

export const GetJobClosedOpenings = async () => {
    try {
        const interviewer_id = await localStorage.getItem("interviewer_id");
        if (!interviewer_id) {
            throw new Error("Interviewer ID not found in localStorage");
        }
        const closedResult = await ApiManager(`/interviewer/closed-jobs/${interviewer_id}`, {
            method: "GET",
        });
        console.log("inside api call=");
        console.log(closedResult.data)
        return closedResult.data;
    } catch (error) {
        console.error('Error fetching closed job openings:', error);
        throw error;
    }
};

export const SendJob = async (jobData) => {
    try {
        console.log(jobData);
        const response = await axios.post(`${BASE_URL}/interviewer/createJob`, jobData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending job data:', error);
        throw error;
    }
};
