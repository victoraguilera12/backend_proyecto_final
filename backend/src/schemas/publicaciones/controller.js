const {agregarUsuarioBD, loginBD, obtenerUsuarioLogueadoBD,} = require("./service");
const {verificarToken} = require("./middleware/middleware");
const { error } = require("console");

module.exports = function(app){
    const url = "/publicaciones";
    
    app.get(url, verificarToken , async(req,res) =>{
       Jwt.verify(req.token, 'passwordEncriptada',(error, authData)=>{
          if(error)
              res.sendStatus(403)
              else{
                res.json({
                  message:"Welcome to Profile",
                  userData:authData
                })
              }
       })
      
      try{  const query ='SELECT * FROM publicaciones'
      const {rows} = await pool.query(query)
       
      res.json(rows) }
      catch{
        res.status(500).json({error:'error al obtener las publicaciones'})
      }
      
    })
    app.get("/publicaciones/:id", async(req,res)=>{ 
      const {id} = req.params; 

      try{
        const query = 'SELECT * FROM publicaciones WHERE id=$1'
        const values = [id]
        const {rows} = await pool.query(query,values);
        if(rows.length === 0){
          res.status(404).json({error:'No se encontro la publicacion'})
        }else{
          res.json(rows[0])
        }
      } catch(error){
        console.error(error)
        res.status(500).json({error:'Error al obtener la publicacion'})
      }

    });
    
    app.post(url, async(req,res)=>{
      const {titulo, precio, descripcion,id_producto} = req.body   
      try{
         const query ='INSERT INTO publicaciones (titulo, precio, descripcion, id_producto) VALUES ($1, $2, $3, $4)'
      const values =[titulo, precio, descripcion, id_producto]
      const {rows} = await pool.query(query, values)
      res.status(201).json(rows[0]) 
    }catch{
      console.error(error)
      res.status(500).json({error:'error al crear la publicacion'})
    }
      
      
    
    })

    app.delete(url,async(req,res)=>{
      const id= req.params.id
      const userId = req.params.id

      try{
        const existQuery ='SELECT * FROM publicaciones WHERE id = $1 AND user_id=$2'
        const existValues =[id, userId]
        const exisResult = await pool.query(existQuery, existValues)
        if(exisResult.rowCount ===0){
          return res.status(404).json({error:'la publicacion no existe'})
        }
        const deletQuery ='DELETE FROM publicaciones WHERE id =$1'
        const deleteValues = [id]
        await pool.query(deletQuery,deleteValues)

        res.sendStatus(204)
      }catch(error){
        res.status(500).json({error:'error al eliminar la publicacion'})
      }
        
    })

    app.put(url,function(req,res){
        
    })

}




