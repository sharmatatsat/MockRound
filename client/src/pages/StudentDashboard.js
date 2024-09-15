import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUser, FaEnvelope, FaGraduationCap, FaBell, FaCalendar, FaPaperPlane, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [courses, setCourses] = useState([]); // For eligible colleges
  const [studentInfo, setStudentInfo] = useState({});
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Registration for next semester opens tomorrow' },
    { id: 2, message: 'New scholarship opportunities available' },
  ]);
  const [progressData, setProgressData] = useState([]); // For academic progress graph
  const navigate = useNavigate();

  const getAcademicStanding = (percentile) => {
    if (percentile >= 99) return 'Excellent';
    if (percentile >= 98) return 'Great';
    if (percentile >= 95) return 'Good';
    if (percentile >= 90) return 'Decent';
    if (percentile >= 75) return 'Average';
    return 'Poor';
  };

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
        console.log('Fetched student data:', data);
  
        const percentile = data.profile?.percentile;
        const creditsCompleted = data.profile?.creditsCompleted ? "Verified" : "Pending"; // Set dynamically
  
        // Set student info including percentile, academic standing, and verification status
        setStudentInfo({
          ...data.student,
          percentile: percentile || 'N/A',
          academicStanding: getAcademicStanding(percentile),
          creditsCompleted, // Use dynamic value
        });
  
        // TODO: Replace with actual fetch for courses and progress data
        setCourses([
          { id: 1, name: 'College A', seats: 10, ranking: 5, location: 'New York' },
          { id: 2, name: 'College B', seats: 15, ranking: 10, location: 'Los Angeles' },
        ]);
        setProgressData([
          { name: 'Semester 1', gpa: 3.5 },
          { name: 'Semester 2', gpa: 3.8 },
          { name: 'Semester 3', gpa: 3.9 },
        ]);
      } catch (error) {
        console.error('Error fetching student data:', error.message);
        navigate('/login'); // Redirect to login if there's an issue
      }
    };
  
    fetchStudentData();
  }, [navigate]);

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
        <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
        <p className="text-sm mb-1">Seats Remaining: {course.seats}</p>
        <p className="text-sm mb-1">Ranking: {course.ranking}</p>
        <p className="text-sm mb-1">Location: {course.location}</p>
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
                      <Line type="monotone" dataKey="gpa" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p>No academic progress data available.</p>
                )}
              </section>

              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-blue-500 text-white'}`}>
                    <FaBook className="mr-2" /> Edit Info
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
    </DndProvider>
  );
};

export default StudentDashboard;
