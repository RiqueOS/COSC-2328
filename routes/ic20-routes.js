// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

const express = require('express');
const router  = express.Router();

let missions = [
  { id: 1, name: 'Alpha Probe',  destination: 'Mars'   },
  { id: 2, name: 'Deep Survey',  destination: 'Europa' },
];
let nextId = 3;

// GET /ic20/missions

router.get('/missions' , (req, res) => {
    res.json(missions);
})

//POST /ic20/mission - add a new mission
router.post('/missions', (req, res) => {
    const{name, destination} = req.body;
    if(!name || !destination){
        return res.status(400).json({error: 'not found'});

    }

    const newMission = {id: nextId++, name, destination};
    missions.push(newMission);
    res.status(201).json(newMission);
});

//DELETE /ic20/missions/
router.delete('/missions/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const idx = missions.findIndex(m => m.id === id);
    if(idx === -1) return res.status(404).json({error: 'not found'});
    const removed = missions.splice(idx, 1)[0];
    res.json(removed);
});

module.exports = router;