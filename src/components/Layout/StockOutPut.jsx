import { useState } from "react";
import { Listado } from "./Listado"
import { MagicMotion } from "react-magic-motion";

export const StockOutPut = ({ controlador, handleChangeTheme, setCambiar, eliminarProducto }) => {
 

    const [filtroNombre, setFiltroNombre] = useState('');

    const handleChange = (e) => {
        setFiltroNombre(e.target.value);
    };

    const controladorFiltrado = controlador.filter((control) =>
        control.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );

    return (
        <div className='md:w-1/2 lg:w-3/5 md:h-screen md:overflow-y-scroll mx-4 '>
            <h2 className='font-black text-2xl  text-center uppercase mt-12 mb-3 md:mt-0 dark:text-white'>Listado de stock {''}
                <span className='text-yellow-500'>disponible</span>
            </h2>

            <div className="flex justify-center">
                <input
                    type="text"
                    value={filtroNombre}
                    onChange={handleChange}
                    placeholder="Filtrar por nombre..."
                    className="border-3 rounded-lg mt-10 w-96 p-2 uppercase text-center "
                />
            </div>

            <MagicMotion>

                {controladorFiltrado.length > 0 ? (
                    controladorFiltrado.map(control => (
                        <Listado
                            setCambiar={setCambiar}
                            handleChangeTheme={handleChangeTheme}
                            key={control.id}
                            control={control}
                            eliminarProducto={eliminarProducto} />

                    ))
                ) : (
                    <p className="text-center mt-20 font-bold text-2xl uppercase dark:text-white ">No se encontraron resultados</p>
                )}
            </MagicMotion>
        </div>


    )
}
