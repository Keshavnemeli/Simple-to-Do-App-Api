const app = require("./src/app")
// const sequelize = require('./src/database/sequelize')

const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('index'))


app.listen(port, () =>
  console.log("Server is up and running on port: " + port)
);

