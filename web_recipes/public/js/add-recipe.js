document.getElementById('addIngredientBtn').addEventListener('click', function () {
  const ingredientDiv = document.createElement('div');
  ingredientDiv.classList.add('ingredient', 'd-flex', 'align-items-end', 'mb-2');
  ingredientDiv.innerHTML = `
      <div class="form-group mr-2">
        <label for="ingredientName">Ingredient Name</label>
        <input type="text" class="form-control ingredient-name" placeholder="Name" required>
      </div>
      <div class="form-group mr-2">
        <label for="ingredientAmount">Amount</label>
        <input type="number" class="form-control ingredient-amount" placeholder="Amount" required>
      </div>
      <div class="form-group mr-2">
        <label for="ingredientVolume">Volume</label>
        <input type="text" class="form-control ingredient-volume" placeholder="Volume" required>
      </div>
      <button type="button" class="btn btn-danger remove-ingredient align-self-end">Remove</button>
    `;
  document.getElementById('ingredients').appendChild(ingredientDiv);

  // Add event listener for the remove button
  ingredientDiv.querySelector('.remove-ingredient').addEventListener('click', function () {
    ingredientDiv.remove();
  });
});

document.getElementById('recipeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const ingredients = [];
  const ingredientElements = document.querySelectorAll('.ingredient');
  ingredientElements.forEach((element) => {
    const name = element.querySelector('.ingredient-name').value;
    const amount = element.querySelector('.ingredient-amount').value;
    const volume = element.querySelector('.ingredient-volume').value;
    ingredients.push({ name, amount, volume });
  });
  const form = e.target;
  const formData = {
    title: form.title.value,
    description: form.description.value,
    ingredients,
  };
  fetch('/add-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      // Redirect or display success message
      window.location.href = '/recipes';
    })
    .catch((error) => {
      console.error('Error:', error);
      // Display error message
      alert('Error adding recipe. Please try again.');
    });
});
