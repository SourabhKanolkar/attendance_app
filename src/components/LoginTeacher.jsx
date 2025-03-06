import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function LoginTeacher() {
      const [rollno,setRollno]=useState("");
      const [password,setPassword]=useState("");
      const navigate = useNavigate();

       const handleSubmit = async (e) => {
          e.preventDefault();
          try{
            await signInWithEmailAndPassword(auth, rollno, password);
            alert("Login successful!");
            navigate("/teacherHome");
          }catch(error){
            alert("wrong email/password");
          }
        };
    
  return (
   <>
   <section id='logins-page'>
    <div className="container">
        <div className="row">
           
            <div className="col-12 mt-3 ">
            <div className="title">
                <h2 className='text-center'>LOGIN TEACHER</h2>
            </div>
            <form onSubmit={handleSubmit }>
  <div class="mb-3">
    <label for="exampleRollNo" class="form-label">EmailID:</label>
    <input type="text" class="form-control" onChange={(e)=>setRollno(e.target.value)} id="exampleRollNo" aria-describedby="emailHelp"/>

  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" class="btn btn-primary">Login</button>

</form>
            </div>
        </div>
    </div>
  </section>
   
   </>
  )
}
