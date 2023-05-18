const Publicacion = require('../models/Publicacion.js')

const publicacionQuery = {
    publicaciones: async () => {
        return await Publicacion.find()
    },
    buscarPublicacionId : async (root, args) => {
        const publicacion = await Publicacion.findById(args.id);
        return publicacion;
    },
    buscarPublicacionTitulo : async (root, args) => {
        const publicacion = await Publicacion.findOne({titulo: args.titulo});
        return publicacion;
    },
    buscarPublicacionUser: async (root,args) => {
        const publicacion = await Publicacion.findOne({titulo: args.User});
        return publicacion;
    },
    buscarPublicacionCollege: async (root,args) => {
        const publicacion = await Publicacion.findOne({titulo: args.collage});
        return publicacion;
    },
    buscarPublicacionFecha: async (root,args) => {
        const publicacion = await Publicacion.findOne({titulo: args.id});
        return publicacion;
    },
    buscarPublicacionScore: async (root,args) => {
        const publicacion = await Publicacion.findOne({titulo: args.id});
        return publicacion;
    },
    all_publicaciones : async () => {
        const publicaciones = await Publicacion.find({});
        return publicaciones;
    }
}

module.exports = { publicacionQuery };