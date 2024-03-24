import {Component} from "solid-js"
import Nav from "../components/navigation/Nav"
import Footer from "../components/navigation/Footer"

interface MainLayoutProps {
	children: any
}

const MainLayout:Component<MainLayoutProps> = ({children}) => {
	return (
		<>
			<Nav />
			{children}
			</Footer />
		</>
	)
}

export default MainLayout;
