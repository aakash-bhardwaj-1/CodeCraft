import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../static/logo.png";
import axios from "axios";

const Home = () => {
	const navigate = useNavigate();

	const [roomId, setRoomId] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [interviewer, setInterviewer] = useState(false);

	const createNewRoom = (e) => {
		e.preventDefault();
		const id = uuidV4();
		setRoomId(id);
		toast.success("Created a new room");
	};

	const joinRoom = async () => {
		if (!roomId || !username) {
			toast.error("ROOM ID & username is required");
			return;
		}
		localStorage.setItem("roomId", roomId);
		localStorage.setItem("candidateName", username);

		if (!interviewer) {
			// enroll check
			try {
				const response = await axios.post(`http://localhost:8000/interviewer/code-sync-candidate-check/${username}`, roomId, {
    headers: {
        'Content-Type': 'text/plain'
    }
});

				// If the login is successful, navigate to the editor
				if (response.data === true) {
					navigate(`/editor/${roomId}`, {
						state: {
							username,
							interviewer,
						},
					});
				} else {
					setError('Invalid login credentials');
					toast.error('Invalid login credentials');
				}
			} catch (error) {
				console.error('Error logging in:', error);
				setError('Failed to login. Please try again.');
				toast.error('Failed to login. Please try again.');
			}
		} else {
			try {
				const response = await axios.post(`http://localhost:8000/interviewer/code-sync-interviewer-check/${username}`, {
					roomId,
				});			
				if (response.data === true) {
					navigate(`/editor/${roomId}`, {
						state: {
							username,
							interviewer,
						},
					});
				} else {
					setError('Invalid login credentials');
					toast.error('Invalid login credentials');
				}
			} catch (error) {
				console.error('Error logging in:', error);
				setError('Failed to login. Please try again.');
				toast.error('Failed to login. Please try again.');
			}
		}
	};

	const handleInputEnter = (e) => {
		if (e.code === "Enter") {
			joinRoom();
		}
	};

	const handleInterviewer = () => {
		setInterviewer(!interviewer);
	};
	
	return (
		<div className="homePageWrapper">
			<div className="formWrapper">
				<img
					className="homePageLogo"
					src={logo}
					alt="code-sync-logo"
				/>
				<h4 className="mainLabel">Paste invitation ROOM ID</h4>
				<div className="inputGroup">
					<input
						type="text"
						className="inputBox"
						placeholder="ROOM ID"
						onChange={(e) => setRoomId(e.target.value)}
						value={roomId}
						onKeyUp={handleInputEnter}
					/>
					<input
						type="text"
						className="inputBox"
						placeholder="USERNAME"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						onKeyUp={handleInputEnter}
					/>
					<div className="checkboxWrapper">
						<label>
							<input
								type="checkbox"
								checked={interviewer}
								onChange={handleInterviewer}
							/>
							I am Interviewer
						</label>

						<button
							className="btn joinBtn"
							onClick={joinRoom}
						>
							Join
						</button>
					</div>
					<span className="createInfo">
						If you don't have an invite then create &nbsp;
						<a
							onClick={createNewRoom}
							href=""
							className="createNewBtn"
						>
							new room
						</a>
					</span>
				</div>
				{error && <p className="error">{error}</p>}
			</div>
		</div>
	);
};

export default Home;
