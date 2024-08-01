// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    phone: String,
    aadhar: String,
    marks: {
        tenth: Number,
        twelfth: Number,
    },
    tenthMarksheet: String, // Change from ObjectId to String
    twelfthMarksheet: String, // Change from ObjectId to String
    entranceExamMarksheet: String, // Change from ObjectId to String
    entranceExam: String,
    percentile: Number,
    caste: String
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
