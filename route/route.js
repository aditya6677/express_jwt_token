const express=require('express');
const rou=express.Router();
const mongo=require('mongoose');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../model/user');


rou.get('/hello',function(req,res){
    res.send('working');
});

rou.post('/signup',function(req,res){
    bcrypt.hash(req.body.pass,10,function(err,hash){
        if(err){
            return res.status(500).json({
                "error":err
            })
        }
        else{
            const user=new User({
                email:req.body.email,
                pass:hash
            });
            user.save().then(function(result){
                //console.log(result);
                res.status(200).json({
                    success:'new usesr created'
                });
            }).catch(error=>{
                res.status(500).json({
                    error:'naa something galat'
                });
            })
        }
    });
});

rou.post('/login',function(req,res){
    User.findOne({
        email:req.body.email
    }).exec().then(function(user){
        bcrypt.compare(req.body.pass,user.pass,function(req,result){
            if(result){
                const jwtoken=jwt.sign({
                    email:user.email,
                    _id:user._id
                },
                'secret',
                {
                    expiresIn:'2h'
                });
                return res.status(200).json({
                    success:'Welcome',
                    token:jwtoken,
                });
            }
            else{
                return res.status(401).json({
                    failed:'Nikal Lo'
                })
            }

        });
    }).catch(error=>{
        res.status(500).json({
            error:'Nikal Lo Fir Bhi'
        });
    });
});

module.exports=rou;