for (var i = 1; i <= 15; i++) {
  console.log(i);
}

  const ingredients = [...Array(16).keys()].reduce((arr, i) => {
    if (i > 0) {
      arr.push('strIngredient' + i);
    }
    return arr
  }, [])

  console.log(ingredients);
