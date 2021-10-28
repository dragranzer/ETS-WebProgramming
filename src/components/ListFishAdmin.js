import React from 'react';
import styles from '../assets/css/ListFishAdmin.module.css';
import { useDispatch } from 'react-redux';
import { setFishEdit} from '../store/KeranjangSlice';
import {useHistory} from "react-router-dom";

const ListFishAdmin = ({category, description, harga, id, imgUrl, stock, name, handleDelete}) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const editClick = (e) => {
        console.log("masuk editclick")
        dispatch(setFishEdit({
            id:id,
            imgUrl: imgUrl,
            name: name,
            description: description,
            stock: stock,
            harga: harga,
            category: category
        }));
        history.push("/edit-fish");
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
            <div className={styles.detail} onClick={()=>handleDelete(id)}>
                Delete
            </div>
            <div className={styles.buy} onClick={editClick}>
                Edit
            </div>
        </div>
    )
}

export default ListFishAdmin