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
    const[searchData,setSearchData] = useState('');
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
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            setData(result.data)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    },[])

    const searchHandler = (e) =>{
        setSearchData(data)
        if(e.target.value.length>2){
            setTimeout(() => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization","Bearer "+JWTtoken);
                myHeaders.append("Content-Type","application/json");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                };
                setLoading(true)
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNftByName?search=${e.target.value}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setData(result.data)
                    setLoading(false)
                })
                .catch(error => console.log('error', error));
            }, "1000");
        }
        else if(e.target.value.length<=2){
            setData(searchData)
        }
    }
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
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/deleteNft/${deleteUserId}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft`,{
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
            <div className='d-flex d-align-center d-justify-space-between'>
                <h4 className='f-600 text-primary mt-24 mb-24'>Listed NFTs</h4>
                <div className={`d-flex d-align-center rounded-16 ${styles['header-search-box']}`}>
                    <img src='images/search-icon-v.png'></img>
                    <form>
                        <input onChange={searchHandler}  className='col-12' type="text" placeholder='Search' />
                    </form>
                </div>
            </div>
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
                                <img loading='lazy' className={`${styles["dashboard-table-column-product"]}`} src={item.imageUrl}></img>
                            </span>                     
                            <span className='font-14 f-500 d-flex word-break'>{item.name}</span>
                            <span className='font-14 f-500 d-flex'>{item.brand}</span>
                            <span className={`font-14 f-500 d-flex ${styles["nft-status"]}`}>{item.status}</span>
                            {item.price === 0?<span className={`p-relative font-14 f-500 d-flex d-align-center`}>
                                --
                            </span>
                            :<span className={`p-relative font-14 f-500 d-flex d-align-center ${styles["nft-price-wrapper"]}`}>
                                <img src='images/eth-sm.png'></img>
                                {item.price}
                                <div className={`d-flex d-align-center d-justify-center ${styles["nft-price-tool-tip"]}`}>
                                    <h6 className='l-22 f-400'>ETH</h6>
                                </div>
                            </span>}
                            
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