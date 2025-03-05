import React from 'react'

export default function HomeStudent() {
  return (
   <>
   <section id='student-home-screen'>
    <div className="container">
      <div className="row">
      <div className="title mt-3">
            <h2 className='text-center'>TOTAL ATTENDANCE</h2>
          </div>
        <div className="col-md-12">
        <div className="card" style={{width:"18rem",display:"block",margin:"auto"}}>
  <img src="https://i0.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?resize=1000%2C667&ssl=1" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Name:Saurabh Kanolkar</h5>
    <p className="card-text">Class:MCA</p>
    <p className="card-text">Div:A</p>
    <p className="card-text">Year:2</p>
    <p className="card-text">Total Attendance:</p>
    <a href="#" className="btn btn-primary d-flex justify-content-center">75%</a>
  </div>
</div>
        </div>
      </div>
    </div>
   </section>
   
   </>
  )
}
