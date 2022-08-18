import React,{useState} from 'react'
import style from '../css/Vendor Panel/SideBar.module.css'
import MenuBar from './MenuBar'
import SiteLogo from './SiteLogo'
import useFirebaseAuth from '../../auth/useFirebaseAuth'
import Router from 'next/router'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmallLoader from './SmallLoader';

const SideBar = () => {
  const {signOut} = useFirebaseAuth();
  const [loading, setLoading] = useState(false);
  const logOutHandler = () => {
    signOut()
    .then(()=>{
      Router.push("/vendorlogin");
    })
    .catch((error)=>console.log("error while logout"))
  }


  return (
    <div className={`${style["sidebar-wrapper"]}`} id="sidebar-wrapper">
      <SiteLogo></SiteLogo>
      <MenuBar></MenuBar>
      {/* <div onClick={logOutHandler} className={`cursor-pointer d-flex d-align-center d-justify-center ${style["logout-wrapper"]}`}>
        <img src='images/vendor-logout.svg'></img>
        <h6>LogOut</h6>
      </div> */}
    </div>
  )
}

export default SideBar