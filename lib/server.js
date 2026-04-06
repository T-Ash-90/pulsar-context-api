const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { listOpenFiles } = require('./utils.js');

let server = null;

function startServer(port = 8765) {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.post('/files', (req, res) => {
    try {
      const data = listOpenFiles();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  server = app.listen(port, '127.0.0.1', () => {
    console.log(`Pulsar Context API server running at http://127.0.0.1:${port}`);
  });

  return server;
}

function stopServer() {
  if (server) {
    server.close(() => {
      console.log('Pulsar Context API server stopped.');
      server = null;
    });
  }
}

module.exports = { startServer, stopServer };
