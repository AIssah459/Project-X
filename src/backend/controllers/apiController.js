import Event from "../config/models/Event.js";
import dotenv from "dotenv";

dotenv.config({path: '../../.env'});

const apiController = {
    getEvents: async (req, res) => {

        if(!req.cookies) {
            return null;
        }

        console.log('[EVENTS] Events requested');
        const events = await Event.find({});
        console.log(events);
        if (!events) {
            return res.status(404).json({message: 'No events to display'});
        }
        const eventsJSON = [];
        events.forEach(event => {
            eventsJSON.push({title: event.title, img: event.img})
        });
        res.status(200).json(eventsJSON);
    }
}

export default apiController;