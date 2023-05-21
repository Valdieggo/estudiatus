const mongoose = require('mongoose');

const PublicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "Titulo obligatorio"],
        unique: true,
    },
    descripcion: {
        type: String,
        required: [true, "Descripcion vacia"],
        unique: true,
    },
    fecha: {
        type: Date,
        required: [true, "Fecha obligatoria"],
    },
    img: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
    },
    score: {
        type: Number,
        default: 0,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
});

module.exports = mongoose.models.Publicacion || mongoose.model("Publicacion", PublicacionSchema);