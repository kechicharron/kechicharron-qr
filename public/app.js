const paymentConfig = {
  nequi: { label: 'Nequi', help: 'Paga con Nequi y confirma el pago en WhatsApp.', appLink: 'nequi://', fallback: 'https://www.nequi.com.co/' },
  daviplata: { label: 'Daviplata', help: 'Paga con Daviplata y confirma el pago en WhatsApp.' },
  breb: { label: 'BRE-B / transferencia', help: 'Haz la transferencia y confirma el comprobante en WhatsApp.' },
  efectivo: { label: 'Efectivo', help: 'Paga en efectivo al recibir el pedido.' }
};
const brebNumber = '0087273238';

const menu = [
  { category: 'Favoritos', name: 'Patacón relleno', description: 'Pollo, cerdo, butifarra, mozzarella, maíz y salsas.', price: 20000, image: 'patacon relleno .jpg' },
  { category: 'Chicharrones', name: 'Chicharrón personal', description: 'Con yuca o patacones y suero.', price: 17000, image: 'chicharron de 17mil.jpg' },
  { category: 'Chicharrones', name: 'Chicharrón doble', description: 'Una porción generosa para compartir.', price: 30000, image: 'chicharron doble.jpg' },
  { category: 'Asados', name: 'Chuletazo', description: 'Acompañado con patacones y ensalada.', price: 20000, image: 'chuletazo.jpg' },
  { category: 'Asados', name: 'Carne asada', description: 'Carne a la parrilla con el sabor de la casa.', price: 22000, image: 'carne asada.jpg' },
  { category: 'Asados', name: 'Pechuga asada', description: 'Acompañada con patacones, yuca o papitas y ensalada.', price: 20000, image: 'pechuga gratinada.jpg' },
  { category: 'Asados', name: 'Pechuga gratinada', description: 'Pechuga gratinada con papas o patacones y ensalada.', price: 25000, image: 'pechuga gratinada.jpg' },
  { category: 'Asados', name: 'Asado mixto', description: 'Pechuga, chuleta y carne, acompañado con patacones o papas a la francesa.', price: 30000, image: 'asado mixto.jpg' },
  { category: 'BBQ', name: 'Alitas BBQ (6 unidades)', description: 'Alitas bañadas en salsa BBQ.', price: 15000, image: 'picada alitas 50.000.jpg' },
  { category: 'BBQ', name: 'Alitas BBQ (9 unidades)', description: 'Alitas bañadas en salsa BBQ.', price: 25000, image: 'picada alitas 50.000.jpg' },
  { category: 'BBQ', name: 'Picada de alitas BBQ', description: '18 alitas BBQ para compartir.', price: 50000, image: 'picada alitas 50.000.jpg' },
  { category: 'BBQ', name: 'Chicharrón BBQ', description: 'Chicharrón bañado en salsa BBQ.', price: 20000, image: 'chicharron doble.jpg' },
  { category: 'BBQ', name: 'Costillas BBQ personal', description: 'Porción individual acompañada con papitas o patacones.', price: 20000, image: 'costillas bbq normal y doble.jpg' },
  { category: 'BBQ', name: 'Costillas BBQ doble', description: 'Porción doble acompañada con papitas o patacones.', price: 30000, image: 'costillas bbq normal y doble.jpg' },
  { category: 'Arroces', name: 'Arroz paisa personal', description: 'Con cerdo, pollo, chorizo, jamón, chicharrón, plátano y maíz.', price: 15000, image: 'arroz paisa normal .jpg' },
  { category: 'Arroces', name: 'Arroz paisa dúo', description: 'Con cerdo, pollo, chorizo, jamón, chicharrón, plátano y maíz.', price: 30000, image: 'arroz paisa normal .jpg' },
  { category: 'Arroces', name: 'Arroz paisa trío', description: 'Con cerdo, pollo, chorizo, jamón, chicharrón, plátano y maíz.', price: 40000, image: 'arroz paisa normal .jpg' },
  { category: 'Arroces', name: 'Arroz paisa familiar', description: 'Con cerdo, pollo, chorizo, jamón, chicharrón, plátano y maíz.', price: 50000, image: 'arroz paisa normal .jpg' },
  { category: 'Especiales', name: 'Plato especial para picar', description: 'Chicharrón, arroz paisa, patacones, ensalada y suero.', price: 30000, image: 'especial para picar.jpg' },
  { category: 'Picadas', name: 'Picada de chicharrón', description: 'Chicharrón, alitas BBQ o fritas, yuca, patacones y ensalada.', price: 50000, image: 'picada de chicharron.jpg' },
  { category: 'Picadas', name: 'Picada de salchipapa mediana', description: 'Pollo, cerdo, queso, mozzarella, papa, salchicha, ripio, salsas y butifarra.', price: 40000, image: 'picada de salchipapa mediana y grande.jpg' },
  { category: 'Picadas', name: 'Picada de salchipapa grande', description: 'Pollo, cerdo, queso, mozzarella, papa, salchicha, ripio, salsas y butifarra.', price: 55000, image: 'picada de salchipapa mediana y grande.jpg' },
  { category: 'Picadas', name: 'Picada mixta para 2', description: 'Chicharrón, alitas BBQ o fritas, yuca y patacones.', price: 35000, image: 'picada mixta.jpg' },
  { category: 'Picadas', name: 'Picada mixta para 2 BBQ', description: 'Costillas BBQ, alitas BBQ, patacón, papitas, ensalada y suero.', price: 40000, image: 'picada mixta.jpg' },
  { category: 'Picadas', name: 'Picada familiar', description: 'Chicharrón, alitas BBQ o fritas, yuca, patacones, suero y arroz paisa.', price: 70000, image: 'picada familiar de chicharron.jpg' },
  { category: 'Picadas', name: 'Picada mega familiar', description: 'Chicharrón, alitas BBQ, salchipapas, costilla BBQ, yuca, patacones, suero y arroz paisa.', price: 100000, image: 'picada familiar de chicharron.jpg' },
  { category: 'Perros calientes', name: 'Perro súper', description: 'Perro caliente de la casa.', price: 12000, image: 'incono.jpg' },
  { category: 'Perros calientes', name: 'Choriperro', description: 'Perro caliente con chorizo.', price: 15000, image: 'incono.jpg' },
  { category: 'Hamburguesas', name: 'Hamburguesa de carne', description: 'Acompañada con papas a la francesa.', price: 17000, image: 'hambuerguesa.jpg' },
  { category: 'Hamburguesas', name: 'Hamburguesa de pollo', description: 'Acompañada con papas a la francesa.', price: 20000, image: 'hambuerguesa.jpg' },
  { category: 'Hamburguesas', name: 'Hamburguesa mixta', description: 'Acompañada con papas a la francesa.', price: 25000, image: 'hambuerguesa.jpg' },
  { category: 'Hamburguesas', name: 'Hamburguesa la quesuda', description: 'Bañada en queso mozzarella y acompañada con papas a la francesa.', price: 23000, image: 'hambuerguesa.jpg' },
  { category: 'Salchipapas', name: 'Salchichorizo', description: 'Papas, chorizo y salsas de la casa.', price: 15000, image: 'salchichuleta.jpg' },
  { category: 'Salchipapas', name: 'Salchichuleta', description: 'Papas, chorizo, chuleta y salsas de la casa.', price: 20000, image: 'salchichuleta.jpg' },
  { category: 'Salchipapas', name: 'Salchipollo', description: 'Papas, pollo y salsas de la casa.', price: 20000, image: 'salchipollo.jpg' },
  { category: 'Salchipapas', name: 'Picada de salchipapas para dos', description: 'Pollo, cerdo, queso, mozzarella, papa, salchicha, ripio, salsas y butifarra.', price: 40000, image: 'picada de salchipapa mediana y grande.jpg' },
  { category: 'Adicionales', name: 'Papas fritas', description: 'Porción adicional.', price: 6000, image: 'incono.jpg' },
  { category: 'Adicionales', name: 'Patacones', description: 'Porción adicional.', price: 5000, image: 'incono.jpg' },
  { category: 'Adicionales', name: 'Porción de yuca', description: 'Porción adicional.', price: 4000, image: 'incono.jpg' },
  { category: 'Adicionales', name: 'Chicharrón', description: 'Porción adicional.', price: 12000, image: 'chicharron de 17mil.jpg' },
  { category: 'Bebidas', name: 'Gaseosa 400 ml', description: 'Colombiana, Coca-Cola o Sprite.', price: 4000, visual: 'drink' },
  { category: 'Bebidas', name: 'Gaseosa litro', description: 'Colombiana, Coca-Cola o Sprite.', price: 6000, visual: 'drink' },
  { category: 'Bebidas', name: 'Gaseosa 1.5 L', description: 'Colombiana, Coca-Cola o Sprite.', price: 8000, visual: 'drink' },
  { category: 'Bebidas', name: 'Agua 600 ml', description: 'Agua fría.', price: 3000, visual: 'water' },
  { category: 'Bebidas', name: 'Jugo natural', description: 'Frío y preparado al momento.', price: 4000, visual: 'juice' },
  { category: 'Granizados', name: 'Granizado pequeño', description: 'Frío, delicioso y con toppings.', price: 10000, image: 'WhatsApp Image 2026-09-11 at 23.58.44.jpeg' },
  { category: 'Granizados', name: 'Granizado mediano', description: 'El tamaño perfecto para refrescarte.', price: 15000, image: 'WhatsApp Image 2026-09-11 at 23.58.44.jpeg' },
  { category: 'Granizados', name: 'Granizado grande', description: 'Más sabor, más toppings, más disfrute.', price: 20000, image: 'WhatsApp Image 2026-09-11 at 23.58.44.jpeg' }
];
const money = value => '$' + Number(value).toLocaleString('es-CO');
const getCart = () => JSON.parse(localStorage.getItem('ke-cart') || '[]');
const saveCart = cart => localStorage.setItem('ke-cart', JSON.stringify(cart));
const toast = message => { const el = document.getElementById('toast'); if (!el) return; el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2800); };

