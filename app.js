require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const express = require('express');
const xss = require('xss-clean')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express();
const routes = require('./routes/index.router')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const {errorHandlerMiddleware, boomHandlerMiddleware} = require('./middleware/error-handler');

app.use(express.json());
// extra packages
app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
	max: 100,  
	standardHeaders: true,
	legacyHeaders: false
}))
app.use(helmet())
app.use(xss())
app.use(cors())


// routes
app.get('/', (req,res)=>{
  res.send("Job api")
})
app.use('/api/v1', routes);

// error handlers
app.use(notFoundMiddleware);
app.use(boomHandlerMiddleware)
app.use(errorHandlerMiddleware);

// connect to the db & localhost
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
