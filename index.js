const http = require('http');
const url = require('url');
const { productController } = require('./modules/product');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/products') {
    return await productController.getProducts(req, res);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/products') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        req.body = JSON.parse(body); // Parsear el JSON del cuerpo
        return await productController.createProduct(req, res);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});