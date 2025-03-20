const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', authRoutes);

app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
