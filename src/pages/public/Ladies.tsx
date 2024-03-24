import { Component, createEffect, createSignal } from "solid-js"
import ProductsLayout from "../../layouts/ProductsLayout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const Ladies:Component = () => {
    const [listOfLadiesProducts,setListOfLadiesProducts] = createSignal<any[]>([]);

    createEffect(() => {
        getListOfLadiesProducts()
    });

    const getListOfLadiesProducts = async () => {
        const q = query(collection(db, "products"), where("category", "==", "ladies"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const doc_id = {"id":doc.id}
            const doc_data = doc.data()
            const new_data = Object.assign(doc_id,doc_data);
            setListOfLadiesProducts((prv) => ({...prv,new_data}));
            console.log(new_data);
        });
    }

    console.log(listOfLadiesProducts());

    return (
        <>
           <ProductsLayout />
        </>
    )
}

export default Ladies;