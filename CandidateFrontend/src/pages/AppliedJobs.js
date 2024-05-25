import React, { useEffect, useState } from "react";
import Navbar from "../components/header/Navbar";
import PageHeading from "../components/header/PageHeading";
import Table from "../components/tables/Table";
import axios from "axios";

function ViewJobs() {
	const columns = ["Company Name", "Job Role", "Job Description", "Interview Date", "Status"];
	
	const [tableData, setTableData] = useState([]);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const id = parseInt(localStorage.getItem("candidateId"));
				const response = await axios.get(`http://localhost:8000/candidate/appliedJobs/${id}`);
				setTableData(response.data); // Assuming response.data is an array of data for the table
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<Navbar />
			<PageHeading title="Applied Jobs" />
			<div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
				<Table 
					columns={columns}
					data={tableData.map(row => ({
						"Company Name": row.jobName,
						"Job Role": row.jobRole,
						"Job Description": row.jobDescription,
						"Interview Date": row.interviewDate === null || row.interviewDate === 'null' ? "Yet to decide" : row.interviewDate,
						"Status": row.appliedStatus
					}))}
				/>
			</div>
		</div>
	);
}

export default ViewJobs;
