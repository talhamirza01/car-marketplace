import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header'
import Hero from './Components/Hero'
import Category from './Components/Category'
import MostSearchedCar from './Components/MostSearchedCar'
import InfoSection from './Components/InfoSection'
import Footer from './Components/Footer'
import './App.css'

function App() {


  return (
    <div>
      <Header></Header>
      <Hero></Hero>
      <Category></Category>
      <MostSearchedCar></MostSearchedCar>
      <InfoSection></InfoSection>
      <Footer></Footer>
    </div>
  )
}

export default App
