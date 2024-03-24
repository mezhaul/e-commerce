import { Component, For, createSignal } from "solid-js";
import Data from '../../data/Data';
import { IoCartOutline } from "solid-icons/io";
import { HiOutlineBell, HiOutlineHeart } from "solid-icons/hi";
import Logo from '../../assets/images/IMG_2282-removebg-preview.png'
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/userLogout"
import { useNavigate, useLocation } from "@solidjs/router";
import ShopLinks from "../../data/ShopLinks";
import Links from "../../data/Links";
import Ping from "../general/Ping";
import { useCartContext } from "../../context/CartContext";

const Nav: Component = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();
  const location = useLocation();
  const { logoutUser } = useLogout();
  const [profileMenu, setProfileMenu] = createSignal(false);
  const [shopMenu,setShopMenu] = createSignal(false);
  const {cart} = useCartContext();

  const handleLogout = () => {
	  logoutUser();
  }

  const toggleShopMenu = () => {
	setShopMenu(true);
  }

  const closeShopMenu = () => {
	setShopMenu(false);
  }

  const toggleProfileMenu = () => {
	setProfileMenu(!profileMenu());
  }

  return (
    <nav class="w-full md:pt-3 fixed z-50">
      <div class="w-full text-md md:w-11/12 m-auto relative flex rounded-sm justify-between bg-customColor h-14 items-center">

			<ul class="lg:flex gap-1 hidden z-50">
          		<For each={Data}>{(l) => (
					<>
						{l.link === '/shops'
							?
								<li class={`
									${location.pathname === '/shops' || 
									location.pathname === '/children' || 
									location.pathname === '/ladies' || 
									location.pathname === '/men'
										? 
											'bg-black text-white' 
										: 
											''
									} relative cursor-pointer flex h-14 w-28 duration-300 ease-in-out`} onMouseEnter={toggleShopMenu}>
									<p class="m-auto">
										{l.title}
									</p>
									<div class={`${shopMenu() ? 'flex' : 'hidden'} w-52 bg-customColor border-r -ml-12 z-10 mt-[15.8px] left-0 absolute top-10`} onMouseLeave={closeShopMenu}>
										<ul>
											<For each={ShopLinks}>{
												(s) => <button class="p-2 hover:bg-slate-100 w-full text-black" onclick={() => navigate(s.link)}>
													{s.title}
												</button>
											}</For>
										</ul>
									</div>
								</li>
							:
								<a href={l.link} onMouseEnter={closeShopMenu}>
									<li class={`${location.pathname === l.link ? 'bg-black text-white' : ''} flex h-14 w-28 rounded-sm duration-300 ease-in-out`}>
										<p class="m-auto">
											{l.title}
										</p>
									</li>
								</a>
						}
					</>
          		)}</For>
        	</ul>

			<div class="w-full absolute h-full flex justify-center left-0 top-0">
				<div class="flex rounded-full justify-center -mt-3">
					<a href="/">
						<img src={Logo} alt="Mez haul logo" class="h-12 mt-[18px]"/>
					</a>
				</div>
        	</div>

        	<div class="flex gap-6 items-center z-50">
				<button onClick={() => navigate('/whishlist')}>
					<HiOutlineHeart class="text-2xl" />
				</button>
				<button onClick={() => navigate('/notification')}>
					<HiOutlineBell class="text-2xl" />
				</button>
				<button onClick={() => navigate('/cart')} class="relative">
					<IoCartOutline class="text-2xl" />
					{cart().length > 0 
						?
							<Ping />
						:
							null 
					}
				</button>
				{isAuth()
					?
						<>
							<div class="h-8 w-8 relative flex bg-black text-white rounded-full">
								<button
									class="m-auto"
									onClick={toggleProfileMenu}
								>
									M
								</button>
								<div class={`${profileMenu() ? "flex" : "hidden" }  -left-20 absolute w-[188px]  bg-customColor top-11`}>
									<ul class="text-black w-full">
										<For each={Links}>{
											(l) => <a href={l.link}>
													<li class="p-2 hover:bg-gray-300 px-5">{l.title}</li>
												</a>
										}</For>
									</ul>
								</div>
							</div>
							<button
								onClick={handleLogout}
								class="bg-black text-white h-8 px-6 rounded-sm text-sm"
							>
								Logout
							</button>
						</>
					:
						< div class="flex gap-2">
							<button 
								onClick={() => navigate('/login')}
								class={`${location.pathname === '/login' ? ' bg-black text-white' : null} w-24 h-14 rounded-r-sm duration-300`}
							>
								Login
							</button>
							<button 
								onClick={() => navigate('/register')}
								class={`${location.pathname === '/register' ? ' bg-black text-white' : null} w-24 h-14 rounded-r-sm duration-300`}
							>
								Register
							</button>
						</div>
				}
        	</div>

		</div>
    </nav>
  );
};

export default Nav;
