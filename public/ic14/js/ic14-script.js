// IC14 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez


// --- Product Constructor + proto (steps 5&6) ---
function Product(name, price, category, inStock) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.inStock = inStock;
}

Product.prototype.getInfo = function () {
    return this.name + " - $" + this.price.toFixzed(2) + 
    " (" + this.category + ") + " + 
    (this.inStock ? "In Stock" : "Out of Stock");
};

Product.prototype.isExpensive = function () {
    return this.price > 50;
}

let catalog = [
          new Product("Wireless Mouse", 24.99, "Electronics", true),
         new Product("Mechanical Keyboard", 89.99, "Electronics", true), 
         new Product("Desk Lamp", 34.50, "Home", false), 
         new Product("Standing Desk", 249.99, "Furniture", true), 
         new Product("Notebook Set", 12.99, "Office", true), 
         new Product("Noise-Cancelling Headphones", 159.00, "Electronics", false) 
        ];


        function renderProducts(list) {
            const container = document.getElementById("product-container");
            container.innerHTML = "";
            list.forEach(function(product) {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML =
                    "<h3>" + product.name + "</h3>" +
                    "<p class='product-price'>$" + product.price.toFixed(2) + "</p>"
                    + "<span class='product-category'>" + product.category + "</span><br>"
                    + "<span class='" + (product.inStock ? "in-stock" : "out-of-stock") + "'>"
                    + (product.inStock ? "In Stock" : "Out of Stock") + "</span>:"
                    container.appendChild(card);
            });
        }

document.querySelector("#btn-show-all").addEventListener("click", function() {
    renderProducts(catalog);   
});

document.querySelector("#btn-sort-price").addEventListener("click", function () {
    const sorted = [...catalog].sort(function(a, b) {
        return a.price - b.price;
    });
    renderProducts(sorted);
});

document.querySelector("#btn-filter-expensive").addEventListener("click", function () {
    const expensive = catalog.filter(function (product) {
        return product.isExpensive();
    });
    renderProducts(expensive);
    document.querySelector("#stats-container").innerHTML = 
    "<div class='stat-item'>" + expensive.length + 
    " expensive product(s) found (over $50).</div>";
});

document.querySelector("#btn-calculate-total").addEventListener("click", function () {
    const total = catalog.reduce(function (sum, product) {
        return sum + product.price;
    }, 0);
    document.querySelector("#stats-container").innerHTML = 
     "<div class='stat-item'>Total catalog value: $" + total.toFixed(2) + "</div>";
});
