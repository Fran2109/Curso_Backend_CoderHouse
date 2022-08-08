import passport from 'passport';
import { Strategy } from 'passport-local';
import bCrypt from 'bcrypt';
import daoUsers from './../daos/daoUsers.js'
import { usersCollection } from './../connections/mongoose.js';

const users = new daoUsers(usersCollection);

passport.use('register', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try{
        const { name, lastname, phone } = req.body;
        const user = await users.saveIfDontExists({ email, password: createHash(password), name, lastname, phone });
        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) => {
        try{
            const user = await users.findByUsername(email);
            if(user && bCrypt.compareSync(password, user.password)){
                done(null, user);
            }else{
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = users.getById(id)
        done(null, user)
    } catch(error) {
        done(error)
    }
});

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

function createHash (password ) {
    return bCrypt.hashSync ( password , bCrypt.genSaltSync (10), null);
}