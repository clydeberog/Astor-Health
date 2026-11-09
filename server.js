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

// Health check endpoint for Cloudflare Tunnel / monitoring
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// SPA fallback: Return index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Listen on all network interfaces (IPv4 and IPv6 localhost)
const server = app.listen(PORT, () => {
  console.log(`Astor Health server is running and listening on port ${PORT}`);
  console.log(`Accessible at: http://localhost:${PORT} and http://127.0.0.1:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EACCES') {
    console.error(`Permission denied binding to port ${PORT}. Run with sudo, or use an unprivileged port like PORT=3000.`);
  } else {
    console.error('Server error:', err);
  }
});
