import React from 'react'
import {Link, useHistory} from "react-router-dom";
import styles from '../assets/css/Login.module.css';
import NavBLogin from '../components/NavBLogin';
import { useState, useEffect } from "react"
import useGetAdminbyUname from '../hooks/useGetAdminbyUname';
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
    
    const { admin, loading, error, getData_qry } = useGetAdminbyUname();

    useEffect(()=>{
        console.log("masuk useEffect ")
        if (admin.length !== 0 ){
            setErrMsgName(false)
            if(admin[0].password === state.password){
                setErrMsg(false);
                console.log("masuk if ")
                console.log(admin[0].password)
                console.log(state.password)
                history.push("/home-admin");
            }else{
                setErrMsg(true);
            }
        }else{
            if(click){
                setErrMsgName(true);
            }
            console.log("masuk else ")
        }
    }, [admin])

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
        }else{
            swal({
                title: "Error",
                text: "Mohon Lengkapi Data",
                icon: "error",
            });
        }
    }

    return (
        <div>
            <NavBLogin />
            <div className={styles.body}>
                <div className={styles.loginBox}>
                    <div className={styles.contentBox}>
                        <div className={styles.title}>
                            Login Admin
                        </div>
                        <div className={styles.caption}>
                            Username:
                        </div>
                        <input type="text" placeholder="      Username" value={state.nama} name="nama" onChange={onChange}/>
                        <div className={styles.caption}>
                            Password:
                        </div>
                        <input type="password" placeholder="      Password" value={state.password} name="password" onChange={onChange}/>
                    </div>
                    <div className={styles.signin} onClick={handleSubmit}>
                        <p>Login</p>
                    </div>
                    <div className={styles.errMsg}>
                        {errMsg ? "Username dan Password tidak cocok\n":""}
                        {errMsgName? "Username Tidak ditemukan":""}
                    </div>
                    <Link to="/">
                        <div className={styles.admin}>
                            Login sebagai User?
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
