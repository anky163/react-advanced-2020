import { useState, useEffect, useCallback } from "react"

const defaultUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

export const GetSingleCocktailById = (id) => {
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState({})

  const getIngredients = (item) => {
    const ingredients = [...Array(16).keys()].reduce((result, i) => {
      const element = 'strIngredient' + i;
      if (item[element]) {
        result.push(item[element])
      }
      return result;
    }, []);
    return ingredients;
  }

  const getData = useCallback(async() => {
    setLoading(true);
    try {
      const response = await fetch(defaultUrl + id)
      const data = await response.json()
      const item = data.drinks[0]
      if (item) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
        } = item

        const ingredients = getIngredients(item)

        const newCocktail = { name, image, info, category, glass, instructions, ingredients }

        setCocktail(newCocktail)
      } else {      
        setCocktail({})
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    getData()
  }, [id, getData])

  return { cocktail, loading }
}