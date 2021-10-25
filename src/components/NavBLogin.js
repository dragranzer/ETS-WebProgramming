import React from 'react'
import styles from '../assets/css/NavBLogin.module.css'
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';

function NavBLogin() {

    // const [date, setDate] = useState(new Date());
  
    // function refreshClock() {
    //     setDate(new Date());
    // }
    // useEffect(() => {
    //     const timerId = setInterval(refreshClock, 1000);
    //     console.log("masuk settimer")
    //     return function cleanup() {
    //         clearInterval(timerId);
    //     };
    // }, []);

    return (
        
        <div className={styles.tes}>
            <Link className={styles.content} to="/about-us-login">
                <p>About Us</p>
            </Link>
        </div>
    )
}
{/* <div style={{marginLeft: "4%", fontSize:"30px"}}>{date.toLocaleTimeString()}</div> */}
export default NavBLogin
