const jwt = require("jsonwebtoken");
const jwtkey = "farm-tech";

//* Auth middleware

module.exports = (req, res, next) => {
   const token = req.headers['authorization'];
   if (token) {
       jwt.verify(token, jwtkey, (err, valid) => {
           if (err) {
               res.json({ 'result': 'Invalid token' });
           }
           else {
               next();
           }
       })
   }
   else {
       res.json({ 'result': "please provide token" });
   }
}