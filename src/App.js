import './App.css';
import Post from './Post'
import React,{useState,useEffect} from 'react'
import {auth, db} from './firebase'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles';
import {Button,Input} from '@material-ui/core'
import ImageUpload from './ImageUpload';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles();
  const [modalStyle]=React.useState(getModalStyle)
  const [posts,setPosts]=useState([])
  const [openSignIn,setOpenSignIn]=useState(false)
  const[open,setOpen]=useState(false);
  const[username,setUsername]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const [user,setUser]=useState(null)

  // const[comment,setComment]=useState([])
  // useEffect -> runs a piece of code based on specific condition
  // useEffect(()=>{
  //   if(postId){
  //     unsubscribe=db
  //     .collection('posts')
  //     .doc(postId)
  //     .collection('comments')
  //     .onSnapshot((snapshot)=>{
  //       setComment(snapshot.docs.map((doc)=> doc.data()))
  //     })
  //   }
  //   return ()=>{
  //     unsubscribe();
  //   }
  // },[postId])
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      // every time a new post is added , this code firbase ....
      setPosts(snapshot.docs.map(doc =>(
        {
          id:doc.id,
         
          post:doc.data()
        }
      ) ))
    })
  },[])

  useEffect(()=>{
   const unsubscribe= auth.onAuthStateChanged((authuser)=>{
      if(authuser){
        // user in logged in
        console.log(authuser)
        setUser(authuser)
        
        // if(authuser.displayName){
        //   // dont update username
        // }
        // else{
        //   return authuser.updateProfile[{
        //     displayName:username
        //   }]
        // }
      }
      else{
        // user logged out
        setUser(null);
      }
    })

    return ()=>{
      // some clean up action
      unsubscribe();
    }
  },[user,username])

const signUp=(event)=>{
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    return authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=> alert(error.message))
}

const signIn=(event)=>{
  event.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((error)=> alert(error.message))
  setOpenSignIn(false)
}
  
  return (
    <div className="App">


    {/* {user.displayName ?
    (<ImageUpload username={user.displayName} />):(
      <h3>Sorry you need to login to upload</h3>
    )
  } */}



  
      


      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>

          <from className='app_signup'>
            <center>
                <div className='app_headeImgDiv'>
                  <img className='app-headerImage' 
                  src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
                  alt='header_image' />
                </div>
            </center>  
              <Input placeholder='username'
              type='text'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              />
              
              <Input placeholder='email'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
              <Input placeholder='password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signUp}>SignUp</Button>
          </from>  
          
           
        </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>

          <from className='app_signup'>
            <center>
                <div className='app_headeImgDiv'>
                  <img className='app-headerImage' 
                  src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
                  alt='header_image' />
                </div>
            </center>  
            
              
              <Input placeholder='email'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
              <Input placeholder='password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signIn}>Sign In</Button>
          </from>  
          
           
        </div>
      </Modal>
      
      {/* Header */}
      <div className='app_header'>
        <div className='app_headeImgDiv'>
        <img className='app-headerImage' 
        src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
        alt='header_image' />
        </div>

        {
        user ?(
          <Button onClick={()=>auth.signOut()}>Logout</Button>
        ):(
          <div className='app_loginContainer'>
            <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={()=>setOpen(true)}>Sign Up</Button>
          </div>
          
         
        )
      }
        
      </div>

      

      <div className='app_post' >
        <div className='app_postRight'>
          {/* Posts */}
          {posts.map(({id,post})=>{
          return(
          <Post key={id} postId={id} imgURL={post.imgURL} user={user} username={post.username} caption={post.caption}/>
        )
          })}
        </div>

        <div className='app_postRight'>
        {/* <InstagramEmbed
 
  url='https://www.instagram.com/p/B_uf9dmAGpw/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  injectScript
  protocol=''
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/> */}

<div src='https://instagr.am/p/Zw9o4/' />
        </div>
      </div>
        

      


      
      {/* Posts */}
      
      {user?.displayName?(
    <ImageUpload username={user.displayName} />
  ):(
    <h3>Sorry you need to login to upoload</h3>
  )
  }
    </div>
  );
}

export default App;
