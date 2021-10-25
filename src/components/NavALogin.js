import React from 'react'
import {Link} from "react-router-dom";
import styles from '../assets/css/NavALogin.module.css'
import { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../store/KeranjangSlice';

function NavALogin() {

    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => {
        setSidebar(!sidebar)
    };
    const dispatch = useDispatch();
    const isiKeranjang = useSelector((state) => state.keranjang.isiKeranjang);
    const name = useSelector((state) => state.keranjang.user);
    console.log(name)
    const handleClick = (category) => {
        dispatch(setCategory(category))
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 shadow-sm">
                <div className="container-fluid">
                <Link to="#" className={styles.menuBars}>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                    <button className="navbar-toggler" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarNavAltMarkup" 
                            aria-controls="navbarNavAltMarkup" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto "></ul>
                        
                        <ul className="navbar-nav">
                            <li className="nav-item px-2 ">
                            <Link className="nav-link my-active" aria-current="page" to="#">Isi Keranjang = {isiKeranjang}</Link>
                            </li>
                            <li className="nav-item px-2 ">
                            <Link className="nav-link my-active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item px-2 ">
                            <Link className="nav-link" aria-current="page" to="/about-us">About Us</Link>
                            </li>
                            <li className="nav-item px-2">
                            <Link className="nav-link" aria-current="page" to="/keranjang">Keranjang</Link>
                            </li>
                            <li className="nav-item px-2">
                            <Link className="nav-link" aria-current="page" to="/profile">Halo,{name}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className={sidebar ? styles.navMenuActive : styles.navMenu}>
                <ul className={styles.navMenuItems}>
                    <li className={styles.navbarToggle}>
                        <Link to="#" className={styles.menuBars}onClick={showSidebar}>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={styles.navText} onClick={()=>handleClick(item.category)}>
                                <div >
                                    <span>{item.title}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default NavALogin
