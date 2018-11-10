//check to see if there is a user by the email entered already and decrypting the password
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //get user by email
      const user = await User.findOne({
        email: email
      });
      //then we match password by comparing the password the user entered to whats in db
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          //we want to resolve cos its what we want it to do
          resolve(user);
        } else {
          //if passwords didnt match
          reject('Authentication failed');
        }
      });
    } catch(err) {
      //if email not found, we reject
      reject('Authentication failed');
    }
  });
}
