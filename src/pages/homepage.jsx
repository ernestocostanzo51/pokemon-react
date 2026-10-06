import { useContext } from "react"
import { pokemonContext } from "../components/PokemonProvider"
import { favoriteContext } from "../components/FavoriteProvider"
import { compareContext } from "../components/CompareProvider"

import typeConfig from "../layout/TypePokemon"

export default function PokemonApp() {
  const { pokemonsList, singlePokemon, selectedPokemon } = useContext(pokemonContext)
  
  
  const { isInfavorite, addTofavorite, removeFromFavorite } = useContext(favoriteContext)
  const { isInCompare, addToCompare, removeFromCompare, compare } = useContext(compareContext)

  return (
    <div className="container mt-4">
      
      <header className="text-center">
        <h1 className="display-5 fw-bold text-danger">Pokédex</h1>
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
                    alt={singlePokemon.name}
                    className="img-fluid"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                </div>

                <h2 className="text-capitalize fw-bold mb-3">{singlePokemon.name}</h2>

                <div className="d-flex justify-content-center gap-2 mb-4">
                  {singlePokemon.types?.map((t) => {
                    const typeName = t.type.name
                    const config = typeConfig[typeName] || { label: typeName, color: '#68A090' }

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
                <div className="row g-2 pt-3 border-top mb-4">
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

                
                <div className="d-flex gap-2">
                  {/* Bottone Preferiti */}
                  {isInfavorite(singlePokemon) ? (
                    <button
                      onClick={() => removeFromFavorite(singlePokemon)}
                      className="btn btn-warning w-50 fw-semibold shadow-sm"
                    >
                      ★ Rimuovi Preferito
                    </button>
                  ) : (
                    <button
                      onClick={() => addTofavorite(singlePokemon)}
                      className="btn btn-outline-warning text-dark w-50 fw-semibold shadow-sm"
                    >
                      ☆ Aggiungi Preferito
                    </button>
                  )}

                  {/* Bottone Confronta */}
                  {isInCompare(singlePokemon) ? (
                    <button
                      onClick={() => removeFromCompare(singlePokemon)}
                      className="btn btn-info text-white w-50 fw-semibold shadow-sm"
                    >
                      ⇄ Rimuovi Confronto
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCompare(singlePokemon)}
                      disabled={compare.length >= 2}
                      className="btn btn-outline-info text-dark w-50 fw-semibold shadow-sm"
                    >
                      {compare.length >= 2 ? "Confronto Pieno" : "⇄ Confronta"}
                    </button>
                  )}
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