const auth0 = require("auth0");

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify("Hello, world!")
  });
};