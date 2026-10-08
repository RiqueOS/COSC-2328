// IC13 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

// -- order state --
let selectedProduct = null;
let currentQuantity = 1;
let discountRate = 0;

// --- Display Update Functin --
function updateOrderSummary (){
    const summaryProduct = document.querySelector("#summary-product");
    const summmaryTotal = document.querySelector("#summary-total");

    if(selectedProduct){
        summaryProduct.textContent = "Product: " + selectedProduct.name;
        const total = selectedProduct.price * currentQuantity * (1 - discountRate);
        summmaryTotal.textContent = "Total: $" + total.toFixed(2);
    }else{
        summaryProduct.textContent = "No product selected";
        summmaryTotal.textContent = "Total: 0$";
    }
}

// -- Mouse Events: products Selection (event delegation + dataset) --//

const productGallery = document.querySelector("#product-gallery");
const productNameInput = document.querySelector("#product-name");

productGallery.addEventListener("click" , function (e){
    const card = e.target.closest(".product-card");
 if(card){ 
    selectedProduct = {
        name: card.dataset.productName,
        price: parseFloat(card.dataset.price)
    };

    productNameInput.value = selectedProduct.name;
    
updateOrderSummary();
}
});


// -- Form Events: sumbit validation --
const orderForm = document.querySelector("#order-form");
orderForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(!selectedProduct){
        alert("please select a product before placing your order.");
        return;
    }

    const total = selectedProduct.price * currentQuantity * (1 - discountRate);
    //*(1- discountRate)
    const orderDetails = "order Placed successfully!\n" + 
        "Product: " + selectedProduct.name + "\n" +
        "Quantity: " + currentQuantity + "\n" + 
        "Total: $" + total.toFixed(2);

    alert(orderDetails);
})

// -- keyBoard

const promoCodeinput = document.querySelector("#promo-code");
const promoMessage = document.querySelector("#promo-message");

promoCodeinput.addEventListener("keyup", function(e){
    const code = e.target.value.trim().toUpperCase();
    if (code === ""){
        promoMessage.textContent = "";
        discountRate = 0;

    } else if (code === "SAVE10"){
        promoMessage.textContent = "Valid promo Code!";
        discountRate = 0.10;
    } else {
        promoMessage.textContent = "Invalid promo code";
        discountRate = 0;
    }
    updateOrderSummary();
});

// -- FOrm Events: sumbit 

