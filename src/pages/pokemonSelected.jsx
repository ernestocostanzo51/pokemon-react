import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function PokemonSelected(){

    const typeConfig = {
  normal: { label: 'Normale', color: '#A8A878' },
  fire: { label: 'Fuoco', color: '#F08030' },
  water: { label: 'Acqua', color: '#6890F0' },
  grass: { label: 'Erba', color: '#78C850' },
  electric: { label: 'Elettro', color: '#F8D030' },
  ice: { label: 'Ghiaccio', color: '#98D8D8' },
  fighting: { label: 'Lotta', color: '#C03028' },
  poison: { label: 'Veleno', color: '#A040A0' },
  ground: { label: 'Terra', color: '#E0C068' },
  flying: { label: 'Volante', color: '#A890F0' },
  psychic: { label: 'Psico', color: '#F85888' },
  bug: { label: 'Coleottero', color: '#A8B820' },
  rock: { label: 'Roccia', color: '#B8A038' },
  ghost: { label: 'Spettro', color: '#705898' },
  dragon: { label: 'Drago', color: '#7038F8' },
  dark: { label: 'Buio', color: '#705848' },
  steel: { label: 'Acciaio', color: '#B8B8D0' },
  fairy: { label: 'Folletto', color: '#EE99AC' },
};
    const { name } = useParams()
    const apiLink =(`https://pokeapi.co/api/v2/pokemon/${name}/`)

    const [pokemon, setPokemon] = useState(null)

    
  

    if (!pokemon) {
        return <div>Caricamento in corso...</div>;
    }

    return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-4">
           <div className="card mt-5">
            <img src={pokemon.sprites.other['official-artwork'].front_default} className="img-fluid mb-3" ></img>
            <h3 className="card-title ps-3">Nome: {pokemon.name}</h3>
            <h4 className="card-text ps-3"> N°{pokemon.id}</h4>
            <div className="d-flex gap-2 mb-3 ms-3">
            {pokemon.types.map((t) => {
              const config = typeConfig[t.type.name] || { label: t.type.name, color: '#777' };
              return (
                <span
                  key={t.slot}
                  style={{
                    backgroundColor: config.color,
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {config.label}
                </span>
              );
            })}
          </div> 
          <div className="d-flex gap-3 ms-3">
           <p className="card-text">Peso: {pokemon.weight/10} Kg</p>
           <p className="card-text">Altezza: {pokemon.height/10} M</p>
          </div>
           
            <div>
            </div>
           </div>
        </div>
    </div>
</div>
    )
}