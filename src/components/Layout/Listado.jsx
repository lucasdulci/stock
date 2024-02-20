
export const Listado = ({ control, setCambiar, eliminarProducto  }) => {

    const {nombre, producto, cantidad, fecha, info, id} = control

    const handleEliminar = () => {
        const respuesta = confirm('¿Deseas eliminar este producto?')

        if(respuesta) { 
            eliminarProducto(id)
        }
    }

    return (

        <div className='mx-5 my-12 bg-white dark:bg-gray-500 shadow-md px-5 py-3 rounded-xl'>


            <p className='font-bold text-xl mb-2  dark:text-slate-200  text-gray-700 uppercase'>Producto: {''}
                <span className="font-normal uppercase ">{control.nombre}</span>
            </p>

            <p className='font-bold text-xl mb-2 dark:text-slate-200 text-gray-700 uppercase'>Cantidad: {''}
                <span className="font-normal uppercase " >{control.cantidad}</span>
            </p>

            <p className='font-bold text-xl mb-3 text-gray-700  dark:text-slate-200 uppercase'>Fecha: {''}
                <span className="font-normal uppercase ">{control.fecha}</span>
            </p>

            <p className='font-bold text-xl mb-3 text-gray-700  dark:text-slate-200 uppercase'>Color: {''}
                <span className="font-normal uppercase ">{control.color}</span>
            </p>

            <p className='font-bold text-xl  text-gray-700  dark:text-slate-200 uppercase'>Información: {''}
                <span className="font-normal uppercase">{control.info}</span>
            </p>

            <div className="flex justify-between mt-10">
                <button className='py-2 px-10 bg-yellow-500  hover:bg-yellow-600 text-white font-bold uppercase rounded-lg'
                    type="button"
                    onClick={() => setCambiar(control)}>
                    Editar
                    
                </button>

                <button className="py-2 px-10 bg-yellow-500 hover:bg-yellow-600 text-white font-bold uppercase rounded-lg"
                    type="button"
                    onClick={handleEliminar}>
                    Eliminar
                </button>
            </div>

        </div>

    )
}
