require('dotenv').config();

const express = require('express');
const connectToDB = require('./database/connect-database');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT;

/* routes */
const userRoutes = require('./routes/user.routes');
const imageRoutes = require('./routes/image.routes');
const groupRoutes = require('./routes/group.routes');

const app = express();

connectToDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
    credentials: true,
  })
);

app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/group', groupRoutes);

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
