import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/login.png'; // Import the image
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
        localStorage.setItem("interviewer_id",interviewer_id)
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
        <img
          className="mx-auto h-10 w-auto"
          src={logo} // Use the imported image
          alt="CodeCraft"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>

        <div className="mt-10">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-green-500 hover:text-white">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
