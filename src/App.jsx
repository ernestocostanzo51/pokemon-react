import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import DefaultLayout from './layout/layouter'
import PokemonSelected from './pages/pokemonSelected'

import PokemonProvider from './components/PokemonProvider'

function App() {
 

  return (
    <>
    <PokemonProvider>
<BrowserRouter>
  <Routes>
    <Route element={<DefaultLayout/>}>
    <Route path='/' element={<Homepage/>}></Route>
    <Route path='/pokemon/:name' element={<PokemonSelected/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>

    </PokemonProvider>
  
    </>
  )
}

export default App
