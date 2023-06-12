const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers, Is function to authenticate and decode JWT token
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Extract the token from the "Authorization" header if present
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // If no token is found, return the request object as is
    if (!token) {
      return req;
    }
    // Verify and decode the token using the secret key and expiration time
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;  // Set decoded user data in the request 
    } catch {
      console.log('Invalid token');
    }
  // Return the modified request object
    return req;
  },
  // Function to sign a new JWT token
  signToken: function ({ name, email, _id }) {
    const payload = { name, email, _id };
  // Sign the token using the payload, secret key, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};