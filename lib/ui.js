const { copyOpenFiles } = require('./utils.js');

let copyButton = null;

function createCopyButton() {
  copyButton = document.createElement('button');
  copyButton.textContent = 'Copy Files';
  copyButton.style.position = 'absolute';
  copyButton.style.zIndex = 1000;
  copyButton.style.padding = '0 10px';
  copyButton.style.margin = '0';
  copyButton.style.fontSize = '13px';
  copyButton.style.fontWeight = '500';
  copyButton.style.border = 'none';
  copyButton.style.background = '#0f62fe';
  copyButton.style.color = '#fff';
  copyButton.style.cursor = 'pointer';
  copyButton.style.height = '24px';
  copyButton.style.lineHeight = '24px';
  copyButton.style.borderRadius = '12px';
  copyButton.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
  copyButton.style.transition = 'background 0.2s ease, transform 0.1s ease';

  copyButton.onmouseover = () => copyButton.style.background = '#0353e9';
  copyButton.onmouseout = () => copyButton.style.background = '#0f62fe';
  copyButton.onclick = copyOpenFiles;

  const tabBar = document.querySelector('.tab-bar');
  if (tabBar) {
    tabBar.style.position = 'relative';
    copyButton.style.top = `${tabBar.offsetHeight + 4}px`;
    copyButton.style.right = '8px';
    tabBar.appendChild(copyButton);
  } else {
    copyButton.style.position = 'fixed';
    copyButton.style.top = '32px';
    copyButton.style.right = '8px';
    document.body.appendChild(copyButton);
  }
}

function removeCopyButton() {
  if (copyButton) {
    copyButton.remove();
    copyButton = null;
  }
}

module.exports = { createCopyButton, removeCopyButton };
