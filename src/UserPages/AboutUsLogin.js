import React from 'react'
import NavBLogin from '../components/NavBLogin'
import styles from '../assets/css/AboutUs.module.css'
import {useHistory} from "react-router-dom";

function AboutUsLogin() {
    let history = useHistory();
    return (
        <div>
            <NavBLogin />
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.title}>
                        About Us
                    </div>
                    <div className={styles.content}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <button onClick={()=>history.push("/")}>Go home</button>
                </div>
            </div>
        </div>
    )
}

export default AboutUsLogin
