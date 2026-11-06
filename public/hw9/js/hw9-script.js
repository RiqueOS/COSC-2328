// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez


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