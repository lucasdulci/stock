import { useEffect, useState } from "react";
import { MagicMotion } from "react-magic-motion";
import { Tabla } from "./Tabla";
import { getDocs, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import db from "../../db/db";

export const StockOutPut = ({ handleChangeTheme, setCambiar, eliminarProducto, minimoStock, getStockColorClass }) => {
    const [filtroNombre, setFiltroNombre] = useState("");
    const [mostrarTabla, setMostrarTabla] = useState(window.innerWidth > 768);
    const [filtrando, setFiltrando] = useState(false);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            const querySnapshot = await getDocs(collection(db, "productos"));
            const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProductos(datos);
        };

        obtenerProductos();

        const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
            setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleEliminar = async (id) => {
        const confirmacion = window.confirm("¿Desea eliminar el producto?");
        if (confirmacion) {
            try {
                await deleteDoc(doc(db, 'productos', id));
                console.log('Producto eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        }
    };
    const handleChange = (e) => {
        setFiltroNombre(e.target.value);
        setFiltrando(true);
    };

    const handleResize = () => {
        setMostrarTabla(window.innerWidth > 768);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={`md:w-1/2 lg:w-full lg:h-full md:pl-1 sticky top-0 ${mostrarTabla ? "md:w-1/2 lg:w-full" : ""}`}>
            <h2 className="font-black text-2xl text-center uppercase mt-20 mb-3 md:mt-10 dark:text-white">
                Listado de stock <span className="text-yellow-500">disponible</span>
            </h2>
            <div className="flex justify-center">
                <input
                    type="text"
                    value={filtroNombre}
                    onChange={handleChange}
                    placeholder="Filtrar por nombre del producto..."
                    className="border-3 mt-10 w-96 p-2 bg-transparent uppercase placeholder:text-center text-black dark:text-white border-b-2 dark:border-white border-black"
                />
            </div>
            {mostrarTabla ? (
                <Tabla
                    productos={productos}
                    setCambiar={setCambiar}
                    eliminarProducto={eliminarProducto}
                    minimoStock={minimoStock}
                    getStockColorClass={getStockColorClass}
                />
            ) : (
                <MagicMotion>
                    {filtrando && productos.length === 0 ? (
                        <p className="text-center mt-20 pb-16 font-bold text-2xl uppercase dark:text-white">No se encontraron resultados</p>
                    ) : (
                        productos.map((producto) => (
                            <div key={producto.id} className='mx-5 mt-8 bg-white bg-opacity-20 dark:bg-slate-700 dark:bg-opacity-25 shadow-md px-10 py-4 rounded-xl'>
                                <p className='font-bold text-lg md:text-xl mb-1 dark:text-slate-200 text-gray-700 uppercase'>Producto: {''}
                                    <span className="font-normal uppercase">{producto.nombre}</span>
                                </p>
                                <p className='font-bold text-lg md:text-xl mb-1 dark:text-slate-200 text-gray-700 uppercase'>Cantidad: {''}
                                    <span className='font-normal uppercase'>{producto.cantidad}</span>
                                </p>
                                <p className='font-bold text-lg md:text-xl mb-1 text-gray-700 dark:text-slate-200 uppercase'>Fecha: {''}
                                    <span className="font-normal uppercase">{producto.fecha}</span>
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between mt-2 md:mt-5 space-y-3 sm:space-y-0 sm:space-x-3">
                                    <button onClick={() => setCambiar(producto)} className="p-2 px-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded-lg ">Editar</button>
                                    <button onClick={() => handleEliminar(producto.id)} className="p-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg">Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </MagicMotion>
            )}
        </div>
    );
};
