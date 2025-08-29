const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 정적 파일 제공 (HTML, CSS, JS 등)
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로 ('/') 요청 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`SERVER http://localhost:${port} is Running.`);
});