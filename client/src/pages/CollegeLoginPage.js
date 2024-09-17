import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email.trim(),
      password: password,
      name: name.trim(),
    };

    try {
      let url;
      let body;

      if (isLogin) {
        url = 'http://localhost:5000/api/auth/login';
        body = JSON.stringify({ email, password });
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        } else if (!acceptTerms) {
          setError('Please accept the terms and conditions');
          return;
        }
        url = 'http://localhost:5000/api/auth/signup';
        body = JSON.stringify(userData);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Received token:', data.token); // Debug line to check token value
        if (isLogin) {
          navigate(data.redirectPath); // Use navigate instead of window.location.href
        } else {
          alert('Signup successful! Please check your email for verification.');
          setIsLogin(true); // Switch back to login after signup
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || (isLogin ? 'Login failed' : 'Signup failed'));
      }
    } catch (error) {
      setError((isLogin ? 'Login failed: ' : 'Signup failed: ') + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? 'Login to vidyarthiMitra' : 'Join vidyarthiMitra'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )} */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 h-full"
            >
              {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )}
          {isLogin ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
                I accept the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
              </label>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{typeof error === 'object' ? JSON.stringify(error) : error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              {isLogin ? 'Create an account' : 'Already have an account? Sign In'}
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaFacebook className="h-5 w-5 text-blue-600" />
              <span className="ml-2">Facebook</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaGoogle className="h-5 w-5 text-red-600" />
              <span className="ml-2">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaLinkedin className="h-5 w-5 text-blue-700" />
              <span className="ml-2">LinkedIn</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPages;
