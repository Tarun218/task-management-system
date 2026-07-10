import User from "../models/user.model.js";

const getUser = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                message: "Provide a name or email"
            });
        }

        const users = await User.find({
            $or: [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        }).select("_id name email");

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }

        res.status(200).json({
            users
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export default getUser;