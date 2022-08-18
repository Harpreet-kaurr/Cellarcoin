import React from 'react'
import Header from './Header'
import styles from '.././css/Vendor Panel/Brands.module.css'
const Brands = () => {
  return (
    <div>
        <Header></Header>
        <div className={`${styles["brands-wrapper"]}`}>
            <h3 className='f-600 l-23 text-primary'>Add a New Brand</h3>
            <h5 className='f-500 l-23 mt-24'>Enter your Brand Name</h5>
            <form className='mt-24'>
                <input className={`col-8 ${styles["brands-input"]}`} type="text"></input>
                <h5 className='f-500 l-23 mt-24'>Enter your Brand Name</h5>
            </form>
        </div>
    </div>
  )
}

export default Brands