import React from 'react'
import MenuItem from './MenuItem'
import style from '.././css/Admin Panel/SideBar.module.css'
const MenuBar = () => {
  return (
    <ul className={`d-flex d-flex-column p-0 m-0 list-style-none ${style["menu-bar-wrapper"]}`}>
        <MenuItem value="Dashboard" path="/admindashboard" multipath="0"></MenuItem>
        <MenuItem value="NFT's" path="/" multipath="0"></MenuItem>
        <MenuItem value="NFT Listing" path="/" multipath="0"></MenuItem>
        <MenuItem value="Vendors" path="/" multipath="0"></MenuItem>
    </ul>
  )
}

export default MenuBar