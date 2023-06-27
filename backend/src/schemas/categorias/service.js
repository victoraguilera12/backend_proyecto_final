const pool = require("../../config/conexion");

  const getAllCategorias = async () => {
    const consulta = "SELECT * FROM categorias";
    const { rows } = await pool.query(consulta);
    return rows;
  };
  
  module.exports = { getAllCategorias };