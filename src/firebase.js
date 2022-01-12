import firebase from "firebase";

const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyAZcceyUDrBtBDMq_TPfRYlcY6M3dWSgw0",
    authDomain: "instagram-clone-react-6cdb1.firebaseapp.com",
    projectId: "instagram-clone-react-6cdb1",
    storageBucket: "instagram-clone-react-6cdb1.appspot.com",
    messagingSenderId: "1079282815731",
    appId: "1:1079282815731:web:3d88695fd625a325d61d86",
    measurementId: "G-881RVHFBN7"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};