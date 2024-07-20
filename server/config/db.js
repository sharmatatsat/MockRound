const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sharmatatsat23:dummyuser@collegeinfo.cnaq2gl.mongodb.net/?retryWrites=true&w=majority&appName=CollegeInfo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
