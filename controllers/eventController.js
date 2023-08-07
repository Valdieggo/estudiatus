import {connectToDatabase} from "../utils/db.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
const { isValidObjectId } = require('mongoose');

export async function createEvent(req, res){
    connectToDatabase();
    try {
        const newEvent = new Event({eventData});
        await newEvent.save();
        if (newEvent) {
            return res.status(201).json({message: "Evento creado" });
        }
        else {
            return res.status(500).json({message: "Evento no creado" });
        }

    } catch (error) {
        return res.status(500).json({message: "Error al crear el evento" + error});
    }
};

export async function getAllEvents(req,res){
    connectToDatabase();
        try {
        const events = await Event.find();
        if (events.length === 0) {
        return res.status(404).json({message: 'No se han encontrado eventos'});
        }
        res.json(events);
        } catch (error) {
        return res.status(500).json({message: 'Error al recibir eventos' + error});
        }
};

export async function getEventById(req,res){
    connectToDatabase();
    try {
        const {id} = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({message: 'Evento no encontrado'});
        }
        return res.json(event);
    } catch (error) {
        return res.status(500).json({message: 'Error al buscar el evento', error});
    }
};

export async function updateEvent(req,res){
    connectToDatabase();
    const {eventData} = req.body;
    try {
        const updateEvent= await Event.findByIdAndUpdate(id, eventData,
            { new: true });
        if (updateEvent) {
            return res.status(200).json({message: "Evento actualizado" });
        }
        else {
            return res.status(500).json({message: "Evento no actualizado" });
        }
    } catch (error) {
        return res.status(500).json({message: "Error al actualizar el evento" + error});
    }
};


export async function deleteEvent(req, res){
    connectToDatabase();
    const {id} = req.body;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (event) {
            return res.status(200).json({message: "Evento borrado" });
        }
        else {
            return res.status(500).json({message: "Evento no borrado" });
        }
    } catch (error) {
        return res.status(500).json({message: "Error al eliminar el evento" + error});
    }
};

