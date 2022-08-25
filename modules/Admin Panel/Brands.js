import React,{useState} from 'react'
import Header from './Header'
import styles from '.././css/Admin Panel/Brands.module.css'
import Modal from '../Vendors Panel/Modal'
import BrandApproval from './BrandApproval'
const Brands = () => {
    const [add,setAdd] = useState(false);
    const modalHandler = () =>{
        setAdd(prev => !prev)
    }
  return (
    <>
        <Header></Header>
        <div className='vendor-container'>
            <div className='d-flex d-align-center d-justify-space-between'>
                <h4 className='f-600 text-primary mt-24 mb-24'>Brands</h4>
            </div>
            <div className={`${styles["dashboard-table-section-scroll"]}`}>
                <div className={`${styles["dashboard-table-wrapper"]}`}>
                    <div className={`${styles["dashboard-table-column"]}  bg-orange d-flex d-align-center`}>
                        <span className='font-16 f-600 d-flex'>Brand’s Name</span>
                        <span className='font-16 f-600 d-flex'>Vendor’s Name</span>
                        <span className='font-16 f-600 d-flex d-align-center d-justify-center'>Document</span>
                        <span className='font-16 f-600 d-flex d-justify-space-evenly'>Action</span>
                    </div>
                    
                    <div className={`${styles["dashboard-table-column"]} ${styles["dashboard-table-column-data"]} d-flex d-align-center`}>      
                        <span className='font-14 f-600 d-flex word-break'>Brand name</span>
                        <span className='font-14 f-500 d-flex'>Vendor name</span>
                        <span className={`font-14 f-600 d-flex word-break d-align-center d-justify-center ${styles["dashboard-document"]}`}>
                            <a className='text-primary' href="/" download="Brand-document" target='_blank'>Verification file.docx</a>
                        </span>
                        <span className={`cusror-pointer font-14 f-500 d-flex d-align-center d-justify-center ${styles["dashboard-btns"]}`}>
                           <div className={`cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 text-white ${styles["dashboard-accept-btn"]}`}>Accept</div>
                           <div onClick={modalHandler} className={`cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 text-primary ${styles["dashboard-reject-btn"]}`}>Reject</div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        {add && 
            <Modal modalClass="modal-verify">
                <BrandApproval handler={modalHandler}></BrandApproval>
            </Modal>
        }
    </>
  )
}

export default Brands