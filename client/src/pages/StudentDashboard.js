import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUser, FaEnvelope, FaGraduationCap, FaBell, FaCalendar, FaPaperPlane, FaBook,FaSun,FaMoon,FaFilter,} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const branches = [
  'Engineering & Technology',
  'Science',
  'Commerce',
  'Arts & Humanities',
  'Management',
  'Medicine & Health Sciences',
  'Law',
  'Design & Arts',
  'Architecture',
  'Agriculture',
  'Education',
  'Hospitality & Travel',
];

const subjects = {
  'Engineering & Technology': [
    'Computer Science Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics and Communication Engineering',
    'Information Technology',
    'Chemical Engineering',
    'Biotechnology',
  ],
  'Science': ['BSc Physics', 'BSc Chemistry', 'BSc Biology'],
  'Commerce': ['BCom General', 'BCom Accounting', 'BCom Finance'],
  'Arts & Humanities': [
    'BA English',
    'BA History',
    'BA Political Science',
    'BA Sociology',
    'BA Philosophy',
  ],
  'Management': [
    'BBA (Bachelor of Business Administration)',
    'BMS (Bachelor of Management Studies)',
    'BBM (Bachelor of Business Management)',
    'BCom in Management',
  ],
  'Medicine & Health Sciences': [
    'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    'BDS (Bachelor of Dental Surgery)',
    'BAMS (Bachelor of Ayurveda, Medicine, and Surgery)',
    'BHMS (Bachelor of Homeopathic Medicine and Surgery)',
    'BPT (Bachelor of Physiotherapy)',
  ],
  'Law': [
    'LLB (Bachelor of Laws)',
    'BA LLB (Integrated Program in Law)',
    'BBA LLB (Integrated Program in Law)',
    'LLM (Master of Laws)',
  ],
  'Design & Arts': ['BDes (Bachelor of Design)', 'BFA (Bachelor of Fine Arts)', 'BArch (Bachelor of Architecture)', 'BVA (Bachelor of Visual Arts)'],
  'Architecture': ['BArch (Bachelor of Architecture)', 'BPlan (Bachelor of Planning)'],
  'Agriculture': ['BSc Agriculture', 'BSc Horticulture', 'BSc Forestry', 'BSc Animal Husbandry'],
  'Education': ['BEd (Bachelor of Education)', 'BA BEd (Integrated Program in Education)', 'BSc BEd (Integrated Program in Education)'],
  'Hospitality & Travel': ['BHM (Bachelor of Hotel Management)', 'BTTM (Bachelor of Travel and Tourism Management)', 'BBA in Hospitality Management', 'BSc in Hospitality and Catering Management'],
};

