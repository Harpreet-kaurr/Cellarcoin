import React from 'react'
import styles from '.././css/Admin Panel/ApprovalModal.module.css'

const BrandApproval = (props) => {
  return (
    <div className={`${styles["modal-wrapper"]}`}>
        <h5 className='l-22 f-600'>Are you sure you want to reject this Brand?</h5>
        <div className={`d-flex d-align-center d-justify-space-between ${styles["modal-btns"]}`}>
            <div className={`d-flex d-align-center d-justify-center l-22 font-14 f-500 text-white ${styles["yes-btn"]}`}>Yes</div>
            <div onClick={props.handler} className={`d-flex d-align-center d-justify-center l-22 font-14 f-500 text-white ${styles["no-btn"]}`}>No</div>
        </div>
        <div className={`${styles["rejection-reason"]}`}>
            <h6 className='f-500 l-22'>Please provide reason for rejection</h6>
            <input type="text" placeholder="Enter your message" className={`${styles["rejection-input"]}`}></input>
        </div>
    </div>
  )
}

export default BrandApproval