// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

// 7.3 Fetch the roster
async function loadRoster(){
    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151" );
        if(!response.ok){
            throw new Error("Request failed with status" + response.status);
        }
        const data = await response.json();

        //7.4 Process the data
        const shortNames = data.results.filter(p => p.name.length <= 6);
        //7.5 Process the data
        shortNames.sort((a,b) => a.name.length - b.name.length);
        // 7.8--- Render ---
        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster ={shortNames} />);

// 7.9 Error fallback
    } catch (error){
            document.querySelector("#root").innerHTML = "..."
        }
    }


loadRoster();

// 7.6 PokemonCard component 
function PokemonCard(props){
    return(
    <div className="card">
        <img src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name} alt={props.name} />
        <h2>{props.name}</h2>
        <p className="letters">{props.name.length} letters</p>
    </div>

    );  

}
    
//7.7 PokemonRoster Component
function PokemonRoster(props){
    return(
        <div className ="roster">
            {props.pokemon.map(p => (
             <PokemonCard 
             key={p.name}
             name={p.name}
             />   
            ))}
        </div>
    );
}

// 7.8 App componet & render-after-fetch pattern
function App(props){
    return(
        <div>
            <header>
                <h1>{`Showing ${props.roster.length} short-named Pokemon, shortest name first`} </h1>
            </header>
            <PokemonRoster pokemon={props.roster}/>
        </div>
    )
}





