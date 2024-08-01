const mongoose = require('mongoose');
const Student = require('../models/Profile'); // Adjust path if necessary

const mongoURI = 'mongodb+srv://sharmatatsat23:dummyuser@collegeinfo.cnaq2gl.mongodb.net/yourDatabaseName?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const updateFilePaths = async () => {
  try {
    const students = await Student.find();
    for (const student of students) {
      const updatedFields = {};
      if (student.tenthMarksheet && student.tenthMarksheet.startsWith('C:/')) {
        updatedFields.tenthMarksheet = student.tenthMarksheet.split('server/uploads/')[1];
      }
      if (student.twelfthMarksheet && student.twelfthMarksheet.startsWith('C:/')) {
        updatedFields.twelfthMarksheet = student.twelfthMarksheet.split('server/uploads/')[1];
      }
      if (student.jeemarksheet && student.jeemarksheet.startsWith('C:/')) {
        updatedFields.jeemarksheet = student.jeemarksheet.split('server/uploads/')[1];
      }

      if (Object.keys(updatedFields).length > 0) {
        await Student.updateOne({ _id: student._id }, { $set: updatedFields });
        console.log(`Updated student ${student._id}`);
      }
    }
    console.log('Update complete');
  } catch (error) {
    console.error('Error updating file paths:', error);
  } finally {
    mongoose.disconnect();
  }
};

updateFilePaths();
