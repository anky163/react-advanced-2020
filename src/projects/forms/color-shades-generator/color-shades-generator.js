import React, { useState } from 'react'
import Values from 'values.js'

import SingleColor from './singleColor'

import '../../global.css'
import './color.css'


const Colors = () => {
    const [color, setColor] = useState('');
    const [list, setList] = useState(
        new Values('#f15025').all(10).map((item, index) => {
            const { rgb, hex, weight } = item;
            const props = { index, rgb, hex, weight }
            return <SingleColor key={ index } { ...props } />;
        }
    ));
    const [error, setError] = useState(false);

    // console.log(list);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            let colors = new Values(color).all(10).map((item, index) => {
                const { rgb, hex, weight } = item;
                const props = { index, rgb, hex, weight }
                return <SingleColor key={ index } { ...props } />;
            });
            setList(colors);
            setError(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    return (
        <>
            <section className="color-container">
                <h3>color generator</h3>
                
                <form onSubmit={ handleSubmit }>
                    <input 
                        type="text" 
                        placeholder="#f15025" 
                        className={ error ? 'error' : 'null' } 
                        onChange={ (e) => setColor(e.target.value) } 
                    />
                    <button type="submit" className="btn">submit</button>
                </form>
            </section>

            <section className="colors">
                {
                    list.map(item => item)
                }  
            </section>
        </>
    )
}

export default Colors;

