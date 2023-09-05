import {Routes, Route} from 'react-router-dom'
import { Header } from './Components/Header'
import { Home } from './Pages/Home'
import { NotFound } from './Pages/Not-found'
import { Project } from './Pages/Project'
import './App.css'

function App() {

  return (
    <div className='container'>
      <Header />
        <Routes>
          <Route path='/' element={<Home /> } />
          <Route path="/projects/:id" element={<Project />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default App
