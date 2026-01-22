const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const server = http.createServer((req, res) => {
  // Determina il file da servire
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Estensione del file
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  // Imposta il tipo di contenuto
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }
  
  // Leggi e servi il file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File non trovato, servi index.html
        fs.readFile('./index.html', (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Altro errore
        res.writeHead(500);
        res.end('Sorry, error: ' + error.code);
      }
    } else {
      // File trovato
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('✅ Server Node.js puro avviato!');
  console.log(`🌐 Apri: http://localhost:${PORT}`);
  console.log('🛑 Ferma: Ctrl+C');
});