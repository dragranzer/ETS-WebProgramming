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
                        Selamat Pembelian Anda Sedang di Proses
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Success
