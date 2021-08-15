const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.static(path.resolve(__dirname, "src")));

app.get("/:id", (req, res) => {
  if (req.params.id)
    res.sendFile(path.resolve(__dirname, "src/html", "coursePage.html"));
});

app.listen(port, () => {
  console.log(`서버가 ${port}에서 실행중...`);
});
