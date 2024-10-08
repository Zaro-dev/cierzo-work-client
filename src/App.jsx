import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// PAGES
import WelcomePage from './pages/WelcomePage'
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import CuentasPage from './pages/CuentasPage';
import MovimientosPage from './pages/MovimientosPage';
import GastosPage from './pages/GastosPage';
import IngresosPage from './pages/IngresosPage';
import CuentaDetails from './pages/CuentaDetails';
import AboutPage from './pages/AboutPage';


// COMPONENTS
import MyNavbar from './components/Navbar'



function App() {

  return (
    <>

      <MyNavbar />

      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/cuentas' element={<CuentasPage/>}/>
      <Route path="/cuentas/:cuentaId" element={<CuentaDetails />} />
      <Route path='/movimientos' element={<MovimientosPage/>}/>
      <Route path='/movimientos/gastos' element={<GastosPage/>}/>
      <Route path='/movimientos/ingresos' element={<IngresosPage/>}/>
      <Route path='about' element={<AboutPage/>}/>
      </Routes>
    </>
  )
}

export default App
