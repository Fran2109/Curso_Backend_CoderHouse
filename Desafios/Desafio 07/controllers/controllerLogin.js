import { actualizarEstado } from "../middlewares/admin.js";

const controllerLogin = {
    login: (req, res) => {
        actualizarEstado(true);
        res.sendStatus(200);
    },
    logout: (req, res) => {
        actualizarEstado(false);
        res.sendStatus(200);
    }
}

export default controllerLogin;