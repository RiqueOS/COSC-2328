// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

// 5.2 Book inventory variable & data
console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");
const book1 = {title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 20.99};
const book2 = {title: "To Kill a Mockingbird", author: "Harper Lee", price: 18.99};
const book3 = {title: "1984", author: "George Orwell", price: 15.99};

const TAX_RATE = 0.0825;
let isMember = true;

console.log("--- Book Inventory ---")
console.log("Title: " + book1.title + ", Author: " + book1.author + ", Price: " + book1.price);
console.log("Title: " + book2.title + ", Author: " + book2.author + ", Price: " + book2.price);
console.log("Title: " + book3.title + ", Author: " + book3.author + ", Price: " + book3.price);

// 5.3 Book inventory calculator

function  calculateSubtotal(price, quantity){
    return  price * quantity;
}

function formatCurrency(amount){
    return amount.toFixed(2) + "$";
}

console.log("--- Function Declaration Test ---");
const subtotal1 = calculateSubtotal(book1.price, 2);
console.log("Subtotal for " + book1.title + ": " + formatCurrency(subtotal1));
console.log("Formated price: " + formatCurrency(15.50));

// 5.4 Arrow function -- Tax & member discount
const calculateTax = (subtotal1) =>  subtotal1 * TAX_RATE;

const applyMemberDiscount = (subtotal1, isMember) => {
    return isMember ? subtotal1 * 0.9 : subtotal1;
};

console.log("--- Arrow Function Test ---");
const tax1 = calculateTax(subtotal1);
console.log("Tax for " + book1.title + ": " + formatCurrency(tax1));

const memberDiscount1 = applyMemberDiscount(subtotal1, isMember);
console.log("Member discount for " + book1.title + ": " + formatCurrency(memberDiscount1));

// 5.5 Function expression with default parameter

const calculateTotal = function(price, quantity = 1, isMember = false){
    const subtotal = calculateSubtotal(price, quantity);
    const tax = calculateTax(subtotal);
    const memberDiscount = applyMemberDiscount(subtotal, isMember);
    return  tax + memberDiscount;

}

console.log("--- Function Expression with Defaults ---");
// test with all parameters filled
const total1 = calculateTotal(book1.price,2,true);
console.log("Total for " + book1.title + ": " + formatCurrency(total1));

// test with only 2 parameters filled 
const total2 = calculateTotal(book2.price, 3);
console.log("Total for " + book2.title + ": " + formatCurrency(total2));

//test with only 1 parameter filled
const total3 = calculateTotal(book3.price);
console.log("Total for " + book3.title + ": " + formatCurrency(total3));


// 5.6 Rest operator - bulk order pricing
function calculateBulkOrderPrice(...prices){
    let total = 0;
    for(const price of prices){
        total += price;
    }
    return total;
}

console.log("--- Rest Operator Test ---");
const bulkOrderPrice = calculateBulkOrderPrice(45,67,89,23,12);
console.log("Bulk order price for all books: " + formatCurrency(bulkOrderPrice));

// 5.7 Callback function - flexible pricing
function processOrder(book, quantity, callback){
   const total = callback(book.price, quantity);
    return book.title + " x" + quantity + ": " + formatCurrency(total);
}

const standardPricing = (price,quantity) => price * quantity;
const memberPricing = (price,quantity) => price * quantity * 0.9;

console.log("--- Callback Function Test ---");
console.log("Standard pricing: " + processOrder(book1, 2, standardPricing));
console.log("Member pricing: " + processOrder(book2, 3, memberPricing));


//5.8 Object methods with (this) -- order summary 
const orderSummary = {
    customerName : "Enrique Sanchez",
    items: [],

    addItem(book,quantity){
        this.items.push({book: book, quantity: quantity});
    },

    getTotal(){
        let total = 0;
        for(const item of this.items){
            total += item.book.price * item.quantity;
        }
        return total;
    },


displaySummary(){
    let summary = "Order Summary for " + this.customerName + "\n";
    for(const item of this.items){
        summary += item.book.title + " x" + item.quantity + ": " + formatCurrency(item.book.price * item.quantity) + "\n";
    }
    return summary;
}

};




console.log("--- Object Methods ---");
orderSummary.addItem(book1,2);
orderSummary.addItem(book2, 1);
console.log("Order total: " + formatCurrency(orderSummary.getTotal()));
console.log(orderSummary.displaySummary());


// 5.9 Truth/falsy conditional logic -- discount code validation
function validateDiscount(code){
    if(code){
        const upperCode = code.toUpperCase();
        if(upperCode === "MEMBER10"){
            return 0.10;
        } else if(upperCode === "SAVE20"){
            return 0.20;
        }

    }
    return 0;
}


console.log("--- Truthy/Falsy validation ---");
console.log("MEMBER10 discount: " + validateDiscount("MEMBER10"));
console.log("SAVE20 discount: " + validateDiscount("SAVE20"));
console.log("Invalid code discount: " + validateDiscount("INVALID"));
console.log("Empty code discount: " + validateDiscount(""));




// 5.10 CLosures -- nested order processor

function createOrderProcessor(storeName){
    let taxRate = 0.0825;
    function processStoreOrder(book,quantity){
        const subtotal = book.price * quantity;
        const total = subtotal + (subtotal * taxRate);
        return storeName + "Order: " + book.title + " x" + quantity + " : " + formatCurrency(total);
    }
    return { processStoreOrder };
}

console.log("--- Nest Function Closure  ---");
const bookstoreProcessor = createOrderProcessor("Enrique's Bookstore");
console.log(bookstoreProcessor.processStoreOrder(book1, 2));
console.log(bookstoreProcessor.processStoreOrder(book2, 3));