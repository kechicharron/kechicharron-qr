const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = __dirname;
const publicDir = path.join(root, 'public');
const ordersFile = path.join(root, 'orders.json');
const port = process.env.PORT || 3000;
const reportUser = process.env.REPORT_USER || 'admin';
const reportPassword = process.env.REPORT_PASSWORD || 'cambiar-esta-clave';

if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, '[]');

function readOrders() {
  try { return JSON.parse(fs.readFileSync(ordersFile, 'utf8')); }
  catch { return []; }
}

function saveOrders(orders) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function reportAuthorized(req, res) {
  const header = req.headers.authorization || '';
  const encoded = header.startsWith('Basic ') ? header.slice(6) : '';
  let credentials = '';
  try { credentials = Buffer.from(encoded, 'base64').toString('utf8'); }
  catch { credentials = ''; }
  if (credentials === `${reportUser}:${reportPassword}`) return true;
  res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Reportes K.E. Chicharrón", charset="UTF-8"' });
  res.end('Acceso privado');
  return false;
}

function bodyFrom(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(new Error('JSON inválido')); }
    });
  });
}

function serveStatic(req, res) {
  const requested = decodeURIComponent(req.url.split('?')[0]);
  const relative = requested === '/' ? '/index.html' : requested;
  const target = path.normalize(path.join(publicDir, relative));
  const rootPrefix = publicDir.endsWith(path.sep) ? publicDir : publicDir + path.sep;
  const rootImage = path.normalize(path.join(root, relative));
  const file = target.startsWith(rootPrefix) && fs.existsSync(target) ? target : rootImage;
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json' };
  if (!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); return res.end('No encontrado');
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    if ((req.url === '/reportes.html' || req.url === '/api/report-orders') && !reportAuthorized(req, res)) return;
    if (req.url === '/api/report-orders' && req.method === 'GET') {
      return sendJson(res, 200, readOrders());
    }
    if (req.url === '/api/orders' && req.method === 'GET') {
      return sendJson(res, 200, readOrders());
    }
    if (req.url === '/api/orders' && req.method === 'POST') {
      const data = await bodyFrom(req);
      if (!data.table || !Array.isArray(data.items) || data.items.length === 0) return sendJson(res, 400, { error: 'Mesa y productos son obligatorios' });
      const order = {
        id: crypto.randomUUID(),
        table: String(data.table).trim(),
        note: String(data.note || '').trim(),
        items: data.items,
        total: Number(data.total) || 0,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      const orders = readOrders();
      orders.unshift(order);
      saveOrders(orders);
      return sendJson(res, 201, order);
    }
    const statusMatch = req.url.match(/^\/api\/orders\/([^/]+)\/status$/);
    if (statusMatch && req.method === 'PATCH') {
      const data = await bodyFrom(req);
      const orders = readOrders();
      const order = orders.find(item => item.id === statusMatch[1]);
      if (!order) return sendJson(res, 404, { error: 'Pedido no encontrado' });
      order.status = data.status === 'ready' ? 'ready' : 'pending';
      order.readyAt = order.status === 'ready' ? new Date().toISOString() : null;
      saveOrders(orders);
      return sendJson(res, 200, order);
    }
    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

server.listen(port, () => console.log(`Kechicharrón QR disponible en http://localhost:${port}`));
