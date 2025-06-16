document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const cartList = document.getElementById('cart-items');
  const summary = document.getElementById('summary-totals');
  const cartField = document.getElementById('cartField');
  const totalField = document.getElementById('totalField');

  let subtotal = 0;
  cartList.innerHTML = '';

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - EGP ${item.price * item.quantity}`;
    cartList.appendChild(li);
    subtotal += item.price * item.quantity;
  });

  const shipping = 50;
  const total = subtotal + shipping;

 summary.innerHTML = `
  <p><strong>Subtotal:</strong> EGP ${subtotal}</p>
  <p><strong>Shipping:</strong> EGP ${shipping}</p>
  <p><strong>Total:</strong> EGP ${total}</p>
`;



  cartField.value = JSON.stringify(cartItems);
  totalField.value = total;
});