import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState} from 'react';
import PXEvent from './PXEvent';
import axios from 'axios';

const Profile = (props) => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [PXEvents, setPXEvents] = useState([]);
    const location = useLocation();
    const viewUser = location.state?.user;

    console.log(props.user);
    console.log(viewUser);

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
            console.log((viewUser ? viewUser: props.user));
            let userToRequest = ';';
            if(viewUser) {
                userToRequest = viewUser;
            }
            else {
                userToRequest = props.user;
            }
            const res = await axios.get(`${API_BASE}/api/events`, {params: {postedBy: userToRequest}}, {withCredentials: true });
            res.data.forEach(event => {
                if(!eventIDs.includes(event.id) && event.postedBy == userToRequest){
                    addEventID(event.id);
                    addPXEvent(new PXEvent(event.title, event.id, event.postedBy, event.img));
                }
            });
        
        }
        loadEvents();
    }, [eventIDs, viewUser, props.user, API_BASE]);

     const logout = useCallback(async () => {
        await axios.post(`${API_BASE}/auth/logout`, {username: props.user}, {withCredentials: true});
        navigate('/login');
    }, [navigate, props.user, API_BASE]);

    

    const displayEvents = useCallback(() => {
        return PXEvents.map((eventHandle, index) => (
        <div key={ index } className='card text-white bg-secondary w-50 h-50 position-relative mt-5 mb-5 my-5 top-10 start-50 translate-middle-x'>
            <p className='border-bottom border-dark'>{ eventHandle.title }</p>
            <img src={`/images/${ eventHandle.img }`}></img>   
        </div>
        ));
    }, [PXEvents]);

    return (
        <div id='bg' className='w-100 h-100 position-absolute top-0 start-0'>
          <div id='header' className='.pb-2 mt-4 mb-2 w-75 border-bottom border-dark position-relative start-50 translate-middle-x'>
            <p id='header-text' className='fs-1'>{viewUser? viewUser:props.user}'s profile</p>
            <div className='d-flex mb-3 mt-3 start-50 justify-content-center align-items-center gap-5'>
                <button onClick={() => navigate('/')} className='btn btn-primary'>Go to My Feed</button>
                {viewUser == props.user? <button onClick={() => navigate('/postevent')} className='btn btn-primary'>Post an Event</button> : <p></p>} 
            </div>
            <div className='d-flex mt-3 mb-3 start-50 justify-content-center align-items-center'>
                <h3>Events by {viewUser? viewUser:props.user}</h3>
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

export default Profile;