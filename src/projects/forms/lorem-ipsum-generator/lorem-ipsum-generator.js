import React, { useState, useEffect } from 'react'
import { data } from './data'
import '../../global.css'
import './lorem-ipsum.css'

const Forms = () => {
    const [texts, setTexts] = useState([]);
    const [amount, setAmount] = useState(0);

    const handleChange = (event) => {
        event.preventDefault();
        const newAmount = event.target.value;
        // console.log(newAmount);
        setAmount(newAmount);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (amount <= 1) {
            setTexts(data.slice(0, 1));
        }
        else if (amount >= data.length - 1) {
            setTexts(data);
        }
        else {
            setTexts(data.slice(0, amount));
        }
    };

    return (
        <section className="section-center">
            <h3>tired of boring lorem ipsum?</h3>
            <form className="lorem-form" onSubmit={ handleSubmit }>
                <label htmlFor="amount">paragraphs:</label>
                <input type="number" name="amount" id="amount" value={ amount } onChange={ handleChange } />
                <button className="btn" type='submit'>generate</button>
            </form>
            <article className="lorem-text">
                {
                    texts.map((text, index) => <p key={ index }>{ text }</p>)
                }
            </article>
        </section>
    )
}

export default Forms
