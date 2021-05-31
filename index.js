const app = require("./src/app")
// const sequelize = require('./src/database/sequelize')

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('index'))


app.listen(port, () =>
  console.log("Server is up and running on port: " + port)
);

