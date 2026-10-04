import { useContext } from "react"
import { pokemonContext } from "../components/PokemonProvider"


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
}

export default function PokemonApp() {
  const { pokemonsList, singlePokemon, selectedPokemon } = useContext(pokemonContext)

  return (
    <div className="container py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-danger">Pokédex</h1>
        <p className="text-muted">Seleziona un Pokémon per vederne le statistiche</p>
      </header>

      <div className="row g-4">
        {/* Colonna Sinistra: Lista Pokémon */}
        <section className="col-lg-7 col-md-6">
          <div 
            className="row row-cols-2 row-cols-sm-3 row-cols-md-2 row-cols-lg-3 g-2 overflow-auto pe-2" 
            style={{ maxHeight: "70vh" }}
          >
            {pokemonsList.map((poke) => {
              const isSelected = singlePokemon?.name === poke.name

              return (
                <div key={poke.name} className="col">
                  <button
                    onClick={() => selectedPokemon(poke.name)}
                    className={`btn w-100 py-3 text-capitalize fw-semibold shadow-sm ${
                      isSelected 
                        ? "btn-danger border-2" 
                        : "btn-outline-secondary border-light-subtle bg-white text-dark"
                    }`}
                  >
                    {poke.name}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Colonna Destra: Scheda Dettaglio Pokémon */}
        <aside className="col-lg-5 col-md-6">
          <div className="sticky-top" style={{ top: "2rem" }}>
            {singlePokemon ? (
              <div className="card border-0 shadow-lg text-center p-4 rounded-4">
                <div className="d-flex justify-content-end">
                  <span className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2 fw-bold">
                    #{singlePokemon.id}
                  </span>
                </div>

                {/* Immagine Ufficiale */}
                <div className="my-3">
                  <img
                    src={
                      singlePokemon.sprites?.other?.["official-artwork"]?.front_default ||
                      singlePokemon.sprites?.front_default
                    }
                    className="img-fluid"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                </div>

                <h2 className="text-capitalize fw-bold mb-3">{singlePokemon.name}</h2>

                <div className="d-flex justify-content-center gap-2 mb-4">
                  {singlePokemon.types?.map((t) => {
                    const typeName = t.type.name
                    const config = typeConfig[typeName] 

                    return (
                      <span
                        key={typeName}
                        className="badge px-3 py-2 text-white rounded-3 shadow-sm"
                        style={{ backgroundColor: config.color, fontSize: "0.85rem" }}
                      >
                        {config.label}
                      </span>
                    )
                  })}
                </div>

                {/* Statistiche Base */}
                <div className="row g-2 pt-3 border-top">
                  <div className="col-6">
                    <div className="bg-light p-3 rounded-3">
                      <small className="text-muted text-uppercase fw-bold d-block mb-1">
                        Altezza
                      </small>
                      <span className="fs-5 fw-semibold text-dark">
                        {(singlePokemon.height / 10).toFixed(1)} m
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light p-3 rounded-3">
                      <small className="text-muted text-uppercase fw-bold d-block mb-1">
                        Peso
                      </small>
                      <span className="fs-5 fw-semibold text-dark">
                        {(singlePokemon.weight / 10).toFixed(1)} kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border-2 border-dashed bg-light text-center p-5 rounded-4 text-muted">
                <p className="m-0">
                  Clicca su un Pokémon per visualizzare la sua scheda dettagliata.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}