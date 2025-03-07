import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function LoginStudent() {
  const [rollno,setRollno]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, rollno, password);
      alert("Login successful!");
      navigate("/studentHome");
    }catch(error){
      alert("wrong rollno/password");
    }
  };

  return (
  <>
  
  <section id='logins-page'>
    <div className="container">
        <div className="row">
           
            <div className="col-12 mt-3 ">
            <div className="title">
                <h2 className='text-center' style={{fontFamily:"sans-serif",fontWeight:"bold"}}>LOGIN STUDENT</h2>
            </div>
            <form onSubmit={handleSubmit } style={{width:"364px",height:"469px",display:"block",margin:"auto"}}>
  <div class="mb-3">
    <label for="exampleRollNo" class="form-label">RollNo</label>
    <input type="text" style={{width:"364px",height:"53px",borderRadius:"15px"}} class="form-control" onChange={(e)=>setRollno(e.target.value)} id="exampleRollNo" aria-describedby="emailHelp"/>

  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" style={{width:"364px",height:"53px",borderRadius:"15px"}} class="form-control" onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" style={{width:"124px",height:"52px",backgroundColor:"#5038ED",display:"block",margin:"auto"}} class="btn btn-primary">Login</button>
    {/* <Link to="/LoginTeacher"> Are You A Teacher?</Link> */}
</form>
            </div>
        </div>
    </div>
  </section>
  
  
  </>
  )
}
