import { useEffect, useReducer } from "react"

const defaultState = {
  drinks: null,
  loading: true,
  defaultUrl: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  searchTerm: '',
}

const reducer = (state, action) => {
  if (action.type === 'LOADING_ON') {
    console.log('Menu loading...');
    return {
      ...state,
      drinks: null, 
      loading: true
    }
  }

  if (action.type === 'SEARCH') {
    const searchTerm = action.payload
    return {
      ...state,
      drinks: null,
      searchTerm: searchTerm,
    }
  }

  if (action.type === 'GET_DRINKS') {
    console.log('Menu loaded.');
    const newDrinks = action.payload
    return {
      ...state, 
      drinks: newDrinks,
      loading: false
    }
  }

  throw new Error('Unmatching action type')
}


export const GetDrinksByNames = () => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const getData = async(url) => {
    dispatch({ type: 'LOADING_ON' })
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.drinks) {
        const newDrinks = data.drinks.map(item => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        dispatch({ type: 'GET_DRINKS', payload: newDrinks })
      } else {
        dispatch({ type: 'GET_DRINKS', payload: null })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const currentUrl = state.defaultUrl + state.searchTerm 
    getData(currentUrl)
  }, [state.defaultUrl, state.searchTerm])

  return { ...state, dispatch }
}
