import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '../css/Vendor Panel/SellNFT.module.css'
import Router,{useRouter} from 'next/router'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SellNFT = () => {
  const router = useRouter();
  const nftId = router.query["id"];
  var JWTtoken = getOnBoardFromCookie();
  const [data,setData] = useState("")
  const[price,setPrice] = useState("");
  const[currency,setCurrency] = useState("ETH");
  const [loading, setLoading] = useState(false);
  const priceHandler  = (e) =>{
    setPrice(e.target.value)
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
        fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/getNftById/${nftId}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          setData(result.data)
          setLoading(false)
        })
        .catch(error => console.log('error', error));
    }
  },[nftId])

  const formSubmit = (e) =>{
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+JWTtoken);
    myHeaders.append("Content-Type","application/json");

    var raw = JSON.stringify({
      "price": price,
      "currency": currency
    })

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
    };
    setLoading(true)
    fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/setPrice/${nftId}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Router.push("/allnftlist");
      setLoading(false)
    })
    .catch(error => console.log('error', error));
  }
  return (
    <>
        <Header></Header>
        {loading && <Loader></Loader>}
        <div className={`${styles["sell-nft-wrapper"]}`}>
          <h2 className='f-500 l-65'>Select your sell method</h2>
          {data && data.map((item)=>(
            <div className={`d-flex ${styles["sell-nft-img-content-wrapper"]}`}>
              <img className={`col-6 ${styles["sell-nft-img"]}`} src={item.imageUrl}></img>
              <div className={`col-6 ${styles["sell-nft-content"]}`}>
                <h4 className='f-500'>{item.name}</h4>
                <h5 className={`f-400 l-27 ${styles["nft-desc"]}`}>{item.description}</h5>
                <h5 className={`f-600 l-27 ${styles["contract-address-heading"]}`}>Contract Address</h5>
                <h5 className={`f-400 l-27 ${styles["contract-address"]}`}>AQRGSGSGSGFSGDS3133#R$TQ@$</h5>
                <h5 className={`f-600 l-27 ${styles["token-heading"]}`}>Token</h5>
                <h5 className={`f-400 l-27 ${styles["token"]}`}>AQRGSGSGSGFSGDS3133#R$TQ@$</h5>
              </div>
            </div>
          ))}
          <div className={`${styles["set-price-wrapper"]}`}>
            <h3 className='f-600 font-31'>Set Price for your NFT</h3>
            <form onSubmit={formSubmit}>
              <div className={`d-flex d-flex-column ${styles["price-wrapper"]}`}>
                <label className='font-24 f-400 l-32'>Minimum Price</label>
                <div className={`d-flex d-align-center d-justify-space-between ${styles["price-input"]}`}>
                  <input value={price} onChange={priceHandler} className='col-10' type="text"></input>
                  <div className={`d-flex d-align-center d-justify-center col-2 ${styles["price-unit"]}`}>
                    <h6 className='font-24 f-500 l-33'>ETH</h6>
                    <img src='images/arrow-down-white.svg'></img>
                  </div>
                </div>
              </div>

              <div className={`${styles["expire-date"]}`}>
                <h4 className='f-600'>Expiration Date</h4>
                <div className={`d-flex d-align-center d-justify-center ${styles["date-wrapper"]}`}>
                  <h5 className='f-500 l-28'>21/06/2022,24:30:50</h5>
                </div>

                <div className={`${styles["expire-instructions"]}`}>
                  <h4 className={`font-24 f-400 l-33 ${styles["expire-instructions-1"]}`}>*Not more than 7 days</h4>
                  <h4 className={`font-24 f-400 l-33 ${styles["expire-instructions-2"]}`}>*Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                </div>

                <div className={`d-flex d-flex-column ${styles["royalty-fee"]}`}>
                  <h3 className='font-31 f-600 l-39'>Royalty Fee</h3>
                  <h4 className={`font-24 f-400 l-33`}>A royalty payment gives a percentage of of the sale price to the orginal creator/ beneficiary each time the NFT is sold on our platform/Marketplace</h4>
                </div>

                <div className={`d-flex d-justify-end ${styles["list-btn"]}`}>
                  <button className='font-20 f-500'>List</button>
                </div>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default SellNFT