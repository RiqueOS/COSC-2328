//IC15 - cosc2328 - Professor McCurry
//Implemented by: Enrique Sanchez

const pokemonInput = document.querySelector("#pokemon-input");
const statusMessage = document.querySelector("#status-message");
const pokemonCard = document.querySelector("#pokemon-card");

// Search 

async function searchPokemon(name){
    statusMessage.textContent = "Searching...";
    statusMessage.className = "";
    pokemonCard.innerHTMl = "";
    

    try{
        const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase().trim());

        if (!reponse.ok){
            throw new Error("pokemon not found. Check the spelling and try again");
        }

        const data = await reponse.json();
        renderPokemon(data);
        statusMessage.textContent = "";


    } catch(error){
        statusMessage.textContent = error.message;
        statusMessage.className = "status-error";
        pokemonCard.innerHTML = "status-error";
        pokemonCard.innerHTML = "";
    }

}


// RENDER (step 8)
    function renderPokemon(data){
        const types = data.types.map(function(t){
            return t.type.name;
        });
        

        pokemonCard.innerHTML = 
        "<img src ='" + data.sprites.front_default + "' alt='" + data.name + "'>" +
        "<h2>" + data.name + "</h2>" +
        types.map(function(t){
            return "<span class= 'type-badge'>" + t + "</span";
        }).join("");

       
    }

     // --- Wiring (Step 6) --- 
        document.querySelector("#btn-search").addEventListener("click", function(){
            searchPokemon(pokemonInput.value);
        });


