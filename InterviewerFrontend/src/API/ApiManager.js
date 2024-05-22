import axios from "axios";
import { BASE_URL } from "../config";

const ApiManager = axios.create({
	baseURL: BASE_URL,
	responseType: "json",
	withCredentials: false,
});



export default ApiManager;