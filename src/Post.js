import React,{useState,useEffect} from 'react'
import './post.css'
import {db} from './firebase'
import Avatar from '@material-ui/core/Avatar'
import firebase from 'firebase'

export default function Post({postId,user,imgURL,username,caption}) {
    const[comments,setComments]=useState([])
    const[comment,setComment]=useState('')
    // useEffect -> runs a piece of code based on specific condition
    useEffect(()=>{
      let unsubscribe;
      if(postId){
         unsubscribe=db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .onSnapshot((snapshot)=>{
          setComments(snapshot.docs.map((doc)=> doc.data()))
        })
      }
      return ()=>{
        unsubscribe();
      }
    },[postId])

    const postComment=(event)=>{
      event.preventDefault();
      db.collection('posts').doc(postId).collection('comments').add({
        text:comment,
        username:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setComment('');
    }
    return (
        <div className='post'>
            {/* header -> avater +username */}
            <div className='post_header'>
                <Avatar className='post_avatar' alt={username} src="/static/images/avatar/1.jpg" />
                <h3 className='post_username'>{username}</h3>
            </div>
            
            
            {/* image */}
            <img className='post_img' src={imgURL}/>
            {/* username + caption */}
            <h4 className='post_text'><strong className='post_username'>{username}</strong>{caption} </h4>
        

            <div className='post_comments'>
              {
              
                comments.map((comment)=>{
                  console.log(comment)
                  return(
                    <p>
                    <strong>{comment.username}</strong> {comment.text}
                  </p>
                  )
                  
                })
              }

            </div>
              {user&&(
            <form className='post_commentBox'>
            <input className='post_input'
            type='text'
            placeholder='add a comment'
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
            />
            <button
            className='post_button'
            disabled={!comment}
            type='submit'
            onClick={postComment}>
              Post
            </button>
        </form>
              )}

        </div>
    )
}
