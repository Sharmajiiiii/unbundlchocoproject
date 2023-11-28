// Sample data (replace with data from your database)
const chocolates = [
  { id: 1, name: 'Milk Chocolate', price: 2.50, image: 'milk_chocolate.jpg' },
  { id: 2, name: 'Dark Chocolate', price: 3.00, image: 'dark_chocolate.jpg' },
  { id: 3, name: 'White Chocolate', price: 2.75, image: 'white_chocolate.jpg' },
  // Add more chocolates as needed
];

// Initialize selected chocolates array
let selectedChocolates = [];

// Function to display available chocolates
function displayChocolates() {
  const chocolateOptions = document.getElementById('chocolate-options');
  chocolateOptions.innerHTML = '';

  chocolates.forEach(chocolate => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = chocolate.id;
    checkbox.addEventListener('change', () => toggleChocolate(chocolate));

    const label = document.createElement('label');
    label.htmlFor = chocolate.id;

    // Add an image next to the checkbox
    const img = document.createElement('img');
    img.src = chocolate.image;
    img.alt = chocolate.name;
    img.width = 60;
    img.height = 60;

    label.appendChild(img);
    label.innerHTML += `${chocolate.name} - $${chocolate.price.toFixed(2)}`;

    chocolateOptions.appendChild(checkbox);
    chocolateOptions.appendChild(label);
  });
}

// Function to toggle selected chocolates
function toggleChocolate(chocolate) {
  const checkbox = document.getElementById(chocolate.id);

  if (checkbox.checked) {
    let quantity = prompt(`Enter quantity for ${chocolate.name}:`, '1');

    // Validate that quantity is a positive number
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity <= 0) {
      checkbox.checked = false;
      return;
    }

    // Check if adding this chocolate exceeds the limit of 8 items
    const totalSelectedItems = selectedChocolates.reduce((total, item) => total + item.quantity, 0);

    if (totalSelectedItems + quantity > 8) {
      alert('The total number of chocolates cannot exceed 8 items.');
      checkbox.checked = false;
      return;
    }

    selectedChocolates.push({ ...chocolate, quantity });
  } else {
    selectedChocolates = selectedChocolates.filter(item => item.id !== chocolate.id);
  }

  displaySelectedChocolates();
}

// Function to display selected chocolates and update total price
function displaySelectedChocolates() {
  const selectedChocolatesDiv = document.getElementById('selected-chocolates');
  selectedChocolatesDiv.innerHTML = '';

  let totalPrice = 0;

  selectedChocolates.forEach(chocolate => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `<img src="${chocolate.image}" alt="${chocolate.name}" width="20" height="20"> ${chocolate.name} x${chocolate.quantity} - $${(chocolate.price * chocolate.quantity).toFixed(2)}`;
    selectedChocolatesDiv.appendChild(itemDiv);

    totalPrice += chocolate.price * chocolate.quantity;
  });

  const totalPriceSpan = document.getElementById('total-price');
  totalPriceSpan.innerText = totalPrice.toFixed(2);
}

// Function to calculate total price
function calculateTotal() {
  // Add any additional logic for calculating the total price if needed
  alert(`Total Price: $${selectedChocolates.reduce((total, chocolate) => total + chocolate.price * chocolate.quantity, 0).toFixed(2)}`);
}

// Initialize the page
displayChocolates();
