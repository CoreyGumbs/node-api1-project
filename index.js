// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const server = express();
const port  = 5000;

server.use(express.json());
server.use(cors());

//GET REQUESTS
//Test URL
server.get('/', (req, res) => {
    res.json({"hello": "world"});
});

//GET LISTS OF ALL USERS
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

//GET LIST OF USER BY ID
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({"errorMsg" : error});
    });
});

//POST USER
server.post('/api/users', (req, res) => {
    const data = req.body;
    db.insert(data)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({"errorMsg" : error});
    });
});

//UPDATE/PUT USER
server.put('/api/users/:id', (req, res) => {
    const data = req.body;
    db.update(req.params.id, data)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({"errorMsg" : error});
    });
})

server.listen(port, () => console.log(`Server Runnin on port: ${port}`));