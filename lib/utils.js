const path = require('path');
const { clipboard } = require('electron');
const ignore = require('ignore');

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

function getProjectTree() {
  if (!atom || !atom.project) return { tree: '' };

  const roots = atom.project.getPaths();
  if (roots.length === 0) return { tree: '' };

  const ig = ignore().add(['.git/**', 'node_modules/**']);
  let combinedTree = '';

  for (const projectRoot of roots) {
    try {
      const gitignorePath = path.join(projectRoot, '.gitignore');
      const gitignoreContent = require('fs').readFileSync(gitignorePath, 'utf8');
      ig.add(gitignoreContent.split('\n'));
    } catch (err) {
    }

    const projectName = path.basename(projectRoot);
    combinedTree += `${projectName}/\n`;

    function walkDir(dir, relativeTo = projectRoot) {
      let tree = '';
      try {
        const entries = require('fs').readdirSync(dir, { withFileTypes: true });

        for (const entry of entries.sort((a, b) => {
          if (a.isDirectory() !== b.isDirectory()) {
            return a.isDirectory() ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        })) {
          if (entry.name.startsWith('.')) continue;

          const fullPath = path.join(dir, entry.name);
          const relativePath = path.relative(projectRoot, fullPath);

          if (ig.ignores(relativePath)) continue;

          const depth = relativePath.split(/[\\/]/).length;
          const indent = '    '.repeat(depth);
          tree += `${indent}${entry.name}${entry.isDirectory() ? '/' : ''}\n`;

          if (entry.isDirectory()) {
            tree += walkDir(fullPath, relativeTo);
          }
        }
      } catch (err) {
        console.error('Error reading directory:', dir, err);
      }
      return tree;
    }

    combinedTree += walkDir(projectRoot);
    combinedTree += '\n';
  }

  return { tree: combinedTree.trim() };
}


async function copyProjectTree() {
  try {
    const data = getProjectTree();

    if (!data.tree.trim()) {
      atom.notifications.addWarning('Project tree is empty or could not be read');
      return;
    }

    await navigator.clipboard.writeText(data.tree);
    atom.notifications.addSuccess('Copied project tree to clipboard!');
  } catch (err) {
    console.error(err);
    atom.notifications.addError('Failed to copy project tree: ' + err.message);
  }
}

module.exports = { listOpenFiles, copyOpenFiles, getProjectTree, copyProjectTree };
