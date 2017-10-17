var mongoose = require('mongoose');
var express = require('express');
var productRouter = express.Router();
var productModel = mongoose.model('Product');
var responseGenerator = require('./../../libs/responseGenerator');

module.exports.controllerFunction = function(app) {

	// creating a product api
	productRouter.post('/createproduct', function(req,res){
		var product = new productModel({

			name 		: req.body.name,
			type		: req.body.type,
			price		: req.body.price,
			modelNo		: req.body.modelNo,
			features	: req.body.features
		});// end product var

		product.save(function(err){
			if (err){
				var myResponse = responseGenerator.generate(true, err, 500 , null);
				res.send(myResponse);
			}
			else {
				var myResponse = responseGenerator.generate(false, " sucessfully created the product details ", 200 , product);
				res.send(myResponse);

			}

		});// end save product

	});// end create product

	// view information of a particular product
	productRouter.post('/productName', function(req,res){
		productModel.findOne({'name':req.body.name}, function(err, foundProduct){
			if(err){
				var myResponse = responseGenerator.generate(true, "some error occured"+err, 500, null )
			}
			else if(!foundProduct){
				var myResponse = responseGenerator.generate(true, "enter correct product name", 404, null);
				res.send(myResponse);
			}
			else{
				var myResponse = responseGenerator.generate(false, " here is the product information", 200 , foundProduct);
				res.send(myResponse);
			}
			console.log(product.features);
		});

	});// end ProductFind

	// list of product by types eg. electronics, or menswear etc...

	productRouter.post('/allProductsByType', function(req,res){
		productModel.find({'type':req.body.type}, function(err,listByType){
			if(err){
				var myResponse = responseGenerator.generate(true, "some error occured"+err,500, null );
				res.send(myResponse);
			}
			else{
				var myResponse = responseGenerator.generate(false, "here all the products of electronics", 200, listByType);
				res.send(myResponse);
			}
		});
	});// end all products by type

	// list of all the products present in the database

	productRouter.get('/allProducts', function(req,res){
		productModel.find({}, function(err,productsList){
			if(err){
				var myResponse = responseGenerator.generate(true, "some error occured"+err,500, null );
				res.send(myResponse);
			}
			else{
				var myResponse = responseGenerator.generate(false, "here all the products of electronics", 200, productsList);
				res.send(myResponse);
			}
		});
	});// end all products

	// api to delete a product

	productRouter.delete('/delete/:id', function(req,res){
		var id = req.params.id;
		productModel.findOneAndRemove({_id: id}, function(err, deleted){
			if(err){
				var myResponse = responseGenerator.generate(true, "some error"+err, 500 , null);
				res.send(myResponse);
			}
			else{
				
				var myResponse = responseGenerator.generate(false, " sucessfully removed the product"+id, 200, deleted);
				res.send(myResponse);
			}
		});
	});// end deleting a product by product ID

	// api to update or edit a product

	productRouter.put('/update/:id', function(req,res){
		var update = req.body;
		var id = req.params.id
		productModel.findOneAndUpdate({_id:id},update,function(err,updated){
			if(err){
				var myResponse= responseGenerator.generate(true, "some error occured"+err, 500, null);
				res.send(myResponse);
			}
			else{
				updated.save(function(err){
					if(err){
						var myResponse = responseGenerator.generate(true, " some error with update"+err , 500 ,null);
						res.send(myResponse);
					}
					else{
						var myResponse = responseGenerator.generate(false, "sucessfully updated", 200, updated);
						res.send(myResponse);
					}
			
			    });
				
			}

		});// end findOneAndUpdate
	}); //end edit or update api


		// api for add products to cart

	productRouter.post('/addtocart/:id', function(req,res){
		productModel.findOne({_id: req.params.id}, function(err, mycart){

			var cart = new productModel({});
			if (err){
				var myResponse = responseGenerator.generate(true, err, 500 , null);
				res.send(myResponse);
			}
			else {
				mycart;
				var myResponse = responseGenerator.generate(false, " sucessfully added the product details ", 200 , mycart);
				res.send(myResponse);

			}	
			

		mycart.save(function(err){
			if (err){
				var myResponse = responseGenerator.generate(true, err, 500 , null);
				res.send(myResponse);
			}
			else {
				var myResponse = responseGenerator.generate(false, " sucessfully created the product details ", 200 , product);
				res.send(myResponse);

			}
		});

		});// end save product

	});// end add to cart

	// api to remove products from cart

	productRouter.delete('/delfromcart/:id', function(req,res){
		productModel.findOne({_id: req.params.id}, function(err, mycart){
			if (err){
				var myResponse = responseGenerator.generate(true, err, 500 , null);
				res.send(myResponse);
			}
			else if(mycart == null){
				var myResponse = responseGenerator.generate(true,"there is no product with this id", 400, null);
			}
			else {
				mycart;
				var myResponse = responseGenerator.generate(false, " sucessfully deleted the product details ", 200 , mycart);
				res.send(myResponse);

			}	
		
		});// end save product

	});// end create product

	// add items to cart
	app.use('/product', productRouter);
}

