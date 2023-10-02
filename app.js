const express = require('express');
const request = require('request');
const axios = require('axios');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());  // To parse JSON bodies
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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
      res.send(`Successfully turned ${action} rice cooker`);
      db.run("INSERT INTO logs (name, action, message) VALUES (?, ?, ?)", [name, action, message]);  // Updated query
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

