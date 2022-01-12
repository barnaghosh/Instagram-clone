import { Button } from '@material-ui/core'
import React,{useState} from 'react'
import {storage,db} from './firebase'
import firebase from "firebase";
import './imageUpload.css'

function ImageUpload(props) {
    console.log(props.username)
    const [caption,setCaption]=useState('');
    const [progress,setProgress]=useState(0);
    const [image,setImage]=useState(null);

    const handleChange =(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload =()=>{
        const uploadTask= storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                // progress function ...
                const progress= Math.round(
                    (snapshot.bytesTransferred/ snapshot.totalBytes)*100
                )
                setProgress(progress)
            },
            (error)=>{
                // error function
                console.log(error)
                alert(error.message)
            },
            ()=>{
                // complete function....
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    // post image inside db
                    db.collection('posts').add({
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      caption:caption,
                      imgURL:url,
                      username:props.username 

                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                })
            }
        )
    }

    return (
        <div className='imageupload'>
                    
            {/* I want to have ... */}
            {/* Caption Input */}
            {/* File picker */}
            {/* Post button */}
            <progress className='imageupload_progress' value={progress} max='100' />
            <input type='text' placeholder="Enter a caption" value={caption} onChange={e=> setCaption(e.target.value)}/>
            <input type='file' onChange={handleChange}/>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
