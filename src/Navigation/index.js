import React from "react";
import { AuthenticationProvider } from "./AuthenticationProvider";
import Routes from "./Routes";

const Provider =()=> {
    return(
        <AuthenticationProvider>
            <Routes/>
        </AuthenticationProvider>
        
    );
}
export default Provider;