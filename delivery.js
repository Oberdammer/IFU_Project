// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.querySelector('.cart-button');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('cartCount');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const placeOrderButton = document.getElementById('placeOrder');
    
    let cart = [];
    
    // Toggle cart overlay
    function toggleCart() {
      const isVisible = cartOverlay.style.display === 'flex';
      cartOverlay.style.display = isVisible ? 'none' : 'flex';
      
      if (!isVisible) {
        updateCartDisplay();
      }
    }
    
    cartButton.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Add item to cart
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const foodItem = this.closest('.food-item');
        const name = foodItem.dataset.name;
        const price = parseFloat(foodItem.dataset.price);
        const imgSrc = foodItem.querySelector('.food-image img').src;
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.subtotal = existingItem.price * existingItem.quantity;
        } else {
          cart.push({
            name: name,
            price: price,
            imgSrc: imgSrc,
            quantity: 1,
            subtotal: price
          });
        }
        
        updateCartCount();
        showAddedToCartFeedback(button);
      });
    });
    
    // Visual feedback when adding to cart
    function showAddedToCartFeedback(button) {
      const originalText = button.textContent;
      button.textContent = 'Added ✓';
      button.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#d40000';
      }, 1000);
    }
    
    // Update cart count
    function updateCartCount() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = totalItems;
      
      if (totalItems > 0) {
        cartCountElement.style.display = 'flex';
      } else {
        cartCountElement.style.display = 'none';
      }
    }
    
    // Update cart display
    function updateCartDisplay() {
      cartItemsContainer.innerHTML = '';
      
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalAmount.textContent = '€0.00';
        return;
      }
      
      let total = 0;
      
      cart.forEach((item, index) => {
        total += item.subtotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.imgSrc}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <div class="item-name">${item.name}</div>
            <div class="item-price">
              <span>Price:</span>
              <span>€${item.price.toFixed(2)}</span>
            </div>
            <div class="item-quantity">
              <span>Quantity:</span>
              <span>${item.quantity}</span>
            </div>
            <div class="item-subtotal">
              <span>Subtotal:</span>
              <span>€${item.subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button class="remove-item" data-index="${index}">✕</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
      });
      
      cartTotalAmount.textContent = `€${total.toFixed(2)}`;
      
      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          cart.splice(index, 1);
          updateCartCount();
          updateCartDisplay();
        });
      });
    }
    
    // Place order
    placeOrderButton.addEventListener('click', function() {
      if (cart.length === 0) return;
      
      alert('Your order has been placed! Total: ' + cartTotalAmount.textContent);
      cart = [];
      updateCartCount();
      updateCartDisplay();
    });
    
    // Initialize
    updateCartCount();
  });


document.querySelector('.back').addEventListener('click', function() 
{window.location.href = 'index.html'})