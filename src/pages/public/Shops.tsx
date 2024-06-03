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
					<div class='w-full md:w-11/12 m-auto px-2 md:px-0 lg:pt-20 flex justify-center flex-wrap md:gap-[9.5px] pt-7 pb-16 mb:pb-10'>
						<For each={storeData()}>{
							(s) =>
								<div class='w-1/2 lg:w-1/6 max-w-56 p-1 md:p-0'>
									<a href={`/shop/${s.id}`}>
										<img src={s?.image} alt={s?.name} class='h-40 pb-2 md:h-56 m-auto'/>
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
