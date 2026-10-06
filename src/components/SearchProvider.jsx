import { createContext } from "react"
import { useState } from "react"

export const searchContext = createContext()
export default function SearchProvider({children}){

    const [search , setSearch] = useState("")
    return(<searchContext.Provider
    value={{search , setSearch}}>
        {children}
    </searchContext.Provider>
    )
}