const express = require("express");
const router = new express.Router();
const { User, Token } = require("../models");
const auth = require("../middleware/auth");
const updateUserValidator = require("../validators/users/validator");

router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await Token.create({
      token: user.generateToken(),
      user_id: user.id,
    });
    res.status(201).send({ user, token: token.token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("users/test", async (req, res) => {
  const user = await User.create(req.body);
  const token = await Token.create({
    token: user.generateToken(),
    user_id: user.id,
  });
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await Token.create({
      token: user.generateToken(),
      user_id: user.id,
    });

    res.send({ user, token: token.token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    const _ = await Token.destroy({
      where: {
        user_id: req.user.id,
        token: req.token,
      },
    });

    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/users/me", auth, updateUserValidator, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const _ = req.user.destroy();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    const _ = Token.destroy({
      where: {
        user_id: req.user.id,
      },
    });
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
