document.addEventListener('DOMContentLoaded', () => {
  const cartItems = [
    { name: 'Product A', qty: 1, price: 250 },
    { name: 'Product B', qty: 2, price: 180 }
  ];

  const cartList = document.getElementById('cart-items');
  const summary = document.getElementById('summary-totals');
  let subtotal = 0;

  cartItems.forEach(item => {
    subtotal += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - EGP ${item.price * item.qty}`;
    cartList.appendChild(li);
  });

  const shipping = 30;
  const total = subtotal + shipping;

  summary.innerHTML = `
    <p><strong>Subtotal:</strong> EGP ${subtotal}</p>
    <p><strong>Shipping:</strong> EGP ${shipping}</p>
    <p><strong>Total:</strong> EGP ${total}</p>
  `;
});
// Example: products in cart (normally you get this from localStorage or form input)
const cart = [
  { name: "Product A", quantity: 1, price: 250 },
  { name: "Product B", quantity: 2, price: 180 },
];

// Target elements
const cartItemsEl = document.getElementById('cart-items');
const summaryTotalsEl = document.getElementById('summary-totals');

// Display cart items
let subtotal = 0;
cart.forEach(item => {
  const li = document.createElement('li');
  li.textContent = `${item.name} x ${item.quantity} - EGP ${item.price * item.quantity}`;
  cartItemsEl.appendChild(li);

  subtotal += item.price * item.quantity;
});

// Calculate totals
const shipping = 30;
const total = subtotal + shipping;

// Display totals
summaryTotalsEl.innerHTML = `
  <p><strong>SUBTOTAL:</strong> EGP ${subtotal}</p>
  <p><strong>SHIPPING:</strong> EGP ${shipping}</p>
  <p><strong>TOTAL:</strong> EGP ${total}</p>
`;
