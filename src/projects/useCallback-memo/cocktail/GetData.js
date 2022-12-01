import { useEffect, useReducer, useCallback } from 'react'
import { reducer } from './reducer'

const defaultState = {
  drinks: null,
  singleCocktail: {},
  loading: true,
  defaultSearchUrl: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  searchTerm: '',
  defaultLookUpUrl: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
}

const GetSingleCocktail = ({ id, defaultUrl, dispatch }) => {
  const getIngredients = (item) => {
    const ingredients = [...Array(16).keys()].reduce((result, i) => {
      const element = 'strIngredient' + i
      if (item[element]) {
        result.push(item[element])
      }
      return result
    }, []);
    return ingredients
  }

  const fetchData = useCallback(async(url) => {
    dispatch({ type: 'LOADING_ON' })
    console.log(`   Searching ID ${ id }...`);
    try {
      const response = await fetch(url)  
      const data = await response.json()
      const item = data.drinks[0]
      // console.log('Searching done.');
      if (item) {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass, strInstructions } = item
        const ingredients = getIngredients(item)
        const newCocktail = {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
          instructions: strInstructions,
          ingredients: ingredients
        }
        dispatch({ type: 'GET_COCKTAIL', payload: newCocktail })
      } else {
        dispatch({ type: 'GET_COCKTAIL', payload: {} })
      }
    } catch (err) {
      // console.log(err)
    }
  }, [id, dispatch])

  useEffect(() => {
    const newUrl = defaultUrl + id
    fetchData(newUrl)

  }, [id, defaultUrl, dispatch, fetchData])
}


const GetMenu = ({ searchTerm, defaultUrl, dispatch }) => {
  const fetchData = useCallback(async(url) => {
    dispatch({ type: 'LOADING_ON' })
    console.log('   Menu loading...');
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
      // console.log(err)
    }
  }, [dispatch])

  useEffect(() => {
    const newUrl = defaultUrl + searchTerm 
    fetchData(newUrl)

  }, [searchTerm, defaultUrl, fetchData])
}



export const GetData = (id) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  if (id) {
    const defaultUrl = state.defaultLookUpUrl
    GetSingleCocktail({ id, defaultUrl, dispatch })
  } else {
    const defaultUrl = state.defaultSearchUrl
    const searchTerm = state.searchTerm
    GetMenu({ searchTerm, defaultUrl, dispatch })
  }

  const { loading, drinks, singleCocktail, searchTerm } = state

  if (id) {
    return { loading, singleCocktail }
  }

  return { loading, drinks, searchTerm, dispatch }
}