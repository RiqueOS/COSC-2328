// IC11 - COSC 2328 - Professor McCurry
// Implemented by: Enrique

// Step 5 -- function declaration

console.log("--- Function Declaration ---");
function greet(name){
    return "hello, " + name + "!";
}
console.log(greet("Enrique"));

function area(width, height){
    return width * height;
}
console.log(area(10, 5));

// step 6 -- Function expression + arrow
console.log("--- Function Expression & Arrow Function ---");

const multiply = function(a,b){
    return a * b;
}
const divide = (a,b) => {
    return a / b;
}
const square = n => n * n;

console.log("multiply (3,6) = " + multiply(3, 6));
console.log("divide (20,5) = " + divide(20, 5));
console.log("square (7) = " + square(7));


// step 7 -- Default parameter + rest operator
console.log("--- Default Parameter & Rest Operator ---");
function greetUser(name, greeting = "hello"){
    return greeting + "." + name + "!";
}
console.log(greetUser("Enrique")); // uses default 
console.log(greetUser("Enrique", "hi")); // overrides default 

function sumAll(...numbers){
    let total = 0;
    for(const n of numbers){
        total += n;
        
    }
    return total;
}

console.log("sumAll(1,2,3) = " + sumAll(1,2,3));


// Step 8 -- Callback function
console.log("--- Callback Function ---");

function processNumber(value, callback){
    console.log("Processing " + value + "...");
    return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log("processNumber(5, double) = " + processNumber(5, double));
console.log("processNumber(5, triple) = " + processNumber(5, triple));

// Step 9 -- Object methods with (this)
console.log("-- Object Methods(this) ---");
const product = {
    brand: "Acme",
    price: 9.99,
    quantity: 5,
    total(){
        return this.price * this.quantity;
    },
    describe(){
        return this.quantity + "X " + this.brand + " @ $" + this.price + " = $" + this.total() .toFixed(2); 
    }
   
};

console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());
