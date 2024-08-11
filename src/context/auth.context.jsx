import { createContext, useState } from "react";
import { useEffect } from "react";
import service from "../service/service.config";

// componente de contexto

const AuthContext = createContext();

// componente de envoltorio
function AuthWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true)


    const authenticateUser = async () => {
        console.log("intentando validar el token")

        const authToken = localStorage.getItem("authToken")
        if(!authToken){
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setIsAuthenticating(false)
            return;
        }

        try {

            const response = await service.get("/auth/verify")
            console.log(response)

            setIsLoggedIn(true)
            setLoggedUserId(response.data._id)
            setIsAuthenticating(false)

        } catch (error) {
            console.error(error)
            setIsLoggedIn(false)
            setLoggedUserId(null)

        }
    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        authenticateUser
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    if(isAuthenticating){
        return <h3>...validando credenciales</h3>
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthWrapper
}