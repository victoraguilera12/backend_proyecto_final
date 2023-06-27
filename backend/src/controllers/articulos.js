const { verificarToken } = require("../middleware/middleware");
const { createProducto, createServicio, createPost, getArticulosById } = require("../services/articulosService");

module.exports = function(app){
    const url = "/articulo";
    
    app.get(url+"/all/:userId",async(req,res)=>{
      const id = req.params.userId;
        return getArticulosById(id,res);
    })
    
    /**
     * body = {tipo,articulo}
     * req = {user} desde middleware
     */
    app.post(url,verificarToken,async(req,res)=>{
        const {tipo,articulo} = req.body;
        if(tipo == "producto"){
            return createProducto(articulo,req.user.id,res);
        }else if(tipo == "servicio"){
            return createServicio(articulo,req.user.id,res);
        }else{
            res.sendStatus(400);
        }

    })

    
    

  
}