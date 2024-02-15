import { signOut ,onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser,removeUser } from "../utils/userSlice";
import LOGO from './../Images/logo192.png';

const Header = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(store=>store.user);

    const handleSignOut = () =>{
        signOut(auth).then(() => {
            console.log("SignOut Success");
          }).catch((error) => {
            navigate("/error")
          });
    }
    useEffect(() =>{
       const unsubscribe = onAuthStateChanged(auth ,(user) => {
            if(user){
                //user is signed in
                const {uid,email,displayName,photoURL} = user;
                dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                navigate("/home");
            }else{
                //user is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });
        //unsubscribe when component u  nmounts
        return () => unsubscribe();
    },[]);

    return( 
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img className="w-16 mx-auto md:mx-0" src= {LOGO} alt="logo"/>
            {user && (<div className="p-4 flex justify-evenly">
            <button onClick={handleSignOut} className="bg-green-700 h-12 text-white p-2 hover:bg-white hover:text-green-700">Sign Out</button>
            </div>)}
        </div>
    )
}
export default Header;