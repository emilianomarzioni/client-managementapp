import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import ListaMovimientos from './components/movimientos/ListaMovimientos';
import MovimientoState from './context/movimientos/movimientoState';
import AuthState from './context/auth/authState';
import TipoState from './context/tipos/tipoState';
import tokenAuth from './config/token';
import Ahorro from './components/pageLayout/Ahorro';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Resumen from './components/Resumenes/Resumen';
import FormularioTipo from './components/Formularios/FormularioTipos';
import PrivateRoute from './components/routes/PrivateRoute';
import Login from './components/auth/Login';
import NewUser from './components/auth/NewUser';
import EditarMovimiento from './components/movimientos/EditarMovimiento';

const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {
  return (
    <MovimientoState>

      <TipoState>
        <AuthState>
    <Router>

              <Navbar />
              <Switch>
                <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                <Route exact path='/login' component={Login}></Route>
                <Route exact path='/new-user' component={NewUser}></Route>
                <PrivateRoute exact path='/movimiento/editar/:id' component={EditarMovimiento}></PrivateRoute>
                <PrivateRoute exact path='/ahorro' component={Ahorro}></PrivateRoute>
                <PrivateRoute exact path='/resumen' component={Resumen}></PrivateRoute>
                <PrivateRoute exact path='/tipos' component={FormularioTipo}></PrivateRoute>
              </Switch>
              <Footer />
    </Router>
    </AuthState>
    </TipoState>
    </MovimientoState>
  );
}

export default App;
