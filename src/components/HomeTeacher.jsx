import React from 'react'
import { db } from '../firebase-config'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import  { useState } from "react";

export default function HomeTeacher() {

    const [formData, setFormData] = useState({
        name: "",
        class: "",
        div: "",
        year: "",
        email: "",
        attendance: "",
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await addDoc(collection(db, "students"), formData);
          alert("Attendance added successfully!");
          setFormData({ name: "", class: "", div: "", year: "", email: "", attendance: "" });
        } catch (error) {
          console.error("Error adding document: ", error);
          alert("Failed to add attendance.");
        }
      };

  return (
    <>
    <section id='teacher-home-page'>
        <div className="container">
            <div className="row">
                <div className="title">
                    <h2 className='text-center'>TEACHER DASHBOARD</h2>
                </div>
                <div className="col-md-12">
                    <h3 className='text-center'>ADD ATTENDANCE</h3>
             <form style={{ width: "500px", display: "block", margin: "auto" }} onSubmit={handleSubmit}>
              {["name", "class", "div", "year", "email", "attendance"].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label" htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
                </div>
            </div>
        </div>
    </section>
    
    </>
  )
}
