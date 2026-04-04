# Pulsar Context API

A minimal Pulsar plugin that exposes an HTTP API endpoint to get the full content of all open files in [Pulsar] (https://pulsar-edit.dev/). Useful for feeding context to LLMs or other automation tools.

---

## Features

- /files endpoint: returns JSON with all open files and their contents.
- Server starts automatically when the plugin is enabled.
- Server stops automatically when the plugin is disabled.
- No other dependencies besides express and body-parser.
- Designed for simplicity: only considers files you currently have open.

---

## Installation

1. Clone or copy this repository into your Pulsar packages folder:

```bash
~/.pulsar/packages/pulsar-context-api/
```

2. Install dependencies:

```bash
cd ~/.pulsar/packages/pulsar-context-api
npm install
```

3. Start Pulsar, go to Packages → pulsar-context-api → Enable.

---

## Usage

1. Open some files in Pulsar that you want your LLM or script to access.
2. The plugin starts an HTTP server on 127.0.0.1:8765.
3. Use the /files endpoint:

```bash
curl -X POST http://127.0.0.1:8765/files \
  -H "Content-Type: application/json" \
  -d '{}' | jq
```

Example response:

```bash
{
  "files": [
    {
      "path": "src/main.py",
      "content": "print('Hello world')\n"
    },
    {
      "path": "README.md",
      "content": "# Project README\n..."
    }
  ]
}
```

---

## Notes

- Only files currently open in the editor are included.
- Paths are relative to the project root.
- The plugin must run inside Pulsar; do not run node main.js manually.

---

## Dependencies

- Express (https://www.npmjs.com/package/express)
- Body-parser (https://www.npmjs.com/package/body-parser)

---

## License

MIT
