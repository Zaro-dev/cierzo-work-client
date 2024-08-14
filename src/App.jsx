import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// PAGES
import WelcomePage from './pages/WelcomePage'
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"

// COMPONENTS
import MyNavbar from './components/Navbar'
import Footer from './components/Footer';

function App() {

  return (
    <div>

      <MyNavbar />

      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
