import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
const PrivateRoute = ({ component: Component, ...props  }) => {

    const AuthContext = useContext(authContext);
    const { autenticado, userAutenticated} = AuthContext;

    useEffect(() => {
        userAutenticated();
        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => !autenticado ?  (
            <Redirect to="/login" />
        )  : (
            <Component {...props} />
        ) } />

     );
}
 
export default PrivateRoute;