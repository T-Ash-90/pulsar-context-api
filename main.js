const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let server = null;

// -------------------------
// List all open files
// -------------------------
function listOpenFiles() {
  if (!atom || !atom.workspace) return { files: [] };

  const editors = atom.workspace.getTextEditors();
  const roots = atom.project.getPaths();

  const results = editors.map(editor => {
    const filePath = editor.getPath();
    if (!filePath) return null;

    let relPath = filePath;
    for (const root of roots) {
      if (filePath.startsWith(root)) {
        relPath = path.relative(root, filePath);
        break;
      }
    }

    return {
      path: relPath,
      content: editor.getText()
    };
  }).filter(Boolean);

  return { files: results };
}

// -------------------------
// Plugin lifecycle
// -------------------------
module.exports = {
  activate() {
    console.log('Activating Pulsar Context API plugin...');

    const app = express();
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

    server = app.listen(8765, '127.0.0.1', () => {
      console.log('Pulsar Context API server running at http://127.0.0.1:8765');
    });
  },

  deactivate() {
    if (server) {
      server.close(() => {
        console.log('Pulsar Context API server stopped.');
        server = null;
      });
    }
  }
};
