import React from 'react'
import {Link, useHistory} from "react-router-dom";
import styles from '../assets/css/Login.module.css'
import NavBLogin from '../components/NavBLogin'
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux';
import { setUser, setID, setFullname } from '../store/KeranjangSlice';
import useLazyGetUser from "../hooks/useLazyGetUser";
import swal from 'sweetalert';


function Login() {
    let history = useHistory();
    const [state, setState] = useState({
        nama: "",
        password: "",
    })
    const [errMsg, setErrMsg] = useState(false)
    const [errMsgName, setErrMsgName] = useState(false)
    const [click, setClick] = useState(false)
    
    const { user, loading, error, getData_qry } = useLazyGetUser();
    useEffect(()=>{
        console.log("masuk useEffect ")
        if (user.length !== 0 ){
            setErrMsgName(false)
            if(user[0].password == state.password){
                setErrMsg(false);
                console.log("masuk if ")
                console.log(user[0].password)
                console.log(state.password)
                history.push("/home");
                dispatch(setID(user[0].id))
                dispatch(setUser(state));
                dispatch(setFullname(user[0].fullname))
            }else{
                setErrMsg(true);
                console.log("pass gasama")
            }
        }else{
            if(click){
                setErrMsgName(true)
            }
            console.log("masuk else ")
        }
    }, [user])
    
    const dispatch = useDispatch()
    // console.log(getData_qry)
    if(loading){
        return <h1>Loading...</h1>
    }
    

    if(error){
        return null;
    }
    
    
    const onChange = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        })
        // console.log(state)
    }

    const handleSubmit = (e) => {
        console.log("click")
        setClick(true);
        if(state.nama !== "" && state.password !== ""){
            getData_qry({variables : {
                username : state.nama
            }})
            console.log(loading)
            dispatch(setUser(state.nama));
            console.log(user)
        }else{
            swal({
                title: "Error",
                text: "Please Fill The Required Fields",
                icon: "error",
            });
        }
    }
    console.log("state.nama = ", user)
    
    

    return (
        <div>
            <NavBLogin />
            
            <div className={styles.body}>
                <div className={styles.loginBox}>
                    <div className={styles.contentBox}>
                        <div className={styles.title}>
                            Login
                        </div>
                        <div className={styles.caption}>
                            Username
                        </div>
                        <input type="text" placeholder="Enter your username" value={state.nama} name="nama" onChange={onChange}/>
                        <div className={styles.caption}>
                            Password
                        </div>
                        <input type="password" placeholder="Enter your password" value={state.password} name="password" onChange={onChange}/>
                    </div>
                    <div className={styles.signin} onClick={handleSubmit}>
                        
                            <p>Login</p>
                        
                    </div>
                    <div className={styles.errMsg}>
                        {errMsg ? "Username or Password doesn't match":""}
                        {errMsgName? "Username doesn't exist":""}
                    </div>
                    <div className={styles.signUp}>
                        <p>Don't have an account? <Link to ="/register">Sign Up</Link></p>
                    </div>
                    <Link to="/log-admin">
                        <div className={styles.admin}>
                            <p>Login as admin?</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
