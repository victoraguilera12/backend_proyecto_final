const { getAllCategorias } = require("./service");

module.exports = function(app){
    const url = "/categorias";
    
    app.get(url,async(req,res)=>{
        
        
        return getAllCategorias(res).then(x=>res.status(200).json(x))
    })
}

