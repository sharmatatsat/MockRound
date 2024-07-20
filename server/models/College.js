const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    address: { type: String, required: true },
    coursesAvailable: { type: String, required: true },
    cutOffSpotRound: { type: String, required: true },
    casteCategoryCutOff: { type: String, required: true },
    minStudentCriteria: { type: String, required: true },
    maxCriteria: { type: String, required: true },
    spotRoundDates: { type: String, required: true },
    approvedBy: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
