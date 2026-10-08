// IC12 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez


/// --- Eleement Selection by ID --- ///
const statusBox = document.getElementById("status-box");
statusBox.textContent = "DOM is ready! Elements sucessfully selected .";
console.log("Status BOx: ", statusBox);

// -- QuerySelector Selector --- //
const firstCard = document.querySelector(".card");
firstCard.querySelector("p").textContent = "This card was selected using QuerySelector!";

// --- classList.add() -- //
firstCard.classList.add("highlight");
statusBox.classList.add("active");

// -- querySelectorAll + forEach(with-index highlight)-- //
const listItems = document.querySelectorAll(".list-item");
listItems.forEach((item,index) =>{
    if(index % 2 === 0){
        item.classList.add("highlight");
    }
} );

// --- classLIst.toggle + classList.remove -- // 
const thirdCard = document.querySelector("#card-3");
thirdCard.classList.toggle("hidden");

const SecondCard = document.querySelector("#card-2");
SecondCard.classList.remove("card");

// -- textContent vs innerHTML safety -- //
const secondCardParagraph = SecondCard.querySelector("p");
secondCardParagraph.textContent = "safe update: even text like <script> alert('hack')</script>renders as plain character,not real HTML.";


