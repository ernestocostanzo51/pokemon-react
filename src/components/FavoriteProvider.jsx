import { useState } from "react"
import { createContext } from "react"

export const favoriteContext = createContext()
export default function FavoriteProvider({children}){

    const [favorite , setFavorite] = useState([])

    const isInfavorite = (poke) => {
        return favorite.some(f => f.name === poke.name)
    }

    const addTofavorite = (poke) => {
        const exist = favorite.some(f => f.name === poke.name)
        if(!exist){
            return setFavorite(prev => [...prev , poke])
        }
    }

    const removeFromFavorite = (poke) => {
        const exist = favorite.some(f => f.name === poke.name)
        if(exist){
           setFavorite(prev => prev.filter(rem => rem.name !== poke.name))
        }
    }


    return(
        <favoriteContext.Provider value={{
            favorite , setFavorite,
            isInfavorite , addTofavorite , removeFromFavorite
        }}>
            {children}
        </favoriteContext.Provider>
        
    )
}