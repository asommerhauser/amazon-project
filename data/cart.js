export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}

export function addToCart(productId, itemQuantity) {
  // Add to Cart
  if (cart.length === 0) {
    cart.push({
        productId: productId,
        quantity: itemQuantity
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
        quantity: 1
      });
    }
  }
  saveToStorage();
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
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}