import React, { useReducer } from 'react'

import { reducer } from './reducer'

import { links, socialIcons } from './links'
import { ButtonContext, ShowSideBarButton, CloseSideBarButton, ShowModalButton, CloseModalButton } from './buttons'

import '../../global.css'
import './index.css'


const Index = () => {
  const [state, dispatch] = useReducer(reducer, { showModal: false, showSideBar: false });

  const showSideBar = () => dispatch({ type: 'SHOW_SIDEBAR' });
  const closeSideBar = () => dispatch({ type: 'CLOSE_SIDEBAR' });

  const showModal = () => dispatch({ type: 'SHOW_MODAL' });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <>
        <main>
          <ButtonContext.Provider value={ { showSideBar, showModal } }>

              {/* SHOW-SIDEBAR BUTTON */}
              <ShowSideBarButton />
              
              {/* SHOW-MODAL BUTTON */}
              <ShowModalButton />
              
          </ButtonContext.Provider>
        </main>



        {/* MODAL CONTAINER */}
        <div className={ state.showModal ? 'modal-overlay show-modal' : 'modal-overlay' }>
          <div className="modal-container">
            <h3>modal content</h3>

            {/* CLOSE-MODAL BUTTON */}
            <ButtonContext.Provider value={ { closeModal } }>
              <CloseModalButton />
            </ButtonContext.Provider>
          </div>
        </div>



        {/* SIDE BAR */}
        <aside className={ state.showSideBar ? 'sidebar show-sidebar' : 'sidebar' }>
          <div className="sidebar-header">
            <img src="https://react-projects-12-sidebar-modal.netlify.app/static/media/logo.2bb7da65.svg" className="logo" alt="coding addict" />

            {/* CLOSE-SIDEBAR BUTTON */}
            <ButtonContext.Provider value={ { closeSideBar } } >
              <CloseSideBarButton />
            </ButtonContext.Provider>
          </div>

          {/* LINKS */}
          <ul className='links'>
            {
              links.map((link, index) => {
                const id = parseInt(new Date().getTime().toString()) * index;
                const linkHref = link.title === 'home' ? '/' : `/${link.title}`;
                return (
                  <li key={ id }>
                    <a href={ linkHref }>{ link.svg } { link.title }</a>
                  </li>
                )
              })
            }
          </ul>
          
          {/* SOCIAL ICONS */}
          <ul className="social-icons">
            {
              socialIcons.map((icon, index) => {
                const id = parseInt(new Date().getTime().toString()) * index;
                return (
                  <li key={ id }>
                    <a href={ icon.iconHref }>{ icon.svg }</a>
                  </li>
                )
              })
            }
          </ul>
        </aside>
    </>
  )
}

export default Index
