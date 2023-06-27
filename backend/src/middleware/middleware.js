const jwt = require("jsonwebtoken");
const { api_secret } = require("../config/config");

const verificarToken = (req, res, next) => {
  const header = req.headers["authorization"];
  console.log("[MIDDLEWARE] HEADER: "+header)
  if(typeof header !== 'undefined'){
    const token = header.split("Bearer ")[1];
  console.log("[MIDDLEWARE] Verificando token "+token);
    const tokenValido = jwt.verify(token,api_secret);
    if(tokenValido){
      console.log("[MIDDLEWARE] Token valido");
      const user = jwt.decode(token);
      req.user = user;
      next();
    }else{
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(401);
  }

};

const verificarSesion = (token) =>{
  try{
    if(token && jwt.verify(token,api_secret)){
      return jwt.decode(token);
    }
  }catch(e){
    console.error(e);
    return null;
  }

}

const generarToken = (user) =>{
  return jwt.sign(user,api_secret);
}

module.exports = { verificarToken,generarToken,verificarSesion };