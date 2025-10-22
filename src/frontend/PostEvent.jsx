import {useDropzone} from 'react-dropzone';
import {useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostEvent.css';

const PostEvent = () => {
    const [eventTitle, setEventTitle] = useState('');

    const navigate = useNavigate();

    const onDrop = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        if(eventTitle.length < 1) {
            alert('Enter a title for your event!');
        }
        else {
            formData.append('title', eventTitle);
            console.log(acceptedFiles);
            acceptedFiles.forEach(file => {
                formData.append('file', file);
            });
            const res = await axios.post('/api/events', formData, {withCredentials: true});
            if(res.data.success) {
                navigate('/');
            }
        }
    }, [eventTitle, navigate]);


    const {getRootProps, getInputProps, isDragActive} = useDropzone({multiple: false, onDrop});
    return (
        <>
        <div className='event-submit rounded w-100 align-items-center'>
            <div>
                {/* <input {...getInputProps( {
                    type: 'text',
                    value: eventTitle,
                    placeholder: 'Event title',
                    onChange: (e) => {setEventTitle(e.target.value)},
                })} /> */}
                <h1 className='mb-5'>Post your event</h1>
                <div className='container mt-5 mb-5'>
                    <p>Enter your event title: </p>
                    <input type='text' value={eventTitle} placeholder='Event title' className='rounded' onChange={e => {setEventTitle(e.target.value)}} required/>
                </div>
            </div>
            <div {...getRootProps({
                className: 'd-flex position-relative drag-drop rounded h-50 w-50 start-50 justify-content-center align-items-center translate-middle-x',
            })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Upload the image for your event here</p>
                }
                
            </div>
        </div>
        </>
    )
}

export default PostEvent;