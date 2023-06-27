
module.exports = function(app){ 
    const url = "/publicaciones";

app.get('/publicaciones/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const query ='SELECT * FROM publicaciones WHERE id= $1'
        const values =[id]
        const {rows} = await pool.query(query, values)
        if (rows.length === 0){
             res.status(404).json({error: ' no se encontro ninguna publicacion'})
        } else{
            res.json(rows[0])
        }
    }catch(error) {
        console.error(errror)
        res.status(500).json ({error:'error al obtener la publicacion'})
    }
    
      
  });

   }