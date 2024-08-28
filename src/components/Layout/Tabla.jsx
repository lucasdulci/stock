import { useState, useRef, useEffect } from 'react';
import { deleteDoc, doc, onSnapshot,collection, updateDoc } from 'firebase/firestore';
import db from '../../db/db'; // Importa tu instancia de Firestore

export const Tabla = ({productos,setProductos, setCambiar,productosFiltrados , eliminarProducto,minimoStock,  getStockColorClass }) => {
    const [ordenAscendente, setOrdenAscendente] = useState(true);
    // const [productos, setProductos] = useState([]);
    const inputRef = useRef(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

    const funcionesBoton = async (control) => {
        setCambiar(control);
        scrollToTop();
        if (inputRef.current) {
            inputRef.current.focus();
        }
        try {
            await updateDoc(doc(db, 'productos', control.id), {
                nombre: control.nombre,
                fecha: control.fecha,
                cantidad: control.cantidad,
                minimoStock: control.minimoStock
            });
            // setProductos(prevProductos => prevProductos.map(producto => {
            //     if (producto.id === control.id) {
            //         return {
            //             ...producto,
            //             nombre: control.nombre,
            //             fecha: control.fecha,
            //             cantidad: control.cantidad,
            //             minimoStock: control.minimoStock
            //         };
            //     }
            //     return producto;
            // }))
            console.log('Producto actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    const handleFiltrarColor = () => {
        setOrdenAscendente(!ordenAscendente);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'productos'), (snapshot) => {
            setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const sortedProductos = productos.sort((a, b) => {
        const colorA = getStockColorClass(a.cantidad, a.minimoStock);
        const colorB = getStockColorClass(b.cantidad, b.minimoStock);
        return ordenAscendente ? colorA.localeCompare(colorB) : colorB.localeCompare(colorA);
    });

    return (
        <div className='w-full border-b  mt-10 mb-20'>
            <div className='grid grid-cols-5 bg-gray-400  bg-opacity-50'>
                <div className=' border-r col-span-1 font-bold uppercase p-1'>Producto</div>
                <div className='border-r col-span-1 p-1 font-bold uppercase'>Fecha</div>
                <div className='border-r col-span-1 p-1 font-bold uppercase'>Stock</div>
                <div className='border-r col-span-1 font-bold uppercase' onClick={handleFiltrarColor}>
                    <button className="uppercase  w-full p-1 text-start hover:bg-slate-300">Mínimo de stock</button>
                </div>
                <div className='col-span-1 font-bold uppercase p-1'>Acciones</div>
            </div>
            {productosFiltrados.length === 0 ? (
                        <p className="text-center mt-20 pb-16 font-bold text-2xl uppercase dark:text-white">No se encontraron resultados</p>
                    ) : (
            sortedProductos.map(producto => (
                <div key={producto.id} className='grid grid-cols-5 border-b font-bold text-gray-600 dark:text-white'>
                    <div className="uppercase p-1 col-span-1">{producto.nombre}</div>
                    <div className="uppercase  p-1 col-span-1">{producto.fecha}</div>
                    <div className={`uppercase p-1 col-span-1`}>{producto.cantidad}</div>
                    <div className={`uppercase p-1 col-span-1 ${getStockColorClass(producto.cantidad, producto.minimoStock)}`}>
                        {producto.minimoStock}
                    </div>
                    <div className="uppercase col-span-1 flex justify-center gap-4 items-center m-1">
                        <button onClick={() => funcionesBoton(producto)} className="p-2 px-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold alquilerrounded-lg ">Editar</button>
                        <button onClick={() => handleEliminar(producto.id)} className="p-2  bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg">Eliminar</button>
                    </div>
                </div>
            )))}
        </div>
    );
};
