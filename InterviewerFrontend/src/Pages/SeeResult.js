import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';

const SeeResult = () => {
    const location = useLocation();
    const [results, setResults] = useState({ positiveFeedback: '', negativeFeedback: '' });

    useEffect(() => {
        const fetchData = async () => {
            const { enrollId } = location.state || {};
            console.log(enrollId);
            const response = await axios.get(`${BASE_URL}/interviewer/result/${enrollId}`);
            setResults(response.data);
        }
        fetchData();
    }, [location.state]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 grid grid-rows-[auto,1fr] p-3 bg-gray-800">
                <div className="flex flex-col items-center justify-center h-full space-y-8 overflow-auto">
                    <div className="w-full flex-1 flex flex-col items-center">
                        <h3 className="text-2xl text-white mb-6 text-center">Positive Feedback</h3>
                        <div className="w-full h-28 max-w-2xl p-6 bg-gray-900 text-white rounded-lg shadow-lg overflow-auto">
                            <p>{results.positiveFeedback}</p>
                        </div>
                    </div>
                    <div className="w-full flex-1 flex flex-col items-center">
                        <h3 className="text-2xl text-white mb-6 text-center">Negative Feedback</h3>
                        <div className="w-full h-28 max-w-2xl p-6 bg-gray-900 text-white rounded-lg shadow-lg overflow-auto">
                            <p>{results.negativeFeedback}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeeResult;

