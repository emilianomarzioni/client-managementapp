import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import authContext from "../../context/auth/authContext";


const Navbar = () => {
    
    const  AuthContext= useContext(authContext);
    const { autenticado, logOut, usuario} = AuthContext;
    const LogOut = e => {
        logOut();
    }
   /*  cerrarSesion = (e) =>{
        e.preventDefault();

        const { firebase } = this.props

        firebase.auth().signOut()
    } */
        // extraer datos de autenticacion
        //const { auth } = this.props;
        return (
           
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <div className="container">
                        <Link className="navbar-brand" to={'/'} >Denmark 1.0</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {autenticado ? (
                                    <div className="collapse navbar-collapse" id="navbarColor01">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <Link className="nav-link" to={'/'} >Inicio<span className="sr-only">(current)</span></Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to={'/ahorro'} >Ahorro</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to={'/tipos'} >Tipos</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to={'/resumen'} >Resumen</Link>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav">
                                             {usuario ? (<li className="nav-item ">Bienvenido <span className="nav-item active">{usuario.nombre}</span></li>) : null}
                                        </ul>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={LogOut}>Cerrar Sesión</button>
                                    </div>
                                            )                        
                        : null 
                        }</div>
                </nav>    );
    }



export default Navbar;