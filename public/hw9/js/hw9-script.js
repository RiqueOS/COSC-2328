// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez



//Reflection
//1. What does require('dotenv').config() do, and how does process.env.PI_LICENSE in hw9-routes.js get its value even though dotenv is not called there?
// what 'require('dotenv').config() ends up doing is read my .env file and parses each KEY=value line and copies thoes pairs into process.env, this happen once and when app.js starts up before any
// routes are mounted. process.env is not a variable that belongs to a single file, it is one object that Node creates for the entire running process, and every module in that process reads and writes the same object
// that is why hw9-routes.js never needs to cal dotenv

//2.In IC20 your data was submitted with a <form> and e.preventDefault(). In HW9 there is no <form>. What changed? Why doesn't a plain <button> outside a form trigger a page reload?
// the reason for this change from HW9 is becuase this assignment doesn't need a <form>. what this code has is a plain
// <button id="log-btn"> which has a click listner that reads the input values directly with .value, then sends them with fetch() as a POST
// more to why a button does't reload the page is becuase it only triggers a submission behavior when it sits inside a form, becuase the form is what the broswer submits 


//3.What happens to the case list if the Docker container restarts? Why? What would you need to add to make the data survive a restart?
// what ends up happening is the case list empties out after restarting and nextId goes back to 1. why this ends up happing is becuase the cases are stored in 
// let cases = [], which is a varaible in the NOde process memory. a container restart stops that process and starts a new one, and the new process run hw9-routes.js from the top.
// what you need to add to make this data surive is end up storing these cases somehwere that outlives the process like a database or a file


//4.Your POST route returns 400 when suspect is missing. Where does the browser-side code receive that 400? How does response.ok help distinguish a 400 from a 201?
// the broswer resecive this code inside of logCase() from our hw9 java script. A 400 dones't make fetch() fail. becuase fethc only reject on a network failture so the 400 arrives as a normal, resolved response object and it status proprety holds 400
// response.ok can distinguish 400 from 201 becuase response.ok is true for status codes 200-299 and false for 400 and above



// Step 11 loadCredentials()
async function loadCredentials() { 
    const response = await fetch('/hw9/credentials');
    const data = await response.json();

    const dl = document.getElementById('credentials');
    dl.innerHTML = '';

    Object.entries(data).forEach(([key, value]) => {
        
        const dt = document.createElement('dt');
        dt.textContent = key;


        const dd = document.createElement('dd');
        dd.textContent = value;

        dl.appendChild(dt);
        dl.appendChild(dd);
    });
}

async function loadCases(){
    const response = await fetch('/hw9/cases');
    const data = await response.json();

    const ul = document.getElementById('case-list');
    ul.innerHTML = '';

    if(data.length === 0){
        const li = document.createElement('li');
        li.className = 'empty-msg';
        li.textContent = 'No cases filed yet.';
        ul.appendChild(li);

    } else {
        data.forEach(item => {
            const li = document.createElement('li');

            const id = document.createElement('div');
            id.className = 'case-id';
            id.textContent = item.id;

            const suspect = document.createElement('div');
            suspect.className = 'case-suspect';
            suspect.textContent = item.suspect;

            const location = document.createElement('div');
            location.className = 'case-location';
            location.textContent = item.location;

            const notes = document.createElement('div');
            notes.className = 'case-notes';
            notes.textContent = item.notes;

            const ts = document.createElement('div');
            ts.className = 'case-ts';
            ts.textContent = item.timestamp;

            li.append(id, suspect, location, notes, ts);
            ul.appendChild(li);

        });
    }
}


async function logCase(){
    const suspect = document.getElementById('suspect').value;
    const location = document.getElementById('location').value;
    const notes = document.getElementById('notes').value;

    const response = await fetch('/hw9/cases', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({suspect, location, notes})
    });

    if(!response.ok){
        const data = await response.json();
        document.getElementById('log-status').textContent = data.error;
    } else {
        document.getElementById('suspect').value = '';
        document.getElementById('location').value = '';
        document.getElementById('notes').value = '';
        document.getElementById('log-status').textContent = '';
        loadCases();

    }

}

document.getElementById('log-btn').addEventListener('click', logCase);

loadCredentials();
loadCases();