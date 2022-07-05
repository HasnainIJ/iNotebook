
import React, { useState } from 'react'
import {useNavigate}  from 'react-router-dom' ;
const  Login=(props)=> {

const[credentials , setcredentials] = useState({email:" " , password:""});

const navigate = useNavigate();

 const onChange=(e)=>{
setcredentials({...credentials, [e.target.name]: e.target.value });
}


    const handleSubmit = async(e) => {  
        
        e.preventDefault();
        //Api Call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' ,
          },
         body: JSON.stringify({email:credentials.email , password:credentials.password }) 
        });
         const json = await response.json()
          console.log(json)
         if (json.success===true) {
            // redirect
        localStorage.setItem("token" , json.authtoken);
        navigate('/');
        props.showAlert('Succesfully Logged In','success');

         }else{
            props.showAlert('Invalid Credentials','danger');
         }
          };



  return (
    <div className="container my-5 mx-5">
    
    <form  onSubmit={handleSubmit}>
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          E-mail
        </label>
        <input
          type="email"
          className="form-control w-50"
          id="email"
          name="email"
          value={credentials.email}
          onChange={onChange}
         
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control w-50"
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
      </div>

      <button type="submit" className="btn btn-primary"  >
        Login
      </button>
    </form>
  </div>
  )
}

export default Login