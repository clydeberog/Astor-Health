import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Default to port 80 for standard web traffic without Nginx, or process.env.PORT
const PORT = process.env.PORT || 80;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: Return index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Astor Health production server listening on http://0.0.0.0:${PORT}`);
});
