const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BookBox API',
        version: '1.0.0',
        description: 'API for BookBox application',
      },
    },
    apis: ['./routes/*.js'], 
  }

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
