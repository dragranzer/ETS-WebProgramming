import React from 'react';
import NavALogin from '../components/NavALogin';
import styles from '../assets/css/DetailFish.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { tambahKeranjang } from '../store/KeranjangSlice';

function DetailFish() {
    const fish = useSelector((state) => state.keranjang.fish);
    const dispatch = useDispatch();
    const buyClick = (e) => {
        const newData = {
            id: fish.id,
            name: fish.name,
            harga: fish.harga,
        }
        dispatch(tambahKeranjang(newData));
    }
    console.log(fish);
    return (
        <div>
            <NavALogin />
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.title}>
                        Detail Product
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <img className={styles.ItemImg} src={fish.imgUrl} alt="" />
                            </div>
                            <div className="col-6">
                                <div>Name: {fish.name}</div>
                                <div>Stock: {fish.stock}</div>
                                <div>Desscription:</div>
                                <div>{fish.description}</div>
                                <div>Harga: Rp.{fish.harga}</div>
                                <div className={styles.buy} onClick={buyClick}>
                                    Buy
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailFish
