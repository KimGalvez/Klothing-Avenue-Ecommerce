'use strict';



/**
 * add event on element ========
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}






/**
 * navbar toggle ========
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);







/**
 * header sticky & back top btn active ==========
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);








/**
 * scroll reveal effect using Intersection Observer ==========
 */


const sections = document.querySelectorAll("[data-section]");


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5 
});

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});



document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.thumbnail-images');
  const thumbnails = slider.querySelectorAll('img');
  const sliderWidth = slider.offsetWidth;
  const thumbnailWidth = thumbnails[0].offsetWidth + 10; // including gap

  let currentIndex = 0;
  const totalThumbnails = thumbnails.length;

  // Function to update the slider position
  function updateSlider() {
    const offset = -currentIndex * thumbnailWidth;
    slider.style.transform = `translateX(${offset}px)`;
  }

  // Navigation button handlers
  document.querySelector('.slider-nav.prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalThumbnails - 1;
    updateSlider();
  });

  document.querySelector('.slider-nav.next').addEventListener('click', () => {
    currentIndex = (currentIndex < totalThumbnails - 1) ? currentIndex + 1 : 0;
    updateSlider();
  });

  // Initialize slider position
  updateSlider();
});







/**
  * EFECCT PRODUCT DETAILS IMAGES CLICK ==========
*/








/**
  * Toggle billing address fields ========
*/

document.querySelectorAll('input[name="billing-address"]').forEach(input => {
  input.addEventListener('change', function() {
    document.getElementById('billing-address-fields').classList.toggle('hidden', this.value === 'same');
  });
});






/**
  * CART EFFECTS  ========
*/

document.addEventListener('DOMContentLoaded', function() {
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const mainImage = document.getElementById('mainImage');

  function updateCartBadge() {
      const cartBadge = document.getElementById('cart-badge');
      if (!cartBadge) return;

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalQuantity;
  }

  addToCartBtn.addEventListener('click', function() {
      let quantity = parseInt(document.getElementById('quantity').value);
      let size = document.getElementById('size').value;
      let productName = document.querySelector('.product-title').textContent;
      let productPrice = parseFloat(document.querySelector('.product-price').textContent.replace('₱', ''));
      let productImageSrc = mainImage.src;

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // Check if item already exists
      let itemIndex = cartItems.findIndex(item => item.name === productName && item.size === size && item.imageSrc === productImageSrc);
      if (itemIndex > -1) {
          // Update existing item
          cartItems[itemIndex].quantity += quantity;
      } else {
          // Add new item
          cartItems.push({
              name: productName,
              price: productPrice,
              quantity: quantity,
              size: size,
              imageSrc: productImageSrc
          });
      }

      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Update cart badge
      updateCartBadge();

      // Optionally clear the quantity input field
      document.getElementById('quantity').value = 1;
  });

  // Update the cart badge on page load
  updateCartBadge();
});


document.addEventListener('DOMContentLoaded', function() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  function displayCartItems() {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let total = 0;

      // Clear existing items
      cartItemsContainer.innerHTML = '';

      cartItems.forEach(item => {
          let itemTotal = item.price * item.quantity;
          total += itemTotal;

          let cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
              <img src="${item.imageSrc}" width="250px" height="250px" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                  <h2 class="cart-item-name">${item.name}</h2>
                  <p class="cart-item-price">₱${item.price}</p>
                  <p class="cart-item-size">Size: ${item.size}</p>
                  <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
              </div>
              <button class="btn btn-remove" data-item-name="${item.name}" data-item-size="${item.size}" data-item-image="${item.imageSrc}">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItem);
      });

      cartTotalElement.textContent = `₱${total.toFixed(2)}`;
  }

  function updateCartBadge() {
      const cartBadge = document.getElementById('cart-badge');
      if (!cartBadge) return;

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalQuantity;
  }

  // Display cart items on page load
  displayCartItems();

  // Remove item from cart functionality
  cartItemsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('btn-remove')) {
          let itemName = event.target.getAttribute('data-item-name');
          let itemSize = event.target.getAttribute('data-item-size');
          let itemImage = event.target.getAttribute('data-item-image');
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          cartItems = cartItems.filter(item => !(item.name === itemName && item.size === itemSize && item.imageSrc === itemImage));
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          displayCartItems();
          updateCartBadge();
      }
  });

  // Update the cart badge on page load
  updateCartBadge();
});






/**
  *PRODUCT  ===========
*/

