const express = require('express');
const request = require('request');
const axios = require('axios');
const marked = require('marked');
const db = require('./db');
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/Flixnore/felixs-rice-cooker-com/main/README.md');
    const readme = response.data;
    const htmlContent = marked.parse(readme);
    res.send(`
      <html>
        <body>
          <a href="/">Back to Home</a>
          ${htmlContent}
        </body>
      </html>
    `);
  } catch (error) {
    console.log('Error fetching README:', error);
    res.status(500).send('Could not fetch README');
  }
});

app.get('/get-status', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.0.208/relay/0');
    const isOn = response.data.ison;
    res.json({ isOn });
  } catch (error) {
    res.status(500).send('Error occurred');
  }
});

async function handleRiceCookerAction(req, res, action) {
  const name = req.query.name;
  const message = req.query.message || null;  // messages are optional
  if (!name) {
    return res.status(400).send("Name is required");
  }
  try {
    const response = await axios.get('http://192.168.0.208/relay/0', {
      params: {
        turn: action
      }
    });
    const isOn = response.data.ison;

    if ((action === 'on' && isOn) || (action === 'off' && !isOn)) {
      if (name !== process.env.IGNORED_NAME) {
        db.run("INSERT INTO logs (name, action, message) VALUES (?, ?, ?)", [name, action, message]);  // Updated query
      }
      res.send(`Successfully turned ${action} rice cooker`);
    } else {
      res.send(`Failed to turn ${action}`);
    }
  } catch (error) {
    res.send('Error occurred');
  }
}


app.get('/turn-on', (req, res) => handleRiceCookerAction(req, res, 'on'));
app.get('/turn-off', (req, res) => handleRiceCookerAction(req, res, 'off'));

app.get('/video-stream', async (req, res) => {
  req.pipe(request.get("http://192.168.0.200:8080/?action=stream")).pipe(res);
});

// Fetch logs
app.get('/fetch-logs', (req, res) => {
  db.all("SELECT * FROM logs ORDER BY timestamp DESC", [], (err, rows) => {
    if (err) {
      res.status(400).send("Error fetching logs");
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

