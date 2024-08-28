import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/layout');
  }

  return (
    <div className='flex justify-center items-center px-8 h-screen'>
      <div className='rounded-lg bg-slate-100 bg-opacity-50 p-12'>
        <img src="/logostorage-amarillo.png" alt="logotipo" />
        <div className="flex justify-center items-center mt-3">

          <h2 className='font-bold uppercase '>Control de {''}
            <span className="text-yellow-500">Stock</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className=' rounded-lg' >
        
          <input type="submit" value="Iniciar Sesión" className="font-bold justify-center text-white bg-yellow-500 uppercase rounded-lg p-3 w-full cursor-pointer hover:bg-yellow-600" />
        </form>
      </div>
    </div>
  );
};
