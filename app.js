const express = require("express")
const ejs = require("ejs")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const fs = require("fs")
const app = express()


app.use(bodyparser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////








// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const db = mongoose.createConnection("mongodb+srv://Sarthak:1234@cluster0.12szh4h.mongodb.net/animalDB")
const suggestion = mongoose.createConnection("mongodb+srv://Sarthak:1234@cluster0.12szh4h.mongodb.net/suggestionDB")

const User = db.model("User", new mongoose.Schema({
    email: String,
    password: String
}))

const suggestModel = suggestion.model("suggestModel", new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
}))

// =========================================================== GET ROUTS =========================================================


app.get("/", function(req, res) {
    res.render("home")
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.get("/home", function(req, res) {
    res.render("home")
})

app.get("/zoo", function(req, res) {
    res.render("zoo")
})

app.get("/rescue", function(req, res) {
    res.render("rescue")
})

app.get("/career", function(req, res) {
    res.render("career")
})

app.get("/Animals", function(req, res) {

    res.render("Animals")
})

app.get("/gallery", function(req, res) {
    res.render("gallery")
})

app.get("/register", function(req, res) {
    res.render("register")
})

app.get("/login", function(req, res) {
    res.render("login")
})



// ************************************************************************* POST ROUT ***********************************************************


app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    newUser.save(function(err) {
        if (err) {
            console.log("errors occures")
        } else {
            res.render("home")
        }
    })
})

app.post("/login", function(req, res) {
    const Username = req.body.email
    const password = req.body.password

    User.findOne({ email: Username }, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("home")
                }
            }
        }
    })
})

app.post("/home", function(req, res) {
    const newsuggest = new suggestModel({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })
    newsuggest.save(function(err) {
        if (err) {
            console.log("error occure")
        } else {
            res.render("home")
        }
    })
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, function() {
    console.log("Server start on port 3000")
})