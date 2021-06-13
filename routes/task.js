const express = require("express");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const auth = require("../middleware/auth");
const router = new express.Router();
const { Task } = require("../models");
const updateTaskValidator = require("../validators/tasks/validator");

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user_id: req.user.id });
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    let filter = {};
    if (req.query.search) {
      filter.description = { [Op.substring]: req.query.search };
    }

    if (req.query.completed) {
      filter.completed = req.query.completed;
    }
    console.log(filter);
    const tasks = await req.user.getTasks({
      attributes: { exclude: ["user_id"] },
      order: [["id", "ASC"]],
      where: filter,
    });
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(400).send([]);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/tasks/:id", auth, updateTaskValidator, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    const updatedTask = await task.update(req.body);
    res.send(updatedTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res.send({});
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
});

module.exports = router;
