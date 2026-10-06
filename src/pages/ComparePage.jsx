import { useContext } from "react"
import { compareContext } from "../components/CompareProvider"
import { pokemonContext } from "../components/PokemonProvider"
import typeConfig from "../layout/TypePokemon" 

export default function ComparePage() {
  const { compare, removeFromCompare } = useContext(compareContext)
  const { selectedPokemon } = useContext(pokemonContext)

  
  const statLabels = {
    hp: "HP",
    attack: "Attacco",
    defense: "Difesa",
    "special-attack": "Att. Sp.",
    "special-defense": "Dif. Sp.",
    speed: "Velocità"
  }

 
  const getStatValue = (poke, statName) => {
    const statObj = poke.stats.find((s) => s.stat.name === statName)
    return statObj ? statObj.base_stat : 0
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-info">⇄ Confronta Pokémon</h1>
        <p className="text-muted">
          {compare.length === 2
            ? "Confronto diretto delle statistiche tra i due Pokémon selezionati."
            : `Hai selezionato ${compare.length} di 2 Pokémon per il confronto.`}
        </p>
      </header>

      {/* Caso: Meno di 2 Pokémon nel confronto */}
      {compare.length < 2 ? (
        <div className="text-center py-5">
          <div className="card border-2 border-dashed bg-light p-5 rounded-4 max-w-md mx-auto">
            <h4 className="text-muted mb-3">Seleziona 2 Pokémon per il confronto</h4>
            <p className="text-secondary mb-0">
              Torna alla pagina principale o ai preferiti e clicca sul pulsante <strong>"⇄ Confronta"</strong> su due Pokémon per confrontarli qui.
            </p>
          </div>
        </div>
      ) : (
        /* Sezione Confronto */
        <div className="row g-4">
          
          {/* Schede Pokémon Affiancate */}
          <div className="col-12">
            <div className="row g-4">
              {compare.map((poke) => (
                <div key={poke.name} className="col-md-6">
                  <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2 fw-bold">
                        #{poke.id}
                      </span>
                      <button
                        onClick={() => removeFromCompare(poke)}
                        className="btn btn-outline-danger btn-sm rounded-circle px-2"
                        title="Rimuovi dal confronto"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="my-2" style={{ height: "160px" }}>
                      <img
                        src={
                          poke.sprites?.other?.["official-artwork"]?.front_default ||
                          poke.sprites?.front_default
                        }
                        alt={poke.name}
                        className="img-fluid h-100"
                        style={{ objectFit: "contain" }}
                      />
                    </div>

                    <h3 className="text-capitalize fw-bold mb-2">{poke.name}</h3>

                    <div className="d-flex justify-content-center gap-2 mb-3">
                      {poke.types?.map((t) => {
                        const typeName = t.type.name
                        const config = typeConfig[typeName] || { label: typeName, color: "#6c757d" }

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

                    <button
                      onClick={() => selectedPokemon(poke.name)}
                      className="btn btn-outline-primary btn-sm fw-semibold mt-auto"
                    >
                      Vedi Dettagli
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabella Comparativa Statistiche */}
          <div className="col-12 mt-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-dark text-white text-center py-3">
                <h4 className="m-0 fw-bold">Tabella Statistiche</h4>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center m-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "35%" }} className="text-capitalize fs-5">{compare[0].name}</th>
                      <th style={{ width: "30%" }}>Statistica</th>
                      <th style={{ width: "35%" }} className="text-capitalize fs-5">{compare[1].name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Altezza */}
                    <tr>
                      <td className="fw-semibold">{(compare[0].height / 10).toFixed(1)} m</td>
                      <td className="text-muted fw-bold text-uppercase">Altezza</td>
                      <td className="fw-semibold">{(compare[1].height / 10).toFixed(1)} m</td>
                    </tr>

                    {/* Peso */}
                    <tr>
                      <td className="fw-semibold">{(compare[0].weight / 10).toFixed(1)} kg</td>
                      <td className="text-muted fw-bold text-uppercase">Peso</td>
                      <td className="fw-semibold">{(compare[1].weight / 10).toFixed(1)} kg</td>
                    </tr>

                    {/* Statistiche Base con evidenziazione del vincitore */}
                    {Object.entries(statLabels).map(([statKey, label]) => {
                      const val1 = getStatValue(compare[0], statKey)
                      const val2 = getStatValue(compare[1], statKey)

                      return (
                        <tr key={statKey}>
                          <td className={`fw-bold ${val1 > val2 ? "text-success fs-5" : ""}`}>
                            {val1} {val1 > val2 && "👑"}
                          </td>
                          <td className="text-muted fw-bold text-uppercase">{label}</td>
                          <td className={`fw-bold ${val2 > val1 ? "text-success fs-5" : ""}`}>
                            {val2} {val2 > val1 && "👑"}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}