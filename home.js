// home.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("featuredProducts");

  // Fetch products from JSON
  fetch("js/products.json")
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
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
    })
    .catch(err => console.error("Error loading products:", err));
});
fetch("json/products.json")
