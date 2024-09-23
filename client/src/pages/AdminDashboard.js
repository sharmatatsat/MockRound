import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaUniversity, FaChartBar, FaUserGraduate, FaSort, FaFilter, FaMoon, FaSun, FaEdit,FaTrash } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios'; // Import axios for API calls

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [students, setStudents] = useState([]); // State for students from the database
  const [colleges, setColleges] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingCollege, setEditingCollege] = useState(null);
  const [applications, setApplications] = useState([]); 


  const toggleDarkMode = () => setDarkMode(!darkMode);

  


  useEffect(() => {
    // Fetch student data from the backend API when the component loads
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/profiles/all'); // Adjust the endpoint as per your backend
        setStudents(response.data); // Assuming response contains student data
        // return response.data;
      } catch (error) {
        console.error('Error fetching student data:', error);
        // return [];
      }
    };

    const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(storedApplications);

    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/colleges/attributes');
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching college data:', error);
      }
    };


    const fetchStudentData = async (studentId) => {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      if (!token) {
        console.error("Authentication token is missing.");
        return null;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/profile/student-data`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
  
        const data = await response.json(); // Return the logged-in student's data
        return data.student._id === studentId ? data : null; // Only return if it matches the studentId
      } catch (error) {
        console.error('Error fetching student data:', error.message);
        return null; // Return null in case of error
      }
    };
  
    


    fetchStudentData();
    fetchStudents();
    fetchColleges();
  }, []);
  

  const handleEditClick = (student) => {
    setEditingStudent(student); // Set the selected student to be edited
  };

  const handleDeleteClick = async (studentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/profiles/${studentId}`); // Adjust the endpoint
      setStudents(students.filter(student => student._id !== studentId)); // Update the state to remove the deleted student
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };


  const handleEdit = (colleges) => {
    setEditingCollege(colleges);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/colleges/${id}`);
      setColleges(colleges.filter(college => college._id !== id));
    } catch (error) {
      console.error('Error deleting college:', error);
    }
  };

  const handleSaveCollege = async () => {
    console.log('Editing College:', editingCollege); // Check this log to verify _id value
    if (!editingCollege || !editingCollege._id) {
      console.error('No college ID provided or editingCollege is missing');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/admin/colleges/${editingCollege._id}`, editingCollege); // Use _id here
      setColleges(colleges.map(college => college._id === editingCollege._id ? editingCollege : college)); // Update the college data in state
      setEditingCollege(null); // Reset editing state
    } catch (error) {
      console.error('Error saving college data:', error);
    }
  };
  

  const handleChangeCollege = (e) => {
    setEditingCollege({
      ...editingCollege,
      [e.target.name]: e.target.value,
    });
  };


  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/profiles/${editingStudent._id}`, editingStudent); // Adjust the endpoint
      setStudents(students.map(student => student._id === editingStudent._id ? editingStudent : student)); // Update the student data in state
      setEditingStudent(null); // Reset editing state
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };

  const handleChange = (e) => {
    setEditingStudent({
      ...editingStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerify = async (studentId) => {
    try {
      console.log('Verifying student ID:', studentId); // Log to check the studentId being passed
  
      // Make the API call to verify the student
      const response = await axios.put(`http://localhost:5000/api/admin/verify/${studentId}`);
  
      if (response.status === 200) {
        // Update the state to reflect the verification
        setStudents((prevStudents) =>
          prevStudents.map((profile) =>
            profile.student._id === studentId ? { ...profile, student: { ...profile.student, verified: true } } : profile
          )
        );
        console.log('Student verified successfully');
      } else {
        console.error('Failed to verify student. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error verifying student:', error.message); // Log the error
    }
  };



  
  const handleClear = (indexToDelete) => {
    const updatedApplications = applications.filter((_, index) => index !== indexToDelete);
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };


  const collegeData = [
    { id: 1, name: 'Tech University', students: 5000, courses: ['CS', 'IT', 'Engineering'] },
    { id: 2, name: 'Liberal Arts College', students: 3000, courses: ['Literature', 'History', 'Philosophy'] },
    { id: 3, name: 'Medical School', students: 2000, courses: ['Medicine', 'Nursing', 'Pharmacy'] },
  ];

  const chartData = {
    labels: collegeData.map(college => college.name),
    datasets: [
      {
        label: 'Number of Students',
        data: collegeData.map(college => college.students),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Enrollment by College',
      },
    },
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <nav className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setActiveSection('students')}
            className={`p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'}`}
            aria-label="Manage Student Information"
          >
            <FaGraduationCap className="text-4xl mb-2 mx-auto" />
            <span className="text-lg font-semibold">Manage Students</span>
          </button>
          <button
            onClick={() => setActiveSection('colleges')}
            className={`p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-400'}`}
            aria-label="Manage College Data"
          >
            <FaUniversity className="text-4xl mb-2 mx-auto" />
            <span className="text-lg font-semibold">Manage Colleges</span>
          </button>
        </div>

        {activeSection === 'students' && (
          <div className={`bg-white rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : ''}`}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaUserGraduate className="mr-2" /> Student Management
            </h2>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <button className={`mr-2 p-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`} aria-label="Sort students">
                  <FaSort />
                </button>
                <button className={`p-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`} aria-label="Filter students">
                  <FaFilter />
                </button>
              </div>
              <button className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
                Add Student
              </button>
            </div>
            <div className="overflow-x-auto">
  <table className="w-full table-auto">
    <thead>
      <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <th className="px-4 py-2 text-center">Name</th>
        <th className="px-4 py-2 text-center">Email</th>
        <th className="px-4 py-2 text-center">Course</th>
        <th className="px-4 py-2 text-center">Percentile</th>
        <th className="px-4 py-2 text-center">Entrance Exam Marksheet</th>
        <th className="px-4 py-2 text-center">Verification</th>
        <th className="px-4 py-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {students.map((profile) => (
        <tr key={profile._id} className={`${darkMode ? 'border-b border-gray-700' : 'border-b'}`}>
          <td className="px-4 py-2 text-center">{profile.student?.name}</td>
          <td className="px-4 py-2 text-center">{profile.student?.email}</td>
          <td className="px-4 py-2 text-center">{profile.course}</td>
          <td className="px-4 py-2 text-center">{profile.percentile}</td>
          <td className="px-4 py-2 text-center">
            <a href={profile.entranceExamMarksheet} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Marksheet
            </a>
          </td>
          <td className="px-4 py-2 text-center">
  {profile.student?.verified ? (
    <span className="text-green-500 font-semibold">Verified</span>
  ) : (
    <button
      className={`mr-2 px-3 py-1 rounded ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
      onClick={() => handleVerify(profile.student?._id)}
    >
      Verify
    </button>
  )}
</td>
          <td className="px-4 py-2 text-center">
            <button
              className={`mr-2 px-3 py-1 rounded ${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}
              onClick={() => handleEditClick(profile)}
            >
              Edit
            </button>
            <button
              className={`px-3 py-1 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
              onClick={() => handleDeleteClick(profile._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <br></br>

  <table className="w-full table-auto">
    <thead>
      <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <th className="px-4 py-2 text-center">Student Name</th>
        <th className="px-4 py-2 text-center">Email</th>
        <th className="px-4 py-2 text-center">Applied College</th>
        <th className="px-4 py-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {applications.length === 0 ? (
        <tr>
          <td colSpan="4" className="text-center p-4">No applications yet</td>
        </tr>
      ) : (
        applications.map((application, index) => (
          <tr key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <td className="px-4 py-2 text-center">{application.studentName}</td>
            <td className="px-4 py-2 text-center">{application.email}</td>
            <td className="px-4 py-2 text-center">{application.appliedCollege}</td>
            <td className="px-4 py-2 text-center">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleClear(index)}
              >
                Clear
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

            
          </div>
        )}

        {activeSection === 'colleges' && (
        <div className={`bg-white rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : ''}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaUniversity className="mr-2" /> College Data
          </h2>
          <div className="overflow-x-auto">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">College List</h3>
            <table className="w-full table-auto">
              <thead>
                <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <th className="px-4 py-2 text-left">College Name</th>
                  <th className="px-4 py-2 text-left">State</th>
                  <th className="px-4 py-2 text-left">City</th>
                  <th className="px-4 py-2 text-left">Courses</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr key={college._id} className={`${darkMode ? 'border-b border-gray-700' : 'border-b'}`}>
                    <td className="px-4 py-2">{college.collegeName}</td>
                    <td className="px-4 py-2">{college.state}</td>
                    <td className="px-4 py-2">{college.city}</td>
                    <td className="px-4 py-2">
                      {(college.coursesAvailable || []).join(', ')}
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(college)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(college._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Render the Edit Modal or Form */}
      {editingCollege && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit College</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">College Name:</label>
                <input
                  type="text"
                  name="collegeName"
                  value={editingCollege.collegeName}
                  onChange={handleChangeCollege}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">State:</label>
                <input
                  type="text"
                  name="state"
                  value={editingCollege.state}
                  onChange={handleChangeCollege}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">City:</label>
                <input
                  type="text"
                  name="city"
                  value={editingCollege.city}
                  onChange={handleChangeCollege}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Courses:</label>
                <input
                  type="text"
                  name="coursesAvailable"
                  value={(editingCollege.coursesAvailable || []).join(', ')}
                  onChange={(e) => handleChangeCollege({
                    target: {
                      name: 'coursesAvailable',
                      value: e.target.value.split(',').map(course => course.trim())
                    }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSaveCollege}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCollege(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        {editingStudent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingStudent.student?.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editingStudent.student?.email || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={editingStudent.course || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Percentile</label>
                  <input
                    type="number"
                    name="percentile"
                    value={editingStudent.percentile || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                    onClick={() => setEditingStudent(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
