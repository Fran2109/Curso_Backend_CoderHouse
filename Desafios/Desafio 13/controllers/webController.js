const webControllers = {
    inicio: (req, res) => {
        res.sendFile('index.html', { root: './public/views' })
    },
    login: (req, res) => {
        res.sendFile('login.html', { root: './public/views' })
    },
    loginError: (req, res) => {
        res.sendFile('errorLogin.html', { root: './public/views' })
    },
    logout: (req, res) => {
        res.sendFile('logout.html', { root: './public/views' })
    },
    signup: (req, res) => {
        res.sendFile('signup.html', { root: './public/views' })
    },
    signupError: (req, res) => {
        res.sendFile('errorSignup.html', { root: './public/views' })
    }
}

export default webControllers;