const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require("morgan");

require('dotenv').config();

const port = process.env.PORT;

// routes import

const equipmentRoutes = require('./routes/equipments.routes');

// Database connection

dbURI = `mongodb+srv://amitesh:${process.env.dbPASS}@farm-tech.8wlemd5.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
.then(result => app.listen(port, () => console.log("Server started...")))
.catch(err => console.log(err));

// middlewares

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
   //todo add the origin here once the frontend is built
}))


// routes to handle requests

app.use("/equipments", equipmentRoutes);

// Handling errors 

app.use((req, res, next) => {
   const err = new Error("Not found");
   err.status = 404;
   next(err);
})

app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.json({
      err: {
         message: err.message
      }
   })
})