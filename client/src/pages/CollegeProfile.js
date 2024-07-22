import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollegeProfilePage.css';

const CollegeProfilePage = () => {
    const [college, setCollege] = useState({
        collegeName: '',
        address: '',
        coursesAvailable: '',
        cutOffSpotRound: '',
        casteCategoryCutOff: {
            ST: '',
            SC: '',
            OBC: '',
            General: ''
        },
        minStudentCriteria: '',
        maxCriteria: '',
        spotRoundDates: '',
        approvedBy: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['ST', 'SC', 'OBC', 'General'].includes(name)) {
            setCollege({
                ...college,
                casteCategoryCutOff: {
                    ...college.casteCategoryCutOff,
                    [name]: parseFloat(value) || 0
                }
            });
        } else {
            setCollege({ ...college, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:5000/api/colleges/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(college)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('College added:', data);
                navigate('/entries');
            } else {
                const errorData = await response.json();
                console.log('Failed to add college:', errorData);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="profile-container">
            <h1 style={{ textAlign: "center" }}>College Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <input type="text" name="collegeName" value={college.collegeName} onChange={handleChange} placeholder="College Name" required />
                <input type="text" name="address" value={college.address} onChange={handleChange} placeholder="Address" required />
                <input type="text" name="coursesAvailable" value={college.coursesAvailable} onChange={handleChange} placeholder="Courses Available" required />
                <input type="number" name="cutOffSpotRound" value={college.cutOffSpotRound} onChange={handleChange} placeholder="Cut-off Spot Round (%)" required />
                <input type="number" name="minStudentCriteria" value={college.minStudentCriteria} onChange={handleChange} placeholder="Minimum Student Criteria (%)" required />
                <input type="number" name="maxCriteria" value={college.maxCriteria} onChange={handleChange} placeholder="Max Criteria (%)" required />
                <input type="date" name="spotRoundDates" value={college.spotRoundDates} onChange={handleChange} placeholder="Spot Round Dates" required />
                <input type="number" name="ST" value={college.casteCategoryCutOff.ST} onChange={handleChange} placeholder="ST Cut-off (%)" required />
                <input type="number" name="SC" value={college.casteCategoryCutOff.SC} onChange={handleChange} placeholder="SC Cut-off (%)" required />
                <input type="number" name="OBC" value={college.casteCategoryCutOff.OBC} onChange={handleChange} placeholder="OBC Cut-off (%)" required />
                <input type="number" name="General" value={college.casteCategoryCutOff.General} onChange={handleChange} placeholder="General Cut-off (%)" required />
                <input type="text" name="approvedBy" value={college.approvedBy} onChange={handleChange} placeholder="Approved By (AICTE/UGC/NIRF)" required />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CollegeProfilePage;
