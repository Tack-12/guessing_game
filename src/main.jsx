import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Game from './components/Game'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Game />  
  </StrictMode>,
)
