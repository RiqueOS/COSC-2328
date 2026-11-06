// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

const express = require('express');
const router  = express.Router();

let cases  = [];   // in-memory case log — resets on server restart
let nextID = 1;

module.exports = router;

// GET /hw9/credentials — return detective clearance from .env
router.get('/credentials', (req, res) => {
  res.json({
    license: process.env.license,
    station: process.env.station,
    alert: process.env.alert

  });
});

router.get('/cases', (req, res) =>{
    res.json(cases);
})

//POST /hw9/cases - add a new case 
router.post('/cases', (req, res) => {
    const{suspect, location, notes} = req.body;

    if(!suspect || !location){
        return res.status(400).json({error: 'suspect and location requried'});
    }

    const newCase = {
        id: nextID++, suspect, location, notes,
        timestamp: new Date(). toISOString()
    };

    cases.push(newCase);
    res.status(201).json(newCase);
});
