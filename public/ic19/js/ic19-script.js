// IC19 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

// Reflection answers:
// 1. require('dotenv').config() reads .env and loads each KEY=VALUE line into
//    process.env before any other code runs. It must be first because process.env
//    is read at the time each line executes — if dotenv loads after PORT is read,
//    process.env.PORT is still undefined.
// 2. res.send() returns plain text (Content-Type: text/html).
//    res.json() serializes a JS object to JSON and sets Content-Type: application/json.
//    Use res.send() for short messages or HTML; res.json() for structured data.
// 3. .env can contain API keys, passwords, and other secrets. Anyone with read
//    access to the repo could steal them. Keep secrets out of version control.
// 4. Two options:
//    a) SSH into the droplet and manually create a .env file with the values.
//    b) Pass variables to docker run: docker run -e MISSION_ZONE="Alpha Quadrant" ...

const dl = document.getElementById('config-display');

async function loadConfig() {
  const res  = await fetch('/ic19/config');
  const data = await res.json();
  dl.innerHTML = '';
  Object.entries(data).forEach(([key, value]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = key;
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  });
}

loadConfig();
