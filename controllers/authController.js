const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
    if(!req.body.email || !req.body.username || !req.body.password){
        res.status(400).send("Invalid details");
        return;
    }
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt();
        const passwordHash = (await bcrypt.hash(password, salt)).toString();
        const newUser = new User({ username, email, passwordHash });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.json({ token });
    } 
    catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    if(!req.body.password || !req.body.email){
        res.status(400).send("Invalid details");
        return;
    }
  
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ error: "Wrong password" });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } 
    catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}