import React from 'react'

// react router
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// global
// import { AppContext } from '../AppContext'
import { GetData } from '../GetData'

// pages
import Home from '../pages/Home'
import About from '../pages/About'
import Detail from '../pages/Detail'
import Error from '../pages/Error'

// style
import '../../../global.css'
import './index.css'


const Index = () => {
  return (
      <Router>
        <Navbar />

        <Routes >   
          <Route path="/" element={ <Home { ...GetData(null) } /> } />
          <Route path="/cocktail/:id" element={ <Detail /> } />
          <Route path="/about" element={ <About /> } />
          <Route path='*' element={ <Error /> } />  
        </Routes>
 
      </Router>
  )
}


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src="https://react-projects-15-cocktails.netlify.app/static/media/logo.9a3d2645.svg" alt="cocktail db logo" className="logo" />
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">home</Link></li>
          <li><Link to="/about">about</Link></li>
        </ul>

      </div>
    </nav>
  )
}


export default Index
