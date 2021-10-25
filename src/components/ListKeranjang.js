import styles from "../assets/css/ListKeranjang.module.css"

const ListKeranjang = ({id, name, harga, jumlah, hapusKeranjang}) => {

    return(
        <tr className={styles.item}>
            <td>{name}</td>
            <td>{harga}</td>
            <td>{jumlah}</td>
            <td>
                {jumlah*harga}
            </td>
            <td>
                <button onClick={()=>{hapusKeranjang(id)}}>
                    Hapus
                </button>
            </td>
        </tr>
    )
}

export default ListKeranjang;