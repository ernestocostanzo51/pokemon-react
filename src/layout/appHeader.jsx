import { Link } from "react-router-dom"
export default function AppHeader(){
    return(
        <header>
           <nav className="navbar navbar-expand-lg bg-secondary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
       <Link to="/" className="nav-link text-decoration-none text-dark" aria-current="page">HomaPage</Link>
        <Link to="/pokemon" className="nav-link text-decoration-none text-dark" aria-current="page">Preferiti</Link> 
       <Link to="/allenatori" className="nav-link text-decoration-none text-dark" aria-current="page">Comparatore</Link>
     
      </div>
    </div>
  </div>
</nav>
        </header>
      
    )
}