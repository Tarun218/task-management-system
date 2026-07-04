
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/boards/:boardId' element={<Board/>} />
    </Routes>
  )
}

export default App
