import React, { useContext } from "react"
import { AppContext } from "../../AppContext"


const Form = () => {
  // console.count('Form rendering');

  const { searchTerm, dispatch } = useContext(AppContext)

  const filterOut = (e) => {
    e.preventDefault();
    dispatch({ type: 'SEARCH', payload: e.target.value })
  }

  return (
    <section className="section search">
      <form className="search-form" onSubmit={ (e) => e.preventDefault() }>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input type="text" name="name" id="name" value={ searchTerm }
            onChange={ filterOut } />
        </div>
      </form>
    </section>
  )
}

export default Form