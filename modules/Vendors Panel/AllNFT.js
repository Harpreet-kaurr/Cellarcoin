import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '.././css/Vendor Panel/Dashboard.module.css'
import Link from 'next/link'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Delete from './Delete';
import Modal from './Modal';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AllNFT = () => {
    const[data,setData] = useState('');
    const [isDelete,setDelete] = useState(false);
    const [deleteUserId,setDeleteUserId] = useState("")
    const [loading,setLoading] = useState(false);
    var JWTtoken = getOnBoardFromCookie();
    
    useEffect(()=>{
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        setLoading(true)
        fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/getNft`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            setData(result.data)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    },[])

    const DeleteModal = () =>{
        setDelete(prev => !prev)
    }
    const deleteModalClicked = (e)=>{
        setDelete(prev => !prev);
        setDeleteUserId(e.target.id);
    }
    const deleteHandler = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
        };
        setLoading(true)
        fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/deleteNft/${deleteUserId}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/getNft`,{
                method: 'GET', 
                headers: myHeaders,
            })
            .then(response => response.json())
            .then(results =>{
                setData(results.data)
            })
            setDelete(prev => !prev)
            setLoading(false)
            // .catch(error => console.log('error', error))
            // toast.success("NFT Deleted Successfully",{
            //     toastId:"2"
            // });
        })
        .catch(error => console.log('error', error));
    }

  return (
    <>
        {loading && <Loader></Loader>}
        <Header></Header>
        <div className='vendor-container'>
            <h4 className='f-600 text-primary mt-24 mb-24'>Listed NFTs</h4>
            <div className={`${styles["dashboard-table-section-scroll"]}`}>
                <div className={`${styles["dashboard-table-wrapper"]}`}>
                    <div className={`${styles["dashboard-table-column"]}  bg-orange d-flex d-align-center`}>
                        <span className='font-16 f-600 d-flex'>NFT</span>
                        <span className='font-16 f-600 d-flex'>Name</span>
                        <span className='font-16 f-600 d-flex'>Brand</span>
                        <span className='font-16 f-600 d-flex'>Status</span>
                        <span className='font-16 f-600 d-flex'>Price</span>
                        <span className='font-16 f-600 d-flex'>Created On</span>
                        <span className='font-16 f-600 d-flex d-justify-space-evenly'>Action</span>
                    </div>
                    {data && data.map((item,index)=>(
                        <div className={`${styles["dashboard-table-column"]} ${styles["dashboard-table-column-data"]} d-flex d-align-center`}>
                            <span className='font-14 f-500 d-flex'>
                                <img className={`${styles["dashboard-table-column-product"]}`} src={item.imageUrl}></img>
                            </span>                     
                            <span className='font-14 f-500 d-flex word-break'>{item.name}</span>
                            <span className='font-14 f-500 d-flex'>{item.brand}</span>
                            <span className={`font-14 f-500 d-flex ${styles["nft-status"]}`}>{item.status}</span>
                            <span className={`font-14 f-500 d-flex d-align-center ${styles["nft-price-wrapper"]}`}>
                                {item.price === 0?" ":<img src='images/eth-sm.png'></img>}
                                {item.price === 0?"--":item.price}
                            </span>
                            <span className='font-14 f-500 d-flex'>{item.createdTime}</span>
                            <span className={`cusror-pointer font-14 f-500 d-flex d-align-center d-justify-center`} style={{gap:"37px"}}>
                                <Link href={`/vendorListing/${item._id}`}>
                                    <img src='images/Eye Icon.png'></img>
                                </Link>
                                <Link href={`/createnft/${item._id}`}>
                                    <img src='images/edit-2.svg'></img>
                                </Link>
                                <img id={item._id} onClick={deleteModalClicked} src='images/Delete.png'></img>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <ToastContainer />
        {isDelete && <Modal modalClass="modal-verify">
          <Delete deleteHandler={deleteHandler} handler={DeleteModal}></Delete>
        </Modal>}
    </>
  )
}

export default AllNFT