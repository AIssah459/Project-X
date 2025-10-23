import axios from 'axios';
import PXEvent from './PXEvent.jsx';
import EventDeleteButton from './EventDeleteButton.jsx';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feed.css'


const Feed = (props) => {

    const navigate = useNavigate();

    const [PXEvents, setPXEvents] = useState([]);
    const [eventIDs, setEventIDs] = useState([]);

    useEffect(() => {
        const addPXEvent = (event) => {
            setPXEvents(PXEvents => [...PXEvents, event]);
        };

        const addEventID = (id) => {
            setEventIDs(eventIDs => [...eventIDs, id]);
        }

        const loadEvents = async () => {
            //call to API to get feed
            const res = await axios.get('/api/events', { withCredentials: true });
            res.data.forEach(event => {
                if(!eventIDs.includes(event.id)){
                    addEventID(event.id);
                    addPXEvent(new PXEvent(event.title, event.id, event.postedBy, event.img));
                }
            });
        }
        loadEvents();
    }, [eventIDs]);

    const logout = useCallback(async () => {
        await axios.post('/auth/logout', {username: props.user}, {withCredentials: true});
        navigate('/login');
    }, [navigate, props.user]);

    // const deleteEvent = useCallback(async (e) => {
    //     const eventID = e.target.id;
    //     console.log(e);
    //     console.log(eventID);
    //     const res = await axios.delete('/api/events', {event: eventID}, {withCredentials:true});
    //     if(res.data.success) {
    //         navigate('/');
    //     }
    //     else {
    //         alert('Failed to delete event');
    //     }
    // }, [navigate]);
    const displayEvents = useCallback(() => {
        return PXEvents.map((event, index) => (
        <div key={index} className='card text-white bg-secondary w-50 h-50 position-relative mb-5 my-5 top-10 start-50 translate-middle-x'>
            <p className='border-bottom border-dark'>{event.title}</p>
            <img src={`/images/${event.img}`}></img>
            {event.postedBy == props.user ? <div className='d-flex gap-3 mt-2 px-2'>
                <button id={event.id} className='btn btn-primary'>Edit</button>
                <EventDeleteButton id={event.id}></EventDeleteButton>
                <div className='position-relative start-50 translate-middle-x'><p>posted by: {event.postedBy}</p></div>
            </div> : <p>posted by: {event.postedBy}</p>}   
        </div>
        ));
    }, [PXEvents, props.user]);

    return (
        <div id='bg' className='w-100 h-100 position-absolute top-0 start-0'>
          <div id='header' className='.pb-2 mt-4 mb-2 w-75 border-bottom border-dark position-relative start-50 translate-middle-x'>
            <p id='header-text' className='fs-1'>{props.user}'s Feed</p>
                <button onClick={() => navigate('/postevent')} className='btn btn-primary mb-3'>Post an Event</button>
          </div>
          <div id='page-body' className='rounded solid-black w-75 mb-2 h-100 position-relative top-0 start-50 translate-middle-x'>
          {displayEvents()}
          </div>
          <div id='footer' className='w-25 position-relative mt-4 start-50 translate-middle-x'>
            <button className='btn btn-secondary' onClick={logout}>Logout</button>
          </div>
        </div>
    );
}
export default Feed;