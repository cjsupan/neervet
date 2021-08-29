const express = require('express');
var bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/assets"));
app.use('/css', express.static('assets/css'));
app.use('/js', express.static('assets/js'));
app.use('/img', express.static('assets/img'));
app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
}));

const server = app.listen(1337, function(){
    console.log("listening to port 1337");
});


app.use(router);

