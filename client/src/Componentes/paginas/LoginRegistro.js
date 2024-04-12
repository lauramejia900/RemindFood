import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import logo from "./NOMBRE 2.png"
import * as icon from "react-icons/io5"
import * as mdicon from "react-icons/md";
import * as iconn from "react-icons/bi";
import { toast } from 'react-hot-toast';
const LoginRegistro = () => {

    //Para Formulario de Registro
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    //Para Formulario de Inicio de Sesión
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [errorRegistro, setErrorsRegistro] = useState({});
    /*
    errorRegistro = {
        firstName: {
            message: "El nombre es obligatorio."
        },
        email: {
            message: "El correo no es válido",
        }
        password: {
            message: "El password debe tener 8 caracteres."
        }
    }
    */
    const [errorLogin, setErrorLogin] = useState("");

    const history = useHistory();

    const registro = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register',{
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, {withCredentials: true})
            .then(res => history.push({pathname: "/", state:{detail: toast.success("Registrado Correctamente")}}))
            .catch(err => setErrorsRegistro(err.response.data.errors));
    }

    const login = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email: emailLogin,
            password: passwordLogin
        }, {withCredentials: true})
            .then(res => {
                if(res.data.error) {
                    setErrorLogin(res.data.message);
                } else {
                    history.push({pathname: "/", state:{detail: toast.success("Inicio de sesion Exitoso")}});
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="row entrar">
            <img src={logo} alt="Logo" className="logis"></img>
            <div className="col-5 log">
                <h2><mdicon.MdLogin /> Iniciar Sesión</h2>
                <form onSubmit={login}>
                    <div className="form-group">
                        <label htmlFor="emailLogin"><mdicon.MdEmail style={{ fontSize: "25px" }}/> E-mail:</label>
                        <input type="email" name="emailLogin" id="emailLogin" className="form-control" value={emailLogin} onChange={e=>setEmailLogin(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordLogin"><mdicon.MdPassword style={{ fontSize: "25px" }}/> Password:</label>
                        <input type="password" name="passwordLogin" id="passwordLogin" className="form-control" value={passwordLogin} onChange={e=>setPasswordLogin(e.target.value)} />
                    </div>
                    <div>
                        {errorLogin !== "" ? <span className="text-danger">{errorLogin}</span> : null }
                    </div>
                    <input type="submit" value="Iniciar Sesión" className=" btn bt es" />
                </form>
            </div>
            <div className="col-5">
                <h2><iconn.BiUserPlus />  Registro</h2>
                <form onSubmit={registro}>
                    <div className="form-group">
                        <label htmlFor="firstName"><icon.IoPersonCircleSharp style={{ fontSize: "25px" }}/> Nombre</label>
                        <input  type="text" 
                                name="firstName" 
                                id="firstName" 
                                className="form-control" 
                                value={firstName} 
                                onChange={e=> setFirstName(e.target.value)}  />
                        {errorRegistro.firstName ? <span className="text-danger">{errorRegistro.firstName.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName"> <icon.IoPersonCircleSharp style={{ fontSize: "25px" }}/> Apellido</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" value={lastName} onChange={e=> setLastName(e.target.value)}  />
                        {errorRegistro.lastName ? <span className="text-danger">{errorRegistro.lastName.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"><mdicon.MdEmail style={{ fontSize: "25px" }}/> E-mail</label>
                        <input type="email" name="email" id="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)}  />
                        {errorRegistro.email ? <span className="text-danger">{errorRegistro.email.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"><mdicon.MdPassword style={{ fontSize: "25px" }}/> Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={password} onChange={e=> setPassword(e.target.value)}  />
                        {errorRegistro.password ? <span className="text-danger">{errorRegistro.password.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword"><mdicon.MdPassword style={{ fontSize: "25px" }}/> Confirmación</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}  />
                        {errorRegistro.confirmPassword ? <span className="text-danger">{errorRegistro.confirmPassword.message}</span> : null}
                    </div>
                    <input type="submit" value="Registarme" className="btn bt2 es" />
                </form>
            </div>
        </div>
    )

}

export default LoginRegistro;