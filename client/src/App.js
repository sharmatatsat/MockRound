import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollegeSignupPage from './pages/CollegeSignupPage';
import CollegeLoginPage from './pages/CollegeLoginPage';
import CollegeProfilePage from './pages/CollegeProfile'; // Ensure this import is correct

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CollegeLoginPage />} />
                <Route path="/signup" element={<CollegeSignupPage />} />
                <Route path="/profile" element={<CollegeProfilePage />} /> {/* Redirect here after login */}
                {/* <Route path="/entries" element={<CollegeEntriesPage />} /> Example route for entries */}
            </Routes>
        </Router>
    );
}

export default App;
