import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewerAnalysis() {
	const reactNavigator = useNavigate();
	const [fulfilledRequirements, setFulfilledRequirements] = useState([]);
	const [positiveFeedback, setPositiveFeedback] = useState("");
	const [negativeFeedback, setNegativeFeedback] = useState("");

	const handleRequirementChange = (requirement) => {
		if (fulfilledRequirements.includes(requirement)) {
			setFulfilledRequirements(
				fulfilledRequirements.filter((req) => req !== requirement)
			);
		} else {
			setFulfilledRequirements([
				...fulfilledRequirements,
				requirement,
			]);
		}
	};

	const submit = async () => {
		console.log("Fulfilled Requirements:", fulfilledRequirements);
		console.log("Positive Feedback:", positiveFeedback);
		console.log("Negative Feedback:", negativeFeedback);
		// reactNavigator("/");
	};

	const requirements = [
		"java",
		"python",
		"scala",
		"javascript",
		"flask",
		"html",
		"css",
	];

	return (
		<div className="interviewerAnalysisWrapper">
			<h1>Analysis</h1>

			<div className="requirementAnalysis">
				<h3>Fulfilled Requirements</h3>
				<div className="requriements">
					{requirements.map((requirement, index) => (
						<label key={index}>
							<input
								type="checkbox"
								className="requirementCheckbox"
								checked={fulfilledRequirements.includes(
									requirement
								)}
								onChange={() =>
									handleRequirementChange(
										requirement
									)
								}
							/>
							{requirement}
						</label>
					))}
				</div>
			</div>
			<div className="inputAnalysis">
				<h3>Positive Feedback</h3>
				<input
					type="text"
					autoFocus
					placeholder="Enter Positive Feedback"
					autoComplete="off"
					value={positiveFeedback}
					onChange={(e) => setPositiveFeedback(e.target.value)}
				/>
			</div>
			<div className="inputAnalysis">
				<h3>Negative Feedback</h3>
				<input
					type="text"
					autoFocus
					placeholder="Enter Negative Feedback"
					autoComplete="off"
					value={negativeFeedback}
					onChange={(e) => setNegativeFeedback(e.target.value)}
				/>
			</div>
			<button className="btn leaveBtn" onClick={submit}>
				Submit & Leave Room
			</button>
			<br />
			<br />
		</div>
	);
}

export default InterviewerAnalysis;
