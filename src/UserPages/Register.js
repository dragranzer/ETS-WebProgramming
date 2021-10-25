import React from 'react'
import {Link, useHistory} from "react-router-dom";
import styles from '../assets/css/Register.module.css'
import NavBLogin from '../components/NavBLogin'
import useInsertUser from "../hooks/useInsertUser";
import { useState } from "react"
import swal from 'sweetalert';

function Register() {
    let history = useHistory();

    const { insertUser, loadingInsert } = useInsertUser();

    const [flagFullname, setflagFullname] = useState(0);
    const [flagUsername, setflagUsername] = useState(0);
    const [flagGender, setflagGender] = useState(0);
    const [flagAge, setflagAge] = useState(0);
    const [flagConfirm, setflagConfirm] = useState(0);
    const [flagPassword, setflagPassword] = useState(0);

    const [errMsgFullname, seterrMsgFullname] = useState("");
    const [errMsgUsername, seterrMsgUsername] = useState("");
    const [errMsgGender, seterrMsgGender] = useState("");
    const [errMsgAge, seterrMsgAge] = useState("");
    const [errMsgPassword, seterrMsgPassword] = useState("");
    const [errMsgConfirm, seterrMsgConfirm] = useState("");

    const [state, setState] = useState({      
        age: "",
        fullname: "",
        gender: "",
        password: "",
        username: "",
        passConfirm:"",
    })
    const tambahUser = newUser => {
        // console.log(newUser.nama)
        if(!errMsgFullname&&!errMsgUsername&&!errMsgAge&&!errMsgConfirm&&!errMsgGender){
            // console.log(errMsgFullname)
            if(flagFullname&&flagAge&&flagGender&&flagUsername&&flagPassword&&flagConfirm){
                const newData = {
                    ...newUser
                }
                // console.log(newData)
                insertUser({variables :{
                    age: newData.age,
                    fullname: newData.fullname,
                    gender: newData.gender,
                    password: newData.password,
                    username: newData.username,
                }})
                history.push("/");
            }else{
                swal({
                    title: "Error",
                    text: "Mohon Lengkapi Data",
                    icon: "error",
                });
            }
        }else{
            swal({
                title: "Error",
                text: "Mohon Lengkapi Data",
                icon: "error",
            });
        }
    }

    const handleSubmit = (e) => {
        tambahUser(state);
        setState({      
            age: "",
            fullname: "",
            gender: "",
            password: "",
            username: "",
            passConfirm:"",
        });
    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(name === "username"){
            if(value === ""){
                seterrMsgUsername("Mohon isi username");
            }else{
                seterrMsgUsername("");
            }
            setflagUsername(1);
        }

        if(name === "fullname"){
            if(value === ""){
                seterrMsgFullname("Mohon isi fullname");
            }else{
                seterrMsgFullname("");
            }
            setflagFullname(1);
        }

        if(name === "gender"){
            if(value === ""){
                seterrMsgGender("Mohon isi gender");
            }else{
                seterrMsgGender("");
            }
            setflagGender(1);
        }

        if(name === "age"){
            if(value === ""){
                seterrMsgAge("Mohon isi age");
            }else{
                seterrMsgAge("");
            }
            setflagAge(1);
        }

        if(name === "password"){
            if(value === ""){
                seterrMsgPassword("Mohon isi password");
            }else{
                seterrMsgPassword("");
            }
            setflagPassword(1);
        }

        if(name === "passConfirm"){
            if(value !== state.password){
                seterrMsgConfirm("konfirmasi tidak sesuai password");
            }else{
                seterrMsgConfirm("");
            }
            setflagConfirm(1);
        }



        setState({
          ...state,
          [name]: value,
        })
        // console.log(state)
    }
   
    return (
        <div>
            <NavBLogin />
            <div className={styles.body}>
                <div className={styles.registerBox}>
                    <div className={styles.contentBox}>
                        <div className={styles.title}>
                            Register
                        </div>
                        <div className="container">
                            <div className={styles.box}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className={styles.caption}>
                                            Full Name:
                                        </div>
                                        <input type="text" placeholder="      Username" value={state.fullname} name="fullname" onChange={onChange}/>
                                        <div className={styles.errMsg}>
                                            {errMsgFullname}
                                        </div>
                                        <div className={styles.caption}>
                                        Gender:
                                        </div>
                                        
                                        <label for="pria" >
                                        <input type="radio" value="pria" name="gender" onChange={onChange} className={styles.radio}/>
                                            Pria
                                        </label>
                                        
                                        <label for="wanita" className={styles.radioLabel}>
                                            <input type="radio" value="wanita" name="gender" onChange={onChange} className={styles.radio}/>
                                            Wanita
                                        </label>
                                        <div className={styles.errMsg}>
                                            {errMsgGender}
                                        </div>
                                        <div className={styles.caption} >
                                            Password:
                                        </div>
                                        <input type="text" placeholder="      Password" value={state.password} name="password" onChange={onChange}/>
                                        <div className={styles.errMsg}>
                                            {errMsgPassword}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className={styles.caption}>
                                            Username:
                                        </div>
                                        
                                        <input type="text" placeholder="      Username" value={state.username} name="username" onChange={onChange}/>
                                        <div className={styles.errMsg}>
                                            {errMsgUsername}
                                        </div>
                                        <div className={styles.caption}>
                                            Age:
                                        </div>
                                        <input type="number" placeholder="      Age" value={state.age} name="age" onChange={onChange}/>
                                        <div className={styles.errMsg}>
                                            {errMsgAge}
                                        </div>
                                        <div className={styles.captionPassC}>
                                            Password Confirm:
                                        </div>
                                        <input type="text" placeholder="      Password Confirm" value={state.passConfirm} name="passConfirm" onChange={onChange}/>
                                        <div className={styles.errMsg}>
                                            {errMsgConfirm}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={handleSubmit}>
                            <div className={styles.signin}>
                                <p>Submit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
