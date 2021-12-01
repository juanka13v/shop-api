const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const userAuth = require("./routes/auth");

dotenv.config();
app.use(express.json());
app.use("/api/v1", userAuth);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor lanzado...");
});
