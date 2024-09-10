import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaGraduationCap, FaBook, FaBell, FaCalendar, FaPaperPlane, FaClock } from 'react-icons/fa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentDashboard = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics 101', professor: 'Dr. Smith', grade: 'A', nextAssignment: 'Calculus Quiz', nextExam: 'Midterm Exam' },
    { id: 2, name: 'Computer Science 202', professor: 'Prof. Johnson', grade: 'B+', nextAssignment: 'Programming Project', nextExam: 'Final Exam' },
    { id: 3, name: 'Physics 301', professor: 'Dr. Brown', grade: 'A-', nextAssignment: 'Lab Report', nextExam: 'Quiz 3' },
  ]);

  const studentInfo = {
    name: 'John Doe',
    email: 'john.doe@university.edu',
    gpa: 3.8,
    creditsCompleted: 90,
    academicStanding: 'Good Standing',
  };

  const notifications = [
    { id: 1, message: 'Registration for next semester opens tomorrow' },
    { id: 2, message: 'New scholarship opportunities available' },
  ];

  const progressData = [
    { name: 'Fall 2022', gpa: 3.6 },
    { name: 'Spring 2023', gpa: 3.8 },
    { name: 'Fall 2023', gpa: 3.9 },
  ];

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
      hover: (item, monitor) => {
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
        <p className="text-sm mb-1">Professor: {course.professor}</p>
        <p className="text-sm mb-1">Grade: {course.grade}</p>
        <p className="text-sm mb-1">Next Assignment: {course.nextAssignment}</p>
        <p className="text-sm">Next Exam: {course.nextExam}</p>
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
                    <span>GPA: {studentInfo.gpa}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBook className="mr-2" />
                    <span>Credits: {studentInfo.creditsCompleted}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <FaGraduationCap className="mr-2" />
                    <span>Academic Standing: {studentInfo.academicStanding}</span>
                  </div>
                </div>
              </section>

              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
                {courses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
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
              </section>

              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-blue-500 text-white'}`}>
                    <FaBook className="mr-2" /> Course Materials
                  </button>
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-green-500 text-white'}`}>
                    <FaPaperPlane className="mr-2" /> Submit Assignment
                  </button>
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-yellow-500 text-white'}`}>
                    <FaEnvelope className="mr-2" /> Email Professor
                  </button>
                  <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-purple-500 text-white'}`}>
                    <FaCalendar className="mr-2" /> Schedule Appointment
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>

        <footer className={`py-4 ${highContrast ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}>
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 University Name. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </DndProvider>
  );
};

export default StudentDashboard;