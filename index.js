// implement your API here
const express = require('express');
const cors = require('cors');
const server = express();
const port  = 5000;

server.use(express.json());
server.use(cors());




server.listen(port, () => console.log(`Server Runnin on port: ${port}`));