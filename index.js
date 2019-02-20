var http=require("http");
var fs= require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var app = new express();
var signup = require("./signup.js");
var login = require("./login.js");
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var url  = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({extended:true}));
app.use("/submit",signup);
app.use("/login",login);
app.listen(3000);