import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminCollege.css'; // Import the CSS file

const AdminCollege = () => {
    const [colleges, setColleges] = useState([]);
    const [error, setError] = useState(null);
    const [editingCollegeId, setEditingCollegeId] = useState(null);
    const [editedCollege, setEditedCollege] = useState({});

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

    const handleEdit = (college) => {
        setEditingCollegeId(college._id);
        setEditedCollege({ ...college });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCollege({ ...editedCollege, [name]: value });
    };

    const handleSave = async (collegeId) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/colleges/${collegeId}`, editedCollege);
            setColleges(colleges.map(college => (college._id === collegeId ? editedCollege : college)));
            setEditingCollegeId(null);
        } catch (err) {
            setError('Error saving college');
            console.error(err);
        }
    };

    const handleDelete = async (collegeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/colleges/${collegeId}`);
            setColleges(colleges.filter(college => college._id !== collegeId));
        } catch (err) {
            setError('Error deleting college');
            console.error(err);
        }
    };

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
                        <th className="th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {colleges.length > 0 ? (
                        colleges.map(college => (
                            <tr key={college._id}>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="collegeName" 
                                            value={editedCollege.collegeName || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.collegeName
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="state" 
                                            value={editedCollege.state || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.state
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="city" 
                                            value={editedCollege.city || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.city
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="address" 
                                            value={editedCollege.address || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.address
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="collegeCode" 
                                            value={editedCollege.collegeCode || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.collegeCode
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="branch" 
                                            value={editedCollege.branch || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.branch || 'N/A'
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="course" 
                                            value={editedCollege.course || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.course || 'N/A'
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="coursesAvailable" 
                                            value={editedCollege.coursesAvailable ? editedCollege.coursesAvailable.join(', ') : ''} 
                                            onChange={(e) => handleInputChange({target: {name: 'coursesAvailable', value: e.target.value.split(',')}})}
                                        />
                                    ) : (
                                        college.coursesAvailable?.join(', ') || 'N/A'
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        Object.keys(college.courseCutoffs || {}).map(key => (
                                            <div key={key}>
                                                {key}: 
                                                <input 
                                                    type="text" 
                                                    name={`courseCutoffs.${key}.General`} 
                                                    value={editedCollege.courseCutoffs && editedCollege.courseCutoffs[key] ? editedCollege.courseCutoffs[key].General : ''} 
                                                    onChange={(e) => handleInputChange({target: {name: `courseCutoffs.${key}.General`, value: e.target.value}})}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        Object.keys(college.courseCutoffs || {}).map(key => (
                                            <div key={key}>
                                                {key}: {college.courseCutoffs[key]?.General || 'N/A'}
                                            </div>
                                        ))
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="minStudentCriteria" 
                                            value={editedCollege.minStudentCriteria || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.minStudentCriteria
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="maxCriteria" 
                                            value={editedCollege.maxCriteria || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.maxCriteria
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="spotRoundDates" 
                                            value={editedCollege.spotRoundDates || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.spotRoundDates
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <input 
                                            type="text" 
                                            name="approvedBy" 
                                            value={editedCollege.approvedBy || ''} 
                                            onChange={handleInputChange} 
                                        />
                                    ) : (
                                        college.approvedBy
                                    )}
                                </td>
                                <td className="td">
                                    {editingCollegeId === college._id ? (
                                        <button 
                                            className="save-button" 
                                            onClick={() => handleSave(college._id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button 
                                            className="edit-button" 
                                            onClick={() => handleEdit(college)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(college._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="15" className="td">No colleges found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCollege;
