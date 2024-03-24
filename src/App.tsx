import Nav from './components/navigation/Nav'
import Footer from './components/navigation/Footer'
import { useLocation } from '@solidjs/router'

const App = ({children}: any) => {
  const location = useLocation();

  return (
    <main>
      <Nav/> 
      <div class="min-h-screen bg-gray-100">
          {children}
      </div>
      {
        location.pathname === '/login' || 
        location.pathname === '/register' ||
        location.pathname === '/cart' ||  
        location.pathname === '/profile' ||
        location.pathname === '/orders' ||
        location.pathname === '/address' ||
        location.pathname === '/notification' ||
        location.pathname === '/whishlist' ||
        location.pathname === '/checkout'
          ? 
            null 
          : 
            <Footer />
      }
      <div class='w-full bg-black h-screen fixed z-50'>
      test
      </div>
    </main>
  )
}

export default App
