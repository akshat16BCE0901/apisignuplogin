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
    mongoClient.connect(url,function(err,db)
    {
        var details = req.body;
        var query = {username:details.uname,password:details.password};
        if(err) throw err;
        var dbo = db.db("signature");
        dbo.collection("details").find(query).toArray(function(err,result)
        {
            if(err) throw err;
            console.log(result);
            if(result.length>0)
            {
                res.send("Username and Password matched with a record\n" +JSON.stringify(result));
            }
            else{
                res.send('No Such entry found in database\n'+ JSON.stringify(result));
            }
        });
    });

});
module.exports = router;