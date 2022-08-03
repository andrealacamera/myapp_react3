import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../components/apiSlice';

import { useAuth } from '../components/useAuth';

const Login = () => {
  const {user} = useAuth();

  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const r = await login({username, password}).unwrap();
    console.log(r)
  }


  return (
    <div className='flex flex-col w-full bg-gray-100 justify-center m-auto h-auto '>
      <h1> Login page </h1>
      { user ? (
        <>
          <div className='flex flex-col'>
            <h1>Welcome {user}!</h1>
            <button>Logout</button>
          </div>
        </>
      ) : (
        <>
          <div className=' mt-16'>
            <form className='flex flex-col justify-between items-center gap-4 text-xl p-4 rounded-lg' >
              <div className='flex flex-col justify-start'>
                <label htmlFor='username' className=''>Username</label> 
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className='flex flex-col justify-start'>
                <label htmlFor='password' className=''>Password</label> 
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button className='bg-gray-800 py-4 px-8 rounded-xl text-gray-200' onClick={handleSubmit} >
                { isLoading ? <span>sending data...</span> : <span>Login</span> }
              </button>
            </form>
          </div>
        </>
      ) }
    
    
    </div>
  )
}

export default Login