import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import userData from './db.json';

export const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(userData.users);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    const user = users.find(user => user.username === username.value && user.password === password.value);
    if (user) {
      navigate('/layout');
    } else {
      navigate('/');
    }
  }

  return (
    <div className='flex justify-center items-center px-8 h-screen'>
      <div className='rounded-lg bg-gray-50 p-12'>
        <img src="/logostorage-amarillo.png" alt="logotipo" />
        

        <form onSubmit={handleLogin} className=' rounded-lg' >
          <div className='block text-yellow-500 font-black text-xl mt-16 my-8'>
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" className="border-2 w-full p-2 mt-2 text-black rounded-md font-normal" />
          </div>

          <div className='block text-yellow-500 font-black text-xl my-8'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" className="border-2 w-full p-2 mt-2 font-normal text-black rounded-md"/>
          </div>

          <input type="submit" value="Iniciar Sesión" className="font-bold justify-center text-white bg-yellow-500 uppercase rounded-lg p-3 w-full cursor-pointer hover:bg-yellow-600" /> 
        </form>
      </div>
    </div>
  );
};
