import React, { useState, useEffect } from 'react';
import { states, cities, branches, courses } from '../data'; 

const CollegeProfilePage = () => {
  const [profile, setProfile] = useState({
    collegeName: '',
    state: '',
    city: '',
    address: '',
    collegeCode: '',
    branch: '',
    course: '',
    coursesAvailable: [],
    courseCutoffs: '',
    minStudentCriteria: '',
    maxCriteria: '',
    spotRoundDates: '',
    approvedBy: '',
  });

  const [errors, setErrors] = useState({});
  const [cityOptions, setCityOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);


  useEffect(() => {
    // Update city options based on selected state
    if (profile.state) {
      setCityOptions(cities[profile.state] || []);
    } else {
      setCityOptions([]);
    }
  }, [profile.state]);

  useEffect(() => {
    
    if (profile.branch) {
      setCourseOptions(courses[profile.branch] || []);
    } else {
      setCourseOptions([]);
    }
  }, [profile.branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAddCourse = () => {
    if (profile.course) {
      setAddedCourses([...addedCourses, profile.course]);
      setProfile({ ...profile, course: '' }); 
    }
  };

  const handleRemoveCourse = (course) => {
    setAddedCourses(addedCourses.filter((c) => c !== course));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
  
   
    const collegeData = {
      collegeName: profile.collegeName.trim(),
      state: profile.state.trim(),
      city: profile.city.trim(),
      address: profile.address.trim(),
      collegeCode: profile.collegeCode.trim(),
      branch: profile.branch.trim(),
      coursesAvailable: addedCourses, 
      courseCutoffs: Number(profile.courseCutoffs.trim()),
      minStudentCriteria: Number(profile.minStudentCriteria.trim()), 
      maxCriteria: Number(profile.maxCriteria.trim()), 
      spotRoundDates: profile.spotRoundDates.trim(),
      approvedBy: profile.approvedBy.trim(),
    };
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication token not found. Please log in.');
        return;
      }
  
      const response = await fetch('http://localhost:5000/api/colleges/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(collegeData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('College profile saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('An error occurred while saving the college profile');
    }
  };

  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-6 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">College Profile</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={profile.collegeName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.collegeName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="College Name"
            />
            {errors.collegeName && <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              id="state"
              name="state"
              value={profile.state}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              id="city"
              name="city"
              value={profile.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select City</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Address"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="collegeCode" className="block text-sm font-medium text-gray-700 mb-1">College Code</label>
            <input
              type="text"
              id="collegeCode"
              name="collegeCode"
              value={profile.collegeCode}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.collegeCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="College Code"
            />
            {errors.collegeCode && <p className="text-red-500 text-xs mt-1">{errors.collegeCode}</p>}
          </div>

          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
            <select
              id="branch"
              name="branch"
              value={profile.branch}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.branch ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select
              id="course"
              name="course"
              value={profile.course}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Course</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddCourse}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Course
            </button>
          </div>
              {/* Display added courses */}
              {addedCourses.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Added Courses</h3>
              <div className="space-y-2 mt-2">
                {addedCourses.map((course, index) => (
                  <div key={index} className="flex justify-between items-center bg-indigo-100 text-indigo-800 p-2 rounded-md shadow-sm">
                    <span>{course}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <label htmlFor="courseCutoffs" className="block text-sm font-medium text-gray-700 mb-1">Course Cutoffs</label>
            <input
              type="text"
              id="courseCutoffs"
              name="courseCutoffs"
              value={profile.courseCutoffs}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.courseCutoffs ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Course Cutoffs"
            />
            {errors.courseCutoffs && <p className="text-red-500 text-xs mt-1">{errors.courseCutoffs}</p>}
          </div>

          <div>
            <label htmlFor="minStudentCriteria" className="block text-sm font-medium text-gray-700 mb-1">Minimum Student Criteria</label>
            <input
              type="text"
              id="minStudentCriteria"
              name="minStudentCriteria"
              value={profile.minStudentCriteria}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.minStudentCriteria ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Minimum Student Criteria"
            />
            {errors.minStudentCriteria && <p className="text-red-500 text-xs mt-1">{errors.minStudentCriteria}</p>}
          </div>

          <div>
            <label htmlFor="maxCriteria" className="block text-sm font-medium text-gray-700 mb-1">Maximum Criteria</label>
            <input
              type="text"
              id="maxCriteria"
              name="maxCriteria"
              value={profile.maxCriteria}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.maxCriteria ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Maximum Criteria"
            />
            {errors.maxCriteria && <p className="text-red-500 text-xs mt-1">{errors.maxCriteria}</p>}
          </div>

          <div>
            <label htmlFor="spotRoundDates" className="block text-sm font-medium text-gray-700 mb-1">Spot Round Dates</label>
            <input
              type="date"
              id="spotRoundDates"
              name="spotRoundDates"
              value={profile.spotRoundDates}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.spotRoundDates ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.spotRoundDates && <p className="text-red-500 text-xs mt-1">{errors.spotRoundDates}</p>}
          </div>

          <div>
            <label htmlFor="approvedBy" className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
            <input
              type="text"
              id="approvedBy"
              name="approvedBy"
              value={profile.approvedBy}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${errors.approvedBy ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Approved By"
            />
            {errors.approvedBy && <p className="text-red-500 text-xs mt-1">{errors.approvedBy}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CollegeProfilePage;
