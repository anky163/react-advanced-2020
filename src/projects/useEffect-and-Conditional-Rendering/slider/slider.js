import React, { useState, useEffect } from 'react'
import { data } from './data'

const len = data.length;

const Slider = () => {    
    const [people, setPeople] = useState(data);
    // console.log(people);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        if (currentIndex < 0) {
            setCurrentIndex(len - 1);
        } 
        if (currentIndex > len - 1) {
            setCurrentIndex(0);
        }
    }, [currentIndex]);

    useEffect(() => {
        let slider = setInterval(() => setCurrentIndex(currentIndex + 1), 5000);
        return () => clearInterval(slider);
    }, [currentIndex]);

    return (
        <section className="slider">
            <div className="title">
                <h2><span>/</span>reviews</h2>
            </div>

            <div className="section-center">
                {
                    people.map((person, index) => {
                        const { name, title, image, text } = person;

                        let className = 'nextSlide';
                        if (index === currentIndex) {
                            className = 'activeSlide';
                        }
                        if ((index === currentIndex - 1) || (currentIndex === 0 && index === len - 1)) {
                            className = 'lastSlide';
                        }

                        return (
                            <article key={ index } className={ className }>
                                <img src={ image } alt={ name } className="person-img" />
                                <h4>{ name }</h4>
                                <p className="title">{ title }</p>
                                <p className="text">{ text }</p>

                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z">
                                    </path>
                                </svg>
                            </article>
                        )
                    })
                }

                <button className="prev" onClick={ () => setCurrentIndex(currentIndex - 1) }>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                
                <button className="next" onClick={ () => setCurrentIndex(currentIndex + 1) }>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>
    );    
};

export default Slider
