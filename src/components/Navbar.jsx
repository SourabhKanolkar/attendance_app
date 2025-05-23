import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
<>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link active" href="#"><Link style={{textDecoration:"none"}} to={"/teacherHome"}>TeacherHome</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link style={{textDecoration:"none"}} to={"/addstudent"}>AddStudnet</Link></a>
        </li>
       
      
      </ul>
      
    </div>
  </div>
</nav>
</>
  )
}
