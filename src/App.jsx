
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './components/Test';
import LoginStudent from './components/LoginStudent';
import HomeStudent from './components/HomeStudent';

function App() {


  return (
    <>
   <Routes>
    <Route path='/' element={<LoginStudent />}></Route>
    <Route path='/studentHome' element={<HomeStudent />}></Route>
   </Routes>
    </>
  )
}

export default App
