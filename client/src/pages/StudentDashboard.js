import React, { useState, useEffect } from 'react';
import editModal from '../components/EditModal.js';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUser, FaEnvelope, FaGraduationCap, FaBell, FaCalendar, FaPaperPlane, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {branches,courses} from '../data.js';

const StudentDashboard = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [courses, setCourses] = useState([]); // For eligible colleges
  const [studentInfo, setStudentInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(studentInfo.branch || '');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  // const [appliedColleges, setAppliedColleges] = useState([]);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Registration for next semester opens tomorrow' },
    { id: 2, message: 'New scholarship opportunities available' },

  ]);
  // const [availableCourses, setAvailableCourses] = useState([]); 
  const navigate = useNavigate();
  
 
  const getAcademicStanding = (percentile) => {
    if (percentile >= 99) return 'Excellent';
    if (percentile >= 98) return 'Great';
    if (percentile >= 95) return 'Good';
    if (percentile >= 90) return 'Decent';
    if (percentile >= 75) return 'Average';
    return 'Poor';
  };
  const [progressData, setProgressData] = useState([]);

  
  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await fetch('http://localhost:5000/api/profile/student-data', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch student data');
        }
  
        const data = await response.json();
        const percentile = data.profile?.percentile;
        // const creditsCompleted = data.profile?.creditsCompleted ? "Verified" : "Pending";
        const phone = data.profile?.phone;
        const aadhar = data.profile?.aadhar;
        const branch = data.profile?.branch;
        const course = data.profile?.course;
        const verified = data.student?.verified; // Fetch the verified status from student data
      
      // Set creditsCompleted based on the verified status
      const creditsCompleted = verified ? "Verified" : "Pending"; 
        
        
        
        
          setStudentInfo({
          ...data.student,
          percentile: percentile || 'N/A',
          academicStanding: getAcademicStanding(percentile),
          creditsCompleted,
          phone: phone || '',  
          aadhar: aadhar || '',
          branch: branch || '', 
          course: course || '' 
        });
        setSelectedBranch(branch || ''); // Set the initial selected branch
        setCourseOptions(course[branches] || []);
        setSelectedCourse(course || ''); 
       
      
        setProgressData([
          { name: 'Assessment 1', percentile: 85 },
          { name: 'Assessment 2', percentile: 90 },
          { name: 'Assessment 3', percentile: 95 },
          { name: 'Current', percentile: percentile || 0 }, // Ensure percentile is a number
        ]);
  
        // Fetch eligible colleges
        if (percentile !== undefined) {
          const collegeResponse = await fetch('http://localhost:5000/api/colleges/entries');
          if (!collegeResponse.ok) {
            throw new Error('Failed to fetch college data');
          }
          const colleges = await collegeResponse.json();
  
          const eligibleColleges = colleges.filter(college => college.courseCutoffs <= percentile);
          setCourses(eligibleColleges);
        }
      } catch (error) {
        console.error('Error fetching student data:', error.message);
        navigate('/student/login');
      }
    };

    
  
    fetchStudentData();
  }, [navigate]);
  
  
  const handleBranchChange = (e) => {
    const newBranch = e.target.value;
    console.log("New branch selected:", newBranch); // Check value here

    // Test with hardcoded value
    const testBranch = 'Science'; // Use a hardcoded branch for testing
    console.log("Available courses for branch:", courses[testBranch]); // Should log the courses for Science

    setSelectedBranch(newBranch);
    setCourseOptions(courses[newBranch] || []); 
    setSelectedCourse('');
    setStudentInfo((prevInfo) => ({
        ...prevInfo,
        branch: newBranch,
        course: ''  
    }));
};
  const handleCourseChange = (e) => {
    const newCourse = e.target.value;
    console.log("Selected course:", newCourse);
    setSelectedCourse(newCourse);
  
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      course: newCourse
    }));
  };


  const [appliedColleges, setAppliedColleges] = useState(() => {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    // Filter applications based on the current user's email
    return applications
      .filter(app => app.email === studentInfo.email) // Use the logged-in user's email
      .map(app => app.appliedCollege);
  });

  const handleApplyNow = (college) => {
    const studentName = studentInfo.name;
    const appliedCollege = college.collegeName;
    const email = studentInfo.email;
  
    // Get the current applications from localStorage
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
  
    // Check if the student has already applied to this college
    const alreadyApplied = applications.some(
      (application) => application.appliedCollege === appliedCollege && application.email === email
    );
  
    if (alreadyApplied) {
      alert(`You have already applied to ${appliedCollege}`);
      return;
    }
  
    // Add the new application
    applications.push({ studentName, appliedCollege, email });
  
    // Store the updated applications back to localStorage
    localStorage.setItem('applications', JSON.stringify(applications));
  
    alert(`You have successfully applied to ${appliedCollege}`);
  
    // Update the applied colleges state
    setAppliedColleges((prev) => [...prev, appliedCollege]);
  };
  

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCourse = courses[dragIndex]; 
    const newCourses = [...courses];
    newCourses.splice(dragIndex, 1);
    newCourses.splice(hoverIndex, 0, draggedCourse);
    setCourses(newCourses);
  };

  const CourseCard = ({ course, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'course',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: 'course',
      hover: (item) => {
        if (item.index !== index) {
          moveCard(item.index, index);
          item.index = index;
        }
      },
    });
  
    return (
      <div
    ref={(node) => drag(drop(node))}
    className={`p-4 mb-4 rounded-lg shadow-md ${highContrast ? 'bg-black text-white' : 'bg-white'} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
  >
    <h3 className="text-lg font-semibold mb-2">{course.collegeName}</h3>
    <p className="text-sm mb-1">State: {course.state}</p>
    <p className="text-sm mb-1">City: {course.city}</p>
    {/* <p className="text-sm mb-1">Course: {course.course}</p> */}
    <p className="text-sm mb-1">Seats Available: {course.maxCriteria}</p>
    <p className="text-sm mb-1">Approved By: {course.approvedBy}</p>
    <button
  onClick={() => handleApplyNow(course)}
  className={`mt-4 py-2 px-4 rounded text-white ${
    appliedColleges.includes(course.collegeName)
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-blue-500 hover:bg-blue-600'
  }`}
  disabled={appliedColleges.includes(course.collegeName)}
>
  {appliedColleges.includes(course.collegeName) ? 'Applied' : 'Apply Now'}
</button>
  </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-gray-100'}`}>
        <header className={`py-4 ${highContrast ? 'bg-white text-black' : 'bg-blue-600 text-white'}`}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <button
              onClick={toggleHighContrast}
              className={`px-4 py-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              Toggle High Contrast
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Student Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{studentInfo.name}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2" />
                    <span>{studentInfo.email}</span>
                  </div>
                <div className="flex items-center">
                    <FaGraduationCap className="mr-2" />
                    <span>Percentile : {studentInfo.percentile}</span>
                  </div>
                  <div className="flex items-center">
                   <FaBook className="mr-2" />
                  <span>Verification: {studentInfo.creditsCompleted}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <FaGraduationCap className="mr-2" />
                    <span>Academic Standing : {studentInfo.academicStanding}</span>
                  </div>
                </div>

              
              </section>

              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Eligible Colleges</h2>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                  ))
                ) : (
                  <p>No eligible colleges available.</p>
                )}
              </section>
            </div>

            <div>
              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center mb-2">
                    <FaBell className="mr-2 text-yellow-500" />
                    <span>{notification.message}</span>
                  </div>
                ))}
              </section>

              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Academic Progress</h2>
                {progressData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Percentile" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p>No academic progress data available.</p>
                )}
              </section>

              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                <button
            className="flex items-center justify-center p-2 rounded bg-blue-500 text-white"
            onClick={openModal}
          > Edit Info
                  </button>
                  
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-green-500 text-white'}`}>
                    <FaPaperPlane className="mr-2" /> Submit
                  </button>
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-yellow-500 text-white'}`}>
                    <FaEnvelope className="mr-2" /> Email College
                  </button>
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-purple-500 text-white'}`}>
                    <FaCalendar className="mr-2" /> Check Dates
                  </button>
                </div>
              </section>

            </div>
          </div>
        </main>

        <footer className={`py-4 ${highContrast ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}>
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 University Name. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Student Information</h2>
              <form>
                <label className="block mb-2">
                  Name:
                  <input type="text" defaultValue={studentInfo.name} className="border rounded p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Email:
                  <input type="email" defaultValue={studentInfo.email} className="border rounded p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Percentile:
                  <input type="number" defaultValue={studentInfo.percentile} className="border rounded p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Phone:
                  <input type="number" defaultValue={studentInfo.phone} className="border rounded p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Aadhar:
                  <input type="number" defaultValue={studentInfo.aadhar} className="border rounded p-2 w-full" />
                </label>
                <label className="block mb-2">
          Branch:
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </label>
        <div className="mb-4">
            <label className="block mb-2">Course</label>
            <select
              name="course"
              value={selectedCourse|| ''}
              onChange={handleCourseChange}
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

                {/* Add more fields as needed */}
                <div className="flex justify-end mt-4">
                  <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </DndProvider>
  );
};

export default StudentDashboard;