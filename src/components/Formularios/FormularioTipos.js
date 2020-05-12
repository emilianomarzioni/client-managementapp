import React, { Component , useState,useContext} from 'react';
import tipoContext from '../../context/tipos/tipoContext';

const FormularioTipo = () => {

    const tiposContext = useContext(tipoContext);
    const { postTipos} = tiposContext;
    const [tipo,setTipo] = useState({
        titulo:'',
        tipo:''
});
    
   const addTipo = e => {
        e.preventDefault();
        

if(tipo.titulo === '' || tipo.tipo === ''){
    console.log("Campos incompletos")
    return;
}

        postTipos(tipo);
            setTipo({
                titulo:'',
                tipo:''
            })
    }   
   
    const leerDato = e => {
        setTipo({
            ...tipo,
            [e.target.name] : e.target.value
        })
    }
    
    return (
        <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form
                                onSubmit={addTipo}
                            >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Tipo de movimiento"
                                        required
                                        onChange={leerDato}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <div className="form-group">
                                            <label>Tipo:</label>
                                            <select name="tipo" className="form-control" onChange={leerDato}>
                                                <option value=""> ¿Ingreso o Egreso?</option>
                                                <option  value ="Ingreso">Ingreso</option>
                                                <option  value ="Egreso">Egreso</option>
                                            </select>
                                        </div>
                                    </div>
                                             
                                </div>
                                <input 
                                    type="submit"
                                    value="Agregar Tipo"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
    );}

 
export default FormularioTipo