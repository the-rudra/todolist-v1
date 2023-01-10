const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.get("/", (req, res) => {
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let currentDay = today.toLocaleDateString("en-US", options);

    res.render('list', {listTitle: currentDay, newListItem: items});
});

app.get("/work", (req, res) => {
    res.render('list', {listTitle: "Work List", newListItem: workItems});
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if(req.body.button === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});

app.listen(3000, function () {
    console.log("server listening on port 3000");
});