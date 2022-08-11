import Link from 'next/link';
import React,{useRef, useState} from 'react'
import useFirebaseAuth from '../../auth/useFirebaseAuth'
import styles from '.././css/Vendor Panel/signup.module.css'
export default function Signup() {

    const {createUserWithEmailAndPassword,formatAuthUser,signOut} = useFirebaseAuth(); 
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[url,setUrl] = useState('')

    const [isUrl, setIsUrl] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorRePass, setErrorRePass] = useState(false);
    const [passMatch, setPassMatch] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);

    const policy = useRef(null);
    const fileRef = useRef(null);

    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const nameHandler = (e) =>{
        setName(e.target.value);
    }
    const emailHandler = (e) =>{
        setEmail(e.target.value);
    }
    const viewPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }
    const viewConfirmPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const confirmPasswordHandler = (e) =>{
        setConfirmPassword(e.target.value);
    }
    const policyAcceptedHandler = () =>{
        setPolicyAccepted(prev => !prev);
    }

    //email checker
   
    const emailCheckHandler = () =>{
        if(reg.test(email)){
            setErrorEmail(false);
        }else{
            setErrorEmail(true);
        }
    }

    //password checker
    const checkPasswordHandler = (e) => {
        if(password === confirmPassword ){
            setPassMatch(false);
        }else{
            setPassMatch(true);
        }
    }

    //document upload handler
    const urlHandler = (e)=>{
        var formdata = new FormData();
        formdata.append("image",e.target.files[0]);
        
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        
        fetch("https://wine-nft.herokuapp.com/api/v1/uploadImage", requestOptions)
        .then(response => response.text())
        .then(result => {
            var results = (JSON.parse(result))
            setUrl(results.imageUrl)
        })
        .catch(error => console.log('error', error));
    }

    //to check that all the form fields are filled correctly without any error
    const validator = () =>{
        if(email === ''){
            setErrorEmail(true);
        }else{
            setErrorEmail(false);
        }
        if(password === ''){
            setErrorPass(true);
        }else{
            setErrorPass(false);
        }
        if(confirmPassword === ''){
            setErrorRePass(true);
        }else{
            setErrorRePass(false);
        }
        if(url === ''){
            setIsUrl(true);
        }else{
            setIsUrl(false);
        }
        if(!errorEmail && !errorPass && !errorRePass && policyAccepted && !isUrl){
            return true;
        }else{
            return false;
        }
    }

    //form Submit Handler

    const formSubmit = (e) =>{
        // e.preventDefault();
        const result = validator();
        if(result){    
        
            createUserWithEmailAndPassword(email,password)
            .then(authUser =>{
                var data = formatAuthUser(authUser.user);

                var myHeaders = new Headers();
                myHeaders.append("Authorization","Bearer "+data.token);

                var raw =JSON.stringify({
                    "name":name,
                    "documentUrl":url
                });

                var requestOptions = {
                    headers: myHeaders,
                    method: 'POST',
                    body: raw
                };

                fetch("https://wine-nft.herokuapp.com/api/v1/vendor/signup", requestOptions)
                .then(response => {
                    if(response.ok){
                        return response.json();
                    }
                    else{
                        throw new Error(response);
                    }
                })
                .then(result => {
                    authUser.user.sendEmailVerification();
                    signOut();
                })
                .catch(error => console.log('error', error));            
            })
            .catch(error=>console.log('error', error));
        }
    }
     

  return (
    <div className='d-flex d-flex-wrap'>
        <div className={`col-6 col-lg-12 d-align-center d-flex d-flex-column  ${styles["signup-left"]}`}>
            <div className='col-12'><img src="images/logo.svg" /></div>
            <div className='col-12'><h1 className='mt-32'>CellarCoin <br/>Fine Wine</h1></div>
            <div className='col-12'><h4>Pure grape wine Packed with good nutrient and taken care with hygine</h4></div>
        </div>
        <div className={`col-6 col-xl-12 col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles["signup"]} d-flex d-flex-column d-justify-center`}>
            <h1 className='h1-vendore mt-48'>Welcome</h1>
            <h2>Create an account</h2>
            <form onSubmit={formSubmit} className='d-flex d-flex-wrap'>
                <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["input-wrapper"]}`}>
                    <input type="text" placeholder='Name' value={name} onChange={nameHandler}/>   
                </div>
                <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["input-wrapper"]}`}>
                    <input type="text" className={`${errorEmail && styles["error"]}`} placeholder='Email' value={email} onChange={emailHandler}  onBlur={emailCheckHandler} />   
                </div>
                {errorEmail && <span className={`mb-8 font-14 f-700 text-danger`}>Please enter valid email.</span>}
                <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  ${styles["input-wrapper"]} ${styles["password"]}`}>
                    <input type="password" value={password} onChange={passwordHandler} placeholder="Password"  />
                    <input type="text" placeholder="Password" onChange={passwordHandler} value={password} />
                    <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewPassword}>
                        <img src="images/eye.png"/>
                    </span>
                </div>
                {errorPass && <span className={`mb-8 font-14 f-700 text-danger`}>Please enter password.</span>}
                <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  ${styles["input-wrapper"]} ${styles["password"]}`}>
                    <input type="password" value={confirmPassword} onChange={confirmPasswordHandler} placeholder="Confirm Password" onBlur={checkPasswordHandler}/>
                    <input type="text" placeholder="Confirm Password" onChange={confirmPasswordHandler} value={confirmPassword}  />
                    <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewConfirmPassword}>
                        <img src="images/eye.png"/>
                    </span>
                </div>
                {passMatch && <span className={`mb-8 font-14 f-700 text-danger`}>Password doesn't match.</span>}
                {errorRePass && <span className={`mb-8 font-14 f-700 text-danger `}>Please re-enter password.</span>}
                <div className={`mt-8 rounded-6 ${styles["signup-cover-input-wrapper"]}`} >
                    <h4 className={`font-20 f-600 l-28 ${styles["signup-upload-docs"]}`}>Upload Documents</h4>
                    <h4 className={`f-400 ${styles["signup-accepted-docs"]}`}>Accepted documents: <span className='f-600'>ID Proof, Company ID Proof</span></h4>
                    <input 
                        type="file" 
                        ref={fileRef}
                        onChange={urlHandler}
                        multiple={false}
                        className={`col-12 d-block mt-8 ${styles["signup-form-upload-field"]}`}
                    />
                    {!url && <div className={`d-flex d-flex-column d-align-center d-justify-center f-500 mt-14 l-28 ${styles["signup-form-upload-text"]}`}>
                        <img src="images/upload.png"></img>
                        <h4 className='f-600'>Drag and drop or browse to choose a file. File in <span className='f-700'>JPG, PDF</span> smaller than <span className='f-700'>10MB</span>.</h4>
                    </div>}
                    {url && <h4 className={`text-primary d-flex d-justify-center f-500 mt-14 l-28 ${styles["signup-form-upload-text"]}`}>Document Uploaded Successfully :{url}</h4>}
                </div>
        
                {isUrl && <span className={`mt-24 mb-8 font-14 f-700 text-danger `}>Please upload Documents.</span>}
                <div onClick={policyAcceptedHandler} className='mt-40 d-flex d-align-center col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    {policyAccepted && <input type="checkbox" ref={policy} checked ></input>}
                    {!policyAccepted && <input type='checkbox' ref={policy} ></input>}
                    <h4 className='font-20 f-400 ml-10'>I accept the <span className='f-700 text-primary'>Terms & Conditions</span></h4>
                </div>
                <button className={`font-20 mt-32 f-700 ${styles["btn-primary"]}`}>Sign Up</button>
            </form>
            <h4 className='mt-24 font-20 f-400 ml-10'>Already have an account ?<Link href="/vendorlogin" className='cursor-pointer f-700 text-primary'> Login</Link></h4>
        </div>
    </div>
  )
}
