const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));  // Serve static files from 'public' folder

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

