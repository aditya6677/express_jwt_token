const express=require('express');
const app=express();
const bp=require('body-parser');
const mongo=require('mongoose');
const PORT=7070;
const routes=require('./route/route');
mongo.connect('mongodb://localhost:27017/jwtauth');


//for parsing data
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use('/',routes);

app.listen(PORT,function(){
    console.log('Server is running at', PORT);
});