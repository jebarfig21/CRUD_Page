const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const frontendPath = path.join(__dirname, '..', 'frontend');

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
