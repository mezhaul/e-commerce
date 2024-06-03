
/* @refresh reload */
import App from './App'
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { AuthContextProvider } from './context/AuthContext'

/* This style sheet includes Tailwindcss as well as custom css */
import './index.css'

/* This the public side page */
import Home from './pages/public/Home'
import Shops from './pages/public/Shops'
import NotFound from './pages/Notfound'
import Categories from './pages/public/Categories'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Products from './pages/public/Products'
import Product from './pages/public/Product'

/* This is client side page */
import Profile from './pages/client/Profile'
import Orders from './pages/client/Orders'
import Notification from './pages/client/Notification'
import AdminLayout from './layouts/AdminLayout'
import Cart from './pages/public/Cart'
import Address from './pages/client/Address'
import Ladies from './pages/public/Ladies'
import Men from './pages/public/Men'
import Children from './pages/public/Children'
import Toddlers from './pages/public/Toddlers'
import Whishlist from './pages/client/Whishlist'
import { CartContextProvider } from './context/CartContext'
import Checkout from './pages/public/Checkout'
import Success from './pages/public/Success'
import Cancel from './pages/public/Cancel'
import Beauty from './pages/public/Beauty'
import Hair from './pages/public/Hair'
import Accessories from './pages/public/Accessories'
import Flowers from './pages/public/Flowers'
import Clothes from './pages/public/Clothes'
import TermsOfService from './pages/public/TermsOfService'
import Faq from './pages/public/Faq'
import PrivacyPolicy from './pages/public/PrivacyPolicy'


const root = document.getElementById('root')

render(() => (
	<AuthContextProvider>
		<CartContextProvider>
			<Router root={App}>
				<Route path="/" component={Home} />
				<Route path="/beauty" component={Beauty} />
				<Route path="/hair" component={Hair} />
				<Route path="/accessories" component={Accessories} />
				<Route path="/clothes" component={Clothes} />
				<Route path="/flowers" component={Flowers} />
				<Route path="/shop/:id" component={Products} />
				<Route path="/product/:id" component={Product} />
				<Route path="/influencers" component={Categories} />
				<Route path="/terms_of_service" component={TermsOfService} />
				<Route path="/privacy_policy" component={PrivacyPolicy} />
				<Route path="/faqs" component={Faq} />
				<Route path="/ladies" component={Ladies} />
				<Route path="/men" component={Men} />
				<Route path="/kids" component={Children} />
				<Route path="/toddlers" component={Toddlers} />
				<Route path="/contact" component={Contact} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/cart" component={Cart} />
				<Route path="/cart" component={Cart} />
				<Route path="checkout" component={Checkout} />
				<Route path="/success" component={Success} />
				<Route path="/cancel" component={Cancel} />
				<Route path="*" component={NotFound} />
				<Route path="/" component={AdminLayout}>
					<Route path="/profile" component={Profile} />
					<Route path="/orders" component={Orders} />
					<Route path="/whishlist" component={Whishlist} />
					<Route path="/notification" component={Notification} />
					<Route path="/address" component={Address} />
				</Route>
			</Router>
		</CartContextProvider>
	</AuthContextProvider>
), root!)
