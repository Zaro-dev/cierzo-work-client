import { Routes } from 'react-router-dom'
import './App.css'
import WelcomePage from './pages/WelcomePage'

function App() {

  return (
    <div>
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  )
}

export default App
