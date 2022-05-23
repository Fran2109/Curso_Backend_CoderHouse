let esAdmin = false;

export function soloParaAdmins(req, res, next) {
    if (esAdmin) {
        next()
    } else {
        res.status(403).json( { error : 403, descripcion: `ruta '${req.baseUrl}${req.url}' método '${req.method}' no autorizada` } )
    }
}

export function actualizarEstado(estado) {
    esAdmin = estado;
}