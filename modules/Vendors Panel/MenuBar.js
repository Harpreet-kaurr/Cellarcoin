import React from 'react'
import MenuItem from './MenuItem'
import style from '.././css/Vendor Panel/SideBar.module.css'
const MenuBar = () => {
  return (
    <ul className={`d-flex d-flex-column p-0 m-0 list-style-none ${style["menu-bar-wrapper"]}`}>
        <MenuItem value="Dashboard" path="/vendorDashboard" src="images/Dashboard.png" ></MenuItem>
        <MenuItem value="NFT List" path="/allnftlist" src="images/list.png"></MenuItem>
        <MenuItem value="Report" path="/vendorDashboard" src="images/list.png"></MenuItem>
    </ul>
  )
}

export default MenuBar