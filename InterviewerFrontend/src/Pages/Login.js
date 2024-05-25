import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Font Awesome icons
import logo from '../Assets/applogo.png'; // Import the image
import { BASE_URL } from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post(`${BASE_URL}/interviewer/login`, {
        email,
        password,
      });
      
      // If the login is successful, navigate to the dashboard
      if (response.status === 200) {
        const interviewer_id = parseInt(response.data);
        localStorage.setItem("interviewer_id", interviewer_id)
        navigate('/dashboard');
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center">
          <h2 className="mt-10 text-4xl font-extrabold text-white">Welcome to</h2>
          <h2 className="mt-2 text-4xl font-extrabold text-green-500">CodeCraft</h2>
        </div>

        <div className="mt-10">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-center text-lg font-semibold text-white mb-4">
                Please Enter Details as an Interviewer
              </label>
              <div className="mt-2 flex items-center">
                
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='Enter Email ID'
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 text-black bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div>
              <div className="mt-2 flex items-center">
               
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 text-black bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
