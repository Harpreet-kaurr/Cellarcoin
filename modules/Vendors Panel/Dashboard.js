import React, { useEffect, useState }  from 'react'
import Header from './Header'
import DashboardCards from './DashboardCards'
import styles from '.././css/Vendor Panel/Dashboard.module.css'
import Link from 'next/link'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmallLoader from './SmallLoader';
import {useRouter} from 'next/router'
const Dashboard = () => {
  const[data,setData] = useState('')
  const[dashboard,setDashboard] = useState('')
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

      fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/dashboard`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        console.log(result)
        setDashboard(result)
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
      setLoading(true)
      fetch(`https://wine-nft.herokuapp.com/api/v1/vendor/deleteNft/${e.target.id}`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setData(result.data);
        setLoading(false)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <>
      <Header></Header>
      <div className='vendor-container'>
        <h4 className='l-50 f-600 text-primary mt-24'>Dashboard</h4>
        <div className='d-flex d-flex-wrap gap-2 mt-24'>
          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.totalNft}</h5>
              <img src="images/ic_deals.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Total NFTs</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.totalVolume}</h5>
              <img src="images/ic_account.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Total Volume</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.visitorFrequency}</h5>
              <img src="images/ic_trending_up.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Visitor Frequency</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.totalEarnings}</h5>
              <img src="images/ic_send.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Total Earnings</h6>
          </div>
          {/* <DashboardCards count="228" icon="images/ic_deals.png" title="Total NFTs"></DashboardCards> */}
          {/* <DashboardCards count="25,258" icon="images/ic_account.png" title="Total Volume"></DashboardCards>
          <DashboardCards count="33.98%" icon="images/ic_trending_up.png" title="Users Conversion"></DashboardCards>
          <DashboardCards count="$25,000" icon="images/ic_send.png" title="Total Earnings"></DashboardCards> */}
        </div>
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
            {data && data.map((item)=>(
              <div className={`${styles["dashboard-table-column"]} ${styles["dashboard-table-column-data"]} d-flex d-align-center`}>
                <span className='font-14 f-500 d-flex '>
                  <img className={`${styles["dashboard-table-column-product"]}`} src={item.imageUrl}></img>
                </span>
                                            
                <span className='font-14 f-500 d-flex word-break'>{item.name}</span>
                <span className='font-14 f-500 d-flex'>{item.brand}</span>
                <span className='font-14 f-500 d-flex'>ETH 2.03</span>
                <span className='font-14 f-500 d-flex'>{item.createdTime}</span>
                <span className={`cusror-pointer font-14 f-500 d-flex d-align-center d-justify-center`} style={{gap:"37px"}}>
                  <Link href={`/vendorListing/${item._id}`}>
                    <img src='images/Eye Icon.png'></img>
                  </Link>
                  <Link href="/createnft">
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

export default Dashboard