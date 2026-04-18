const { copyOpenFiles, copyProjectTree } = require('./utils.js');

let copyButton = null;
let copyTreeButton = null;

function createCopyButton() {

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  buttonContainer.style.position = 'absolute';
  buttonContainer.style.zIndex = 1000;
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '8px';
  buttonContainer.style.alignItems = 'center';

  copyButton = document.createElement('button');
  copyButton.textContent = 'Copy Files';
  copyButton.style.padding = '0 12px';
  copyButton.style.margin = '0';
  copyButton.style.fontSize = '13px';
  copyButton.style.fontWeight = '500';
  copyButton.style.border = 'none';
  copyButton.style.background = '#0f62fe';
  copyButton.style.color = '#fff';
  copyButton.style.cursor = 'pointer';
  copyButton.style.height = '28px';
  copyButton.style.lineHeight = '28px';
  copyButton.style.borderRadius = '6px';
  copyButton.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
  copyButton.style.transition = 'background 0.2s ease, transform 0.1s ease';

  copyButton.onmouseover = () => copyButton.style.background = '#0353e9';
  copyButton.onmouseout = () => copyButton.style.background = '#0f62fe';
  copyButton.onclick = copyOpenFiles;

  copyTreeButton = document.createElement('button');
  copyTreeButton.textContent = 'Copy Tree';
  copyTreeButton.style.padding = '0 12px';
  copyTreeButton.style.margin = '0';
  copyTreeButton.style.fontSize = '13px';
  copyTreeButton.style.fontWeight = '500';
  copyTreeButton.style.border = 'none';
  copyTreeButton.style.background = '#28a745';
  copyTreeButton.style.color = '#fff';
  copyTreeButton.style.cursor = 'pointer';
  copyTreeButton.style.height = '28px';
  copyTreeButton.style.lineHeight = '28px';
  copyTreeButton.style.borderRadius = '6px';
  copyTreeButton.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
  copyTreeButton.style.transition = 'background 0.2s ease, transform 0.1s ease';

  copyTreeButton.onmouseover = () => copyTreeButton.style.background = '#1e7e34';
  copyTreeButton.onmouseout = () => copyTreeButton.style.background = '#28a745';
  copyTreeButton.onclick = copyProjectTree;

  buttonContainer.appendChild(copyTreeButton);
  buttonContainer.appendChild(copyButton);

  const tabBar = document.querySelector('.tab-bar');
  if (tabBar) {
    tabBar.style.position = 'relative';
    buttonContainer.style.top = `${tabBar.offsetHeight + 8}px`;
    buttonContainer.style.right = '16px';
    tabBar.appendChild(buttonContainer);
  } else {
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '30px';
    buttonContainer.style.right = '24px';
    document.body.appendChild(buttonContainer);
  }
}

function removeCopyButton() {
  const buttonContainer = document.querySelector('.button-container') ||
                         (copyButton && copyButton.parentElement);
  if (buttonContainer) {
    buttonContainer.remove();
  }
  copyButton = null;
  copyTreeButton = null;
}

module.exports = { createCopyButton, removeCopyButton };
