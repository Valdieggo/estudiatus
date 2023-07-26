import Ban from "../models/Ban";
import { connectToDatabase } from "./db";

export const isBaned = async (reportedUser) => {
            // se busca el ban del usuario reportado en la base de datos cuando el estatus sea "active" y se guarda en la variable ban
    connectToDatabase();
    const ban = await Ban.findOne({ user: reportedUser, status: "active" });

    // si no hay ban se devuelve false
    if (!ban) {
        return true;
    }
    // si esta activo se verifica que el tiempo de ban no haya expirado
    const banTime = new Date(ban.time);
    const now = new Date();
    if (banTime > now) {
        // si el tiempo de ban no ha expirado se devuelve true
    return true;
    }else{
        // si el tiempo de ban ha expirado se actualiza el estatus del ban a "inactive"
        connectToDatabase();
        await Ban.findByIdAndUpdate(ban._id, { status: "inactive" });
        // se devuelve false
        return false;
    }
};
