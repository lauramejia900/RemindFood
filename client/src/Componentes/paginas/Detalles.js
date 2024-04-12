import React,{useEffect, useState} from "react";
import axios from "axios";
import  {useParams, Link} from "react-router-dom";
import * as gicon from "react-icons/gi";
import * as hicon2 from "react-icons/hi2";
import Navbar from "../Componente SideNav/Navbar"

const Detalles = () =>{
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [moneda, setMoneda] = useState("")
    const [vencimiento, setvencimiento] = useState("")
    const [precio, setPrecio] = useState("")
    const [clasificacion, setClasificacion] = useState("")

    const [product, setProduct] = useState([])
    const {id} = useParams(); 

    useEffect(() =>{
        axios.get("http://localhost:8000/api/product/"+id, {withCredentials: true})
        .then(res => {
            setNombre(res.data.nombre);
            setCantidad(res.data.cantidad);
            setvencimiento(res.data.vencimiento);
            setMoneda(res.data.moneda);
            setPrecio(res.data.precio);
            setClasificacion(res.data.clasificacion);
            setProduct(res.data)
        })
        .catch(err => console.log("Error", err))
    }, [id])



return(
    <div>
        <Navbar></Navbar>
        <div className="lista">
        <h1><hicon2.HiOutlineMagnifyingGlassPlus/> Detalles del producto</h1>
        <div className="detalle">
            <div class="d-flex flex-row lis">
            <div class="p-2">
                {
                    clasificacion === "enlatados" ?
                <div className="cuadro" style={{width: "340px", height:"320px"}}>
                    <h1><gicon.GiCannedFish style={{fontSize: "310px", color: "white"}}/></h1> 
                </div> : null
                }
                {
                    clasificacion === "granos" ?
                <div className="cuadro" style={{width: "340px", height:"320px"}}>
                    <h1><gicon.GiGrain style={{fontSize: "310px", color: "white"}}/></h1> 
                </div> : null
                }
                {
                    clasificacion === "carnes" ?
                <div className="cuadro" style={{width: "340px", height:"320px"}}>
                    <h1><gicon.GiMeat style={{fontSize: "310px", color: "white"}}/></h1> 
                </div> : null
                }
                {
                    clasificacion === "lacteos" ?
                <div className="cuadro" style={{width: "340px", height:"320px"}}>
                    <h1><gicon.GiMilkCarton style={{fontSize: "310px", color: "white"}}/></h1> 
                </div> : null
                }
                {
                    clasificacion === "cereales" ?
                <div className="cuadro" style={{width: "340px", height:"320px"}}>
                    <h1><gicon.GiGrainBundle style={{fontSize: "310px", color: "white"}}/></h1> 
                </div> : null
                }
                {
                    clasificacion === "parva" ?
                <div className="cuadro" style={{width: "340px", height:"320px"}}>
                    <h1><gicon.GiSlicedBread  style={{fontSize: "310px", color: "white"}}/></h1> 
                </div> : null
                }
                {
                    clasificacion === "aseo" ?
                <div className="cuadro" style={{width: "340px", height:"320px"}}>
                    <h1><gicon.GiSoap style={{fontSize: "310px", color: "white"}}/></h1> 
                </div> : null
                }
                
                </div>
                <div>
                    <div style={{width: "450px", height:"350px"}}>
                            <h1 className="co">{nombre}</h1>
                            <h5 class="card-text"><span >Fecha de vencimiento:</span> {new Date(vencimiento).toDateString(('en-us', { year:"numeric", month:"short", day:"numeric"}))}</h5>
                            <h5 class="card-text"><span >precio:</span> {moneda} {precio}</h5>
                            <h5 class="card-text"><span >Cantidad:</span> {cantidad}</h5>
                            <h5 class="card-text "><span >clasificacion:</span> {clasificacion}</h5>
                    </div>
                </div>
                </div>
        </div>
        <Link to="/" class="btn bt te t">Página principal</Link>
    </div>
    </div>
    
)

}

export default Detalles;