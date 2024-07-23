import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import './CollegeProfilePage.css';

// Import data from data.js
import { states, cities, branches, courses } from '../data';

const CollegeProfilePage = () => {
    const [college, setCollege] = useState({
        collegeName: '',
        state: '',
        city: '',
        address: '',
        collegeCode: '',
        branch: '',
        course: '',
        coursesAvailable: [],
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

    const [availableCities, setAvailableCities] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [courseInput, setCourseInput] = useState('');
    const [manualCourseInput, setManualCourseInput] = useState('');
    const [isOthersBranch, setIsOthersBranch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (college.state) {
            setAvailableCities(cities[college.state] || []);
        }
    }, [college.state]);

    useEffect(() => {
        if (college.branch && college.branch !== 'Others') {
            setAvailableCourses(courses[college.branch] || []);
            setIsOthersBranch(false);
        } else if (college.branch === 'Others') {
            setIsOthersBranch(true);
            setAvailableCourses([]);
        }
    }, [college.branch]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) : value;

        if (['ST', 'SC', 'OBC', 'General'].includes(name)) {
            setCollege(prevCollege => ({
                ...prevCollege,
                casteCategoryCutOff: {
                    ...prevCollege.casteCategoryCutOff,
                    [name]: parsedValue
                }
            }));
        } else {
            setCollege(prevCollege => ({
                ...prevCollege,
                [name]: parsedValue
            }));
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

    const addCourse = () => {
        if (college.branch === 'Others') {
            if (manualCourseInput && !college.coursesAvailable.includes(manualCourseInput)) {
                setCollege(prevCollege => ({
                    ...prevCollege,
                    coursesAvailable: [...prevCollege.coursesAvailable, manualCourseInput]
                }));
                setManualCourseInput(''); // Clear the input after adding
            }
        } else {
            if (courseInput && !college.coursesAvailable.includes(courseInput)) {
                setCollege(prevCollege => ({
                    ...prevCollege,
                    coursesAvailable: [...prevCollege.coursesAvailable, courseInput]
                }));
                setCourseInput(''); // Clear the input after adding
            }
        }
    };

    const removeCourse = (index) => {
        setCollege(prevCollege => ({
            ...prevCollege,
            coursesAvailable: prevCollege.coursesAvailable.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="profile-container">
            <h1 className="profile-heading">College Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <input
                    type="text"
                    name="collegeName"
                    value={college.collegeName}
                    onChange={handleChange}
                    placeholder="College Name"
                    required
                />
                
                <select name="state" value={college.state} onChange={handleChange} required>
                    <option value="" disabled>Select State</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                
                <select name="city" value={college.city} onChange={handleChange} required>
                    <option value="" disabled>Select City</option>
                    {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>

                <input
                    type="text"
                    name="address"
                    value={college.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                />
                <input
                    type="text"
                    name="collegeCode"
                    value={college.collegeCode}
                    onChange={handleChange}
                    placeholder="College Code"
                    required
                />
                
                <select name="branch" value={college.branch} onChange={handleChange} required>
                    <option value="" disabled>Select Branch</option>
                    {branches.concat('Others').map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>

                {isOthersBranch && (
                    <input
                        type="text"
                        name="manualCourse"
                        value={manualCourseInput}
                        onChange={(e) => setManualCourseInput(e.target.value)}
                        placeholder="Enter Course"
                    />
                )}

                {!isOthersBranch && (
                    <select name="course" value={courseInput} onChange={(e) => setCourseInput(e.target.value)} required>
                        <option value="" disabled>Select Course</option>
                        {availableCourses.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                )}

                <button type="button" className="add-course-btn" style = {{fontSize : "13px"}} onClick={addCourse}>Add Course</button>

                <div className="course-list">
                    {college.coursesAvailable.map((course, index) => (
                        <div key={index} className="course-item" style={{fontWeight : 'bold'}}>
                            {course}
                            <button
                                type="button"
                                onClick={() => removeCourse(index)}
                                className="remove-course-btn"
                                style={{fontSize : '12px' , padding: '4px' , backgroundColor : 'red'}}
                            >
                                <DeleteIcon boxSize={12}/>
                            </button>
                        </div>
                    ))}
                </div>

                <input
                    type="number"
                    name="minStudentCriteria"
                    value={college.minStudentCriteria}
                    onChange={handleChange}
                    placeholder="Minimum Student Criteria"
                    required
                />
                <input
                    type="number"
                    name="maxCriteria"
                    value={college.maxCriteria}
                    onChange={handleChange}
                    placeholder="Max Student Criteria"
                    required
                />
                <input
                    type="date"
                    name="spotRoundDates"
                    value={college.spotRoundDates}
                    onChange={handleChange}
                    placeholder="Spot Round Dates"
                    required
                />
                <input
                    type="number"
                    name="ST"
                    value={college.casteCategoryCutOff.ST}
                    onChange={handleChange}
                    placeholder="ST Cut-off (%)"
                    required
                />
                <input
                    type="number"
                    name="SC"
                    value={college.casteCategoryCutOff.SC}
                    onChange={handleChange}
                    placeholder="SC Cut-off (%)"
                    required
                />
                <input
                    type="number"
                    name="OBC"
                    value={college.casteCategoryCutOff.OBC}
                    onChange={handleChange}
                    placeholder="OBC Cut-off (%)"
                    required
                />
                <input
                    type="number"
                    name="General"
                    value={college.casteCategoryCutOff.General}
                    onChange={handleChange}
                    placeholder="General Cut-off (%)"
                    required
                />
                <select name="approvedBy" value={college.approvedBy} onChange={handleChange} required>
                    <option value="" disabled>Select Approval Body</option>
                    <option value="AICTE">AICTE</option>
                    <option value="UGC">UGC</option>
                    <option value="NIRF">NIRF</option>
                </select>

                <div className="action-buttons">
                    <button type="submit" style={{fontSize : "15px" , width : "20%"}}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default CollegeProfilePage;
