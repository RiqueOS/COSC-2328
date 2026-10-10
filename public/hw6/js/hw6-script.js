// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez
const productPrices = {
    laptop: 1200.00,
    tablet: 200,
    phone: 500,
    monitor: 250,

};

// a const with 3 keys mapped to a number
const discountCodes = {
    SAVE10: 0.10,
    SAVE20: 0.20,
    STUDENT: 0.15,

};

//6.3 a arrow function that takes in a parameter
const calculateTax = (subtotal) => subtotal * 0.0825;

//66.4 Function expression
const applyDiscount = function(subtotal, code){
    const cleanCode = code.trim().toUpperCase()

   if(cleanCode === "" || discountCodes[cleanCode] === undefined){
    return 0
   }

   return subtotal * discountCodes[cleanCode];
};

//6.5 DOM element selection
const orderForm = document.getElementById("orderForm");
const productInput = document.getElementById("product")
const quantityInput = document.getElementById("quantity");
const discountInput = document.getElementById("discountCode");
const result = document.getElementById("results");

const resultProduct = document.getElementById("resultsProduct");
const resultQuantity = document.getElementById("resultsQuantity");
const resultSubtotal = document.getElementById("resultSubtotal");
const resultsDiscount = document.getElementById("resultDiscount")
const resultsTax = document.getElementById("resultTax");
const resultTotal = document.getElementById("resultTotal");



// 6.6 Event listern & preventDefault
orderForm.addEventListener("submit", function(e){
    e.preventDefault();
   
    //6.7 Form data retrieval,bracket-notation lookup & validation
    const selectedProduct = productInput.value;
    const quantity = Number(quantityInput.value);
    const discountCodes = discountInput.value.trim();

    const price = productPrices[selectedProduct];
    if(typeof price !== "number"){
        alert("Please choose a product.");
        return;
    }

    if (!(quantity >= 1 && quantity <= 10)){
        alert("Quantity must be a number between 1 - 10")
        return;
    }






// 6.8 Calculation logic
const subtotal = price * quantity;
const discountAmount = applyDiscount(subtotal, discountCodes);
const discountedSubtotal = subtotal - discountAmount;
const tax = calculateTax(discountedSubtotal);
const total = discountedSubtotal + tax;

//6.9 Dynamic display
resultProduct.textContent = selectedProduct;
resultQuantity.textContent = quantity;
resultSubtotal.textContent = "$" + subtotal.toFixed(2);
resultsDiscount.textContent = "-$" + discountAmount.toFixed(2);
resultsTax.textContent = "$" + tax.toFixed(2);
resultTotal.textContent = "$" + total.toFixed(2);

resultsContainer.classList.remove("results-hidden");
});