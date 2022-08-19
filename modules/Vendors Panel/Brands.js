import React from 'react'
import Header from './Header'
import Link from 'next/link'
import styles from '.././css/Vendor Panel/Brands.module.css'
const Brands = () => {
  return (
    <div>
      <Header></Header>
      <div className={`${styles["brands-wrapper"]}`}>
        <h3 className=' f-600 l-23 text-primary'>Brand</h3>
        <div className={`d-flex ${styles["brands-outer-wrapper"]}`}>
          <div className={`col-7 ${styles["brand-table-wrapper"]}`}>
            <div className={`${styles["brand-table-header"]}`}>
              <span className='font-16 f-600'>Brands</span>
              <span className='font-16 f-600'>Created On</span>
              <span className='font-16 f-600'>Actions</span>
            </div>
            <div className={`${styles["brand-table-body"]}`}>
              <span className='font-16 f-500 text-primary'>Pinefold</span>
              <span className='font-16 f-500 '>2 Feb, 2022, 12:34</span>
              <span className={`cusror-pointer font-14 f-500 d-flex d-align-center ${styles["brand-action"]}`}>
                <Link href={`/vendorBrand`}>
                  <img src='images/edit-2.svg'></img>
                </Link>
                <img src='images/Delete.png'></img>
              </span>
            </div>
          </div>
        
          <div className={`col-5 ${styles["add-brand-wrapper"]}`}>
            <h4 className='f-600 l-23 text-primary'>Brand</h4>
            <h5 className='f-500 l-23 mt-24'>Enter your Brand Name</h5>
            <form className='mt-16'>
              <input className={`col-12 ${styles["brands-input"]}`} type="text"></input>
              <h5 className='f-500 l-23 mt-24'>Upload Documents</h5>
              <h6 className='mt-16 f-400'>Accepted documents: ID Proof, Company ID Proof</h6>
              <div className={`mt-16 ${styles["brands-file-upload"]}`}>
                <input type="file"></input>
                <span className='f-400 font-14'>Drag and drop files here or upload</span>
              </div>
              <button className='mt-16'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brands