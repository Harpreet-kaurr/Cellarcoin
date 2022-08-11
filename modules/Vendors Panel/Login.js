import React,{useState} from 'react'
import styles from '.././css/Vendor Panel/signup.module.css'
import useFirebaseAuth from '../../auth/useFirebaseAuth';
import {setOnBoardCookie,removeOnBoardCookie } from '../../auth/userCookies';
import {useRouter} from 'next/router'
export default function Login() {

    const {signInWithEmailAndPassword,signOut,authUser} = useFirebaseAuth()
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('')
    const router = useRouter();
    
    const emailHandler = (e)=>{
        setEmail(e.target.value);
    }
    const viewPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }

    const formSubmit = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(email,password)
        .then(authUser => {
            // if(authUser.user.multiFactor.user.emailVerified){
                var myHeaders = new Headers();
                myHeaders.append("Authorization","Bearer "+authUser.user.multiFactor.user.accessToken);
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                };
            
                fetch("https://wine-nft.herokuapp.com/api/v1/vendor/login", requestOptions)
                .then(response => response.json()) 
                .then(result => {
                    removeOnBoardCookie();
                    setOnBoardCookie(JSON.stringify(result.token));
                    router.push("/vendorDashboard")
                })
                .catch(error => console.log('error', error));
            // }
            // else
            //     alert("verify your email");
        })
        
        .catch((error)=>{
          console.log("Error while login :"+error);
        })
      }
  return (
    <div className='d-flex d-flex-wrap'>
        <div className={`col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 d-align-center d-flex d-flex-column ${styles["signup-left"]}`}>
            <div className='col-12'><img src="images/logo.svg" /></div>
            <div className='col-12'><h1 className='mt-32'>CellarCoin <br/>Fine Wine</h1></div>
            <div className='col-12'><h4>Pure grape wine Packed with good nutrient and taken care with hygine</h4></div>
            
        </div>
        <div className={`col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles["signup"]} d-flex d-flex-column d-justify-center`}>
            <h1>Welcome</h1>
            <h2 >Login to your account</h2>

            <form onSubmit={formSubmit} className='d-flex d-flex-wrap'>
                <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["input-wrapper"]}`}>
                    <input value={email} onChange={emailHandler} type="text" placeholder='Email' required/>   
                </div>
                <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  ${styles["input-wrapper"]} ${styles["password"]}`}>
                    <input type="password" value={password} onChange={passwordHandler} placeholder="Password" required/>
                    <input type="text" placeholder="Password" onChange={passwordHandler} value={password} required />
                    <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewPassword}>
                        <img src="images/eye.png"/>
                    </span>
                </div>
               
                {/* <div className='d-flex d-align-center col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <input type="checkbox"/>
                    <h5>I accept the <span className='f-700 text-primary'>Terms & Conditions</span></h5>
                </div> */}
                <button className={`cursor-pointer mt-32 ${styles["btn-primary"]}`}>Continue</button>
            </form>
        </div>
    </div>
  )
}