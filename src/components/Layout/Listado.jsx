
export const Listado = ({ control, setCambiar, eliminarProducto  }) => {

    const {nombre, producto, cantidad, fecha, info, id} = control

    const handleEliminar = () => {
        const respuesta = confirm('¿Deseas eliminar este producto?')

        if(respuesta) { 
            eliminarProducto(id)
        }
    }

    return (

        <div className='mx-5 mt-8 bg-white bg-opacity-20 dark:bg-slate-700 dark:bg-opacity-25 shadow-md px-10 py-4 rounded-xl'>


            <p className='font-bold text-xl mb-1  dark:text-slate-200  text-gray-700 uppercase'>Producto: {''}
                <span className="font-normal uppercase ">{control.nombre}</span>
            </p>

            <p className='font-bold text-xl mb-1 dark:text-slate-200 text-gray-700 uppercase'>Cantidad: {''}
                <span className="font-normal uppercase " >{control.cantidad}</span>
            </p>

            <p className='font-bold text-xl mb-1 text-gray-700  dark:text-slate-200 uppercase'>Fecha: {''}
                <span className="font-normal uppercase ">{control.fecha}</span>
            </p>

            
            <p className='font-bold text-xl mb-1  text-gray-700  dark:text-slate-200 uppercase'>Información: {''}
                <span className="font-normal uppercase">{control.info}</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-between mt-2 md:mt-5 space-y-3 sm:space-y-0 sm:space-x-3">
                <button className='py-3 px-10 bg-yellow-500  hover:bg-yellow-600 text-white font-bold uppercase rounded-lg '
                    type="button"
                    onClick={() => setCambiar(control)}>
                    Editar
                    
                </button>

                <button className=" py-3 px-10 bg-red-500 hover:bg-red-600 text-white font-bold uppercase rounded-lg"
                    type="button"
                    onClick={handleEliminar}>
                    Eliminar
                </button>
            </div>

        </div>

    )
}