import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as gicon from "react-icons/gi";
import * as FaIcons from 'react-icons/fa'
import { Toaster, toast } from 'react-hot-toast';
import "./Lista.css"
import Navbar from "../Componente SideNav/Navbar"
const Mercado = () => {
    const [product, setProduct] = useState([]);
    const pages = 5
    const [paginaActual, setPaginaActual] = useState(1)
    const [items, setItems] = useState([])
    const [moneda, setMoneda] = useState("")
    var suma = 0;
    const filter = product.filter(product => product.cantidad === 0);
    const fecha = new Date();
    const vencidosList = product.filter(product =>(Math.round((new Date(product.vencimiento).getTime()-fecha.getTime())/ (1000 * 60 * 60 * 24))) < 8)
    const vencidos = vencidosList.length;
    const AcabadosList = product.filter(product => product.cantidad < 2); 
    const acab = AcabadosList.length;
    const mercadoList = product.filter(product => product.cantidad === 0); 
    const mercado = mercadoList.length;

    const siguientePagina = () => {
        const totalItems = product.length;
        const nextpage = paginaActual + 1;
        const primerIndex = (nextpage - 1) * pages;
        if (primerIndex >= totalItems) return;
        setItems([...product].slice(primerIndex, (pages * nextpage)));
        setPaginaActual(nextpage)
    }

    const anteriorPagina = () => {
        const prevPage = paginaActual - 1;
        const primerIndex = (prevPage - 1) * pages;
        if (prevPage <= 0) return;
        setItems([...product].slice(primerIndex, (pages * prevPage)));
        setPaginaActual(prevPage)
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/products", {withCredentials: true})
            .then(res => {
                setProduct(res.data)
                setMoneda(res.data.moneda)
                setItems(res.data.slice(0, pages))
            })
            .catch(err => console.log("Error", err))

    }, [])

    const BorrarProducto = id => {
        axios.delete("http://localhost:8000/api/product/" + id, {withCredentials: true})
            .then(res => {
                let nuevLista = product.filter(product => product._id !== id);
                setProduct(nuevLista);
                toast.success("Producto Eliminado", {
                    style: {
                        borderRadius: '10px',
                        background: '#fff',
                        color: '#333'
                    }
                });
            })
            .catch(err => console.log("Hay un error", err))
    }
    return (
        <div>
            <Navbar vencidos = {vencidos} acabados = {acab} mercado = {mercado}></Navbar>
            <div className="lista">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <h1><FaIcons.FaClipboardList /> Lista de mercado</h1>
            <div>
            {
                    filter.length > 5 ? <div aria-label="Page navigation example" className="l">
                <ul class="pagination">
                    <li class="page-item"><button class="btn  te" onClick={anteriorPagina}><span aria-hidden="true">&laquo;</span></button></li>
                    <li class="page-item"><button class="btn  te" onClick={siguientePagina}><span aria-hidden="true">&raquo;</span></button></li>
                </ul>
            </div> : null
                }
                <table className="table table-dark table-striped table-hover table-borderless table-sm  align-middle">
                    <thead>
                    </thead>
                    <tbody>
                        {
                            filter.map((product, index) => {
                                return <tr key={index}>
                                    <td className="text">
                                        {
                                            product.enlatados ? <h1><gicon.GiCannedFish style={{ fontSize: "60px" }} /> </h1> : null
                                        }
                                        {
                                            product.granos ? <h1><gicon.GiGrain style={{ fontSize: "60px" }} /></h1> : null
                                        }
                                        {
                                            product.carnes ? <h1><gicon.GiMeat style={{ fontSize: "60px" }} /></h1> : null
                                        }
                                        {
                                            product.lacteos ? <h1><gicon.GiMilkCarton style={{ fontSize: "60px" }} /></h1> : null
                                        }
                                        {
                                            product.cereales ? <h1><gicon.GiGrainBundle style={{ fontSize: "60px" }} /></h1> : null
                                        }
                                        {
                                            product.parva ? <h1><gicon.GiSlicedBread style={{ fontSize: "60px" }} /></h1> : null
                                        }
                                        {
                                            product.aseo ? <h1><gicon.GiSoap style={{ fontSize: "60px" }} /></h1> : null
                                        }
                                    </td>
                                    <td className="text"> {product.nombre}</td>
                                    <td className="text">
                                    <Link to={`product/editar/${product._id}`} className="btn btn-success" >Agregar Producto</Link>
                                    </td>
                                    <td className="text">
                                        <button className="btn btn-danger " onClick={e => BorrarProducto(product._id)} >Eliminar</button>
                                    </td>
                                    </tr>
                            })
                        }
                        </tbody>
                    <tfoot>
                    {
                            filter.length > 5 ? <p>página: {paginaActual}</p> : null
                        }
                    </tfoot>
                </table>
                {
                        filter.map((product, index) => {
                            suma = suma + parseInt(product.precio)
                            return null
                        })
                    }
                    <hr className="border border-light border-2 opacity-50"/>
                    <div className="d-flex flex-row justify-content-between mb-3">
                        <div className="p-2">
                            <h5>Total:</h5>
                        </div>
                        <div className="p-2">
                            <h5>{moneda} {suma}</h5>
                        </div>
                    </div>
                    
            </div>

        </div>
        </div>
        
    )
}

export default Mercado;