const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occured while fetching users'});
    }
};