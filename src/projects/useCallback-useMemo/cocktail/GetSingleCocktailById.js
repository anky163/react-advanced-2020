import { useEffect, useReducer, useCallback } from "react"

const defaultState = {
  cocktail: {},
  loading: true,
  defaultUrl: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
}

const reducer = (state, action) => {
  if (action.type === 'LOADING_ON') {
    console.log('Cocktail searching...');
    return {
      ...state,
      cocktail: {}, 
      loading: true
    }
  }

  if (action.type === 'GET_COCKTAIL') {
    const newCocktail = action.payload
    console.log(`${ newCocktail.name } found.`)
    return {
      ...state, 
      cocktail: newCocktail,
      loading: false
    }
  }

  throw new Error('Unmatching action type')
}


export const GetSingleCocktailById = (id) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

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

  const getData = useCallback(async() => {
    dispatch({ type: 'LOADING_ON' })
    try {
      const response = await fetch(state.defaultUrl + id)
      const data = await response.json()
      const item = data.drinks[0]
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
      console.log(err)
    }
  }, [id, state.defaultUrl])

  useEffect(() => {
    getData()
  }, [id, getData])
  
  const { loading, cocktail } = state
  return { loading, cocktail }
}