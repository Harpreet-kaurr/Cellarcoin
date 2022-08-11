import Link from 'next/link'
import React from 'react'
import style from '.././css/Vendor Panel/SideBar.module.css'

const MenuItems = (props) => {
  return (
    <div>
      <li className={`black-4 f-600 font-16 l-23 d-flex d-align-center gap-1 ${style["menu-item-wrapper"]}`}>
        <img src={props.src}></img>
        <Link href={props.path}>{props.value}</Link>
      </li>
    </div>
  )
}

export default MenuItems