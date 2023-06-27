const pool = require("../config/conexion");

const createProducto = async ({nombre,image,categoria,marca},id_usuario,res) =>{
  console.log("Creando producto");
  if(!categoria || categoria.id_categoria == null ){
    res.status(400).json({message:"Categoria invalida"})
  }

  const consulta = "INSERT INTO productos (nombre,imagen,marca,id_usuario,id_categoria) values ($1,$2,$3,$4,$5) RETURNING *";
  const values = [nombre,image,marca,id_usuario,categoria.id_categoria];
  try {
    const {rows} = await pool.query(consulta,values);
    res.status(200).json({message:"Producto creado con éxito.",articulo:rows[0]})
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Error interno desconocido"});
  }

}

const createServicio = async ({nombre,categoria},id_usuario,res) =>{
  console.log("Creando Servicio");
  if(!categoria || categoria.id_categoria == null ){
    res.status(400).json({message:"Categoria invalida"})
  }
  const consulta = "INSERT INTO servicios (nombre,id_usuario,id_categoria) values ($1,$2,$3) RETURNING *";
  const values = [nombre,id_usuario,categoria.id_categoria];
  try {
    const {rows} = await pool.query(consulta,values);
    res.status(200).json({message:"Servicio creado con éxito.",articulo:rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Error interno desconocido"});
  }
}

const createPost = async ({titulo,descripcion,precio},id_producto,id_servicio,id_usuario,res) =>{
  console.log("Creando Publicacion");
  const consulta = "INSERT INTO publicaciones (titulo,precio,descripcion,id_producto,id_servicio,activo,completado) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *"
  const values = [titulo,precio,descripcion,id_producto?id_producto:null,id_servicio?id_servicio:null,true,false];
  try {
    const {rows} = await pool.query(consulta,values);
    const id_publicacion = rows[0].id_publicacion;
    //id usuario //id_publicacion //fecha_post fecha vendido
    const consulta2 = "INSERT INTO usuarios_publicaciones (id_usuario,id_publicacion,fecha_post) values ($1,$2,to_timestamp($3 / 1000.0))"
    const values2 = [id_usuario,id_publicacion,Date.now()];
    await pool.query(consulta2,values2)
    res.status(200).json({message:"Publicacion creada con éxito."})
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Error interno desconocido"});
  }
}

const getArticulosById = async(id,res) =>{
  try{
    const query =`SELECT id_producto,null as id_servicio,nombre,imagen,id_categoria,marca from productos
    where id_usuario = $1
    UNION 
    SELECT null as id_producto,id_servicio,nombre,null as imagen,id_categoria, null as marca from servicios
    where id_usuario = $1`
    const values = [id]
    const {rows}= await pool.query(query,values);
    res.status(200).json(rows)
  }catch(error){
    res.status(500).json({error:'error al obtener Articulos'})
  }
}

const getPublicacionesById = async(id,res) =>{
  try{
    const query =`SELECT * from publicaciones
    where id_usuario = $1`
    const values = [id]
    const {rows}= await pool.query(query,values);
    res.status(200).json(rows)
  }catch(error){
    res.status(500).json({error:'error al obtener publicaciones'})
  }
}

const getAllPublicacionesProductos = async() =>{
  const query = `
SELECT * FROM usuarios_publicaciones up
JOIN (SELECT id_usuario,nombre,img,email from usuarios) u ON up.id_usuario = u.id_usuario 
JOIN (SELECT * FROM publicaciones p JOIN productos pd ON p.id_producto = pd.id_producto) as pp
ON up.id_publicacion = pp.id_publicacion
  `;
  const {rows}= await pool.query(query);
  return Promise.resolve(rows);
}


const getAllPublicacionesServicios = async() =>{
  const query = `
  SELECT * FROM usuarios_publicaciones up
  JOIN (SELECT id_usuario,nombre,img,email from usuarios) u ON up.id_usuario = u.id_usuario 
  JOIN (SELECT * FROM publicaciones p JOIN servicios s ON p.id_servicio = s.id_servicio) as ss
  ON up.id_publicacion = ss.id_publicacion
  `;
  const {rows}= await pool.query(query);
  return Promise.resolve(rows);
}

const getAllPublicacionesProductosById = async(id) =>{
  const query = `
SELECT * FROM usuarios_publicaciones up
JOIN (SELECT id_usuario,nombre,img,email from usuarios) u ON up.id_usuario = u.id_usuario 
JOIN (SELECT * FROM publicaciones p JOIN productos pd ON p.id_producto = pd.id_producto) as pp
ON up.id_publicacion = pp.id_publicacion
where up.id_usuario = $1
  `;
  const {rows}= await pool.query(query,[id]);
  return Promise.resolve(rows);
}


const getAllPublicacionesServiciosById = async(id) =>{
  const query = `
  SELECT * FROM usuarios_publicaciones up
  JOIN (SELECT id_usuario,nombre,img,email from usuarios) u ON up.id_usuario = u.id_usuario 
  JOIN (SELECT * FROM publicaciones p JOIN servicios s ON p.id_servicio = s.id_servicio) as ss
  ON up.id_publicacion = ss.id_publicacion
  where up.id_usuario = $1
  `;
  const {rows}= await pool.query(query,[id]);
  return Promise.resolve(rows);
}
const getPublicacionesUsuariosProductos = async(id)=>{
  const query = `select * from usuarios_publicaciones up, publicaciones p, productos pp,(select nombre as nombre_usuario, id_usuario,img as imgperfil,email from usuarios) u
  where p.id_producto =$1 pp.id_producto and up.id_usuario = u.id_usuario and up.id_publicacion = p.id_publicacion
  
  `;
  const {rows}= await pool.query(query,[id])
  return Promise.resolve(rows);
}
const getPublicacionesUsuariosServicios = async(id)=>{
  const query = `select * from usuarios_publicaciones up, publicaciones p, productos pp,(select nombre as nombre_usuario, id_usuario,img as imgperfil,email from usuarios) u
  where p.id_producto = $1 pp.id_producto and up.id_usuario = u.id_usuario and up.id_publicacion = p.id_publicacion
  
  `;
  const {rows}= await pool.query(query,[id])
  return Promise.resolve(rows);
}

module.exports = { createProducto,createServicio,createPost,getArticulosById, getPublicacionesById,getAllPublicacionesServicios , getAllPublicacionesProductos,getAllPublicacionesProductosById,getAllPublicacionesServiciosById,getPublicacionesUsuariosProductos,getPublicacionesUsuariosServicios };