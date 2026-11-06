// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez



//Reflection
//1. What does require('dotenv').config() do, and how does process.env.PI_LICENSE in hw9-routes.js get its value even though dotenv is not called there?
// what 'require('dotenv').config() ends up doing is read my .env file and parses each KEY=value line and copies thoes pairs into process.env, this happen once and when app.js starts up before any
//routes are mounted.

//2.In IC20 your data was submitted with a <form> and e.preventDefault(). In HW9 there is no <form>. What changed? Why doesn't a plain <button> outside a form trigger a page reload?


//3.What happens to the case list if the Docker container restarts? Why? What would you need to add to make the data survive a restart?



//4.Your POST route returns 400 when suspect is missing. Where does the browser-side code receive that 400? How does response.ok help distinguish a 400 from a 201?

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

            const id = document.createElement('span');
            id.className = 'case-id';
            id.textContent = item.id;

            const suspect = document.createElement('span');
            suspect.className = 'case-suspect';
            suspect.textContent = item.suspect;

            const location = document.createElement('span');
            location.className = 'case-location';
            location.textContent = item.location;

            const notes = document.createElement('span');
            notes.className = 'case-notes';
            notes.textContent = item.notes;

            const ts = document.createElement('span');
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