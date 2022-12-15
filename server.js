const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const morgan = require('morgan')
const logger = require('./logger')

const app = express();


var corsOptions = {
  origin: "*"
};

app.use(morgan('dev'))
app.use(cors(corsOptions));

// content-type：application/json
app.use(bodyParser.json());

// content-type：application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.get("/", (req, res) => {
  res.json({"msg":"Works!"})
});

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`SERVER PORT： ${PORT}.`);
});

//mysql database
const db = require("./app/models");
db.sequelize.sync();


const _errorHandler = (err, req, res, next)=>{
  logger.error('${req.method} ${req.originalUrl}'+ err.message)
  const errorMsg = err.message
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {}
  })
}
app.use(_errorHandler)