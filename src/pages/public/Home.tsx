import { Component, createEffect, createSignal } from 'solid-js'
import Hero from '../../components/general/Hero'
import HomeBanner from '../../components/pageComponents/homeComponents/HomeBanner';
import Carousel from '../../components/general/Carousel';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import LoadingScreen from '../../components/general/LoadingScreen';

const Home:Component = () => {
	const [loading, setLoading] = createSignal(false);
	const [shopList,setShopList] = createSignal<any[]>([]);

	createEffect(() => {
		getListOfShops();
	});

	const getListOfShops = async () => {
        const querySnapshot = await getDocs(collection(db, "stores"));
        querySnapshot.forEach((doc) => {
            let doc_id = {"id":doc.id}
            let doc_data = doc.data();
            let new_data = Object.assign(doc_id,doc_data);
			console.log(new_data);
            setShopList((prv) => [...prv,new_data]);
        });
		setLoading(true);
	}

	return (
		<>
		<Hero />
			{/* <div class='w-full md:w-10/12 m-auto px-6 pt-10 md:pt-14'>
				<h1 class='text-2xl font-bold pb-4'>
					Introducing Mez Haul
				</h1>
				<p class='text-sm'>
					Experience fast, efficient delivery from your favorite stores, all in one place. Shop multiple stores with a single delivery fee of just R95, ensuring next-day arrival. Save time and focus on what matters most, with the convenience and simplicity of our centralized platform
				</p>
			</div> */}
			<div class='h-52 md:h-96'>
				{loading()
					?
						<>
							{shopList().length > 0 && <Carousel shopLinks={shopList()} />}
						</>
							
					:
						<LoadingScreen />
				}
			</div>
			{/* <HomeBanner /> */}
		</>
	)
}

export default Home;
