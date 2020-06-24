const express = require("express");
const router = express.Router();
const List = require("../../models/list");

router.get("/", async function (req, res, next) {
  let results = await List.find({});
  res.status(200).json({
    list: results,
  });
});
router.post("/", function (req, res, next) {
  const list = new List({
    todo: req.body.todo,
    completed: req.body.completed,
  });
  list.save().then((result) => {
    res.status(200).json({
      createdList: list,
    });
  });
});
router.patch("/:listId", function (req, res, next) {
  const list = {
    todo: req.body.todo,
    completed: req.body.completed,
  };
  List.findByIdAndUpdate(req.params.listId, list)
    .exec()
    .then((result) => {
      res.status(200).json({
        updatedList: result,
      });
    });
});
router.delete("/:listId", function (req, res, next) {
  List.findByIdAndDelete(req.params.listId)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "deleted list",
      });
    });
});
module.exports = router;
