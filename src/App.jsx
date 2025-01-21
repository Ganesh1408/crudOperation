
import './App.css'
import Home from './Components/Home'
import InvoiceForm from './Components/InvoiceForm/InvoiceForm'
import Login from './Components/Login'
import {Routes,BrowserRouter,Route} from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {


  return (
    <BrowserRouter> 
    <Routes>
    <Route exact path="/login" element={<Login/>}/> 
    <Route  exact path ="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
    <Route  exact path ="/invoice" element={<ProtectedRoute><InvoiceForm/></ProtectedRoute>} />
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
