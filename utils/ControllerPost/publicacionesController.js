const Publicacion = require('../models/Publicacion.js')

const publicacionQuery = {
    publicaciones: async () => {
        return await Publicacion.find()
    },
    searchPublicacionId : async (args) => {
        const publicacion = await Publicacion.findById(args.id);
        return publicacion;
    },
    searchPublicacionTitulo : async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.titulo});
        return publicacion;
    },
    searchPostUser: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.User});
        return publicacion;
    },
    searchPostSubject: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.subject});
        return publicacion;
    },
    searchPostDate: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.createDate});
        return publicacion;
    },
    searchPostScore: async (args) => {
        const publicacion = await Publicacion.findOne({titulo: args.score});
        return publicacion;
    },
    all_post : async () => {
        const publicaciones = await Publicacion.find({});
        return publicaciones;
    }
}

module.exports = { publicacionQuery };