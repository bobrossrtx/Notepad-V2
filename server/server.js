import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
require('dotenv').config();

mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', 
    () => console.log('Connected to MongoDB'));

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use('/api/user', require('./controllers/User'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(5000, 
    () => console.log('server started: http://localhost:5000/'));
