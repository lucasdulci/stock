import { useState, useEffect } from "react"
import { Error } from "./Error"
import { MagicMotion } from "react-magic-motion";

export const StockInput = ({ controlador, setControlador, cambiar, setCambiar }) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [fecha, setFecha] = useState('')
    const [color, setColor] = useState('')
    const [info, setInfo] = useState('')

    const [error, setError] = useState(false)

    useEffect(() => {
        if (Object.keys(cambiar).length > 0) {
            setNombre(cambiar.nombre)
            setCantidad(cambiar.cantidad)
            setFecha(cambiar.fecha)
            setColor(cambiar.color)
            setInfo(cambiar.info)

        }
    }, [cambiar])

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // validation

        if ([nombre, cantidad, fecha, color, info].includes('')) {
            setError(true)
            return
        }
        setError(false)


        const objetoStock = {
            nombre,
            cantidad,
            fecha,
            color,
            info
        }

        if (cambiar.id) {
            objetoStock.id = cambiar.id

            const controlActualizado = controlador.map(cambiarState => cambiarState.id === cambiar.id ? objetoStock : cambiarState)

            setControlador(controlActualizado)
            setCambiar({})
        } else {
            // nuevo registro
            objetoStock.id = generarId()
            setControlador([...controlador, objetoStock])

        }

        // restart form

        setNombre('')
        setCantidad('')
        setFecha('')
        setColor('')
        setInfo('')

    }

    return (
        <MagicMotion>
            <div className="md:w-1/2 lg:w-2/6 mx-4 md:mx-20  ">
                <h2 className='text-center text-3xl mb-3 dark:text-white uppercase font-black'>Añade y
                    <span className='text-yellow-500 uppercase font-black'> administra el stock</span>
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className='bg-slate-100 dark:bg-transparent  shadow-md rounded-lg ' >
                    {error && <Error><p>Todos los campos son obligatorios</p></Error>}
                    <div className="p-4">
                        <label className=" block text-yellow-500 uppercase font-black " htmlFor="producto">Producto</label>
                        <input className="border-2 w-full p-2 mt-2 uppercase  placeholder-gray-8400 rounded-md" type="text" name="producto" id="producto" placeholder="Producto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>

                    <div className="p-4" >
                        <label className="block text-yellow-500 uppercase font-black" htmlFor="cantidad">Cantidad</label>
                        <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="number" name="cantidad" id="cantidad" placeholder="1, 2, 3, etc" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    </div>

                    <div className="p-4" >
                        <label className="block text-yellow-500 uppercase font-black" htmlFor="fecha">Fecha</label>
                        <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" name="fecha" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </div>

                    <div className="p-4">

                        <select required className="w-full p-2 mt-2 rounded-md  placeholder-gray-400 border-2 uppercase"
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <option value="">Seleccionar color</option>
                            <option value="azul">Azul</option>
                            <option value="gris">Gris</option>
                            <option value="gris-claro">Gris Claro</option>
                            <option value="amarillo">Amarillo</option>

                        </select>
                    </div>

                    <div className="p-4" >
                        <label className=" text-yellow-500 uppercase font-black" htmlFor="informacion">Información adicional</label>
                        <textarea className="border-2 w-full p-2 placeholder-gray-400" id="informacion" value={info} onChange={(e) => setInfo(e.target.value)}></textarea>
                    </div>

                    <div className="p-4">

                        <input
                            type='submit'
                            className="bg-yellow-500 w-full p-3  text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer border-red-200 transition-colors rounded-md"
                            value={cambiar.id ? "editar producto" : "agregar producto"} />
                    </div>

                </form>
            </div>
        </MagicMotion>
    )
}
