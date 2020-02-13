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
        res.status(500).json({error: "The users information could not be retrieved."});
    });
});

//GET LIST OF USER BY ID
server.get('/api/users/:id', (req, res, next) => {
    db.findById(req.params.id)
    .then(user => { 
        if(user.id !== req.params.id){
            res.status(404).end().json({message: "The user with the specified ID does not exist." })
        }else{
            console.log(user);
            res.status(200).json(user);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

//POST USER
server.post('/api/users', (req, res) => {

    if(req.body.name  === null || req.body.name  === ''){

        res.status(400).json({ "errorMessage": "Please provide name and bio for the user." });
        
    }else if(req.body.bio  === null || req.body.bio  === ''){

        res.status(400).json({ "errorMessage": "Please provide name and bio for the user." });

    }else{
        db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({"errorMsg" : "There was an error while saving the user to the database"});
        });     
    };
});

//UPDATE/PUT USER
server.put('/api/users/:id', (req, res) => {
    const data = req.body;

    if(req.body.name  === null || req.body.name  === ''){

        res.status(400).json({ "errorMessage": "Please provide name and bio for the user." });
        
    }else if(req.body.bio  === null || req.body.bio  === ''){

        res.status(400).json({ "errorMessage": "Please provide name and bio for the user." });

    }else{
        db.update(req.params.id, data)
        .then(user => {
            if(user.id !== req.params.id){
                res.status(404).end().json({message: "The user with the specified ID does not exist." })
            }else{
                console.log(user);
                res.status(200).json(user)
            }
            
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: "The user information could not be modified."});
        });
    }
});

//DELETE USER 
server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(user => {
        if(user.id != req.params.id){
            res.status(404).json({ message: "The user with the specified ID does not exist." });   
        }else{
            res.status(200).json(user)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: "The user could not be removed" });
    });
})

server.listen(port, () => console.log(`Server Runnin on port: ${port}`));