const express = require("express");
const cors = require("cors");
const path = require('path');
// const jwt = require("jsonwebtoken");
// const { api_secret, api_token_expired_time } = require("./src/config/config");
// const {agregarUsuario, login, obtenerUsuarioLogueado,} = require("./controladores/usuarios");
// const { verificarToken } = require("./middleware/middleware");
// const pool = require("./config/conexion");
// const bcrypt = require("bcryptjs");

const app = express();
app.listen(3000, console.log("server arriba"));
app.use(cors());
app.use(express.json());
require('./src/schemas/usuarios/controller')(app);
require('./src/schemas/categorias/controller')(app);
require('./src/controllers/articulos')(app);
require('./src/controllers/publicaciones')(app)

  app.get("/",async (req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
  })

  
// app.post("/login", async (req, res) => {
//     try {
//       console.log(req.body)
//       const { email, password } = req.body;
//       const resultado = await login(email, password);
//       console.log(resultado);
//       if (resultado) {
//         const token = jwt.sign({ email }, api_secret, {
//           expiresIn: api_token_expired_time,
//         });
//         res.send(token);
//       } else {
//         res.status(500).send("ocurrio un error");
//       }
//     } catch (error) {
//       res.status(error.code || 500).send(error.message || "ocurrio un error");
//     }
//   });

//   app.get("/usuario", verificarToken, async (req, res) => {
//     try {
//       const token = req.header("Authorization").split("Bearer ")[1];
//       const { email } = jwt.decode(token);
//       // llamada a base de datos
//       const resultado = await obtenerUsuarioLogueado(email);
//       res.json(resultado);
//     } catch (error) {
//       console.log(error);
//       res.status(error.code || 500).send(error.message || "ocurrio un error");
//     }
//   });