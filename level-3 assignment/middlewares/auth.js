var mongoose = require('mongoose');
var userModel = mongoose.model('User');


// app level middleware to set request user 

//to check if its a legitimate user of the system or not
exports.setLoggedInUser = function(req,res,next){
// its checking weatheer this session and session.user exist or not
	if(req.session && req.session.user){
		userModel.findOne({'email':req.session.user.email},function(err,user){
 
			if(user){
				
				req.session.user = user;
				delete req.session.user.password;
				next()
			}
			else{
				
			}
		});
	}
	else{
		next();
	}


}//


exports.checkLogin = function(req,res,next){

	if(!req.session.user){
		 var myResponse = responseGenerator.generate(true, "user session expired",500,null);
         res.send(myResponse);
	}
	else{
		// if it exists then move forward
		next();
	}

}// end checkLogin