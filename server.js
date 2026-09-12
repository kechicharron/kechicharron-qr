const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = __dirname;
const publicDir = fs.existsSync(path.join(root, 'index.html')) ? root : path.join(root, 'public');
const ordersFile = path.join(root, 'orders.json');
const port = process.env.PORT || 3000;
const reportUser = process.env.REPORT_USER || 'admin';
const reportPassword = process.env.REPORT_PASSWORD || 'cambiar-esta-clave';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseOrdersUrl = supabaseUrl ? `${supabaseUrl.replace(/\/$/, '')}/rest/v1/orders` : '';

if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, '[]');

function readOrders() {
  try { return JSON.parse(fs.readFileSync(ordersFile, 'utf8')); }
  catch { return []; }
}

function saveOrders(orders) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

function fromDatabase(row) {
  return {
    id: row.id,
    table: row.table_number,
    note: row.note || '',
    items: row.items,
    total: Number(row.total) || 0,
    status: row.status,
    createdAt: row.created_at,
    readyAt: row.ready_at,
    deliveryType: row.delivery_type || 'mesa',
    paymentMethod: row.payment_method || 'efectivo',
    address: row.address || '',
    phone: row.phone || ''
  };
}

function toDatabase(order) {
  return {
    id: order.id,
    table_number: order.table,
    note: order.note,
    items: order.items,
    total: order.total,
    status: order.status,
    created_at: order.createdAt,
    ready_at: order.readyAt || null,
    delivery_type: order.deliveryType || 'mesa',
    payment_method: order.paymentMethod || 'efectivo',
    address: order.address || '',
    phone: order.phone || ''
  };
}

async function databaseRequest(options = {}) {
  const requestUrl = options.requestUrl || supabaseOrdersUrl;
  const response = await fetch(requestUrl, {
    ...options,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!response.ok) throw new Error(`Supabase respondió ${response.status}: ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

async function getOrders() {
  if (!supabaseOrdersUrl || !supabaseKey) return readOrders();
  const rows = await databaseRequest({ method: 'GET', requestUrl: `${supabaseOrdersUrl}?select=*&order=created_at.desc` });
  return rows.map(fromDatabase);
}

async function createOrder(order) {
  if (!supabaseOrdersUrl || !supabaseKey) {
    const orders = readOrders();
    orders.unshift(order);
    saveOrders(orders);
    return order;
  }
  const rows = await databaseRequest({ method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(toDatabase(order)) });
  return fromDatabase(rows[0]);
}

async function updateOrderStatus(id, status, readyAt) {
  if (!supabaseOrdersUrl || !supabaseKey) {
    const orders = readOrders();
    const order = orders.find(item => item.id === id);
    if (!order) return null;
    order.status = status;
    order.readyAt = readyAt;
    saveOrders(orders);
    return order;
  }
  const rows = await databaseRequest({
    method: 'PATCH',
    requestUrl: `${supabaseOrdersUrl}?id=eq.${encodeURIComponent(id)}`,
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ status, ready_at: readyAt })
  });
  return rows[0] ? fromDatabase(rows[0]) : null;
}

async function deleteOrder(id) {
  if (!supabaseOrdersUrl || !supabaseKey) {
    const orders = readOrders();
    const remaining = orders.filter(item => item.id !== id);
    if (remaining.length === orders.length) return false;
    saveOrders(remaining);
    return true;
  }
  await databaseRequest({
    method: 'DELETE',
    requestUrl: `${supabaseOrdersUrl}?id=eq.${encodeURIComponent(id)}`
  });
  return true;
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
      return sendJson(res, 200, await getOrders());
    }
    if (req.url === '/api/orders' && req.method === 'GET') {
      return sendJson(res, 200, await getOrders());
    }
    if (req.url === '/api/orders' && req.method === 'POST') {
      const data = await bodyFrom(req);
      const deliveryType = data.deliveryType === 'domicilio' ? 'domicilio' : 'mesa';
      const hasItems = Array.isArray(data.items) && data.items.length > 0;
      if (!hasItems) return sendJson(res, 400, { error: 'Los productos son obligatorios' });
      if (deliveryType === 'domicilio') {
        if (!data.address || !data.phone) return sendJson(res, 400, { error: 'La dirección y el celular del domicilio son obligatorios' });
      } else if (!data.table || !String(data.table).trim()) {
        return sendJson(res, 400, { error: 'La mesa es obligatoria' });
      }
      const order = {
        id: crypto.randomUUID(),
        table: String(data.table || 'Domicilio').trim() || 'Domicilio',
        note: String(data.note || '').trim(),
        items: data.items,
        total: Number(data.total) || 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
        deliveryType,
        paymentMethod: data.paymentMethod || 'efectivo',
        address: String(data.address || '').trim(),
        phone: String(data.phone || '').trim()
      };
      return sendJson(res, 201, await createOrder(order));
    }
    const statusMatch = req.url.match(/^\/api\/orders\/([^/]+)\/status$/);
    if (statusMatch && req.method === 'PATCH') {
      const data = await bodyFrom(req);
      const validStatuses = ['pending', 'ready', 'delivered', 'cancelled'];
      const status = validStatuses.includes(data.status) ? data.status : 'pending';
      const order = await updateOrderStatus(statusMatch[1], status, status === 'ready' ? new Date().toISOString() : null);
      if (!order) return sendJson(res, 404, { error: 'Pedido no encontrado' });
      return sendJson(res, 200, order);
    }
    const deleteMatch = req.url.match(/^\/api\/orders\/([^/]+)$/);
    if (deleteMatch && req.method === 'DELETE') {
      const deleted = await deleteOrder(deleteMatch[1]);
      if (!deleted) return sendJson(res, 404, { error: 'Pedido no encontrado' });
      return sendJson(res, 200, { ok: true });
    }
    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

server.listen(port, () => console.log(`Kechicharrón QR disponible en http://localhost:${port}`));
