
  
let cartItems = [];

const addToCartBtns = document.querySelectorAll('.add-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const emptyCart = document.querySelector('.empty-cart');
const cartFilled = document.querySelector('.cart-filled');
const confirmOrderBtn = document.querySelector('.btn-order');
const orderConfirmed = document.querySelector('.order-confirmed');
const startNewOrderBtn = document.querySelector('.btn-new-order');
const orderItemsContainer = orderConfirmed.querySelector('.order-items');


addToCartBtns.forEach(btn => {
  btn.addEventListener('click', handleAddToCart);
});


function handleAddToCart(e) {
  const btn = e.currentTarget;
  const card = btn.closest('.Dessert-card');

  const name = card.querySelector('.desert-name').textContent;
  const description = card.querySelector('.Desserts-description').textContent;
  const priceText = card.querySelector('.price').textContent;
  const price = parseFloat(priceText.replace('$', ''));

  const existingItem = cartItems.find(i => i.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name, description, price, quantity: 1 });
  }

  updateCartUI();
  updateButtonUI(btn, name);
}
    

function updateButtonUI(btn, name) {
  const item = cartItems.find(i => i.name === name);

  if (!item) return;

  btn.innerHTML = `
    <button class="qty-btn minus">−</button>
    ${item.quantity}
    <button class="qty-btn plus">+</button>
  `;

  
  const minusBtn = btn.querySelector('.minus');
  const plusBtn = btn.querySelector('.plus');

  minusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    item.quantity--;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(i => i.name !== name);
      btn.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart"> add to cart`;
    } else {
      updateButtonUI(btn, name);
    }
    updateCartUI();
  });

  plusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    item.quantity++;
    updateButtonUI(btn, name);
    updateCartUI();
  });
}


function updateCartUI() {
  if (cartItems.length === 0) {
    emptyCart.classList.remove('hidden');
    cartFilled.classList.add('hidden');
    cartCount.textContent = '(0)';
    totalAmount.textContent = '$0.00';
    cartItemsContainer.innerHTML = '';
    return;
  }

  emptyCart.classList.add('hidden');
  cartFilled.classList.remove('hidden');

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = `(${totalQuantity})`;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalAmount.textContent = `$${total.toFixed(2)}`;

  cartItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <p><strong>${item.name}</strong> x${item.quantity}</p>
      <p>$${(item.price * item.quantity).toFixed(2)}</p>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
}


confirmOrderBtn.addEventListener('click', handleConfirmOrder);

function handleConfirmOrder() {
  document.querySelector('.cart-section').classList.add('hidden');
  orderConfirmed.classList.remove('hidden');

  orderItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const confirmedItem = document.createElement('div');
    confirmedItem.classList.add('confirmed-item');
    confirmedItem.innerHTML = `
      <p><strong>${item.name}</strong> x${item.quantity}</p>
      <p>$${(item.price * item.quantity).toFixed(2)}</p>
    `;
    orderItemsContainer.appendChild(confirmedItem);
  });

  orderConfirmed.querySelector('.total-amount').textContent = totalAmount.textContent;
}


startNewOrderBtn.addEventListener('click', resetOrder);

function resetOrder() {
  cartItems = [];
  updateCartUI();
  orderConfirmed.classList.add('hidden');
  document.querySelector('.cart-section').classList.remove('hidden');

   
  addToCartBtns.forEach(btn => {
    btn.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart"> add to cart`;
  });
}





