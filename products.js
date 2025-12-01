// product.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productsContainer");
  const searchBar = document.getElementById("searchBar");

  let products = [];

  // Fetch products from JSON or Firebase
  fetch("js/products.json")
    .then(res => res.json())
    .then(data => {
      products = data;
      displayProducts(products);
    })
    .catch(err => console.error("Error loading products:", err));

  // Display products
  function displayProducts(items) {
    container.innerHTML = "";
    items.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="window.location.href='order.html?productId=${product.id}'">Order Now</button>
      `;
      container.appendChild(card);
    });
  }

  // Search functionality
  searchBar.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    displayProducts(filtered);
  });
});
