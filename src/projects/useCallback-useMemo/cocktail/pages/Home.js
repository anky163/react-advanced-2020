import React, { useContext } from 'react'

// global
import { AppContext } from '../AppContext'

// components
import Form from './components/Form'
import Loader from './components/Loader'
import CocktailsList from './components/CocktailsList' 

const Home = () => {
  const { drinks, isLoading, searchTerm, setSearchTerm } = useContext(AppContext)
  console.count('Home rendered')
  return (
    <main>
      <AppContext.Provider value={ { searchTerm, setSearchTerm } }>
        <Form />
      </AppContext.Provider>
      
      { 
        isLoading 
        ? <Loader /> 
        : <AppContext.Provider value={ { drinks, isLoading } }>
          <CocktailsList />
        </AppContext.Provider>
      }
    </main>
  )
}

export default Home