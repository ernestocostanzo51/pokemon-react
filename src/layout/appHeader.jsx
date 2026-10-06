import { useContext } from "react"
import { Link, useLocation } from "react-router-dom" 
import { favoriteContext } from "../components/FavoriteProvider"
import { compareContext } from "../components/CompareProvider"

export default function appHeader() {
  const { favorite } = useContext(favoriteContext)
  const { compare } = useContext(compareContext)
  const location = useLocation() // Facoltativo: per evidenziare la pagina attiva

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold text-danger fs-4 d-flex align-items-center gap-2" to="/">
          <span>Pokédex</span>
        </Link>

        {/* Pulsante Toggle per Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Link di Navigazione */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
            
            {/* Link Home */}
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold px-3 ${location.pathname === "/" ? "active text-danger" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>

            {/* Link Preferiti con Badge Contatore */}
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold px-3 d-flex align-items-center gap-2 ${
                  location.pathname === "/favorite" ? "active text-warning" : ""
                }`}
                to="/favorites"
              >
                <span>★ Preferiti</span>
                <span className="badge rounded-pill bg-warning text-dark fw-bold">
                  {favorite.length}
                </span>
              </Link>
            </li>

            {/* Link Comparatore con 2 Pallini Indicatore */}
            <li className="nav-item ms-lg-2">
              <Link
                className={`btn btn-outline-light d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${
                  location.pathname === "/compare" ? "active border-info" : ""
                }`}
                to="/compare"
              >
                <span>⇄ Confronta</span>
                
                {/* Contenitore dei 2 Pallini */}
                <div className="d-flex align-items-center gap-1 ms-1">
                  {/* Primo Pallino */}
                  <span
                    className={`rounded-circle d-inline-block transition-all ${
                      compare.length >= 1 ? "bg-info shadow-sm" : "bg-secondary opacity-50"
                    }`}
                    style={{
                      width: "10px",
                      height: "10px",
                      boxShadow: compare.length >= 1 ? "0 0 6px #0dcaf0" : "none"
                    }}
                  ></span>

                  {/* Secondo Pallino */}
                  <span
                    className={`rounded-circle d-inline-block transition-all ${
                      compare.length >= 2 ? "bg-info shadow-sm" : "bg-secondary opacity-50"
                    }`}
                    style={{
                      width: "10px",
                      height: "10px",
                      boxShadow: compare.length >= 2 ? "0 0 6px #0dcaf0" : "none"
                    }}
                  ></span>
                </div>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}