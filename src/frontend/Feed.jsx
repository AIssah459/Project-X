import axios from 'axios';
import PXEvent from './PXEvent.jsx';
import EventDeleteButton from './EventDeleteButton.jsx';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Feed.css'


const Feed = (props) => {

    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
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
            const res = await axios.get(`https://project-x-api.up.railway.app/api/events`, { withCredentials: true });
            res.data.forEach(event => {
                if(!eventIDs.includes(event.id)){
                    addEventID(event.id);
                    addPXEvent(new PXEvent(event.title, event.id, event.postedBy, event.img));
                }
            });
        }
        loadEvents();
    }, [eventIDs, API_BASE]);

    const logout = useCallback(async () => {
        await axios.post(`https://project-x-api.up.railway.app/auth/logout`, {username: props.user}, {withCredentials: true});
        navigate('/login');
    }, [navigate, props.user]);

    const handleEdit = useCallback((event) => {
        console.log("Navigating with event:", event);
        navigate('/editevent', { state: { event } });
  }, [navigate]);

    const goToProfile = useCallback((user) => {
            console.log("Navigating with event:", user);
            navigate('/profile', { state: { user } });
    }, [navigate]);
 
    const displayEvents = useCallback(() => {
        return PXEvents.map((eventHandle, index) => (
        <div key={ index } className='card text-white bg-secondary w-50 h-50 position-relative mt-5 mb-5 my-5 top-10 start-50 translate-middle-x'>
            <p className='border-bottom border-dark'>{ eventHandle.title }</p>
            <img src={`/images/${ eventHandle.img }`}></img>
            { eventHandle.postedBy == props.user ? <div className='d-flex gap-3 mt-2 px-2'>
                <button  className='btn btn-primary' onClick={() => handleEdit(eventHandle)}>Edit</button>
                <EventDeleteButton id={ eventHandle.id }></EventDeleteButton>
                <div className='position-relative start-50 translate-middle-x'><button className='btn btn-primary'>posted by: { eventHandle.postedBy }</button></div>
            </div> : <div className='position-relative start-50 translate-middle-x mt-3'><button onClick={ () => { goToProfile(eventHandle.postedBy) } } className='btn btn-primary'>posted by: { eventHandle.postedBy }</button></div>}   
        </div>
        ));
    }, [PXEvents, props.user, handleEdit, goToProfile]);

    return (
        <div id='bg' className='w-100 h-100 position-absolute top-0 start-0'>
          <div id='header' className='.pb-2 mt-4 mb-2 w-75 border-bottom border-dark position-relative start-50 translate-middle-x'>
            <p id='header-text' className='fs-1'>{props.user}'s Feed</p>
            <div className='d-flex mb-3 mt-3 start-50 justify-content-center align-items-center gap-5'>
                <button onClick={() => navigate('/profile')} className='btn btn-primary'>Go to My Profile</button>
                <button onClick={() => navigate('/postevent')} className='btn btn-primary'>Post an Event</button>
            </div>
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