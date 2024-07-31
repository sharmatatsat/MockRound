import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <h1>Students</h1>
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
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td><a href={student.tenthMarksheet} target="_blank" rel="noopener noreferrer">View</a></td>
              <td><a href={student.twelfthMarksheet} target="_blank" rel="noopener noreferrer">View</a></td>
              <td><a href={student.jeemarksheet} target="_blank" rel="noopener noreferrer">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
