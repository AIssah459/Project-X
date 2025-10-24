import {useDropzone} from 'react-dropzone';
import {useCallback, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PostEvent.css';

const EditEvent = (props) => {
    const [eventTitle, setEventTitle] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState(new FormData);
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const location = useLocation();

    const event = location.state?.event || {};
    const eventToEdit = event;

    const onDrop = useCallback(async (acceptedFiles) => {
        if(acceptedFiles){
                acceptedFiles.forEach(file => {
                formData.append('file', file);
            });
        }
        
    }, [formData]);

    const goBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const submitEdit = useCallback(async () => {
        if(eventTitle.length >= 1)
            formData.append('title', eventTitle);
        else
            formData.append('title', eventToEdit.title);

        formData.append('id', eventToEdit.id);

        const res = await axios.put(`https://project-x-api.up.railway.app/api/events/${eventToEdit.id}`, formData, {withCredentials: true});
        if(res.data.success) {
            navigate('/');
        }
        else {
                setErrMsg(res.data.message);
        }
    }, [navigate, formData, eventTitle, eventToEdit.title, eventToEdit.id])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({multiple: false, onDrop});
    return (
        <>
        <div className='panel panel-default align-items-center vh-100 vw-100'>
            <div className='panel-body'>
                {/* <input {...getInputProps( {
                    type: 'text',
                    value: eventTitle,
                    placeholder: 'Event title',
                    onChange: (e) => {setEventTitle(e.target.value)},
                })} /> */}
                <h2 className='mb-5'>Edit your event</h2>

                {/* Event to be edited */}
                <div className='card text-white bg-secondary w-50 h-50 position-relative mb-5 my-5 top-10 start-50 translate-middle-x'>
                    <p className='border-bottom border-dark'>{ eventToEdit.title }</p>
                    <img src={`/images/${ eventToEdit.img }`}></img>
                    <p>postedBy: {props.user}</p>
                </div>
                <div className="input-group mb-3 w-50 start-50 justify-content-center align-items-center translate-middle-x">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Title</span>
                    </div>
                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={e => setEventTitle(e.target.value)}></input>
                    </div>
                </div>
            <div {...getRootProps({
                className: 'd-flex border border-dark position-relative drag-drop rounded h-50 w-50 start-50 justify-content-center align-items-center translate-middle-x',
            })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Upload the image for your event here</p>
                }
                
            </div>
            <div className='d-flex mb-3 mt-3 start-50 justify-content-center align-items-center gap-5' >
                <button onClick={goBack} className='btn btn-primary'>Go back</button>
                <button onClick={submitEdit}className='btn btn-primary'>Submit</button>
            </div>
        </div>
         {/* Display error message */}
            {errMsg == '' ? null : 
            <div className="w-40 d-flex justify-content-center align-items-center">
                <p id="errMsg" className="mt-3 w-40 alert alert-danger">{errMsg}</p>
            </div> }
        </>
    )
}

export default EditEvent;