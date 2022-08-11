import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '../css/Vendor Panel/MultiVendor.module.css'
import {getOnBoardFromCookie} from '../../auth/userCookies';
const MultiVendor = () => {
  var JWTtoken = getOnBoardFromCookie();
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [brand,setBrand] = useState()
  const [data,setData] = useState("");
  const [login,setLogin] = useState("view")
  const createLoginHandler = (e) =>{
    setLogin("create")
  }

  const emailHandler = (e) =>{
    setEmail(e.target.value)
  }

  const passwordHandler = (e) =>{
    setPassword(e.target.value)
  }
  const brandHandler = (e) =>{
    setBrand(e.target.value)
  }

  useEffect(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      fetch("https://wine-nft.herokuapp.com/api/v1/vendor/getSubVendor", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.data)
        setData(result.data)
      })
      .catch(error => console.log('error', error));
  },[])


  const formSubmit = (e) =>{
      e.preventDefault()
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var raw = JSON.stringify({
        "email":email,
        "password":password,
        "brand":brand
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      fetch("https://wine-nft.herokuapp.com/api/v1/vendor/addSubVendor", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setData(result)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <>
        <Header></Header>
        <div className={`${styles["multi-vendor-wrapper"]}`}>
          <h3 className='font-36 f-700 l-49 text-primary'>Profile</h3>
          <div className={`d-flex ${styles["profile-wrapper"]}`}>
            <div className={`col-4 ${styles["vendor-panel-img"]}`}>
              <img src='images/vendor-panel.png'></img>
            </div>
            <div className={`d-flex d-flex-column col-8 ${styles["profile-details-wrapper"]}`}>
              <h6 className='font-18 f-600 l-23'>Profile information</h6>
              <form className='d-flex d-flex-column '>
                <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Name</h6>
                  <input type="text" placeholder='Name'></input>
                  <img src='images/vendor-edit.png'></img>
                </div>
                <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Phone</h6>
                  <input type="text" placeholder='Phone'></input>
                  <img src='images/vendor-edit.png'></img>
                </div>
                {/* <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Email</h6>
                  <input type="email" placeholder='Email'></input>
                  <img src='images/vendor-edit.png'></img>
                </div>
                <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Password</h6>
                  <input type="password" placeholder='Password'></input>
                  <img src='images/vendor-edit.png'></img>
                </div> */}
                <div className={`d-flex d-justify-end ${styles["submit-btn-wrapper"]}`}>
                  <button className='font-14 l-22 f-600'>Submit</button>
                </div>
              </form>
            </div>
          </div>

          <div className={`d-flex d-align-center d-justify-space-between ${styles["multi-vendor-access"]}`}>
            <h3 className='f-700 font-36 text-primary l-49'>Multiple Vendor Access</h3>
            <div onClick={createLoginHandler} className={`font-16 f-600 l-22 d-flex d-align-center d-justify-center ${styles["create-login-id"]}`}>Create a New Login ID</div>
          </div>
          {login === "create" && 
            <div className={`${styles["create-login-wrapper"]}`}>
              <h4 className={`font-24 f-600 l-22 ${styles["create-login-h4"]}`}>Create a new log in ID</h4>
              <form onSubmit={formSubmit}>
                <div className={`${styles["create-login-input-wrapper"]}`}>
                  <h6 className='font-18 f-500 l-22'>User ID/ Email</h6>
                  <input value={email} onChange={emailHandler} type="email"></input>
                </div>
                <div className={`${styles["create-login-input-wrapper"]}`}>
                  <h6 className='font-18 f-500 l-22'>Password</h6>
                  <input value={password} onChange={passwordHandler} type="password"></input>
                </div>
                <div className={`${styles["create-login-input-wrapper"]}`}>
                  <h6 className='font-18 f-500 l-22'>Brand</h6>
                  <input value={brand} onChange={brandHandler} type="text"></input>
                </div>
                <button className={`d-flex d-align-center d-justify-center ${styles["save-btn"]}`}>
                    <h6>Save</h6>
                </button>
              </form>
            </div>
          }
          {login === "view" && data && data.map((item,index)=>(
            <div className={`col-6 ${styles["multi-vendor-access-wrapper"]}`}>
              <div className={`d-flex ${styles["login-creds-wrapper"]}`}>
                <h4 className='font-24 f-500'>{index+1}.</h4>
                <div className={`d-flex d-flex-column ${styles["login-cred-details"]}`}>
                  <h4 className='font-24 f-500'>Log IN Credentials for {item.brand}</h4>
                  <h6 className='f-500'>{item.email}</h6>
                  {/* <div className={`d-flex d-align-center d-justify-space-between ${styles["login-cred-password-wrapper"]}`}>
                    <input className='font-32' type="password" readOnly value={item.password}></input>
                    <img className='cursor-pointer' src='images/eye.png'></img>
                  </div> */}
                </div>
              </div>
            </div>
          ))
          }
        </div>
    </>
  )
}

export default MultiVendor