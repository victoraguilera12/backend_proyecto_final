const {agregarUsuarioBD, loginBD, obtenerUsuarioLogueadoBD,} = require("./service");

module.exports = function(app){
    const url = "/productos";
    
    app.get(url,async(req,res)=>{
      try{
        const query = 'SELECT * FROM productos'
        const {rows} = await pool.query(query)

        res.json(rows)

      }catch(error){
        res.status(500).json({error:'error al obtener los productos'})
      }
    })
    
    
    app.post(url,async(req,res)=>{
      const {id,id_usuario,nombre, marca, descripcion, id_categoria} = req.body
      try{
        const query =' INSERT INTO productos (id, id_usuario, nombre, marca, descripcion, id_categoria) VALUES ($1,$2) RETURNING *'
        const values = [id, id_usuario, nombre, marca, descripcion, id_categoria]
        const {rows} = await pool.query(query, values)

        res.status(201).json(rows[0])
      
      }catch(error){

        res.status(500).json({error:'error al crear producto'})
      }
        


    })

    app.delete(url,function(req,res){
        
    })

    app.put(url,function(req,res){
        
    })

}



