import React, { useState } from 'react';

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        phone: '',
        email: '',
        aadhar: '',
        marks: {
            tenth: '',
            twelfth: '',
            jee: '',
            neet: '',
            collegeExams: ''
        },
        entranceExam: '',
        caste: '',
        category: ''
    });

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
            const response = await fetch('http://localhost:5000/api/colleges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(profile)
            });
    
            if (response.ok) {
                const colleges = await response.json();
                console.log(colleges);
            } else {
                console.log('Error fetching colleges');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    
    return (
        <div className="profile-container">
            <form onSubmit={handleSubmit} className="profile-form">
                <h2>Student Profile</h2>
                <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" required />
                <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="aadhar" value={profile.aadhar} onChange={handleChange} placeholder="Aadhar" required />
                <input type="text" name="tenth" value={profile.marks.tenth} onChange={handleMarksChange} placeholder="10th Marks" required />
                <input type="text" name="twelfth" value={profile.marks.twelfth} onChange={handleMarksChange} placeholder="12th Marks" required />
                <input type="text" name="jee" value={profile.marks.jee} onChange={handleMarksChange} placeholder="JEE Marks" required />
                <input type="text" name="neet" value={profile.marks.neet} onChange={handleMarksChange} placeholder="NEET Marks" required />
                <input type="text" name="collegeExams" value={profile.marks.collegeExams} onChange={handleMarksChange} placeholder="College Exam Marks" required />
                <input type="text" name="entranceExam" value={profile.entranceExam} onChange={handleChange} placeholder="Entrance Exam" required />
                <input type="text" name="caste" value={profile.caste} onChange={handleChange} placeholder="Caste" required />
                <input type="text" name="category" value={profile.category} onChange={handleChange} placeholder="Category" required />
                <button type="submit">Find Colleges</button>
            </form>
        </div>
    );
};

export default StudentProfile;
