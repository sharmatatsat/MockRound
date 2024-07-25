import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import './CollegeProfilePage.css';

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
        courseCutoffs: {}, 
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
    const [errors, setErrors] = useState({});
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

        let newValue = parsedValue;
        let error = '';

        // Validate positive integers for minStudentCriteria and maxCriteria
        if (name === 'minStudentCriteria' || name === 'maxCriteria') {
            if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
                error = 'Must be a positive integer';
            }
        }

        if (['ST', 'SC', 'OBC', 'General'].includes(name)) {
            setCollege(prevCollege => ({
                ...prevCollege,
                casteCategoryCutOff: {
                    ...prevCollege.casteCategoryCutOff,
                    [name]: newValue
                }
            }));
        } else {
            setCollege(prevCollege => ({
                ...prevCollege,
                [name]: newValue
            }));
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleCutoffChange = (e, courseName, category) => {
        const { value } = e.target;
        setCollege(prevCollege => ({
            ...prevCollege,
            courseCutoffs: {
                ...prevCollege.courseCutoffs,
                [courseName]: {
                    ...prevCollege.courseCutoffs[courseName],
                    [category]: value
                }
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Perform final validation
        let hasErrors = false;
        const newErrors = {};

        if (!Number.isInteger(Number(college.minStudentCriteria)) || Number(college.minStudentCriteria) <= 0) {
            newErrors.minStudentCriteria = 'Must be a positive integer';
            hasErrors = true;
        }

        if (!Number.isInteger(Number(college.maxCriteria)) || Number(college.maxCriteria) <= 0) {
            newErrors.maxCriteria = 'Must be a positive integer';
            hasErrors = true;
        }

        setErrors(newErrors);

        if (hasErrors) return;

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
                alert('Registration Successful!');
                // navigate('/entries');
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
                    coursesAvailable: [...prevCollege.coursesAvailable, manualCourseInput],
                    courseCutoffs: {
                        ...prevCollege.courseCutoffs,
                        [manualCourseInput]: { ST: '', SC: '', OBC: '', General: '' } 
                    }
                }));
                setManualCourseInput(''); 
            }
        } else {
            if (courseInput && !college.coursesAvailable.includes(courseInput)) {
                setCollege(prevCollege => ({
                    ...prevCollege,
                    coursesAvailable: [...prevCollege.coursesAvailable, courseInput],
                    courseCutoffs: {
                        ...prevCollege.courseCutoffs,
                        [courseInput]: { ST: '', SC: '', OBC: '', General: '' } 
                    }
                }));
                setCourseInput(''); 
            }
        }
    };

    const removeCourse = (index) => {
        const courseName = college.coursesAvailable[index];
        setCollege(prevCollege => {
            const { [courseName]: _, ...remainingCutoffs } = prevCollege.courseCutoffs;
            return {
                ...prevCollege,
                coursesAvailable: prevCollege.coursesAvailable.filter((_, i) => i !== index),
                courseCutoffs: remainingCutoffs
            };
        });
    };

    return (
        <div className="profile-container" style={{ marginTop: "20px" }}>
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
                {errors.collegeName && <div className="error-message">{errors.collegeName}</div>}

                <select name="state" value={college.state} onChange={handleChange} required>
                    <option value="" disabled>Select State</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                {errors.state && <div className="error-message">{errors.state}</div>}

                <select name="city" value={college.city} onChange={handleChange} required>
                    <option value="" disabled>Select City</option>
                    {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                {errors.city && <div className="error-message">{errors.city}</div>}

                <input
                    type="text"
                    name="address"
                    value={college.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                />
                {errors.address && <div className="error-message">{errors.address}</div>}

                <input
                    type="text"
                    name="collegeCode"
                    value={college.collegeCode}
                    onChange={handleChange}
                    placeholder="College Code"
                    required
                />
                {errors.collegeCode && <div className="error-message">{errors.collegeCode}</div>}

                <select name="branch" value={college.branch} onChange={handleChange} required>
                    <option value="" disabled>Select Branch</option>
                    {branches.concat('Others').map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>
                {errors.branch && <div className="error-message">{errors.branch}</div>}

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
                {errors.course && <div className="error-message">{errors.course}</div>}

                <button type="button" className="add-course-btn" style={{ fontSize: "15px" }} onClick={addCourse}>Add Course</button>

                <div className="course-list">
                    {college.coursesAvailable.map((course, index) => (
                        <div key={index} className="course-item" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                            <div className="course-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>{course}</div>
                                <button
                                    type="button"
                                    onClick={() => removeCourse(index)}
                                    className="remove-course-btn"
                                    style={{ fontSize: '12px', padding: '4px', backgroundColor: 'red' }}
                                >
                                    <DeleteIcon boxSize={12} />
                                </button>
                            </div>
                            <input
                                type="number"
                                name={`ST-${course}`}
                                value={college.courseCutoffs[course]?.ST || ''}
                                onChange={(e) => handleCutoffChange(e, course, 'ST')}
                                placeholder="ST Cut-off (%)"
                                required
                            />
                            {errors[`ST-${course}`] && <div className="error-message">{errors[`ST-${course}`]}</div>}
                            <input
                                type="number"
                                name={`SC-${course}`}
                                value={college.courseCutoffs[course]?.SC || ''}
                                onChange={(e) => handleCutoffChange(e, course, 'SC')}
                                placeholder="SC Cut-off (%)"
                                required
                            />
                            {errors[`SC-${course}`] && <div className="error-message">{errors[`SC-${course}`]}</div>}
                            <input
                                type="number"
                                name={`OBC-${course}`}
                                value={college.courseCutoffs[course]?.OBC || ''}
                                onChange={(e) => handleCutoffChange(e, course, 'OBC')}
                                placeholder="OBC Cut-off (%)"
                                required
                            />
                            {errors[`OBC-${course}`] && <div className="error-message">{errors[`OBC-${course}`]}</div>}
                            <input
                                type="number"
                                name={`General-${course}`}
                                value={college.courseCutoffs[course]?.General || ''}
                                onChange={(e) => handleCutoffChange(e, course, 'General')}
                                placeholder="General Cut-off (%)"
                                required
                            />
                            {errors[`General-${course}`] && <div className="error-message">{errors[`General-${course}`]}</div>}
                        </div>
                    ))}
                </div>

                <input
                    type="date"
                    name="spotRoundDates"
                    value={college.spotRoundDates}
                    onChange={handleChange}
                    required
                />
                {errors.spotRoundDates && <div className="error-message">{errors.spotRoundDates}</div>}

                <input
                    type="text"
                    name="minStudentCriteria"
                    value={college.minStudentCriteria}
                    onChange={handleChange}
                    placeholder="Minimum Student Criteria"
                    required
                />
                {errors.minStudentCriteria && <div className="error-message">{errors.minStudentCriteria}</div>}

                <input
                    type="text"
                    name="maxCriteria"
                    value={college.maxCriteria}
                    onChange={handleChange}
                    placeholder="Maximum Criteria"
                    required
                />
                {errors.maxCriteria && <div className="error-message">{errors.maxCriteria}</div>}

                <select
                    name="approvedBy"
                    value={college.approvedBy}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Approved By</option>
                    <option value="UGC">UGC</option>
                    <option value="AICTE">AICTE</option>
                    <option value="NBA">NBA</option>
                    <option value="Others">Others</option>
                </select>
                {errors.approvedBy && <div className="error-message">{errors.approvedBy}</div>}

                <button type="submit" style={{ fontSize: '16px' }}>Submit</button>
            </form>
        </div>
    );
};

export default CollegeProfilePage;
