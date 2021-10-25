import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import styles from '../assets/css/ListReport.module.css';
import Report from '../components/Report';
import useGetLaporan from '../hooks/useGetLaporan'

function ListReport() {
    const {laporans, loading, error} = useGetLaporan()
    if (loading){
        return <h1>Getting Laporan...</h1>
    }
    console.log(laporans)
    return (
        <div>
            <NavbarAdmin />
            <div className={styles.body}>
                <div className={styles.content}>
                    <div className={styles.title}>Sell Report</div>
                    <table cellPadding="10px" cellSpacing="0" className={styles.table}>
                        <thead bgcolor="#4F698F">
                            <td>Nama Pembeli</td>
                            <td>Alamat</td>
                            <td>Tanggal</td>
                            <td>Waktu</td>
                            <td>Total Harga</td>
                        </thead>
                        <tbody>
                        {laporans.map((item)=> (    
                                <Report 
                                    id={item.id}
                                    nama_pembeli={item.nama_pembeli} 
                                    alamat={item.alamat} 
                                    tanggal={item.tanggal}
                                    waktu={item.waktu}
                                    total_harga={item.total_harga}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListReport
