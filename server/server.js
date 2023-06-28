const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
require('dotenv').config();
const db = require('./config/dbconfig');

const userRoute = require('./routes/usersRoute');

app.use('/api/users', userRoute);
app.listen(port, () => console.log(`Listening on port ${port}`));