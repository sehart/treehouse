var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email: {
		type:String,
		unique: true,
		required: true,
		trim: true
	},
	name: {
		type:String,
		required: true,
		trim: true
	},
	favoriteBook: {
		type:String,
		required: true,
		trim: true
	},
	password: {
		type:String,
		required: true,
	}
});

//authenticate user inpute against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({email: email})
		.exec(function(error, user) {
			if (error) {
				return callback(error);
			} else if (!user) {
				var err = new Error('User not found');
				err.status = 401;
				return callback(error);
			} else {
				bcrypt.compare(password, user.password, function(error, result) {
					if (result === true) {
						return callback(null, user);
					} else {
						return callback();
					}
				});
			}
		});
}

UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}

		user.password = hash;
		next();
	})
})

var User = mongoose.model('User', UserSchema);
module.exports = User;