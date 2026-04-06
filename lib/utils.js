const path = require('path');
const { clipboard } = require('electron');

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

async function copyOpenFiles() {
  try {
    const data = listOpenFiles();
    const jsonString = JSON.stringify(data, null, 2);

    await navigator.clipboard.writeText(jsonString);
    atom.notifications.addSuccess('Copied open files JSON to clipboard!');
  } catch (err) {
    console.error(err);
    atom.notifications.addError('Failed to copy open files: ' + err.message);
  }
}

module.exports = { listOpenFiles, copyOpenFiles };
