export const cart = [{
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 2
},
{
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity: 1
}];

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
}

export function deleteFromCart(productId) {
  let cur = 0;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      cart.splice(cur, 1);
    }
    cur++;
  })
}