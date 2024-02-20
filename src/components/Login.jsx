import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export const Login = () => {


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(formData.usuario === "admin" && formData.contraseña === "admin") {
      navigate('/layout')
    } else {
      navigate('/')
    }
  }

  return (
    <div className='flex justify-center items-center px-8 h-screen'>
      <div className='rounded-lg bg-white p-12'>
        <img src="/logostorage-amarillo.png" alt="logotipo" />
        
        <h2 className='font-bold text-2xl text-center my-10'>Iniciar sesión</h2>

        <form 
        onSubmit={handleSubmit}
        className='bg-white  rounded-lg' >

          <div className='block text-yellow-500 font-black text-xl my-8'>
            <label htmlFor="usuario">Usuario</label>
            <input type="text" id="usuario" name="usuario" className="border-2 w-full p-2 mt-2 text-black rounded-md font-normal" value={formData.usuario} onChange={handleChange} />
          </div>

          <div className='block text-yellow-500 font-black text-xl my-8'>
            <label htmlFor="contraseña">Contraseña</label>
            <input type="password" id="contraseña" name="contraseña" className="border-2 w-full p-2 mt-2  text-black rounded-md" onChange={handleChange} value={formData.contraseña} />
          </div>

          <input type="submit" className="font-bold justify-center text-white bg-yellow-500 rounded-lg p-3 w-full cursor-pointer hover:bg-yellow-600" /> 

        </form>
      </div>
    </div>
  )
}
