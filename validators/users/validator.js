const updateUserValidator = (req, res, next) => {
  const updates = Object.keys(req.body);
  allowedUpdates = ["email", "name", "passsword"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid operation" });
  }
  next();
};

module.exports = updateUserValidator;
