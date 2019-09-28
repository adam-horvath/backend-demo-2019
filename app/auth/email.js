let nodemailer = require('nodemailer');
let User = require('../models/user');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'backend.demo.2019@gmail.com',
    pass: 'Kiskacsa123'
  }
});

let rand, mailOptions, host, link;

let sendMail = (req, res) => {
  rand = Math.floor((Math.random() * 1000000) + 54321);
  host = req.get('host');
  link = "http://localhost:8080/api/verify?id=" + rand;
  mailOptions = {
    from: 'Advanced Programming Team',
    to: req.body.email,
    subject: "Please confirm your email address",
    html: "<div>Hello,<br/> Please click on the link below to confirm your email address.<br/><a href=" + link + ">Click here</a></div>"
  };
  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(3000);
      throw err;
    } else {
      console.log(3001, 'Message sent to ' + req.body.email);
      return res.status(200).send({'msg': 'Message sent.'})
    }
  });
};

let verify = (req, res) => {
  if ((req.protocol + "://" + req.get('host')) === ("http://" + host)) {
    if (+req.query.id === rand) {
      User.findOne({
        email: mailOptions.to
      }, (err, user) => {
        if (err) {
          console.log(3002, err.message);
          return res.status(404).send({success: false, msg: 'User not found.'});
        }
        if (!user) {
          console.log(3003, 'User not found.');
          return res.status(404).send({success: false, msg: 'User not found.'});
        } else {
          user.account_type = 'CONFIRMED';
          user.save((err) => {
            if (err) {
              console.log(3008, err.message);
              throw err;
            }
            console.log(3009, mailOptions.to + ' verified.');
            return res.status(200).send(
              "<div style='font-size: 20px'>Hello,<br/> you have successfully confirmed your email address. Now you can login.</div>"
            );
          });
        }
      });
    }
    else {
      console.log(3010, 'Bad request.');
      return res.status(400).send({success: false, 'message': 'Bad request'});
    }
  }
  else {
    console.log(3011, 'Request is from unknown source.');
    return res.status(500).send({success: false, 'message': 'Request is from unknown source.'});
  }
};

module.exports = {
  sendMail,
  verify,
};