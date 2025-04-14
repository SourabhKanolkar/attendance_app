import React from 'react'
import { db ,auth} from '../firebase-config';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc,doc } from 'firebase/firestore';
import Navbar from './Navbar';


export default function AddStudent() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rollNo: '',
        class: '',
        div: '',
        year: '',
        password: ''
      });

      const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, ...studentData } = formData;
    
        try {
          // 1. Create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const uid = userCredential.user.uid;
    
          // 2. Create Firestore document
          await setDoc(doc(db, 'students', uid), {
            ...studentData,
            email,
            uid
          });
    
          alert('Student added successfully!');
          setFormData({
            name: '',
            email: '',
            rollNo: '',
            class: '',
            div: '',
            year: '',
            password: ''
          });
    
        } catch (error) {
          console.error('Error adding student:', error);
          alert(error.message);
        }
      };
  return (
   <>
   <Navbar />
    <section id='add-student-section'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className='text-center'>ADD STUDENT</h2>
            <form onSubmit={handleSubmit} className='mt-4'>

              <input type="text" name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} value={formData.name} required />

              <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} value={formData.email} required />

              <input type="text" name="rollNo" placeholder="Roll No" className="form-control mb-2" onChange={handleChange} value={formData.rollNo} required />

              <select name="class" className="form-control mb-2" onChange={handleChange} value={formData.class} required>
                <option value="">Select Class</option>
                <option value="mca">MCA</option>
                <option value="mba">MBA</option>
              </select>

              <select name="div" className="form-control mb-2" onChange={handleChange} value={formData.div} required>
                <option value="">Select Division</option>
                <option value="a">A</option>
                <option value="b">B</option>
              </select>

              <input type="text" name="year" placeholder="Year" className="form-control mb-2" onChange={handleChange} value={formData.year} required />

              <input type="password" name="password" placeholder="Password" className="form-control mb-3" onChange={handleChange} value={formData.password} required />

              <button type="submit" className="btn btn-primary w-100">Add Student</button>

            </form>
          </div>
        </div>
      </div>
    </section>
   </>
  )
}
