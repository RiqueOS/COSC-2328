// IC1 – COSC 2328 – Professor McCurry
// Implemented by: [Enrique Sanchez]

require('dotenv').config();                              // NEW — IC19: read .env and load values into process.env
const PORT = process.env.PORT || 3000;                  // NEW — IC19: use PORT from .env, fall back to 3000


const express = require("express");                       // load the Express web framework
const path    = require("path");                          // built-in Node module for working with file paths
const app     = express();                               // create the Express application

app.use(express.static(path.join(__dirname, "public"))); // serve every file in public/ as a static file

// IC19 — mission status route
app.get('/ic19/status', (req, res) => {                  // NEW — IC19: GET route, responds with plain text
  res.send(`Mission Zone: ${process.env.MISSION_ZONE} | Alert Level: ${process.env.ALERT_LEVEL}`);
});

// IC19 — config route (returns JSON)
app.get('/ic19/config', (req, res) => {                  // NEW — IC19: GET route, responds with JSON
  res.json({
    zone:       process.env.MISSION_ZONE,
    alert:      process.env.ALERT_LEVEL,
    port:       PORT,
    serverTime: new Date().toISOString(),
  });
});

// IC20 route mount
app.use(express.json()); // this parses the JSON request body

app.use("/ic20", require("./routes/ic20-routes"));
//HW9 here
app.use('/hw9', require('./routes/hw9-routes'));  // NEW — HW9: mount hw9 router



app.listen(PORT, "0.0.0.0", () =>                        // 0.0.0.0 makes the server reachable from the droplet (IC2)
  console.log(`Running on http://localhost:${PORT}`)
);

