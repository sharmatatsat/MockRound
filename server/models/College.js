const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    collegeCode: { type: String, required: true },
    branch: { type: String },
    course: { type: String },
    coursesAvailable: { type: [String], required: true },
    courseCutoffs: { type: Number, required: true }, // Single cutoff for all categories
    minStudentCriteria: { type: Number, required: true },
    maxCriteria: { type: Number, required: true },
    spotRoundDates: { type: String, required: true },
    approvedBy: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
