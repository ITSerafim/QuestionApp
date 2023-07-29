const express = require("express");
const db = require("./database.js");

const router = express.Router();

router.get("/questions", (req, res) => {
  try {
    db.all("SELECT * FROM questions", (err, rows) => {
      return res.send({ message: "success", data: rows });
    });
  } catch (error) {
    throw new Error(error);
  }
});
router.get("/questions/:id", (req, res) => {
  try {
    db.all(
      `SELECT * FROM questions WHERE id = ${req.params.id}`,
      (err, row) => {
        return res.send({ message: "success", data: row });
      }
    );
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/questions", (req, res) => {
  try {
    db.run(
      `INSERT INTO questions (text, date) VALUES ('${
        req.body.text
      }', '${Date.now()}')`
    );

    return res.send({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/user");
router.post("/user");

module.exports = router;
