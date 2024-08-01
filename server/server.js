const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const collegeRoutes = require('./routes/collegeRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const collegesRoutes = require('./routes/colleges');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profileRoutes');
const fileRoutes = require('./routes/fileRoutes'); // Import file routes
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Set JWT secret
app.set('jwt_secret', process.env.JWT_SECRET || 'secretkey');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/collegess', collegesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);

// File routes
app.use('/api/files', fileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
