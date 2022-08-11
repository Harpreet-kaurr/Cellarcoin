import React from 'react'
import styles from '.././css/Vendor Panel/SideBar.module.css'
import Close from '../../icons/close'
import Menu from '../../icons/menu'
import Link from 'next/link'

const Header = (props) => {

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
            <button className={`cursor-pointer ${styles["header-buttons"]}`}>Connect Wallet</button>
            <button className={`cursor-pointer ${styles["header-buttons"]}`}>
              <Link href="/createnft">Create NFT</Link>
            </button>
            <Link href="/vendorNotification"><img className={`rounded-16 cursor-pointer ${styles["header-notification-icon"]}`} src='images/Notifications.png'></img></Link>
            <div className={`d-flex d-align-center gap-1 ${styles["header-profile-wrapper"]}`}>
              <img className='cursor-pointer rounded-16 ' src='images/our-pillars-1.png'></img>
              <h6 className='font-14 f-500 l-19'>Artist_Name</h6>
            </div>
          </div>
        </div>
    </div>
  )
}
export default Header