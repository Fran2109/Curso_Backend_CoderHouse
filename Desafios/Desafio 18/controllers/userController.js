
export const register = async (req, res) => {
    res.send(req.user);
}

export const login = async (req, res) => {
    res.send(req.user);
}