const express = require('express');
const port = 3000;
const { errorHandler } = require('./middleware/errorHandler');
const app = express();
const userRouter = require('./routes/userRoutes');
const connectDB = require('./config/db');
const colors = require('colors');
const toDoRoute = require('./routes/toDoRoute');
const dotenv = require('dotenv').config();
const path = require('path');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../frontend/')));

//route paths here
app.use('/', userRouter);
app.use('/api/tasks', toDoRoute);

app.use(errorHandler);
app.listen(port, () => console.log('Server started on port 3000'));
