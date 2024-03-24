import { Component, createEffect, createSignal } from "solid-js"
import ProductsLayout from "../../layouts/ProductsLayout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


const Men:Component = () => {
    const [listOfMenProducts,setListOfMenProducts] = createSignal<any[]>([]);

    createEffect(() => {
        getListOfMenProducts()
    });

    const getListOfMenProducts = async () => {
        const q = query(collection(db, "products"), where("category", "==", "men"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const doc_id = {"id":doc.id}
            const doc_data = doc.data()
            const new_data = Object.assign(doc_id,doc_data);
            setListOfMenProducts((prv) => ({...prv,new_data}));
            console.log(new_data);
        });
    }

    console.log(listOfMenProducts());

    return (
        <>
            <ProductsLayout />
        </>
    )
}

export default Men;