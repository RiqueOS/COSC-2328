// HW7 – COSC 2328 – Professor McCurry
   //  Implemented by: Enrique Sanchez 



function App(){
    //8.8 requried state variables
    const [tasks, setTasks] = React.useState([]);
    const[taskName, setTaskName] = React.useState('');

    //8.4 ConTrolled select //
    const[priority, setPriority] = React.useState('Medium');

    //8.5 
    const [error, setError] = React.useState('');

    //Adding task handler
    const taskHandler = () => {
        if (taskName.trim() === ''){
            setError('Task name can not be empty');
            return;
        }
        setError('');
        const newTask = {id: Date.now(), name: taskName.trim(), priority: priority };
        setTasks([...tasks, newTask]);

        setTaskName('');
        setPriority('Medium');

    };

    // 8.9 delete one task by specific ID;
    const deletetask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    //8.9 clear every task const
    const clearAll = () => {
        setTasks([]);
    };


    return(
        <div>
            <header>
                <h1>Quick Tasks</h1>
                <h2>{`${tasks.length} task${tasks.length === 1 ? '' : 's'}`}</h2>
            </header>

        
            <div className="form-area">
                <input
                    type="text"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                    />
                
                <select 
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <button onClick={taskHandler}>Add Task</button>
                    {error && <p className="error-message">{error}</p>}
            </div>
            <TaskList tasks={tasks} onDelete={deletetask}/>
            {tasks.length > 0 && <button onClick={clearAll}>Clear All</button>}
            </div>

    );
  
}


// 8.6 TaskCard component
function TaskCard(props){
    return(
        <div classname="task-card">
            <h3>{props.task.name}</h3>
            <span className={"badge " + props.task.priority.toLowerCase()}>
                {props.task.priority}
            </span>
            <button onClick={() => props.onDelete(props.task.id)} >x</button>
        </div>
    );
}

// 8.7 TaskList component
function TaskList(props){
    if(props.tasks.length === 0){
        return <p className="empty-state">No tasks yet - add one</p>;

    }
    return(
        <div className="task-list">
            {props.tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={props.onDelete}
                />
            ))}
        </div>
    );
}


// Render (boiler plate setup)
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);