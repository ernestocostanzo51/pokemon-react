import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import DefaultLayout from './layout/layouter'
import PokemonProvider from './components/PokemonProvider'
import FavoriteProvider from './components/FavoriteProvider'
import CompareProvider from './components/CompareProvider'
import SearchProvider from './components/SearchProvider'
import FavoritePage from './pages/FavoritePage'
import ComparePage from './pages/ComparePage'

function App() {
 

  return (
    <>
    <SearchProvider>
      <FavoriteProvider>
    <CompareProvider>
    <PokemonProvider>
    <BrowserRouter>
    <Routes>
    <Route element={<DefaultLayout/>}>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/favorite' element={<FavoritePage/>}/>
    <Route path='/compare' element={<ComparePage/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </PokemonProvider>
    </CompareProvider>
    </FavoriteProvider>
    </SearchProvider>
    
    
    
  
    </>
  )
}

export default App
