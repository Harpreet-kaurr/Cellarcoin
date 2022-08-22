import React, { Component, useEffect, useState } from 'react'
import styles from '.././css/Vendor Panel/SideBar.module.css'
import Close from '../../icons/close'
import Menu from '../../icons/menu'
import Link from 'next/link'
import Router from 'next/router'
import useFirebaseAuth from '../../auth/useFirebaseAuth'
import '@rainbow-me/rainbowkit/styles.css';
import{getDefaultWallets,RainbowKitProvider,connectorsForWallets,wallet,darkTheme,lightTheme} from '@rainbow-me/rainbowkit';
import{ConnectButton } from '@rainbow-me/rainbowkit';
import{chain,configureChains,createClient,WagmiConfig} from 'wagmi';
import{ alchemyProvider} from 'wagmi/providers/alchemy';
import{ publicProvider} from 'wagmi/providers/public';
import {getOnBoardFromCookie} from '../../auth/userCookies';
const Header = (props) => {
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
  const profileHandler = () =>{
    Router.push("/multivendor");
  }
  const {signOut} = useFirebaseAuth();
  const logOutHandler = () => {
    signOut()
    .then(()=>{
      Router.push("/vendorlogin");
    })
    .catch((error)=>console.log("error while logout"))
  }
  const{ chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [
      alchemyProvider({apiKey:"f8rVDtHzXR6ppbYBJX1w374upvEiC2t5"}),
      publicProvider()
    ]
  );
    
    const connectors = connectorsForWallets([{
      groupName:'wallets',
      wallets:[
        wallet.metaMask({ chains }),
        wallet.coinbase({ chains })
      ]
    }])
    
    const wagmiClient = createClient({
    autoConnect:true,
      connectors,
      provider
    })
    var JWTtoken = getOnBoardFromCookie();
    useEffect(()=>{
      function parseJwt() {
        if (!JWTtoken) { return; }
        const base64Url = JWTtoken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
      var user = parseJwt();
      console.log(user)
    })

  return (
    <div className={`p-relative d-flex d-align-center d-justify-space-between ${styles["header-wrapper"]}`}>
        <div role="button" onClick={sideBarHandler} className={`${styles["bar-cross"]}`}>
            <Menu></Menu>
            <Close></Close>
        </div>
        <div className={`d-flex d-align-center d-justify-space-between col-12 ${styles["header-bar-wrapper"]}`}>
          <div className={`d-flex d-align-center rounded-16 ${styles['header-search-box']}`}>
            <img src='images/search-icon-v.png'></img>
            <form>
              <input className='col-12' type="text" placeholder='Search' />
            </form>
          </div>
          <div className='p-relative d-flex d-align-center gap-3'>
            {/* <button onClick={dropdownHandler} className={`cursor-pointer ${styles["header-buttons"]}`}>Connect Wallet</button> */}
              {/* <WagmiConfig client={wagmiClient} />
              <RainbowKitProvider chains={chains} theme={lightTheme({
                accentColor:'#780543',
                accentColorForeground:'white',
                borderRadius:'small',
                fontStack:'system',
              })}/>
              <ConnectButton />
              <RainbowKitProvider />
              <WagmiConfig /> */}

            
              <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains} theme={lightTheme({
                  accentColor:'#780543',
                  accentColorForeground:'white',
                  borderRadius:'small',
                  fontStack:'system',
                })}>
                <ConnectButton />
                </RainbowKitProvider>
              </WagmiConfig> 
            
          
            <button className={`cursor-pointer ${styles["header-buttons"]}`}>
              <Link href="/createnft">Create NFT</Link>
            </button>
            <Link href="/vendorNotification"><img className={`rounded-16 cursor-pointer ${styles["header-notification-icon"]}`} src='images/Notifications.png'></img></Link>
            <div className={`cursor-pointer d-flex d-align-center gap-1 ${styles["header-profile-wrapper"]}`}>
              <img className='cursor-pointer rounded-16' src='images/our-pillars-1.png'></img>
              <h6 className='font-14 f-500 l-19'>Artist_Name</h6>
              <img onClick={dropdownHandler} className='cursor-pointer rounded-16' src='images/arrow-down.png'></img>
            </div>
            {dropdown && 
              <div className={`p-absolute d-flex d-flex-column d-align-center ${styles["profile-dropdown"]}`}>
                <h6 onClick={profileHandler} className='font-10 f-500 l-22'>Profile</h6>
                <h6 onClick={logOutHandler} className='font-10 f-500 l-22'>Log Out</h6>
              </div>
            }
          </div>
        </div>
        {/* {dropdown && 
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
        } */}
    </div>
  )
}
export default Header