import jwt from 'jsonwebtoken';
import { privateJWTKey, expiresInToken, adminMail } from './../configs/config.js';

export const generateToken = (user) => {
    return jwt.sign(user, privateJWTKey, { expiresIn: expiresInToken });
}

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).send('No token provided');
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, privateJWTKey, (err, user) => {
        if(err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
}

export const isAdmin = (req, res, next) =>{
    if(req.user.email == adminMail){
        next();
    } else {
        return res.status(400).send("Unauthorized");
    }
}