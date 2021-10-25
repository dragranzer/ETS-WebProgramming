import styles from "../assets/css/ListKeranjang.module.css"

const ListKeranjangCheckout = ({id, name, harga, jumlah}) => {

    return(
        <tr className={styles.item}>
            <td>{name}</td>
            <td>{harga}</td>
            <td>{jumlah}</td>
            <td>
                {jumlah*harga}
            </td>
        </tr>
    )
}

export default ListKeranjangCheckout;