const User = require('../models/User');

/*exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occured while fetching users'});
    }
};*/

exports.getAllUsers = async (req, res) => {
    
    const isAdmin = true; //todo mechanizm sprawdzania czy jest adminem

    if (!isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = (page - 1) * limit;

        const users = await User.find({})
            .skip(offset)
            .limit(limit)
            .exec();
        
            const total = await User.countDocuments();

            res.status(200).json({
                users,
                pagination: {
                    total,
                    currentPage: page,
                    pageSize: limit,
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const isAdmin = true; //todo mechanizm sprawdzania czy jest adminem

    if (!isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};