export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}

export function addToCart(productId, itemQuantity) {
  // Add to Cart
  if (cart.length === 0) {
    cart.push({
        productId: productId,
        quantity: itemQuantity,
        deliveryOptionId: '1'
      });
  } else {
    let found = false
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity+=itemQuantity;
        found = true;
      }
    })
    if (!found) {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  }
  saveToStorage();
  updateCartQuantity();
}

export function deleteFromCart(productId) {
  let cur = 0;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cart.splice(cur, 1);
    }
    cur++;
  })
  saveToStorage();
  updateCartQuantity();
}

export function updateItemQuantity(productId, quantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = quantity;
    }
  })
  saveToStorage();
}

export function updateCartQuantity() {
  // Update cart quantity display
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })

    const queryHomePage = document.querySelector('.js-cart-quantity')
    const queryCheckoutPage = document.querySelector('.js-checkout-item-count')
    
    if (queryHomePage) {
      queryHomePage.innerHTML = cartQuantity;
    }

    if (queryCheckoutPage) {
      queryCheckoutPage.innerHTML = `${cartQuantity} items`;
    }
    
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}