function initMenu() {
  const grid = document.getElementById('menu-grid');
  const tabs = document.getElementById('category-tabs');
  const categories = ['Todos', ...new Set(menu.map(item => item.category))];
  let active = 'Todos';
  function draw() {
    grid.innerHTML = menu.filter(item => active === 'Todos' || item.category === active).map(item => `<article class="menu-card"><div class="product-visual ${item.visual || ''}">${item.image ? `<img src="/${encodeURI(item.image)}" alt="${item.name}">` : `<span>${item.visual === 'juice' ? '🍹' : '🥤'}</span>`}</div><div class="product-info"><p class="eyebrow">${item.category}</p><h3>${item.name}</h3><p>${item.description}</p><div><span class="price">${money(item.price)}</span><button class="add-button" data-index="${menu.indexOf(item)}" aria-label="Agregar ${item.name}">+</button></div></div></article>`).join('');
  }
  tabs.innerHTML = categories.map(category => `<button class="${category === active ? 'active' : ''}" data-category="${category}">${category}</button>`).join('');
  tabs.addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; active = button.dataset.category; tabs.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button)); draw(); });
  grid.addEventListener('click', event => { const button = event.target.closest('.add-button'); if (!button) return; const item = menu[button.dataset.index]; const cart = getCart(); const found = cart.find(row => row.name === item.name); found ? found.quantity++ : cart.push({ ...item, quantity: 1 }); saveCart(cart); updateCart(); toast(`${item.name} agregado al pedido`); });
  draw(); updateCart();
  document.getElementById('open-cart').addEventListener('click', () => document.getElementById('cart-drawer').classList.add('open'));
  document.getElementById('close-cart').addEventListener('click', () => document.getElementById('cart-drawer').classList.remove('open'));
  document.getElementById('checkout-button').addEventListener('click', () => { if (!getCart().length) return toast('Agrega al menos un producto'); document.getElementById('checkout-modal').hidden = false; });
  document.getElementById('close-checkout').addEventListener('click', () => document.getElementById('checkout-modal').hidden = true);
  document.querySelectorAll('input[name="delivery-type"]').forEach(radio => radio.addEventListener('change', toggleDeliveryFields));
  document.getElementById('payment-method').addEventListener('change', updatePaymentInfo);
  document.getElementById('copy-breb').addEventListener('click', copyBrebNumber);
  const nequiLink = document.querySelector('[data-payment="nequi"]');
  if (nequiLink) {
    nequiLink.addEventListener('click', event => {
      event.preventDefault();
      const nequiApp = 'nequi://';
      window.location.href = nequiApp;
      window.setTimeout(() => { window.location.href = 'https://www.nequi.com.co/'; }, 1200);
    });
  }
  document.getElementById('order-form').addEventListener('submit', submitOrder);
  updatePaymentInfo();
  toggleDeliveryFields();
}
function updatePaymentInfo() {
  const method = document.getElementById('payment-method').value;
  const info = document.getElementById('payment-info');
  const number = document.getElementById('breb-number');
  if (method === 'breb') {
    info.hidden = false;
    number.textContent = brebNumber;
    info.querySelector('p').textContent = 'Transfiere a la llave BRE-B de la empresa:';
  } else if (method === 'nequi') {
    info.hidden = false;
    number.textContent = brebNumber;
    info.querySelector('p').textContent = 'Paga por Nequi a la llave BRE-B de la empresa:';
  } else if (method === 'daviplata') {
    info.hidden = false;
    number.textContent = brebNumber;
    info.querySelector('p').textContent = 'Paga por Daviplata a la llave BRE-B de la empresa:';
  } else {
    info.hidden = true;
  }
}
function copyBrebNumber() {
  navigator.clipboard?.writeText(brebNumber.replace(/\s+/g, '')).then(() => toast('Número BRE-B copiado')).catch(() => toast('No se pudo copiar el número'));
}
function toggleDeliveryFields() {
  const deliveryType = document.querySelector('input[name="delivery-type"]:checked')?.value || 'mesa';
  document.getElementById('table-container').hidden = deliveryType === 'domicilio';
  document.getElementById('delivery-container').hidden = deliveryType !== 'domicilio';
  if (deliveryType === 'domicilio') {
    document.getElementById('table-number').removeAttribute('required');
    document.getElementById('delivery-address').setAttribute('required', 'required');
    document.getElementById('customer-phone').setAttribute('required', 'required');
  } else {
    document.getElementById('table-number').setAttribute('required', 'required');
    document.getElementById('delivery-address').removeAttribute('required');
    document.getElementById('customer-phone').removeAttribute('required');
  }
}
function updateCart() {
  const cart = getCart(); const list = document.getElementById('cart-items'); if (!list) return;
  document.getElementById('cart-count').textContent = cart.reduce((sum, row) => sum + row.quantity, 0);
  document.getElementById('cart-total').textContent = money(cart.reduce((sum, row) => sum + row.price * row.quantity, 0));
  list.innerHTML = cart.length ? cart.map((item, index) => `<div class="cart-row"><div><h3>${item.name}</h3><small>${money(item.price)} c/u</small><div class="qty-controls"><button data-action="minus" data-index="${index}">-</button><strong>${item.quantity}</strong><button data-action="plus" data-index="${index}">+</button></div></div><strong>${money(item.price * item.quantity)}</strong></div>`).join('') : '<div class="empty-state">Tu pedido está vacío.<br>Elige algo delicioso para comenzar.</div>';
  list.onclick = event => { const button = event.target.closest('button'); if (!button) return; const current = getCart(); const row = current[button.dataset.index]; button.dataset.action === 'plus' ? row.quantity++ : row.quantity--; saveCart(current.filter(item => item.quantity > 0)); updateCart(); };
}
async function submitOrder(event) {
  event.preventDefault();
  const cart = getCart();
  const total = cart.reduce((sum, row) => sum + row.price * row.quantity, 0);
  const deliveryType = document.querySelector('input[name="delivery-type"]:checked')?.value || 'mesa';
  const table = document.getElementById('table-number').value.trim();
  const address = document.getElementById('delivery-address').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const paymentMethod = document.getElementById('payment-method').value;
  const payload = {
    table: deliveryType === 'domicilio' ? 'Domicilio' : table,
    note: document.getElementById('order-note').value,
    items: cart,
    total,
    deliveryType,
    paymentMethod,
    address,
    phone
  };
  if (deliveryType === 'domicilio') {
    if (!address || !phone) return toast('Completa dirección y celular para el domicilio');
  } else if (!table) {
    return toast('Escribe el número de la mesa');
  }
  try {
    const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return toast(error.error || 'No se pudo enviar el pedido');
    }
  } catch {
    return toast('No hay conexión con el servidor. Intenta de nuevo.');
  }
  saveCart([]); updateCart(); document.getElementById('checkout-modal').hidden = true; document.getElementById('cart-drawer').classList.remove('open'); event.target.reset(); updatePaymentInfo(); toggleDeliveryFields(); toast(`Pedido enviado a cocina · ${paymentConfig[paymentMethod].label}`);
}

