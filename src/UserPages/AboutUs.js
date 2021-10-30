import React from 'react'
import NavALogin from '../components/NavALogin'
import styles from '../assets/css/AboutUs.module.css'

// about us
function AboutUs() {
    return (
        <div>
            <NavALogin />
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.title}>
                        About Us
                        <hr></hr>
                    </div>
                    <div className={styles.content}>
                        <h2>We Are The Best Ornamental Fish Seller</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
