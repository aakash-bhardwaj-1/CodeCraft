import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CandidateDashboard from "./pages/CandidateDashboard";
import ViewJobs from "./pages/ViewJobs";
import AppliedJobs from "./pages/AppliedJobs";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route index path="/" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
					<Route
						path="/candidate-dashboard"
						element={<CandidateDashboard />}
					/>
					<Route path="/view-jobs" element={<ViewJobs />} />
					<Route
						path="/applied-jobs"
						element={<AppliedJobs />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
