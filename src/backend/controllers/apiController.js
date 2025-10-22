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
            eventsJSON.push({title: event.title, id: event._id, img: event.img})
        });
        res.status(200).json(eventsJSON);
    },
    postEvents: async (req, res) => {
        if(!req.cookies) {
            return null;
        }

        console.log('[EVENTS] User attempting to post an event');
        
        const eventTitle = req.body.title;

        if(await Event.findOne({title: req.body.title})) {
            
            return res.status(200).json({message: 'There is already an event with that title!'});
        }
        else {
            const filename = req.file.filename;
            const newEvent = new Event({title: eventTitle, img: filename});

            try{
                await newEvent.save();
                console.log('\tCreated new user: ' + eventTitle);
                return res.status(200).json({success: true, message: 'Successfully posted your event!'})
            }
            catch {
                return res.status(500).json({success: false, message: 'Internal server error'})
            }
        }
    }
}

export default apiController;