// Existing code
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const axios = require('axios');  // Make sure you've installed axios

app.get('/turn-on', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.0.208/relay/0', {
      params: {
        turn: 'on'
      }
    });
    if (response.data.ison) {
      res.send('Successfully turned on rice cooker');
    } else {
      res.send('Failed to turn on');
    }
  } catch (error) {
    res.send('Error occurred');
  }
});

app.get('/turn-off', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.0.208/relay/0', {
      params: {
        turn: 'off'
      }
    });
    if (!response.data.ison) {
      res.send('Successfully turned off rice cooker');
    } else {
      res.send('Failed to turn off');
    }
  } catch (error) {
    res.send('Error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

