const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const allChars = require("./data/allChars.json");

const server = express();

server.use(cors());
server.use(bodyParser.json());

var db;
var collection; 

const mongoConnection = async () => {
    // Connect mongo
    try {
        var connection = await MongoClient.connect("mongodb://user:12345@ds251849.mlab.com:51849/starquiz");
        db = connection.db("starquiz");
        collection = await db.collection("pontuation");
    }catch(err) {
        console.error(err);
    }
} 

mongoConnection();

// Save pontuation
server.post("/api/save", async (req, res) => {
    var user = req.body.user;
    var email = req.body.email;
    var pontuation = Number.parseInt(req.body.pontuation);
    
    if(user && email && Number.isInteger(pontuation)) {
        try {
            var insert = await collection.insertOne({ user, email, pontuation });

            console.log(insert);

            res.json({ success: true, message: "Pontuation saved.", data: { user, email, pontuation } }).execute();
        }catch(err) {
            console.log(err)
            res.json({ success: false, error: err });
        }
    }else {
        res.json({ success: false, error: "User, email and pontuation are required." });
    }
});

// List all pontuation
server.get("/api/list", async (req, res) => {
    try {
        var pontuations = await collection.find().sort({ pontuation: -1 }).toArray();
        
        res.json({ success: true, list: pontuations });
    }catch(err) {
        res.json({ success: false, error: err });
    }
});

server.get("/api/allChars", (req, res) => {
    res.json(allChars);
});

server.listen(process.env.PORT || 8000, (err) => {
    //if(err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 8000}`);
});