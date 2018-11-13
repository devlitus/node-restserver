const jwt = require('jsonwebtoken');
/**
 * Verificacion de token
 */
let verificarToken = (req, res, next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err){
      return res.status(401).json({
        ok: false,
        err: {
          message: 'token no válido'
        }
      });
    }
    req.usuario = decoded.usuario;
    next();

  }); 
};

/**
 * verificar token ADMIN_ROLE
 */

 let verificarAdminRole = (req, res, next) => {
   let usuario = req.usuario;
   /* res.json({
      usuario
    }) */
   if (usuario.role === 'ADMIN_ROLE') {
     next();
   }else{
     return res.json({
       ok: false,
       err: {
         message: 'El usuario no es un administrador'
       }
     })

   }

 }

module.exports = {verificarToken, verificarAdminRole};