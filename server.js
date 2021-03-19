// setting up dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// declares express as the server
const app = express();
// sets up port
const PORT = 3000;

// sets up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// gives server routes to respond through
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// sets up listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));