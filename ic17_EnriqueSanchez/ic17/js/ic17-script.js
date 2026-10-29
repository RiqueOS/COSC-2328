// IC17 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez


//Step 4 -- Component skeleton and first render 
console.log('React version:' , React.version);
console.log('ReactDOM available: ', typeof ReactDOM !== 'undefined');

// --- component

const TamagotchiPet = () => {
    //State - hunger: 0(Full) --> 100(starving); energy: 0 (exhausted) -> 100(rested)
    const[hunger, setHunger] = React.useState(50);
    const[energy, setEnergy] = React.useState(50);

    // -- Event handler
    const feedPet = () => {
        setHunger(Math.max(0, hunger - 15));
    };

    const playwithPet = () => {
        setEnergy(Math.max(0, energy - 10));
        setHunger(Math.min(100, hunger + 5));
    };



const restPet = () => {
    setEnergy(Math.min(100, energy + 20));
    setHunger(Math.min(100, hunger + 8));

};

// -- Conditional rendering helper 
const getPetMood = () => {
    if (hunger > 75) return '🥲 starving';
    if(energy < 25) return '😶‍🌫️ Exhasusted! ';
    if(hunger < 30 && energy > 70) return '😁Thriving';
    return '😕 Okay';
};

// -- JSX
    return(
        <div className="pet-card">
            <h1>Pixel</h1>

            <div className="stats">
                <p className="stat">Hunger: {hunger}</p>
                <p className="stat">Energy: {energy}</p>
            </div>

            <div className="mood">{getPetMood()}</div>

            <div className="controls">
                <button onClick={feedPet}>Feed</button>
                <button onClick={playwithPet}>Play</button>
                <button onClick={restPet}>Rest</button>
            </div>
        </div>
    );


};


// -- Mount

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TamagotchiPet/>);