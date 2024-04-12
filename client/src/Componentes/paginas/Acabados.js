import { Link, useHistory } from "react-router-dom";
import "./Lista.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as gicon from "react-icons/gi";
import * as ioicon from "react-icons/io";
import Navbar from "../Componente SideNav/Navbar"
const Acabados = () => {
        const [product, setProduct] = useState([]);
        const fecha = new Date();
        const vencidosList = product.filter(product =>(Math.round((new Date(product.vencimiento).getTime()-fecha.getTime())/ (1000 * 60 * 60 * 24))) < 8)
        const vencidos = vencidosList.length;
        const AcabadosList = product.filter(product => product.cantidad < 2); 
        const acab = AcabadosList.length;
        const mercadoList = product.filter(product => product.cantidad === 0); 
        const mercado = mercadoList.length;
        const history = useHistory();


        useEffect(() =>{
            axios.get("http://localhost:8000/api/products", {withCredentials: true})
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => 
                {
                    if(err.response.status === 401) {
                        history.push('/login');
                    }
            })
        }, [history])
    
        const filter = product.filter(product => product.cantidad < 2); 
        const acabado = filter.length;

        const BorrarProducto = id =>{
            axios.delete("http://localhost:8000/api/product/"+id, {withCredentials: true})
            .then(res =>{
                let nuevLista = product.filter(product => product._id !== id);
                setProduct(nuevLista);
            })
            .catch(err => console.log("Hay un error", err))
        }
        return (
            <div>
                <Navbar vencidos = {vencidos} acabados = {acab} mercado = {mercado}></Navbar>
                <div className="lista">
                <h1><ioicon.IoMdWarning /> Proximos a acabarse</h1>
                <div>
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
                                filter.map((product, index) => (
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
                                <td className="text"> {product.cantidad}</td>
                                <td className="text">
                                <Link to={`product/detalles/${product._id}`} className="btn btn-info t" >Detalles</Link>
                                        <Link to={`product/editar/${product._id}`} className="btn btn-success t" >Editar</Link>
                                        <button className="btn btn-danger t" onClick={e => BorrarProducto(product._id)} >Eliminar</button>
                                </td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <Link to="/" className="btn bt2">Página principal</Link>
            </div>
            </div>
            
        )
}

export default Acabados;