const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listSchema = new schema({
  todo: { type: String, required: true },
  completed: String,
});
module.exports = mongoose.model("List", listSchema);
