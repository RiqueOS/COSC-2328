// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

const express = require('express');
const router  = express.Router();

let cases  = [];   // in-memory case log — resets on server restart
let nextId = 1;

module.exports = router;

// GET /hw9/credentials — return detective clearance from .env
router.get('/credentials', (req, res) => {
  res.json({
    license: process.env.PI_LICENSE,
    station: process.env.STATION_NAME,
    alert: process.env.ALERT_LEVEL

  });
});

router.get('/cases', (req, res) =>{
    res.json(cases);
})

//POST /hw9/cases - add a new case 
router.post('/cases', (req, res) => {
    const{suspect, location, notes} = req.body;

    if(!suspect || !location){
        return res.status(400).json({error: 'suspect and location required'});
    }

    const newCase = {
        id: nextID++, suspect, location, notes,
        timestamp: new Date(). toISOString()
    };

    cases.push(newCase);
    res.status(201).json(newCase);
});
