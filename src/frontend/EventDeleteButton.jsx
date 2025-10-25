import { useCallback } from 'react';
import axios from 'axios';
const EventDeleteButton = (props) => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const deleteEvent = useCallback(async () => {
        const eventID = props.id;
        //const payload = { eventID: eventID };
        const res = await axios.delete(`/api/events/${eventID}`, {withCredentials:true});
        
        if(res.data.success === true) {
            console.log('navigate');
            window.location.reload();
        }
        else {
            alert('Failed to delete event');
        }
    }, [props.id]);
    return <button onClick={deleteEvent} className='btn btn-dark'>Delete</button>
}

export default EventDeleteButton;