import React , {useState} from 'react'
import  {useNavigate} from 'react-router-dom'

const Signup=(props)=> {

    const navigate = useNavigate();
    
  
const[credentials , setcredentials] = useState({name:"" , email:" " , password:""});

 const onChange=(e)=>{
setcredentials({...credentials, [e.target.name]: e.target.value });
}

const{name,email,password}=credentials;
    const handleSubmit = async(e) => {  
        
        e.preventDefault();
        //Api Call
        const response = await fetch(`http://localhost:5000/api/auth/createUser` , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' ,
          },
         body: JSON.stringify({name,email,password}) 
        });
         const json = await response.json()
          console.log(json)

          if (json.success===true) {
            // redirect
        localStorage.setItem('token' , json.authtoken);
        navigate('/');
        props.showAlert('Account Created','success');

         }else{
          props.showAlert('Invalid Credentials','danger');
         }
          
         setcredentials(credentials)
          };



  return (
    <div className="container my-5 mx-5">
    
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control  w-50"
          id="name"
          name="name"
          onChange={onChange}
          value={name}
         
         
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          E-mail
        </label>
        <input
          type="email"
          className="form-control w-50"
          id="email"
          name="email"
          onChange={onChange}
          value={email}
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
          onChange={onChange}
          value={password}
        />
      </div>

      <button type="submit" className="btn btn-primary" >
        Signup
      </button>
    </form>
  </div>
  )
}

export default Signup