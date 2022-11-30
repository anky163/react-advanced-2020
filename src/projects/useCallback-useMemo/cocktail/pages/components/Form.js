import React, { useContext } from "react"
import { AppContext } from "../../AppContext";

const Form = () => {
  const { searchTerm, setSearchTerm } = useContext(AppContext)

  const filterOut = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
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