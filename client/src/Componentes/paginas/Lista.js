import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as bsicon from "react-icons/bs"
import * as gicon from "react-icons/gi";
import { Toaster, toast } from 'react-hot-toast';
import Navbar from "../Componente SideNav/Navbar"

import "./Lista.css"
const Lista = () => {
    const [product, setProduct] = useState([]);
    const fecha = new Date();
    const pages = 5
    const [paginaActual, setPaginaActual] = useState(1)
    const [items, setItems] = useState([])
    const vencidosList = product.filter(product =>(Math.round((new Date(product.vencimiento).getTime()-fecha.getTime())/ (1000 * 60 * 60 * 24))) < 8)
    const vencidos = vencidosList.length;
    const AcabadosList = product.filter(product => product.cantidad < 2); 
    const acabado = AcabadosList.length;
    const mercadoList = product.filter(product => product.cantidad === 0); 
    const mercado = mercadoList.length;
    const history = useHistory()

    const siguientePagina = () => {
        const totalItems = product.length;
        const nextpage = paginaActual + 1;
        const primerIndex = (nextpage - 1) * pages;
        if (primerIndex >= totalItems) return;
        setItems([...product].slice(primerIndex, (pages*nextpage)));
        setPaginaActual(nextpage)
    }

    const anteriorPagina = () => {
        const prevPage = paginaActual - 1;
        const primerIndex = (prevPage -1) * pages;
        if (prevPage <= 0) return;
        setItems([...product].slice(primerIndex, (pages*prevPage)));
        setPaginaActual(prevPage)
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/products", {withCredentials: true})
            .then(res => {
                setProduct(res.data)
                setItems(res.data.slice(0, pages))
            })
            .catch(err => 
                {
                    if(err.response.status === 401) {
                        history.push('/login');
                    }
            })
    }, [history])

    const BorrarProducto = id => {
        axios.delete("http://localhost:8000/api/product/" + id, {withCredentials: true})
            .then(res => {
                let nuevLista = items.filter(product => product._id !== id);
                setItems(nuevLista);
                toast.success("Producto Eliminado",{style: {
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#333'}});
            })
            .catch(err => console.log("Hay un error", err))
    }
    return (
        <div>
            <Navbar vencidos = {vencidos} acabados = {acabado} mercado ={mercado}></Navbar>
            <div className="lista">
            <h1><bsicon.BsCart4 /> Mis Productos</h1>
            <Link to="/" className="btn btp1 btpVerde">Todos</Link>
            <Link to="/enlatados" className="btn btp btpRojo">Enlatados</Link>
            <Link to="/granos" className="btn  btp btpAzul">Granos</Link>
            <Link to="/carnes" className="btn  btp btpCafe">Carnes frias</Link>
            <Link to="/lacteos" className="btn  btp btpPiel">Lacteos</Link>
            <Link to="/cereales" className="btn  btp btpGris">Cereales</Link>
            <Link to="/parva" className="btn  btp btpVerde">Parva</Link>
            <Link to="/aseo" className="btn  btp btpRojo">Aseo personal y del hogar</Link>
            <div>
            {
                    product.length > 5 ? <div aria-label="Page navigation example" className="l">
                <ul class="pagination">
                    <li class="page-item"><button class="btn  te" onClick={anteriorPagina}><span aria-hidden="true">&laquo;</span></button></li>
                    <li class="page-item"><button class="btn  te" onClick={siguientePagina}><span aria-hidden="true">&raquo;</span></button></li>
                </ul>
            </div> : null
                }
                <table className="table table-dark table-striped table-hover table-borderless table-sm  align-middle">
                    <thead>
                        <tr>
                            <th className="text">Icono</th>
                            <th className="text">Nombre</th>
                            <th className="text">Cantidad</th>
                            <th className="text">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((product, index) => {
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
                                    <td className="text"> {product.cantidad}</td>
                                    <td className="text">
                                        <Link to={`product/detalles/${product._id}`} className="btn btn-info t" >Detalles</Link>
                                        <Link to={`product/editar/${product._id}`} className="btn btn-success t" >Editar</Link>
                                        <button className="btn btn-danger t" onClick={e => BorrarProducto(product._id)} >Eliminar</button>
                                    </td>
                                </tr>
                                })
                        }
                    </tbody>
                    <tfoot>
                        {
                            product.length > 5 ? <p>página: {paginaActual}</p> : null
                        }
                        
                    </tfoot>
                </table>
            </div>
            
        </div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        </div>
        
    )
}

export default Lista;