const { verificarSesion } = require("../../middleware/middleware");
const {agregarUsuarioBD, loginBD, obtenerUsuarioLogueadoBD,} = require("./service");

module.exports = function(app){
    const url = "/usuarios";
    
    /**
     * Obtiene sesión actual
     */
    app.get(`${url}/:token`,function(req,res){
      const token = req.params.token;
      const session = verificarSesion(token);
      if(session){
        res.status(200).json(session);
      }else{
        res.status(401).json({message:'No autorizado'});
      }
    })
    
    app.post(url, function(req,res){
        const usuario = req.body;
        if(!usuario.name || !usuario.email || !usuario.password){
          res.status(400);
        }
        return agregarUsuarioBD({...req.body},res)
    });

    app.post(url+'/login', function(req,res){
      const usuario = req.body;
      if( !usuario.email || !usuario.password){
        console.log("error")
        res.status(400);
      }
      return loginBD({...req.body},res)
  });

    app.delete(url,function(req,res){
        
    })

    app.put(url,function(req,res){
        
    })

}


const agregarUsuario = async (email, password) => {
  if (email != "" && password != "" ) {
    try {
      await agregarUsuarioBD(email, password);
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

// const login = async (email, password) => {
//   if (email != "" && password != "") {
//     try {
//       const resultado = await loginBD(email, password);
//       if (!resultado) {
//         return false;
//       }
//     } catch (error) {
//       return false;
//     }
//   } else {
//     return false;
//   }
//   return true;
// };

// const obtenerUsuarioLogueado = async (email) => {
//   const resultado = await obtenerUsuarioLogueadoBD(email);
//   return resultado;
// };

// module.exports = { agregarUsuario, login, obtenerUsuarioLogueado };