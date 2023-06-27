const { verificarToken } = require("../middleware/middleware");
const { createPost, getAllPublicacionesServicios, getAllPublicacionesProductos, getAllPublicacionesServiciosById, getAllPublicacionesProductosById, getPublicacionesUsuariosServicios,getPublicacionesUsuariosProductos } = require("../services/articulosService");


module.exports = function(app){
    const url = "/publicacion"

    // todos las publicaciones por usuario
    app.get(url + "/all/:userId", async(req, res)=>{
        const id = req.params.userId
        let result = [];
        try {
            Promise.all([getAllPublicacionesServiciosById(id),getAllPublicacionesProductosById(id)]).then(x=>{
                result = [...x[0],...x[1]];
                res.status(200).json(result)
            })
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
        
    })
    //  app.get(url + "/:publicacion_usuario", async(req, res)=>{
    //     const id = req.params.userId
    //     let result = [];
    //     try {
    //         Promise.all([getPublicacionesUsuariosServicios(id),getPublicacionesUsuariosProductos(id)]).then(x=>{
    //             result = [...x[0],...x[1]];
    //             res.status(200).json(result)
    //         })
    //     } catch (error) {
    //         console.error(error)
    //         res.sendStatus(500)
    //     }
        
    // })

    // TODAS las publicaciones
    app.get(url + "/all", async(req, res)=>{
        let result = [];
        try {
            Promise.all([getAllPublicacionesServicios(),getAllPublicacionesProductos()]).then(x=>{
                result = [...x[0],...x[1]];
                res.status(200).json(result)
            })
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
        
    })
    
    
        /**
         * body = {publicacion} , id_producto,id_servicio
         * req = {user} desde middleware
         */
        app.post(`${url}`,verificarToken,async(req,res)=>{
            const {publicacion,id_producto,id_servicio} = req.body;
            
            return createPost(publicacion,id_producto,id_servicio,req.user.id,res);
    
        })
}
