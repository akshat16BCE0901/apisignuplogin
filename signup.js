var http=require("http");
var fs= require("fs");
var express = require("express");
var app = new express();
var router = express.Router();
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var url  = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({extended:true}));
router.post("/",function(req,res)
{
    var person = req.body;
    res.send(JSON.stringify(person));
    mongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        console.log('connected to database');
        var dbo = db.db("signature");
        var myobj = {username:person.uname,password:person.password};
        dbo.collection("details").insertOne(myobj,function(err,response)
        {
            if(err) throw err;
            console.log("Document Inserted");
        })

    });
});

module.exports = router;