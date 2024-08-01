import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/students')
      .then(response => {
        console.log('Fetched students data:', response.data); // Log data to verify structure
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error.response || error.message);
        setError('Failed to load students data');
      });
  }, []);

  return (
    <div>
      <h1>Students</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>10th Marksheet</th>
            <th>12th Marksheet</th>
            <th>JEE Marksheet</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No students found</td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student._id}>
              <td>
  {student.tenthMarksheet ? (
    <a href={`http://localhost:5000/uploads/${student.tenthMarksheet}`} target="_blank" rel="noopener noreferrer">View</a>
  ) : 'No Marksheet Available'}
</td>
<td>
  {student.twelfthMarksheet ? (
    <a href={`http://localhost:5000/uploads/${student.twelfthMarksheet}`} target="_blank" rel="noopener noreferrer">View</a>
  ) : 'No Marksheet Available'}
</td>
<td>
  {student.jeemarksheet ? (
    <a href={`http://localhost:5000/uploads/${student.jeemarksheet}`} target="_blank" rel="noopener noreferrer">View</a>
  ) : 'No Marksheet Available'}
</td>


              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
