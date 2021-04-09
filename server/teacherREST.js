const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const PORT = config.get('serverPort');
const teacherRouter = require('./routes/teacher.routes');
const corsMiddleware = require('./middleware/cors.middleware');

app.use(corsMiddleware); // allow to send requests from different domains
app.use(express.json());
app.use('/api/teachers', teacherRouter);
const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'));
    app.listen(PORT, ()=>{
      console.log('Server started on port ', PORT);
    });
  } catch (e) {

  }
};

start();
