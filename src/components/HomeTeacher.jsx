import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, query, where, getDocs, addDoc,doc,updateDoc,arrayUnion } from "firebase/firestore";
import Navbar from "./Navbar";

export default function HomeTeacher() {
  const [classValue, setClassValue] = useState("");
  const [division, setDivision] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [BatchYear,setBatchYear]=useState("");
  const [selectedRollNos, setSelectedRollNos] = useState([]);

  var D= new Date(); // this will be used to get the current year

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setStudents([]); // Clear previous results
    setSelectedRollNos([]); // Clear previous selections

    try {
      const studentsRef = collection(db, "students");
      let q = studentsRef; // Start with the collection reference

      const filters = [];
      if (classValue) filters.push(where("class", "==", classValue));
      if (division) filters.push(where("div", "==", division));
      if (year) filters.push(where("year", "==", year));

      if (filters.length > 0) {
        q = query(studentsRef, ...filters);
      }

      const querySnapshot = await getDocs(q);
      const fetchedStudents = [];
      querySnapshot.forEach((doc) => {
        fetchedStudents.push({ id: doc.id, ...doc.data() });
      });

      setStudents(fetchedStudents);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (rollNo) => {
    setSelectedRollNos((prev) =>
      prev.includes(rollNo)
        ? prev.filter((num) => num !== rollNo) // Remove if already selected
        : [...prev, rollNo] // Add if not selected
    );
  };

  // Handle Submit Attendance
  const handleSubmitAttendance = async () => {
    if (!classValue || !division || !date || !subject) {
      alert("Please select Class, Division, Date, and Subject.");
      return;
    }
  
    if (selectedRollNos.length === 0) {
      alert("Please select at least one student.");
      return;
    }
  
    try {
      // 1. Add to "attendance" collection (as before)
      await addDoc(collection(db, "attendance"), {
        class: classValue,
        division: division,
        date: date,
        subject: subject,
        rollNos: selectedRollNos,
      });
  
      // 2. Update each student's document to include attendance info
      for (const rollNo of selectedRollNos) {
        const student = students.find((s) => s.rollno === rollNo);
        if (student) {
          const studentRef = doc(db, "students", student.id);
          await updateDoc(studentRef, {
            attendance: arrayUnion({
              date: date,
              subject: subject,
            }),
          });
        }
      }
  
      alert("Attendance submitted successfully!");
      setSelectedRollNos([]);
      setSubject("");
    } catch (error) {
      console.error("Error submitting attendance: ", error);
    }
  };

  return (
    <>
     <Navbar />
      <section id="teacher-home-page">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2 className="text-center">TEACHER DASHBOARD</h2>
            </div>
            <div className="col-md-12">
              <form onSubmit={handleSearch}>
                <div className="filter-form d-flex">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />

                  <label htmlFor="class">Class:</label>
                  <select
                    id="class"
                    className="form-select"
                    value={classValue}
                    onChange={(e) => setClassValue(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    <option value="mca">MCA</option>
                    <option value="mba">MBA</option>
                  </select>

                  <label htmlFor="division">Div:</label>
                  <select
                    id="division"
                    className="form-select"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                  >
                    <option value="">Select Division</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                  </select>

                  <label htmlFor="year">Year:</label>
                  <select
                    id="year"
                    className="form-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>

                  <button type="submit" className="btn btn-primary ms-2">
                    SEARCH
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Table to display students */}
          <div className="row mt-3">
            <h2 className="text-center">ALL THE STUDENTS AS PER FILTER</h2>
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Roll No</th>
                    <th scope="col">Present</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{student.name}</td>
                        <td>{student.rollno}</td>
                        <td>
                          <input
                            type="checkbox"
                            name="present"
                            onChange={() => handleCheckboxChange(student.rollno)}
                            checked={selectedRollNos.includes(student.rollno)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="subject-field" style={{ width: "300px" }}>
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <button
                className="btn btn-danger mt-3"
                onClick={handleSubmitAttendance}
              >
                SUBMIT ATTENDANCE
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
