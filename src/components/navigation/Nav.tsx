import { Component, For, createSignal } from "solid-js";
import Data from '../../data/Data';
import { IoCartOutline, IoChevronDown, IoChevronUp, IoMenu, IoPersonCircleOutline } from "solid-icons/io";
import { HiOutlineBell, HiOutlineHeart } from "solid-icons/hi";
import Logo from '../../assets/images/white-logo.png'
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
  const [shopMobileMenu,setShopMobileMenu] = createSignal(false);
  const {cart} = useCartContext();
  const [menuOpen, setMenuOpen] = createSignal(false);

  function toggleMenu() {
	setMenuOpen(!menuOpen());
  }

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

  const goToPage = (e: string) => {
	navigate(e);
	setMenuOpen(false);
	if(shopMobileMenu()){
		setShopMobileMenu(false);
	}
  }

  return (
    <nav class="w-full md:pt-3 fixed z-50">
      <div class="w-full px-4 lg:px-0 text-md md:w-11/12 m-auto relative text-white flex rounded-sm justify-between bg-black h-14 items-center">

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
									} relative cursor-pointer flex h-14 w-28 duration-300 ease-in-out`} onClick={toggleShopMenu}>
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

			<div class="w-full lg:absolute h-full flex lg:justify-center left-0 top-0">
				<div class="flex rounded-full justify-center -mt-3">
					<a href="/">
						<img src={Logo} alt="Mez haul logo" class="h-12 mt-[18px]"/>
					</a>
				</div>
        	</div>

        	<div class="lg:flex gap-6 items-center z-50 hidden">
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
								class="bg-black text-white h-8 px-6 rounded-sm text-sm mr-3"
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

			<button
				class="lg:hidden"
          		onClick={toggleMenu}
		  	>
				<IoMenu class="text-3xl"/>
			</button>

		</div>
		<div class="relative">
        {menuOpen() && (
          <div
            class="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Menu */}
        <div
          class={`fixed inset-y-0 right-0 z-50 w-72 bg-customColor shadow-lg transform transition-transform ${
            menuOpen() ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div class="py-4">
			<ul class="flex flex-col gap-2 z-50">
					<For each={Data}>{(l) => (
						<>
							{l.link === '/shops'
								?
									<li class="w-full py-2">
										<div class="justify-center flex gap-3 relative items-center">
											<p>
												{l.title}
											</p>
											<button onClick={() => setShopMobileMenu(!shopMobileMenu())}>
												{
													shopMobileMenu()
														?
															<IoChevronUp />
														:
															<IoChevronDown />
												}
											</button>
										</div>
										<div class={shopMobileMenu() ? "block py-3" : " hidden w-full"}>
											<For each={ShopLinks}>{
												(i) => <button class="w-full py-2" onclick={() => goToPage(i.link)}>
														{i.title}
													</button>
											}</For>
										</div>
									</li>
								:
									<button class="w-full py-2" onclick={() => goToPage(l.link)}>
										<p>
											{l.title}
										</p>
									</button>
							}
						</>
					)}</For>
				</ul>
		  </div>
        </div>
      </div>
	  <div class="fixed bottom-0 py-3 bg-customColor w-full flex md:hidden border-t border-gray-300">
		  <div class="w-1/4 flex">
				<button onClick={() => navigate('/whishlist')} class="m-auto">
					<HiOutlineHeart class="text-3xl" />
				</button>
		  </div>
		  <div class="w-1/4 flex">
				<button onClick={() => navigate('/notification')} class="m-auto">
					<HiOutlineBell class="text-3xl" />
				</button>
          </div>
		  <div class="w-1/4 flex">
				<button onClick={() => navigate('/cart')} class="m-auto">
					<IoCartOutline class="text-3xl" />
					{cart().length > 0
						?
							<Ping />
						:
							null
					}
				</button>
		  </div>
		  <div class="w-1/4 flex">
		  	<button
				class="m-auto"
				onClick={toggleProfileMenu}
			>
				<IoPersonCircleOutline class="text-3xl" />
			</button>
		  </div>
	  </div>
    </nav>
  );
};

export default Nav;

