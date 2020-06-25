const app = require("./index");
const port = process.env.PORT || 3000;
require("dotenv").config();
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
