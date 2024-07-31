import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StudentsPage from './AdminStudent';
import CollegesPage from './AdminCollege';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ width: '200px', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <ul>
          <li><Link to="/admin/students">Students</Link></li>
          <li><Link to="/admin/colleges">Colleges</Link></li>
        </ul>
      </nav>
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="students" element={<StudentsPage />} />
          <Route path="colleges" element={<CollegesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
