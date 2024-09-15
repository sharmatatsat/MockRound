// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true  // You can make this required if every profile must be linked to a student
    },
    phone: String,
    aadhar: String,
    marks: {
        tenth: Number,
        twelfth: Number,
    },
    tenthMarksheet: String, 
    twelfthMarksheet: String, 
    entranceExamMarksheet: String, 
    entranceExam: String,
    percentile: Number,
    branch: String,  
    course: String,  
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
