import Link from 'next/link'
import React, { useState } from 'react'
import style from './css/NavBar.module.css'
import SignUp from './SignUp';
import WalletModal from './WalletModal';
const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const handleClick = () =>{
      setToggle(prev => !prev);
  }
  const handleClick2 = () =>{
    setToggle2(prev => !prev);
}
  return (
    <nav className={`p-fixed col-12 ${style["navbar"]}`}>
        <div className='container d-flex d-flex-row'>
            <Link href="/"><img className={` ${style["navbar-site-logo"]}`} src='images/site-logo.png'></img></Link>
            <input className={`rounded-12 b-none bg-box font-13 f-400 l-135 ${style["navbar-search-input"]}`} placeholder='Search by Sellers, Wine or collection'></input>
            <ul className={`d-flex d-flex-row text-dark-gray ${style["navbar-items-wrapper"]}`}>
                <li className='ml-32 font-16 f-700 l-124 text-black'><Link href="/explore">Explore</Link></li>
                <li className='ml-32 font-16 f-500 l-137'><Link href="/community">Community</Link></li>
                <li className='ml-32 font-16 f-500 l-137'><Link href="/brands">Brands</Link></li>
                <li className='ml-32 font-16 f-500 l-137'><Link href="/about">About us</Link></li>
                <li className='ml-32 font-16 f-500 l-137'><Link href="/login">SignIn</Link></li>
                {/* <li className='ml-32 font-16 f-500 l-137'><a href="#" onClick={handleClick}>Sign in</a></li> */}
                <li className='ml-32 font-16 f-500 l-137'><a onClick={handleClick2} className={`btn-primary font-13 ${style["btn-connect-wallet"]}`}>Connect Wallet</a></li>
                <li className='ml-32'><img src='images/bell.png'></img></li>
                <li className='ml-24'><Link href="/editprofile"><img src='images/profile-icon.png'></img></Link></li>
            </ul>
        </div>
        {toggle ? <SignUp></SignUp> : ""}
        {toggle2 ? <WalletModal value="setToggle2"></WalletModal>:""}
    </nav>  
  )
}

export default NavBar