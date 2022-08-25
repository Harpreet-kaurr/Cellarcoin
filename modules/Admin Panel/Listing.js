import React, { useEffect, useState } from 'react'
import styles from '.././css/Admin Panel/Listing.module.css'
import {useRouter} from 'next/router'
import {getAdminOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Vendors Panel/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listing = () => {
    const router = useRouter();
    const nftId = router.query["id"];
    const[data,setData] = useState("");
    const[hasMount,setHasMount] = useState(false)
    const[add,setAdd] = useState("")
    const [loading, setLoading] = useState(false);
    var JWTtoken = getAdminOnBoardFromCookie();
    if(hasMount){
        return data;
    }
    const modalHandler = () =>{
        setAdd(prev => !prev);
    }
    useEffect(()=>{
        if(nftId){
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+JWTtoken);
            myHeaders.append("Content-Type","application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNftById/${nftId}`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                setData(result.data)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
    },[nftId])
  return (
    <>
        <div className='vendor-container' style={{paddingTop:"24px",height:"100vh",overflow:"scroll"}}>
            <h4 className='l-50 f-600 text-primary'>Listings</h4>
            
                <div className={`mt-32 d-flex ${styles["listing-body-wrapper"]}`}>
                    <img  loading='lazy' className={`${styles["listing-img"]}`} src="images/our-pillars-1.png"></img>
                    <div className={`col-5 ${styles["listing-content-wrapper"]}`}>
                        <h4 className='f-500 l-39'>Purple Malbec Wine 2016 Lorem ipsum dolor #08</h4>
                        <h5 className={`f-500 ${styles["listing-content-brands"]}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis pretium dui, commodo sed id nunc vel pharetra. Tellus pretium egestas in massa dapibus et non commodo dui.</h5>
                        <div className={`d-flex d-align-center d-justify-space-between ${styles["listing-price-and-vendor-wrapper"]}`}>
                            <div className={`d-flex d-flex-column`}>
                                <h5 className={`f-500 ${styles["listing-price-h5"]}`}>Price</h5>
                                <div className={`d-flex d-align-center ${styles["listing-price-img-and-content"]}`}>
                                    <img src='images/eth-sm.png'></img>
                                    <h5 className='f-500'>0.19 wETH($711)</h5>
                                </div>
                            </div>
                            <div className={`d-flex d-flex-column`}>
                                <h5 className={`f-500 ${styles["listing-vendor-h5"]}`}>Vendor’s name</h5>
                                <div className={`${styles["listing-vendor-content"]}`}>
                                    <h5 className='f-400'>Wallet Address</h5>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            
            <div className={`${styles["table-section-scroll"]}`} style={{overflow:"hidden",paddingBottom:"100px",height:"auto"}}>
                <div className={`${styles["table-wrapper"]}`}>
                    <h3 className={`f-600 text-primary ${styles["table-heading"]}`}>Activity</h3>
                    <div className={` ${styles["table-column"]}`}>
                        <span className='font-18 f-500 d-flex'>Event</span>
                        <span className='font-18 f-500 d-flex'>Price</span>
                        <span className='font-18 f-500 d-flex'>From</span>
                        <span className='font-18 f-500 d-flex'>To</span>
                        <span className='font-18 f-500 d-flex'>Date</span>
                    </div>                    
                    <div className={`${styles["table-column"]}`}>
                        <span className='font-18 f-500 d-flex'>Transfer</span>
                        <span className='text-primary font-18 f-500 d-flex'>$15,008</span>
                        <span className='text-primary font-18 f-500 d-flex' style={{textDecoration:"underline"}}>LK. Davidson</span>
                        <span className='text-primary font-18 f-500 d-flex'  style={{textDecoration:"underline"}}>LK. Davidson</span>
                        <span className='font-18 f-500 d-flex'>21/06/2022</span>
                    </div> 
                </div>
            </div>
        </div>  
    </>
  )
}

export default Listing