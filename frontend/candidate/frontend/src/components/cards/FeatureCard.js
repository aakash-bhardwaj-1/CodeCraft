import React from "react";
import "../../static/css/FeatureCard.css";
import { Link } from "react-router-dom";

function FeatureCard(props) {
	const { cardColor, title, img, link } = props;

	return (
		<div className={"feature-card " + cardColor}>
			<img
				className="feature-card-img"
				src={require(`../../static/imgs/${img}`)}
				alt=""
			/>
			<div class="feature-card-contents">
				<h1>{title}</h1>
				<Link to={props.link}>
					<button class="white-btn">Go</button>
				</Link>
			</div>
		</div>
	);
}

export default FeatureCard;