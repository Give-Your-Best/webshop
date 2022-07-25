import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, ...restOfProps }) {

    return (
        <Route
        {...restOfProps}
        render={(props) =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
}

export default ProtectedRoute;