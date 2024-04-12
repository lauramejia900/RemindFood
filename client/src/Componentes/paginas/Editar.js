import React,{useEffect, useState} from "react";
import axios from "axios";
import  {Link, useHistory, useParams} from "react-router-dom";
import * as bsicon from "react-icons/bs"
import * as gicon from "react-icons/gi";
import * as ricon from "react-icons/ri";
import * as mdicon from "react-icons/md";
import toast from "react-hot-toast";
import Navbar from "../Componente SideNav/Navbar"

const Editar = () =>{
    const[product, setProduct] = useState([])
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [vencimiento, setvencimiento] = useState("")
    const [moneda, setMoneda] = useState("")
    const [precio, setPrecio] = useState("")
    const [clasificacion, setClasificacion] = useState("")
    const [enlatados, setEnlatados] = useState()
    const [granos, setGranos] = useState()
    const [carnes, setCarnes] = useState()
    const [lacteos, setLacteos] = useState()
    const [cereales, setCereales] = useState()
    const [parva, setParva] = useState()
    const [aseo, setAseo] = useState()
    const [errors, setErrors] = useState({})
    const {id} = useParams(); 
    const history = useHistory();
    

    useEffect(() =>{
        axios.get("http://localhost:8000/api/product/"+id,{withCredentials: true})
        .then(res => {
            setProduct(res.data)
            setNombre(res.data.nombre);
            setCantidad(res.data.cantidad);
            setvencimiento(res.data.vencimiento);
            setMoneda(res.data.moneda)
            setPrecio(res.data.precio);
            setClasificacion(res.data.clasificacion);
            setEnlatados(res.data.enlatados);
            setGranos(res.data.granos);
            setCarnes(res.data.carnes);
            setLacteos(res.data.lacteos);
            setCereales(res.data.cereales);
            setParva(res.data.parva);
            setAseo(res.data.aseo)
        })
        .catch(err => console.log("Error", err))
    }, [id])

    const guardar = e =>{
        e.preventDefault();
        axios.put("http://localhost:8000/api/product/"+id,{
            nombre,
            cantidad, 
            vencimiento,
            precio,
            clasificacion,
            enlatados,
            granos,
            carnes,
            lacteos,
            cereales,
            parva,
            aseo
})
.then(res => history.push({pathname: "/", state:{detail: toast.success("Producto actualizado")}}))
    }
return(
    <div>
        <Navbar></Navbar>
        <div className="nuevo">
        <h1><mdicon.MdOutlineEditNote style={{fontSize: "60px"}}/> Editar el producto</h1>
        <form onSubmit={guardar}>
                <div class="mb-3">
                    <label for="producto" class="form-label"><mdicon.MdAddShoppingCart style={{fontSize: "25px"}}/> Nombre del producto: </label>
                    <input type="text" class="form-control" id="producto"  value={nombre}  onChange={e => setNombre(e.target.value)}/>
                </div>
                {
                    errors.nombre ? <span className="text-danger">{errors.nombre.message}</span> : null
                }
                <div class="mb-3">
                    <label for="cantidad" class="form-label"><ricon.RiNumbersLine style={{fontSize: "25px"}} />  Cantidad: </label>
                    <input type="number" class="form-control" id="cantidad" value={cantidad} onChange={e => setCantidad(e.target.value)}/>
                </div>
                {
                    errors.cantidad ? <span className="text-danger">{errors.cantidad.message}</span> : null
                }
                <div class="mb-3">
                    <label for="vencimiento" class="form-label"> <bsicon.BsCalendar2Date style={{fontSize: "25px"}}/> vencimiento de vencimiento: </label>
                    <input type="date" class="form-control" id="vencimiento"  value={vencimiento} onChange={e => setvencimiento(e.target.value)} />
                </div>
                {
                    errors.vencimiento ? <span className="text-danger">{errors.vencimiento.message}</span> : null
                }
                <div class="mb-3">
                    <label for="moneda" class="form-label"><gicon.GiTakeMyMoney style={{fontSize: "25px"}}/> Tipo de moneda: </label>
                    <select class="form-select form-select-lg" name="moneda" id="moneda"  value={moneda} onChange={e => setMoneda(e.target.value)}>
                        <option selected value="">seleccione uno </option>
                        <option value="COL$">Peso colombiano</option>
                        <option value="MEX$">Peso mexicano</option>
                        <option value="$">Dolar</option>
                        <option value="€">Euro</option>
                    </select>
                    {
                    errors.moneda ? <span className="text-danger">{errors.moneda.message}</span> : null
                    }
                    </div>
                <div class="mb-3">
                    <label for="precio" class="form-label"> <gicon.GiPriceTag style={{fontSize: "25px"}}/> Precio del producto: </label>
                    <input type="number" class="form-control" id="precio"  value={precio} onChange={e => setPrecio(e.target.value)} />
                    <div id="precio" class="form-text">Sin puntos ni comas</div>
                </div>
                {
                    errors.precio ? <span className="text-danger">{errors.precio.message}</span> : null
                }
                <div class="mb-3">
                    <label for="clasificacion" class="form-label"><bsicon.BsListTask style={{fontSize: "25px"}}/> Clasificación </label>
                    <select class="form-select form-select-lg" name="clasificacion" id="clasificacion"  value={clasificacion} onChange={e => setClasificacion(e.target.value)}>
                        <option selected value="">seleccione uno </option>
                        <option value="enlatados"><gicon.GiCannedFish />Enlatados</option>
                        <option value="granos"><gicon.GiGrain />Granos</option>
                        <option value="carnes"><gicon.GiMeat />Carnes frias</option>
                        <option value="lacteos"><gicon.GiMilkCarton />Lacteos</option>
                        <option value="cereales"><gicon.GiGrainBundle />Cereales</option>
                        <option value="parva"><gicon.GiSlicedBread />Parva</option>
                        <option value="aseo"><gicon.GiSoap />Aseo personal y del hogar</option>
                    </select>
                    {
                    errors.clasificacion ? <span className="text-danger">{errors.clasificacion.message}</span> : null
                    }
                    </div>
                    <div class="mb-3">
                    <label for="icon" class="form-label"><mdicon.MdOutlineAttachFile style={{fontSize: "25px"}}/> Icono: </label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="enlatados" checked={enlatados}  onChange={e => setEnlatados(e.target.checked)}/>
                            <label class="form-check-label" for="enlatados">
                            <gicon.GiCannedFish style={{fontSize: "40px"}}/> Enlatados
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  checked={granos}  onChange={e => setGranos(e.target.checked)}id="granos" />
                            <label class="form-check-label" for="granos">
                            <gicon.GiGrain style={{fontSize: "40px"}} /> Granos
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  checked={carnes} onChange={e => setCarnes(e.target.checked)} id="carnes" />
                            <label class="form-check-label" for="carnes">
                            <gicon.GiMeat style={{fontSize: "40px"}} /> Carnes frias
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  checked={lacteos}  onChange={e => setLacteos(e.target.checked)} id="lacteos" />
                            <label class="form-check-label" for="lacteos">
                            <gicon.GiMilkCarton style={{fontSize: "40px"}}/> Lacteos
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  checked={cereales}  onChange={e => setCereales(e.target.checked)} id="cereales" />
                            <label class="form-check-label" for="cereales">
                            <gicon.GiGrainBundle style={{fontSize: "40px"}} /> Cereales
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  checked={parva} onChange={e => setParva(e.target.checked)} id="parva" />
                            <label class="form-check-label" for="parva">
                            <gicon.GiSlicedBread style={{fontSize: "40px"}}/> Parva
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" checked={aseo} onChange={e => setAseo(e.target.checked)} id="aseo" />
                            <label class="form-check-label" for="aseo">
                            <gicon.GiSoap style={{fontSize: "40px"}} /> Aseo personal y del hogar
                            </label>
                    </div>

                    </div>
                    <button type="submit" class="btn bt">Actualizar</button>
                    <Link to="/" class="btn bt2">Página principal</Link>
            </form>
    </div>
    </div>
    
)

}

export default Editar;