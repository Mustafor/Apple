import { createContext, useState, useEffect } from "react"

export const Context = createContext()

export const LangContext = ({ children }) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        if (token !== null) {
            localStorage.setItem("token", JSON.stringify(token))
        }
    }, [token])

    return <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
}
