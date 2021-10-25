import React from 'react';
import NavALogin from '../components/NavALogin';
import styles from '../assets/css/Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { setUser } from '../store/KeranjangSlice';
import useGetUser from "../hooks/useGetUser";
import { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import useUpdateFullname from "../hooks/useUpdateFullname";
import useUpdateUsername from "../hooks/useUpdateUsername";
import useUpdateGender from "../hooks/useUpdateGender";
import useUpdateAge from "../hooks/useUpdateAge";
import useUpdatePassword from "../hooks/useUpdatePassword";
import useUpdateImage from "../hooks/useUpdateImage";
import { app } from "../base";

function Profile() {
    const name = useSelector((state) => state.keranjang.user);
    const id = useSelector((state) => state.keranjang.id);
    const dispatch = useDispatch()
    // console.log(id);
    // console.log(name);
    const [image, setImage] = useState("")
    const [state, setState] = useState({
        fullname: "",
        username: "",
        age: "",
        password: "",
        gender: "",
        image: ""
    })
    const { loading, error, user } = useGetUser(id);
    const { updateFullname, loadingUpdateFullname } = useUpdateFullname(id);
    const { updateUsername, loadingUpdateUsername } = useUpdateUsername(id);
    const { updateGender, loadingUpdateGender} = useUpdateGender(id);
    const { updateAge, loadingUpdateAge} = useUpdateAge(id);
    const { updatePassword, loadingUpdatePassword} = useUpdatePassword(id);
    const { updateImage, loadingUpdateImage} = useUpdateImage(id);

    useEffect(()=>{
        setState({
            ...user[0],
        })
    }, [user])
    
    // console.log(user)
    // console.log(state)

    const [editFullname, setEditFullname] = useState(false)
    const [editUsername, setEditUsername] = useState(false)
    const [editGender, setEditGender] = useState(false)
    const [editAge, setEditAge] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [editImgUrl, setEditImgUrl] = useState(false)

    if (loading || loadingUpdateFullname 
        || loadingUpdateUsername || loadingUpdateGender 
        || loadingUpdateAge || loadingUpdatePassword){
        return <h3>Loading...</h3>;
    }
    // console.log(state)

    if (error){
        console.log("error ",error)
        return null
    }

    const handleChange = e =>{
        const name = e.target.name;
        const value = e.target.value;

        setState({
            ...state,
            [name]:value
        })
    }
    const BukaInputFullname = () => {
        setEditFullname(true)
    }
    const TutupInputFullname = () => {
        handleUpdateFullname();
        setEditFullname(false);
    }

    const BukaInputUsername = () => {
        setEditUsername(true)
    }
    const TutupInputUsername = () => {
        handleUpdateUsername();
        setEditUsername(false)
    }

    const BukaInputGender = () => {
        setEditGender(true)
    }
    const TutupInputGender = () => {
        handleUpdateGender()
        setEditGender(false)
    }

    const BukaInputAge = () => {
        setEditAge(true)
    }
    const TutupInputAge = () => {
        handleUpdateAge()
        setEditAge(false)
    }

    const BukaInputPassword = () => {
        setEditPassword(true)
    }
    const TutupInputPassword = () => {
        handleUpdatePassword()
        setEditPassword(false)
    }
    const TutupInputImgUrl = (e) =>{
        handleUpdateImage()
        setEditImgUrl(false)
    }
    const BukaInputImgUrl = e =>{
        setEditImgUrl(true)
    }

    const handleUpdateFullname = () => {
        updateFullname({variables:{
            fullname: state.fullname,
            id: id
        }})
    }

    const handleUpdateUsername = () => {
        dispatch(setUser(state.username));
        // console.log(newData[0].username)
        updateUsername({variables:{
            newUsername: state.username,
            id: id
        }})
    }

    const handleUpdateGender = () => {
        // console.log(newData[0].username)
        updateGender({variables:{
            gender: state.gender,
            id: id
        }})
    }

    const handleUpdateImage = () => {
        // console.log(id)
        // console.log(image)
        updateImage({variables:{
            image: image,
            id: id
        }})
    }

    if (loading || loadingUpdateFullname 
        || loadingUpdateUsername || loadingUpdateGender 
        || loadingUpdateAge || loadingUpdatePassword){
        return <h3>Loading...</h3>;
    }

    const handleUpdateAge = () => {
        // console.log(newData[0].username)
        updateAge({variables:{
            age: state.age,
            id: id
        }})
    }

    const handleUpdatePassword = () => {
        // console.log(newData[0].username)
        updatePassword({variables:{
            password: state.password,
            id: id
        }})
    }

    if (loading || loadingUpdateFullname 
        || loadingUpdateUsername || loadingUpdateGender 
        || loadingUpdateAge || loadingUpdatePassword){
        return <h3>Loading...</h3>;
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
                console.log("File available at", downloadURL);
                // setState({
                //     ...state,
                //     [image]: downloadURL,
                // })
                setImage(downloadURL)
                console.log(image)
                console.log(state)
            });
          
        });
        
    };
    // console.log(image)
    // console.log(state)
    return (
        <div>
             <NavALogin />
             <div className={styles.body}>
                <div className="row">
                    <div className="col-5">
                        {
                            editImgUrl ?
                                <div className={styles.upload}>
                                    <input type="file" name="image" onChange={onChangeImg}/>
                                    <br />
                                    <div className={styles.buy} onClick={TutupInputImgUrl}>
                                        Save
                                    </div>
                                </div>
                            :
                                <div>
                                    <img className={styles.ItemImg} src={state.image} alt="" />
                                    <div className={styles.buy} onClick={BukaInputImgUrl}>
                                        Edit Image
                                    </div>
                                </div>
                        }   
                    </div>
                    <div className="col-7">
                        <div className={styles.boxProfile}>
                            <div className={styles.title}>
                                Profile
                            </div>
                            <table cellPadding="10px" cellSpacing="0" className={styles.table}>
                                <thead>
                                    <td></td>
                                    <td></td>
                                </thead>
                                <tbody>
                                    <tr className={styles.caption}>
                                        <td> Fullname:</td>
                                       
                                        {editFullname ? 
                                            <>
                                                <td>
                                                    <input type="text" value={state.fullname} name="fullname" onChange={handleChange} className={styles.input}/>
                                                </td>
                                                <td><FaIcons.FaSave onClick={TutupInputFullname}/></td>
                                            </>
                                        :
                                            <>
                                                <td>{user[0].fullname}</td>
                                                <td><FaIcons.FaEdit onClick={BukaInputFullname} /></td>
                                            </>
                                        }
                                    </tr>
                                    <tr className={styles.caption}>
                                        <td>Username:</td>
                                        {editUsername ? 
                                            <>
                                                <td>
                                                    <input type="text" value={state.username} name="username" onChange={handleChange} className={styles.input}/>
                                                </td>
                                                <td><FaIcons.FaSave onClick={TutupInputUsername}/></td>
                                            </>
                                        :
                                            <>
                                                <td>{user[0].username}</td>
                                                <td><FaIcons.FaEdit onClick={BukaInputUsername}/></td>
                                            </>
                                        }
                                    </tr>
                                    <tr className={styles.caption}>
                                        <td>Gender:</td>
                                        {editGender ? 
                                            <>
                                                <td>
                                                    <input type="text" value={state.gender} name="gender" onChange={handleChange} className={styles.input}/>
                                                </td>
                                                <td><FaIcons.FaSave onClick={TutupInputGender}/></td>
                                            </>
                                        :
                                            <>
                                                <td>{user[0].gender}</td>
                                                <td><FaIcons.FaEdit onClick={BukaInputGender}/></td>
                                            </>
                                        }
                                    </tr>
                                    <tr className={styles.caption}>
                                        <td> Age:</td>
                                        {editAge ? 
                                            <>
                                                <td>
                                                    <input type="text" value={state.age} name="age" onChange={handleChange} className={styles.input}/>
                                                </td>
                                                <td><FaIcons.FaSave onClick={TutupInputAge}/></td>
                                            </>
                                        :
                                            <>
                                                <td>{user[0].age}</td>
                                                <td><FaIcons.FaEdit onClick={BukaInputAge}/></td>
                                            </>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles.password}>
                                Password: 
                                {editPassword ? 
                                    <div>
                                        <input type="text" value={state.password} name="password" onChange={handleChange} className={styles.input}/>
                                        <span><FaIcons.FaSave onClick={TutupInputPassword}/></span>
                                    </div>
                                :
                                    <div>
                                        {user[0].password}
                                        <span><FaIcons.FaEdit onClick={BukaInputPassword}/></span>
                                    </div>
                                }
                                
                            </div>
                            <Link className={styles.logOut} to="/">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
