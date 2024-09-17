import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaUniversity, FaChartBar, FaUserGraduate, FaSort, FaFilter, FaMoon, FaSun } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios'; // Import axios for API calls

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [students, setStudents] = useState([]); // State for students from the database

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    // Fetch student data from the backend API when the component loads
    const fetchStudents = async () => {
      try {
        const response = await axios.get(' http://localhost:5000/api/admin/profiles/all'); // Adjust the endpoint as per your backend
        setStudents(response.data); // Assuming response contains student data
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

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
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Course</th>
                    <th className="px-4 py-2 text-left">Percentile</th>
                    <th className="px-4 py-2 text-left">Entrance Exam Marksheet</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className={`${darkMode ? 'border-b border-gray-700' : 'border-b'}`}>
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.course}</td>
                      <td className="px-4 py-2">{student.percentile}</td>
                      <td className="px-4 py-2">
                        <a href={student.entranceExamMarksheet} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          View Marksheet
                        </a>
                      </td>
                      <td className="px-4 py-2">
                        <button className={`mr-2 px-3 py-1 rounded ${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}>Edit</button>
                        <button className={`px-3 py-1 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'colleges' && (
          <div className={`bg-white rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : ''}`}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaUniversity className="mr-2" /> College Management
            </h2>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <button className={`mr-2 p-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`} aria-label="Sort colleges">
                  <FaSort />
                </button>
                <button className={`p-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`} aria-label="Filter colleges">
                  <FaFilter />
                </button>
              </div>
              <button className={`px-4 py-2 rounded ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}>
                Add College
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <th className="px-4 py-2 text-left">College Name</th>
                    <th className="px-4 py-2 text-left">State</th>
                    <th className="px-4 py-2 text-left">City</th>
                    <th className="px-4 py-2 text-left">Number of Students</th>
                    <th className="px-4 py-2 text-left">Courses Offered</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collegeData.map((college) => (
                    <tr key={college.id} className={`${darkMode ? 'border-b border-gray-700' : 'border-b'}`}>
                      <td className="px-4 py-2">{college.name}</td>
                      <td className="px-4 py-2">{college.state}</td>
                      <td className="px-4 py-2">{college.city}</td>
                      <td className="px-4 py-2">{college.students}</td>
                      <td className="px-4 py-2">{college.courses.join(', ')}</td>
                      <td className="px-4 py-2">
                        <button className={`mr-2 px-3 py-1 rounded ${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}>Edit</button>
                        <button className={`px-3 py-1 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

