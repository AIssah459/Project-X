import {useDropzone} from 'react-dropzone';
import {useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostEvent.css';

const PostEvent = (props) => {
    const [eventTitle, setEventTitle] = useState('');
     const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const onDrop = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        if(eventTitle.length < 1) {
            alert('Enter a title for your event!');
        }
        else {
            formData.append('postedBy', props.user);
            formData.append('title', eventTitle);
            console.log(acceptedFiles);
            acceptedFiles.forEach(file => {
                formData.append('file', file);
            });
            const res = await axios.post('/api/events', formData, {withCredentials: true});
            if(res.data.success) {
                navigate('/');
            }
            else {
                 setErrMsg(res.data.message);
            }
        }
    }, [eventTitle, navigate, props.user]);

    const goBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

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
                <h2 className='mb-5'>Post your event</h2>
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
                    <p>Drag and drop or click to upload the image for your event here</p>
                }
                
            </div>
            <div className='mt-3' >
                <button onClick={goBack} className='btn btn-primary mb-3'>Go back</button>
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

export default PostEvent;