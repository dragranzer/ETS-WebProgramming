import React from 'react';
import styles from '../assets/css/Checkout.module.css';
import NavALogin from '../components/NavALogin';
import { useSelector, useDispatch } from 'react-redux';
import ListKeranjangCheckout from '../components/ListKeranjangCheckout';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import useInsertLaporan from "../hooks/useInsertLaporan";
import useGetFishbyId from "../hooks/useGetFishbyId";
import useUpdateStockbyID from "../hooks/useUpdateStockbyID";
import { kosongkanKeranjang } from '../store/KeranjangSlice';
import {useHistory} from "react-router-dom";
import Select, { OnChangeValue, StylesConfig } from 'react-select';
import swal from 'sweetalert';

function ReviewPembelian() {
    let history = useHistory();
    const fullname = useSelector((state) => state.keranjang.fullname);
    const barang = useSelector((state) => state.keranjang.barang);
    const dispatch = useDispatch();
    console.log(barang);
    
    const { insertLaporan, loadingInsertLaporan } = useInsertLaporan();
    const { fishInKeranjang, loading, error, getData_qry } = useGetFishbyId();
    const { updateStockUpdateStockbyID, loadingUpdate } = useUpdateStockbyID();

    if(loading){
        <h1>Getting data</h1>
    }

    if(loadingUpdate){
        <h1>Updating Database...</h1>
    }
    // console.log(fishesInKeranjang)

    const [fishesInKeranjang, setFish] = useState([])

    const [provinces, setProvinces] = useState([])
    const [province, setProvince] = useState({
        id: "",
        nama: "",
    })
    const [cities, setCities] = useState([])
    const [city, setCity] = useState({
        id: "",
        nama: "",
    })
    const [kecamatans, setKecamatans] = useState([])
    const [kecamatan, setKecamatan] = useState({
        id: "",
        nama: "",
    })
    const [kelurahans, setKelurahans] = useState([])
    const [kelurahan, setKelurahan] = useState({
        id: "",
        nama: "",
    })
    const [detailAlamat, setDetailAlamat] = useState("")

    const [laporan, setLaporan]  = useState({
        name: "",
        alamat: "",
        tanggal: "",
        waktu: "",
        harga: ""
    })
    console.log(fishesInKeranjang);

    
    useEffect(() =>  {
        const URL = "http://dev.farizdotid.com/api/daerahindonesia/provinsi"
        const getProvinces = async () => {
            const res = await Axios.get(URL)
            setProvinces(res.data.provinsi)
        }

        getProvinces();       
    },[]);

    useEffect(() =>  {
        if(province && province.id !== ""){
            const URLCity = "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi="+province.id
            const getCities = async () => {
                const res = await Axios.get(URLCity)
                setCities(res.data.kota_kabupaten)
            }
    
            getCities();
        }else{
            setCities([])
        }  
    },[province]);

    useEffect(() =>  {
        if(city && city.id !== ""){
            const URLKec = "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota="+city.id
            const getKecamatans = async () => {
                const res = await Axios.get(URLKec)
                setKecamatans(res.data.kecamatan)
            }
    
            getKecamatans();
        }else{
            setKecamatans([])
        }  
    },[city]);

    useEffect(() =>  {
        if(kecamatan && kecamatan.id !== ""){
            const URLKel = "https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan="+kecamatan.id
            // console.group(URLKec)
            const getKelurahans = async () => {
                const res = await Axios.get(URLKel)
                setKelurahans(res.data.kelurahan)
            }
    
            getKelurahans();
        }else{
            setKelurahans([])
        }  
    },[kecamatan]);

    useEffect(() =>  {
        if(laporan.alamat !== ""){
            console.log("masuk if")
            console.log(laporan.harga)
            insertLaporan({variables :{
                nama_pembeli: laporan.name,
                alamat: laporan.alamat,
                tanggal: laporan.tanggal,
                total_harga: laporan.harga,
                waktu: laporan.waktu
            }})
            if(loadingInsertLaporan){
                return <h1>Update Database...</h1>
            }
            barang.map((item) => {
                console.log("didalam mapping",item)
                updateStockUpdateStockbyID({
                    variables:{
                        id: item.id,
                        stock: item.stock - item.jumlah
                    }
                })
            })
            if(loadingUpdate){
                <h1>Updating Database...</h1>
            }

            setLaporan({
                name: "",
                alamat: "",
                tanggal: "",
                waktu: "",
                harga: ""
            })
            dispatch(kosongkanKeranjang())
            history.push("/success");
        }else{
            console.log("masuk else");
            
        }  
    },[laporan]);

    if(loadingInsertLaporan){
        return <h1>Update Database...</h1>
    }


    const handleChangeProvince = e =>{
        const data = provinces.filter((item) => {
            return item.id == e.target.value;
        })
        setProvince(data[0]);
    }
    const handleChangeCity = e =>{
        const data = cities.filter((item) => {
            return item.id == e.target.value;
        })
        setCity(data[0]);
        console.log(city)
    }
    const handleChangeKecamatan = e =>{
        const data = kecamatans.filter((item) => {
            return item.id == e.target.value;
        })
        setKecamatan(data[0]);
        console.log(kecamatan)
    }
    const handleChangeKelurahan = e =>{
        const data = kelurahans.filter((item) => {
            return item.id == e.target.value;
        })
        setKelurahan(data[0]);
        console.log(kelurahan)
    }

    const handleChangeDetail = e => {
        setDetailAlamat(e.target.value);
        console.log(e.target.value);
    }

    let total = 0;
    barang.map((item) =>{
        total = total + item.jumlah*item.harga;
    })

    const handleSubmit = e =>{
        let today = new Date();
        let month = ((today.getMonth()+1)>9 ? (today.getMonth()+1) : "0"+(today.getMonth()+1))
        let day = ((today.getDate()+1)>9 ? (today.getDate()+1) : "0"+(today.getDate()+1))
        let date = today.getFullYear()+'-'+month+'-'+day;
        let hour = (today.getHours()>9 ? today.getHours() : "0"+today.getHours());
        let minute = (today.getMinutes()>9 ? today.getMinutes() : "0"+today.getMinutes());
        let second = (today.getSeconds()>9 ? today.getSeconds() : "0"+today.getSeconds());
        let time = hour + ":" + minute + ":" + second;

        if(fullname && province && city && kecamatan && kelurahan && detailAlamat){
            setLaporan({
                name: fullname,
                alamat: detailAlamat + " " + kelurahan.nama + " " + kecamatan.nama 
                        + " " + city.nama + " " + province.nama,
                harga: total,
                tanggal: date,
                waktu: time           
            })
        }else{
            swal({
                title: "Error",
                text: "Please Fill The Required Fields",
                icon: "error",
            });
        }
    }

    return (
        <div>
            <NavALogin />
            <div className={styles.body}>
                <div className={styles.box}>
                    <div className={styles.title}>
                        Checkout
                    </div>
                    <div className={styles.fullname}>
                        Full Name: {fullname}
                    </div>
                    <div className={styles.barang}>
                        <p>List of Items:</p>
                        
                        <table cellPadding="10px" cellSpacing="0" className={styles.table}>
                            <thead bgcolor="#4F698F">
                                <td>Item Name</td>
                                <td>Price</td>
                                <td>Count</td>
                                <td>Total Price</td>
                            </thead>
                            <tbody>
                                {barang.map((item)=> (    
                                    <ListKeranjangCheckout
                                        id={item.id}
                                        name={item.name} 
                                        harga={item.harga} 
                                        jumlah={item.jumlah}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/*                     
                    <div className={styles.alamat}>
                        <p>
                            Alamat:
                        </p>
                        <select name="province" onChange={handleChangeProvince}>
                            <option value="">Select Province</option>
                            {
                                provinces.map((item) => {
                                    // console.log(item);
                                    return <option value={item.id}>{item.nama}</option>
                                })
                            }
                        </select>
                        <select name="city" onChange={handleChangeCity}>
                            <option value="">Select City</option>
                            {
                                cities.map((item) => {
                                    // console.log(item);
                                    return <option value={item.id}>{item.nama}</option>
                                })
                            }
                        </select>
                        <select name="kecamatan" onChange={handleChangeKecamatan}>
                            <option value="">Select Kecamatan</option>
                            {
                                kecamatans.map((item) => {
                                    // console.log(item);
                                    return <option value={item.id}>{item.nama}</option>
                                })
                            }
                        </select>
                        <select name="kelurahan" onChange={handleChangeKelurahan}>
                            <option value="">Select Kelurahan</option>
                            {
                                kelurahans.map((item) => {
                                    // console.log(item);
                                    return <option value={item.id}>{item.nama}</option>
                                })
                            }
                        </select>
                    </div>
                     */}
                    <div className={styles.detailAlamat}>
                        <p>Address:</p>
                        <input type="text" value={detailAlamat} onChange={handleChangeDetail}/>    
                    </div>
                    <div className={styles.harga}>
                        Total Payment: Rp.{total}
                    </div>
                    <div className={styles.buy} onClick={handleSubmit}>
                        Confirm
                    </div>                   
                </div>
            </div>
        </div>
    )
}

export default ReviewPembelian
