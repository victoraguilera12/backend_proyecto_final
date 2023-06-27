const { error } = require("console");

module.exports = function(app){
    const url = "/comentarios";

    app.get(url, async(req,res)=>{
       const id = req.params.id
       const query ='SELECT * FROM comentarios WHERE id =$1'
       pool.query(query,[id],(err, result)=>{
       
        if(err){ 
          return res.status(500).json ({error:'Error al buscar el comentario'})
            
        }if (result.rowCount ===0){
          return 
          res.status(404).json({message:'Comentario no encontrado'})
        }
          const comment= result.rows[0]
          res.json(comment)
          console.log (comment)
       })
    })
    
    app.post(url,function(req,res){
        
    })

    app.delete(url,function(req,res){
        
    })

}
