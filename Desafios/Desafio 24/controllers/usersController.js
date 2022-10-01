import service from "./../service/index.js";
import bCrypt from "bcrypt";
import { generateToken } from "./../jwt/jwt.js";

export default class userController {
    constructor() { }
    async register(req, res) {
        try {
            if(!req.body.email || !req.body.password) {
                res.status(400).json({ error: "User not created" });
            } else {
                const newUser = req.body;
                newUser.password = createHash(newUser.password);
                const user = await service.registerUser(newUser);
                if(user) {
                    const token = generateToken(user);
                    res.status(201).json({ token: token });
                } else {
                    res.status(400).json({ error: "User already exists" });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
