import React from "react"
import { Link } from 'react-router-dom'

// import { AppContext } from "../../AppContext"

const CocktailsList = React.memo(({ drinks }) => {
  // console.count('List called')

  return (
    <>
      { 
        !drinks ? <h2 className="section-title">no cocktails matched your search criteria</h2>
        : (
          <section className="section">
            <h2 className="section-title">cocktails</h2>
            <div className="cocktails-center">
              { drinks.map(item => {
                  return (
                    <SingleItem key={ item.id } item={ item } />
                  )
              })}
            </div>
          </section>
          )
      }
    </>
  )
})


const SingleItem = ({ item }) => {
  // console.count('item called')
  const { id, name, image, info, glass } = item;

  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={ image } alt={ name } />
      </div>
      
      <div className="cocktail-footer">
        <h3>{ name }</h3>
        <h4>{ glass }</h4>
        <p>{ info }</p>
        <Link className="btn btn-primary btn-details" to={ `/cocktail/${ id }` } >details</Link>
      </div>
    </article>
  )
}

export default CocktailsList