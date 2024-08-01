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
        tenthMarksheet: '',
        twelfthMarksheet: '',
        entranceExam: 'JEE',
        entranceExamMarksheet: '',
        percentile: '',
        caste: ''
    });

    const [colleges, setColleges] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];
            const fileName = file.name;
            setProfile(prevProfile => ({
                ...prevProfile,
                [name]: fileName // Store the file name or path
            }));
        } else {
            let errorMsg = '';
            switch (name) {
                case 'phone':
                    if (!/^\d{10}$/.test(value)) errorMsg = 'Phone must be a 10-digit number';
                    break;
                case 'email':
                    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) errorMsg = 'Invalid email address';
                    break;
                case 'aadhar':
                    if (!/^\d{12}$/.test(value)) errorMsg = 'Aadhar must be a 12-digit number';
                    break;
                case 'tenth':
                case 'twelfth':
                case 'percentile':
                    if (value < 0 || value > 100) errorMsg = 'Marks/Percentile must be between 0 and 100';
                    break;
                default:
                    break;
            }

            setProfile(prevProfile => ({
                ...prevProfile,
                [name]: value
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: errorMsg
            }));
        }
    };

    const handleMarksChange = (e) => {
        const { name, value } = e.target;

        let errorMsg = '';
        if (value < 0 || value > 100) errorMsg = 'Marks must be between 0 and 100';

        setProfile(prevProfile => ({
            ...prevProfile,
            marks: {
                ...prevProfile.marks,
                [name]: value
            }
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMsg
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
    
        // Validation checks
        if (!profile.name) newErrors.name = 'Name is required';
        if (!profile.phone || !/^\d{10}$/.test(profile.phone)) newErrors.phone = 'Phone must be a 10-digit number';
        if (!profile.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email)) newErrors.email = 'Invalid email address';
        if (!profile.aadhar || !/^\d{12}$/.test(profile.aadhar)) newErrors.aadhar = 'Aadhar must be a 12-digit number';
        if (profile.marks.tenth < 0 || profile.marks.tenth > 100) newErrors.tenth = '10th Marks must be between 0 and 100';
        if (profile.marks.twelfth < 0 || profile.marks.twelfth > 100) newErrors.twelfth = '12th Marks must be between 0 and 100';
        if (profile.percentile < 0 || profile.percentile > 100) newErrors.percentile = 'Percentile must be between 0 and 100';
        if (!profile.caste) newErrors.caste = 'Caste is required';
    
        // Set errors if any
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
    
        try {
            const formData = new FormData();
    
            // Append fields to formData
            formData.append('name', profile.name);
            formData.append('phone', profile.phone);
            formData.append('email', profile.email);
            formData.append('aadhar', profile.aadhar);
            formData.append('marks[tenth]', profile.marks.tenth);
            formData.append('marks[twelfth]', profile.marks.twelfth);
            formData.append('entranceExam', profile.entranceExam);
            formData.append('percentile', profile.percentile);
            formData.append('caste', profile.caste);
    
            // Append files to formData if they exist
            if (profile.tenthMarksheet instanceof File) {
                formData.append('tenthMarksheet', profile.tenthMarksheet);
            }
            if (profile.twelfthMarksheet instanceof File) {
                formData.append('twelfthMarksheet', profile.twelfthMarksheet);
            }
            if (profile.entranceExamMarksheet instanceof File) {
                formData.append('entranceExamMarksheet', profile.entranceExamMarksheet);
            }
    
            // Send profile data to the server
            const responseSave = await fetch('http://localhost:5000/api/profile/update', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
    
            if (!responseSave.ok) {
                const errorText = await responseSave.text();
                console.error('Error saving student profile:', errorText);
                return;
            }
    
            // Fetch colleges after profile is saved
            const responseFind = await fetch('http://localhost:5000/api/collegess/find', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    percentile: profile.percentile,
                    caste: profile.caste
                })
            });
    
            if (!responseFind.ok) {
                const errorText = await responseFind.text();
                console.error('Error fetching colleges:', errorText);
                return;
            }
    
            const collegesData = await responseFind.json();
            setColleges(collegesData);
            console.log('Colleges found:', collegesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="profile-container" style={{ marginTop: "20px" }}>
            <form onSubmit={handleSubmit} className="profile-form">
                <h2 style={{ textAlign: "center" }}>Student Profile</h2>
                <input 
                    type="text" 
                    name="name" 
                    value={profile.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                />
                {errors.name && <span className="error" style={{ color: 'red' }}>{errors.name}</span>}
                <input 
                    type="tel" 
                    name="phone" 
                    value={profile.phone} 
                    onChange={handleChange} 
                    placeholder="Phone" 
                    required 
                />
                {errors.phone && <span className="error" style={{ color: 'red' }}>{errors.phone}</span>}
                <input 
                    type="email" 
                    name="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                />
                {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}
                <input 
                    type="text" 
                    name="aadhar" 
                    value={profile.aadhar} 
                    onChange={handleChange} 
                    placeholder="Aadhar" 
                    required 
                    maxLength="12"
                />
                {errors.aadhar && <span className="error" style={{ color: 'red' }}>{errors.aadhar}</span>}
                <input 
                    type="number" 
                    step="0.01" 
                    name="tenth" 
                    value={profile.marks.tenth} 
                    onChange={handleMarksChange} 
                    placeholder="10th Marks (%)" 
                    required 
                />
                {errors.tenth && <span className="error" style={{ color: 'red' }}>{errors.tenth}</span>}
                <label style={{fontWeight: "bold"}}>
                    10th Marksheet
                    <input 
                        type="file" 
                        name="tenthMarksheet" 
                        accept=".jpg,.png,.pdf" 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                {errors.tenthMarksheet && <span className="error" style={{ color: 'red' }}>{errors.tenthMarksheet}</span>}
                <input 
                    type="number" 
                    step="0.01" 
                    name="twelfth" 
                    value={profile.marks.twelfth} 
                    onChange={handleMarksChange} 
                    placeholder="12th Marks (%)" 
                    required 
                />
                {errors.twelfth && <span className="error" style={{ color: 'red' }}>{errors.twelfth}</span>}
                <label style={{fontWeight: "bold"}}>
                    12th Marksheet
                    <input 
                        type="file" 
                        name="twelfthMarksheet" 
                        accept=".jpg,.png,.pdf" 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                {errors.twelfthMarksheet && <span className="error" style={{ color: 'red' }}>{errors.twelfthMarksheet}</span>}
                <input 
                    type="text" 
                    name="entranceExam" 
                    value={profile.entranceExam} 
                    onChange={handleChange} 
                    placeholder="Entrance Exam" 
                    required 
                />
                <label style={{fontWeight: "bold"}}>
                    Entrance Exam Marksheet
                    <input 
                        type="file" 
                        name="entranceExamMarksheet" 
                        accept=".jpg,.png,.pdf" 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                {errors.entranceExamMarksheet && <span className="error" style={{ color: 'red' }}>{errors.entranceExamMarksheet}</span>}
                <input 
                    type="number" 
                    step="0.01" 
                    name="percentile" 
                    value={profile.percentile} 
                    onChange={handleChange} 
                    placeholder="Percentile" 
                    required 
                />
                {errors.percentile && <span className="error" style={{ color: 'red' }}>{errors.percentile}</span>}
                <select 
                    name="caste" 
                    value={profile.caste} 
                    onChange={handleChange} 
                    required 
                >
                    <option value="">Select Caste</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                </select>
                {errors.caste && <span className="error" style={{ color: 'red' }}>{errors.caste}</span>}
                <button type="submit">Find Colleges</button>
            </form>

            <div className="colleges-list">
                {colleges.length > 0 ? (
                    colleges.map((college, index) => (
                        <div key={index} className="college">
                            <h3>{college.collegeName}</h3>
                            <p><strong>Address:</strong> {college.address}</p>
                            <p><strong>Courses Available:</strong> {Array.isArray(college.coursesAvailable) ? college.coursesAvailable.join(', ') : 'N/A'}</p>
                            <p><strong>Cutoff (Spot Round):</strong> {college.cutOffSpotRound}</p>
                            <p><strong>Min Criteria:</strong> {college.minStudentCriteria}</p>
                            <p><strong>Max Criteria:</strong> {college.maxCriteria}</p>
                            <p><strong>Spot Round Dates:</strong> {college.spotRoundDates || 'N/A'}</p>
                            <p><strong>Approved By:</strong> {college.approvedBy}</p>
                        </div>
                    ))
                ) : (
                    <p>No colleges found</p>
                )}
            </div>
        </div>
    );
};

export default StudentProfile;
