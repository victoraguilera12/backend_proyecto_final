const {agregarUsuarioBD, loginBD, obtenerUsuarioLogueadoBD,} = require("./service");

module.exports = function(app){
    const url = "/servicios";
    
    app.get(url,async(req,res)=>{
      try{
        const query ='SELECT * FROM servicios'
        const {rows}= await pool.query(query)

        res.json(rows)
      }catch(error){
        res.status(500).json({error:'error al obtener servicios'})
      }
    })
    
    
    app.post(url,async(req,res)=>{
      
         



    })

    app.delete(url,function(req,res){
        
    })

    app.put(url,function(req,res){
        
    })

}



