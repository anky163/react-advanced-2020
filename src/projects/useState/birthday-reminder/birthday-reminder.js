import React from 'react'
import { data } from './data'

const Reminder = () => {
  
  let [people, setPeople] = React.useState(data.map(person => person));
  let birthdays = people.length;
  // console.log(people);

  return (
    <section className='container'>

      <h3 style={ {padding: '25px 0 15px 0'} }>{ birthdays } birthdays today</h3>

      { people.map(person => {
        const {id, name, years, image} = person;

        return (
          <article 
            style={ {padding: '20px 0 20px 0'} }
            className='product' key={ id }
          >
            <img 
              style={ {width: '30%', borderRadius: '50%'} }
              src={ image } 
              alt={ name } 
            />
            <div>
              <h4>{ name }</h4>
              <p>{ years } years</p>
            </div>
          </article>     
        )
      }) }

      <button style={ {marginBottom: '20px'} } className='btn' onClick={ () => setPeople([]) }>clear all</button>

    </section>
  );
};

export default Reminder
