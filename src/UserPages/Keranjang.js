import React from 'react';
import styles from '../assets/css/Keranjang.module.css';
import NavALogin from '../components/NavALogin';
import { useSelector, useDispatch } from 'react-redux';
import ListKeranjang from '../components/ListKeranjang';
import { hapusKeranjang } from '../store/KeranjangSlice';
import {useHistory} from "react-router-dom";

// cart system
function Keranjang() {
    let history = useHistory();
    const barang = useSelector((state) => state.keranjang.barang);
    const dispatch = useDispatch();
    console.log(barang)
    let jumlahBarang = 0;
    barang.map((item) =>{
        jumlahBarang = jumlahBarang + item.jumlah;
    })
    console.log(jumlahBarang)
    const checkoutClick = e =>{
        console.log("click")
        history.push("/checkout")
    }
    return (
        <div>
            <NavALogin />
            <div className={styles.body}>
                <div className={styles.box}>
                    <div className={styles.title}>
                        Shopping Cart
                    </div>
                    <table cellPadding="10px" cellSpacing="0" className={styles.table}>
                        <thead bgcolor="#4F698F">
                            <td>Name</td>
                            <td>Price</td>
                            <td>Count</td>
                            <td>Total Price</td>
                            <td>Action</td>
                        </thead>
                        <tbody>
                            {barang.map((item)=> (    
                                <ListKeranjang 
                                    id={item.id}
                                    name={item.name} 
                                    harga={item.harga} 
                                    jumlah={item.jumlah}
                                    hapusKeranjang={() => {dispatch(hapusKeranjang(item.id))}}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.jumlahBarang}>
                        Total Item: {jumlahBarang}
                    </div>
                    <div className={styles.buy} onClick={checkoutClick}>
                        Checkout
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Keranjang
