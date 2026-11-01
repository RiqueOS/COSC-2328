// IC18 - COSC2328 -- professor McCurry
// implemented by: Enrique Sanchez

// -- Context --
const HabitatContext = React.createContext();

const Header = () => {
    // Consume context - no props needed
    const {mode} = React.useContext(HabitatContext);
    return(
        <header className ="scene"> 
            <h1>🌎 Pixel Habitat </h1>
            <p>{mode === 'day' ? '🌞 day mode ' : ' 🌚 Night Mode '}</p>
        </header>
    );
};

const HabitatView = () => {
    const {mode} = React.useContext(HabitatContext);
    return(
        <div className = "scene">
            {mode === 'day' ? '🌞 🌴 🐾 ' : '🌚 ⭐️ 🐾'}
        </div>
    );
};


const ModeToggle = () => {
    //Consumes both mode and toggleMode -- no props received from App
    const{mode, toggleMode} = React.useContext(HabitatContext);
    return(
        <div className="controls">
            <button onClick={toggleMode}>
                {mode == 'day' ? 'Switch to Night Mode' : 'Switch to day mode'}
            </button>
        </div>
    );
};

const App = () => {
    const [mode, setMode] = React.useState('day');
    const toggleMode = () => setMode(prev => prev === 'day' ? 'night' : 'day');

    return(
        //provder wraps all consumers; value broadcast mode and toggleMode
        <HabitatContext.Provider value={{mode, toggleMode}}>
            <div className={"habitat " + mode}>
                <Header />
                <HabitatView />
                <ModeToggle />
            </div>
        </HabitatContext.Provider>
    );
};

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);