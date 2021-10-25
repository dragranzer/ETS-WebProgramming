import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import styles from '../assets/css/EditFish.module.css';
import {useSelector} from 'react-redux';
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { app } from "../base";
import useEditFish from "../hooks/useEditFish";

function EditFish() {
    const fishEdit = useSelector((state) => state.keranjang.fishEdit);
    console.log(fishEdit)
    const [state, setState] = useState(fishEdit)
    console.log(state.imgUrl)

    const [editName, setEditName] = useState(false)
    const [editStock, setEditStock] = useState(false)
    const [editHarga, setEditHarga] = useState(false)
    const [editDescription, setEditDescription] = useState(false)
    const [editImgUrl, setEditImgUrl] = useState(false)
    const [editKategori, setEditKategori] = useState(false)

    const { editFish, loadingEditFish} = useEditFish(state.id);

    const TutupInputName = (e) =>{
        setEditName(false)
    }
    const BukaInputName = e =>{
        setEditName(true)
    }
    const TutupInputStock = (e) =>{
        setEditStock(false)
    }
    const BukaInputStock = e =>{
        setEditStock(true)
    }
    const TutupInputDescription = (e) =>{
        setEditDescription(false)
    }
    const BukaInputDescription = e =>{
        setEditDescription(true)
    }
    const TutupInputHarga = (e) =>{
        setEditHarga(false)
    }
    const BukaInputHarga = e =>{
        setEditHarga(true)
    }
    const TutupInputImgUrl = (e) =>{
        setEditImgUrl(false)
    }
    const BukaInputImgUrl = e =>{
        setEditImgUrl(true)
    }
    const TutupInputKategori = (e) =>{
        setEditKategori(false)
    }
    const BukaInputKategori = e =>{
        setEditKategori(true)
    }
    const onChange = e =>{
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]:value
        })
        console.log(state);
    }
    const onChangeImg = (e) => {
        const file = e.target.files[0];
        // console.log(app)
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        // console.log("file = ", file);
        // console.log("storageRef = ", storageRef);
        // console.log("fileRef = ", fileRef);
        fileRef.put(file).then((e) => {
        //   console.log("Uploaded a file");
        //   console.log("didalam e = ", e);
            e.ref.getDownloadURL().then(function (downloadURL) {
                // console.log("File available at", downloadURL);
                setState({
                    ...state,
                    imgUrl: downloadURL,
                })
            });
          
        });
        
    };

    const handleUpdate = e => {
        console.log("masuk handle")
        editFish({variables:{
            id: state.id,
            imgUrl: state.imgUrl,
            category: state.category,
            description: state.description,
            harga: state.harga,
            name: state.name,
            stock: state.stock
        }})
    }

    if(loadingEditFish){
        return <h1>Updating Data...</h1>
    }
    return (
        <div>
            <NavbarAdmin />
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.title}>
                        Detail Product
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                            {
                                editImgUrl ?
                                    <div>
                                        <input type="file" name="imgUrl" onChange={onChangeImg}/>
                                        <div className={styles.buy} onClick={TutupInputImgUrl}>
                                            Save
                                        </div>
                                    </div>
                                :
                                    <div>
                                        <img className={styles.ItemImg} src={state.imgUrl} alt="" />
                                        <div className={styles.buy} onClick={BukaInputImgUrl}>
                                            Edit Image
                                        </div>
                                    </div>
                            }   
                            </div>
                            <div className="col-6">
                                <div>Name: 
                                    {editName?
                                        <span>
                                            <input type="text" value={state.name} name="name" onChange={onChange}/>
                                            <span><FaIcons.FaCheckCircle onClick={TutupInputName}/></span>
                                        </span>
                                    :
                                        <span>
                                            {state.name}
                                            <span><FaIcons.FaEdit onClick={BukaInputName} /></span>
                                        </span>
                                    }
                                </div>
                                <div>Kategori: 
                                    {editKategori?
                                        <span>
                                            <select id="category" value={state.category} name="category" onChange={onChange} >
                                                <option value="">Selected</option>
                                                <option value="cupang">Cupang</option>
                                                <option value="guppy">Guppy</option>
                                                <option value="lohan">Lohan</option>
                                                <option value="koi">Koi</option>
                                            </select>
                                            <span><FaIcons.FaCheckCircle onClick={TutupInputKategori}/></span>
                                        </span>
                                    :
                                        <span>
                                            {state.category}
                                            <span><FaIcons.FaEdit onClick={BukaInputKategori} /></span>
                                        </span>
                                    }
                                </div>
                                <div>Stock: 
                                    {editStock?
                                        <span>
                                            <input type="text" value={state.stock} name="stock" onChange={onChange}/>
                                            <span><FaIcons.FaCheckCircle onClick={TutupInputStock}/></span>
                                        </span>
                                    :
                                        <span>
                                            {state.stock}
                                            <span><FaIcons.FaEdit onClick={BukaInputStock} /></span>
                                        </span>
                                    }
                                </div>
                                <div>Desscription:</div>
                                <div>
                                    {editDescription?
                                        <div>
                                            <textarea type="text" value={state.description} name="description" onChange={onChange} rows="4" cols="50"></textarea>
                                            <span><FaIcons.FaCheckCircle onClick={TutupInputDescription}/></span>
                                        </div>
                                    :
                                        <div>
                                            {state.description}
                                            <span><FaIcons.FaEdit onClick={BukaInputDescription} /></span>
                                        </div>
                                    }
                                </div>
                                <div>Harga: Rp.
                                    {editHarga?
                                        <span>
                                            <input type="text" value={state.harga} name="harga" onChange={onChange}/>
                                            <span><FaIcons.FaCheckCircle onClick={TutupInputHarga}/></span>
                                        </span>
                                    :
                                        <span>
                                            {state.harga}
                                            <span><FaIcons.FaEdit onClick={BukaInputHarga} /></span>
                                        </span>
                                    }    
                                </div>
                                <div className={styles.buy} onClick={handleUpdate}>
                                    Confirm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFish
