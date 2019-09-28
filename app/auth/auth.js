let User = require('../models/user'); // get the mongoose model
let config = require('../../config/database'); // get db config file
let jwt = require('jwt-simple');
let email = require('./email');

let register = (req, res) => {
  if (!req.body.email || !req.body.password) {
    console.log('Please pass correct parameters.');
    return res.status(400).send({msg: 'Please pass correct parameters.'});
  }
  // email address validation
  if (!validateEmail(req.body.email)) {
    console.log('Invalid email address: ' + req.body.email);
    return res.status(400).send({success: false, msg: 'Invalid email address.'});
  }
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    account_type: 'REGISTERED',
  });
  if (req.body.name) {
    newUser.name = req.body.name;
  }
  // save the user
  newUser.save(async (err, user) => {
    if (err) {
      // if the user exists and rejected by the admin
      User.findOne({
        email: req.body.email
      }, async (err2, existingUser) => {
        if (err2) {
          console.log(err2.message);
          return res.status(500).send({success: false, msg: err2.message});
        }
        if (existingUser.account_type.toString() === 'REJECTED') {
          try {
            await email.sendMail(req, res);
          } catch (e) {
            console.log(e.message);
            return res.status(500).send({success: false, msg: 'Problem occurred when tried to send email.'});
          }
          existingUser.password = req.body.password;
          existingUser.account_type = 'REGISTERED';
          existingUser.save((err3) => {
            if (err3) {
              console.log(err3.message);
              return res.status(500).send({success: false, msg: err3.message});
            }
            console.log(newUser.email + ' created successfully');
            return res.status(200).send({success: true, msg: 'User created successfully.'});
          });
        }
        else {
          console.log('ExistingUser');
          return res.status(500).send({success: false, msg: 'Ez a felhasználó már létezik.'});
        }
      });
    }
    else {
      console.log(newUser.email + ' created successfully');
      try {
        await email.sendMail(req, res);
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({success: false, msg: 'Problem occurred when tried to send email.'});
      }
      return res.status(200).send({success: true, msg: 'User created successfully.'});
    }
  });
};

let login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    console.log('Please pass correct parameters.');
    return res.status(400).send({msg: 'Please pass correct parameters.'});
  }
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.status(404).send({success: false, msg: 'User not found.'});
    }
    if (!user) {
      console.log('Authentication failed. User not found.');
      return res.status(404).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if the user has not confirmed his/her email address
          if (user.account_type.toString() === 'REGISTERED') {
            console.log('Please confirm your email address.');
            return res.status(403).send({success: false, msg: 'Please confirm your email address.'});
          }
          // if the admin has rejected the user
          if (user.account_type.toString() === 'REJECTED') {
            console.log('The admin has rejected your registration.');
            return res.status(403).send({success: false, msg: 'The admin has rejected your registration.'});
          }
          // if user is found and password is right create a token
          let token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          console.log('JWT provided.');
          return res.status(200).send({token: 'Bearer ' + token, id: user.id});
        } else {
          console.log('Wrong password');
          return res.status(401).send({msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
};

let getUser = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      let decoded = jwt.decode(token, config.secret);
      User.findOne({
        email: decoded.email
      }, (err, user) => {
        if (err) {
          return reject(err.message);
        }
        if (!user) {
          return reject('User not found.');
        }
        return resolve(user);
      });
    }
    else {
      return reject('Authentication failed.');
    }
  });
};

let getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

let validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

module.exports = {
  register,
  login,
  getToken,
  getUser,
};