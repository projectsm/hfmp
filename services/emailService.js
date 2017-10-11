
var secrets = require('../config/secrets');
var mailer = require('sendgrid')(secrets.sendgrid.api_key);

var service = {};

var applicationName = 'Hugpong Federal Movement Philippines';
var senderAddress = 'HFMP Admin <admin-hfmp@hfmp.herokuapp.com>';

service.sendRequestPasswordEmail = function(email, host, token, done) {
  var mailOptions = {
    to: email,
    from: senderAddress,
    subject: 'Reset your password on ' + applicationName,
    text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account in Hugpong Federal Movement Philippines website.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://' + host + '/reset/' + token + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };

  mailer.send(mailOptions, done);
};

service.sendPasswordChangeNotificationEmail = function(email, done) {
  var mailOptions = {
    to: email,
    from: senderAddress,
    subject: 'Your ' + applicationName + ' password has been changed',
    text: 'Hello,\n\n' +
    'This is a confirmation that the password for your account ' + email + ' has just been changed.\n'
  };

  mailer.send(mailOptions, done);
};

module.exports = service;
