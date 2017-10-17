
exports.generate = function(error,message,status,data){

	var myResponse = {
                error: error,
                message: message,
                status: status,
                data: data
    };

    return myResponse;

}

exports.generate = function(error, message , status , data ){

	var mycart =  {
				error 	: error ,
				message : message,
				status  : status,
				data    : data
	};

	return mycart;
}


