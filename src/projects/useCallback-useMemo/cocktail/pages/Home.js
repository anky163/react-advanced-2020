import React from 'react'

// import { useContext } from 'react'

// global
// import { AppContext } from '../AppContext'

// components
import Form from './components/Form'
import Loader from './components/Loader'
import CocktailsList from './components/CocktailsList' 


const Home = React.memo(({ drinks, loading, searchTerm, dispatch }) => {
  console.count('\n\nHome rendering')

  return (
    <main>
      <Form searchTerm={ searchTerm } dispatch={ dispatch } />
      
      { 
        loading
        ? <Loader /> 
        : <CocktailsList drinks={ drinks } />
      }
    </main>
  )
})

export default Home