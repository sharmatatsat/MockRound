// http://localhost:5000
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminCollege.css'; // Import the CSS file

const AdminCollege = () => {
    const [colleges, setColleges] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/colleges'); 
                setColleges(response.data);
            } catch (err) {
                setError('Error fetching colleges');
                console.error(err);
            }
        };

        fetchColleges();
    }, []);

    return (
        <div className="table-container">
            <h1>Colleges</h1>
            {error && <p className="error-message">{error}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">College Name</th>
                        <th className="th">State</th>
                        <th className="th">City</th>
                        <th className="th">Address</th>
                        <th className="th">College Code</th>
                        <th className="th">Branch</th>
                        <th className="th">Course</th>
                        <th className="th">Courses Available</th>
                        <th className="th">Course Cutoffs</th>
                        <th className="th">Minimum Criteria</th>
                        <th className="th">Maximum Criteria</th>
                        <th className="th">Spot Round Dates</th>
                        <th className="th">Approved By</th>
                    </tr>
                </thead>
                <tbody>
                    {colleges.length > 0 ? (
                        colleges.map(college => (
                            <tr key={college._id}>
                                <td className="td">{college.collegeName}</td>
                                <td className="td">{college.state}</td>
                                <td className="td">{college.city}</td>
                                <td className="td">{college.address}</td>
                                <td className="td">{college.collegeCode}</td>
                                <td className="td">{college.branch || 'N/A'}</td>
                                <td className="td">{college.course || 'N/A'}</td>
                                <td className="td">{college.coursesAvailable.join(', ')}</td>
                                <td className="td">
                                    {college.courseCutoffs ? (
                                        Object.keys(college.courseCutoffs).map(key => (
                                            <div key={key}>
                                                {key}: {college.courseCutoffs[key].General}
                                            </div>
                                        ))
                                    ) : (
                                        'No cutoffs available'
                                    )}
                                </td>
                                <td className="td">{college.minStudentCriteria}</td>
                                <td className="td">{college.maxCriteria}</td>
                                <td className="td">{college.spotRoundDates}</td>
                                <td className="td">{college.approvedBy}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13" className="td">No colleges found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCollege;
