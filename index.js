import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from 'body-parser'
import dataRouter from './routes/data.js'
// import data from './jsondata.json' assert {type: 'json'};
// import Data from "./models/data.js";

dotenv.config(); // to use .env files
const app = express();
app.use(express.json()); //parses incoming json requests and parse it to the req.body
app.use(helmet()); // secures HTTP header returned by the express app
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // so that browser blocks no cors
app.use(morgan("common")); //it is used to log the requests with info in terminal
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
/* ROUTES */

app.use(dataRouter);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Listening on PORT: ${PORT}. Connected to MongoDB`);
    });
    // Data.insertMany(data);
  })
  .catch((err) => {
    console.log(`${err}, did not connect.`);
  });