// Function to get URL parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to load product details based on product ID
function loadProductDetails(id) {
  // Example product data (this should be replaced with actual data from a database or API)
  const products = {
      1: {
          name: 'Black Classic Tee',
          price: '₱549',
          description: 'THE CLASSIC CREWNECK TEE FROM KLOTHING AVENUE.',
          mainImage: './assets/images/P-1.jpg',
          thumbnails: [
              './assets/images/product-a.jpg',
              './assets/images/product-b.jpg',
              './assets/images/size-chart2.png',
          ],
          sizes: ['Small', 'Medium', 'Large', 'Extra Large']
      },
      
      2: {
        name: 'White Classic Tee',
        price: '₱549',
        description: 'THE CLASSIC CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-2.jpg',
        thumbnails: [
            './assets/images/product-c.jpg',
            './assets/images/product-d.jpg',
            './assets/images/size-chart2.png',
        ],
        sizes: ['Small', 'Medium', 'Large', 'Extra Large']
      },

      3: {
        name: 'Black Young Cool Classic Tee',
        price: '₱549',
        description: 'EYES HERE! TEE CONNOISSEURS YOUNG COOL CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-3.jpg',
        thumbnails: [
            './assets/images/product-e.jpg',
            './assets/images/product-f.jpg',
            './assets/images/size-chart2.png',
        ],
        sizes: ['Small', 'Medium', 'Large', 'Extra Large']
      },

      4: {
        name: 'White Oni Mecha Classic Tee',
        price: '₱549',
        description: 'EYES HERE! TEE CONNOISSEURS ONI MECHA JAPANESE DEMON CREWNECK  TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-4.jpg',
        thumbnails: [
            './assets/images/product-g.jpg',
            './assets/images/product-h.jpg',
            './assets/images/size-chart2.png',
        ],
        sizes: ['Small', 'Medium', 'Large', 'Extra Large']
      },

      5: {
        name: 'Maroon Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-6.jpg',
        thumbnails: [
            './assets/images/Maroon B.jpg',
            './assets/images/M-E.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      6: {
        name: 'Khaki Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-7.jpg',
        thumbnails: [
            './assets/images/Khaki A.jpg',
            './assets/images/K-D.jpg',
            './assets/images/P-15.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      7: {
        name: 'Black Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-8.jpg',
        thumbnails: [
            './assets/images/Black A.jpg',
            './assets/images/B -A.jpg',
            './assets/images/P-12.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      8: {
        name: 'White Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-9.jpg',
        thumbnails: [
            './assets/images/White A.jpg',
            './assets/images/W -C.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      9: {
        name: 'Money Brain Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-10.jpg',
        thumbnails: [
            './assets/images/Money A.jpg',
            './assets/images/Money B.jpg',
            './assets/images/Money C.jpg',
            './assets/images/Money D.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      10: {
        name: 'Money Brain Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-11.jpg',
        thumbnails: [
            './assets/images/Money C.jpg',
            './assets/images/Money D.jpg',
            './assets/images/Money A.jpg',
            './assets/images/Money B.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      11: {
        name: 'Black KA Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-12.jpg',
        thumbnails: [
            './assets/images/P-12.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      12: {
        name: 'Green KA Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-13.jpg',
        thumbnails: [
            './assets/images/Green A.jpg',
            './assets/images/G -B.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      13: {
        name: 'Maroon KA Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-14.jpg',
        thumbnails: [
            './assets/images/Moroon A.jpg',
            './assets/images/M-E.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },

      14: {
        name: 'Khaki KA Classic Tee',
        price: '₱299',
        description: 'THE CREWNECK TEE FROM KLOTHING AVENUE.',
        mainImage: './assets/images/P-15.jpg',
        thumbnails: [
            './assets/images/P-15.jpg',
            './assets/images/size chart.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
  };

  
  const product = products[id];
  if (product) {
      document.getElementById('productTitle').textContent = product.name;
      document.getElementById('productPrice').textContent = product.price;
      document.getElementById('productDescription').textContent = product.description;
      document.getElementById('mainImage').src = product.mainImage;
      document.getElementById('mainImageLink').href = product.mainImage;

      const thumbnailContainer = document.getElementById('thumbnailImages');
      thumbnailContainer.innerHTML = ''; // Clear existing thumbnails
      product.thumbnails.forEach(thumbnail => {
          const a = document.createElement('a');
          a.href = thumbnail;
          a.target = '_blank';
          const img = document.createElement('img');
          img.src = thumbnail;
          img.alt = 'Product Thumbnail';
          img.className = 'thumbnail';
          img.dataset.image = thumbnail;
          a.appendChild(img);
          thumbnailContainer.appendChild(a);
      });

      const sizeSelect = document.getElementById('size');
      sizeSelect.innerHTML = ''; // Clear existing sizes
      product.sizes.forEach(size => {
          const option = document.createElement('option');
          option.value = size;
          option.textContent = size;
          sizeSelect.appendChild(option);
      });

      // Add click event listeners to thumbnails
      document.querySelectorAll('.thumbnail').forEach(thumbnail => {
          thumbnail.addEventListener('click', (event) => {
              event.preventDefault();
              const newImage = thumbnail.dataset.image;
              document.getElementById('mainImage').src = newImage;
              document.getElementById('mainImageLink').href = newImage;
          });
      });
  } else {
      document.querySelector('.product-info').innerHTML = '<p>Product not found.</p>';
  }
}

// Load product details on page load
window.onload = () => {
  const productId = getQueryParam('id');
  loadProductDetails(productId);
};




/**
  *ORDER SUMMARY EFFECTS  ===========
*/

document.addEventListener('DOMContentLoaded', function() {
  const orderSummaryElement = document.getElementById('order-summary');
  const orderTotalElement = document.getElementById('order-total');

  function populateOrderSummary() {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let total = 0;

      // Clear existing items
      orderSummaryElement.innerHTML = '';

      cartItems.forEach(item => {
          let itemTotal = item.price * item.quantity;
          total += itemTotal;

          let orderItem = document.createElement('li');
          orderItem.classList.add('order-summary-item');
          orderItem.innerHTML = `
              <img src="${item.imageSrc}" width="150px" height="150px" alt="  ${item.name}" class="order-item-image">
              <span class="order-item-size">Size: ${item.size}</span>
              <span class="order-item-name"> ${item.name}</span>
              <span class="order-item-quantity">Quantity: ${item.quantity}</span>
              <span class="order-item-price">₱${itemTotal.toFixed(2)}</span>
          `;
          orderSummaryElement.appendChild(orderItem);
      });

      orderTotalElement.textContent = `₱${total.toFixed(2)}`;
  }

  populateOrderSummary();
});


document.querySelector('.checkout-form').addEventListener('submit', function() {
  localStorage.removeItem('cartItems');
});


