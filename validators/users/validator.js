const bcrypt = require("bcryptjs");

const updateUserValidator = async (req, res, next) => {
  const updates = Object.keys(req.body);
  allowedUpdates = ["email", "name", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (
    req.body.password &&
    !(await bcrypt.compare(req.body.password, req.user.getUserHashedPassword()))
  ) {
    return res.status(400).send({ error: "Invalid password" });
  }

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid operation" });
  }
  next();
};

module.exports = updateUserValidator;
