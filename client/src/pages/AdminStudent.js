import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminStudent.css';  // Import the CSS file

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

    const getFileURL = (filename) => `http://localhost:5000/api/files/${filename}`;

    return (
        <div>
            <h1>Student Profiles</h1>
            <table>
                <thead>
                    <tr>
                        <th className="table-cell">Name</th>
                        <th className="table-cell">Phone</th>
                        <th className="table-cell">Aadhar</th>
                        <th className="table-cell">Tenth Marks</th>
                        <th className="table-cell">Twelfth Marks</th>
                        <th className="table-cell">Entrance Exam</th>
                        <th className="table-cell">Percentile</th>
                        <th className="table-cell">Caste</th>
                        <th className="table-cell">Tenth Marksheet</th>
                        <th className="table-cell">Twelfth Marksheet</th>
                        <th className="table-cell">Entrance Exam Marksheet</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map(profile => (
                        <tr key={profile._id}>
                            <td className="table-cell">{profile.name}</td>
                            <td className="table-cell">{profile.phone}</td>
                            <td className="table-cell">{profile.aadhar}</td>
                            <td className="table-cell">{profile.marks?.tenth || 'N/A'}</td>
                            <td className="table-cell">{profile.marks?.twelfth || 'N/A'}</td>
                            <td className="table-cell">{profile.entranceExam}</td>
                            <td className="table-cell">{profile.percentile}</td>
                            <td className="table-cell">{profile.caste}</td>
                            <td className="table-cell"><a href={getFileURL(profile.tenthMarksheet)}>Download</a></td>
                            <td className="table-cell"><a href={getFileURL(profile.twelfthMarksheet)}>Download</a></td>
                            <td className="table-cell"><a href={getFileURL(profile.entranceExamMarksheet)}>Download</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminStudent;
