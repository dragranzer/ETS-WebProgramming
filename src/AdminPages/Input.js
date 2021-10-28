import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import styles from '../assets/css/InputAdmin.module.css';
import {Link} from "react-router-dom";
import { useState } from "react";
import useInsertBarang from "../hooks/useInsertBarang";
import { app } from "../base";
import "firebase/storage";
import swal from 'sweetalert';

function Input() {
    const { insertBarang, loadingInsert } = useInsertBarang();
    const [state, setState] = useState({      
        name: "",
        category: "",
        stock: "",
        description: "",
        imgUrl:"",
        harga:""
    });

    const [flagName, setflagName] = useState(0);
    const [flagKategori, setflagKategori] = useState(0);
    const [flagStock, setflagStock] = useState(0);
    const [flagHarga, setflagHarga] = useState(0);
    const [flagDescription, setflagDescription] = useState(0);

    const [errMsgName, seterrMsgName] = useState("");
    const [errMsgKategori, seterrMsgKategori] = useState("");
    const [errMsgStock, seterrMsgStock] = useState("");
    const [errMsgHarga, seterrMsgHarga] = useState("");
    const [errMsgDescription, seterrMsgDescription] = useState("");


    const tambahBarang = newUser => {
        if(!errMsgName && !errMsgKategori && !errMsgStock && !errMsgHarga && !errMsgDescription){
            if(flagName && flagKategori && flagStock && flagHarga && flagDescription){
                if(state.name !== "" && state.category !== "" && state.harga !== "" && state.stock !== ""){
                    if(state.imgUrl !== ""){
                        // console.log(newUser.nama)
                        console.log("lolosflag")
                        const newData = {
                            ...newUser
                        }
                        // console.log(newData)
                        insertBarang({variables :{
                            name: newData.name,
                            category: newData.category,
                            stock: newData.stock,
                            description: newData.description,
                            imgUrl: newData.imgUrl,
                            harga: newData.harga
                        }})
                        setState({      
                            name: "",
                            category: "",
                            stock: "",
                            description: "",
                            imgUrl:"",
                            harga:""
                        });
                    }else{
                        swal({
                            title: "Error",
                            text: "Image has not detected",
                            icon: "error",
                        });
                    }
                }else{
                    swal({
                        title: "Error",
                        text: "Please Fill The Required Fields",
                        icon: "error",
                    });
                }
            }else{
                swal({
                    title: "Error",
                    text: "Please Fill The Required Fields",
                    icon: "error",
                });
            }
        }else{
            swal({
                title: "Error",
                text: "Please Fill The Required Fields",
                icon: "error",
            });
        }
    }
    if(loadingInsert){
        return <h1>Inserting Image..</h1>
    }

    const handleSubmit = (e) => {
        tambahBarang(state);
    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(name === "name"){
            if(value === ""){
                seterrMsgName("Please fill name field");
            }else{
                seterrMsgName("");
            }
            setflagName(1);
        }

        if(name === "category"){
            console.log(value)
            if(value === ""){
                seterrMsgKategori("Please fill category field");
            }else{
                seterrMsgKategori("");
            }
            setflagKategori(1);
        }

        if(name === "stock"){
            if(value === ""){
                seterrMsgStock("Please fill stock field");
            }else{
                seterrMsgStock("");
            }
            setflagStock(1);
        }

        if(name === "harga"){
            if(value === ""){
                seterrMsgHarga("Please fill price field");
            }else{
                seterrMsgHarga("");
            }
            setflagHarga(1);
        }

        if(name === "description"){
            if(value === ""){
                seterrMsgDescription("Please fill description field");
            }else{
                seterrMsgDescription("");
            }
            setflagDescription(1);
        }

        setState({
          ...state,
          [name]: value,
        })
        console.log(state)
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

    return (
        <div>
            <NavbarAdmin />
            <div className={styles.body}>
                <div  className={styles.boxInput}>
                    <div className={styles.title}>
                        Add Item
                    </div>
                    <div className="row justify-content-center">
                        
                        {/* <div className="col-6">
                            <div className={styles.captionImg}>
                                    Upload Image:
                            </div>
                            <input type="file" name="img" onChange={onChangeImg}/>
                        </div> */}
                        <div className="col-10">
                            <div className={styles.caption}>
                                Item Name
                            </div>
                            <input type="text" placeholder="Item Name" value={state.name} name="name" onChange={onChange}/>
                            <div className={styles.errMsg}>
                                {errMsgName}
                            </div>
                            <div className={styles.caption}>
                                Category
                            </div>
                            <select id="category" value={state.category} name="category" onChange={onChange} className={styles.select}>
                                <option value="">Selected</option>
                                <option value="cupang">Cupang</option>
                                <option value="guppy">Guppy</option>
                                <option value="lohan">Lohan</option>
                                <option value="koi">Koi</option>
                            </select>
                            <div className={styles.errMsg}>
                                {errMsgKategori}
                            </div>
                            <div className={styles.caption}>
                                Stock
                            </div>
                            <input type="number" placeholder="Item Stock" value={state.stock} name="stock" onChange={onChange}/>
                            <div className={styles.errMsg}>
                                {errMsgStock}
                            </div>
                            <div className={styles.caption}>
                                Price
                            </div>
                            <input type="number" placeholder="Price" value={state.harga} name="harga" onChange={onChange}/>
                            <div className={styles.errMsg}>
                                {errMsgHarga}
                            </div>
                            <div className={styles.caption}>
                                Description
                            </div>
                            <textarea name="" id="" cols="50" rows="5" value={state.description} name="description" onChange={onChange}>

                            </textarea>
                            <div className={styles.errMsg}>
                                {errMsgDescription}
                            </div>

                            <div className={styles.captionImg}>
                                    Upload Image
                            </div>
                            <input type="file" name="img" onChange={onChangeImg}/>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-2">
                            <Link className={styles.signin} to="#" onClick={handleSubmit}>
                                <div className={styles.signin}>
                                    <p>Submit</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Input
