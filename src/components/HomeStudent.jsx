import React from 'react'
import { useState, useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs, getCountFromServer } from "firebase/firestore";
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
export default function HomeStudent() {


  const [percentage, setPercentage] = useState(75);  //set Percentage
  const [totalAttendance, setTotalAttendance] = useState(0)
  const [StudentName, setStudentName] = useState(null);
   
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setStudentName(user.email);
      } else {
        setStudentName(null); // handle unauthenticated state if needed
      }
    });
  
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);
 
  const test = () => {
    let number = document.getElementById("number");
    let counter = 0;
    setInterval(() => {
      if (counter == percentage) {
        clearInterval();
      } else {
        counter += 1;
        number.innerHTML = counter + "%";
      }
    }, 20);
  }

  useEffect(() => {
    test();



  }, [percentage])

  useEffect(() => {

    // Put all of this in an student's Subject Array
    const fetchData = async () => {
      const attendRef = collection(db, "attendance");

      // replace roll number with student's roll number 
      const q = query(attendRef, where("rollNos", "array-contains", "169"), where("subject", "==", "OT"));  //replace OT with the student's subject array 

      //replace "OT" with student's subject array 
      const q2 = query(attendRef, where("subject", "==", "OT"), where("sem", "==", 2));             // replace "sem" (semester) with student's semester(student's logged in data)
      const attended = await getCountFromServer(q);
      const totalLectures = await getCountFromServer(q2);

      //console logged fetched data
      console.log("Attended Lectures:", attended.data().count)
      console.log("Total Lectures:", totalLectures.data().count)


      const attendedLec = attended.data().count;  //storing fetched number of lectures attended
      const totalLec = totalLectures.data().count; // storing total number of lectures taken

      setTotalAttendance(attendedLec / totalLec * 100)  //Example code to calculate percentage
      // Note: create an array to store all the percentages of all subjects and create a average of that percentage Array
      //Example: array = [66,22,43,22]
      //sum = 66+22+43+22
      //(sum)/array.length

    }
    fetchData();

  }, [])

  useEffect(() => {
    console.log("Percentage :", totalAttendance)
  }, [totalAttendance]);

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await auth.signOut();
    navigate('/'); // redirect to homepage after logout
  } catch (error) {
    console.error('Logout Error:', error);
  }
};




  return (
    <>
      <section id="student-home-screen">

        <div className="container">
          <div className="row">
            <div className="title mt-3">
        
            {StudentName && (
  <h2 className="text-center">WELCOME {StudentName}</h2>
)}
    
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
              <div class="bg-white p-4 rounded-lg shadow w-75" style={{ maxWidth: "300px" }}>
                <h2 class="h5 font-weight-bold text-dark">As Per Subjects</h2>
                <div class="mt-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">JAVA</span>
                    <span class="text-muted">50%</span>
                  </div>
                  <div class="progress mb-3" style={{ height: "10px" }}>
                    <div class="progress-bar bg-danger" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">WEB DEVELOPMENT</span>
                    <span class="text-muted">25%</span>
                  </div>
                  <div class="progress mb-3" style={{ height: "10px" }}>
                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">RM</span>
                    <span class="text-muted">10%</span>
                  </div>
                  <div class="progress" style={{ height: "10px" }}>
                    <div class="progress-bar bg-pink" role="progressbar" style={{ width: "10%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 text-center mt-3">
            <button onClick={handleLogout} className="btn btn-danger">
    Logout
  </button>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
