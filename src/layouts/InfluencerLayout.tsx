import { Component, For, createEffect, createSignal } from "solid-js";
import InfluencerCard from "../components/pageComponents/influencers/InfluencerCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import LoadingScreen from "../components/general/LoadingScreen";

const InfluencerLayout:Component = () => {
    const [loading, setLoading] = createSignal(false);
    const [influencerData,setInfluencerDatga] = createSignal<any[]>([]);

    createEffect(() => {
        getInfluencerData();
    });

    const getInfluencerData = async () => {
        const querySnapshot = await getDocs(collection(db, "influencers"));
        querySnapshot.forEach((doc) => {
          let doc_id = {"id":doc.id}
          let doc_data = doc.data();
          let new_data = Object.assign(doc_id,doc_data);
          setInfluencerDatga((prv) => [...prv,new_data]);
        });
        setLoading(true);
    }

    return (
        <div class="w-11/12 m-auto pt-20 flex gap-5 py-10">
            {loading() 
                ?
                    <For each={influencerData()}>{
                        (i) => <InfluencerCard image={i.image} username={i.username} />
                    }</For>
                :
                <LoadingScreen />
            }
        </div>
    )
}

export default InfluencerLayout;