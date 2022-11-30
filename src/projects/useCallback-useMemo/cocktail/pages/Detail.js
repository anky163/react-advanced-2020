import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { GetSingleCocktailById } from '../GetSingleCocktailById';
import Loader from './components/Loader'


const Detail = () => {
  const { id } = useParams()
  const { cocktail, loading } = GetSingleCocktailById(id)

  console.count('Detail rendered');
  console.log(cocktail)

  const {
    name,
    image,
    category,
    info,
    glass,
    instructions,
    ingredients,
  } = cocktail

  // console.log(ingredients);

  return (
    <>
      {
        loading ? <Loader />
        : <section className="section cocktail-section">
            <Link className='btn btn-primary' to="/">back home</Link>

            <h2 className="section-title">{ name }</h2>

            <div className="drink">
              <img src={ image } alt={ name } />

              <div className="drink-info">
                <p><span className="drink-data">name :</span> { name }</p>
                <p><span className="drink-data">category :</span> { category }</p>
                <p><span className="drink-data">info :</span> { info }</p>
                <p><span className="drink-data">glass :</span> { glass }</p>
                <p><span className="drink-data">instructions :</span> { instructions }</p>
                <p>
                  <span className="drink-data">ingredients :</span>
                  { ingredients && ingredients.map((ingredient, index) => <span key={ index }> { ingredient }</span>) }
                </p>
              </div>
            </div>
        </section>
      }
    </>
  );

};


export default Detail