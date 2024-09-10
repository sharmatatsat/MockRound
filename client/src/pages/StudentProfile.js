import React, { useState } from 'react';
import { FiPhone, FiFileText, FiUpload } from 'react-icons/fi';
import { IoMdSchool } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    phone: '',
    email: '',
    aadhar: '',
    marks: {
      tenth: '',
      twelfth: '',
    },
    percentile: '',
    caste: '',
    tenthMarksheet: null,
    twelfthMarksheet: null,
    entranceExamMarksheet: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    validateField(name, value);
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      marks: {
        ...profile.marks,
        [name]: value,
      },
    });
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfile({ ...profile, [name]: files[0] });
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'phone':
        error = /^\+?[1-9]\d{1,14}$/.test(value) ? '' : 'Invalid phone number';
        break;
      case 'email':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        break;
      case 'aadhar':
        error = /^[0-9]{12}$/.test(value) ? '' : 'Aadhar number must be 12 digits';
        break;
      case 'tenth':
      case 'twelfth':
        error = (value >= 0 && value <= 100) ? '' : 'Marks must be between 0 and 100';
        break;
      case 'percentile':
        error = (value >= 0 && value <= 100) ? '' : 'Percentile must be between 0 and 100';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform final validation and submit logic here
    console.log('Profile submitted:', profile);

    // Redirect to the StudentDashboard page after successful submission
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-6 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Student Profile</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <FiPhone className="absolute top-3 left-3 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="+91 1234567890"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div> */}

          <div>
            <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
            <div className="relative">
              <FiFileText className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                id="aadhar"
                name="aadhar"
                value={profile.aadhar}
                onChange={handleChange}
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.aadhar ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="123456789012"
              />
            </div>
            {errors.aadhar && <p className="text-red-500 text-xs mt-1">{errors.aadhar}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tenth" className="block text-sm font-medium text-gray-700 mb-1">10th Grade Marks (%)</label>
              <div className="relative">
                <IoMdSchool className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="number"
                  id="tenth"
                  name="tenth"
                  value={profile.marks.tenth}
                  onChange={handleMarksChange}
                  className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.tenth ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="85"
                  min="0"
                  max="100"
                />
              </div>
              {errors.tenth && <p className="text-red-500 text-xs mt-1">{errors.tenth}</p>}
            </div>

            <div>
              <label htmlFor="tenthMarksheet" className="block text-sm font-medium text-gray-700 mb-1">Upload 10th Marksheet</label>
              <div className="relative">
                <FiUpload className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  id="tenthMarksheet"
                  name="tenthMarksheet"
                  onChange={handleFileChange}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="twelfth" className="block text-sm font-medium text-gray-700 mb-1">12th Grade Marks (%)</label>
              <div className="relative">
                <IoMdSchool className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="number"
                  id="twelfth"
                  name="twelfth"
                  value={profile.marks.twelfth}
                  onChange={handleMarksChange}
                  className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.twelfth ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="90"
                  min="0"
                  max="100"
                />
              </div>
              {errors.twelfth && <p className="text-red-500 text-xs mt-1">{errors.twelfth}</p>}
            </div>

            <div>
              <label htmlFor="twelfthMarksheet" className="block text-sm font-medium text-gray-700 mb-1">Upload 12th Marksheet</label>
              <div className="relative">
                <FiUpload className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  id="twelfthMarksheet"
                  name="twelfthMarksheet"
                  onChange={handleFileChange}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="entranceExamMarksheet" className="block text-sm font-medium text-gray-700 mb-1">Upload Entrance Exam Marksheet</label>
            <div className="relative">
              <FiUpload className="absolute top-3 left-3 text-gray-400" />
              <input
                type="file"
                id="entranceExamMarksheet"
                name="entranceExamMarksheet"
                onChange={handleFileChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="percentile" className="block text-sm font-medium text-gray-700 mb-1">Percentile</label>
            <div className="relative">
              <IoMdSchool className="absolute top-3 left-3 text-gray-400" />
              <input
                type="number"
                id="percentile"
                name="percentile"
                value={profile.percentile}
                onChange={handleChange}
                className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.percentile ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="95"
                min="0"
                max="100"
              />
            </div>
            {errors.percentile && <p className="text-red-500 text-xs mt-1">{errors.percentile}</p>}
          </div>

          {/* <div>
            <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-1">Caste Category</label>
            <select
              id="caste"
              name="caste"
              value={profile.caste}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Caste</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div> */}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
