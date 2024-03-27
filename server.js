const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(
    `Server running in ${process.env.DEV_MODE} on PORT ${PORT}`.bgCyan.white
  );
});
