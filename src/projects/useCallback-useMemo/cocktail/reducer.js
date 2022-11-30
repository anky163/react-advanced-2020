export const reducer = (state, action) => {
  if (action.type === 'LOADING_ON') {
    return {
      ...state,
      drinks: null,
      singleCocktail: {},
      loading: true
    }
  }

  if (action.type === 'SEARCH') {
    const newSearchTerm = action.payload
    return {
      ...state,
      drinks: null,
      singleCocktail: {},
      searchTerm: newSearchTerm,
    }
  }

  if (action.type === 'GET_DRINKS') {
    const newDrinks = action.payload
    console.log('   Menu loaded.')
    // newDrinks.map(item => console.log(`-  ${ item.name }`))
    return {
      ...state,
      singleCocktail: {}, 
      drinks: newDrinks,
      loading: false
    }
  }

  if (action.type === 'GET_COCKTAIL') {
    const newCocktail = action.payload
    console.log(`   Found: "${ newCocktail.name }".`)
    return {
      ...state, 
      drinks: null,
      singleCocktail: newCocktail,
      loading: false
    }
  }

  throw new Error('Unmatching action type')
}