import React, { useEffect,useState,useContext } from 'react';
import authContext from '../../context/auth/authContext';
const NewUser = (props) =>  {
    
    const  AuthContext= useContext(authContext);
    const { autenticado, createUser} = AuthContext;
    
    const [user,setUser] = useState({
        email:'',
        password:'',
        nombre:'',
        confirmPassword:''
    })
    const {email,nombre,password,confirmPassword} = user;
    const mostrarAlerta = (text) => {
        console.log(text);
    }
    // iniciar sesión 
    const onSubmit =  (e) => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmPassword.trim() === '' ) {
                mostrarAlerta('Todos los campos son obligatorios');
                return;
            }

        // Password minimo de 6 caracteres
        if(password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres');
            return;
        }

        // Los 2 passwords son iguales
        if(password !== confirmPassword) {
            mostrarAlerta('Los passwords no son iguales');
            return;
        }

        // Pasarlo al action
        createUser({
            nombre, 
            email, 
            password
        });
        props.history.push('/');

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
                                Crear Usuario
                            </h2>
                          {/*   {this.state.error ? <div className="alert alert-dismissible alert-danger">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Error!</strong> Email or password incorrect.
                                </div>:null } */}
                            <form
                                onSubmit={onSubmit}
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
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="nombre"
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
                                <div className="form-group">
                                    <label>Confirma Password:</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        required
                                        onChange={leerDatos}
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Crear Usuario"
                                />
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }


 
export default NewUser;