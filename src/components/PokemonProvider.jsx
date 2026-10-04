import { useState, useEffect, createContext } from "react"

export const pokemonContext = createContext()

export default function PokemonProvider({ children }) {
    const [pokemonsList, setPokemonsList] = useState([])
    const [singlePokemon, setSinglePokemon] = useState(null)

    const pokemon = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
            if (!response.ok) throw new Error("Errore nel recupero dei pokemon")
            const data = await response.json()
            setPokemonsList(data.results) 
        } catch (error) {
            console.error(error)
        }
    }

    const selectedPokemon = async (name) => {
        setSinglePokemon(null)
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            if (!response.ok) throw new Error("Errore nel recupero del singolo pokemon")
            const data = await response.json()
            setSinglePokemon(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        pokemon()
    }, [])

    return (
        <pokemonContext.Provider value={{
            pokemonsList, setPokemonsList,
            singlePokemon, setSinglePokemon,
            pokemon,
            selectedPokemon
        }}>
            {children}
        </pokemonContext.Provider>
    )
}