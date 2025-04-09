import React from 'react'
import { useState,useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth,db } from '../firebase-config';
export default function HomeStudent() {

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      const user = auth.currentUser;

      if (user) {
        const studentEmail = user.email;
        const q = query(collection(db, "students"), where("email", "==", studentEmail));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const student = querySnapshot.docs[0].data();
            setStudentData(student);
          } else {
            setStudentData(null);
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
      setLoading(false);
    };

    fetchStudentData();
  }, []);

  return (
   <>
   <section id="student-home-screen">
      <div className="container">
        <div className="row">
          <div className="title mt-3">
            <h2 className="text-center">TOTAL ATTENDANCE</h2>
          </div>
          <div className="col-md-12">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : studentData ? (
              <div className="card" style={{ width: "18rem", display: "block", margin: "auto" }}>
                <img
                  src="https://i0.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?resize=1000%2C667&ssl=1"
                  className="card-img-top"
                  alt="Student"
                />
                <div className="card-body">
                  <h5 className="card-title">Name: {studentData.name}</h5>
                  <p className="card-text">Class: {studentData.class}</p>
                  <p className="card-text">Div: {studentData.div}</p>
                  <p className="card-text">Year: {studentData.year}</p>
                  <p className="card-text">Total Attendance:</p>
                  <a href="#" className="btn btn-primary d-flex justify-content-center">
                    {/* {studentData.attendance}% */}
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-center">No student data found</p>
            )}
          </div>
        </div>
      </div>
    </section>
   
   </>
  )
}
