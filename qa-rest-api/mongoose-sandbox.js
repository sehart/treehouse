'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', function(err) {
	console.error('connection error:', err);
});

db.once('open', function() {
	console.log('Databse connection successful');
	//All database communication goes here

	var Schema = mongoose.Schema;
	var AnimalSchema = new Schema({
		type: { type: String, default: 'goldfish'},
		size: String,
		color: { type: String, default: 'gold'},
		mass: {type: Number, default: 1 },
		name: { type: String, default: 'angela'}
	});

	AnimalSchema.pre('save', function(next) {
		if (this.mass >= 100) {
			this.size = "big";
		} else if (this.mass >= 5 && this.mass < 100) {
			this.size = "medium";
		} else {
			this.size = "small";
		}
		next();
	});

	AnimalSchema.statics.findSize = function(size, callback) {
		return this.find({size: size}, callback);
	};

	AnimalSchema.methods.findSameColor = function(callback) {
		return this.model("Animal").find({color: this.color}, callback)
	};

	var Animal = mongoose.model('Animal', AnimalSchema);

	var penguin = {
		type: 'elephant',
		color: 'black and white',
		mass: 10,
		name: 'Phillip'
	};

	var whale = {
		type: "whale",
		mass: 999,
		name: 'fig'
	}

	var animalData = [
		{
			type: "mouse",
			color: "gray",
			mass: 0.035,
			name: "Marvin"
		},
		{
			type: "elk",
			color: "brown",
			mass: 6.35,
			name: "Gretchen"
		},
		{
			type: "elephant",
			color: "gray",
			mass: 45,
			name: "Iris"
		},
		penguin,
		whale,
		Animal
	];

	Animal.remove({}, function() {

		Animal.create(animalData, function(err, animals) {
			if (err) {
				console.error(err)
			}
			Animal.findOne({type: "elephant"}, function(err, elephant) {
				if (err) {
					console.error(err)
				}
				elephant.findSameColor(function(err, animals){
					animals.forEach(function(animal) {
						console.log(animal.name + ' the ' + animal.color + ' ' + animal.type + ' is a ' + animal.size + ' sized animal.')
					});
					db.close(function() {
						console.log('db connection closed');
					});
				})
			})
			
		});

	});

});
