
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var productSchema = new Schema({

	type 			: {type:String,default:'',required:true},
	name			: {type:String,default:''},
	modelNo  		: {type:Number,default:''},
	price	  		: {type:Number,default:''},
	features  		: []
	
});
mongoose.model('Product',productSchema);