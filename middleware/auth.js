const jwt = require("jsonwebtoken");
const { User, sequelize, Token } = require("../models");
const { QueryTypes } = require("sequelize");

const auth = async (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "abc123");
    const user = await sequelize.query(
      `SELECT * FROM users u
      INNER JOIN tokens t
        on u.id = t.user_id
        where u.id = ${decoded.id} and t.token = '${token}'
    `,
      { type: QueryTypes.SELECT }
    );

    if (user.length === 0) {
      throw new Error();
    }
    req.token = token;
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (e) {
    res.status(401).send({ error: "Authentication Falied." });
  }
};

module.exports = auth;
