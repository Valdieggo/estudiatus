import Ban from "../models/Ban";
import { connectToDatabase } from "./db";

export const isBaned = async (idBan) => {
    // se verifica que el id del ban no sea null o undefined para usuarios que no han sido baneados nunca
    if (idBan!=null) {
        const ban = await Ban.findById(idBan);
            // se verifica que el ban este activo
           if (ban.status === "active") {
                // si esta activo se verifica que el tiempo de ban no haya expirado
                const banTime = new Date(ban.time);
                const now = new Date();
                if (banTime > now) {
                    // si el tiempo de ban no ha expirado se devuelve true
                return true;
                }else{
                    // si el tiempo de ban ha expirado se actualiza el estatus del ban a "inactive"
                    connectToDatabase();
                    await Ban.findByIdAndUpdate(idBan, { status: "inactive" });
                    // se devuelve false
                    return false;
                }
           }else{
                return false;
           }
    }else{
        return false;
    }
};
