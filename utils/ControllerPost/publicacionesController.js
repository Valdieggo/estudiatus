const Publicacion = require('../models/Publicacion.js')

const publicacionQuery = {
    publicaciones: async () => {
        return await Publicacion.find()
    },
    buscarPublicacionId : async (args) => {
        const publicacion = await Publicacion.findById(args.id);
        return publicacion;
    },
    buscarPublicacionTitulo : async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.titulo});
        return publicacion;
    },
    buscarPublicacionUser: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.User});
        return publicacion;
    },
    buscarPublicacionSubject: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.subject});
        return publicacion;
    },
    buscarPublicacionFecha: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.createDate});
        return publicacion;
    },
    buscarPublicacionScore: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.score});
        return publicacion;
    },
    all_publicaciones : async () => {
        const publicaciones = await Publicacion.find({});
        return publicaciones;
    }
}

module.exports = { publicacionQuery };