const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    name: String,
    phone: String,
    aadhar: String,
    marks: {
        tenth: Number,
        twelfth: Number
    },
    tenthMarksheet: String,
    twelfthMarksheet: String,
    entranceExam: String,
    entranceExamMarksheet: String,
    percentile: Number,
    caste: String
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
