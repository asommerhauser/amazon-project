export const cart = [];

function addToCart(productId, itemQuantity) {
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
}