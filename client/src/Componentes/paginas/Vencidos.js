import { Link, useHistory } from "react-router-dom";
import "./Lista.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as bsicon from "react-icons/bs"
import * as gicon from "react-icons/gi";
import Navbar from "../Componente SideNav/Navbar"

const Vencido = () => {
        const [product, setProduct] = useState([]);
        const fecha = new Date();
        const pages = 5;
        const [paginaActual, setPaginaActual] = useState(1);
        const [items, setItems] = useState([]);
        const [newLista, setNewLista] = useState([]);
        const vencidosList = product.filter(product =>(Math.round((new Date(product.vencimiento).getTime()-fecha.getTime())/ (1000 * 60 * 60 * 24))) < 8)
        const vencidos = vencidosList.length;
        const AcabadosList = product.filter(product => product.cantidad < 2); 
        const acabado = AcabadosList.length;
        const mercadoList = product.filter(product => product.cantidad === 0); 
        const mercado = mercadoList.length;
        const history = useHistory();
        

        const siguientePagina = () => {
            const totalItems = newLista.length;
            const nextpage = paginaActual + 1;
            const primerIndex = (nextpage - 1) * pages;
            if (primerIndex >= totalItems) return;
            setItems([...newLista].slice(primerIndex, (pages*nextpage)));
            setPaginaActual(nextpage)
        }
    
        const anteriorPagina = () => {
            const prevPage = paginaActual - 1;
            const primerIndex = (prevPage -1) * pages;
            if (prevPage <= 0) return;
            setItems([...newLista].slice(primerIndex, (pages*prevPage)));
            setPaginaActual(prevPage)
        }


        useEffect(() =>{
            axios.get("http://localhost:8000/api/products", {withCredentials: true})
            .then(res => {
                setProduct(res.data)
                const fecha = new Date();
                setItems(res.data.filter(product =>(Math.round((new Date(product.vencimiento).getTime()-fecha.getTime())/ (1000 * 60 * 60 * 24))) < 8).slice(0, pages));
                setNewLista(res.data.filter(product =>(Math.round((new Date(product.vencimiento).getTime()-fecha.getTime())/ (1000 * 60 * 60 * 24))) < 8))
            })
            .catch(err => 
                {
                    if(err.response.status === 401) {
                        history.push('/login');
                    }
            })
        }, [history])

        const BorrarProducto = id =>{
            axios.delete("http://localhost:8000/api/product/"+id)
            .then(res =>{
                let nuevLista = items.filter(product => product._id !== id);
                setItems(nuevLista);
            })
            .catch(err => console.log("Hay un error", err))
        }
        return (
            <div>
                <Navbar vencidos = {vencidos} acabados = {acabado} mercado = {mercado}></Navbar>
                <div className="lista">
                <h1><bsicon.BsCart4/> Proximos a Vencerse</h1>
                <div>
                {
                    newLista.length > 5 ? <div aria-label="Page navigation example" className="l">
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
                                <th className="text">Fecha Vencimiento</th>
                                <th className="text">Días para vencerse</th>
                                <th className="text">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((product, index) => (
                            <tr key={index}>
                                <td className="text">
                                    {
                                        product.enlatados ? <h1><gicon.GiCannedFish/> </h1> :null
                                    }
                                    {
                                        product.granos ? <h1><gicon.GiGrain/></h1> :null
                                    }
                                    {
                                        product.carnes ? <h1><gicon.GiMeat /></h1> :null
                                    }
                                    {
                                        product.lacteos ? <h1><gicon.GiMilkCarton/></h1> :null
                                    }
                                    {
                                        product.cereales ? <h1><gicon.GiGrainBundle /></h1> :null
                                    }
                                    {
                                        product.parva ? <h1><gicon.GiSlicedBread/></h1> :null
                                    }
                                    {
                                        product.aseo ? <h1><gicon.GiSoap/></h1> :null
                                    }
                                </td>
                                <td className="text"> {product.nombre}</td>
                                <td className="text"> {product.vencimiento}</td>
                                <td className="text"> {Math.round((new Date(product.vencimiento).getTime()-fecha.getTime())/ (1000 * 60 * 60 * 24))}</td>
                                <td className="text">
                                <Link to={`product/detalles/${product._id}`} className="btn btn-info t" >Detalles</Link>
                                        <Link to={`product/editar/${product._id}`} className="btn btn-success t" >Editar</Link>
                                        <button className="btn btn-danger t" onClick={e => BorrarProducto(product._id)} >Eliminar</button>
                                </td>
                            </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                        {
                            newLista.length > 5 ? <p>página: {paginaActual}</p> : null
                        }
                        
                    </tfoot>
                    </table>
                </div>
                <Link to="/" className="btn bt2">Página principal</Link>
            </div>
            </div>
            
        )
}

export default Vencido;