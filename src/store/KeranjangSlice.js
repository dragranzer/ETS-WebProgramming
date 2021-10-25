import { createSlice } from '@reduxjs/toolkit'

const initialValue = []
const idFish = []
const user = ""
const id = 0
const fish = {}
const fishEdit = {}
const fullname = ""
const category = ""
const isiKeranjang = 0

export const KeranjangSlice = createSlice ({
    name: "keranjang",
    initialState:{
        barang: initialValue,
        listIdinKeranjang: idFish,
        user: user,
        id: id,
        fish: fish,
        fishEdit: fishEdit,
        fullname: fullname,
        category: category,
        isiKeranjang: isiKeranjang
    },
    reducers:{
        setUser: (state, action) => {
            // console.log(action.payload.nama)
            state.user = action.payload.nama
            // console.log(state.user)
        },
        setID: (state, action) => {
            // console.log(action.payload)
            state.id = action.payload
        },
        setFish: (state, action) =>{
            console.log(action.payload);
            state.fish = action.payload;
        },
        tambahKeranjang: (state, action) =>{
            state.isiKeranjang = state.isiKeranjang + 1
            if(state.listIdinKeranjang.includes(action.payload.id)){
                const newData = state.barang.filter((item) => item.id === action.payload.id);
                newData.map(item => {
                    item.jumlah = item.jumlah + 1
                })
                state.barang = [...state.barang]
            }else{
                state.listIdinKeranjang = [...state.listIdinKeranjang, action.payload.id]
                const newData = {
                    ...action.payload,
                    jumlah: 1,
                }
                state.barang = [...state.barang, newData]
            }
        },
        hapusKeranjang: (state, action) => {
            state.barang = state.barang.filter(item => {
                if(item.id === action.payload){
                    state.isiKeranjang = state.isiKeranjang - item.jumlah
                }
                
                return item.id !== action.payload;
            })
            state.listIdinKeranjang = state.listIdinKeranjang.filter(item => {
                return item !== action.payload;
            })
        },
        editJumlahPesanan: (state, action) => {
            console.log(action.payload);
        },
        setFishEdit: (state, action) => {
            console.log(action.payload);
            state.fishEdit = action.payload;
        },
        setFullname: (state, action) =>{
            console.log(action.payload)
            state.fullname = action.payload;
        },
        setCategory: (state, action) => {
            console.log(action.payload);
            state.category = action.payload;
        },
        kosongkanKeranjang: (state, action) => {
            state.barang = initialValue;
            state.listIdinKeranjang = idFish;
            state.isiKeranjang = 0
        }
    }
})

export const {setUser, setID, setFish, tambahKeranjang, hapusKeranjang, setFishEdit, setFullname, setCategory, kosongkanKeranjang} = KeranjangSlice.actions;
export default KeranjangSlice.reducer;