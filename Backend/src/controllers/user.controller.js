import { User } from "../models/user.model.js";
import { logger } from "../utils/logger.js";

const registerUser = async (req, res) => {
    const { email, name, username, password } = req.body;

    console.log(email, name, username, password);

    if (
        !email?.trim() ||
        !username?.trim() ||
        !name?.trim() ||
        !password?.trim()
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (await User.findOne({ username })) {
        return res
            .status(400)
            .json({ error: "User with the same username already exists" });
    }

    if (await User.findOne({ email })) {
        return res
            .status(400)
            .json({ error: "User with the same email already exists" });
    }

    res.status(200).json(
        await User.create({
            username,
            email,
            name,
            password,
        }),
    );
};

export { registerUser };
