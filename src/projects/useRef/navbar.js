import React, { useRef, useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa';
import { links, social } from './data'

import '../global.css'
import './navbar.css'


const Navbar = () => {
    const [showLinks, setShowLinks] = useState(true);

    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const toggleLinks = () => {
        console.log(`show links: ${!showLinks}`);
        setShowLinks(!showLinks);
    };

    useEffect(() => {
        if (showLinks) {
            linksRef.current.style.height = `24px`;
        } else {
            linksRef.current.style.height = `0px`;
        }
    });

    return (
        <nav>
            <div className="nav-center">
                <div className="nav-header">
                    <img src="https://react-projects-11-navbar.netlify.app/static/media/logo.2bb7da65.svg" className="logo" alt="logo" />

                    <button className='nav-toggle' onClick={ toggleLinks } >
                        <FaBars />
                    </button>
                </div>


                {/* LINKS CONTAINER */}
                <div className="links-container" ref={ linksContainerRef } >
                    <ul className="links" ref={ linksRef } >
                        {
                            links.map(link => {
                                const { id, url, text } = link;
                                return <li key={ id }><a href={ url }>{ text }</a></li>;
                            })
                        }
                    </ul>
                </div>
                

                {/* SOCIAL */}
                <ul className="social-icons">
                    {
                        social.map(socialIcon => {
                            const { id, url, icon } = socialIcon;
                            return <li key={ id }><a href={ url }>{ icon }</a></li>;
                        })
                    }
                </ul>
            </div>
        </nav>
    );
}


export default Navbar;