const StudentDashboard = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [courses, setCourses] = useState([]); 
  const [studentInfo, setStudentInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedState, setSelectedState] = useState(''); 
  const [showFilter, setShowFilter] = useState(false);  
  const [selectedCollege, setSelectedCollege] = useState(''); 
  const [selectedCity, setSelectedCity] = useState('');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false); 
  const [spotRoundDate, setSpotRoundDate] = useState(''); 
 
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
        const phone = data.profile?.phone;
        const aadhar = data.profile?.aadhar;
        const branch = data.profile?.branch;
        const course = data.profile?.course;
        const verified = data.student?.verified;
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
        setCourseOptions(courses[branches] || []);
        setSelectedCourse(courses || ''); 
       
      
        setProgressData([
          { name: 'Assessment 1', percentile: 85 },
          { name: 'Assessment 2', percentile: 90 },
          { name: 'Assessment 3', percentile: 95 },
          { name: 'Current', percentile: percentile || 0 }, 
        ]);
  
    if(verified){
        if (percentile !== undefined) {
          const collegeResponse = await fetch('http://localhost:5000/api/colleges/entries');
          if (!collegeResponse.ok) {
            throw new Error('Failed to fetch college data');
          }
          const colleges = await collegeResponse.json();
  
          const eligibleColleges = colleges.filter(college => college.courseCutoffs <= percentile);
          setCourses(eligibleColleges);
        }
  }

      } catch (error) {
        console.error('Error fetching student data:', error.message);
        navigate('/student/login');
      }
    };


    fetchStudentData();
  }, [navigate]);

  const handleCollegeSelection = (e) => {
    const selected = e.target.value;
    setSelectedCollege(selected);
    const college = courses.find((course) => course.collegeName === selected);
    setSpotRoundDate(college ? college.spotRoundDates : 'No date available');
  };
  
  const applyStateAndCityFilter = async () => {
    try {
      const token = localStorage.getItem('token');
      
      let query = '';
      if (selectedState) {
        query += `state=${selectedState}`;
      }
      if (selectedCity) {
        if (query.length > 0) {
          query += '&';
        }
        query += `city=${selectedCity}`;
      }
      
      const response = await fetch(`http://localhost:5000/api/profile/filtercolleges?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch filtered colleges');
      }
  
      const data = await response.json();
      setCourses(data.colleges); 
    } catch (error) {
      console.error('Error fetching filtered colleges:', error.message);
    }
  };
  

  const handleEditStudent = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: studentInfo.name,
      email: studentInfo.email,
      phone: studentInfo.phone,
      aadhar: studentInfo.aadhar,
      branch: selectedBranch,
      course: selectedCourse,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/profile/save', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update student data');
      }

      const data = await response.json();
      setStudentInfo({
        ...studentInfo,
        ...updatedData,
      });
      closeModal();
      alert('Student information updated successfully!');
    } catch (error) {
      console.error('Error updating student data:', error.message);
      alert('Failed to update student data. Please try again.');
    }
  };

  
  const handleBranchChange = (e) => {
    const newBranch = e.target.value.trim(); 
  
    const normalizedBranch = Object.keys(subjects).find(
      (key) => key.toLowerCase() === newBranch.toLowerCase()
    );
  
    console.log("Normalized branch:", normalizedBranch); 
    const branchSubjects = subjects[normalizedBranch]; 
    console.log("Subjects for branch:", branchSubjects); 
  
    if (!branchSubjects) {
      console.warn(`No subjects found for branch: ${newBranch}`);
    }
  
    setSelectedBranch(newBranch);
    setCourseOptions(branchSubjects || []); 
    setSelectedCourse('');
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      branch: newBranch,
      course: '',
    }));
  };
  

  const handleSubjectChange = (e) => { 
    const newSubject = e.target.value; 
    console.log("Selected subject:", newSubject); 
  
    setSelectedCourse(newSubject); 
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      course: newSubject, 
    }));
  };

  const [appliedColleges, setAppliedColleges] = useState(() => {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    return applications
      .filter(app => app.email === studentInfo.email) 
      .map(app => app.appliedCollege);
  });
  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/student/login';
  };

  const handleApplyNow = (college) => {
    const studentName = studentInfo.name;
    const appliedCollege = college.collegeName;
    const email = studentInfo.email;
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    
    const alreadyApplied = applications.some(
      (application) => application.appliedCollege === appliedCollege && application.email === email
    );
  
    if (alreadyApplied) {
      alert(`You have already applied to ${appliedCollege}`);
      return;
    }
  
    applications.push({ studentName, appliedCollege, email });
  
    localStorage.setItem('applications', JSON.stringify(applications));
  
    alert(`You have successfully applied to ${appliedCollege}`);
  
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
    <p className="text-sm mb-1">Seats Available: {course.maxCriteria}</p>
    <p className="text-sm mb-1">Approved By: {course.approvedBy}</p>
    <button
  onClick={() => handleApplyNow(course)}
  className={`mt-4 py-2 px-2 rounded text-white ${
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
      <h1 className="text-2xl font-bold">{studentInfo.name}</h1>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleHighContrast}
          className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          {highContrast ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded-[5px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
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
                   <span>
  Verification : {studentInfo.creditsCompleted} 
  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 ml-2" />
</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <FaGraduationCap className="mr-2" />
                    <span>Academic Standing : {studentInfo.academicStanding}</span>
                  </div>
                </div>

              
              </section>

              <section className={`mb-8 p-6 rounded-lg ${highContrast ? 'bg-white text-black' : 'bg-white shadow-md'}`}>
  <h2 className="text-xl font-semibold mb-4">
    Eligible Colleges
    <button 
      className={`p-2 m-4 rounded ${highContrast ? 'bg-gray-200 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`} 
      onClick={() => setShowFilter(!showFilter)} 
      aria-label="Filter colleges">
      <FaFilter />
    </button>
  </h2>

  {/* State Dropdown for Filtering */}
  {showFilter && (
    <div className="my-4">
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)} 
        className="p-2 border rounded"
      >
        <option value="">Select State</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="karnataka">karnataka</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
      </select>
      <select
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)} 
      className="ml-4 p-2 border rounded"
    >
      <option value="">Select City</option>
      {selectedState === "Maharashtra" && (
        <>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Nagpur">Nagpur</option>
        </>
      )}
      {selectedState === "Karnataka" && (
        <>
          <option value="Bangalore">Bangalore</option>
          <option value="Mysore">Mysore</option>
          <option value="Mangalore">Mangalore</option>
        </>
      )}
      {selectedState === "Uttar Pradesh" && (
        <>
          <option value="Lucknow">Lucknow</option>
          <option value="Kanpur">Kanpur</option>
          <option value="Varanasi">Varanasi</option>
        </>
      )}
    </select>

      <button
        onClick={applyStateAndCityFilter}
        className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Filter
      </button>
    </div>
  )}

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
  {studentInfo.percentile ? (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={[{ name: 'Percentile', Percentile: studentInfo.percentile }]} // Data includes only percentile
      >
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
                  
                  {/* <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-green-500 text-white'}`}>
                    <FaPaperPlane className="mr-2" /> Submit
                  </button> */}
                  {/* <button className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-yellow-500 text-white'}`}>
                    <FaEnvelope className="mr-2" /> Status
                  </button> */}
                  <button
        className={`flex items-center justify-center p-2 rounded ${highContrast ? 'bg-black text-white' : 'bg-purple-500 text-white'}`}
        onClick={() => setShowCollegeDropdown(!showCollegeDropdown)} // Toggle dropdown visibility
      >
        <FaCalendar className="mr-2" /> Check Dates
      </button>

      {/* Dropdown to select eligible colleges */}
      {showCollegeDropdown && (
        <div className="my-4">
          <select
            value={selectedCollege}
            onChange={handleCollegeSelection}
            className="p-2 border rounded"
          >
            <option value="">Select College</option>
            {courses.map((college) => (
              <option key={college._id} value={college.collegeName}>
                {college.collegeName}
              </option>
            ))}
          </select>

          {/* Display the spot round date */}
          {selectedCollege && (
            <div className="mt-4 p-2 bg-gray-100 border rounded">
              <p>Spot Round Date: {spotRoundDate}</p>
            </div>
          )}
        </div>
      )}
                </div>
              </section>

            </div>
          </div>
        </main>

        <footer className={`py-4 ${highContrast ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}>
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 VidyarthiMitra.org. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Student Information</h2>
              <form onSubmit={handleEditStudent}>
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
  <label className="block mb-2">Subject</label>
  <select
    name="subjects" 
    value={selectedCourse || ''} 
    onChange={handleSubjectChange}
    className="border rounded w-full p-2"
  >
    <option value="">Select Course</option>
    {courseOptions.map((subject, index) => (
      <option key={index} value={subject}>
        {subject}
      </option>
    ))}
  </select>
          </div>

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