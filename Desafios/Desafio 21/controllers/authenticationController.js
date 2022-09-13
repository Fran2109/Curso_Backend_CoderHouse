import passport from "passport";

export default class authenticationController {
    constructor() { }
    loginController() {
        return passport.authenticate("login", {
            successRedirect: "/api/successLogin",
            failureRedirect: "/api/failureLogin",
        })
    }
    succesLogin(req, res) {
        res.redirect("/");
    }
    failureLogin(req, res) {
        res.redirect("/loginError");
    }
    registerController() {
        return passport.authenticate("register", {
            successRedirect: "/api/successSignup",
            failureRedirect: "/api/failureSignup",
        })
    }
    successSignup(req, res) {
        res.redirect("/");
    }
    failureSignup(req, res) {
        res.redirect("/signupError");
    }
    logout(req, res) {
        if (req.isAuthenticated()) {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect("/login");
            });
        }
    }
}