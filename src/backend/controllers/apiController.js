import Event from "../config/models/Event.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config({path: '../../.env'});

const apiController = {
    getEvents: async (req, res) => {

        if(!req.cookies) {
            return null;
        }

        console.log('[EVENTS] Events requested');
        const events = await Event.find({});
        if (!events) {
            return res.status(404).json({message: 'No events to display'});
        }
        const eventsJSON = [];
        events.forEach(event => {
            eventsJSON.push({
                id: event._id,
                title: event.title,
                img: event.img,
                postedBy: event.postedBy})
            console.log(`\tEvent ${event.title} by:\n\t${event.postedBy}`);
        });
        res.status(200).json(eventsJSON);
    },
    postEvents: async (req, res) => {
        if(!req.cookies) {
            return null;
        }

        console.log('[EVENTS] User attempting to post an event');
        
        const eventTitle = req.body.title;
        const postedBy = req.body.postedBy;

        if(await Event.findOne({title: req.body.title})) {
            
            return res.status(200).json({success: false, message: 'There is already an event with that title!'});
        }
        else {
            const filename = req.file.filename;
            const newEvent = new Event({title: eventTitle, img: filename, postedBy: postedBy});

            try{
                await newEvent.save();
                console.log('\tCreated new user: ' + eventTitle);
                return res.status(200).json({success: true, message: 'Successfully posted your event!'})
            }
            catch {
                return res.status(500).json({success: false, message: 'Internal server error'})
            }
        }
    },
    deleteEvents: async (req, res) => {
       if(!req.cookies) {
            return null;
        }

        if(!req) {
            console.log("CORS...");
            return null;
        }

        console.log('\n[EVENTS] User attempting to delete an event');
        
        const eventID = req.params.id;

        const accessToken = req.headers['authorization']?.split(' ')[1];
        if(!accessToken) {
            console.log('\tNo access token found in request headers');
            return res.status(401).json({message: 'Unauthorized'});
        }

        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if(err){
                    console.log('\tAccess token verification failed');
                    return res.status(401).json({message: 'Unauthorized'});
                }
                try {
                    console.log('\tEvent to be deleted: ' + eventID);
                    await Event.findByIdAndDelete(eventID);
                    res.status(200).json({success:true, message: 'Event deleted'});
                    console.log('\tEvent deleted');
                }
                catch {
                    res.status(404).json({success:false, message: 'Event not found'});
                    console.log('\tEvent not found');
                }
            }
        ); 
    }
}

export default apiController;