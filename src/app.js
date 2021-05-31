const express = require("express");
const app = express();
const { sequelize } = require("../models");
const userRouter = require("../routes/user");
const taskRouter = require("../routes/task");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// async function main() {
//   sequelize.sync({force: false});
// }

// main();
module.exports = app;
