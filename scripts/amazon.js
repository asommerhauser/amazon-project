import { addToCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = '';

updateCartQuantity();

// Display the HTML for each product
products.forEach((product) => {
  const html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
  productsHTML += html;
});

// Insert the generated product HTML
  document.querySelector(".js-products-grid").innerHTML = productsHTML

// Used to track the timeout for the added popup
let addedPopupTimeout = 0;

// Adds add to cart functionality to the site
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  // Add on click event to each button
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    
    // Find the item quantity from the dropdown
    const itemQuantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value, 10);

    addToCart(productId, itemQuantity);

    // "Added" message popup
    const popup = document.querySelector(`.js-added-to-cart-${productId}`);

    popup.classList.add("added-to-cart-appear");

    if (addedPopupTimeout !== 0) {
      clearTimeout(addedPopupTimeout);
    }
    addedPopupTimeout = setTimeout(() => {
      popup.classList.remove("added-to-cart-appear");
      addedPopupTimeout = 0;
    }, 2000);

  });
})