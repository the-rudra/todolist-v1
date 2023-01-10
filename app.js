const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let items = ["Buy food", "Cook food", "Eat food"];

app.get("/", (req, res) => {
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let currentDay = today.toLocaleDateString("en-US", options);

    res.render('list', {kindOfDay: currentDay, newListItem: items});
});

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("server listening on port 3000");
});