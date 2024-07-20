import React, { useState } from 'react';
import axios from 'axios';

const CollegeForm = () => {
    const [collegeName, setCollegeName] = useState('');
    const [address, setAddress] = useState('');
    const [coursesAvailable, setCoursesAvailable] = useState('');
    const [cutOffRequired, setCutOffRequired] = useState('');
    const [casteCategoryCutOff, setCasteCategoryCutOff] = useState('');
    const [minCriteria, setMinCriteria] = useState('');
    const [maxCriteria, setMaxCriteria] = useState('');
    const [spotRoundDates, setSpotRoundDates] = useState('');
    const [approvedBy, setApprovedBy] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const collegeData = {
            collegeName,
            address,
            coursesAvailable: coursesAvailable.split(','),
            cutOffRequired,
            casteCategoryCutOff: JSON.parse(casteCategoryCutOff),
            minCriteria,
            maxCriteria,
            spotRoundDates: spotRoundDates.split(',').map(date => new Date(date)),
            approvedBy: approvedBy.split(',')
        };

        try {
            await axios.post('http://localhost:5000/api/colleges/add', collegeData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('College information submitted successfully');
            setCollegeName('');
            setAddress('');
            setCoursesAvailable('');
            setCutOffRequired('');
            setCasteCategoryCutOff('');
            setMinCriteria('');
            setMaxCriteria('');
            setSpotRoundDates('');
            setApprovedBy('');
        } catch (error) {
            console.error('Error submitting college information:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
            <input type="text" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="Enter College Name" required style={{ margin: '10px 0', padding: '10px' }} />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required style={{ margin: '10px 0', padding: '10px' }} />
            <input type="text" value={coursesAvailable} onChange={(e) => setCoursesAvailable(e.target.value)} placeholder="Enter Courses Available (comma-separated)" required style={{ margin: '10px 0', padding: '10px' }} />
            <input type="number" value={cutOffRequired} onChange={(e) => setCutOffRequired(e.target.value)} placeholder="Enter Cut-off Required" required style={{ margin: '10px 0', padding: '10px' }} />
            <textarea value={casteCategoryCutOff} onChange={(e) => setCasteCategoryCutOff(e.target.value)} placeholder="Enter Caste/Category Specific Cut-off (JSON format)" required style={{ margin: '10px 0', padding: '10px' }} />
            <input type="number" value={minCriteria} onChange={(e) => setMinCriteria(e.target.value)} placeholder="Enter Minimum Student Criteria" required style={{ margin: '10px 0', padding: '10px' }} />
            <input type="number" value={maxCriteria} onChange={(e) => setMaxCriteria(e.target.value)} placeholder="Enter Maximum Criteria (if any)" style={{ margin: '10px 0', padding: '10px' }} />
            <input type="text" value={spotRoundDates} onChange={(e) => setSpotRoundDates(e.target.value)} placeholder="Enter Spot Round Dates (comma-separated)" required style={{ margin: '10px 0', padding: '10px' }} />
            <input type="text" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} placeholder="Enter Approved By (comma-separated)" required style={{ margin: '10px 0', padding: '10px' }} />
            <button type="submit" style={{ margin: '20px 0', padding: '10px' }}>Save</button>
        </form>
    );
};

export default CollegeForm;
