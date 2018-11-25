module.exports = function (req, res, next){
    if (req.user.position != "Administrador" || req.user.position != "Gestión") return res.status(403).send('Acceso Denegado.');

    next();
}