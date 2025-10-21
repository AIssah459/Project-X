import axios from 'axios';
import PXEvent from './PXEvent.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Feed = (props) => {

    const navigate = useNavigate();

    const [PXEvents, setPXEvents] = useState([]);
    // for(let i = 1; i < 11; i++) {
    //     PXEvents.push(new PXEvent(`Event ${i}`));
    // }

    useEffect(() => {
        const addPXEvent = (event) => {
            setPXEvents(PXEvents => [...PXEvents, event]);
        };

        const loadEvents = async () => {
            //call to API to get feed
            const res = await axios.get('/api/events', { withCredentials: true });
            res.data.forEach(event => {
                addPXEvent(new PXEvent(event.title, event.img));
            });
        }
        loadEvents();
    }, []);

    const logout = async () => {
        await axios.post('/auth/logout', {username: props.user}, {withCredentials: true});
        navigate('/login');
    }

    const displayEvents = () => {
        return PXEvents.map((event, index) => (
        <div key={index} className='card w-50 h-50 position-relative my-5 top-10 start-50 translate-middle-x'>
            <p className='border-bottom border-dark'>{event.title}</p>
            <img src={`/images/${event.img}`}></img>
        </div>
        ));
    }
    return (
        <div id='bg' className='w-100 h-100 position-absolute top-0 start-0'>
          <div id='header' className='.pb-2 mt-4 mb-2 w-75 border-bottom border-dark position-relative start-50 translate-middle-x'>
            <p id='header-text' className='fs-1'>{props.user}'s Feed</p>
            <p onClick={logout}>Logout</p>
          </div>
          <div id='page-body' className='rounded solid-black w-75 h-100 position-relative top-0 start-50 translate-middle-x'>
          {displayEvents()}
          </div>
        </div>
    );
}
export default Feed;