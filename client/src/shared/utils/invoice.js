/**
 * Generate and download invoice as HTML (user can print to PDF)
 */

export function generateInvoiceHTML(order) {
  const items = order.order_items || [];
  const ship = order.shipping_details || {};
  const date = order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';

  const rows = items.map(item => {
    const product = item.products || item.product || {};
    const qty = item.quantity ?? 1;
    const price = (item.price_at_purchase ?? item.price ?? 0);
    return `<tr><td>${escapeHtml(product.title || 'Item')}</td><td>${qty}</td><td>₹${price.toFixed(2)}</td><td>₹${(price * qty).toFixed(2)}</td></tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice - Order ${escapeHtml(String(order.id || '').slice(0, 8))}</title>
<style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;padding:20px;color:#111}
table{width:100%;border-collapse:collapse;margin:20px 0} th,td{border:1px solid #ddd;padding:10px;text-align:left}
th{background:#f5f5f5} .header{display:flex;justify-content:space-between;margin-bottom:30px}
.total{text-align:right;font-weight:bold;margin-top:20px}
</style></head>
<body>
<div class="header">
  <div><h1>KALAVPP</h1><p>ArtCommerce & Creative Services</p></div>
  <div><h2>INVOICE</h2><p>Order #${escapeHtml(String(order.id || '').slice(0, 8).toUpperCase())}</p><p>Date: ${escapeHtml(date)}</p></div>
</div>
<p><strong>Shipping to:</strong><br>${escapeHtml(ship.firstName || ship.first_name || '')} ${escapeHtml(ship.lastName || ship.last_name || '')}<br>
${escapeHtml(ship.address || '')}, ${escapeHtml(ship.city || '')}, ${escapeHtml(ship.state || '')} ${escapeHtml(ship.zip || '')}<br>
${escapeHtml(ship.email || '')}</p>
<table><thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>
<div class="total">Total: ₹${Number(order.total_amount || 0).toFixed(2)}</div>
<p style="margin-top:40px;font-size:12px;color:#666">Thank you for your purchase. KALAVPP.</p>
</body></html>`;
}

function escapeHtml(s) {
  if (s == null) return '';
  const str = String(s);
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function downloadInvoice(order) {
  const html = generateInvoiceHTML(order);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${String(order.id || '').slice(0, 8)}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
