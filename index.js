// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const server = express();
const port  = 5000;

server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
    res.json({"hello": "world"});
});

server.get('/api/users', (req, res)=> {
    db.find()
    .then( user => {
        res.status(200).json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({"errorMsg" : error});
    });
});


server.listen(port, () => console.log(`Server Runnin on port: ${port}`));