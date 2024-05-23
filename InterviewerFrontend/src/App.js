import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Jobform from "./Pages/Jobform.js";
import Layout from "./Pages/Layout.js";
import ViewPreviousJobs from "./Pages/ViewPreviousJobs.js";
import ViewActiveJobs from "./Pages/ViewActiveJobs.js";
import ViewEnrollments from "./Pages/ViewEnrollments.js";
import SeeResult from "./Pages/SeeResult.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Login />}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-job" element={<Jobform />} />
                <Route path="/active-jobs-view" element={<ViewEnrollments />} />
                <Route path="/view-more-prev" element={<ViewPreviousJobs/>} />
                <Route path="/view-more-open" element={<ViewActiveJobs/>} />
                <Route path="/view-result" element={<SeeResult/>} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}
