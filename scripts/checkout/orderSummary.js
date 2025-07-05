import { cart, updateCartQuantity, updateItemQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deleteFromCart } from "../../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let orderHTML = '';

  updateCartQuantity();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const product = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );

    const dateString = deliveryDate.format('dddd, MMMM D');

    const html = `
      <div class="cart-item-container js-cart-item-container-${productId}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${product.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            ${deliveryOptionsHTML(product, cartItem)}
          </div>
        </div>
      </div>
    `
    orderHTML += html;
  })

  document.querySelector('.js-order-summary').innerHTML = orderHTML;

  document.querySelectorAll('.js-update-quantity-link').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const productId = updateButton.dataset.productId;

      // Find the container for this cart item
      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      const quantityLabel = cartItemContainer.querySelector('.quantity-label');

      // Check if input already exists
      const existingInput = cartItemContainer.querySelector('.js-update-quantity-input');

      if (existingInput) {
        // Already an input, treat as submit
        const newQuantity = existingInput.value;
        updateItemQuantity(productId, Number(newQuantity));

        quantityLabel.textContent = newQuantity;
        updateCartQuantity();
      } else {
        // Replace the label with an input
        const currentQuantity = quantityLabel.textContent;
        quantityLabel.innerHTML = `<input size="1" class="js-update-quantity-input" value="${currentQuantity}">`;

        const input = cartItemContainer.querySelector('.js-update-quantity-input');
        input.focus();

        input.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            const newQuantity = input.value;
            updateItemQuantity(productId, Number(newQuantity));
            quantityLabel.textContent = newQuantity;
            updateCartQuantity();
          }
        });
      }
    });
  });

  function deliveryOptionsHTML(product, cartItem) {
    let html = ''
    const today = dayjs();
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );

      const dateString = deliveryDate.format('dddd, MMMM D');
    
      const priceString = deliveryOption.priceCents === 0 ? 'FREE': `${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-options js-delivery-option" data-product-id="${product.id}" data-delivery-option-id="${deliveryOption.id}">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" 
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${product.id}
            data=delivery-option-${deliveryOption.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      </div>
      `
    })
    return html;
  }

  // Initialize Delete Buttons
  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      deleteFromCart(deleteButton.dataset.productId);

      document.querySelector(
        `.js-cart-item-container-${deleteButton.dataset.productId}`
      ).remove();
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  })
}