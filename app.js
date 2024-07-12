// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore,addDoc,collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYJ_LLMGfq4NTm00Th2ksjdgFmfIWj0h0",
  authDomain: "authentication-7921d.firebaseapp.com",
  projectId: "authentication-7921d",
  storageBucket: "authentication-7921d.appspot.com",
  messagingSenderId: "494488240755",
  appId: "1:494488240755:web:ba216995c0de214ecde006",
  measurementId: "G-S842D5116L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage =getStorage(app);
const db=getFirestore(app)

function create() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      console.log("User created successfully");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

module.create = create;

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      console.log("Login Successful");
      localStorage.setItem("AccessToken",user.accessToken)
      window.location.assign("./form.html");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

module.login = login;

function signout() {
  localStorage.removeItem("AccessToken");

}
module.signout = signout;



// let email = document.getElementById("email").val/ue;

function upload() {
  const file = document.getElementById("file").files[0];
  const file1 = document.getElementById("file1").files[0];
  let firstName=document.getElementById("firstname").value
  let lastName=document.getElementById("lastname").value
  let mobileNumber=document.getElementById("mobilenumber").value
  let dob=document.getElementById("dob").value
  let address=document.getElementById("community").value

  
   addDoc(collection(db, "user"), {
    firstName:firstName,
    lastName:lastName,
    mobileNumber:mobileNumber,
    dob:dob,
    address:address

  });
  alert("Datas added")
  
  let imgurls = [file, file1];
  let imageurl = [];
  
  imgurls.forEach((file, i) => {
    const storageRef = ref(storage, `${i}`);
    
    uploadBytes(storageRef, file).then((snapshot) => {
      return getDownloadURL(storageRef);
    }).then((url) => {
      console.log(url);
      imageurl.push(url);
      
      // Check if all URLs are obtained
      if (imageurl.length === imgurls.length) {
        console.log('All URLs:', imageurl);
      }
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  });


}

module.upload = upload;

