const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routes
const usersRoutes = require("./routes/userRoute");
const api = process.env.API_URL;
const userApi = `${api}/user`;
//const userRegex = "(?q=.*)";//
//const userApiQuery = api.replace("/user", `/user${userRegex}`);/
app.use(userApi, usersRoutes);
//app.use(userApiQuery, usersRoutes);

//Database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "24solution",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(5001, () => {
  console.log("server is running http://localhost:5001");
});
