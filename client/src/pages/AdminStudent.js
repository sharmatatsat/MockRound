import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStudent = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/profiles/all');
                setProfiles(response.data);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, []);

    const getFileURL = (filename) => `/api/files/${filename}`;

    return (
        <div>
            <h1>Student Profiles</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Aadhar</th>
                        <th>Tenth Marks</th>
                        <th>Twelfth Marks</th>
                        <th>Entrance Exam</th>
                        <th>Percentile</th>
                        <th>Caste</th>
                        <th>Tenth Marksheet</th>
                        <th>Twelfth Marksheet</th>
                        <th>Entrance Exam Marksheet</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map(profile => (
                        <tr key={profile._id}>
                            <td>{profile.name}</td>
                            <td>{profile.phone}</td>
                            <td>{profile.aadhar}</td>
                            <td>{profile.marks?.tenth || 'N/A'}</td>
                            <td>{profile.marks?.twelfth || 'N/A'}</td>
                            <td>{profile.entranceExam}</td>
                            <td>{profile.percentile}</td>
                            <td>{profile.caste}</td>
                            <td><a href={getFileURL(profile.tenthMarksheet)}>Download</a></td>
                            <td><a href={getFileURL(profile.twelfthMarksheet)}>Download</a></td>
                            <td><a href={getFileURL(profile.entranceExamMarksheet)}>Download</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminStudent;
