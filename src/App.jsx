
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginStudent from './components/LoginStudent';
import HomeStudent from './components/HomeStudent';
import LoginTeacher from './components/LoginTeacher';
import HomeTeacher from './components/HomeTeacher';

function App() {


  return (
    <>
   <Routes>
    <Route path='/' element={<LoginStudent />}></Route>
    <Route path='/studentHome' element={<HomeStudent />}></Route>
    <Route path='/LoginTeacher' element={<LoginTeacher />}></Route>
    <Route path='/teacherHome' element={<HomeTeacher />}></Route>
    
    
   </Routes>
    </>
  )
}

export default App
