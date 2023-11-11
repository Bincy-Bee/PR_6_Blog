const express = require('express');
const { connection } = require('./config/db');
const { router } = require('./routes/user.route');
const cookie = require('cookie-parser');
const { brouter } = require('./routes/blog.route');
const { mRoute } = require('./routes/movie.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookie()); 
app.use("/user",router);
app.use("/blog",brouter);
app.use(mRoute);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));


app.listen(8090, ()=>{
    console.log('Server is listening om http://localhost:8090');
    connection();
})