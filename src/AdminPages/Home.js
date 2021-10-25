import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import styles from '../assets/css/HomeAdmin.module.css';
import useGetAllFish from "../hooks/useGetAllFish";
import ListFishAdmin from "../components/ListFishAdmin";
import useDeleteFish from "../hooks/useDeleteFish";
import { useSelector, useDispatch } from 'react-redux';

function Home() {
    const { loading, error, fishes } = useGetAllFish();
    const { deleteFish, loadingDeleteFish } = useDeleteFish();
    const category = useSelector((state) => state.keranjang.category);
    if(loading){
        return <h1>Getting Fish...</h1>;
    }
    if(error){
        return null;
    }
    if(loadingDeleteFish){
        return <h1>Deleting Fish...</h1>
    }
    const handleDelete = id =>{
        console.log(id)
        deleteFish({variables :{
            id:id
        }})
    }
    console.log(fishes);
    const filtered = fishes.filter((item) => {
        console.log(item.category)
        return item.category.includes(category)
    })
    console.log(filtered)
    return (
        <div>
            <NavbarAdmin />
            <div className={styles.body}>
            {
                filtered.map(({category, description, harga, id, imgUrl, stock, name}) => (
                    <ListFishAdmin
                        key={id}
                        category={category}
                        description={description}
                        harga={harga}
                        id={id}
                        imgUrl={imgUrl}
                        stock={stock}
                        name={name}
                        handleDelete={() => {handleDelete(id)}}
                    />
                ))
            }
            </div>
        </div>
    )
}

export default Home
