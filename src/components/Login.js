import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTOURL } from "../utils/constants";
import BG_URL from "./../Images/green_leaves_hd.jpg"
import Header from "./Header";


const Login = () => {
    
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    
    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () =>{
        //Validate the form data (a utility)
        //to get email and password here we will use the useRef Hook
        const message = checkValidData(email.current.value , password.current.value);
        setErrorMessage(message);
        
        //if there's some error then we will get an error string as message and we simply return
        if(message) return;
        
        //otherwise we signin-signup
        if(!isSignInForm){
            //Sign-up form code
            createUserWithEmailAndPassword(auth, email.current.value , password.current.value)
            .then((userCredential) => {
            const user = userCredential.user;
            //Updating Profile
            updateProfile(user, {
                displayName: name.current.value, 
                photoURL: PHOTOURL
              }).then(() => {
                //we are again dispatching an action over here so that ye jo uprr vale update profile n 
                //jo changes kre h vo store m reflect hojaye ,initially ye store m reflect 
                //nhi hore thhe cuz store signup hote hee execute hojara thha and ye updateprofile 
                //sign up hone ke baad execute hora tha
                const {uid,email,displayName,photoURL} = auth.currentUser;
                dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
              }).catch((error) => {
                // An error occurred
                // ...
              });
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
        });
        }else{
            //sign-in form code
            signInWithEmailAndPassword(auth,email.current.value , password.current.value)
            .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
         });
        }
    }

    return(
        <div>
            <Header/>
            <div className="absolute">
            <img src={BG_URL} alt="Login BG"/>    
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="absolute p-12 text-white bg-black w-3/12 my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-lg">
                
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                
                {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" ref={name}/>}
                
                <input type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700" ref={email}/>
                
                <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700" ref={password}/>
                
                <p className="text-red-500 text-lg py-2 font-semibold">{errorMessage}</p>
                
                <button className="p-4 my-6 bg-green-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix GPT? Sign Up Now" : "Already hava an account? Sign In Now"}    
                </p>

            </form>
        </div>
    )
}
export default Login;