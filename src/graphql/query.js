import { gql } from "@apollo/client";

export const GetUser = gql`
query MyQuery($id: Int!) {
    user(where: {id: {_eq: $id}}) {
      age
      fullname
      gender
      password
      username
      id
      image
    }
  }
  
`

export const GetUser2 = gql`
query MyQuery2($username: String!) {
    user(where: {username: {_eq: $username}}) {
      age
      fullname
      gender
      password
      username
      id
    }
  }
  
`

export const GetAllFish = gql `
query MyQuery {
  fishes {
    category
    description
    harga
    id
    imgUrl
    name
    stock
  }
}
`

export const GetFishbyId = gql `
query MyQuery($id: Int!) {
  fishes(where: {id: {_eq: $id}}) {
    id
    name
    stock
    category
    description
    harga
    imgUrl
  }
}
`

export const GetAllLaporan = gql `
query MyQuery2 {
  laporan {
    alamat
    id
    nama_pembeli
    tanggal
    total_harga
    waktu
  }
}
`

export const GetAdminbyUname = gql `
query MyQuery3($username: String!) {
  admin(where: {username: {_eq: $username}}) {
    id
    password
    username
  }
}
`