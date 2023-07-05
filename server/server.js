const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
require('dotenv').config();
const db = require('./config/dbconfig');

const userRoute = require('./routes/usersRoute');
const projectRoute = require('./routes/projectsRoute');
const taskRoute = require('./routes/tasksRoute');

app.use('/api/users', userRoute);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));