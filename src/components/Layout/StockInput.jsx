import { useEffect, useState,useRef } from "react";
import { MagicMotion } from "react-magic-motion";
import { Error } from "./Error";
import db from "../../db/db"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export const StockInput = ({ controlador, setControlador, cambiar, setCambiar }) => {
    const inputRef = useRef(null);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [minimoStock, setMinimoStock] = useState('');
    const [error, setError] = useState(false);
    const [activo, setActivo] = useState(false);

    useEffect(() => {
        if (Object.keys(cambiar).length > 0) {
            setNombre(cambiar.nombre);
            setCantidad(cambiar.cantidad);
            setFecha(cambiar.fecha);
            setMinimoStock(cambiar.minimoStock);
            setActivo(true);
        }
    }, [cambiar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([nombre, cantidad, fecha, minimoStock].includes('')) {
            setError(true);
            return;
        }

        setError(false);

        const objetoStock = { nombre, cantidad, fecha, minimoStock };

        try {
            if (cambiar.id) {
                await updateDoc(doc(db, 'productos', cambiar.id), objetoStock);

                const controlActualizado = controlador.map((prod) =>
                    prod.id === cambiar.id ? { ...prod, ...objetoStock } : prod
                );
                setControlador(controlActualizado);
                setCambiar({});
            } else {
                const docRef = await addDoc(collection(db, "productos"), objetoStock);
                objetoStock.id = docRef.id;
                setControlador([...controlador, objetoStock]);
            }

            setNombre('');
            setCantidad('');
            setFecha(new Date().toISOString().slice(0, 10));
            setMinimoStock('');
            setActivo(false);
        } catch (error) {
            console.error("Error al agregar o actualizar el producto:", error);
        }
    };

    const toggleActivo = () => {
        setActivo(!activo);
    };

    const handleDate = (e) => {
        setFecha(e.target.value);
    };

    return (
        <div ref={inputRef}>
            <div className="w-full flex p-1 ">
                <button className="bg-yellow-500 text-white uppercase font-bold text-sm hover:bg-indigo-700 cursor-pointer border-red-200 transition-colors rounded-md p-3" onClick={toggleActivo}>{activo ? 'Cancelar' : 'Añadir Producto'}</button>
            </div>

            <MagicMotion >
                <div className="flex justify-center items-center ">
                    <div className={`flex lg:-m-5 flex-col justify-center h-screen lg:w-2/6 mt-20 mx-4 md:mx-12 ${activo ? '' : 'hidden'}`}>
                        <h2 className=' flex flex-col text-center text-3xl mb-3 dark:text-white uppercase font-black'>Añade y
                            <span className='text-yellow-500 uppercase font-black'> administra el stock</span>
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className=' bg-slate-100 bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-25 shadow-lg mb-4 rounded-lg '>
                            {error && <Error><p>Todos los campos son obligatorios. El stock debe ser mayor o igual al mínimo.</p></Error>}
                            <div className="p-4">
                                <label className=" block text-yellow-500 uppercase font-black " htmlFor="producto">Producto</label>
                                <input className="border-2 w-full p-2 mt-2 uppercase  placeholder-gray-400 rounded-md" type="text" name="producto" id="producto" placeholder="Producto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="p-4" >
                                <label className="block text-yellow-500 uppercase font-black" htmlFor="cantidad">Cantidad</label>
                                <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" name="cantidad" id="cantidad" placeholder="1, 2, 3, etc" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                            </div>
                            <div className="p-4" >
                                <label className="block text-yellow-500 uppercase font-black" htmlFor="fecha">Fecha</label>
                                <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" name="fecha" id="fecha" value={fecha} onChange={handleDate} />
                            </div>
                            <div className="p-4" >
                                <label className=" text-yellow-500 uppercase font-black" htmlFor="informacion">Mínimo de stock</label>
                                <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" name="minimoStock" id="minimoStock" value={minimoStock} onChange={(e) => setMinimoStock(e.target.value)} />
                            </div>
                            <div className="p-4">
                                <input
                                    type='submit'
                                    className="bg-yellow-500 w-full p-3  text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer border-red-200 transition-colors rounded-md"
                                    value={cambiar.id ? "editar producto" : "agregar producto"} />
                            </div>
                        </form>
                    </div>
                </div>
            </MagicMotion>
        </div>
    );
};
