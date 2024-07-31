import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollegeSignupPage from './pages/CollegeSignupPage';
import CollegeLoginPage from './pages/CollegeLoginPage';
import CollegeProfilePage from './pages/CollegeProfile';
import StudentSignupPage from './pages/StudentSingupPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentProfilePage from './pages/StudentProfile';
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard
import StudentsPage from './pages/AdminStudent'; // Import Students Page for Admin
import CollegesPage from './pages/AdminCollege'; // Import Colleges Page for Admin


function App() {
    return (
        <Router>
            <Routes>
                {/* College Routes */}
                <Route path="/" element={<CollegeLoginPage />} />
                <Route path="/signup" element={<CollegeSignupPage />} />
                <Route path="/profile" element={<CollegeProfilePage />} />

                {/* Student Routes */}
                <Route path="/student/login" element={<StudentLoginPage />} />
                <Route path="/student/signup" element={<StudentSignupPage />} />
                <Route path="/student/profile" element={<StudentProfilePage />} />

                 {/* Admin Routes */}
                 <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/students" element={<StudentsPage />} />
                <Route path="/admin/colleges" element={<CollegesPage />} />
            </Routes>
        </Router>
    ); 
}

export default App;
