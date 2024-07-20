const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const collegeRoutes = require('./routes/collegeRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.set('jwt_secret', process.env.JWT_SECRET || 'secretkey');

app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
