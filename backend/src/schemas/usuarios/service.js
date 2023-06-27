const pool = require("../../config/conexion");
const bcrypt = require("bcryptjs");
const { generarToken } = require("../../middleware/middleware");

const agregarUsuarioBD = async ({name,email, password},res) => {
  const salt = bcrypt.genSaltSync(10);
  console.log(`Creando usuario ${name} ${email}`);
  const passwordEncriptada = bcrypt.hashSync(password, salt);
  const consulta = `INSERT INTO usuarios (nombre,email,password,registro) values ( $1,$2,$3,to_timestamp($4 / 1000.0)) RETURNING *`;
  const values = [name,email,passwordEncriptada,Date.now()]
  try {
    const {rows} =  await pool.query(consulta,values);
    const token = generarToken({email,name,id:rows[0].id_usuario});
    res.status(200).json({message:"Usuario creado con éxito.",token:token})
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Error interno desconocido"});
  }
};

const loginBD = async ({email, password},res) => {
  const consulta = `SELECT * FROM usuarios WHERE email = $1`;
  const values = [email];
  try {
    const { rowCount, rows } = await pool.query(consulta,values);
    console.log(rows);

    if (!rowCount) {
      return false;
    }
    const passwordValido = bcrypt.compareSync(password, rows[0].password);

    if (passwordValido) {
      const usuario = {
        id:rows[0].id_usuario,
        name:rows[0].nombre,
        email:rows[0].email,
        image:rows[0].img,
        registro:rows[0].registro
      }
      const token = generarToken({email,name:usuario.name,image:usuario.image,id:usuario.id})
      res.status(200).json({message:'Login OK',token:token,user:usuario});
    } else {
      res.status(401).json({message:'Login Unauthorized'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Error interno'});
  }
};

const obtenerUsuarioLogueadoBD = async (email) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

module.exports = { agregarUsuarioBD, loginBD, obtenerUsuarioLogueadoBD };