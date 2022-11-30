import { useState, useEffect, useReducer, useCallback } from "react"

const defaultUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const defaultState = {
  drinks: null,
  defaultUrl: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  isLoading: true,
}

const reducer = (state, action) => {
  if (action.type === 'LOADING_ON') {
    return { ...state, isLoading: true }
  }

  if (action.type === 'LOADING_OFF') {
    return { ...state, isLoading: false }
  }

  if (action.type === 'FETCH') {
    const { searchTerm, getData } = action.payload
    const newUrl = state.defaultUrl + searchTerm
    const newDrinks = getData(newUrl)
    return {
      ...state,
      drinks: newDrinks,
      isLoading: false,
    }
  }
  throw new Error('Unmatching action type')
}


export const GetDrinksByNames = () => {
  const [drinks, setDrinks] = useState(null)
  const [url, setUrl] = useState(defaultUrl)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const getData = useCallback(async() => {
    setIsLoading(true);
    try {
      const response = await fetch(url)
      const data = await response.json()
      const newDrinks = data.drinks
      if (newDrinks) {
        setDrinks(newDrinks.map(item => {
          const { 
            idDrink, 
            strDrink, 
            strDrinkThumb, 
            strAlcoholic, 
            strGlass, 
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        }));
      } else {
        // console.log(`${ response.status } ${ response.statusText }`)
        setDrinks(null);
      }
      
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
    // console.count('fetch done')
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData])

  useEffect(() => {
    const newUrl = defaultUrl + searchTerm;
    setUrl(newUrl)
  }, [searchTerm])

  return { drinks, isLoading, searchTerm, setSearchTerm }
}
