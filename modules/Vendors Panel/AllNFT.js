import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '.././css/Vendor Panel/Dashboard.module.css'
import Link from 'next/link'
import {getOnBoardFromCookie} from '../../auth/userCookies';

const AllNFT = () => {
    const[data,setData] = useState('')
    var JWTtoken = getOnBoardFromCookie();
    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/getNft`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            setData(result.data)
        })
        .catch(error => console.log('error', error));
    },[])

    const deleteHandler = (e) =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
        };

        fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/deleteNft/${e.target.id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            setData(result.data);
        })
        .catch(error => console.log('error', error));
    }
  return (
    <>
        <Header></Header>
        <div className='vendor-container'>
            <h4 className='f-600 text-primary mt-24 mb-24'>Listed NFTs</h4>
            <div className={`${styles["dashboard-table-section-scroll"]}`}>
                <div className={`${styles["dashboard-table-wrapper"]}`}>
                    <div className={`${styles["dashboard-table-column"]}  bg-orange d-flex d-align-center`}>
                        <span className='font-16 f-600 d-flex d-justify-space-evenly'>NFT</span>
                        <span className='font-16 f-600 d-flex'>Name</span>
                        <span className='font-16 f-600 d-flex'>Brand</span>
                        <span className='font-16 f-600 d-flex'>Price</span>
                        <span className='font-16 f-600 d-flex'>Created On</span>
                        <span className='font-16 f-600 d-flex d-justify-space-evenly'>Action</span>
                    </div>
                    {data && data.map((item,index)=>(
                        <div className={`${styles["dashboard-table-column"]} ${styles["dashboard-table-column-data"]} d-flex d-align-center`}>
                            <span className='font-14 f-500 d-flex '>
                                <img className={`${styles["dashboard-table-column-product"]}`} src={item.imageUrl}></img>
                            </span>
                                                       
                            <span className='font-14 f-500 d-flex word-break'>{item.name}</span>
                            <span className='font-14 f-500 d-flex '>{item.brand}</span>
                            <span className='font-14 f-500 d-flex'>ETH 2.03</span>
                            <span className='font-14 f-500 d-flex '>{item.createdTime}</span>
                            <span className={`cusror-pointer font-14 f-500 d-flex d-align-center d-justify-center`} style={{gap:"37px"}}>
                                <Link href={`/vendorListing/${item._id}`}>
                                    <img src='images/Eye Icon.png'></img>
                                </Link>
                                <Link href={`/createnft/${item._id}`}>
                                    <img src='images/edit-2.svg'></img>
                                </Link>
                                <img id={item._id} onClick={deleteHandler} src='images/Delete.png'></img>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default AllNFT