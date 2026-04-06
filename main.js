const { startServer, stopServer } = require('./lib/server.js');
const { createCopyButton, removeCopyButton } = require('./lib/ui.js');

let server = null;

module.exports = {
  activate() {
    console.log('Activating Pulsar Context API plugin...');
    server = startServer();
    createCopyButton();
  },

  deactivate() {
    stopServer();
    removeCopyButton();
  }
};
