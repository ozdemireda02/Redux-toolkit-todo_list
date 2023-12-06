import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

// 1.Başlangıç state'ini tanımla
const initialState = {
    tasks: [
        {
            id:"1jnjnxjsj",
            title :"Navbar Animasyonu",
            author :"Ahmet",
            assigned_to:"Mehmet",
            end_date: "2024-01-01",
        },
        {
            id:"85ajndk",
            title :"Ödeme Sistemi",
            author :"Veli",
            assigned_to:"Fatma",
            end_date: "2024-01-02",
        },
    ],
}

// 2.Slice 'ı oluştur
const crudSlice = createSlice({
    name:"crud",
    initialState,
    // state'in nasıl değişeceğine karar veren reducer fonksiyonları
    reducers:{
        // 1.yeni task ekleme
        addTask:(state,action) => {
        // todo ya id ekleme /(silme işlemi yaparken id'ye göre yaptığımız için id ekliyoruz)
        action.payload.id = v4();
        // toolkitle birlikte slice'ta tuttuğumuz veriyi doğrudan değiştirebiliyoruz
        state.tasks.push(action.payload);
        },
        // 2.task'i güncelleme
        editTask:(state,action) => {
            // action'un payload'ı ile gelen objenin state'te tuttuğumuz eski halini çıkarıp,
            // payload ile gelen halini eklicez
            // -- güncellenecek elemanın sırasını bul
            const i = state.tasks.findIndex((t) => t.id === action.payload.id)
            // 1.splice yöntemi
            // state.tasks.splice(i,1,action.payload)
            // 2.doğrudan diziyi güncelle
            state.tasks[i] = action.payload
        }, 
        // 3.task'i silme
        removeTask:(state,action) => {
            // 1.yöntem > filter > yeni bir dizi oluşturup,oluşan yeni diziyi state.tasks 'e eşitler
        //    const filtred = state.tasks.filter((task) => task.id !== action.payload );
        //    state.tasks = filtred;
            // 2.yöntem > splice > yeni bir dizi oluşturmaz,var olan diziyi günceller
            // a)silinecek elemanın dizideki sırasını bulma

            const i = state.tasks.findIndex((t) => t.id === action.payload);
            // b)splice ile diziyi güncelleme
            state.tasks.splice(i,1);
        },
    },
})

// 3.Aksiyonları tek tek export et
export const {addTask,editTask,removeTask} = crudSlice.actions;

// 4.Reducer'ı export et
export default crudSlice.reducer;