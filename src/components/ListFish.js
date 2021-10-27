import React from 'react';
import styles from '../assets/css/ListFish.module.css';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setFish, tambahKeranjang } from '../store/KeranjangSlice';

const ListFish = ({category, description, harga, id, imgUrl, stock, name}) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const detailClick = (e) => {
        dispatch(setFish({
            id:id,
            imgUrl: imgUrl,
            name: name,
            description: description,
            stock: stock,
            harga: harga
        }));
        history.push("/detail-fish?id="+id);
    }
    const buyClick = (e) => {
        dispatch(tambahKeranjang({id,name,harga,stock}));
    }
    return (
        <div className={styles.Item}>
            <img className={styles.ItemImg} src={imgUrl} alt="" />
            <div className={styles.title}>
                {name}
            </div>
            <div className={styles.ket}>
                Price: Rp.{harga}
            </div>
            <div className={styles.ket}>
                Stock: {stock}
            </div>
            <div className={styles.ket}>
                Category: {category}
            </div>
            <div className={styles.detail} onClick={detailClick}>
                Detail
            </div>
            <div className={styles.buy} onClick={buyClick}>
                Buy
            </div>
        </div>
    )
}

export default ListFish
