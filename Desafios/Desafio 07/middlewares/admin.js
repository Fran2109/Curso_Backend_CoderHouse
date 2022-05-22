let esAdmin = false;

export function soloParaAdmins(req, res, next) {
    if (esAdmin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

export function actualizarEstado(estado) {
    esAdmin = estado;
}