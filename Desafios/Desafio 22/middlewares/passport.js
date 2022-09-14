import passport from "passport";
import { Strategy } from "passport-local";
import service from "./../service/index.js";
import bCrypt from "bcrypt";

passport.use(
    "register",
    new Strategy(
        async function (username, password, done) {
            try {
                const user = await service.saveUserIfDontExists({
                    username,
                    password: createHash(password),
                });
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new Strategy(async function (username, password, done) {
        try {
            const user = await service.findByUsername(username);
            if (user && bCrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await service.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
