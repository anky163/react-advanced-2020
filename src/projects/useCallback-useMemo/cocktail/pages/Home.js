import React, { useContext } from 'react'

// global
import { AppContext } from '../AppContext'

// components
import Form from './components/Form'
import Loader from './components/Loader'
import CocktailsList from './components/CocktailsList' 


const Home = React.memo(() => {
  console.count('\n\nHome rendering')

  const { drinks, loading, searchTerm, dispatch } = useContext(AppContext)

  return (
    <main>
      <AppContext.Provider value={ { searchTerm, dispatch } }>
        <Form />
      </AppContext.Provider>
      
      { 
        loading
        ? <Loader /> 
        : <AppContext.Provider value={ { drinks } }>
            <CocktailsList />
          </AppContext.Provider> 
      }
    </main>
  )
})

export default Home