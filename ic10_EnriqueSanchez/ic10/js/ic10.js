const city = "Austin";
const country = "USA";
let population = 980000;

console.log("Location: " + city + ", " + country);
console.log("Population: " + population);

//step 6
if(population > 1000000){
    console.log(city + "is a metropolis. ");
} else {
    console.log(city +  "is a growing city. ")
}


//step 7
let isLoggedIn = true;
if(isLoggedIn){
    console.log("Welcome Back");
} else {
    console.log("please log in");
}

let username = 123;
if(username){
    console.log("Username acceptted: " + username)
} else {
    console.log("Username is requreid ");
}


// step 9 combine logic 

const hasAccount = true;
const isEmailVerified = false;
const agreedToTerms = true;

if((hasAccount && agreedToTerms) || isEmailVerified){
    console.log("Registration allowed");
} else {
    console.log("Registration blocked");
}