const express = require("express");
const app = express();
const { sequelize } = require("../models");
const cors = require("cors");
const userRouter = require("../routes/user");
const taskRouter = require("../routes/task");

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

async function main() {
  sequelize.sync({force: true});
}

main();
module.exports = app;
