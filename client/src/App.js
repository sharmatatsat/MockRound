import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollegeSignupPage from './pages/CollegeSignupPage';
import CollegeLoginPage from './pages/CollegeLoginPage';
import CollegeProfilePage from './pages/CollegeProfile';
import StudentSignupPage from './pages/StudentSingupPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentProfilePage from './pages/StudentProfile';

function App() {
    return (
        <Router>
            <Routes>
                {/* College Routes */}
                <Route path="/" element={<CollegeLoginPage />} />
                <Route path="/college/signup" element={<CollegeSignupPage />} />
                <Route path="/college/profile" element={<CollegeProfilePage />} />

                {/* Student Routes */}
                <Route path="/student/login" element={<StudentLoginPage />} />
                <Route path="/student/signup" element={<StudentSignupPage />} />
                <Route path="/student/profile" element={<StudentProfilePage />} />
            </Routes>
        </Router>
    ); 
}

export default App;
