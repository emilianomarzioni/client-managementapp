import React, { useEffect,useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
const Login = (props) =>  {
    
    const  AuthContext= useContext(authContext);
    const { autenticado, logIn} = AuthContext;
    
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    // iniciar sesión 
    const iniciarSesion =  (e) => {
        e.preventDefault();
        logIn(user);
    }
    useEffect(() => {
        if(autenticado) {
            props.history.push('/');
        } 
        // eslint-disable-next-line
    }, [autenticado, props.history]);

    // Almacena lo que el usuario escribe en el state
    const leerDatos = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }
    


        return ( 
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> {''}
                                Iniciar Sesión
                            </h2>
                          {/*   {this.state.error ? <div className="alert alert-dismissible alert-danger">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Error!</strong> Email or password incorrect.
                                </div>:null } */}
                            <form
                                onSubmit={iniciarSesion}
                            >
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        onChange={leerDatos}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password:</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        onChange={leerDatos}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Inicar Sesión"
                                />
                            </form>
                            <div>
                            <p>New User? <Link to={'/new-user'} className="btn btn-link">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


 
export default Login;