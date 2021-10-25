import React from 'react'

function Report({id, nama_pembeli, alamat, tanggal, waktu, total_harga}) {
    return (
        <tr>
            <td>{nama_pembeli}</td>
            <td>{alamat}</td>
            <td>{tanggal}</td>
            <td>{waktu}</td>
            <td>{total_harga}</td>
        </tr>
    )
}

export default Report
