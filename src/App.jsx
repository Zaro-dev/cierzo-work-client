import { Routes, Route } from 'react-router-dom'
import './App.css'

import WelcomePage from './pages/WelcomePage'
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"

function App() {

  return (
    <div>
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
