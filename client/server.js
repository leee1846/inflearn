const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "./"));
app.use(express.static(__dirname + "./css"));

// 라우팅 정의
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Listen : ${PORT}`);
});
