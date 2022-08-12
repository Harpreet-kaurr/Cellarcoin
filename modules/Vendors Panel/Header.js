import React, { useEffect, useState } from 'react'
import styles from '.././css/Vendor Panel/SideBar.module.css'
import Close from '../../icons/close'
import Menu from '../../icons/menu'
import Link from 'next/link'
import { getUserFromCookie } from '../../auth/userCookies'

const Header = (props) => {
  var user = getUserFromCookie();

  const[name,setName] = useState("");
  

  const [dropdown,setDropdown] = useState(false);
  const dropdownHandler = () =>{
    setDropdown(!dropdown)
  }
  const sideBarHandler = (e) => {
    e.currentTarget.classList.toggle(styles["open"]);
    console.log("Sidebar = "+styles["sidebar-wrapper"]);
    document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["expand"])
    document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["sidebar-wrapper"])
  }

  return (
    <div className={`p-relative d-flex d-align-center d-justify-space-between ${styles["header-wrapper"]}`}>
        <div role="button" onClick={sideBarHandler} className={`${styles["bar-cross"]}`}>
            <Menu></Menu>
            <Close></Close>
        </div>
        <div className={`d-flex d-align-center d-justify-space-between  col-12 ${styles["header-bar-wrapper"]}`}>
          <div className={`d-flex d-align-center rounded-16 ${styles['header-search-box']}`}>
            <img src='images/search-icon-v.png'></img>
            <form>
              <input className='col-12' type="text" placeholder='Search' />
            </form>
          </div>
          <div className='d-flex d-align-center gap-3'>
            <button onClick={dropdownHandler} className={`cursor-pointer ${styles["header-buttons"]}`}>Connect Wallet</button>
            <button className={`cursor-pointer ${styles["header-buttons"]}`}>
              <Link href="/createnft">Create NFT</Link>
            </button>
            <Link href="/vendorNotification"><img className={`rounded-16 cursor-pointer ${styles["header-notification-icon"]}`} src='images/Notifications.png'></img></Link>
            <div className={`d-flex d-align-center gap-1 ${styles["header-profile-wrapper"]}`}>
              <img className='cursor-pointer rounded-16 ' src='images/our-pillars-1.png'></img>
              <h6 className='font-14 f-500 l-19'>{user.name}</h6>
            </div>
          </div>
        </div>
        {dropdown && 
          <div className={`p-absolute ${styles["wallet-dropdown"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h6 className='f-600 l-22'>Connect Wallet</h6>
              <img onClick={dropdownHandler} className={`cursor-pointer ${styles["wallet-cross"]}`} src='images/wallet-cross.png'></img>
            </div>
            <div className={`d-flex d-flex-column ${styles["wallet-items-wrapper"]}`}>
              <div className={`d-flex d-align-center d-justify-space-between ${styles["wallet-items"]}`}>
                <h6 className='font-14 f-400 l-22'>Meta Mask</h6>
                <img src='images/MetaMask.png'></img>
              </div>
              <div className={`d-flex d-align-center d-justify-space-between ${styles["wallet-items"]}`}>
                <h6 className='font-14 f-400 l-22'>WalletConnect</h6>
                <img src='images/wallet-connect.png'></img>
              </div>
              <div className={`d-flex d-align-center d-justify-space-between ${styles["wallet-items"]}`}>
                <h6 className='font-14 f-400 l-22'>Coinbase Wallet</h6>
                <img src='images/coin-base.png'></img>
              </div>
            </div>
            
          </div>
        }
    </div>
  )
}
export default Header