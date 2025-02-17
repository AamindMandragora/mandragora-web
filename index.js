const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.render("pages/home")
});

app.get("/home", (req, res) => {
    res.redirect("/")
});

app.get("/linalg-notes", (req, res) => {
    res.render("pages/linalg-notes")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))