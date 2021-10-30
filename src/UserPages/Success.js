import React from 'react'
import NavALogin from '../components/NavALogin'
import styles from '../assets/css/Success.module.css'

// success
function Success() {
    return (
        <div>
            <NavALogin />
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.title}>
                        <h1>Thank You !</h1>
                        <h2>Your payment has been processed</h2>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Success
