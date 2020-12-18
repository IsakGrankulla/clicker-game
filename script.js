var express = require("express")
var path = require('path');
var ejs = require('ejs');
var sqlite3 = require('sqlite3').verbose();
var app = express();
var portnummer = 3000;

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {

    res.render("click")
})

app.post('/addhighscore', function (req, res) {

    let db = new sqlite3.Database('highscore.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected.');
    });
    let val2 = req.body.score
    let val1 = req.body.name
    db.run(`INSERT INTO list(name, score) VALUES(?,?)`, val1, val2, function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        db.all(`SELECT * FROM list ORDER BY score DESC LIMIT 10`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row);
            res.render("highscorelist", {
                
            data:row
            });
        });

    });
    // res.json({
    //     message: "sent"
        
    // })

})

app.get('/gethighscore', function (req, res) {

    let db = new sqlite3.Database('highscore.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected.');
        
    });
   
        db.all(`SELECT * FROM list ORDER BY score DESC LIMIT 10`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row);
            res.render("highscorelist", {
                
            data:row
            });
        });
    });
   





app.listen(portnummer, function(){console.log("STARTAT servern och lyssnar på portnummer:" + portnummer)})