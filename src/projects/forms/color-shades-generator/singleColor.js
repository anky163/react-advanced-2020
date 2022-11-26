import React, { useState, useEffect } from 'react'

const SingleColor = ({ rgb, hex, weight, index }) => {
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const myTimeOut = setTimeout(() => setAlert(false), 3000);
        return () => clearTimeout(myTimeOut);
    }, [alert])

    return (
        <article 
            className={ index > 10 ? 'color color-light' : 'color false' } 
            style={ { backgroundColor: `rgb(${rgb})` } }
            onClick={ () => {
                setAlert(true);
                navigator.clipboard.writeText('#' + hex);
            } }
        >
            <p className="percent-value">{ weight }%</p>
            <p className="color-value">{ '#' + hex }</p>
            {alert && <p className='alert'>copied to clipboard</p>}
        </article>
    );
}

export default SingleColor;