import React, { useState } from 'react'
import Header from './Header'
import styles from '../css/Vendor Panel/MultiVendor.module.css'

const MultiVendor = () => {
  const [password,setPassword] = useState("123456789")
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
            <button className='font-16 f-600 l-22'>Create a New Login ID</button>
          </div>
          <div className={`col-6 ${styles["multi-vendor-access-wrapper"]}`}>
            <div className={`d-flex ${styles["login-creds-wrapper"]}`}>
              <h4 className='font-24 f-500'>1.</h4>
              <div className={`d-flex d-flex-column ${styles["login-cred-details"]}`}>
                <h4 className='font-24 f-500'>Log IN Credentials for Vendor 1</h4>
                <h6 className='f-500'>xyz@gmail.com</h6>
                <div className={`d-flex d-align-center d-justify-space-between ${styles["login-cred-password-wrapper"]}`}>
                  <input className='font-32' type="password" readOnly value={password}></input>
                  <img className='cursor-pointer' src='images/eye.png'></img>
                </div>
              </div>
            </div>
          </div>

          <div className={`col-6 ${styles["multi-vendor-access-wrapper"]}`}>
            <div className={`d-flex ${styles["login-creds-wrapper"]}`}>
              <h4 className='font-24 f-500'>2.</h4>
              <div className={`d-flex d-flex-column ${styles["login-cred-details"]}`}>
                <h4 className='font-24 f-500'>Log IN Credentials for Vendor 1</h4>
                <h6 className='f-500'>xyz@gmail.com</h6>
                <div className={`d-flex d-align-center d-justify-space-between ${styles["login-cred-password-wrapper"]}`}>
                  <input className='font-32' type="password" readOnly value={password}></input>
                  <img className='cursor-pointer' src='images/eye.png'></img>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default MultiVendor