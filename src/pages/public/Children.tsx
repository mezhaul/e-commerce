import { Component, createEffect, createSignal } from "solid-js"
import ProductsLayout from "../../layouts/ProductsLayout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


const Children:Component = () => {
    const [listOfChildrenProducts,setListOfChildrenProducts] = createSignal<any[]>([]);

    createEffect(() => {
        getListOfChildrenProducts()
    });

    const getListOfChildrenProducts = async () => {
        const q = query(collection(db, "products"), where("category", "==", "men"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const doc_id = {"id":doc.id}
            const doc_data = doc.data()
            const new_data = Object.assign(doc_id,doc_data);
            setListOfChildrenProducts((prv) => ({...prv,new_data}));
            console.log(new_data);
        });
    }

    console.log(listOfChildrenProducts());

    return (
        <>
            <ProductsLayout />
        </>
    )
}

export default Children;