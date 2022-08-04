import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useLogoutMutation } from '../components/apiSlice';

import { useAuth } from '../components/useAuth';
import { setCredentials } from '../components/userSlice';

const Login = () => {
  const {username: user} = useAuth();

  const [login, {isLoading}] = useLoginMutation();
  const [logout]= useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      console.log(username, password);
      try {
        const r = await login({username, password}).unwrap();
        console.log(r);
        dispatch(setCredentials({
          username,
          token: r.token
        }));
        navigate('/');
      } catch (error) {
        setError("Error! Credentials not valid or server error...")
      }
    }

  }


  return (
    <div className='flex flex-col w-full bg-violet-200 justify-center m-auto h-auto max-w-[1200px] p-8'>
      <h1 className='text-4xl text-blue-600'> Login page </h1>
      { user ? (
        <>
          <div className='flex flex-col mt-8'>
            <h2 className='text-2xl text-pink-800'>Welcome {user}!</h2>
            <button className='bg-gray-800 py-4 px-8 rounded-xl text-gray-200' onClick={async () =>{
              try {
                const r = await logout().unwrap();
                console.log(r)
                dispatch(setCredentials({
                  username: null,
                  token: null
                }));
                navigate('/welcome');
              } catch (error) {
                setError('Error!')
              }

            } }>Logout</button>
          </div>
        </>
      ) : (
        <>
          <div className='mt-16'>
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
            {
              error && 
                <div className='flex flex-row justify-center mt-8'>
                <div className='bg-red-300 border border-red-600 rounded-lg p-8 w-full flex flex-row justify-between items-center'>
                  {JSON.stringify(error)}
                  <button className='text-xl' onClick={() => setError(null)}>X</button>
                </div>
              </div>
            }
          </div>
        </>
      ) }
    
    
    </div>
  )
}

export default Login