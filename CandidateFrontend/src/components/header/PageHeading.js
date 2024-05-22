import React from "react";
import "../../static/css/common.css";

function PageHeading(props) {
	const styles = {
		pageHeading: {
			marginTop: "30px",
			textAlign: "center",
			fontSize: "26px",
			fontWeight: "600",
			marginBottom: "25px",
			textTransform: "capitalize",
		},
	};

	return (
		<div className="page-heading">
			<h2>
				<span>{props.title}</span>
			</h2>
		</div>
	);
}

export default PageHeading;
