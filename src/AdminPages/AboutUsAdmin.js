import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin';
import styles from '../assets/css/AboutUs.module.css'

function AboutUsAdmin() {
    return (
        <div>
            <NavbarAdmin />
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

export default AboutUsAdmin
