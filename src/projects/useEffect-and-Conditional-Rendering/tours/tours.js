import React, { useState, useEffect } from 'react';

const url = 'https://course-api.com/react-tours-project';
let backUpData = [];


const Tours = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);
  
  // const getTours = () => {
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(allTours => {
  //     console.log(allTours);
  //     setTours(allTours);
  //     setIsLoading(false);
  //   });
  // }
  
  const getTours = async () => {
    const response = await fetch(url);
    const allTours = await response.json();
    // console.log(allTours);
    backUpData = allTours.map(tour => tour);
    // console.log(backUpData);
    setTours(allTours);
    setIsLoading(false);
  }
  
  const deleteTour = (id) => {
    const currentTours = tours.filter(tour => tour.id !== id);
    setTours(currentTours);
  };
  
  const refreshPage = () => {
    console.log('refresh');
    window.location.reload();
  };
  
  // const handleRefresh = () => setTours(backUpData);
  
  useEffect(() => {
    // console.log('useEffect');
    getTours();
  }, []);
  
  // console.log('rendering');

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  
  if (tours.length > 0) {
    return (
      <section className='tours-container'>
        <div className="title">
            <h2>our tours</h2>
            <div className="underline"></div>
        </div>
  
        <div>
          {
            tours.map(tour => {
              const { id, image, name, price, info } = tour;

              const changeTextSize = (event) => {
                console.log("changing text's size");

                const buttonValue = event.target.textContent;
                const pTag = document.getElementById(id);
                pTag.textContent = '';

                const newButton = document.createElement('button');
                newButton.addEventListener('click', changeTextSize);
                // console.log(pTag.textContent);

                if (buttonValue === 'read more') {
                  pTag.textContent = info;
                  newButton.textContent = 'show less';
                } else {
                  pTag.textContent = info.substring(0, 200) + ' ...';
                  newButton.textContent = 'read more';
                }

                pTag.appendChild(newButton);
              }; 

              return (
                <article className='single-tour' key={ id }>
                  <img src={ image } alt={ name }/>      
                  
                  <footer>
                    <div className="tour-info">
                      <h4>{ name }</h4>
                      <h4 className='tour-price'>$ { price }</h4>
                    </div>
  
                    <p id={ id }>{ info.substring(0, 200) + ' ...' } <button onClick={ changeTextSize }>read more</button></p>
  
                    <button className='delete-btn' onClick={ () => deleteTour(id) }>not interested</button>
                  </footer>
                </article>
              );
            })
          }
        </div>
      </section>
    )
  }

  return (
    <div className='title'>
      <h2>no tours left</h2>
      <button className='btn' onClick={ refreshPage }>refresh</button>
      {/* <button className='btn' onClick={ handleRefresh }>refresh</button> */}
    </div>
  );

}

export default Tours;
