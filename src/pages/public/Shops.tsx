import { Component, For, createEffect, createSignal } from 'solid-js'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import LoadingScreen from '../../components/general/LoadingScreen';

const Shops:Component = () => {
	const [loading,setLoading] = createSignal(false);
    const [storeData, setStoreData] = createSignal<any[]>([])
    createEffect(() => {
        getShopsData();
    });

    const getShopsData = async () => {
        const querySnapshot = await getDocs(collection(db, "stores"));
        const data:any = [];
        querySnapshot.forEach((doc) => {
			let doc_id = {'id': doc.id}
			let doc_data = doc.data();
			let new_data = Object.assign(doc_id,doc_data);
            data.push(new_data);
        });
        setStoreData(data);
		setLoading(true);
    }
	return (
		<>
			{loading() 
				?
					<div class='w-11/12 m-auto lg:pt-32 flex flex-wrap'>
						<For each={storeData()}>{
							(s) =>
								<div class='w-1/2 md:w-1/4 lg:w-1/5 h-56 p-2 mb-4 md:mb-0'>
									<a href={`/shop/${s.id}`}>
										<img src={s?.image} alt={s?.name} class='h-56 shadow m-auto'/>
									</a>
								</div>
						}</For>
					</div>
				:
						<LoadingScreen />
			}
		</>
	)
}

export default Shops;
