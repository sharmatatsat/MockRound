import React, { useState, useEffect } from 'react';
import { branches, courses } from '../data';

const EditStudentModal = ({ isOpen, onClose, studentInfo, updateStudentInfo }) => {
  const [formData, setFormData] = useState(studentInfo);
  const [selectedBranch, setSelectedBranch] = useState(studentInfo.branch || '');
  const [courseOptions, setCourseOptions] = useState(courses[studentInfo.branch] || []);

  // Sync formData with studentInfo whenever studentInfo changes
  useEffect(() => {
    if (studentInfo) {
      setFormData(studentInfo);
      setSelectedBranch(studentInfo.branch || '');
      setCourseOptions(courses[studentInfo.branch] || []);
    }
  }, [studentInfo]);

  const handleBranchChange = (e) => {
    const newBranch = e.target.value;
    
    // Fetch courses based on the selected branch
    const newCourseOptions = courses[newBranch] || [];
    
    setSelectedBranch(newBranch);
    setCourseOptions(newCourseOptions);
    
    // Clear course selection when branch changes
    setFormData((prevData) => ({ 
        ...prevData, 
        branch: newBranch, 
        course: '' 
    }));
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudentInfo(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Student Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Percentile</label>
            <input
              type="number"
              name="percentile"
              value={formData.percentile || ''}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Aadhar</label>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar || ''}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
    <label className="block mb-2">Branch</label>
    <select
      name="branch"
      value={selectedBranch}  // Correct value binding
      onChange={handleBranchChange}
      className="border rounded w-full p-2"
    >
      <option value="">Select Branch</option>
      {branches.map((branch, index) => (
        <option key={index} value={branch}>
          {branch}
        </option>
      ))}
    </select>
</div>

{/* Course Dropdown */}
<div className="mb-4">
    <label className="block mb-2">Course</label>
    <select
      name="course"
      value={formData.course || ''}  // Correct value binding
      onChange={handleChange}
      className="border rounded w-full p-2"
    >
      <option value="">Select Course</option>
      {courseOptions.map((course, index) => (
        <option key={index} value={course}>
          {course}
        </option>
      ))}
    </select>
</div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onClose} className="ml-4 bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
