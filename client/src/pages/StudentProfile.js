import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        phone: '',
        email: '',
        aadhar: '',
        marks: {
            tenth: '',
            twelfth: '',
        },
        entranceExam: 'JEE',
        percentile: '',
        caste: ''
    });
    
    const [colleges, setColleges] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleMarksChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            marks: {
                ...profile.marks,
                [name]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/collegess/find', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    percentile: profile.percentile,
                    caste: profile.caste
                })
            });

            if (response.ok) {
                const collegesData = await response.json();
                setColleges(collegesData);
                console.log('Colleges found:', collegesData);
            } else {
                console.log('Error fetching colleges');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="profile-container" style={{marginTop : "20px"}}>
            <form onSubmit={handleSubmit} className="profile-form">
                <h2 style={{textAlign : "center"}}>Student Profile</h2>
                <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
                <input type="tel" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" required />
                <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="aadhar" value={profile.aadhar} onChange={handleChange} placeholder="Aadhar" required />
                <input type="number" step="0.01" name="tenth" value={profile.marks.tenth} onChange={handleMarksChange} placeholder="10th Marks (%)" required />
                <input type="number" step="0.01" name="twelfth" value={profile.marks.twelfth} onChange={handleMarksChange} placeholder="12th Marks (%)" required />
                <select name="entranceExam" value={profile.entranceExam} onChange={handleChange} required>
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                </select>
                <input type="number" step="0.01" name="percentile" value={profile.percentile} onChange={handleChange} placeholder="Percentile" required />
                <select name="caste" value={profile.caste} onChange={handleChange} required>
                    <option value="" disabled>Select Caste</option>
                    <option value="ST">ST</option>
                    <option value="SC">SC</option>
                    <option value="OBC">OBC</option>
                    <option value="General">General</option>
                </select>
                <button type="submit">Find Colleges</button>
            </form>
            {colleges.length > 0 && (
    <div className="colleges-list">
        <h2>Colleges Found :</h2>
        <ul>
            {colleges.map((college, index) => (
                <li key={index}>
                    <h3>{college.collegeName}</h3>
                    <p>Address: {college.address}</p>
                    <p>Courses Available: {college.coursesAvailable.join(', ')}</p>
                    <p>Cut-off Spot Round: {college.spotRoundDates}</p>
                    {college.casteCategoryCutOff && (
                        <>
                            <p>ST Cut-off: {college.casteCategoryCutOff.ST}%</p>
                            <p>SC Cut-off: {college.casteCategoryCutOff.SC}%</p>
                            <p>OBC Cut-off: {college.casteCategoryCutOff.OBC}%</p>
                            <p>General Cut-off: {college.casteCategoryCutOff.General}%</p>
                        </>
                    )}
                    <p>Minimum Student Criteria: {college.minStudentCriteria}%</p>
                    <p>Max Criteria: {college.maxCriteria}%</p>
                    <p>Spot Round Dates: {college.spotRoundDates}</p>
                    <p>Approved By: {college.approvedBy}</p>
                </li>
            ))}
        </ul>
    </div>
)}

        </div>
    );
};

export default StudentProfile;
