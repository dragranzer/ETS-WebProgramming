import React from 'react'
import NavBLogin from '../components/NavBLogin'
import styles from '../assets/css/AboutUs.module.css'
import {useHistory} from "react-router-dom";

// about us at login page
function AboutUsLogin() {
    let history = useHistory();
    return (
        <div>
            <NavBLogin />
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.title}>
                        About Us
                        <hr></hr>
                    </div>
                   
                    <div className={styles.content}>
                        <h2>We Are The Best Ornamental Fish Seller</h2>
                    </div>
                    <div className={styles.button}>
                        <button onClick={()=>history.push("/")}>Back to home page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsLogin
