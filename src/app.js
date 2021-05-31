const express = require("express");
const app = express();
const { sequelize } = require("../models");
const userRouter = require("../routes/user")
const taskRouter = require("../routes/task")

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// async function main() {
//     console.log(User)
//     await User.create({name: 'keshav', email: 'keshavnemeli@gmail.com', password: '12312'})
// }

// main();
module.exports = app;
