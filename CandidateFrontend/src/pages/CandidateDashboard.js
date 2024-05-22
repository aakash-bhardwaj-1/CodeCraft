import React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import "../static/css/common.css";
import PageHeading from "../components/header/PageHeading";
import FeatureCard from "../components/cards/FeatureCard";
import Navbar from "../components/header/Navbar";

function CandidateDashboard() {
	return (
		<div>
			<Navbar />
			<PageHeading title="Candidate Dashboard" />

			<div className="cards">
				<div className="row">
					<FeatureCard
						cardColor="blue"
						title="View Availabe Jobs"
						img="view-available-jobs.png"
						link="/view-jobs"
					/>
					<FeatureCard
						cardColor="green"
						title="View Applied Jobs"
						img="applied-jobs.png"
						link="/applied-jobs"
					/>
				</div>
			</div>
		</div>
	);
}

export default CandidateDashboard;