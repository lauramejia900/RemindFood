import { Link,  useHistory  } from "react-router-dom";
import React,{useState, useEffect} from "react";
import axios from "axios";
import "./Nuevo.css";
import * as bsicon from "react-icons/bs"
import * as gicon from "react-icons/gi";
import * as ricon from "react-icons/ri";
import * as mdicon from "react-icons/md";
import * as AiIcons from 'react-icons/ai';

import Navbar from "../Componente SideNav/Navbar"


const Nuevo = () => {
    const [product, setProduct] = useState([]);
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [vencimiento, setVencimiento] = useState("")
    const [moneda, setMoneda] = useState("")
    const [precio, setPrecio] = useState("")
    const [clasificacion, setClasificacion] = useState("")
    const [enlatados, setEnlatados] = useState(false)
    const [granos, setGranos] = useState(false)
    const [carnes, setCarnes] = useState(false)
    const [lacteos, setLacteos] = useState(false)
    const [cereales, setCereales] = useState(false)
    const [parva, setParva] = useState(false)
    const [aseo, setAseo] = useState(false)
    const [errors, setErrors] = useState({})
    const history = useHistory();
    const fecha = new Date().toISOString().split("T")[0];
    const fecha2 = new Date();
    const vencidosList = product.filter(product =>(Math.round((new Date(product.vencimiento).getTime()-fecha2.getTime())/ (1000 * 60 * 60 * 24))) < 8)
    const vencidos = vencidosList.length;
    const AcabadosList = product.filter(product => product.cantidad < 2); 
    const acab = AcabadosList.length;
    const mercadoList = product.filter(product => product.cantidad === 0); 
    const mercado = mercadoList.length;


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

    const guardarProduct = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/product",{
            nombre,
            cantidad, 
            vencimiento,
            moneda,
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
        .then(res => history.push("/product/detalles2/"+res.data._id))
        .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div>
            <Navbar vencidos = {vencidos} acabados = {acab} mercado = {mercado}></Navbar>
            <div className="nuevo">
            <h1> <AiIcons.AiFillPlusCircle /> Nuevo Producto</h1>
            <form onSubmit={guardarProduct}>
                <div class="mb-3">
                    <label for="producto" class="form-label"><mdicon.MdAddShoppingCart style={{fontSize: "25px"}}/> Nombre del producto: </label>
                    <input type="text" class="form-control" id="producto"  onChange={e => setNombre(e.target.value)}/>
                </div>
                {
                    errors.nombre ? <span className="text-danger">{errors.nombre.message}</span> : null
                }
                <div class="mb-3">
                    <label for="cantidad" class="form-label"><ricon.RiNumbersLine style={{fontSize: "25px"}} />  Cantidad: </label>
                    <input type="number" class="form-control" id="cantidad" onChange={e => setCantidad(e.target.value)}/>
                </div>
                {
                    errors.cantidad ? <span className="text-danger">{errors.cantidad.message}</span> : null
                }
                <div class="mb-3">
                    <label for="fecha" class="form-label"> <bsicon.BsCalendar2Date style={{fontSize: "25px"}}/> Fecha de vencimiento: </label>
                    <input type="date" class="form-control" id="fecha"  onChange={e => setVencimiento(e.target.value)} min={fecha}  max="2040-12-31"/>
                </div>
                {
                    errors.fecha ? <span className="text-danger">{errors.vencimiento.message}</span> : null
                }
                <div class="mb-3">
                    <label for="moneda" class="form-label"><gicon.GiTakeMyMoney style={{fontSize: "25px"}}/> Tipo de moneda: </label>
                    <select class="form-select form-select-lg" name="moneda" id="moneda"  onChange={e => setMoneda(e.target.value)}>
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
                    <select class="form-select form-select-lg" name="clasificacion" id="clasificacion"  onChange={e => setClasificacion(e.target.value)}>
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
                        <input class="form-check-input" type="checkbox" id="enlatados" value={enlatados}  onChange={e => setEnlatados(e.target.checked)}/>
                            <label class="form-check-label" for="enlatados">
                            <gicon.GiCannedFish style={{fontSize: "40px"}}/> Enlatados
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  value={granos}  onChange={e => setGranos(e.target.checked)}id="granos" />
                            <label class="form-check-label" for="granos">
                            <gicon.GiGrain style={{fontSize: "40px"}} /> Granos
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  value={carnes} onChange={e => setCarnes(e.target.checked)} id="carnes" />
                            <label class="form-check-label" for="carnes">
                            <gicon.GiMeat style={{fontSize: "40px"}} /> Carnes frias
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  value={lacteos}  onChange={e => setLacteos(e.target.checked)} id="lacteos" />
                            <label class="form-check-label" for="lacteos">
                            <gicon.GiMilkCarton style={{fontSize: "40px"}}/> Lacteos
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  value={cereales}  onChange={e => setCereales(e.target.checked)} id="cereales" />
                            <label class="form-check-label" for="cereales">
                            <gicon.GiGrainBundle style={{fontSize: "40px"}} /> Cereales
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  value={parva} onChange={e => setParva(e.target.checked)} id="parva" />
                            <label class="form-check-label" for="parva">
                            <gicon.GiSlicedBread style={{fontSize: "40px"}}/> Parva
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={aseo} onChange={e => setAseo(e.target.checked)} id="aseo" />
                            <label class="form-check-label" for="aseo">
                            <gicon.GiSoap style={{fontSize: "40px"}} /> Aseo personal y del hogar
                            </label>
                    </div>
                    </div>
                    <button type="submit" class="btn bt">Enviar</button>
                    <Link to="/" className="btn bt2">Página principal</Link>
            </form>
        </div>
        </div>
        
    )
}

export default Nuevo;