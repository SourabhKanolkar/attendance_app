import React from 'react'
import { useState,useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth,db } from '../firebase-config';
export default function HomeStudent() {
  


   const StudentName=auth.currentUser.email;
    
   const test=()=>{
    let number= document.getElementById("number");
    let counter=0;
    setInterval(()=>{
      if(counter==65){
        clearInterval();
      }else{
        counter +=1;
        number.innerHTML=counter+"%";
      }
     
    },20);
   }

  useEffect(()=>{
    test();
   
  },[])
  
  return (
   <>
   <section id="student-home-screen">
      <div className="container">
        <div className="row">
          <div className="title mt-3">
            <h2 className="text-center">WELCOME {StudentName} </h2>
          </div>
       <div className="col-md-4">
       <span className='text-center mb-3'>OVERALL ATTENDANCE</span>
        <div className="total-attendance-overall" >
       
              <div className="outer">
                <div className="inner">
                  <div id="number">
                    65%
                  </div>
                </div>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
         <defs>
            <linearGradient id="GradientColor">
               <stop offset="0%" stopColor="#e91e63" />
               <stop offset="100%" stopColor="#673ab7" />
            </linearGradient>
         </defs>
         <circle cx="80" cy="80" r="70" stroke-linecap="round" />
 </svg>




        </div>
       </div>

       <div className="col-md-6">
       <div class="bg-white p-4 rounded-lg shadow w-75" style={{maxWidth:"300px"}}>
        <h2 class="h5 font-weight-bold text-dark">As Per Subjects</h2>
        <div class="mt-4">
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">JAVA</span>
                <span class="text-muted">50%</span>
            </div>
            <div class="progress mb-3" style={{height: "10px"}}>
                <div class="progress-bar bg-danger" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">WEB DEVELOPMENT</span>
                <span class="text-muted">25%</span>
            </div>
            <div class="progress mb-3" style={{height: "10px"}}>
                <div class="progress-bar bg-primary" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">RM</span>
                <span class="text-muted">10%</span>
            </div>
            <div class="progress" style={{height: "10px"}}>
                <div class="progress-bar bg-pink" role="progressbar" style={{width: "10%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>
       </div>
        </div>
      </div>
    </section>
   
   </>
  )
}
