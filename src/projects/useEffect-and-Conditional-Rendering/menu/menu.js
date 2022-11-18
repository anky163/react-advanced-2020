import React, { useState, useEffect } from 'react'
import { data } from './data'

const Menu = () => {
    const [menu, setMenu] = useState(data);

    const showCategory = (category) => {
        setMenu(data.filter(item => item.category === category));
    }

    return (
        <section className='menu'>
            <div className="title">
                <h2>our menu</h2>
                <div className="underline"></div>
            </div>

            <div className="btn-container">
                <button type="button" className="filter-btn" onClick={ () => setMenu(data) }>all</button>
                <button type="button" className="filter-btn" onClick={ () => showCategory('breakfast') }>breakfast</button>
                <button type="button" className="filter-btn" onClick={ () => showCategory('lunch') }>lunch</button>
                <button type="button" className="filter-btn" onClick={ () => showCategory('shakes') }>shakes</button>
            </div>

            <div className="section-center">
                {
                    menu.map(item => {
                        const {name, image, info, price,} = item;
                        return (
                            <article className="menu-item" key={ name }>
                                <img src={ image } alt={ name } className="photo" />

                                <div className="item-info">
                                    <header>
                                        <h4>{ name }</h4>
                                        <h4 className="price">${ price }</h4>
                                    </header>

                                    <p className="item-text">{ info }</p>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
};

export default Menu
