var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.get("/todos", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM items ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/todos", (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  //console.log(req.body)
  const newText = req.body.text;
  const newComplete = req.body.complete;
  //db("INSERT INTO items(text,complete) VALUES('',0);")
  db(
    `INSERT INTO items(text,complete) VALUES(${JSON.stringify(
      newText
    )}, ${newComplete});`
  )
    .then(results => {
      res.send(results.data);
      res.status(200).send("item added in todo");
    })
    .catch(err => res.status(500).send(err));
});

router.put("/todos/:todo_id", (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  const newId = req.params["todo_id"];
  const newText = req.body.text;
  db(`UPDATE items SET text = ${JSON.stringify(newText)} WHERE id = ${newId};`)
    .then(results => {
      res.send(results.data);
      console.log(results.data);
      res.status(200).send("item is being updated");
    })
    .catch(err => res.status(500).send(err));
});

router.delete("/todos/:todo_id", (req, res) => {
  // URL params are available in req.params
  db("DELETE FROM items WHERE id = parseInt(req.params.id)");
  return parseInt(e.id) !== parseInt(req.params.id);
});

module.exports = router;
