
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginStudent from './components/LoginStudent';
import HomeStudent from './components/HomeStudent';
import LoginTeacher from './components/LoginTeacher';
import HomeTeacher from './components/HomeTeacher';
import AddStudent from './components/AddStudent';

function App() {


  return (
    <>
 
   <Routes>
    <Route path='/' element={<LoginStudent />}></Route>
    <Route path='/studentHome' element={<HomeStudent />}></Route>
    <Route path='/LoginTeacher' element={<LoginTeacher />}></Route>
    <Route path='/teacherHome' element={<HomeTeacher />}></Route>
    <Route path='/addstudent' element={<AddStudent />}></Route>
    
    
   </Routes>
    </>
  )
}

export default App
