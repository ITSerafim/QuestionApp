const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const database = require("./database.js");

const app = express();

app.use(cors());
app.use(express.json());

const tableConfig = [
  {
    tableName: "test",
    tableColumns: [
      {
        name: "id",
        type: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
      },
    ],
  },
];

const test = database.init(tableConfig);

console.log(test)

// function initDb() {
//   db.run(
//     "CREATE TABLE IF NOT EXISTS questions ( id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, date TIMESTAMP )"
//   );

//   db.run(
//     "CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), password TEXT,   created_at TIMESTAMP )"
//   );
// }

app.use("/", router);

function bootstrap() {
  try {
    app.listen(7000, (req, res) => console.log("http://localhost:7000"));
  } catch (error) {
    throw new Error(error);
  }
}

bootstrap();
