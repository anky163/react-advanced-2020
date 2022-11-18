import React, { useState, useEffect } from 'react'
import { data } from './data'

const Accordion = () => {
    // console.log(data);

    const [questions, setQuestions] = useState(data);

    const showOrHide = (currentIndex) => {
        setQuestions(questions.map((q, qIndex) => {
            return qIndex === currentIndex 
            ? { ...q, hide: !q.hide }
            : q 
        }));
    }

    return (
        <section className='accordion' >
            <div className="questions-container">
                <h3>questions and answers about login</h3>

                <section className='info'>
                    {
                        questions.map((q, index) => {
                            return (
                                <article className='question' key={ index }>
                                    <header>
                                        <h4>{ q.question }</h4>

                                        <button className="btn" onClick={ () => showOrHide(index) }>
                                            {
                                                q.hide 
                                                ? (
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" pid="10297" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg">
                                                        <defs></defs>
                                                        <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" pid="10298"></path>
                                                        <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" pid="10299"></path>
                                                    </svg>
                                                )
                                                : (
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                                                    </svg>
                                                )
                                            }
                                        </button>
                                    </header>

                                    {
                                        q.hide 
                                        ? (<></>)
                                        : (
                                            <p>{ q.answer }</p>
                                        )
                                    }
                                </article>
                            )
                        })
                    }
                </section>
            </div>
        </section>
    );
};

export default Accordion
