import { createContext } from "react"
import { useState } from "react"
export const compareContext = createContext()
export default function CompareProvider({children}){

const [compare , setCompare] = useState([])

const isInCompare = (poke) => {
    return compare.some(c => c.name === poke.name)
}

const addToCompare = (poke) => {
     if(compare.length >= 2){
        return setCompare(prev => [...prev])
    }
    const exist = compare.some(c => c.name === poke.name)
    if(!exist){
        return setCompare(prev => [...prev , poke])
    }
   
}

const removeFromCompare = (poke) => {
    const exist = compare.some(c => c.name === poke.name)
    if(exist){
        return setCompare(prev => prev.filter(p => p.name !== poke.name))
    }
}
    
    return(
        <compareContext.Provider
        value={{
            compare , setCompare,
            isInCompare , addToCompare , removeFromCompare
        }
        }>
            {children}
        </compareContext.Provider>
    )
}