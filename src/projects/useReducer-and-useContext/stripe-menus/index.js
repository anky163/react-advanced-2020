import React, { useState, useEffect } from 'react'

import { links } from './data'
import { Submenu, SubmenuContext, NavLinks, NavLinksContext, Sidebar, SidebarContext } from './Menu'
import { ButtonContext, OpenButton, CloseButton } from './Buttons'

import '../../global.css'
import './index.css'


const Index = () => { 
    const [isSubMenuHover, setIsSubMenuHover] = useState(false);
    const [isNavLinkHover, setIsNavLinkHover] = useState(false);
    const [isShowSubmenu, setIsShowSubmenu] = useState(false);
    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const [currentLink, setCurrentLink] = useState({ title: '', children: [], path: <></>, position: 0 });

    useEffect(() => {
        if (isNavLinkHover || isSubMenuHover) {
            setIsShowSubmenu(true);
        } else {
            setIsShowSubmenu(false);
        }
    }, [isNavLinkHover, isSubMenuHover]);
            
    return (
        <>      
            {/* 
                ========================
                        NAVBAR 
                ========================
            */}
            <nav className="nav">
                <div className="nav-center">
                    <div className="nav-header">
                        <img src="https://react-projects-13-stripe-submenus.netlify.app/static/media/logo.1090473d.svg" className="nav-logo" alt="" />    
                        
                        {/* OPEN-SIDEBAR BUTTON */}
                        <ButtonContext.Provider value={ { setIsShowSidebar } }>
                            <OpenButton />
                        </ButtonContext.Provider>
                    </div>
                    
                    {/* LINKS-MENU */}
                    <NavLinksContext.Provider value={ { links, setIsNavLinkHover, setCurrentLink } }>
                        <NavLinks />
                    </NavLinksContext.Provider>

                    <button className="btn signin-btn">Sign in</button>
                </div>
            </nav>



            {/* 
                =========================
                        SUB-MENU 
                =========================
            */}
            <SubmenuContext.Provider value={ { currentLink, isShowSubmenu, setIsSubMenuHover } }>
                <Submenu />
            </SubmenuContext.Provider>



            {/* 
                =========================
                        SIDEBAR 
                =========================
            */}
            <div className={ isShowSidebar ? 'sidebar-wrapper show' : 'sidebar-wrapper' }>
                <aside className="sidebar">

                    {/* CLOSE-SIDEBAR BUTTON */}
                    <ButtonContext.Provider value={ { setIsShowSidebar } } >
                        <CloseButton />
                    </ButtonContext.Provider>
                
                    {/* SIDEBAR MENU */}
                    <SidebarContext.Provider value={ { links } } >
                        <Sidebar />
                    </SidebarContext.Provider>

                </aside>
            </div>



            {/* 
                ===========================
                        MAIN SECTION 
                ===========================
            */}
            <section className="hero">
                <div className="hero-center">
                    <article className="hero-info">
                        <h1>Payments infrastructure <br/>for the internet</h1>                
                        <p>Millions of companies of all sizes—from startups to Fortune 500s—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.</p>
                        <button className="btn">Start now</button>
                    </article>
                    <article className="hero-images">
                        <img src="https://react-projects-13-stripe-submenus.netlify.app/static/media/phone.58d7e3d6.svg" className="phone-img" alt="phone" />
                    </article>
                </div>
            </section>
        </>
    )
}

export default Index;