function initKitchen() {
  const clock = document.getElementById('kitchen-clock');
  const tick = () => clock.textContent = new Date().toLocaleString('es-CO', { weekday: 'long', hour: '2-digit', minute: '2-digit' }); tick(); setInterval(tick, 30000); loadOrders(); setInterval(loadOrders, 3000);
}
async function loadOrders() { const response = await fetch('/api/orders'); if (!response.ok) return; const orders = await response.json(); renderOrders(orders); }
function renderOrders(orders) {
  const pending = orders.filter(order => order.status === 'pending');
  const ready = orders.filter(order => order.status === 'ready');
  document.getElementById('pending-count').textContent = pending.length; document.getElementById('ready-count').textContent = ready.length;
  const card = order => {
    const locationLabel = order.deliveryType === 'domicilio' ? `Domicilio: ${order.address || 'sin dirección'}` : `Mesa ${order.table}`;
    const paymentLabel = paymentConfig[order.paymentMethod]?.label || 'Efectivo';
    const actions = order.status === 'ready'
      ? `<button class="ready-button delivered-button" data-id="${order.id}" data-status="delivered">Entregado</button>`
      : `<div class="order-actions"><button class="ready-button" data-id="${order.id}" data-status="ready">Marcar como listo</button><button class="cancel-button" data-id="${order.id}" data-status="cancelled">✕ Cancelar pedido</button></div>`;
    return `<article class="order-card ${order.status === 'ready' ? 'ready' : ''}"><div class="order-meta"><span class="order-table">${locationLabel}</span><span class="order-time">${new Date(order.createdAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</span></div><div class="order-summary"><span>${paymentLabel}</span><span>${order.phone ? order.phone : 'Sin teléfono'}</span></div><ul>${order.items.map(item => `<li><span>${item.quantity} × ${item.name}</span><span>${money(item.price * item.quantity)}</span></li>`).join('')}</ul>${order.note ? `<div class="order-note">Nota: ${order.note}</div>` : ''}<div class="order-total"><span>Total</span><strong>${money(order.total)}</strong></div>${actions}</article>`;
  };
  document.getElementById('pending-orders').innerHTML = pending.length ? pending.map(card).join('') : '<div class="empty-state">No hay pedidos pendientes.</div>';
  document.getElementById('ready-orders').innerHTML = ready.length ? ready.map(card).join('') : '<div class="empty-state">Los pedidos listos aparecerán aquí.</div>';
  document.querySelectorAll('.ready-button, .cancel-button').forEach(button => button.onclick = () => updateStatus(button.dataset.id, button.dataset.status));
}
async function updateStatus(id, status) {
  const messageMap = {
    ready: 'Pedido marcado como listo',
    delivered: 'Pedido entregado',
    cancelled: 'Pedido cancelado',
    pending: 'Pedido devuelto a pendientes'
  };
  const response = await fetch(`/api/orders/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
  if (response.ok) {
    toast(messageMap[status] || 'Estado actualizado');
    loadOrders();
  }
}

function initReports() {
  const monthInput = document.getElementById('report-month');
  const now = new Date();
  monthInput.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  monthInput.addEventListener('change', loadReport);
  loadReport();
}
async function loadReport() {
  const response = await fetch('/api/report-orders');
  if (!response.ok) return;
  const selectedMonth = document.getElementById('report-month').value;
  const orders = (await response.json()).filter(order => (order.status === 'ready' || order.status === 'delivered') && order.createdAt.startsWith(selectedMonth));
  const products = {};
  orders.forEach(order => order.items.forEach(item => {
    if (!products[item.name]) products[item.name] = { quantity: 0, price: Number(item.price) || 0, total: 0 };
    products[item.name].quantity += Number(item.quantity) || 0;
    products[item.name].total += (Number(item.price) || 0) * (Number(item.quantity) || 0);
  }));
  const rows = Object.entries(products).sort((a, b) => b[1].total - a[1].total);
  const units = rows.reduce((sum, [, item]) => sum + item.quantity, 0);
  const total = rows.reduce((sum, [, item]) => sum + item.total, 0);
  document.getElementById('report-orders').textContent = orders.length;
  document.getElementById('report-units').textContent = units;
  document.getElementById('report-total').textContent = money(total);
  document.getElementById('report-label').textContent = new Date(`${selectedMonth}-02T12:00:00`).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
  document.getElementById('sales-rows').innerHTML = rows.length ? rows.map(([name, item]) => `<tr><td><strong>${name}</strong></td><td>${item.quantity}</td><td>${money(item.price)}</td><td class="table-total">${money(item.total)}</td></tr>`).join('') : '<tr><td colspan="4" class="table-empty">No hay ventas confirmadas en este mes.</td></tr>';
}

if (document.body.dataset.page === 'menu') initMenu();
if (document.body.dataset.page === 'kitchen') initKitchen();
if (document.body.dataset.page === 'reports') initReports();
