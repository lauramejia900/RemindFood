import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from "../Componente SideNav/NOMBRE 2.png"
import axios from 'axios';

function Navbar(props) {

    const history = useHistory();
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);


    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => history.push('/login'))
            .catch(err => console.log(err));
    }

    return (
        <>
            <IconContext.Provider value={{ color: 'white' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar}/>

                    </Link>
                    <img class="img"  src={logo} alt="Nombre"/>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                        {
                                            props.acabados >=  1 && item.title === 'Próximos a acabarse' ? <span className="badge bg-danger">{props.acabados}</span>: null
                                        }
                                        {
                                            props.vencidos >  0  && item.title === 'Próximos a vencerse' ? <span className="badge bg-danger">{props.vencidos}</span>: null
                                        }
                                        {
                                            props.mercado >  0  && item.title === 'Lista de mercado' ? <span className="badge bg-danger">{props.mercado}</span>: null
                                        }
                                    </Link>
                                </li>
                            );
                        })}
                    <button  className="btn btn-danger float-right p" onClick={cerrarSesion}>Cerrar sesion</button>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;