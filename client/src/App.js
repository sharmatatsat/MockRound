import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollegeSignupPage from './pages/CollegeSignupPage';
import CollegeLoginPage from './pages/CollegeLoginPage';
import CollegeProfilePage from './pages/CollegeProfile';
// import StudentSignupPage from './pages/StudentSingupPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentProfilePage from './pages/StudentProfile';
import AdminDashboard from './pages/AdminDashboard'; 
import StudentsPage from './pages/AdminStudent'; 
import CollegesPage from './pages/AdminCollege'; 
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminLogin from './pages/AdminLoginPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* College Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/college/login" element={<CollegeLoginPage/>} />
                <Route path="/college/profile" element={<CollegeProfilePage />} />

                {/* Student Routes */}
                {/* <Route path="/student/signup" element={<StudentSignupPage />} /> */}
                <Route path="/student/login" element={<StudentLoginPage />} />
                <Route path="/student/profile" element={<StudentProfilePage />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />

                 {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/students" element={<StudentsPage />} />
                <Route path="/admin/colleges" element={<CollegesPage />} />
            </Routes>
        </Router>
    ); 
}

export default App;
