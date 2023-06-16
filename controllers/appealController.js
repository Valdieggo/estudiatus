import Appeal from "../models/Appeal.js";
import { connectToDatabase } from "../utils/db.js";
import User from "../models/User.js";


//funcion para crear una apelacion
export async function createAppeal(req, res){
    await connectToDatabase();
    const {id_user}=req.params
    const {name,description,ban,status } = req.body;
    const appealer = id_user;
    try {
        const newAppeal = new Appeal({ name, description, ban, appealer, status });
        await newAppeal.save();
        if (newAppeal) {
            return res.status(201).json({ message: "Apelacion creada" });
        }
        else {
            return res.status(400).json({ message: "Apelacion no creada" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error al crear apelación" + error});
    }
};
//funcion para obtener las apelaciones de un usuario
export async function  getUserAppeals(req,res){
    await connectToDatabase();
    const {id_user}=req.params
    //busca por id del usuario para ver si tiene apelaciones
    try {
        const appeals = await User.findById({id_user}).populate(['appealer','name','description','status']);
        if (appeals) {
            return res.status(200).json({ appeals });

        }else if(appeals.length==0){
            return res.status(200).json({ message: "No hay apelaciones" });
        }else {
            return res.status(500).json({ message: "No se pudo obtener apelaciones" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener apelaciones" + error});
    }
};
export async function deleteAppeal(req,res){

}
