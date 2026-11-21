// IC23 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

const list = document.getElementById('student-list');

async function loadStudents() {
  try {
    const res  = await fetch('/ic23/students');
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(s => {
      const li   = document.createElement('li');
      const name = document.createElement('p');
      const meta = document.createElement('p');
      name.className = 'name';
      meta.className = 'meta';
      name.textContent = `${s.first_name} ${s.last_name}`;
      meta.textContent = `${s.classification || '—'} — ${s.major || '—'}`;
      li.appendChild(name);
      li.appendChild(meta);
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = `<li>Error loading students: ${err.message}</li>`;
  }

  document.getElementById('add-btn').addEventListener('click', async () => { const first_name = document.getElementById('first-name').value.trim(); const last_name = document.getElementById('last-name').value.trim(); const classification = document.getElementById('classification').value; const major = document.getElementById('major').value.trim(); const result = document.getElementById('add-result'); if (!first_name || !last_name) { result.className = 'error'; result.textContent = 'First name and last name are required.'; return; }


  try { const res = await fetch('/ic23/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ first_name, last_name, classification, major }) }); const data = await res.json(); if (res.ok) { result.className = ''; result.textContent = `Added: ${data.first_name} ${data.last_name} (ID ${data.id})`; document.getElementById('first-name').value = ''; document.getElementById('last-name').value = ''; document.getElementById('classification').value = ''; document.getElementById('major').value = ''; await loadStudents(); } else { result.className = 'error'; result.textContent = data.error || 'Something went wrong.'; } } catch (err) { result.className = 'error'; result.textContent = `Network error: ${err.message}`; } }); loadStudents();
}
