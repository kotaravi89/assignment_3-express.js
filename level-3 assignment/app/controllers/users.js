var mongoose = require('mongoose');
var express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// express router // used to define routes 
var userRouter  = express.Router();
var userModel = mongoose.model('User');
var responseGenerator = require('./../../libs/responseGenerator');
// if piece of code repeated 

module.exports.controllerFunction = function(app) {   

    userRouter.post('/signup',function(req,res){

        if(req.body.firstName!=undefined && req.body.lastName!=undefined && req.body.email!=undefined && req.body.password!=undefined){

            var newUser = new userModel({
                userName            : req.body.firstName+''+req.body.lastName,
                firstName           : req.body.firstName,
                lastName            : req.body.lastName,
                email               : req.body.email,
                mobileNumber        : req.body.mobileNumber,
                password            : req.body.password


            });// end new user 

            newUser.save(function(err){
                if(err){

                    var myResponse = responseGenerator.generate(true,err,500,null);
                   res.send(myResponse);
                  

                }
                else{

                    req.session.user = newUser
                    delete req.session.user.password;
                    var myResponse = responseGenerator.generate(false,"user session created successfully",200,newUser);
                    res.send(myResponse); 
                   
                }

            });//end new user save


        }
        else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            res.send(myResponse);

            

        }
        

    });//end signup api


    userRouter.post('/login',function(req,res){

        userModel.findOne({$and:[{'email':req.body.email},{'password':req.body.password}]},function(err,foundUser){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else if(foundUser==null || foundUser==undefined || foundUser.userName==undefined){
                    console.log("got here");
                var myResponse = responseGenerator.generate(true,"user not found. Check your email and password",404,null);
                res.send(myResponse);
              

            }
            else{

                req.session.user = foundUser;
                delete req.session.user.password;
                var myResponse = responseGenerator.generate(false,"successfully logged in user with session",200,foundUser);
                res.send(myResponse);
                  

            }

        });// end find


    });// end login api

    userRouter.post('/forgetPassword', function(req,res){
        userModel.findOne({'email': req.body.email}, function(err,foundUser ){
            if(!foundUser){
                var myResponse = responseGenerator.generate(true,"please check your email id", 404 , null);
                res.send(myResponse);
            }
            else if (err) {
                var myResponse = responseGenerator.generate(true,"entered wrong email id", 404 , null);
                res.send(myResponse);
            }
            else{
               var transporter = nodemailer.createTransport({
                  service : "gmail",
                  secure  : false,
                  port    : 25,
                  auth: {
                    user: 'kota.raavi@gmail.com',
                    pass: 'datascience'
                  }
                });
                var mailOptions = {
                  from: 'Ravi Kota <kota.raavi@gmail.com>',
                  to: foundUser.email,
                  subject: 'Sending Email using Node.js',
                  text: 'hi puppy good morning .... ellu oooku first!'
                };
                transporter.sendMail(mailOptions, function(err, info){
                  if (err) {
                    console.log(err);
                    //var myResponse = responseGenerator.generate(true,"entered coming here wrong email id", 404 , null);
                    //res.send(myResponse);
                  } else {
                    console.log('Email sent: ' + info.response);
                    var myResponse = responseGenerator.generate(false,"check your modified inbox", 200 , info.response );
                    res.send(myResponse);
                  }
                });
                
            }
        });
    });// end forgetPassrword
    // this  should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 
    app.use('/users', userRouter);

} //end contoller code




