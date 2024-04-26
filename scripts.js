// Dylan Boyd
// 40538662
// Trying to follow the best practices and conventions outlined by https://www.w3schools.com/js/js_conventions.asp 

// Initialize the cart from localStorage or an empty array to store the cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Event listener for DOMContentLoaded the reason this is done is to ensure that the DOM is fully loaded before the script runs
// DOM is Document Object Model, this is used because i want to ensure that the page is fully loaded before the script runs
document.addEventListener('DOMContentLoaded', function () {
  // Once the DOM is loaded, initialize dropdowns, set up event listeners, and update the cart count
  // This is done here so that all the functions are called once the page is fully loaded
  // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction Documentation on DOM that helped me understand the concepts
  initDropdowns();
  setupEventListeners();
  updateCartCount();
});

// Dropdown function 
function initDropdowns() {
  const dropdowns = document.getElementsByClassName('dropdown-btn');
  // Loops through all the dropdowns and listens for a click event
  for (let dropdown of dropdowns) {
    // Adds an event listener to the dropdown (click event)
    dropdown.addEventListener('click', function () {
      // This adds the active class to the dropdown button to initiate the dropdown effect
      this.classList.toggle('active');
      // Creates a variable to store the dropdown content of the dropdown button that was clicked
      // The nextElementSibling property returns the element immediately following the specified element, in the same tree level.
      const content = this.nextElementSibling;
      // This simply checks if the dropdown content is displayed or not and toggles the display
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  }
}

// This function sets up event listeners for the email form, pizza customization form, and "Add to Cart" buttons 
// Choosing to do it in one function to keep the code clean and organized, also to avoid repetition
function setupEventListeners() {
  // This gets the email form element by its id
  const emailForm = document.getElementById('email-form');
  // This checks if the email form exists (by exists i mean if the user is on the page that has the email form)
  if (emailForm) {
    emailForm.addEventListener('submit', handleEmailFormSubmit);
  }

  // This gets the pizza form (the form that allows the user to customize their pizza) by its id
  const pizzaForm = document.getElementById('pizza-customization-form');
  // If the user is on the page that has the pizza form, this adds an event listener to the form
  if (pizzaForm) {
    pizzaForm.addEventListener('submit', handlePizzaFormSubmit);
  }

  // This adds an event listener to the document that listens for clicks on the "Add to Cart" buttons
  document.addEventListener('click', handleAddToCartClicks);
}

// This function works however it only displays the code quickly and then it disappears
// Now getting back round to this issue i realise i could have just used a prompt to display the code to the user, time restraints prevented me from doing this
function handleEmailFormSubmit() {
  // Generates a random code 16 characters in length
  const randomCode = generateRandomCode(16);
  // Displays the code to the user
  document.getElementById('code-display').textContent = `Your code is: ${randomCode}`;
}

// This function generates a random code of a specified length using the characters defined in the function 
function generateRandomCode(length) {
  // Defining the characters that can be used in the code, uppercase and lowercase letters and numbers 0-9
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  // This sets a loop that runs for the length of the code that is to be generated
  for (let i = 0; i < length; i++) {
    // This is the part that generates the code, it randomly selects a character from the characters defined above and adds it to the result
    // it does this by using the Math.floor and Math.random functions 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math Math functions documentation
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// This is a function to handle the pizza form submission (the make your own pizza form)
function handlePizzaFormSubmit() {
  // This gets the selected base value from the form does this by getting the value of the select element with the name "base"
  const base = document.querySelector('select[name="base"]').value;
  // Gets the selected cheese value from the form (same way as above)
  const cheese = document.querySelector('select[name="cheese"]').value;
  // This allows the user to select multiple toppings and then joins them together with a comma
  const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(el => el.value).join(', ');
  // This builds the declaration of what the user has selected for their pizza (base, cheese, toppings) and stores it in a variable
  const pizzaItem = `${base} crust, ${cheese} cheese, toppings: ${toppings}`;
  // This sets the price of the pizza shown to the user when stored in the cart, i couldnt figure out how to get the price of the pizza from the form
  const pizzaPrice = 10;
  // This shows the user a message from the browser that their pizza has been added to the cart
  alert(`Your pizza with ${pizzaItem} has been added to the cart!`);
  // Allows the user to add the pizza and its price to the cart
  addToCart(pizzaItem, pizzaPrice);
}

// This function is for the "Add to Cart" buttons, it gets the item and price from the button and adds it to the cart
function handleAddToCartClicks(event) {
  // This line gets the closest element to the button that was clicked with the class "add-to-cart"
  // the reason the closest element is used is due to the fact there are multiple elements in the button that can be clicked
  const target = event.target.closest('.add-to-cart');
  // If the target exists (if the button was clicked) then the item and price are added to the cart
  if (target) {
    // Gets the item name from the data-item attribute
    const item = target.dataset.item;
    // Gets the item price from the data-price attribute and convert it to a number
    const price = parseFloat(target.dataset.price);
    // Add the item to the cart
    addToCart(item, price);
  }
}

// This function helps to add items to the cart
function addToCart(item, price) {
  // Cheks if there is that item in the cart already and if there is it increments the quantity
  const existingItem = cart.find(cartItem => cartItem.item === item);
  // If the item already exists in the cart, increment its quantity by 1
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // If the item does not already exist in the cart then add it, and set the quantity to 1
    cart.push({ item, price, quantity: 1 });
  }
  // Updates the local storage of the cart with the new item to show the user what they have added to the cart
  localStorage.setItem('cart', JSON.stringify(cart));
  // Update the displayed cart count and items to show the user what they have added to the cart
  updateCartCount();
}

// This function updates the cart count and renders the cart items on the page
function updateCartCount() {
  // Variable to store the total count of items in the cart 
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  // Get the cart count element by its id from the HTML file
  const cartCountElement = document.getElementById('cart-count');
  // Set the text content of the cart count element to the total count of items in the cart alows the user to see how many items they have in the cart at a glance
  cartCountElement.textContent = totalCount;
  // Renders the cart items
  renderCartItems();
}

// This is a fumnction for rendering the cart items on the page
function renderCartItems() {
  // Gets the cart items container element by its id and stores it
  const cartItemsContainer = document.getElementById('cart-items-container');
  // Clears the cart items container to avoid duplication of items
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  // This loops through each item in the cart one by one and displays them to the user in the cart
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    // This helps calculate the total price of the item by multiplying the price by the quantity
    const itemTotal = item.price * item.quantity;
    // This calculates the total price of all the items in the cart
    totalPrice += itemTotal;

    // create a new cart item element and set its class name to "cart-item"
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    // Set the inner HTML of the cart item element to display the item name, price, quantity, total price, and a "Remove" button
    // toFixed is used to that the currency is shown in the correct format 
    cartItemElement.innerHTML = `
      <span class="item-name">${item.item}</span>
      <span class="item-price">£${item.price.toFixed(2)}</span>
      <span class="item-quantity">Quantity: ${item.quantity}</span>
      <span class="item-total">£${itemTotal.toFixed(2)}</span>
      <button class="remove-item" data-index="${i}">&#8722;</button>
    `;
    // This appends the cart item element to the cart items container. This is done to display the item to the user
    cartItemsContainer.appendChild(cartItemElement);
  }

  // This section creates a new div element to display the total price of all the items in the cart to the user 
  const totalPriceElement = document.createElement('div');
  totalPriceElement.className = 'total-price';
  totalPriceElement.innerHTML = `<span class="total-label">Total:</span><span class="total-value">£${totalPrice.toFixed(2)}</span>`;
  cartItemsContainer.appendChild(totalPriceElement);

  // Adds an event listener to allow the user to remove items from the cart
  document.querySelectorAll('.remove-item').forEach((button, index) => {
    button.addEventListener('click', () => removeItemFromCart(index));
  });
}

// This is a function to remove items from the cart
function removeItemFromCart(index) {
  // Get the item at the specified index
  const item = cart[index];
  // If the item quantity is more than 1, decrement it
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    // If the item quantity is 1, remove it from the cart
    cart.splice(index, 1);
  }
  // Update the cart data in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  // Update the displayed cart count and items
  updateCartCount();
  renderCartItems();
}