const User = require("../models/user.model");
const Jwt = require("jsonwebtoken");
const jwtkey = "farm-tech";

exports.signup_user = async (req, res) => {
   const { email, password, name } = req.body;
   console.log(email, password, name);
   if (!email || !password || !name) {
       return res.status(400).json({ error: "All fields are required" });
   }

   let exist = await User.findOne({ email: email });
   if (exist) {
       return res.json({ 'result': 'User already exists!' });
   }
   else {
       const user = new User({ name, email, password });
       let result = await user.save();
       result = result.toObject();
       delete result.password;
       Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
           if (err) {
               res.json({ result: "Something went Wrong, Please try later!!" });
           }
           res.json({ user, auth: token });
       })
   }
};

exports.login_user = async (req, res) => {
   console.log(req.body);
   if (req.body.password && req.body.email) {
       let user = await User.findOne(req.body).select("-password");
       if (user) {
           Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
               if (err) {
                   res.json({ result: "Something went Wrong, Please try later!!" });
               }
               res.json({ user, auth: token });
           })
       }
       else {
           res.json({ "result": "Wrong Email or Password" });
       }
   }
   else {
       res.json({ "result": "No User Found" });
   }
};
