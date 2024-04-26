// Dylan Boyd
// 40538662
// Using the price.js in a separate file due to errors occuring when trying to use the script in the main script.js file

// Defines an object to store prices for different pizza options
const pizzaPrices = {
  base: {
    thin: 5,
    thick: 6,
    glutenFree: 7,
  },
  cheese: {
    mozzarella: 2,
    cheddar: 2,
    vegan: 3,
  },
  toppings: {
    pepperoni: 1,
    mushrooms: 0.5,
    olives: 0.5,
  }
};

// This function calculates and displays the current price of the pizza
function updatePizzaPrice() {
  let currentPrice = 0; // Define a variable to store the current price starting at 0

  // gets the selected base and adds its price to the current price
  const selectedBase = document.querySelector('select[name="base"]').value;
  currentPrice += pizzaPrices.base[selectedBase] || 0; // If the base doesn't have a price, set 0

  // Same as above for but cheese
  const selectedCheese = document.querySelector('select[name="cheese"]').value;
  currentPrice += pizzaPrices.cheese[selectedCheese] || 0; // If the cheese doesn't have a price, set 0

  // Same as above but for toppings
  const checkedToppings = document.querySelectorAll('input[name="toppings"]:checked');
  checkedToppings.forEach(topping => {
    currentPrice += pizzaPrices.toppings[topping.value] || 0; // If the topping doesn't have a price, set 0
  });

  // This updates the displayed price to the user
  document.getElementById('current-price').innerText = `Current Price: $${currentPrice.toFixed(2)}`;
}

// This listens for changes in the base and cheese dropdowns and calls the updatePizzaPrice function when they change
['select[name="base"]', 'select[name="cheese"]'].forEach(selector => {
  document.querySelector(selector).addEventListener('change', updatePizzaPrice);
});

// Listening for changes in the toppings checkboxes and calls the updatePizzaPrice function when they change
document.getElementById('main-content').addEventListener('change', event => {
  if (event.target.matches('input[name="toppings"]')) {
    updatePizzaPrice();
  }
});
